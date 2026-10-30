/**
 * アクセスデータの自動収集
 * ------------------------------------------------------------
 * 毎朝（wrangler.jsonc の triggers.crons）、次のデータを取得して Google スプレッドシートに書き込みます。
 *  ・Search Console：検索された言葉 / ページ / 日別の推移（直近28日）
 *  ・Google アナリティクス（GA4）：日別の訪問 / ページ / 流入元 / ボタンのクリック数（直近28日）
 *
 * 必要な設定（Cloudflare の管理画面）
 *  ・GA_SA_KEY（シークレット）：Google Cloud のサービスアカウントの鍵（JSON の中身をそのまま）
 *  ・ANALYTICS_SHEET_ID：書き込み先のスプレッドシートID（wrangler.jsonc の vars）
 *  ・GSC_SITE：Search Console のプロパティ（例："sc-domain:next-emperor.com"）
 *  ・GA4_PROPERTY_ID：GA4 のプロパティID（数字のみ）。空欄なら GA4 は取得しない
 *
 * ※ 鍵はサーバーの中だけで使い、画面やログには出しません。
 * ※ 取得するのは集計された数字だけで、個人を特定できる情報は含みません。
 */

export type AnalyticsEnv = {
  GA_SA_KEY?: string;
  ANALYTICS_SHEET_ID?: string;
  GSC_SITE?: string;
  GA4_PROPERTY_ID?: string;
};

type ServiceAccount = { client_email: string; private_key: string; token_uri?: string };
type Table = (string | number)[][];

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
].join(" ");

/* ---------- 認証（サービスアカウント → アクセストークン） ---------- */

const b64url = (data: ArrayBuffer | string) => {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPES,
      aud: sa.token_uri || "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const pem = sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claim}`));
  const jwt = `${header}.${claim}.${b64url(sig)}`;

  const res = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string; error?: string };
  if (!data.access_token) throw new Error(`認証に失敗しました（${data.error_description || data.error || res.status}）`);
  return data.access_token;
}

async function gapi<T>(token: string, url: string, body?: unknown, method = body ? "POST" : "GET"): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${new URL(url).hostname} ${res.status}: ${text.slice(0, 300)}`);
  return (text ? JSON.parse(text) : {}) as T;
}

/* ---------- 日付 ---------- */

const ymd = (d: Date) => d.toISOString().slice(0, 10);
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);

/* ---------- Search Console ---------- */

type GscRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

async function gsc(token: string, site: string, dimension: "query" | "page" | "date", rowLimit: number): Promise<GscRow[]> {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const data = await gapi<{ rows?: GscRow[] }>(token, url, {
    startDate: ymd(daysAgo(29)),
    endDate: ymd(daysAgo(1)),
    dimensions: [dimension],
    rowLimit,
    dataState: "all",
  });
  return data.rows ?? [];
}

const gscTable = (label: string, rows: GscRow[]): Table => [
  [label, "クリック数", "表示回数", "クリック率(%)", "平均順位"],
  ...rows.map((r) => [r.keys[0], r.clicks, r.impressions, Math.round(r.ctr * 1000) / 10, Math.round(r.position * 10) / 10]),
];

/* ---------- Google アナリティクス（GA4） ---------- */

type Ga4Report = {
  dimensionHeaders?: { name: string }[];
  metricHeaders?: { name: string }[];
  rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
};

async function ga4(
  token: string,
  propertyId: string,
  dimensions: string[],
  metrics: string[],
  extra: Record<string, unknown> = {},
): Promise<Table> {
  const data = await gapi<Ga4Report>(token, `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
    limit: 250,
    ...extra,
  });
  return (data.rows ?? []).map((r) => [
    ...r.dimensionValues.map((v) => v.value),
    ...r.metricValues.map((v) => Number(v.value)),
  ]);
}

/* ---------- スプレッドシート ---------- */

async function writeTabs(token: string, sheetId: string, tabs: Record<string, Table>) {
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;
  // 足りないタブを作る
  const meta = await gapi<{ sheets: { properties: { title: string } }[] }>(token, `${base}?fields=sheets.properties.title`);
  const existing = new Set(meta.sheets.map((s) => s.properties.title));
  const missing = Object.keys(tabs).filter((t) => !existing.has(t));
  if (missing.length) {
    await gapi(token, `${base}:batchUpdate`, { requests: missing.map((title) => ({ addSheet: { properties: { title } } })) });
  }
  // 中身を入れ替える
  await gapi(token, `${base}/values:batchClear`, { ranges: Object.keys(tabs).map((t) => `'${t}'!A:Z`) });
  await gapi(token, `${base}/values:batchUpdate`, {
    valueInputOption: "RAW",
    data: Object.entries(tabs).map(([t, values]) => ({ range: `'${t}'!A1`, values })),
  });
}

