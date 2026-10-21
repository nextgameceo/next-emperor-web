import type { Metadata } from "next";
import PartnerCard from "@/components/PartnerCard";
import { ButtonLink, Container, PageHero, Section } from "@/components/ui";
import { getApprovedPartners } from "@/lib/data";

export const metadata: Metadata = {
  title: "提携企業",
  description: "NEXT EMPERORの提携企業のご紹介。人と企業の新しい出会いを、ともにつくるパートナーです。",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  const partners = getApprovedPartners();

  return (
    <>
      <PageHero
        eyebrow="Partner"
        title="提携企業"
        lead="新しい挑戦を受け入れ、人の可能性を信じる企業とともに。"
      />
      <Section>
        <Container>
          {partners.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((p) => (
                <li key={p.id}>
                  <PartnerCard partner={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="card px-8 py-16 text-center">
              <p className="font-serif text-xl tracking-[0.06em]">提携企業は、順次掲載予定です。</p>
            </div>
          )}

          <div className="mt-20 border-t border-charcoal-line pt-14 text-center">
            <p className="font-serif text-xl tracking-[0.06em] sm:text-2xl">提携をご検討の企業様へ</p>
            <p className="body-text mx-auto mt-5 max-w-2xl">
              採用活動・集客・営業活動でお力添えできることがあれば、お気軽にお問い合わせください。
            </p>
            <div className="mt-10">
              <ButtonLink href="/contact">法人のお問い合わせ</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
