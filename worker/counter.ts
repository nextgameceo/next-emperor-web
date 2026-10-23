/**
 * LINE応募フォームの送信数カウンター（Cloudflare Durable Objects）
 * ------------------------------------------------------------
 * ・求人ページの「LINEを開く」が押された回数を、求人ごとに数えます。
 * ・同じ方（同じ回線）が同じ求人で同じ日に何度押しても、1回として数えます。
 * ・個人を特定できる情報は保存しません（重複判定には、回線情報を変換した文字列を1日だけ使います）。
 */

type Storage = {
  get<T>(key: string): Promise<T | undefined>;
  put(key: string, value: unknown): Promise<void>;
  delete(keys: string[]): Promise<number>;
  list<T>(options: { prefix: string; limit?: number }): Promise<Map<string, T>>;
};

type State = { storage: Storage };

const DAY = 24 * 60 * 60 * 1000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });

export class ApplyCounter {
  constructor(private state: State) {}

  private async snapshot() {
    const counts = (await this.state.storage.get<Record<string, number>>("counts")) ?? {};
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return { total, counts };
  }

  async fetch(req: Request): Promise<Response> {
    if (req.method === "GET") return json(await this.snapshot());

    if (req.method === "POST") {
      const { slug, key } = (await req.json()) as { slug: string; key: string };
      const seenKey = `seen:${key}`;
      if (!(await this.state.storage.get(seenKey))) {
        await this.state.storage.put(seenKey, Date.now());
        const counts = (await this.state.storage.get<Record<string, number>>("counts")) ?? {};
        counts[slug] = (counts[slug] ?? 0) + 1;
        await this.state.storage.put("counts", counts);
      }
      // ときどき、1日以上前の重複判定データを削除する
      if (Math.random() < 0.1) {
        const seen = await this.state.storage.list<number>({ prefix: "seen:", limit: 500 });
        const old = [...seen].filter(([, t]) => Date.now() - t > DAY).map(([k]) => k);
        if (old.length > 0) await this.state.storage.delete(old);
      }
      return json(await this.snapshot());
    }

    return json({ error: "method not allowed" }, 405);
  }
}
