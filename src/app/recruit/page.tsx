import type { Metadata } from "next";
import BgPhoto from "@/components/BgPhoto";
import { LineIcon } from "@/components/Art";
import Link from "next/link";
import ApplyCounter from "@/components/ApplyCounter";
import BigMarquee from "@/components/BigMarquee";
import { Sparkle } from "@/components/Decor";
import JobCard from "@/components/JobCard";
import RecruitNotice from "@/components/RecruitNotice";
import { ApplyFlow, FaqSection } from "@/components/Sections";
import { Container, PageHero, Section, SectionHeading, delay } from "@/components/ui";
import { getOpenJobs, getPublishedJobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "求人情報｜昼職という選択肢",
  description:
    "夜職から昼職へ。営業や採用マーケターなど、夜の仕事で磨いた会話力・観察力・発信力が活きる昼職の選択肢と、提携企業の求人情報をご紹介します。",
  alternates: { canonical: "/recruit" },
};

/** 夜職で磨かれ、昼職でも活きる力 */
const transferable = [
  {
    en: "COMMUNICATION",
    title: "会話力",
    text: "初対面の相手とも自然に打ち解け、心地よい時間をつくる力。営業や接客はもちろん、どんな職場でも信頼される土台になります。",
  },
  {
    en: "INSIGHT",
    title: "観察力",
    text: "表情やしぐさから、相手が本当に求めていることを読み取る力。提案の質を上げ、チームの空気を良くする力でもあります。",
  },
  {
    en: "GRIT",
    title: "やり抜く力",
    text: "数字や目標と向き合い、夜遅くまで走り切ってきた経験。そのタフさは、昼の仕事でも結果を出すための大きな武器です。",
  },
];

