import type { Metadata } from "next";
import BgPhoto from "@/components/BgPhoto";
import { LineIcon, NightToDayArt } from "@/components/Art";
import BigMarquee from "@/components/BigMarquee";
import { Container, PageHero, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "NEXT EMPEROR（愛知県名古屋市）の会社概要。夜職から昼職へのキャリアチェンジを応援する採用マーケティング・法人営業支援会社です。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const c = siteConfig.company;
  // 値が入っている項目だけを表示（未確定情報は表示しない）
  // 所在地の表示（郵便番号と住所を2段に分ける）
  const addressLines = (c.address || "").replace(/^(〒\d{3}-\d{4})\s*/, "$1\n");
  // 地図の検索に使う住所（郵便番号と階数を除く）
  // 住所を「郵便番号／番地まで／建物名」に分ける
  const addrMatch = (c.address || "").match(/^(〒\d{3}-\d{4})?\s*(\S+)\s*(.*)$/);
  const access = { postal: addrMatch?.[1] ?? "", street: addrMatch?.[2] ?? c.address ?? "", building: addrMatch?.[3] ?? "" };
  // 地図の検索に使う住所（「3丁目19番23号」→「3丁目19-23」の形にすると、1か所にピンが立ちやすい）
  const mapQuery = access.street.replace(/(\d+)番(\d+)号?$/, "$1-$2");
  const rows = [
    { k: "会社名", v: c.legalName },
    { k: "英語表記", v: c.englishName },
    { k: "代表者", v: c.representative },
    { k: "設立", v: c.established || c.status },
    { k: "資本金", v: c.capital },
    { k: "所在地", v: addressLines || c.location },
    { k: "電話番号", v: c.tel },
    { k: "メール", v: c.email },
  ].filter((r) => r.v);

  return (
    <>
      <PageHero
        eyebrow="会社概要"
        title="About Us"
        photo="nightView"
        lead="夜の経験を、明日の可能性へ。NEXT EMPERORは、人と企業の新しい出会いを支える会社です。"
      />

      <Section labelledBy="message-title" bg={<BgPhoto photo="skyAbove" mono blend="multiply" fade="both" opacity={0.12} />}>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <SectionHeading eyebrow="経験に、誇りを。未来に、選択肢を。" id="message-title" title={<><span className="metal-silver">Pride in Your Past.</span><br /><span className="metal-gold">Choice for Your Future.</span></>} />
            <div className="body-text space-y-6">
              <div className="mb-10 max-w-md text-ivory" data-reveal>
                <NightToDayArt className="h-auto w-full" />
              </div>
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

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[
              { en: "Mission", icon: "target" as const, text: "夜職で培った接客力、営業力、コミュニケーション能力を活かし、新しいキャリアの可能性を広げる。" },
              { en: "Vision", icon: "compass" as const, text: "誰もが過去の経験に誇りを持ち、自分らしい未来へ挑戦できる社会をつくる。" },
            ].map((m, i) => (
              <div key={m.en} className="card corners flex gap-5 p-6 sm:p-7" data-reveal style={{ "--d": `${i * 0.12}s` } as React.CSSProperties}>
                <LineIcon name={m.icon} className="h-9 w-9 shrink-0 text-ivory/60" />
                <div>
                  <p className="font-display text-[0.7rem] uppercase tracking-[0.3em] text-ice">{m.en}</p>
                  <p className="mt-2 text-[0.95rem] leading-[1.9] tracking-[0.04em] text-ivory">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <BigMarquee words={["Pride", "Choice", "Respect", "Future"]} />

      <Section labelledBy="profile-title">
        <Container>
          <SectionHeading eyebrow="会社情報" id="profile-title" title="Company Profile" />
          <dl className="mt-12 border-t border-charcoal-line">
            {rows.map((r) => (
              <div key={r.k} className="grid gap-2 border-b border-charcoal-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                <dt className="text-sm tracking-[0.12em] text-gold">{r.k}</dt>
                <dd className="whitespace-pre-line text-ivory/90">{r.v}</dd>
              </div>
            ))}
            <div className="grid gap-2 border-b border-charcoal-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <dt className="text-sm tracking-[0.12em] text-gold">事業内容</dt>
              <dd>
                <ol className="space-y-6">
                  {c.business.map((b, i) => (
                    <li key={b.title}>
                      <p className="flex items-baseline gap-3 font-serif tracking-[0.05em] text-ivory">
                        <span className="font-display text-lg text-ice">{String(i + 1).padStart(2, "0")}</span>
                        {b.title}
                      </p>
                      {b.items.length > 0 && (
                      <ul className="mt-2 space-y-1 pl-9 text-sm leading-[1.9] text-ivory-muted">
                        {b.items.map((it) => (
                          <li key={it} className="relative before:absolute before:-left-4 before:top-[0.85em] before:h-px before:w-2 before:bg-gold/70">
                            {it}
                          </li>
                        ))}
                      </ul>
                      )}
                    </li>
                  ))}
                  {c.businessNote && (
                    <li>
                      <p className="flex items-baseline gap-3 font-serif tracking-[0.05em] text-ivory">
                        <span className="font-display text-lg text-ice">{String(c.business.length + 1).padStart(2, "0")}</span>
                        {c.businessNote}
                      </p>
                    </li>
                  )}
                </ol>
              </dd>
            </div>
          </dl>

          {/* ===== ACCESS（Googleマップ） ===== */}
          {c.address && (
            <div className="mt-20" id="access">
              <div className="theme-dark grid overflow-hidden border border-white/10 bg-black lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" data-reveal>
                {/* 地図（白黒にして、サイトの雰囲気に合わせる） */}
                <div className="relative aspect-[4/3] overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[420px]">
                  <iframe
                    title={`${c.legalName} の所在地（Googleマップ）`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=ja&z=16&output=embed`}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  {/* 端をうっすら暗くして、カードと馴染ませる（操作の邪魔はしない） */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.22)]" />
                </div>

                {/* 住所と経路 */}
                <div className="relative flex flex-col justify-between gap-10 p-8 sm:p-10 lg:order-1 lg:p-12">
                  <div>
                    <p className="flex items-center gap-3 font-display text-xs tracking-[0.3em] text-gold">
                      <span aria-hidden className="h-[5px] w-[5px] rotate-45 bg-gold" />
                      ACCESS
                    </p>
                    <h3 className="mt-5 text-xl tracking-[0.08em] text-ivory sm:text-2xl">オフィスへのアクセス</h3>
                    <div className="mt-8 border-t border-white/10 pt-8">
                      <p className="text-sm tracking-[0.1em] text-ivory">{c.legalName}</p>
                      <address className="mt-4 not-italic text-sm leading-[2.1] tracking-[0.06em] text-ivory/70">
                        {access.postal && <span className="block font-display tracking-[0.14em] text-ice">{access.postal}</span>}
                        <span className="block">{access.street}</span>
                        {access.building && <span className="block">{access.building}</span>}
                      </address>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-gold px-7 text-sm font-semibold tracking-[0.12em] text-black transition-opacity hover:opacity-90"
                    >
                      経路を調べる <span aria-hidden>↗</span>
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/20 px-7 text-sm tracking-[0.12em] text-ivory transition-colors hover:border-gold hover:text-gold"
                    >
                      Googleマップで開く <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
