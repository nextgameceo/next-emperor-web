import "server-only";

/** メール送信に必要な環境変数がすべて設定されているか */
export function isMailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim() &&
      process.env.CONTACT_FROM_EMAIL?.trim(),
  );
}
