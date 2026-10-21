import Image from "next/image";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import PartnerCard from "@/components/PartnerCard";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getApprovedPartners, getPublishedJobs } from "@/lib/data";

/*
 * 写真は public/images/ に置いた画像を使用しています。
 * 現在の画像は参考デザインから切り出した仮画像です。高解像度の写真に差し替えてください。
 * （同じファイル名で上書きすれば、コードの変更は不要です）
 */
const services = [
  {
    no: "01",
    en: "Recruitment Marketing",
    title: "人材集客・採用マーケティング支援",
    body: "夜職から昼職への転職を検討している方に向けて、提携企業の求人情報や応募機会を提供します。SNSや広告などを活用し、企業の採用活動を支援します。",
    image: "/images/service-01.jpg",
    cta: { label: "求人情報を見る", href: "/recruit" },
  },
  {
    no: "02",
    en: "Sales Support",
    title: "法人営業支援事業",
    body: "企業の営業課題や事業拡大をサポートします。営業代行、販路開拓、営業戦略の立案、ビジネスパートナーとの連携などを支援します。",
    image: "/images/service-02.jpg",
    cta: { label: "企業の方はこちら", href: "/business" },
  },
];

const stance = [
  { en: "Respect", ja: "夜職を否定しない。" },
  { en: "Strength", ja: "これまでの経験を、強みとして尊重する。" },
  { en: "Choice", ja: "転職を強制せず、新しい選択肢を届ける。" },
  { en: "Growth", ja: "求職者に希望を、企業に成長の機会を。" },
];

