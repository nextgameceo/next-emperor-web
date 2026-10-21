/**
 * サイト全体の基本設定
 * ------------------------------------------------------------
 * ロゴ・メインビジュアル・会社情報などはここで一元管理します。
 * 未確定の情報（代表者の正式氏名・住所・電話番号・設立日など）は
 * 確定するまで入力しないでください。空欄の項目はサイトに表示されません。
 */

export const siteConfig = {
  name: "NEXT EMPEROR",
  legalName: "合同会社NEXT EMPEROR",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  title: "NEXT EMPEROR｜夜職から昼職へ。新しいキャリアの可能性を。",
  description:
    "NEXT EMPERORは、夜職から昼職への新しい挑戦を応援します。採用マーケティング、人材集客、法人営業支援を通じて、人と企業の可能性を広げます。",
  keywords: [
    "夜職から昼職",
    "夜職 転職",
    "昼職 求人",
    "名古屋 昼職",
    "キャリアチェンジ",
    "採用マーケティング",
    "法人営業支援",
  ],

  /**
   * 公式ロゴ
   * public/images/ にロゴ画像を置き、src にパスを入れてください（例："/images/logo.png"）。
   * width / height は画像の実寸（px）を入れると縦横比が正しく保たれます。
   * src が null の間は仮のテキスト表記が表示されます。
   */
  logo: {
    src: "/images/logo.png" as string | null,
    width: 1281,
    height: 624,
    alt: "NEXT EMPEROR",
    /** true：彩度をわずかに落として発光を控えめに表示（形・文字は変更しません）。false：原画のまま */
    softenGlow: true,
  },

  /**
   * 予備の設定（現在のデザインは単色背景のため未使用）
   */
  heroImage: null as string | null,

  /** 会社情報（値が空のものは会社概要ページに表示されません） */
  company: {
    legalName: "合同会社NEXT EMPEROR",
    englishName: "NEXT EMPEROR",
    status: "設立準備中",
    location: "愛知県名古屋市",
    // 以下は確定後に入力してください
    representative: "",
    address: "",
    tel: "",
    established: "",
    capital: "", // 例："350万円"（登記完了後に入力推奨）
    business: [
      "採用マーケティング事業",
      "人材集客支援事業",
      "法人営業支援事業",
      "営業代行・営業コンサルティング",
    ],
  },
};

export const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICE", href: "/service" },
  { label: "RECRUIT", href: "/recruit" },
  { label: "PARTNER", href: "/partner" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const footerItems = [
  { label: "会社概要", href: "/about" },
  { label: "事業内容", href: "/service" },
  { label: "求人情報", href: "/recruit" },
  { label: "提携企業", href: "/partner" },
  { label: "法人向けサービス", href: "/business" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy" },
] as const;
