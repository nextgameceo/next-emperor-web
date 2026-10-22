import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { Container, PageHero, Section } from "@/components/ui";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "ブログ",
  description: "NEXT EMPERORのブログ。お知らせや、夜職から昼職へのキャリアチェンジに役立つ情報を発信しています。",
  alternates: { canonical: "/blog" },
};

// 1時間ごとに更新（予約投稿の記事が日付になると表示されます）
export const revalidate = 3600;

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="ブログ"
        title="Blog"
        lead="お知らせや、新しいキャリアに役立つ情報をお届けします。"
      />
      <Section divider={false}>
        <Container>
          <BlogList posts={getAllPosts()} categories={getCategories()} />
        </Container>
      </Section>
    </>
  );
}