export default function HomePage() {
  const jobs = getPublishedJobs().slice(0, 3);
  const partners = getApprovedPartners();

  return (
    <>
      {/* ===== HERO：写真＋ネイビーの暗幕 ===== */}
      <section aria-labelledby="hero-title" className="relative flex min-h-[640px] items-end overflow-hidden bg-navy-deep sm:min-h-[720px] sm:items-center lg:h-[88vh] lg:max-h-[860px]">
        {siteConfig.heroImage && (
          <div className="absolute inset-0 lg:left-[30%]" aria-hidden>
            <Image
              src={siteConfig.heroImage}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover object-[60%_40%]"
            />
          </div>
        )}
        {/* 左からネイビー、下からブラックに溶ける暗幕 */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/10 lg:hidden" />
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, #08111F 0%, #08111F 30%, rgba(8,17,31,0.7) 40%, rgba(8,17,31,0.12) 60%, rgba(8,17,31,0) 80%)",
          }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep to-transparent" />

        <Container className="relative pb-16 pt-32 sm:pb-0 sm:pt-24">
          <div className="max-w-xl">
            <p className="fade-up eyebrow">From Night to Tomorrow</p>
            <h1
              id="hero-title"
              className="fade-up mt-5 font-serif text-[2.3rem] font-medium leading-[1.45] tracking-[0.08em] text-white sm:text-[3.6rem] sm:leading-[1.4]"
            >
              夜の経験を、
              <br />
              <span className="metal-gold">明日の可能性</span>へ。
            </h1>
            <div className="fade-up-delay mt-7 space-y-1 text-[0.88rem] leading-[2] tracking-[0.04em] text-white/85 sm:text-base sm:tracking-[0.08em]">
              <p>今までの経験は、あなたの強みになる。</p>
              <p>夜職から昼職へ、新しいキャリアへの第一歩を。</p>
              <p>NEXT EMPERORがあなたの挑戦を応援します。</p>
            </div>
            <div className="fade-up-delay-2 mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/recruit">お仕事を探す</ButtonLink>
              <ButtonLink href="/business" variant="outline">
                企業の方はこちら
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== ABOUT：明るいアイボリー ===== */}
      <section aria-labelledby="about-title" className="relative overflow-hidden bg-paper py-20 text-paper-ink sm:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center light>About</Eyebrow>
            <h2 id="about-title" className="heading-lg mt-4 text-paper-ink">
              NEXT EMPERORとは
            </h2>
            <div className="mt-8 space-y-4 text-[0.95rem] leading-[2.1] tracking-[0.04em] text-paper-muted sm:text-base">
              <p>
                NEXT EMPERORは、夜職から昼職へのキャリアチェンジを応援する採用マーケティング・法人営業支援会社です。
              </p>
              <p>夜職で培った接客力、コミュニケーション能力、営業力を活かし、一人ひとりの新しい可能性を広げます。</p>
              <p>また、企業の採用活動や営業活動を支援し、人と企業の成長をサポートします。</p>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
            {[
              { en: "Mission", text: "夜職で培った接客力、営業力、コミュニケーション能力を活かし、新しいキャリアの可能性を広げる。" },
              { en: "Vision", text: "誰もが過去の経験に誇りを持ち、自分らしい未来へ挑戦できる社会をつくる。" },
            ].map((m) => (
              <div key={m.en} className="border-t-2 border-gold bg-white px-8 py-9 shadow-[0_10px_30px_-18px_rgba(22,32,47,0.35)]">
                <p className="font-display text-2xl italic text-gold-deep">{m.en}</p>
                <p className="mt-4 font-serif text-[1.05rem] leading-[2] tracking-[0.05em] text-paper-ink">{m.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border-b border-gold-deep/60 pb-1 text-sm tracking-[0.16em] text-gold-deep hover:border-gold-deep"
            >
              会社概要を見る <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== SERVICE：写真カード ===== */}
      <section aria-labelledby="service-title" className="bg-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Business"
            id="service-title"
            title={
              <>
                2つの事業で、
                <br className="sm:hidden" />
                人と企業の未来を支える。
              </>
            }
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <article key={s.no} className="relative overflow-hidden border border-gold/40 bg-navy">
                <div className="absolute inset-y-0 right-0 w-full sm:w-[55%]" aria-hidden>
                  <Image src={s.image} alt="" fill sizes="(max-width: 640px) 100vw, 340px" className="object-cover" />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #0E1B30 0%, #0E1B30 42%, rgba(14,27,48,0.75) 58%, rgba(14,27,48,0.1) 85%)",
                  }}
                />
                <div aria-hidden className="absolute inset-0 bg-navy/70 sm:hidden" />
                <div className="relative flex min-h-[300px] flex-col p-8 sm:max-w-[62%] sm:p-10">
                  <p className="font-display text-4xl italic leading-none text-gold">{s.no}</p>
                  <p className="mt-2 font-display text-[0.7rem] uppercase tracking-luxe text-ivory/60">{s.en}</p>
                  <h3 className="mt-5 font-serif text-[1.4rem] leading-snug tracking-[0.05em] text-white">{s.title}</h3>
                  <p className="mt-4 text-sm leading-[2] tracking-[0.04em] text-white/80">{s.body}</p>
                  <div className="mt-auto pt-7">
                    <Link
                      href={s.cta.href}
                      className="btn-gold inline-flex items-center gap-4 px-6 py-3 text-xs tracking-[0.16em]"
                    >
                      {s.cta.label} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== PROMISE ===== */}
      <section aria-labelledby="stance-title" className="border-y border-gold/20 bg-navy py-16 sm:py-20">
        <Container>
          <h2 id="stance-title" className="sr-only">
            私たちが大切にしていること
          </h2>
          <ul className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gold/25">
            {stance.map((s) => (
              <li key={s.en} className="px-2 text-center lg:px-6">
                <p className="font-display text-[1.75rem] italic leading-none text-gold">{s.en}</p>
                <p className="mt-4 font-serif text-[0.95rem] leading-relaxed tracking-[0.06em] text-white/90">{s.ja}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ===== PARTNER ===== */}
      <section aria-labelledby="partner-title" className="bg-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Partner Companies"
            id="partner-title"
            title="提携企業"
            lead="新しい挑戦を受け入れ、人の可能性を信じる企業とともに。"
          />
          {partners.length > 0 ? (
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((p) => (
                <li key={p.id}>
                  <PartnerCard partner={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="card mx-auto mt-12 max-w-3xl px-8 py-12 text-center">
              <p className="font-serif tracking-[0.08em] text-white/90">
                提携企業の情報は、準備が整い次第、順次掲載いたします。
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* ===== RECRUIT：写真 × アイボリー ===== */}
      <section aria-labelledby="recruit-title" className="grid bg-paper lg:grid-cols-2">
        <div className="relative min-h-[280px] sm:min-h-[360px]">
          <Image src="/images/recruit.jpg" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[35%_center]" />
          <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-transparent from-60% to-paper lg:block" />
        </div>
        <div className="flex items-center px-6 py-16 sm:px-12 lg:py-20">
          <div className="max-w-lg text-paper-ink">
            <Eyebrow light>Recruit</Eyebrow>
            <h2 id="recruit-title" className="mt-4 font-serif text-[1.5rem] font-medium leading-[1.6] tracking-[0.05em] text-paper-ink sm:text-[1.9rem]">
              今の経験を、
              <br />
              もっと大きな未来につなげよう。
            </h2>
            <div className="mt-6 space-y-1 text-[0.95rem] leading-[2] tracking-[0.04em] text-paper-muted">
              <p>新しい仕事に挑戦したい。</p>
              <p>昼職に転職したい。</p>
              <p>もっと安定した働き方を目指したい。</p>
              <p className="pt-3 text-paper-ink">そんな一人ひとりの新しい一歩を応援します。</p>
            </div>
            <div className="mt-9">
              <ButtonLink href="/recruit">求人情報を見る</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (
        <section aria-label="新着求人" className="bg-ink py-20">
          <Container>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <li key={job.slug}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* ===== 求職者の方へ／企業の方へ ===== */}
      <section aria-label="ご案内" className="grid md:grid-cols-2">
        <div className="relative overflow-hidden bg-navy px-6 py-16 sm:px-12 sm:py-20">
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-navy-light/60 to-transparent" />
          <div className="relative flex gap-6">
            <PersonIcon />
            <div>
              <p className="eyebrow">For Job Seekers</p>
              <h2 className="mt-3 font-serif text-2xl tracking-[0.06em] text-white">求職者の方へ</h2>
              <p className="mt-4 text-sm leading-[2] text-white/80">あなたの経験が活きる、新しい仕事との出会いを。</p>
              <div className="mt-7">
                <ButtonLink href="/recruit">求人情報を見る</ButtonLink>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden border-t border-gold/20 bg-navy-deep px-6 py-16 sm:px-12 sm:py-20 md:border-l md:border-t-0">
          <div className="relative flex gap-6">
            <BusinessIcon />
            <div>
              <p className="eyebrow">For Business</p>
              <h2 id="business-title" className="mt-3 font-serif text-2xl tracking-[0.06em] text-white">
                企業の成長を、ともに。
              </h2>
              <p className="mt-4 text-sm leading-[2] text-white/80">
                NEXT EMPERORは、企業の採用マーケティング、集客、営業活動を支援します。新しい人材との出会いやビジネス機会の創出をサポートします。
              </p>
              <div className="mt-7">
                <ButtonLink href="/contact">法人のお問い合わせ</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <circle cx="24" cy="16" r="8" />
      <path d="M8 42c1.5-9 8-14 16-14s14.5 5 16 14" />
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="7" y="16" width="34" height="24" />
      <path d="M18 16v-5h12v5M7 26h34M22 26v4h4v-4" />
    </svg>
  );
}
