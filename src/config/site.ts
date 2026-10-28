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
  /**
   * サイトのURL（シェア画像・sitemap・canonical に使用）
   * ★公開するURL（ドメイン）が決まったら、ここを書き換えてください。
   *   Cloudflare のビルド用環境変数 NEXT_PUBLIC_SITE_URL を設定した場合は、そちらが優先されます。
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://next-emperor.com").replace(/\/$/, ""),
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
    src: "/images/logo-arch.png" as string | null,
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
  /**
   * ソーシャルメディア（フッターにアイコンで表示）
   * URLを入れたものだけ表示されます。空欄（""）のものは表示されません。
   */
  social: {
    x: "https://x.com/next_emperor",
    instagram: "https://www.instagram.com/nextemperor.llc/",
    threads: "https://www.threads.com/@nextemperor.llc",
    line: "https://lin.ee/qFAptqb",
    tiktok: "",
    youtube: "",
  },

  /** 会社情報（値が空のものは会社概要ページに表示されません） */
  company: {
    legalName: "合同会社NEXT EMPEROR",
    englishName: "NEXT EMPEROR LLC",
    status: "設立準備中",
    location: "愛知県名古屋市",
    capital: "4,000,000円",
    representative: "石原 利輝",
    email: "contact@next-emperor.com",
    // 以下は確定後に入力してください（空欄の項目は表示されません）
    address: "〒460-0002 愛知県名古屋市中区丸の内3丁目19番23号 FPSビル9階",
    tel: "052-000-0000", // 例："052-000-0000"
    established: "",
    /**
     * 事業内容（大項目と、その具体的な内容）
     * ※登記する定款の「目的」と食い違わないようにしてください。
     */
    business: [
      {
        title: "採用マーケティング事業",
        items: [
          "求人情報・採用コンテンツの企画、制作",
          "SNS・Web広告を活用した求人情報の発信",
          "応募につながる採用導線・採用ページの設計",
        ],
      },
      {
        title: "人材集客支援事業",
        items: [
          "夜職から昼職へのキャリアチェンジを考える方への情報発信",
          "提携企業の求人情報の提供",
          "SNSを活用した求職者の集客支援",
        ],
      },
      {
        title: "法人営業支援事業",
        items: [
          "販路開拓・新規顧客の開拓支援",
          "ビジネスパートナーとの連携支援",
          "営業体制づくりの支援",
        ],
      },
      {
        title: "営業代行・営業コンサルティング",
        items: [
          "商材・サービスの営業代行",
          "営業戦略の立案、営業プロセスの改善",
          "営業に関する研修・アドバイス",
        ],
      },
      {
        title: "広告業及び広告代理店業",
        items: [],
      },
    ] as { title: string; items: string[] }[],
    /** 事業内容の最後に添える一文（不要なら空欄に） */
    businessNote: "上記に付随した一切の事業",
  },
};

export const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICE", href: "/service" },
  { label: "RECRUIT", href: "/recruit" },
  { label: "PARTNER", href: "/partner" },
  { label: "NEWS", href: "/news" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const footerItems = [
  { label: "会社概要", href: "/about" },
  { label: "事業内容", href: "/service" },
  { label: "求人情報", href: "/recruit" },
  { label: "提携企業", href: "/partner" },
  { label: "法人向けサービス", href: "/business" },
  { label: "ニュース", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy" },
] as const;
