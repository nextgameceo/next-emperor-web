/**
 * 適職診断（昼職タイプ診断）の質問と結果
 * ------------------------------------------------------------
 * ・各選択肢の type に1点ずつ加算し、いちばん点数の高いタイプを結果として表示します。
 * ・特定の求人や企業をすすめるものではなく、自分の強みを考えるきっかけとしての目安です。
 * ・結果の文章に、年収・就職率・「必ず」などの断定や数字は書かないでください。
 */

export type TypeKey = "sales" | "hospitality" | "support" | "creative" | "field";

export type Question = { q: string; options: { label: string; type: TypeKey }[] };

export const questions: Question[] = [
  {
    q: "お店で、いちばんやりがいを感じた瞬間は？",
    options: [
      { label: "指名や売上の目標を達成したとき", type: "sales" },
      { label: "お客様に「楽しかった」と言ってもらえたとき", type: "hospitality" },
      { label: "お店がスムーズに回るよう、段取りできたとき", type: "support" },
      { label: "SNSや見せ方の工夫で、お客様が増えたとき", type: "creative" },
      { label: "準備や片付けなど、裏方の仕事をきっちり仕上げたとき", type: "field" },
    ],
  },
  {
    q: "自分の得意なことに、いちばん近いのは？",
    options: [
      { label: "初対面の人とも、すぐに打ち解けられる", type: "sales" },
      { label: "相手の表情や様子の変化に、すぐ気づける", type: "hospitality" },
      { label: "数字や予定を、きっちり管理できる", type: "support" },
      { label: "写真や文章で、魅力を伝えられる", type: "creative" },
      { label: "体を動かして、手を動かす作業が好き", type: "field" },
    ],
  },
  {
    q: "これからの働き方で、大事にしたいことは？",
    options: [
      { label: "がんばった分が、成果として見えること", type: "sales" },
      { label: "人と直接ふれあえること", type: "hospitality" },
      { label: "生活リズムが安定していること", type: "support" },
      { label: "自分のアイデアを形にできること", type: "creative" },
      { label: "技術が身について、仕事が形に残ること", type: "field" },
    ],
  },
  {
    q: "チームの中での、自分の役割は？",
    options: [
      { label: "先頭に立って、みんなを引っ張る", type: "sales" },
      { label: "雰囲気をよくする、ムードメーカー", type: "hospitality" },
      { label: "周りを見て、さりげなくフォローする", type: "support" },
      { label: "新しい企画やアイデアを出す", type: "creative" },
      { label: "自分の担当を、黙々とやり切る", type: "field" },
    ],
  },
  {
    q: "1日の過ごし方で、心地いいのは？",
    options: [
      { label: "外に出て、いろいろな人に会う", type: "sales" },
      { label: "お客様を迎えて、もてなす", type: "hospitality" },
      { label: "落ち着いた環境で、集中して作業する", type: "support" },
      { label: "スマホやパソコンで、何かを作る", type: "creative" },
      { label: "外で体を動かして働く", type: "field" },
    ],
  },
  {
    q: "新しいことを覚えるとき、得意なやり方は？",
    options: [
      { label: "実際に人と話しながら覚える", type: "sales" },
      { label: "先輩のふるまいを見て、まねる", type: "hospitality" },
      { label: "マニュアルを読んで、整理する", type: "support" },
      { label: "ネットで調べて、自分で試してみる", type: "creative" },
      { label: "手を動かしながら、体で覚える", type: "field" },
    ],
  },
  {
    q: "言われていちばんうれしい言葉は？",
    options: [
      { label: "「頼りになるね、結果を出すね」", type: "sales" },
      { label: "「一緒にいると安心する」", type: "hospitality" },
      { label: "「丁寧で、ミスがないね」", type: "support" },
      { label: "「センスがいいね」", type: "creative" },
      { label: "「仕事が早くて、きれいだね」", type: "field" },
    ],
  },
];

export type TypeResult = {
  key: TypeKey;
  en: string;
  name: string;
  catch: string;
  body: string;
  strengths: string[];
  jobs: string[];
  step: string;
};

/** タイプの並び順（同点のときは、この順で先にあるタイプを結果にします） */
export const typeOrder: TypeKey[] = ["sales", "hospitality", "support", "creative", "field"];