/* ---------- 実行 ---------- */

export async function syncAnalytics(env: AnalyticsEnv): Promise<{ ok: boolean; notes: string[] }> {
  const notes: string[] = [];
  if (!env.GA_SA_KEY || !env.ANALYTICS_SHEET_ID) return { ok: false, notes: ["設定（GA_SA_KEY / ANALYTICS_SHEET_ID）がまだありません"] };

  const sa = JSON.parse(env.GA_SA_KEY) as ServiceAccount;
  const token = await getAccessToken(sa);
  const tabs: Record<string, Table> = {};
  const period = `${ymd(daysAgo(29))} 〜 ${ymd(daysAgo(1))}`;

  // Search Console
  const site = env.GSC_SITE || "sc-domain:next-emperor.com";
  try {
    const [queries, pages, dates] = await Promise.all([
      gsc(token, site, "query", 250),
      gsc(token, site, "page", 100),
      gsc(token, site, "date", 40),
    ]);
    tabs["検索_ワード"] = gscTable("検索された言葉", queries);
    tabs["検索_ページ"] = gscTable("ページ", pages);
    tabs["検索_日別"] = gscTable("日付", dates);
    notes.push(`Search Console：言葉 ${queries.length}件 / ページ ${pages.length}件`);
  } catch (e) {
    notes.push(`Search Console：取得できませんでした（${(e as Error).message}）`);
  }

  // GA4
  const pid = (env.GA4_PROPERTY_ID || "").trim();
  if (pid) {
    try {
      const [daily, pages, sources, events] = await Promise.all([
        ga4(token, pid, ["date"], ["activeUsers", "sessions", "screenPageViews"], { orderBys: [{ dimension: { dimensionName: "date" } }] }),
        ga4(token, pid, ["pagePath"], ["screenPageViews", "activeUsers", "averageSessionDuration"], {
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        }),
        ga4(token, pid, ["sessionSourceMedium"], ["sessions", "activeUsers"], { orderBys: [{ metric: { metricName: "sessions" }, desc: true }] }),
        ga4(token, pid, ["eventName"], ["eventCount"], { orderBys: [{ metric: { metricName: "eventCount" }, desc: true }] }),
      ]);
      tabs["GA_日別"] = [["日付", "ユーザー数", "訪問数", "表示ページ数"], ...daily];
      tabs["GA_ページ"] = [["ページ", "表示回数", "ユーザー数", "平均滞在(秒)"], ...pages];
      tabs["GA_流入元"] = [["流入元 / 種類", "訪問数", "ユーザー数"], ...sources];
      tabs["GA_イベント"] = [["イベント", "回数"], ...events];
      notes.push(`GA4：日別 ${daily.length}日分 / ページ ${pages.length}件`);
    } catch (e) {
      notes.push(`GA4：取得できませんでした（${(e as Error).message}）`);
    }
  } else {
    notes.push("GA4：プロパティIDが未設定のため取得していません");
  }

  tabs["更新情報"] = [
    ["最終更新（日本時間）", new Date(Date.now() + 9 * 3600000).toISOString().replace("T", " ").slice(0, 16)],
    ["集計期間", period],
    ...notes.map((n) => ["メモ", n]),
  ];
  await writeTabs(token, env.ANALYTICS_SHEET_ID, tabs);
  return { ok: true, notes };
}

/**
 * 手動で今すぐ更新する（/api/analytics-sync）
 * ・結果の数字は返さず、成功したかどうかとメモだけを返します
 * ・連続実行を防ぐため、10分に1回までにしています
 */
export async function handleAnalyticsSync(req: Request, env: AnalyticsEnv): Promise<Response> {
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
  const cache = (globalThis as unknown as { caches: { default: Cache } }).caches.default;
  const lockKey = new Request("https://next-emperor.com/__analytics-sync-lock");
  if (await cache.match(lockKey)) return json({ ok: false, notes: ["少し時間をおいてから、もう一度お試しください（10分に1回まで）"] }, 429);
  await cache.put(lockKey, new Response("1", { headers: { "Cache-Control": "max-age=600" } }));
  try {
    return json(await syncAnalytics(env));
  } catch (e) {
    return json({ ok: false, notes: [(e as Error).message.slice(0, 300)] }, 500);
  }
}
