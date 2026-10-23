import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogList from "@/components/BlogList";
import { Container, PageHero, Section } from "@/components/ui";
import { getAllPosts, getCategories } from "@/lib/blog";

type Params = { name: string };

export const dynamicParams = false;


export function generateStaticParams(): Params[] {
  // 静的書き出しでは1件以上が必要なため、0件のときはダミー（404になるページ）を1つ返す
  const list = getCategories().map((name) => ({ name }));
  return list.length > 0 ? list : [{ name: "none" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const name = decodeURIComponent((await params).name);
  return {
    title: `${name}｜ニュース`,
    alternates: { canonical: `/news/category/${encodeURIComponent(name)}` },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<Params> }) {
  const name = decodeURIComponent((await params).name);
  const categories = getCategories();
  if (!categories.includes(name)) notFound();
  const posts = getAllPosts().filter((p) => p.category === name);

  return (
    <>
      <PageHero eyebrow={`カテゴリ：${name}`} title="News" />
      <Section divider={false}>
        <Container>
          <BlogList posts={posts} categories={categories} current={name} />
        </Container>
      </Section>
    </>
  );
}
