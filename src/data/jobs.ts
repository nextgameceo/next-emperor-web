/**
 * 求人データ
 * ------------------------------------------------------------
 * ・1件 = 1つのオブジェクトです。コピーして中身を書き換えれば追加できます。
 * ・status を "published" にした求人だけがサイトに表示されます。
 * ・給与・勤務地などの条件は、実際の内容が確定したものだけを入れてください。
 *   空欄（"" や []）の項目は、サイトに表示されません。
 * ・slug は URL になります（/recruit/◯◯）。半角英数字とハイフンのみ、重複不可。
 * ・applyUrl には掲載企業の「応募フォーム」「LINE」などのURLを入れます。
 *   メールで受け付ける場合は "mailto:xxx@example.com" と書きます。
 *   空欄の間は「応募受付の準備中」と表示され、応募ボタンは出ません。
 *   ※応募ボタンには「NEXT EMPEROR経由」の目印が自動で付きます（メール件名・LINEの最初の文・URLの ?ref=next-emperor）。
 *   ※LINE公式アカウントの場合は https://line.me/R/oaMessage/@アカウントID/ の形で入れると、最初のメッセージが自動入力されます。
 * ・companyLabel を入れると、会社名の代わりにその表記を表示します（会社名を伏せる場合）。
 */

export type JobStatus = "published" | "draft";

export type Job = {
  slug: string;
  title: string; // 求人タイトル
  partnerId: string; // 企業（partners.ts の id）
  companyLabel?: string; // 会社名の代わりに表示する表記（会社名を伏せる場合）
  industry?: string; // 業種の説明
  description: string; // 仕事内容（改行可）
  appeal?: string[]; // こんな方におすすめ
  closing?: string; // 最後のメッセージ（改行可）
  location: string; // 勤務地
  employmentType: string; // 雇用形態
  salary: string; // 給与
  workingHours: string; // 勤務時間
  holidays: string; // 休日
  benefits: string[]; // 福利厚生
  applyUrl: string; // 応募先URL（掲載企業の応募フォーム・LINE・mailto: など）
  status: JobStatus; // 公開状態
  updatedAt?: string; // 最終更新日（例："2026-11-01"）
};

export const jobs: Job[] = [
  {
    slug: "solar-sales",
    title: "太陽光設備の営業スタッフ（訪問販売）",
    partnerId: "one",
    companyLabel: "太陽光発電関連企業",
    industry:
      "太陽光パネルや蓄電池など、住宅向けのエネルギー設備を扱う業界です。電気代の値上がりや脱炭素の流れを受けて、「自宅で電気をつくる・ためる」ことへの関心は年々高まっています。\nこの仕事では、ご家庭を訪問し、電気代の悩みをお聞きしながら、設備の仕組みやメリットをわかりやすくお伝えし、導入をご提案します。",
    description:
      "・担当エリアのご家庭への訪問\n・電気代や暮らしについてのヒアリング\n・太陽光パネル・蓄電池のご説明とご提案\n・ご契約に向けたお手続きのサポート\n\n※具体的な業務内容は、応募先にてご確認ください。",
    appeal: [
      "初対面の人と話すことが苦にならない方",
      "目標や数字に向かって、粘り強く頑張れる方",
      "がんばった分を、成果として評価されたい方",
      "夜の仕事で磨いた接客力・トーク力を活かしたい方",
    ],
    closing:
      "夜の店で、何人のお客様と向き合ってきましたか。\n名前を覚え、表情を読み、「また会いたい」と思わせる。\nその力は、営業の世界でいちばん求められている力です。\n\n舞台を夜から昼に移すだけで、あなたの経験は「実績」に変わります。\n次に選ばれるのは、あなたです。",
    location: "",
    employmentType: "",
    salary: "",
    workingHours: "",
    holidays: "",
    benefits: [],
    applyUrl: "",
    status: "published",
    updatedAt: "2026-10-23",
  },
  {
    slug: "solar-installer",
    title: "太陽光パネルの施工スタッフ（職人）",
    partnerId: "trendline",
    companyLabel: "太陽光発電関連企業",
    industry:
      "住宅や建物の屋根に、太陽光パネルを取り付ける施工の仕事です。再生可能エネルギーの普及にともない、設置工事のニーズは続いています。\n一つひとつの現場で技術を身につけていく、まさに「手に職がつく」仕事です。",
    description:
      "・屋根への架台・太陽光パネルの取り付け\n・配線まわりなどの付帯作業（電気工事は有資格者が担当）\n・資材の運搬、現場の準備・片付け\n・先輩とチームを組んでの現場作業\n\n※具体的な業務内容は、応募先にてご確認ください。",
    appeal: [
      "体を動かす仕事がしたい方",
      "手に職をつけて、長く働ける技術を身につけたい方",
      "仲間と力を合わせて、一つの仕事を仕上げるのが好きな方",
      "自分の仕事が「形」として残る達成感を味わいたい方",
    ],
    closing:
      "夜の仕事で磨いた、段取りの良さ、気配り、仲間と店を回す力。\nそのすべてが、現場でもそのまま活きます。\n\n自分の手で取り付けたパネルが、何年も先まで、誰かの家族の暮らしを支えていく。\n毎日、目に見える形で「誰かの役に立っている」と実感できる仕事です。\n\n朝日を浴びて働く毎日を、ここから始めませんか。",
    location: "",
    employmentType: "",
    salary: "",
    workingHours: "",
    holidays: "",
    benefits: [],
    applyUrl: "",
    status: "published",
    updatedAt: "2026-10-23",
  },
];
