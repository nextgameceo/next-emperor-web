/** お問い合わせフォームの項目定義と入力チェック（画面とサーバーで共通利用） */

export const inquiryTypes = [
  "採用マーケティングについて",
  "人材集客支援について",
  "法人営業支援・営業代行について",
  "提携・パートナーシップについて",
  "その他",
] as const;

export type ContactInput = {
  company: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  agree: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9０-９+\-−ー()（）\s]{10,20}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!input.company.trim()) e.company = "会社名を入力してください。";
  else if (input.company.length > 100) e.company = "100文字以内で入力してください。";

  if (!input.name.trim()) e.name = "担当者名を入力してください。";
  else if (input.name.length > 50) e.name = "50文字以内で入力してください。";

  if (!input.email.trim()) e.email = "メールアドレスを入力してください。";
  else if (!EMAIL_RE.test(input.email) || input.email.length > 254)
    e.email = "メールアドレスの形式が正しくありません。";

  if (input.phone.trim() && !PHONE_RE.test(input.phone.trim()))
    e.phone = "電話番号の形式が正しくありません。";

  if (!inquiryTypes.includes(input.type as (typeof inquiryTypes)[number]))
    e.type = "お問い合わせ種別を選択してください。";

  if (!input.message.trim()) e.message = "お問い合わせ内容を入力してください。";
  else if (input.message.trim().length < 10) e.message = "10文字以上で入力してください。";
  else if (input.message.length > 3000) e.message = "3000文字以内で入力してください。";

  if (!input.agree) e.agree = "個人情報の取り扱いへの同意が必要です。";
  return e;
}
