/**
 * Cloudflare Workers 用のプログラム
 * ------------------------------------------------------------
 * ・/api/contact だけをここで処理し、それ以外はサイトの静的ファイル（out フォルダ）を返します。
 * ・お問い合わせメールは Resend（https://resend.com）で送信します。
 * ・必要な設定（Cloudflare の Worker → Settings → Variables and Secrets）
 *     RESEND_API_KEY      … Resend の API キー（「Secret」で登録）
 *     CONTACT_TO_EMAIL    … お問い合わせを受け取るメールアドレス
 *     CONTACT_FROM_EMAIL  … 送信元（例：NEXT EMPEROR <noreply@next-emperor.com>）
 *   3つそろうまでは送信成功を偽装せず、「送信先が未設定」と返します。
 */
import { validateContact, type ContactInput } from "../src/lib/contact";

type Env = {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

function isConfigured(env: Env) {
  return Boolean(env.RESEND_API_KEY?.trim() && env.CONTACT_TO_EMAIL?.trim() && env.CONTACT_FROM_EMAIL?.trim());
}

async function handleContact(req: Request, env: Env): Promise<Response> {
  // 画面表示時の「送信先が設定済みか」の確認
  if (req.method === "GET") return json({ configured: isConfigured(env) });
  if (req.method !== "POST") return json({ ok: false, message: "不正なリクエストです。" }, 405);

  // 送信元オリジンのチェック
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(req.url).host) {
    return json({ ok: false, message: "不正なリクエストです。" }, 403);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, message: "不正なリクエストです。" }, 400);
  }

  // ハニーポット（botには成功したように見せて破棄）
  if (typeof body.website === "string" && body.website.trim() !== "") return json({ ok: true });

  // 表示から3秒未満の送信は拒否
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return json({ ok: false, message: "送信が早すぎます。内容をご確認のうえ、もう一度お試しください。" }, 400);
  }

  const ip = req.headers.get("cf-connecting-ip") ?? "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, message: "短時間に複数回送信されました。しばらく時間をおいてお試しください。" }, 429);
  }

  const input: ContactInput = {
    company: String(body.company ?? "").trim(),
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    type: String(body.type ?? ""),
    message: String(body.message ?? "").trim(),
    agree: body.agree === true,
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, message: "入力内容をご確認ください。", errors }, 422);
  }

  if (!isConfigured(env)) {
    return json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "現在、お問い合わせフォームのメール送信先が設定されていないため、送信できません。サイト管理者による設定が必要です。",
      },
      503,
    );
  }

  const text = [
    "NEXT EMPEROR 公式サイトよりお問い合わせがありました。",
    "",
    `■ 会社名：${input.company}`,
    `■ 担当者名：${input.name}`,
    `■ メールアドレス：${input.email}`,
    `■ 電話番号：${input.phone || "（未入力）"}`,
    `■ お問い合わせ種別：${input.type}`,
    "",
    "■ お問い合わせ内容",
    input.message,
    "",
    `送信日時：${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
        reply_to: input.email,
        subject: `【お問い合わせ】${input.type}｜${input.company} ${input.name}様`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      throw new Error("send failed");
    }
  } catch {
    return json({ ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/api/contact") return handleContact(req, env);
    return env.ASSETS.fetch(req);
  },
};
