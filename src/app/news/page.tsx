import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { Container, PageHero, Section } from "@/components/ui";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "ニュース・コラム｜夜職から昼職へのキャリアチェンジ情報",
  description: "NEXT EMPERORのニュース・コラム一覧。お知らせのほか、夜職から昼職へのキャリアチェンジを考える方や、採用に取り組む企業様に役立つ情報を発信しています。",
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
