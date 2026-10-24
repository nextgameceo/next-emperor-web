import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "NEXT EMPERORのプライバシーポリシー（個人情報の取り扱いについて）。",
  alternates: { canonical: "/privacy" },
};

/*
 * ※公開前に専門家（弁護士等）の確認を受けてください。
 *   制定日・事業者の住所・代表者は確定後に追記してください。
 */
const sections = [
  {
    title: "1. 基本方針",
    body: `${siteConfig.legalName}（以下「当社」）は、個人情報の保護に関する法律その他の関係法令を遵守し、お客様の個人情報を適切に取り扱います。`,
  },
  {
    title: "2. 取得する個人情報",
    body: "当社は、お問い合わせフォームを通じて、会社名、担当者名、メールアドレス、電話番号、お問い合わせ内容を取得します。また、当社自身が募集する求人（本サイトに「当社自身の求人」と明記したもの）に応募いただく場合は、当社の公式LINEを通じて、お名前・ご連絡先・ご経歴など応募に必要な情報を取得します。なお、提携企業の求人については、当社は応募の受付を行っておらず、応募者の履歴書等の個人情報を取得しません。",
  },
  {
    title: "3. 利用目的",
    list: [
      "お問い合わせへの回答およびご連絡のため",
      "当社サービスのご提案・ご案内のため",
      "サービスの改善および新サービスの検討のため",
      "当社自身の求人へのご応募に関する選考およびご連絡のため",
    ],
  },
  {
    title: "4. 第三者提供",
    body: "当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。",
  },
  {
    title: "5. 業務委託",
    body: "当社は、利用目的の達成に必要な範囲で、メール送信やサーバー運用等の業務を外部事業者に委託することがあります。この場合、委託先に対して必要かつ適切な監督を行います。",
  },
  {
    title: "6. 安全管理措置",
    body: "当社は、個人情報の漏えい、滅失または毀損の防止その他の安全管理のため、必要かつ適切な措置を講じます。",
  },
  {
    title: "7. 外部サイトへのリンク",
    body: "本サイトの求人ページからリンクする掲載企業の応募フォームや提携する人材紹介会社のLINE公式アカウント等の外部サービスにおける個人情報の取り扱いは、各運営企業のプライバシーポリシーに従います。ご利用の際は、各サイトのポリシーをご確認ください。",
  },
  {
    title: "8. アクセス解析等",
    body: "本サイトでは、利用状況の把握のため、Google LLCが提供するアクセス解析ツール「Googleアナリティクス」を利用しています。Googleアナリティクスは、Cookieを利用して、閲覧したページ、ボタンの利用状況、利用環境などの情報を収集します。これらの情報に、個人を特定する情報は含まれません。また、求人ページの応募フォーム等に入力された内容が、アクセス解析のために送信されることはありません。収集された情報はGoogle社のプライバシーポリシーに基づいて管理されます。また、求人ページの応募フォームからLINEを開いた回数を集計するため、重複を除く目的で、通信元の情報を元に戻せない形に変換した値を最長1日間保存します。この値から個人を特定することはできません。Cookieの利用はブラウザの設定で無効にでき、Googleが提供するオプトアウトアドオンを利用して収集を停止することもできます。",
  },
  {
    title: "9. 開示・訂正・削除等のご請求",
    body: "ご本人から個人情報の開示、訂正、利用停止、削除等のご請求があった場合は、ご本人であることを確認のうえ、法令に従い適切に対応します。",
  },
  {
    title: "10. 本ポリシーの変更",
    body: "当社は、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、本サイトに掲載した時点から効力を生じます。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="プライバシーポリシー" title="Privacy Policy" />
      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-serif text-lg tracking-[0.06em] text-ivory">{s.title}</h2>
                {s.body && <p className="body-text mt-4">{s.body}</p>}
                {s.list && (
                  <ul className="body-text mt-4 list-disc space-y-1 pl-6 marker:text-gold">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section>
              <h2 className="font-serif text-lg tracking-[0.06em] text-ivory">11. お問い合わせ窓口</h2>
              <p className="body-text mt-4">
                個人情報の取り扱いに関するお問い合わせは、
                <Link href="/contact" className="text-gold underline underline-offset-4">
                  お問い合わせフォーム
                </Link>
                よりご連絡ください。
              </p>
              <p className="body-text mt-4">{siteConfig.legalName}</p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
