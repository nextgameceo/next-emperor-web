/**
 * お問い合わせメールのデザイン（HTMLメール）
 * ------------------------------------------------------------
 * ・autoReplyHtml … お問い合わせした方に届く「自動返信メール」
 * ・メールアプリで崩れないよう、表（table）と直接指定のスタイルで組んでいます。
 */
import type { ContactInput } from "../src/lib/contact";
import { SERVICE_GUIDE, type DocumentInput } from "../src/lib/document";

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

/** 背景色（Gmailアプリのダークモードで色が反転されないよう、グラデーション画像としても指定） */
const bg = (c: string) => `background-color:${c};background-image:linear-gradient(${c},${c});`;
/** 文字色をGmailアプリの自動反転から守るための入れ子（Gmail iOS 以外では何も起きません） */
const keep = (html: string) => `<div class="gs"><div class="gd">${html}</div></div>`;

const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:14px 0 0;">
      ${keep(`<div style="font-size:11px;letter-spacing:0.14em;color:${GOLD};margin-bottom:6px;">${esc(label)}</div>
      <div style="font-size:14px;line-height:1.8;color:${TEXT};word-break:break-word;">${value}</div>`)}
      <div style="height:1px;line-height:1px;font-size:0;margin-top:14px;${bg(LINE)}">&nbsp;</div>
    </td>
  </tr>`;
}

type Shell = {
  title: string;
  preheader: string;
  eyebrow: string;
  heading: string; // HTML（<br>可）
  intro: string; // HTML
  sectionLabel: string;
  rows: string;
  button: { href: string; label: string };
  notes: string[];
  logo: string;
};

function shell(o: Shell): string {
  const b = MAIL_BRAND;
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${esc(o.title)}</title>
<style>
  :root { color-scheme: dark; supported-color-schemes: dark; }
  u + .body .gs { background:#000; mix-blend-mode:screen; }
  u + .body .gd { background:#000; mix-blend-mode:difference; }
</style>
</head>
<body class="body" style="margin:0;padding:0;${bg("#000000")}">
<div style="display:none;max-height:0;overflow:hidden;">${esc(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${bg("#000000")}">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;${bg(PANEL)}border:1px solid ${LINE};font-family:'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP','Yu Gothic',Meiryo,sans-serif;">
    <tr><td style="height:4px;line-height:4px;font-size:0;background:${GOLD};background-image:linear-gradient(90deg,${GOLD},#F3DFA8,${ICE});">&nbsp;</td></tr>
    <tr><td style="padding:36px 28px 0;">
      ${keep(`<div style="font-size:11px;letter-spacing:0.24em;color:${ICE};">${esc(o.eyebrow)}</div>
      <h1 style="margin:10px 0 0;font-size:22px;line-height:1.5;font-weight:700;color:#FFFFFF;">${o.heading}</h1>`)}
    </td></tr>
    <tr><td style="padding:20px 28px 0;font-size:14px;line-height:1.9;color:${TEXT};">${keep(o.intro)}</td></tr>
    <tr><td style="padding:28px 28px 0;">
      ${keep(`<div style="font-size:11px;letter-spacing:0.24em;color:${GOLD};padding-bottom:8px;">${esc(o.sectionLabel)}</div>`)}
      <div style="height:1px;line-height:1px;font-size:0;${bg(GOLD)}">&nbsp;</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${o.rows}</table>
    </td></tr>
    <tr><td align="center" style="padding:32px 28px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="padding:1px;border-radius:999px;${bg(GOLD)}">
          <a href="${o.button.href}" style="display:block;padding:14px 34px;border-radius:999px;${bg("#16130D")}color:${GOLD};font-size:14px;font-weight:700;letter-spacing:0.12em;text-decoration:none;">${keep(`<span style="color:${GOLD};">${esc(o.button.label)}</span>`)}</a>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:24px 28px 32px;font-size:12px;line-height:1.9;color:${MUTED};">
      ${keep(o.notes.map((n) => `※ ${n}`).join("<br>\n      "))}
    </td></tr>
    <tr><td style="padding:32px 28px 28px;${bg("#08080A")}border-top:1px solid ${LINE};font-size:11px;line-height:1.9;color:${MUTED};text-align:center;">
      <img src="${o.logo}" width="180" alt="NEXT EMPEROR" style="display:block;margin:0 auto 14px;width:180px;max-width:60%;height:auto;border:0;">
      ${keep(`<div style="font-size:12px;letter-spacing:0.16em;color:${GOLD};margin-bottom:4px;">NEXT EMPEROR LLC</div>
      <a href="mailto:${b.email}" style="color:${ICE};text-decoration:none;">${b.email}</a>
      &nbsp;|&nbsp;
      <a href="${b.site}" style="color:${ICE};text-decoration:none;">next-emperor.com</a>`)}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function inquiryRows(input: ContactInput, sentAt: string): string {
  return [
    row("お問い合わせ種別", esc(input.type)),
    row("会社名", esc(input.company)),
    row("担当者名", `${esc(input.name)} 様`),
    row("メールアドレス", esc(input.email)),
    row("電話番号", esc(input.phone || "（未入力）")),
    row("お問い合わせ内容", nl2br(input.message)),
    row("送信日時", esc(sentAt)),
  ].join("");
}

/** お問い合わせした方に届く「自動返信メール」 */
export function autoReplyHtml(input: ContactInput, sentAt: string, logo = MAIL_BRAND.logo): string {
  const b = MAIL_BRAND;
  return shell({
    title: "お問い合わせを受け付けました",
    preheader: "お問い合わせいただき、ありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。",
    eyebrow: "THANK YOU",
    heading: "お問い合わせを<br>受け付けました",
    intro: `${esc(input.company)}<br>${esc(input.name)} 様<br><br>
      このたびは${esc(b.company)}へお問い合わせいただき、誠にありがとうございます。<br>
      以下の内容でお問い合わせを受け付けました。内容を確認のうえ、担当者より改めてご連絡いたします。`,
    sectionLabel: "YOUR INQUIRY",
    rows: inquiryRows(input, sentAt),
    button: { href: b.site, label: "公式サイトを見る" },
    notes: [
      "本メールは送信内容の確認のため、自動でお送りしています。",
      `このメールに返信いただくと、担当者（${esc(b.email)}）に届きます。`,
      "お心当たりのない場合は、お手数ですが本メールを破棄してください。",
    ],
    logo,
  });
}

/** 社内（通知先）に届く「お問い合わせ通知メール」 */
export function adminNoticeHtml(input: ContactInput, sentAt: string, logo = MAIL_BRAND.logo): string {
  const subject = encodeURIComponent(`Re: お問い合わせありがとうございます（${MAIL_BRAND.company}）`);
  return shell({
    title: "新しいお問い合わせ",
    preheader: `${input.company} ${input.name}様より「${input.type}」のお問い合わせがありました。`,
    eyebrow: "NEW INQUIRY",
    heading: "新しいお問い合わせが<br>届きました",
    intro: `公式サイトのお問い合わせフォームより、<br>${esc(input.company)} ${esc(input.name)} 様からお問い合わせがありました。`,
    sectionLabel: "INQUIRY DETAILS",
    rows: inquiryRows(input, sentAt),
    button: { href: `mailto:${encodeURIComponent(input.email)}?subject=${subject}`, label: "このお客様に返信する" },
    notes: [
      "このメールにそのまま返信すると、お問い合わせいただいた方に届きます。",
      "お問い合わせいただいた方には、受付完了の自動返信メールが送られています。",
    ],
    logo,
  });
}

function documentRows(input: DocumentInput, sentAt: string): string {
  return [
    row("会社名", esc(input.company)),
    row("担当者名", `${esc(input.name)} 様`),
    row("メールアドレス", esc(input.email)),
    row("電話番号", esc(input.phone || "（未入力）")),
    row("請求日時", esc(sentAt)),
  ].join("");
}

/** 資料をダウンロードした方に届くメール（資料のリンク付き） */
export function documentReplyHtml(input: DocumentInput, sentAt: string, logo = MAIL_BRAND.logo): string {
  const b = MAIL_BRAND;
  return shell({
    title: "サービス資料のご案内",
    preheader: "資料をご請求いただき、ありがとうございます。下のボタンから資料をダウンロードいただけます。",
    eyebrow: "SERVICE GUIDE",
    heading: "サービス資料を<br>お届けします",
    intro: `${esc(input.company)}<br>${esc(input.name)} 様<br><br>
      このたびは${esc(b.company)}のサービス資料をご請求いただき、誠にありがとうございます。<br>
      下のボタンから、資料（PDF）をダウンロードいただけます。採用マーケティングや営業支援について、ご不明な点やご相談があれば、お気軽にこのメールへご返信ください。`,
    sectionLabel: "YOUR REQUEST",
    rows: documentRows(input, sentAt),
    button: { href: `${b.site}${SERVICE_GUIDE.path}`, label: "資料をダウンロードする" },
    notes: [
      "本メールは資料のご請求にともない、自動でお送りしています。",
      `このメールに返信いただくと、担当者（${esc(b.email)}）に届きます。`,
      "お心当たりのない場合は、お手数ですが本メールを破棄してください。",
    ],
    logo,
  });
}

/** 社内（通知先）に届く「資料請求の通知メール」 */
export function documentAdminHtml(input: DocumentInput, sentAt: string, logo = MAIL_BRAND.logo): string {
  const subject = encodeURIComponent(`資料のご請求ありがとうございます（${MAIL_BRAND.company}）`);
  return shell({
    title: "サービス資料のダウンロード",
    preheader: `${input.company} ${input.name}様がサービス資料をダウンロードしました。`,
    eyebrow: "NEW LEAD",
    heading: "サービス資料が<br>ダウンロードされました",
    intro: `公式サイトの資料ダウンロードフォームより、<br>${esc(input.company)} ${esc(input.name)} 様が資料を請求しました。`,
    sectionLabel: "LEAD DETAILS",
    rows: documentRows(input, sentAt),
    button: { href: `mailto:${encodeURIComponent(input.email)}?subject=${subject}`, label: "このお客様にメールする" },
    notes: [
      "このメールにそのまま返信すると、資料を請求した方に届きます。",
      "資料を請求した方には、資料のリンクを記載したメールが自動で送られています。",
    ],
    logo,
  });
}
