import type { Metadata } from "next";
import Image from "next/image";
import DocumentForm from "@/components/DocumentForm";
import { Container, Notice, PageHero, Section } from "@/components/ui";
import { SERVICE_GUIDE } from "@/lib/document";

export const metadata: Metadata = {
  title: "サービス資料ダウンロード",
  description:
    "NEXT EMPERORの企業向けサービス資料（PDF）をダウンロードいただけます。採用マーケティング・人材集客・法人営業支援の内容と、ご相談の流れをまとめています。",
  alternates: { canonical: "/document" },
};

const contents = [
  "採用・営業でよくある課題",
  "見落とされがちな人材層「夜職経験者」とその強み",
  "支援メニュー（採用マーケティング・営業代行・販路開拓・営業戦略）",
  "採用マーケティング支援の中身と、支援の範囲",
  "ご相談の流れ・費用について・会社概要",
];

export default function DocumentPage() {
  return (
    <>
      <PageHero
        eyebrow="サービス資料ダウンロード"
        title="Service Guide"
        lead="NEXT EMPERORの企業向けサービスを、1つの資料にまとめました。社内でのご検討にお役立てください。"
      />
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <div className="relative aspect-video w-full overflow-hidden border border-charcoal-line bg-black">
                <Image src="/images/service-guide-cover.webp" alt={`${SERVICE_GUIDE.title}の表紙`} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
              </div>
              <p className="mt-8 eyebrow">資料の内容（PDF・全{SERVICE_GUIDE.pages}ページ）</p>
              <ul className="body-text mt-5 space-y-3">
                {contents.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-[5px] w-[5px] shrink-0 rotate-45 bg-gold" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Notice>
                  こちらは法人のお客様向けの資料です。NEXT EMPERORは求人の発信・集客を支援する会社で、人材の紹介やあっせんは行っていません。
                </Notice>
              </div>
            </div>
            <div>
              <h2 className="heading-lg">フォームに入力して、資料を受け取る</h2>
              <p className="body-text mt-4">
                送信後、すぐにこの画面から資料をダウンロードいただけます。ご入力のメールアドレスにも、資料のリンクをお送りします。
              </p>
              <div className="mt-10">
                <DocumentForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
