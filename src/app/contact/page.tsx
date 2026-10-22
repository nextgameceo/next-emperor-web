import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Container, Notice, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "NEXT EMPERORへの法人のお問い合わせ。採用マーケティング、人材集客、営業代行・営業支援のご相談はこちらから。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="お問い合わせ"
        title="Contact"
        lead="採用マーケティング、人材集客、営業支援に関するご相談・ご依頼は、こちらのフォームよりお問い合わせください。"
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="mb-12">
            <Notice>
              こちらは法人のお客様向けのお問い合わせフォームです。求人への応募は、各求人ページから掲載企業の公式応募フォームへ直接お進みください。
            </Notice>
          </div>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
