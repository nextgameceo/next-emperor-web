import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCta from "@/components/ArticleCta";
import PostCard from "@/components/PostCard";
import ShareButtons from "@/components/ShareButtons";
import { Ornament } from "@/components/Decor";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";

type Params = { slug: string };

export const dynamicParams = false;


export function generateStaticParams(): Params[] {
  // 静的書き出しでは1件以上が必要なため、0件のときはダミー（404になるページ）を1つ返す
  const list = getAllPosts().map((p) => ({ slug: p.slug }));
  return list.length > 0 ? list : [{ slug: "none" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || siteConfig.description,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || siteConfig.description,
      publishedTime: post.date,
      // アイキャッチ画像があればそれを、なければサイト共通のシェア画像を使用
      images: [{ url: post.cover || "/opengraph-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const others = getRelatedPosts(post, 3);
  const pageUrl = `${siteConfig.url}/news/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    image: post.cover ? `${siteConfig.url}${post.cover}` : `${siteConfig.url}/opengraph-image.png`,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    mainEntityOfPage: `${siteConfig.url}/news/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="border-b border-gold/20 pb-14 pt-36 sm:pt-44">
          <Container className="max-w-3xl">
            <nav aria-label="パンくずリスト" className="fade-up mb-8 text-xs tracking-[0.12em] text-ivory-dim">
              <ol className="flex flex-wrap gap-2 font-display">
                <li><Link href="/" className="hover:text-gold">HOME</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/news" className="hover:text-gold">NEWS</Link></li>
              </ol>
            </nav>
            <div className="fade-up flex flex-wrap items-center gap-3 text-xs">
              <time dateTime={post.date} className="font-display tracking-[0.14em] text-ivory-dim">
                {formatDate(post.date)}
              </time>
              <Link
                href={`/news/category/${encodeURIComponent(post.category)}`}
                className="border border-ice/50 px-2 py-0.5 tracking-[0.1em] text-ice hover:bg-ice/10"
              >
                {post.category}
              </Link>
            </div>
            <h1 className="fade-up-delay mt-6 text-[1.6rem] font-medium leading-[1.6] tracking-[0.04em] text-ivory sm:text-[2.2rem]">
              {post.title}
            </h1>
            <div className="fade-up-delay mt-8">
              <ShareButtons url={pageUrl} title={post.title} label="シェア" />
            </div>
          </Container>
        </header>

        <Section divider={false} className="!pt-14">
          <Container className="max-w-3xl">
            {post.cover && (
              <div className="relative mb-12 aspect-[1200/630] w-full overflow-hidden border border-charcoal-line">
                <Image src={post.cover} alt="" fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
              </div>
            )}
            <div className="prose-ne" dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="mt-14 border-t border-ivory/10 pt-8">
              <ShareButtons url={pageUrl} title={post.title} />
            </div>

            <Ornament className="mt-14" />
            <div className="mt-12">
              <ArticleCta audience={post.audience} />
            </div>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/news" variant="outline">
                記事一覧へ戻る
              </ButtonLink>
            </div>
          </Container>
        </Section>
      </article>

      {others.length > 0 && (
        <Section labelledBy="more-title" band>
          <Container>
            <div data-reveal>
              <Eyebrow>{post.audience === "general" ? "その他の記事" : "あわせて読みたい"}</Eyebrow>
            </div>
            <h2 id="more-title" className="heading-en mt-5" data-reveal>
              {post.audience === "general" ? (
                <>
                  More <span className="metal-gold">Stories</span>
                </>
              ) : (
                <>
                  Related <span className="metal-gold">Stories</span>
                </>
              )}
            </h2>
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