export const results: Record<TypeKey, TypeResult> = {
  sales: {
    key: "sales",
    en: "SALES",
    name: "営業タイプ",
    catch: "話して、動かす人。",
    body: "人と会い、会話から信頼を築き、目標に向かって走り切る。夜の仕事で積み重ねてきた「指名される力」は、昼の世界では営業の力そのものです。成果が見える環境で、力を発揮しやすいタイプです。",
    strengths: ["初対面の相手と関係をつくる会話力", "相手の本音を引き出すヒアリング力", "目標や数字に向き合う粘り強さ"],
    jobs: ["個人向けの営業（住宅設備・保険など）", "法人営業", "店舗での販売・提案"],
    step: "これまでに達成した目標や、お客様との関係づくりで工夫したことを、3つ書き出してみましょう。面接で話せる「自分の実績」になります。",
  },
  hospitality: {
    key: "hospitality",
    en: "HOSPITALITY",
    name: "接客・サービスタイプ",
    catch: "心地いい場を、つくる人。",
    body: "相手の小さな変化に気づき、その人に合わせたもてなしができる。夜の仕事で磨いた気配りは、お客様と向き合う昼の仕事で、そのまま強みになります。人とのふれあいが、働く原動力になるタイプです。",
    strengths: ["表情や声の変化に気づく観察力", "相手に合わせて対応を変える柔軟さ", "場の空気をやわらかくする雰囲気づくり"],
    jobs: ["接客・販売", "ホテル・ブライダルなどのサービス", "受付・カスタマー対応"],
    step: "「お客様に喜ばれたこと」を具体的に思い出して、メモしておきましょう。どんな気配りをしたかが、昼の仕事での強みを伝える材料になります。",
  },
  support: {
    key: "support",
    en: "SUPPORT",
    name: "事務・サポートタイプ",
    catch: "整えて、支える人。",
    body: "全体を見渡して段取りを組み、ミスなく仕事を回す。売上やシフトの管理、連絡調整など、お店を裏で支えてきた経験は、昼の職場でも頼りにされる力です。落ち着いた環境で、着実に力を発揮するタイプです。",
    strengths: ["数字や予定を正確に管理する力", "周りを見て先回りする段取り力", "人と人をつなぐ連絡・調整力"],
    jobs: ["一般事務・営業事務", "カスタマーサポート", "店舗や現場の管理・アシスタント"],
    step: "パソコンやスマホで、表計算ソフトや文書作成の基本操作に触れてみましょう。事務の仕事を考えるときの、具体的な準備になります。",
  },
  creative: {
    key: "creative",
    en: "CREATIVE",
    name: "発信・マーケティングタイプ",
    catch: "魅せて、届ける人。",
    body: "自分やお店の魅力を、写真や言葉で伝えてきた。お客様の反応を見ながら発信を工夫してきた経験は、SNS運用や広報、採用マーケティングの仕事に通じます。アイデアを形にすることに、やりがいを感じるタイプです。",
    strengths: ["SNSで人を惹きつける発信力", "相手に刺さる言葉や見せ方を選ぶセンス", "反応を見て改善を続ける試行錯誤の力"],
    jobs: ["SNS運用・Webマーケティング", "広報・PR", "採用マーケティング"],
    step: "これまでの発信で反応がよかった投稿を振り返り、「なぜ伸びたのか」を言葉にしてみましょう。マーケティングの仕事で求められる考え方の練習になります。",
  },
  field: {
    key: "field",
    en: "CRAFT",
    name: "現場・ものづくりタイプ",
    catch: "手を動かして、形にする人。",
    body: "体を動かし、仲間と段取りを合わせて、ひとつの仕事を仕上げる。忙しいお店を回してきたタフさとチームワークは、現場の仕事で強みになります。技術を身につけ、成果が形に残ることに喜びを感じるタイプです。",
    strengths: ["忙しい場面でも動ける体力とタフさ", "仲間と息を合わせるチームワーク", "目の前の作業をやり切る集中力"],
    jobs: ["施工・設備の仕事", "製造・組み立て", "物流・配送"],
    step: "興味のある現場の仕事について、どんな一日を過ごすのかを調べてみましょう。働くイメージが具体的になると、次の一歩を決めやすくなります。",
  },
};
