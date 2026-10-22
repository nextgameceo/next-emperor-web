import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";
import { Sparkle } from "./Decor";

/** ブログ記事カード */
export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="card corners group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[1200/630] w-full overflow-hidden border-b border-charcoal-line bg-black">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <Sparkle className="h-4 w-4 text-gold" />
            <span className="font-display text-sm tracking-[0.3em] text-silver/70">NEXT EMPEROR</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-xs">
          <time dateTime={post.date} className="font-display tracking-[0.14em] text-ivory-dim">
            {formatDate(post.date)}
          </time>
          <span className="border border-ice/50 px-2 py-0.5 tracking-[0.1em] text-ice">{post.category}</span>
        </div>
        <h3 className="mt-4 text-lg font-medium leading-[1.7] tracking-[0.04em] text-ivory transition-colors group-hover:text-gold-soft">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
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
