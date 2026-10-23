import Logo from "./Logo";
import { Sparkle } from "./Decor";
import { ButtonLink, Container, delay } from "./ui";

/** 下部を流れる英字（夜の仕事で磨かれる力） */
const words = ["Hospitality", "Communication", "Sales Drive", "Attention to Detail", "First Impression", "Resilience"];

/**
 * トップページのヒーロー
 * PC：左にキャッチコピー、右にロゴ（回転する光の輪）
 * スマホ：ロゴ → キャッチコピー → ボタンの縦並び
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="edge-gold relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* 背景の光 */}
      <div aria-hidden className="hero-spot pointer-events-none absolute right-[-10%] top-[6%] h-[min(120vw,900px)] w-[min(120vw,900px)] lg:right-[-4%]" />
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

      <Container className="relative flex flex-1 items-center pb-10 pt-20 sm:pt-28 lg:pb-16 lg:pt-32">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          {/* ロゴ（スマホでは上、PCでは右） */}
          <div className="relative mx-auto w-[min(80vw,560px)] lg:order-2 lg:w-full">
            <div aria-hidden className="hero-ring hero-ring-gold absolute left-1/2 top-1/2 aspect-square w-[108%] -translate-x-1/2 -translate-y-1/2" />
            <div aria-hidden className="hero-ring hero-ring-ice absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2" />
            <div className="logo-intro relative py-[9%] lg:py-[14%]">
              <Logo className="h-auto w-full" priority sizes="(max-width: 1024px) 86vw, 560px" />
            </div>
          </div>

          {/* キャッチコピー */}
          <div className="text-center lg:order-1 lg:text-left">
            <p className="fade-up flex items-center justify-center gap-3 font-display text-[0.7rem] tracking-[0.34em] text-ice lg:justify-start">
              <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-ice lg:block" />
              <Sparkle className="h-2.5 w-2.5 text-gold" twinkle />
              From Night to Tomorrow
            </p>
            <h1
              id="hero-title"
              className="mt-5 font-serif text-[2.15rem] font-medium leading-[1.45] tracking-[0.08em] sm:text-[3.2rem] lg:text-[3.9rem] lg:leading-[1.38]"
            >
              <span className="line-rise metal-silver" style={delay(0.4)}>
                夜の経験を、
              </span>
              <br />
              <span className="line-rise" style={delay(0.7)}>
                <span className="metal-gold shimmer">明日の可能性へ。</span>
              </span>
            </h1>
            <span aria-hidden className="draw-x mx-auto mt-8 block h-px w-24 origin-left bg-gradient-to-r from-gold via-gold/60 to-transparent lg:mx-0" style={delay(1)} />
            <p className="fade-up-delay-2 mx-auto mt-7 max-w-md text-[0.9rem] leading-[2.1] tracking-[0.04em] text-ivory/80 sm:text-base lg:mx-0">
              今までの経験は、あなたの強みになる。
              <br />
              夜職から昼職へ、新しいキャリアへの第一歩を。
              <br />
              NEXT EMPERORがあなたの挑戦を応援します。
            </p>
            <div className="fade-up-delay-2 mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <ButtonLink href="/recruit">お仕事を探す</ButtonLink>
              <ButtonLink href="/business" variant="outline">
                企業の方はこちら
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      {/* 流れる英字の帯 */}
      <div className="relative border-t border-gold/15 py-4" aria-hidden>
        <div className="hero-marquee flex w-max gap-10 whitespace-nowrap font-display text-xs tracking-[0.36em] text-silver/55 sm:text-sm">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              {w}
              <Sparkle className="h-2 w-2 text-gold/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
