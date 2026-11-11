/**
 * 広告（アフィリエイト）で紹介する転職サービス
 * ------------------------------------------------------------
 * ・active: true にしたものだけが、求職者向けコラムの最後に「PR」表示つきで出ます。
 *   1件も active がなければ、PR枠も記事上部の「広告を含みます」表示も出ません。
 * ・url には ASP（A8.net など）の管理画面で発行された広告リンクをそのまま貼ってください。
 *   自分で作ったURLや、通常の公式サイトURLは入れないでください（報酬が計測されません）。
 * ・紹介するのは「夜の仕事から昼の仕事への転職に合う」と判断したサービスだけにします。
 *   報酬の高さだけで選ばないこと（読者の信頼がいちばんの資産です）。
 * ・description は事実だけを書きます（「No.1」「必ず内定」などの誇張は書かない）。
 * ・ASP によっては、広告リンクとは別に「計測用の画像タグ」を貼るよう求められます。
 *   その場合は対応が必要なので、Claude に依頼してください。
 *
 * 例：
 * {
 *   id: "example",                 // 半角英数字（クリック計測に使います）
 *   name: "サービス名",
 *   description: "未経験からの正社員就職を、無料で相談できる転職支援サービス。",
 *   url: "https://px.a8.net/....",  // ASP が発行した広告リンク
 *   cta: "無料で相談してみる",
 *   active: false,
 * },
 */

export type Affiliate = {
  id: string;
  name: string;
  description: string;
  url: string;
  cta: string;
  active: boolean;
};

export const affiliates: Affiliate[] = [];

/** 公開中（active: true かつ URL あり）の広告だけを返す */
export function getActiveAffiliates(): Affiliate[] {
  return affiliates.filter((a) => a.active && /^https:\/\//.test(a.url));
}
