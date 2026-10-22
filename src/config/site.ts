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
    englishName: "NEXT EMPEROR LLC",
    status: "設立準備中",
    location: "愛知県名古屋市",
    capital: "3,500,000円",
    // 代表者：正式な氏名を入力すると表示されます（例："代表社員　山田 太郎"）
    representative: "",
    // 以下は確定後に入力してください
    address: "",
    tel: "",
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
    ] as { title: string; items: string[] }[],
    /** 事業内容の最後に添える一文（不要なら空欄に） */
    businessNote: "前各号に附帯関連する一切の事業",
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
