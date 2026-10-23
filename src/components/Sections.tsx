import { Container, Section, SectionHeading, delay } from "./ui";
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
          title={
            <>
              How to <span className="metal-gold">Apply</span>
            </>
          }
        />
        <p className="body-text mt-6 max-w-2xl" data-reveal style={delay(0.2)}>
          応募は、とてもシンプルです。気になる求人を見つけたら、各求人の応募窓口へ直接お申し込みください。
          NEXT EMPERORを経由して個人情報を提出する必要はありません。
        </p>
        {/* タイムライン：線が左から伸び、各ステップが順に現れる */}
        <div className="relative mt-20">
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-ivory/10 lg:block" />
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-gold via-gold/60 to-ice/60 lg:block" data-reveal="line-x" />
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {applySteps.map((s, i) => (
              <li key={s.no} className="relative pl-8 lg:pl-0" data-reveal style={delay(0.3 + i * 0.18)}>
                <span aria-hidden className="absolute left-0 top-0 grid h-[15px] w-[15px] place-items-center rounded-full border border-gold bg-[rgb(var(--tint,255_255_255))] lg:relative">
                  <span className="h-[5px] w-[5px] rounded-full bg-gold" />
                </span>
                <span aria-hidden className="absolute left-[7px] top-[15px] h-[calc(100%+3rem)] w-px bg-ivory/10 last:hidden sm:hidden" />
                <p className="font-display text-[3.2rem] font-light leading-none text-ivory/15 lg:mt-8">{s.no}</p>
                <p className="mt-5 font-display text-lg uppercase tracking-[0.12em] text-ivory">{s.en}</p>
                <p className="mt-1 text-sm text-gold">{s.title}</p>
                <p className="mt-4 text-sm leading-[1.95] text-ivory-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/** よくある質問（開閉式）：左に見出し、右に質問の一覧 */
export function FaqSection() {
  return (
    <Section labelledBy="faq-title" band>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="よくあるご質問" id="faq-title" title={<span className="metal-gold">FAQ</span>} />
            <p className="body-text mt-6 max-w-sm" data-reveal style={delay(0.2)}>
              応募の方法や、NEXT EMPERORの役割について、よくいただくご質問をまとめました。
            </p>
          </div>
          <div className="border-t border-ivory/10">
            {faqs.map((f, i) => (
              <details key={f.q} className="group border-b border-ivory/10" data-reveal style={delay(i * 0.08)}>
                <summary className="flex cursor-pointer list-none items-start gap-6 py-7 [&::-webkit-details-marker]:hidden">
                  <span className="pt-1 font-display text-xs tracking-[0.2em] text-ice">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[1rem] leading-[1.8] tracking-[0.04em] text-ivory transition-colors group-hover:text-gold">{f.q}</span>
                  <span
                    aria-hidden
                    className="relative mt-2 h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-gold after:absolute after:left-1/2 after:top-0 after:h-3 after:w-px after:bg-gold after:transition-transform after:duration-500 group-open:after:scale-y-0"
                  />
                </summary>
                <div className="flex gap-6 pb-8">
                  <span className="pt-0.5 font-display text-xs tracking-[0.2em] text-gold">A</span>
                  <p className="flex-1 text-sm leading-[2.05] text-ivory-muted sm:text-[0.95rem]">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
