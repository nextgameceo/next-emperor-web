import { jobs, type Job } from "@/data/jobs";
import { partners, type Partner } from "@/data/partners";

/** 公開中の求人（応募先が未設定のものは「応募受付の準備中」として表示） */
export function getPublishedJobs(): Job[] {
  return jobs.filter((j) => j.status === "published");
}

/** 応募受付中の求人（応募先が設定済みのもの） */
export function getOpenJobs(): Job[] {
  return getPublishedJobs().filter((j) => isSafeExternalUrl(j.applyUrl.trim()));
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

/** 応募時に掲載企業へ伝わる「流入元」の目印 */
export const REFERRAL_LABEL = "NEXT EMPEROR";

/**
 * 応募先リンクに「NEXT EMPEROR経由」の目印を自動で付ける
 * ・メール（mailto:）… 件名に【NEXT EMPEROR経由】と求人名を入れる
 * ・LINE公式アカウント（line.me/R/oaMessage/...）… 最初のメッセージ文を自動入力
 * ・Webフォーム … URLに ?ref=next-emperor（＋アクセス解析用のutm）を付ける
 *   ※Googleフォームの「事前入力URL」をそのまま applyUrl に入れれば、流入元欄も自動入力されます
 */
export function buildApplyHref(job: Job): string {
  const raw = job.applyUrl.trim();
  if (!isSafeExternalUrl(raw)) return "";
  const msg = `${REFERRAL_LABEL}の求人「${job.title}」を見て応募します。`;
  try {
    const u = new URL(raw);
    if (u.protocol === "mailto:") {
      if (!u.searchParams.has("subject")) u.searchParams.set("subject", `【${REFERRAL_LABEL}経由】${job.title} 応募`);
      if (!u.searchParams.has("body")) u.searchParams.set("body", `${msg}\n\nお名前：\nご連絡先：\n`);
      return u.toString().replace(/\+/g, "%20");
    }
    if (u.hostname === "line.me" && u.pathname.includes("/oaMessage/")) {
      return raw.includes("?") ? raw : `${raw.replace(/\/?$/, "/")}?${encodeURIComponent(msg)}`;
    }
    if (!u.searchParams.has("ref")) u.searchParams.set("ref", "next-emperor");
    if (!u.searchParams.has("utm_source")) {
      u.searchParams.set("utm_source", "next-emperor");
      u.searchParams.set("utm_medium", "referral");
      u.searchParams.set("utm_campaign", job.slug);
    }
    return u.toString();
  } catch {
    return "";
  }
}
