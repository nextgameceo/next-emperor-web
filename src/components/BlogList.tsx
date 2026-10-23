import Link from "next/link";
import PostCard from "./PostCard";
import { delay } from "./ui";
import type { PostMeta } from "@/lib/blog";

/** カテゴリ切り替え＋記事一覧（/news と /news/category/[name] で共通） */
export default function BlogList({
  posts,
  categories,
  current,
}: {
  posts: PostMeta[];
  categories: string[];
  current?: string;
}) {
  const tab = (active: boolean) =>
    `border px-4 py-2 text-xs tracking-[0.12em] transition-colors ${
      active ? "border-gold bg-gold/10 text-gold" : "border-charcoal-line text-ivory-muted hover:border-ice hover:text-ice"
    }`;

  return (
    <>
      {categories.length > 0 && (
        <nav aria-label="カテゴリ" data-reveal>
          <ul className="flex flex-wrap gap-3">
            <li>
              <Link href="/news" className={tab(!current)} aria-current={!current ? "page" : undefined}>
                <span className="font-display">ALL</span>
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href={`/news/category/${encodeURIComponent(c)}`}
                  className={tab(current === c)}
                  aria-current={current === c ? "page" : undefined}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {posts.length > 0 ? (
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug} data-reveal style={delay((i % 3) * 0.1)}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="card corners mt-12 px-8 py-16 text-center">
          <p className="font-display text-xl tracking-[0.2em] text-gold">COMING SOON</p>
          <p className="body-text mt-4">記事は準備ができ次第、公開いたします。</p>
        </div>
      )}
    </>
  );
}
