import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogList from "@/components/BlogList";
import { Container, PageHero, Section } from "@/components/ui";
import { getAllPosts, getCategories } from "@/lib/blog";

type Params = { name: string };

export const revalidate = 3600;

export function generateStaticParams(): Params[] {
  return getCategories().map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const name = decodeURIComponent((await params).name);
  return {
    title: `${name}｜ブログ`,
    alternates: { canonical: `/blog/category/${encodeURIComponent(name)}` },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<Params> }) {
  const name = decodeURIComponent((await params).name);
  const categories = getCategories();
  if (!categories.includes(name)) notFound();
  const posts = getAllPosts().filter((p) => p.category === name);

  return (
    <>
      <PageHero eyebrow={`カテゴリ：${name}`} title="Blog" />
      <Section divider={false}>
        <Container>
          <BlogList posts={posts} categories={categories} current={name} />
        </Container>
      </Section>
    </>
  );
}
