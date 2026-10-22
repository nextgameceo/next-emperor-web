import type { Metadata } from "next";
import { ButtonLink, Container, PageHero, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "法人向けサービス",
  description:
    "NEXT EMPERORの法人向けサービス。採用マーケティング、人材集客、営業代行・販路開拓・営業戦略立案で、企業の成長を支援します。",
  alternates: { canonical: "/business" },
};

const issues = [
  "求人を出しても、応募が集まらない",
  "人と話すことが得意な人材に出会いたい",
  "営業の人手が足りず、新規開拓が進まない",
  "新しい販路やビジネスパートナーを探している",
];

const menus = [
  {
    en: "Recruitment Marketing",
    title: "採用マーケティング・人材集客",
    body: "SNSや広告を活用し、新しいキャリアを求める層へ求人情報を届けます。接客・営業・コミュニケーションに強みを持つ人材との出会いを創出します。",
  },
  {
    en: "Sales Outsourcing",
    title: "営業代行",
    body: "営業活動の一部または全体を担い、商談機会の創出から成約までを支援します。",
  },
  {
    en: "Market Development",
    title: "販路開拓・パートナー連携",
    body: "新たな顧客層や販路の開拓、ビジネスパートナーとの連携を支援し、事業拡大の機会をつくります。",
  },
  {
    en: "Sales Consulting",
    title: "営業戦略立案・コンサルティング",
    body: "営業課題を整理し、ターゲット設定から営業プロセスの設計まで、成果につながる戦略づくりを支援します。",
  },
];

const steps = [
  { no: "01", title: "お問い合わせ", body: "フォームより、ご相談内容をお送りください。" },
  { no: "02", title: "ヒアリング", body: "現在の課題や目標を詳しくお伺いします。" },
  { no: "03", title: "ご提案", body: "課題に合わせた支援内容をご提案します。" },
  { no: "04", title: "支援開始", body: "合意のうえで支援を開始し、伴走します。" },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="法人向けサービス"
        title="For Business"
        lead="NEXT EMPERORは、企業の採用マーケティング、集客、営業活動を支援します。新しい人材との出会いやビジネス機会の創出をサポートします。"
      />

      <Section labelledBy="issues-title">
        <Container>
          <SectionHeading eyebrow="こんな課題はありませんか" id="issues-title" title={<>Your <span className="metal-gold">Challenges</span></>} />
          <ul className="mt-12 grid gap-px bg-charcoal-line sm:grid-cols-2">
            {issues.map((t) => (
              <li key={t} className="flex items-center gap-5 bg-ink px-7 py-7 text-ivory/90">
                <span aria-hidden className="h-px w-6 shrink-0 bg-gold" />
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="menu-title" className="border-t border-charcoal-line bg-charcoal/30">
        <Container>
          <SectionHeading eyebrow="支援内容" id="menu-title" title={<>What <span className="metal-gold">We Do</span></>} />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {menus.map((m) => (
              <article key={m.title} className="card corners p-8 sm:p-10">
                <p className="eyebrow">{m.en}</p>
                <h3 className="mt-4 font-serif text-xl tracking-[0.06em]">{m.title}</h3>
                <p className="body-text mt-4">{m.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="flow-title" className="border-t border-charcoal-line">
        <Container>
          <SectionHeading eyebrow="ご相談の流れ" id="flow-title" title={<>How It <span className="metal-gold">Works</span></>} />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.no} className="border-t border-gold/40 pt-6">
                <p className="font-display text-4xl"><span className="metal-gold">{s.no}</span></p>
                <p className="mt-3 font-serif text-lg tracking-[0.06em]">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ivory-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 text-center">
            <ButtonLink href="/contact">法人のお問い合わせ</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
