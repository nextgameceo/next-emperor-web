import Link from "next/link";
import JobCard from "@/components/JobCard";
import Logo from "@/components/Logo";
import PartnerCard from "@/components/PartnerCard";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/blog";
import { Ornament, Sparkle } from "@/components/Decor";
import { ApplyFlow, FaqSection } from "@/components/Sections";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, delay } from "@/components/ui";
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
    points: ["提携企業の求人情報の掲載", "SNS・広告を活用した求人の発信", "応募につながる採用導線の設計"],
  },
  {
    no: "02",
    en: "Sales Support",
    title: "法人営業支援事業",
    body: [
      "企業の営業課題や事業拡大をサポートします。",
      "営業代行、販路開拓、営業戦略の立案、ビジネスパートナーとの連携などを支援します。",
    ],
    points: ["営業代行", "販路開拓・ビジネスパートナーとの連携", "営業戦略の立案・営業コンサルティング"],
  },
];

const stance = [
  {
    en: "Respect",
    ja: "夜職を否定しない。",
    body: "夜の仕事も、誇りを持って働いてきた大切なキャリアです。その時間を否定することはありません。",
  },
  {
    en: "Strength",
    ja: "経験を、強みとして尊重する。",
    body: "接客、会話、気配り、目標への執着。夜の現場で磨かれた力は、昼の仕事でも通用する武器になります。",
  },
  {
    en: "Choice",
    ja: "転職を強制しない。",
    body: "大切なのは、選べること。新しい選択肢を知ったうえで、自分のタイミングで決めてほしいと考えています。",
  },
  {
    en: "Growth",
    ja: "人にも、企業にも成長を。",
    body: "求職者には希望を、企業には成長の機会を。両方にとって良い出会いをつくることを目指します。",
  },
];

const strengths = [
  {
    title: "接客力",
    en: "Hospitality",
    body: "初対面の相手に合わせて話し方や距離感を変えられる力は、営業・販売・受付など、人と接するあらゆる仕事で求められます。",
  },
  {
    title: "コミュニケーション力",
    en: "Communication",
    body: "相手の話を聞き、空気を読み、会話を途切れさせない。チームで働く職場でも、お客様対応でも活きる力です。",
  },
  {
    title: "営業力・目標達成力",
    en: "Sales Drive",
    body: "指名や売上と向き合ってきた経験は、数字を追う営業職にそのままつながります。目標に向かって行動し続ける力は大きな強みです。",
  },
  {
    title: "気配り・観察力",
    en: "Attention to Detail",
    body: "グラスの空き具合や表情の変化に気づく細やかさは、どんな職場でも信頼につながる、目に見えにくい大切な力です。",
  },
  {
    title: "第一印象・身だしなみ",
    en: "First Impression",
    body: "人に見られることを意識してきた経験は、清潔感や立ち居振る舞いとして、企業の顔となる仕事で評価されます。",
  },
  {
    title: "切り替えの強さ",
    en: "Resilience",
    body: "うまくいかない日があっても、次のお客様には笑顔で向き合う。その気持ちの切り替えは、どんな仕事でも続ける力になります。",
  },
];

const forYou = [
  "夜の仕事から、昼の仕事に挑戦してみたい方",
  "生活リズムを整え、安定した働き方を目指したい方",
  "接客や営業の経験を、新しい仕事に活かしたい方",
  "まずは、どんな仕事があるのか知りたい方",
];

const businessPoints = [
  "採用マーケティング・人材集客のご相談",
  "営業代行・販路開拓のご相談",
  "営業戦略の立案・営業コンサルティング",
  "提携・パートナーシップのご相談",
];

