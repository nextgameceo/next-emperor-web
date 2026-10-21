import type { Metadata } from "next";
import { Container, PageHero, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "NEXT EMPERORの会社概要。夜職から昼職へのキャリアチェンジを応援する採用マーケティング・法人営業支援会社です。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const c = siteConfig.company;
  // 値が入っている項目だけを表示（未確定情報は表示しない）
  const rows = [
    { k: "会社名", v: c.legalName },
    { k: "英語表記", v: c.englishName },
    { k: "代表者", v: c.representative },
    { k: "設立", v: c.established || c.status },
    { k: "資本金", v: c.capital },
    { k: "所在地", v: c.address || c.location },
    { k: "電話番号", v: c.tel },
  ].filter((r) => r.v);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="会社概要"
        lead="夜の経験を、明日の可能性へ。NEXT EMPERORは、人と企業の新しい出会いを支える会社です。"
      />

      <Section labelledBy="message-title">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <SectionHeading eyebrow="Message" id="message-title" title={<>経験に、誇りを。<br />未来に、選択肢を。</>} />
            <div className="body-text space-y-6">
              <p>
                接客で磨いた気配り、初対面の人と信頼関係を築く力、数字に向き合ってきた営業力。夜の仕事で培われたこれらの力は、昼の仕事でも大きな強みになります。
              </p>
              <p>
                NEXT EMPERORは、夜職を否定しません。これまでの経験を強みとして尊重し、新しい働き方に挑戦したい方へ、選択肢と機会を届けます。転職を強制することはありません。
              </p>
              <p>
                同時に、企業の採用活動や営業活動を支援し、新しい人材との出会いと事業の成長をサポートします。求職者に希望を、企業に成長の機会を。それが私たちの役割です。
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2">
            <div className="card corners p-9 sm:p-12">
              <p className="font-display text-3xl italic"><span className="metal-gold">Mission</span></p>
              <p className="mt-5 font-serif text-lg leading-[2] tracking-[0.06em]">
                夜職で培った接客力、営業力、コミュニケーション能力を活かし、新しいキャリアの可能性を広げる。
              </p>
            </div>
            <div className="card corners p-9 sm:p-12">
              <p className="font-display text-3xl italic"><span className="metal-gold">Vision</span></p>
              <p className="mt-5 font-serif text-lg leading-[2] tracking-[0.06em]">
                誰もが過去の経験に誇りを持ち、自分らしい未来へ挑戦できる社会をつくる。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section labelledBy="profile-title" className="border-t border-charcoal-line">
        <Container>
          <SectionHeading eyebrow="Company Profile" id="profile-title" title="会社情報" />
          <dl className="mt-12 border-t border-charcoal-line">
            {rows.map((r) => (
              <div key={r.k} className="grid gap-2 border-b border-charcoal-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                <dt className="text-sm tracking-[0.12em] text-gold">{r.k}</dt>
                <dd className="text-ivory/90">{r.v}</dd>
              </div>
            ))}
            <div className="grid gap-2 border-b border-charcoal-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <dt className="text-sm tracking-[0.12em] text-gold">事業内容</dt>
              <dd>
                <ul className="space-y-1 text-ivory/90">
                  {c.business.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Container>
      </Section>
    </>
  );
}
