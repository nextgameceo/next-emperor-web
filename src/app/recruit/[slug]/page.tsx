import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RecruitNotice from "@/components/RecruitNotice";
import { ButtonLink, Container, PageHero, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getJobBySlug, getPartnerName, getPublishedJobs, isSafeExternalUrl } from "@/lib/data";

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
  const company = getPartnerName(job.partnerId);
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

  const company = getPartnerName(job.partnerId);
  const rows = [
    { k: "企業名", v: company },
    { k: "仕事内容", v: job.description },
    { k: "勤務地", v: job.location },
    { k: "雇用形態", v: job.employmentType },
    { k: "給与", v: job.salary },
    { k: "勤務時間", v: job.workingHours },
    { k: "休日", v: job.holidays },
    { k: "福利厚生", v: job.benefits.join("\n") },
  ].filter((r) => r.v);

  const canApply = isSafeExternalUrl(job.applyUrl);

  // Google しごと検索向けの構造化データ（入力済みの項目のみ）
  const jsonLd = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

          <dl className="border-t border-charcoal-line">
            {rows.map((r) => (
              <div key={r.k} className="grid gap-2 border-b border-charcoal-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
                <dt className="text-sm tracking-[0.12em] text-gold">{r.k}</dt>
                <dd className="whitespace-pre-line leading-[2] text-ivory/90">{r.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 space-y-8">
            <RecruitNotice />
            {canApply && (
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={job.applyUrl} external>
                  {company}の応募フォームへ
                </ButtonLink>
                <ButtonLink href="/recruit" variant="outline">
                  求人一覧へ戻る
                </ButtonLink>
              </div>
            )}
            <p className="text-xs text-ivory-dim">外部サイト（掲載企業の公式応募フォーム）へ移動します。</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
