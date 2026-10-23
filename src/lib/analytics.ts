/**
 * Google アナリティクス（GA4）
 * ------------------------------------------------------------
 * ・測定IDは下の GA_ID です（変更する場合はここだけ書き換え）。
 * ・個人を特定できる情報（名前・年齢・連絡先など）は絶対に送らないでください。
 */
export const GA_ID = "G-88ZR6HMJ95";

type Gtag = (...args: unknown[]) => void;

/** イベントを送信（GA が読み込まれていない環境では何もしない） */
export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", event, { ...params, transport_type: "beacon" });
}
