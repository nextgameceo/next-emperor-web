import Link from "next/link";
import HeroHorizon from "./HeroHorizon";
import SplitText from "./SplitText";
import { Container, delay } from "./ui";

type Latest = { slug: string; title: string; date: string } | null;

/** 下段の入口（求職者・企業・提携企業） */
const entries = [
  { no: "01", en: "For Talent", title: "求職者の方へ", text: "夜の経験が活きる、昼職の選択肢を見る", href: "/recruit" },
  { no: "02", en: "For Business", title: "企業の方へ", text: "採用マーケティング・営業支援を相談する", href: "/business" },
  { no: "03", en: "Partners", title: "提携企業", text: "人の可能性を信じる企業とともに", href: "/partner" },
];

/**
 * トップページのヒーロー
 * ・背景：夜空と、地平線から昇る夜明けの光（HeroHorizon）
 * ・細い罫線で区切ったグリッドに、大きなキャッチコピーと入口を配置
 */
export default function Hero({ latest }: { latest: Latest }) {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      <HeroHorizon />

      {/* 縦の罫線（PC） */}
      <Container className="pointer-events-none absolute inset-0 hidden lg:block" >
        <div aria-hidden className="h-full border-x border-white/[0.07]" />
      </Container>

      <Container className="relative flex flex-1 flex-col justify-center pb-10 pt-28 sm:pt-32">
        <div className="lg:px-12">
          {/* 最新ニュース */}
          {latest && (
            <Link
              href={`/news/${latest.slug}`}
              className="fade-up group inline-flex max-w-full items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[0.72rem] tracking-[0.06em] text-ivory/80 backdrop-blur transition-colors hover:border-gold/60 hover:text-ivory sm:text-xs"
            >
              <span className="rounded-full bg-gold px-2.5 py-0.5 font-display text-[0.62rem] font-semibold tracking-[0.16em] text-black">NEWS</span>
              <span className="truncate">{latest.title}</span>
              <span aria-hidden className="text-gold transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          )}

          <h1
            id="hero-title"
            className="mt-9 text-[2.5rem] font-medium leading-[1.3] tracking-[0.04em] text-ivory sm:text-[4rem] lg:text-[5.4rem] lg:leading-[1.18]"
          >
            <span className="split-load block" style={delay(0.25)}>
              <SplitText>夜の経験を、</SplitText>
            </span>
            <span className="split-load block" style={delay(0.55)}>
              <SplitText>
                <span className="metal-gold">明日の可能性へ。</span>
              </SplitText>
            </span>
          </h1>

          <div className="fade-up-delay-2 mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,30rem)_auto] lg:items-end lg:justify-between">
            <p className="max-w-[30rem] text-[0.92rem] leading-[2.05] tracking-[0.04em] text-ivory/70 sm:text-base">
              今までの経験は、あなたの強みになる。夜職から昼職へ、新しいキャリアへの第一歩を。NEXT EMPERORが、あなたの挑戦を応援します。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/recruit"
                className="group relative inline-flex h-[3.6rem] items-center justify-between gap-8 overflow-hidden rounded-full border border-gold/50 bg-white/[0.03] pl-7 pr-2 text-[0.85rem] tracking-[0.16em] text-ivory backdrop-blur-sm transition-colors duration-500 hover:border-gold sm:justify-start"
              >
                {/* ホバーで金色が左から満ちる */}
                <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#f3dfb0] via-gold to-[#b98a45] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-x-100" />
                <span className="relative transition-colors duration-500 group-hover:text-black">お仕事を探す</span>
                <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#f6e4bb] via-gold to-[#a97a3c] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform duration-500 group-hover:translate-x-0.5">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/business"
                className="group inline-flex h-[3.6rem] items-center gap-4 text-[0.85rem] tracking-[0.16em] text-ivory/85 transition-colors hover:text-ivory"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
                企業の方はこちら
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* 下段：入口（罫線で区切ったセル） */}
      <div className="relative border-t border-white/[0.08] bg-black/60">
        <Container>
          <ul className="-mx-5 grid grid-cols-3 divide-x divide-white/[0.08] sm:mx-0 lg:border-x lg:border-white/[0.07]">
            {entries.map((e, i) => (
              <li key={e.no} className="fade-up-delay-2" style={delay(0.2 + i * 0.1)}>
                <Link href={e.href} className="group flex h-full flex-col gap-1.5 px-3 py-4 transition-colors hover:bg-white/[0.03] sm:gap-2 sm:px-6 sm:py-7 lg:px-8">
                  <span className="flex items-center justify-between font-display text-[0.55rem] tracking-[0.2em] text-ice sm:text-[0.65rem] sm:tracking-[0.28em]">
                    <span>
                      {e.no}
                      <span className="hidden sm:inline"> / {e.en}</span>
                    </span>
                    <span aria-hidden className="text-gold opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </span>
                  <span className="text-[0.8rem] tracking-[0.04em] text-ivory sm:text-base sm:tracking-[0.08em]">{e.title}</span>
                  <span className="hidden text-xs leading-relaxed tracking-[0.04em] text-ivory/55 sm:block">{e.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
