/**
 * 求人データ
 * ------------------------------------------------------------
 * ・1件 = 1つのオブジェクトです。コピーして中身を書き換えれば追加できます。
 * ・status を "published" にした求人だけがサイトに表示されます。
 *   条件が確定していない求人は "draft" のままにしてください（架空の条件は掲載しない）。
 * ・slug は URL になります（/recruit/◯◯）。半角英数字とハイフンのみ、重複不可。
 * ・applyUrl には提携企業の「公式応募フォーム」のURLを入れます。
 *   応募者は NEXT EMPEROR を経由せず、提携企業へ直接応募します。
 * ・partnerId は src/data/partners.ts の id と一致させてください。
 */

export type JobStatus = "published" | "draft";

export type Job = {
  slug: string;
  title: string; // 求人タイトル
  partnerId: string; // 企業（partners.ts の id）
  description: string; // 仕事内容（改行可）
  location: string; // 勤務地
  employmentType: string; // 雇用形態
  salary: string; // 給与
  workingHours: string; // 勤務時間
  holidays: string; // 休日
  benefits: string[]; // 福利厚生
  applyUrl: string; // 応募URL（提携企業の公式応募フォーム）
  status: JobStatus; // 公開状態
  updatedAt?: string; // 最終更新日（例："2026-11-01"）
};

export const jobs: Job[] = [
  // ▼ 下書き例：条件が確定し、企業の承認を得たら各項目を埋めて status を "published" に
  {
    slug: "one-sales-staff",
    title: "訪問販売スタッフ",
    partnerId: "one",
    description: "",
    location: "",
    employmentType: "",
    salary: "",
    workingHours: "",
    holidays: "",
    benefits: [],
    applyUrl: "",
    status: "draft",
  },
  {
    slug: "trendline-construction-staff",
    title: "施工スタッフ",
    partnerId: "trendline",
    description: "",
    location: "",
    employmentType: "",
    salary: "",
    workingHours: "",
    holidays: "",
    benefits: [],
    applyUrl: "",
    status: "draft",
  },
];
