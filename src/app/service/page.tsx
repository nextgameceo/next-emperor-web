import type { Metadata } from "next";
import { ButtonLink, Container, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "NEXT EMPERORの事業内容。人材集客・採用マーケティング支援と、営業代行・販路開拓などの法人営業支援を行います。",
  alternates: { canonical: "/service" },
};

const services = [
  {
    no: "01",
    en: "Recruitment Marketing",
    title: "人材集客・採用マーケティング支援",
    lead: "夜職から昼職への転職を検討している方に向けて、提携企業の求人情報や応募機会を提供します。SNSや広告などを活用し、企業の採用活動を支援します。",
    forPeople: [
      "夜職から昼職へ挑戦したい方に、提携企業の求人情報をお届けします",
      "応募はご本人が各企業の公式応募窓口へ直接行えます",
      "これまでの経験が活かせる仕事との出会いをサポートします",
    ],
    forBusiness: [
      "SNS・広告を活用した求人の認知拡大",
      "ターゲットに届く求人情報・採用コンテンツの企画",
      "応募につながる採用導線の設計",
    ],
  },
  {
    no: "02",
    en: "Sales Support",
    title: "法人営業支援事業",
    lead: "企業の営業課題や事業拡大をサポートします。営業代行、販路開拓、営業戦略の立案、ビジネスパートナーとの連携などを支援します。",
    forBusiness: ["営業代行", "販路開拓", "営業戦略の立案・営業コンサルティング", "ビジネスパートナーとの連携支援"],
  },
];

export default function ServicePage() {
  return (
    <>
      <PageHero eyebrow="事業内容" title="Service" lead="2つの事業で、人と企業の未来を支える。" />

      {services.map((s, i) => (
        <Section key={s.no} labelledBy={`svc-${s.no}`} className={i > 0 ? "border-t border-charcoal-line" : ""}>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[4fr_8fr] lg:gap-20">
              <div>
                <p className="font-display text-7xl leading-none"><span className="metal-gold">{s.no}</span></p>
                <p className="eyebrow mt-4">{s.title}</p>
              </div>
              <div>
                <h2 id={`svc-${s.no}`} className="heading-en">
                  {s.en}
                </h2>
                <p className="mt-2 text-sm tracking-[0.06em] text-gold-soft">{s.title}</p>
                <p className="body-text mt-6">{s.lead}</p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {s.forPeople && (
                    <div className="card corners p-7">
                      <h3 className="text-sm tracking-[0.14em] text-gold">求職者の方へ</h3>
                      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ivory-muted">
                        {s.forPeople.map((t) => (
                          <li key={t} className="flex gap-3">
                            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold/70" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="card corners p-7">
                    <h3 className="text-sm tracking-[0.14em] text-gold">企業の方へ</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ivory-muted">
                      {s.forBusiness.map((t) => (
                        <li key={t} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold/70" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <section className="theme-light border-t border-charcoal-line py-20">
        <Container className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <ButtonLink href="/recruit">お仕事を探す</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            法人のお問い合わせ
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
