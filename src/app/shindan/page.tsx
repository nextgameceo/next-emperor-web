import type { Metadata } from "next";
import Diagnosis from "@/components/Diagnosis";
import { Container, PageHero, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "適職診断｜夜の経験が活きる昼職タイプ",
  description:
    "全7問・約1分の適職診断。夜の仕事で磨いた強みと、その強みが活きやすい昼の仕事の例がわかります。回答内容は送信・保存されません。",
  alternates: { canonical: "/shindan" },
};

export default function ShindanPage() {
  return (
    <>
      <PageHero
        eyebrow="適職診断"
        title="Career Check"
        photo="dusk"
        lead="夜の仕事で磨いてきた力は、昼の世界のどこで活きるのか。7つの質問に答えて、あなたの強みのタイプを見つけましょう。"
      />
      <Section>
        <Container className="max-w-3xl">
          <Diagnosis shareUrl={`${siteConfig.url}/shindan`} />
        </Container>
      </Section>
    </>
  );
}