export default function RecruitPage() {
  const careers = getPublishedJobs();
  const openJobs = getOpenJobs();

  return (
    <>
      <PageHero
        eyebrow="昼職という、次のステージへ"
        title="Recruit"
        photo="dusk"
        lead="夜の仕事で磨いてきた力は、昼の世界でも必ず活きる。NEXT EMPERORは、あなたの経験が輝く「昼職の選択肢」をご紹介します。"
      />

      {/* ===== LIVE COUNT ===== */}
      <section className="theme-light relative pb-2 pt-12 sm:pt-16" aria-label="LINE応募フォームからの応募数">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ApplyCounter />
          </div>
        </Container>
      </section>

      {/* ===== WHY ===== */}
      <Section labelledBy="why-title" bg={<BgPhoto photo="dayCity" mono blend="multiply" fade="both" opacity={0.1} />}>
        <Container>
          <SectionHeading
            eyebrow="夜の経験は、昼の武器になる"
            id="why-title"
            title={
              <>
                Your Skills <span className="metal-gold">Transfer</span>
              </>
            }
          />
          <p className="body-text mt-6 max-w-3xl" data-reveal style={delay(0.2)}>
            「夜の仕事しかしてこなかったから、昼職なんて無理」。そう感じている方は少なくありません。
            でも、毎日お客様と向き合い、空気を読み、結果を出してきたその経験は、昼の仕事でもそのまま通用する力です。
          </p>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {transferable.map((t, i) => (
              <li key={t.en} className="card corners p-8" data-reveal style={delay(i * 0.12)}>
                <LineIcon name={(["communication", "detail", "resilience"] as const)[i % 3]} className="mb-8 h-12 w-12 text-ivory/70" />
                <p className="font-display text-xs tracking-[0.24em] text-ice">{t.en}</p>
                <h3 className="mt-3 text-xl tracking-[0.08em] text-ivory">{t.title}</h3>
                <p className="mt-4 text-sm leading-[2] text-ivory-muted">{t.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ===== CAREER OPTIONS ===== */}
      {careers.length > 0 && (
        <>
        <BigMarquee words={["Sales", "Installer", "Your Next Stage"]} reverse />
        <Section labelledBy="career-title" band>
          <Container>
            <SectionHeading
              eyebrow="ご紹介している職種"
              id="career-title"
              title={
                <>
                  Career <span className="metal-gold">Options</span>
                </>
              }
            />
            <p className="body-text mt-6 max-w-3xl" data-reveal style={delay(0.2)}>
              提携企業とともに、夜職経験者が力を発揮しやすい仕事をご紹介しています。
              仕事の中身や、どんな経験が活きるのかを知るところから始めてみてください。
            </p>

            <ol className="mt-14 space-y-10">
              {careers.map((job, i) => {
                const c = job.career;
                return (
                  <li key={job.slug} className="card corners relative overflow-hidden p-8 sm:p-12" data-reveal>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-semibold leading-none text-gold/[0.07] sm:text-[9rem]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                      <div>
                        <LineIcon name={(["communication", "solar", "megaphone"] as const)[i % 3]} className="mb-8 h-16 w-16 text-gold" />
                        <p className="font-display text-xs tracking-[0.28em] text-ice">
                          {String(i + 1).padStart(2, "0")} / {c?.en ?? "CAREER"}
                        </p>
                        <h3 className="mt-4 text-2xl tracking-[0.06em] text-ivory sm:text-3xl">{c?.name ?? job.title}</h3>
                        {c?.catch && <p className="mt-3 text-base tracking-[0.06em] text-gold">{c.catch}</p>}
                        {job.industry && (
                          <p className="mt-6 whitespace-pre-line text-sm leading-[2.1] text-ivory/85">{job.industry}</p>
                        )}
                      </div>
                      <div className="space-y-8">
                        {c?.skills && c.skills.length > 0 && (
                          <div>
                            <p className="text-xs tracking-[0.16em] text-gold">夜職の経験が活きるポイント</p>
                            <ul className="mt-4 space-y-3">
                              {c.skills.map((s) => (
                                <li key={s} className="flex items-start gap-3 text-sm leading-[1.9] text-ivory/90">
                                  <Sparkle className="mt-1.5 h-2.5 w-2.5 shrink-0 text-ice" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {job.appeal && job.appeal.length > 0 && (
                          <div>
                            <p className="text-xs tracking-[0.16em] text-gold">こんな方にぴったり</p>
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {job.appeal.map((a) => (
                                <li key={a} className="border border-charcoal-line px-3 py-1.5 text-xs leading-relaxed text-ivory-muted">
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <Link
                          href={`/recruit/${job.slug}`}
                          className="inline-flex items-center gap-3 text-sm tracking-[0.16em] text-gold hover:text-gold-soft"
                        >
                          この仕事を詳しく見る <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Container>
        </Section>
        </>
      )}

      {/* ===== OPEN POSITIONS ===== */}
      <Section labelledBy="open-title" bg={<BgPhoto photo="skyAbove" mono blend="multiply" fade="both" opacity={0.12} />}>
        <Container>
          <SectionHeading
            eyebrow="掲載中の求人"
            id="open-title"
            title={
              <>
                Open <span className="metal-gold">Positions</span>
              </>
            }
          />
          <div className="mt-10">
            <RecruitNotice />
          </div>
          {openJobs.length > 0 ? (
            <>
              <p className="mt-12 text-sm tracking-[0.1em] text-ivory-dim">
                応募受付中の求人 <span className="text-gold">{openJobs.length}</span> 件
              </p>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {openJobs.map((job) => (
                  <li key={job.slug}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="card mt-12 px-8 py-14 text-center" data-reveal>
              <p className="text-lg tracking-[0.06em] text-ivory">具体的な求人は、準備が整い次第掲載します。</p>
              <p className="body-text mx-auto mt-4 max-w-xl">
                勤務地・給与などの条件と応募窓口が確定した求人から、順次こちらに掲載していきます。
              </p>
            </div>
          )}
        </Container>
      </Section>

      <ApplyFlow />
      <FaqSection />
    </>
  );
}
