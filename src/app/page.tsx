import Link from "next/link";
import HeroVisual from "@/components/HeroVisual";
import JobCard from "@/components/JobCard";
import Logo from "@/components/Logo";
import PartnerCard from "@/components/PartnerCard";
import { Ornament, Sparkle, Starfield, Zuiun } from "@/components/Decor";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { getApprovedPartners, getPublishedJobs } from "@/lib/data";

const services = [
  {
    no: "01",
    en: "Recruitment Marketing",
    title: "人材集客・採用マーケティング支援",
    body: [
      "夜職から昼職への転職を検討している方に向けて、提携企業の求人情報や応募機会を提供します。",
      "SNSや広告などを活用し、企業の採用活動を支援します。",
    ],
  },
  {
    no: "02",
    en: "Sales Support",
    title: "法人営業支援事業",
    body: [
      "企業の営業課題や事業拡大をサポートします。",
      "営業代行、販路開拓、営業戦略の立案、ビジネスパートナーとの連携などを支援します。",
    ],
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
      {/* ===== HERO ===== */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-28 sm:pb-36 sm:pt-32"
      >
        <HeroVisual />
        <Container className="relative text-center">
          <div className="fade-up mx-auto w-[min(82vw,560px)]">
            <Logo
              className="h-auto w-full"
              priority
              sizes="(max-width: 640px) 82vw, 560px"
            />
          </div>
          <Ornament className="fade-up mt-8 sm:mt-10" />
          <h1
            id="hero-title"
            className="fade-up-delay mt-8 font-serif text-[1.95rem] font-medium leading-[1.55] tracking-[0.1em] sm:text-[3.4rem] sm:leading-[1.5]"
          >
            <span className="metal-silver">夜の経験を、</span>
            <br />
            <span className="metal-gold">明日の可能性へ。</span>
          </h1>
          <div className="fade-up-delay mx-auto mt-7 max-w-xl space-y-1 text-[0.84rem] leading-[2.1] tracking-[0.02em] text-ivory/85 sm:text-base sm:tracking-[0.06em]">
            <p>今までの経験は、あなたの強みになる。</p>
            <p>夜職から昼職へ、新しいキャリアへの第一歩を。</p>
            <p>NEXT EMPERORがあなたの挑戦を応援します。</p>
          </div>
          <div className="fade-up-delay-2 mt-11 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink href="/recruit">お仕事を探す</ButtonLink>
            <ButtonLink href="/business" variant="outline">
              企業の方はこちら
            </ButtonLink>
          </div>
        </Container>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex" aria-hidden>
          <span className="font-display text-[0.65rem] tracking-luxe text-silver/60">SCROLL</span>
          <span className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <Section labelledBy="about-title" className="overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-16 hidden lg:block">
          <Zuiun className="w-[520px]" opacity={0.12} />
        </div>
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <div>
              <Eyebrow>About</Eyebrow>
              <h2 id="about-title" className="heading-lg mt-6">
                <span className="metal-silver">NEXT EMPEROR</span>
                <span className="text-ivory">とは</span>
              </h2>
            </div>
            <div className="body-text space-y-6">
              <p>
                NEXT EMPERORは、夜職から昼職へのキャリアチェンジを応援する
                <span className="text-gold-soft">採用マーケティング・法人営業支援会社</span>です。
              </p>
              <p>
                夜職で培った接客力、コミュニケーション能力、営業力を活かし、一人ひとりの新しい可能性を広げます。
              </p>
              <p>また、企業の採用活動や営業活動を支援し、人と企業の成長をサポートします。</p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 pt-2 text-sm tracking-[0.16em] text-gold underline-offset-8 hover:underline"
              >
                会社概要を見る <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2">
            {[
              { en: "Mission", text: "夜職で培った接客力、営業力、コミュニケーション能力を活かし、新しいキャリアの可能性を広げる。" },
              { en: "Vision", text: "誰もが過去の経験に誇りを持ち、自分らしい未来へ挑戦できる社会をつくる。" },
            ].map((m) => (
              <div key={m.en} className="card corners p-9 sm:p-12">
                <p className="flex items-center gap-3 font-display text-3xl italic">
                  <Sparkle className="h-3.5 w-3.5 text-gold" />
                  <span className="metal-gold">{m.en}</span>
                </p>
                <p className="mt-6 font-serif text-lg leading-[2] tracking-[0.06em] text-ivory sm:text-xl">{m.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== STANCE ===== */}
      <section aria-labelledby="stance-title" className="relative overflow-hidden border-y border-charcoal-line bg-night py-24 sm:py-28">
        <Starfield count={50} sparkles={5} seed={23} />
        <Container className="relative">
          <div className="text-center">
            <Eyebrow center>Our Promise</Eyebrow>
            <h2 id="stance-title" className="heading-lg mt-6">
              私たちが、<span className="metal-gold">大切にしていること。</span>
            </h2>
          </div>
          <ul className="mt-16 grid gap-px overflow-hidden bg-charcoal-line/70 sm:grid-cols-2 lg:grid-cols-4">
            {stance.map((s, i) => (
              <li key={s.en} className="bg-night px-7 py-10 text-center">
                <p className="font-display text-sm tracking-luxe text-silver-deep">0{i + 1}</p>
                <p className="mt-3 font-display text-[2rem] italic leading-none">
                  <span className="metal-gold">{s.en}</span>
                </p>
                <Sparkle className="mx-auto mt-5 h-2.5 w-2.5 text-silver/60" />
                <p className="mt-5 font-serif text-[0.95rem] leading-relaxed tracking-[0.06em] text-ivory/90">{s.ja}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ===== SERVICE ===== */}
      <Section labelledBy="service-title">
        <Container>
          <SectionHeading
            eyebrow="Service"
            id="service-title"
            title={
              <>
                2つの事業で、
                <br className="sm:hidden" />
                <span className="metal-gold">人と企業の未来を支える。</span>
              </>
            }
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <article key={s.no} className="card corners overflow-hidden p-9 sm:p-12">
                <div className="pointer-events-none absolute -bottom-6 -right-10">
                  <Zuiun className="w-72" opacity={0.1} stroke="#DCC086" />
                </div>
                <div className="relative">
                  <div className="flex items-end justify-between">
                    <p className="font-display text-7xl leading-none">
                      <span className="metal-gold">{s.no}</span>
                    </p>
                    <p className="eyebrow text-silver-deep">{s.en}</p>
                  </div>
                  <span className="mt-8 block h-px w-full bg-gradient-to-r from-gold/60 via-silver/20 to-transparent" aria-hidden />
                  <h3 className="mt-8 font-serif text-xl tracking-[0.06em] sm:text-2xl">{s.title}</h3>
                  <div className="body-text mt-6 space-y-3">
                    {s.body.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center lg:text-left">
            <ButtonLink href="/service" variant="outline">
              事業内容を詳しく見る
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ===== RECRUIT ===== */}
      <section aria-labelledby="recruit-title" className="relative overflow-hidden border-y border-charcoal-line bg-night py-24 sm:py-32">
        <Starfield count={60} sparkles={6} seed={41} />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: "radial-gradient(50% 80% at 50% 100%, rgba(205,177,119,0.14), transparent 75%)" }}
        />
        <div className="pointer-events-none absolute -left-16 bottom-10 hidden md:block">
          <Zuiun className="w-[440px]" opacity={0.16} />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Recruit</Eyebrow>
            <h2 id="recruit-title" className="heading-lg mt-6">
              今の経験を、
              <br />
              <span className="metal-gold">もっと大きな未来につなげよう。</span>
            </h2>
            <div className="mt-10 space-y-2 font-serif text-[1.05rem] tracking-[0.08em] text-ivory/85">
              <p>新しい仕事に挑戦したい。</p>
              <p>昼職に転職したい。</p>
              <p>もっと安定した働き方を目指したい。</p>
            </div>
            <Ornament className="mt-10" />
            <p className="body-text mt-8 text-ivory">そんな一人ひとりの新しい一歩を応援します。</p>
            <div className="mt-10">
              <ButtonLink href="/recruit">求人情報を見る</ButtonLink>
            </div>
          </div>
          {jobs.length > 0 && (
            <ul className="mt-16 grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <li key={job.slug}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* ===== PARTNER ===== */}
      <Section labelledBy="partner-title">
        <Container>
          <SectionHeading eyebrow="Partner" id="partner-title" title="提携企業" />
          {partners.length > 0 ? (
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((p) => (
                <li key={p.id}>
                  <PartnerCard partner={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="card corners mt-12 px-8 py-12 text-center sm:py-14">
              <Sparkle className="mx-auto h-4 w-4 text-gold" />
              <p className="mt-5 font-serif tracking-[0.08em] text-ivory/90">
                提携企業の情報は、準備が整い次第、順次掲載いたします。
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* ===== FOR BUSINESS ===== */}
      <section aria-labelledby="business-title" className="relative overflow-hidden border-t border-charcoal-line py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
          <Zuiun className="w-[620px] max-w-none" opacity={0.08} stroke="#DCC086" />
        </div>
        <Container className="relative">
          <div className="card corners mx-auto max-w-4xl px-7 py-16 text-center sm:px-16 sm:py-20">
            <Eyebrow center>For Business</Eyebrow>
            <h2 id="business-title" className="heading-lg mt-6">
              <span className="metal-silver">企業の成長を、</span>
              <span className="metal-gold">ともに。</span>
            </h2>
            <div className="body-text mt-8 space-y-2">
              <p>NEXT EMPERORは、企業の採用マーケティング、集客、営業活動を支援します。</p>
              <p>新しい人材との出会いやビジネス機会の創出をサポートします。</p>
            </div>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact">法人のお問い合わせ</ButtonLink>
              <ButtonLink href="/business" variant="outline">
                法人向けサービス
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
