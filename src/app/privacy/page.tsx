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
    body: "当社は、お問い合わせフォームを通じて、会社名、担当者名、メールアドレス、電話番号、お問い合わせ内容を取得します。当社は、本サイト上で求人への応募受付を行っておらず、応募者の履歴書等の個人情報を取得しません。",
  },
  {
    title: "3. 利用目的",
    list: [
      "お問い合わせへの回答およびご連絡のため",
      "当社サービスのご提案・ご案内のため",
      "サービスの改善および新サービスの検討のため",
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
    body: "本サイトの求人ページからリンクする掲載企業の応募フォーム等の外部サイトにおける個人情報の取り扱いは、各運営企業のプライバシーポリシーに従います。ご利用の際は、各サイトのポリシーをご確認ください。",
  },
  {
    title: "8. アクセス解析等",
    body: "本サイトでは、利用状況の把握のため、Cookie等を用いたアクセス解析ツールを利用する場合があります。取得する情報には、個人を特定する情報は含まれません。",
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
      <PageHero eyebrow="Privacy Policy" title="プライバシーポリシー" />
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
