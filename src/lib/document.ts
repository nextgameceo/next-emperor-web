/** サービス資料ダウンロードフォームの項目定義と入力チェック（画面とサーバーで共通利用） */

/** ダウンロードしてもらう資料（public/docs/ に置いたPDF） */
export const SERVICE_GUIDE = {
  title: "NEXT EMPEROR 企業向けサービス資料",
  path: "/docs/next-emperor-service-guide.pdf",
  pages: 10,
};

export type DocumentInput = {
  company: string;
  name: string;
  email: string;
  phone: string;
  agree: boolean;
};

export type DocumentErrors = Partial<Record<keyof DocumentInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9０-９+\-−ー()（）\s]{10,20}$/;

export function validateDocument(input: DocumentInput): DocumentErrors {
  const e: DocumentErrors = {};
  if (!input.company.trim()) e.company = "会社名を入力してください。";
  else if (input.company.length > 100) e.company = "100文字以内で入力してください。";

  if (!input.name.trim()) e.name = "担当者名を入力してください。";
  else if (input.name.length > 50) e.name = "50文字以内で入力してください。";

  if (!input.email.trim()) e.email = "メールアドレスを入力してください。";
  else if (!EMAIL_RE.test(input.email) || input.email.length > 254)
    e.email = "メールアドレスの形式が正しくありません。";

  if (input.phone.trim() && !PHONE_RE.test(input.phone.trim()))
    e.phone = "電話番号の形式が正しくありません。";

  if (!input.agree) e.agree = "個人情報の取り扱いへの同意が必要です。";
  return e;
}