// ブログの新着を反映するため1時間ごとに更新
export const revalidate = 3600;

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const jobs = getPublishedJobs().slice(0, 3);
  const partners = getApprovedPartners();

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-28 sm:pb-36 sm:pt-32"
      >
        <div aria-hidden className="hero-spot pointer-events-none absolute left-1/2 top-[8%] h-[min(110vw,820px)] w-[min(110vw,820px)] -translate-x-1/2" />
        <Container className="relative text-center">
          <div className="mx-auto w-[min(82vw,560px)]">
            <div className="logo-intro">
              <Logo className="h-auto w-full" priority sizes="(max-width: 640px) 82vw, 560px" />
            </div>
          </div>
          <Ornament className="fade-up mt-8 sm:mt-10" animate />
          <h1
            id="hero-title"
            className="mt-8 font-serif text-[1.95rem] font-medium leading-[1.55] tracking-[0.1em] sm:text-[3.4rem] sm:leading-[1.5]"
          >
            <span className="line-rise metal-silver" style={delay(0.5)}>
              夜の経験を、
            </span>
            <br />
            <span className="line-rise" style={delay(0.8)}>
              <span className="metal-gold shimmer">明日の可能性へ。</span>
            </span>
          </h1>
          <div className="fade-up-delay-2 mx-auto mt-7 max-w-xl space-y-1 text-[0.84rem] leading-[2.1] tracking-[0.02em] text-ivory/85 sm:text-base sm:tracking-[0.06em]">
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
          <span className="scroll-line h-12 w-px bg-gradient-to-b from-ice to-transparent" />
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <Section labelledBy="about-title">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <div>
              <div data-reveal>
                <Eyebrow>NEXT EMPERORとは</Eyebrow>
              </div>
              <h2 id="about-title" className="heading-en mt-5" data-reveal style={delay(0.12)}>
                <span className="metal-silver">What is</span>
                <br />
                <span className="metal-gold">NEXT EMPEROR</span>
              </h2>
              <p className="mt-6 font-serif text-lg leading-[2] tracking-[0.06em] text-gold-soft" data-reveal style={delay(0.24)}>
                夜で磨いた力を、
                <br />
                昼の舞台で輝かせる。
              </p>
            </div>
            <div className="body-text space-y-6">
              <p data-reveal>
                NEXT EMPERORは、夜職から昼職へのキャリアチェンジを応援する
                <span className="text-gold-soft">採用マーケティング・法人営業支援会社</span>です。
              </p>
              <p data-reveal style={delay(0.1)}>
                夜職で培った接客力、コミュニケーション能力、営業力を活かし、一人ひとりの新しい可能性を広げます。
              </p>
              <p data-reveal style={delay(0.2)}>
                「昼の仕事に興味はあるけれど、自分の経験が通用するのか分からない」。そんな不安を抱える方は少なくありません。
                けれど、夜の現場で人と向き合い、信頼を積み重ねてきた経験は、決して無駄にはなりません。
                私たちは、その経験を新しいキャリアにつなげるための情報と機会を届けます。
              </p>
              <p data-reveal style={delay(0.3)}>
                また、企業の採用活動や営業活動を支援し、人と企業の成長をサポートします。
                求職者と企業、その両方に向き合うことで、お互いにとって良い出会いを生み出していきます。
              </p>
              <div data-reveal style={delay(0.4)}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 pt-2 text-sm tracking-[0.16em] text-gold underline-offset-8 transition-colors hover:text-ice hover:underline"
                >
                  会社概要を見る <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2">
            {[
              {
                en: "Mission",
                text: "夜職で培った接客力、営業力、コミュニケーション能力を活かし、新しいキャリアの可能性を広げる。",
                note: "経験を否定するのではなく、価値として評価される場所へ。一人ひとりの挑戦を後押しします。",
              },
              {
                en: "Vision",
                text: "誰もが過去の経験に誇りを持ち、自分らしい未来へ挑戦できる社会をつくる。",
                note: "どんな道を歩んできた人も、胸を張って次の一歩を踏み出せる。そんな社会を目指します。",
              },
            ].map((m, i) => (
              <div key={m.en} className="card corners p-9 sm:p-12" data-reveal style={delay(i * 0.15)}>
                <p className="flex items-center gap-3 font-display text-3xl">
                  <Sparkle className={`h-3.5 w-3.5 ${i ? "text-ice" : "text-gold"}`} twinkle delay={`${i * 0.8}s`} />
                  <span className="metal-gold">{m.en}</span>
                </p>
                <p className="mt-6 font-serif text-lg leading-[2] tracking-[0.06em] text-ivory sm:text-xl">{m.text}</p>
                <p className="mt-5 border-t border-charcoal-line pt-5 text-sm leading-[2] text-ivory-muted">{m.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== PROMISE ===== */}
      <Section labelledBy="stance-title" band>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="私たちが大切にしていること"
            id="stance-title"
            title={
              <>
                Our <span className="metal-gold">Promise</span>
              </>
            }
          />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stance.map((s, i) => (
              <li key={s.en} className="card px-7 py-10 text-center" data-reveal style={delay(i * 0.12)}>
                <p className="font-display text-sm tracking-luxe text-ice">0{i + 1}</p>
                <p className="mt-3 font-display text-[2rem] leading-none">
                  <span className="metal-gold">{s.en}</span>
                </p>
                <Sparkle className="mx-auto mt-5 h-2.5 w-2.5 text-ice/70" twinkle delay={`${i * 0.5}s`} />
                <p className="mt-5 font-serif text-[0.98rem] leading-relaxed tracking-[0.06em] text-ivory">{s.ja}</p>
                <p className="mt-4 text-left text-[0.85rem] leading-[1.95] text-ivory-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ===== STRENGTHS ===== */}
      <Section labelledBy="strength-title">
        <Container>
          <SectionHeading
            eyebrow="夜の経験は、昼の仕事で活きる"
            id="strength-title"
            title={
              <>
                Your Night is
                <br />
                <span className="metal-gold">Your Strength</span>
              </>
            }
          />
          <p className="body-text mt-6 max-w-3xl" data-reveal style={delay(0.2)}>
            夜の仕事で当たり前のようにやってきたことの中には、昼の仕事で高く求められる力がたくさんあります。
            自分では気づきにくい「強み」を知ることが、新しいキャリアへの自信につながります。
          </p>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <li key={s.title} className="card corners p-8" data-reveal style={delay((i % 3) * 0.12)}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl leading-none">
                    <span className="metal-gold">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-gold/60 via-ice/40 to-transparent" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg tracking-[0.1em] text-ivory">{s.en}</h3>
                <p className="mt-1 text-sm text-gold-soft">{s.title}</p>
                <p className="mt-3 text-sm leading-[2] text-ivory-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ===== SERVICE ===== */}
      <Section labelledBy="service-title" band>
        <Container>
          <SectionHeading
            eyebrow="2つの事業で、人と企業の未来を支える"
            id="service-title"
            title={
              <>
                Our <span className="metal-gold">Service</span>
              </>
            }
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {services.map((s, i) => (
              <article key={s.no} className="card corners p-9 sm:p-12" data-reveal style={delay(i * 0.15)}>
                <div className="flex items-end justify-between">
                  <p className="font-display text-7xl leading-none">
                    <span className="metal-gold">{s.no}</span>
                  </p>
                  <Sparkle className="mb-2 h-4 w-4 text-ice" twinkle />
                </div>
                <span className="mt-8 block h-px w-full bg-gradient-to-r from-gold/60 via-ice/40 to-transparent" aria-hidden />
                <h3 className="mt-8 font-display text-2xl font-medium tracking-[0.08em] text-ivory sm:text-[1.75rem]">{s.en}</h3>
                <p className="mt-2 text-sm tracking-[0.06em] text-gold-soft">{s.title}</p>
                <div className="body-text mt-6 space-y-3">
                  {s.body.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
                <ul className="mt-7 space-y-3 border-t border-charcoal-line pt-7 text-sm text-ivory/90">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <Sparkle className="h-2.5 w-2.5 shrink-0 text-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center lg:text-left" data-reveal>
            <ButtonLink href="/service" variant="outline">
              事業内容を詳しく見る
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ===== RECRUIT ===== */}
      <Section labelledBy="recruit-title">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div data-reveal>
              <Eyebrow center>今の経験を、もっと大きな未来につなげよう</Eyebrow>
            </div>
            <h2 id="recruit-title" className="heading-en mt-5" data-reveal style={delay(0.12)}>
              <span className="metal-silver">Turn Your Experience</span>
              <br />
              <span className="metal-gold">Into Your Future</span>
            </h2>
            <div className="mt-10 space-y-2 font-serif text-[1.05rem] tracking-[0.08em] text-ivory/85">
              <p data-reveal style={delay(0.2)}>新しい仕事に挑戦したい。</p>
              <p data-reveal style={delay(0.35)}>昼職に転職したい。</p>
              <p data-reveal style={delay(0.5)}>もっと安定した働き方を目指したい。</p>
            </div>
            <div data-reveal style={delay(0.6)}>
              <Ornament className="mt-10" />
            </div>
            <p className="body-text mt-8 text-ivory" data-reveal style={delay(0.7)}>
              そんな一人ひとりの新しい一歩を応援します。
            </p>
          </div>

          <div className="card corners mx-auto mt-14 max-w-3xl p-8 sm:p-12" data-reveal>
            <p className="text-center font-display text-2xl font-medium tracking-[0.1em]">
              <span className="metal-gold">For You</span>
            </p>
            <p className="mt-2 text-center text-sm text-ivory-muted">こんな方に、見てほしい。</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {forYou.map((t, i) => (
                <li key={t} className="flex items-start gap-3 text-sm leading-[1.9] text-ivory/90" data-reveal style={delay(i * 0.1)}>
                  <Sparkle className="mt-1.5 h-2.5 w-2.5 shrink-0 text-ice" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
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
      </Section>

      {/* ===== FLOW ===== */}
      <ApplyFlow />

      {/* ===== PARTNER ===== */}
      <Section labelledBy="partner-title" band>
        <Container>
          <SectionHeading
            eyebrow="提携企業"
            id="partner-title"
            title={
              <>
                Our <span className="metal-gold">Partners</span>
              </>
            }
          />
          <p className="body-text mt-6 max-w-3xl" data-reveal style={delay(0.2)}>
            NEXT EMPERORは、新しい挑戦を受け入れ、人の可能性を信じる企業と提携しています。
            提携企業の求人には、各企業の公式応募フォームから直接ご応募いただけます。
          </p>
          {partners.length > 0 ? (
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((p) => (
                <li key={p.id}>
                  <PartnerCard partner={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="card corners mt-12 px-8 py-12 text-center sm:py-14" data-reveal>
              <Sparkle className="mx-auto h-4 w-4 text-gold" twinkle />
              <p className="mt-5 font-serif tracking-[0.08em] text-ivory/90">
                提携企業の情報は、準備が整い次第、順次掲載いたします。
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* ===== BLOG ===== */}
      {posts.length > 0 && (
        <Section labelledBy="blog-title">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="ブログ・お知らせ"
                id="blog-title"
                title={
                  <>
                    Latest <span className="metal-gold">News</span>
                  </>
                }
              />
              <div data-reveal>
                <ButtonLink href="/blog" variant="outline">
                  すべての記事を見る
                </ButtonLink>
              </div>
            </div>
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <li key={p.slug} data-reveal style={delay(i * 0.12)}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* ===== FAQ ===== */}
      <FaqSection />

      {/* ===== FOR BUSINESS ===== */}
      <Section labelledBy="business-title">
        <Container>
          <div className="card corners mx-auto max-w-4xl px-7 py-16 text-center sm:px-16 sm:py-20" data-reveal>
            <Eyebrow center>企業の成長を、ともに</Eyebrow>
            <h2 id="business-title" className="heading-en mt-5">
              <span className="metal-silver">Grow</span> <span className="metal-gold">Together</span>
            </h2>
            <div className="body-text mt-8 space-y-2">
              <p>NEXT EMPERORは、企業の採用マーケティング、集客、営業活動を支援します。</p>
              <p>新しい人材との出会いやビジネス機会の創出をサポートします。</p>
            </div>
            <p className="body-text mx-auto mt-6 max-w-2xl">
              人と話すことが得意な人材と出会いたい。営業の手が足りず、新しい顧客の開拓が進まない。
              そんな採用と営業の課題に、私たちが一緒に向き合います。
            </p>
            <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left text-sm text-ivory/90 sm:grid-cols-2">
              {businessPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 border border-charcoal-line px-4 py-3">
                  <Sparkle className="h-2.5 w-2.5 shrink-0 text-ice" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact">法人のお問い合わせ</ButtonLink>
              <ButtonLink href="/business" variant="outline">
                法人向けサービス
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
