/**
 * LINE応募フォームの送信数（/api/apply-count）
 * ・送るのは求人の slug だけです。入力内容（名前・年齢など）は送りません。
 */
export function recordApplyClick(slug: string) {
  try {
    void fetch("/api/apply-count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* 計測に失敗しても応募の邪魔はしない */
  }
}

export async function fetchApplyTotal(): Promise<number | null> {
  try {
    const res = await fetch("/api/apply-count", { cache: "no-store" });
    if (!res.ok) return null;
    const d = (await res.json()) as { total?: number; available?: boolean };
    if (d.available === false || typeof d.total !== "number") return null;
    return d.total;
  } catch {
    return null;
  }
}
