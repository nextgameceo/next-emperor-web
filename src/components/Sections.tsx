import { Container, Section, SectionHeading, delay } from "./ui";
import { Sparkle } from "./Decor";
import { faqs } from "@/data/faq";

/** 応募までの流れ（トップ・求人ページで共通） */
export const applySteps = [
  {
    no: "01",
    title: "求人を探す",
    en: "Search",
    body: "求人情報ページから、気になる仕事を探します。勤務地や雇用形態など、各求人の概要を一覧で確認できます。",
  },
  {
    no: "02",
    title: "詳細を確認する",
    en: "Check",
    body: "求人の詳細ページで、仕事内容・給与・勤務時間・休日・福利厚生などの条件をしっかり確認します。",
  },
  {
    no: "03",
    title: "応募窓口へ直接応募する",
    en: "Apply",
    body: "詳細ページから、各求人の応募窓口（掲載企業の応募フォームや、提携する人材紹介会社の公式LINEなど）へ進み、ご本人が直接お申し込みいただきます。",
  },
  {
    no: "04",
    title: "企業による選考",
    en: "Selection",
    body: "面接・採用の判断・雇用契約は、各掲載企業が行います。選考に関するご連絡は、応募窓口から届きます。",
  },
];

export function ApplyFlow({ divider = true }: { divider?: boolean }) {
  return (
    <Section labelledBy="flow-title" divider={divider}>
      <Container>
        <SectionHeading
          eyebrow="ご応募までの流れ"
          id="flow-title"
          align="center"
          title={
            <>
              How to <span className="metal-gold">Apply</span>
            </>
          }
        />
        <p className="body-text mx-auto mt-6 max-w-2xl text-center" data-reveal style={delay(0.2)}>
          応募は、とてもシンプルです。気になる求人を見つけたら、各求人の応募窓口へ直接お申し込みください。
          NEXT EMPERORを経由して個人情報を提出する必要はありません。
        </p>
        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {applySteps.map((s, i) => (
            <li key={s.no} className="card corners p-8" data-reveal style={delay(i * 0.12)}>
              <p className="font-display text-5xl leading-none">
                <span className="metal-gold">{s.no}</span>
              </p>
              <p className="mt-5 font-display text-lg font-medium tracking-[0.12em] text-ivory">{s.en}</p>
              <p className="mt-1 text-sm text-gold-soft">{s.title}</p>
              <p className="mt-3 text-sm leading-[1.95] text-ivory-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/** よくある質問（開閉式） */
export function FaqSection() {
  return (
    <Section labelledBy="faq-title" band>
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="よくあるご質問"
          id="faq-title"
          align="center"
          title={<span className="metal-gold">FAQ</span>}
        />
        <div className="mt-14 space-y-4">
          {faqs.map((f, i) => (
            <details key={f.q} className="group card" data-reveal style={delay(i * 0.08)}>
              <summary className="flex cursor-pointer list-none items-start gap-5 px-6 py-6 sm:px-8 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-2xl leading-none text-gold">Q</span>
                <span className="flex-1 pt-0.5 font-serif tracking-[0.04em] text-ivory">{f.q}</span>
                <span
                  aria-hidden
                  className="mt-1 text-ice transition-transform duration-500 group-open:rotate-45"
                >
                  ＋
                </span>
              </summary>
              <div className="flex gap-5 border-t border-charcoal-line px-6 pb-7 pt-5 sm:px-8">
                <span className="font-display text-2xl leading-none text-ice">A</span>
                <p className="flex-1 text-sm leading-[2] text-ivory-muted sm:text-[0.95rem]">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
        <div className="mt-10 flex justify-center" aria-hidden>
          <Sparkle className="h-3 w-3 text-gold" twinkle />
        </div>
      </Container>
    </Section>
  );
}
