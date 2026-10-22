import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { Ornament } from "@/components/Decor";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

type Params = { slug: string };

export const revalidate = 3600;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || siteConfig.description,
    alternates: { canonical: `/blog/${post.slug}` },
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

  const others = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    image: post.cover ? `${siteConfig.url}${post.cover}` : `${siteConfig.url}/opengraph-image.png`,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
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
                <li><Link href="/blog" className="hover:text-gold">BLOG</Link></li>
              </ol>
            </nav>
            <div className="fade-up flex flex-wrap items-center gap-3 text-xs">
              <time dateTime={post.date} className="font-display tracking-[0.14em] text-ivory-dim">
                {formatDate(post.date)}
              </time>
              <Link
                href={`/blog/category/${encodeURIComponent(post.category)}`}
                className="border border-ice/50 px-2 py-0.5 tracking-[0.1em] text-ice hover:bg-ice/10"
              >
                {post.category}
              </Link>
            </div>
            <h1 className="fade-up-delay mt-6 text-[1.6rem] font-medium leading-[1.6] tracking-[0.04em] text-ivory sm:text-[2.2rem]">
              {post.title}
            </h1>
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

            <Ornament className="mt-16" />
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/recruit">求人情報を見る</ButtonLink>
              <ButtonLink href="/blog" variant="outline">
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
              <Eyebrow>その他の記事</Eyebrow>
            </div>
            <h2 id="more-title" className="heading-en mt-5" data-reveal>
              More <span className="metal-gold">Stories</span>
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
