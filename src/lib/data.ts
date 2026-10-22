import { jobs, type Job } from "@/data/jobs";
import { partners, type Partner } from "@/data/partners";

/** 公開中の求人（応募先が未設定のものは「応募受付の準備中」として表示） */
export function getPublishedJobs(): Job[] {
  return jobs.filter((j) => j.status === "published");
}

/** 求人に表示する会社名（companyLabel があればそちらを優先） */
export function getJobCompany(job: Job): string {
  return job.companyLabel?.trim() || getPartnerName(job.partnerId);
}

export function getJobBySlug(slug: string): Job | undefined {
  return getPublishedJobs().find((j) => j.slug === slug);
}

/** 掲載承認済みの提携企業のみ */
export function getApprovedPartners(): Partner[] {
  return partners.filter((p) => p.approved);
}

/** 求人の企業名を取得（企業が未承認でも社名は求人公開の前提として承認済みであること） */
export function getPartnerName(partnerId: string): string {
  return partners.find((p) => p.id === partnerId)?.name ?? "";
}

export function isSafeExternalUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" || u.protocol === "mailto:";
  } catch {
    return false;
  }
}
