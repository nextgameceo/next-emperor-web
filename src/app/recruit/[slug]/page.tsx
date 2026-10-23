import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LineApplyForm from "@/components/LineApplyForm";
import RecruitNotice from "@/components/RecruitNotice";
import { ButtonLink, Container, PageHero, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { REFERRAL_LABEL, buildApplyHref, getJobBySlug, getJobCompany, getPublishedJobs } from "@/lib/data";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  // 静的書き出しでは1件以上が必要なため、0件のときはダミー（404になるページ）を1つ返す
  const list = getPublishedJobs().map((j) => ({ slug: j.slug }));
  return list.length > 0 ? list : [{ slug: "none" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};
  const company = getJobCompany(job);
  return {
    title: `${job.title}（${company}）`,
    description: `${company}の求人「${job.title}」。${job.location ? `勤務地：${job.location}。` : ""}夜職から昼職への挑戦を応援します。`,
    alternates: { canonical: `/recruit/${job.slug}` },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const company = getJobCompany(job);
  const hidden = Boolean(job.companyLabel?.trim());
  const rows = [
    { k: hidden ? "業種" : "企業名", v: company },
    { k: "仕事内容", v: job.description },
    { k: "勤務地", v: job.location },
    { k: "雇用形態", v: job.employmentType },
    { k: "給与", v: job.salary },
    { k: "勤務時間", v: job.workingHours },
    { k: "休日", v: job.holidays },
    { k: "福利厚生", v: job.benefits.join("\n") },
  ].filter((r) => r.v);

  const applyHref = buildApplyHref(job);
  const canApply = applyHref !== "";
  const isLine = /^https:\/\/(lin\.ee|line\.me)\//.test(applyHref);

  // Google しごと検索向けの構造化データ（入力済み・社名公開の求人のみ）
  const jsonLd = hidden || !job.location ? null : {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.updatedAt,
    employmentType: job.employmentType || undefined,
    hiringOrganization: { "@type": "Organization", name: company },
    jobLocation: job.location
      ? { "@type": "Place", address: { "@type": "PostalAddress", streetAddress: job.location, addressCountry: "JP" } }
      : undefined,
    url: `${siteConfig.url}/recruit/${job.slug}`,
  };

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <PageHero eyebrow={company} title={job.title} />
      <Section>
        <Container className="max-w-4xl">
          <nav aria-label="パンくずリスト" className="mb-10 text-xs tracking-[0.1em] text-ivory-dim">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-gold">HOME</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/recruit" className="hover:text-gold">求人情報</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ivory-muted">{job.title}</li>
            </ol>
          </nav>

          {job.industry && (
            <section className="mb-14" data-reveal>
              <p className="eyebrow">ABOUT THE INDUSTRY</p>
              <h2 className="heading-en mt-3 text-2xl">業種について</h2>
              <p className="body-text mt-6 whitespace-pre-line">{job.industry}</p>
            </section>
          )}

          <h2 className="mb-6 text-sm tracking-[0.16em] text-ice">募集内容</h2>
          <dl className="border-t border-charcoal-line">
            {rows.map((r) => (
              <div key={r.k} className="grid gap-2 border-b border-charcoal-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
                <dt className="text-sm tracking-[0.12em] text-gold">{r.k}</dt>
                <dd className="whitespace-pre-line leading-[2] text-ivory/90">{r.v}</dd>
              </div>
            ))}
          </dl>

          {(!job.salary || !job.location) && (
            <p className="mt-6 text-xs leading-relaxed text-ivory-dim">
              ※ 給与・勤務地などの詳しい条件は、確定しだい掲載します。最新の条件は応募先にてご確認ください。
            </p>
          )}

          {job.appeal && job.appeal.length > 0 && (
            <section className="mt-14" data-reveal>
              <p className="eyebrow">FOR YOU</p>
              <h2 className="heading-en mt-3 text-2xl">こんな方にぴったり</h2>
              <ul className="mt-6 space-y-3">
                {job.appeal.map((a) => (
                  <li key={a} className="flex gap-3 leading-[1.9] text-ivory/90">
                    <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {job.closing && (
            <section className="card corners mt-14 px-7 py-12 text-center sm:px-12" data-reveal>
              <p className="eyebrow">MESSAGE</p>
              <p className="mt-6 whitespace-pre-line text-lg leading-[2.1] tracking-[0.04em] text-ivory sm:text-xl">
                {job.closing}
              </p>
            </section>
          )}

          <div className="mt-12 space-y-8">
            <RecruitNotice />
            {job.applyLineId ? (
              <div className="space-y-6">
                <LineApplyForm lineId={job.applyLineId} jobTitle={job.title} jobSlug={job.slug} friendUrl={canApply ? applyHref : undefined} />
                <ButtonLink href="/recruit" variant="outline">
                  求人一覧へ戻る
                </ButtonLink>
              </div>
            ) : canApply ? (
              <div className="space-y-6">
              <div className="border border-gold/40 px-5 py-5 text-sm leading-[1.9] text-ivory/90">
                <p className="text-xs tracking-[0.16em] text-gold">応募のときのお願い</p>
                <p className="mt-2">
                  応募の際は「<span className="text-gold">{REFERRAL_LABEL}の求人を見た</span>」とお伝えください。
                  {isLine
                    ? "LINEで友だち追加したあと、最初のメッセージで「NEXT EMPERORの求人を見た」と送ってください。"
                    : "下のボタンから進むと、応募先にこのことが伝わるよう自動で設定されています。"}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={applyHref} external>
                  {isLine ? "LINEで応募する" : "応募先へ進む"}
                </ButtonLink>
                <ButtonLink href="/recruit" variant="outline">
                  求人一覧へ戻る
                </ButtonLink>
              </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="border border-ice/40 px-5 py-4 text-sm leading-relaxed text-ice">
                  現在、応募受付の準備中です。受付開始までしばらくお待ちください。
                </p>
                <ButtonLink href="/recruit" variant="outline">
                  求人一覧へ戻る
                </ButtonLink>
              </div>
            )}
            {canApply && !job.applyLineId && <p className="text-xs text-ivory-dim">外部サイト（応募窓口）へ移動します。</p>}
          </div>
        </Container>
      </Section>
    </>
  );
}
