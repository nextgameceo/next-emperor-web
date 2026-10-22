/**
 * お問い合わせメールのデザイン（HTMLメール）
 * ------------------------------------------------------------
 * ・autoReplyHtml … お問い合わせした方に届く「自動返信メール」
 * ・メールアプリで崩れないよう、表（table）と直接指定のスタイルで組んでいます。
 */
import type { ContactInput } from "../src/lib/contact";

export const MAIL_BRAND = {
  site: "https://next-emperor.com",
  logo: "https://next-emperor.com/images/logo-arch.png",
  company: "合同会社NEXT EMPEROR",
  email: "contact@next-emperor.com",
};

const GOLD = "#DDB46E";
const ICE = "#7FD6F2";
const TEXT = "#EDE7DC";
const MUTED = "#A39C93";
const PANEL = "#111114";
const LINE = "#2A2A30";

export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:14px 0;border-bottom:1px solid ${LINE};">
      <div style="font-size:11px;letter-spacing:0.14em;color:${GOLD};margin-bottom:6px;">${esc(label)}</div>
      <div style="font-size:14px;line-height:1.8;color:${TEXT};word-break:break-word;">${value}</div>
    </td>
  </tr>`;
}

export function autoReplyHtml(input: ContactInput, sentAt: string, logo = MAIL_BRAND.logo): string {
  const b = MAIL_BRAND;
  const rows = [
    row("お問い合わせ種別", esc(input.type)),
    row("会社名", esc(input.company)),
    row("担当者名", `${esc(input.name)} 様`),
    row("メールアドレス", esc(input.email)),
    row("電話番号", esc(input.phone || "（未入力）")),
    row("お問い合わせ内容", nl2br(input.message)),
    row("送信日時", esc(sentAt)),
  ].join("");

  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>お問い合わせを受け付けました</title>
</head>
<body style="margin:0;padding:0;background:#000000;">
<div style="display:none;max-height:0;overflow:hidden;">お問い合わせいただき、ありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${PANEL};border:1px solid ${LINE};font-family:'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP','Yu Gothic',Meiryo,sans-serif;">
    <tr><td style="height:4px;line-height:4px;font-size:0;background:${GOLD};background-image:linear-gradient(90deg,${GOLD},#F3DFA8,${ICE});">&nbsp;</td></tr>
    <tr><td style="padding:36px 28px 0;">
      <div style="font-size:11px;letter-spacing:0.24em;color:${ICE};">THANK YOU</div>
      <h1 style="margin:10px 0 0;font-size:22px;line-height:1.5;font-weight:700;color:#FFFFFF;">お問い合わせを<br>受け付けました</h1>
    </td></tr>
    <tr><td style="padding:20px 28px 0;font-size:14px;line-height:1.9;color:${TEXT};">
      ${esc(input.company)}<br>${esc(input.name)} 様<br><br>
      このたびは${esc(b.company)}へお問い合わせいただき、誠にありがとうございます。<br>
      以下の内容でお問い合わせを受け付けました。内容を確認のうえ、担当者より改めてご連絡いたします。
    </td></tr>
    <tr><td style="padding:28px 28px 0;">
      <div style="font-size:11px;letter-spacing:0.24em;color:${GOLD};padding-bottom:6px;border-bottom:1px solid ${GOLD};">YOUR INQUIRY</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
    </td></tr>
    <tr><td align="center" style="padding:32px 28px 8px;">
      <a href="${b.site}" style="display:inline-block;padding:14px 34px;border-radius:999px;background:${GOLD};color:#111111;font-size:14px;font-weight:700;letter-spacing:0.12em;text-decoration:none;">公式サイトを見る</a>
    </td></tr>
    <tr><td style="padding:24px 28px 32px;font-size:12px;line-height:1.9;color:${MUTED};">
      ※ 本メールは送信内容の確認のため、自動でお送りしています。<br>
      ※ このメールに返信いただくと、担当者（${esc(b.email)}）に届きます。<br>
      ※ お心当たりのない場合は、お手数ですが本メールを破棄してください。
    </td></tr>
    <tr><td style="padding:32px 28px 28px;background:#08080A;border-top:1px solid ${LINE};font-size:11px;line-height:1.9;color:${MUTED};text-align:center;">
      <img src="${logo}" width="180" alt="NEXT EMPEROR" style="display:block;margin:0 auto 14px;width:180px;max-width:60%;height:auto;border:0;">
      <div style="font-size:12px;letter-spacing:0.16em;color:${GOLD};margin-bottom:4px;">NEXT EMPEROR LLC</div>
      <a href="mailto:${b.email}" style="color:${ICE};text-decoration:none;">${b.email}</a>
      &nbsp;|&nbsp;
      <a href="${b.site}" style="color:${ICE};text-decoration:none;">next-emperor.com</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}
