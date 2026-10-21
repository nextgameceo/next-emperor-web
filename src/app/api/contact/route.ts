import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";
import { isMailConfigured } from "@/lib/mail-config";

/**
 * お問い合わせ送信API（POST /api/contact）
 * スパム対策：
 *  1. ハニーポット（人間には見えない入力欄。入力されていたらbotと判定）
 *  2. 送信までの時間チェック（表示から3秒未満の送信を拒否）
 *  3. 送信元オリジンのチェック
 *  4. IPごとの簡易レート制限（10分に5回まで）
 * メール送信は Resend（https://resend.com）のAPIを使用します。
 */

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

export async function POST(req: Request) {
  // オリジンチェック
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, message: "不正なリクエストです。" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "不正なリクエストです。" }, { status: 400 });
  }

  // ハニーポット：botには成功したように見せて破棄
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 送信までの時間チェック
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return NextResponse.json(
      { ok: false, message: "送信が早すぎます。内容をご確認のうえ、もう一度お試しください。" },
      { status: 400 },
    );
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "短時間に複数回送信されました。しばらく時間をおいてお試しください。" },
      { status: 429 },
    );
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
    return NextResponse.json({ ok: false, message: "入力内容をご確認ください。", errors }, { status: 422 });
  }

  // 送信先が未設定の場合は、成功を偽装せずエラーを返す
  if (!isMailConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "現在、お問い合わせフォームのメール送信先が設定されていないため、送信できません。サイト管理者による設定が必要です。",
      },
      { status: 503 },
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
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
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
    return NextResponse.json(
      { ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
