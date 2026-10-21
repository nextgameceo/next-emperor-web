/**
 * 提携企業データ
 * ------------------------------------------------------------
 * ・approved を true にした企業だけがサイトに表示されます。
 *   提携関係・事業内容・社名・ロゴの掲載について、各企業の承認を得てから true にしてください。
 * ・logo は public/images/partners/ に画像を置いてパスを指定（任意）。
 * ・url は企業の公式サイト（任意）。
 */

export type Partner = {
  id: string; // 求人データから参照するID（半角英数字）
  name: string;
  business: string[]; // 事業内容
  recruiting: string[]; // 採用している職種
  url?: string;
  logo?: { src: string; width: number; height: number };
  approved: boolean; // 掲載承認済みか
};

export const partners: Partner[] = [
  {
    id: "one",
    name: "株式会社ONE",
    business: ["太陽光訪問販売事業"],
    recruiting: ["訪問販売スタッフ"],
    approved: false,
  },
  {
    id: "trendline",
    name: "株式会社トレンドライン",
    business: ["太陽光施工関連事業"],
    recruiting: ["施工スタッフ"],
    approved: false,
  },
];
