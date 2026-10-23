import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { Container, PageHero, Section } from "@/components/ui";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "ニュース",
  description: "NEXT EMPERORのニュース。お知らせや、夜職から昼職へのキャリアチェンジに役立つ情報を発信しています。",
  alternates: { canonical: "/news" },
};


export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="ニュース"
        title="News"
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
