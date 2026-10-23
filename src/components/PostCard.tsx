import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

/** ニュース記事カード */
export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="card corners group relative flex h-full flex-col overflow-hidden">
      {/* 記事に cover（画像）を設定したときだけ、画像を表示 */}
      {post.cover && (
        <div className="relative aspect-[1200/630] w-full overflow-hidden border-b border-charcoal-line bg-black">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-xs">
          <time dateTime={post.date} className="font-display tracking-[0.14em] text-ivory-dim">
            {formatDate(post.date)}
          </time>
          <span className="border border-ice/50 px-2 py-0.5 tracking-[0.1em] text-ice">{post.category}</span>
        </div>
        <h3 className="mt-4 text-lg font-medium leading-[1.7] tracking-[0.04em] text-ivory transition-colors group-hover:text-gold-soft">
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-[1.9] text-ivory-muted">{post.excerpt}</p>}
        <p className="mt-auto pt-6 font-display text-xs tracking-[0.2em] text-gold transition-colors group-hover:text-ice">
          READ MORE <span aria-hidden>→</span>
        </p>
      </div>
    </article>
  );
}
