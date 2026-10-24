import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import HeroHorizon from "./HeroHorizon";
import SplitText from "./SplitText";

/** スクロール表示の遅延を指定するためのヘルパー（例：delay(0.2)） */
export const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** 横幅を揃えるラッパー */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** セクション共通の余白（上に細い金の罫線）。背景は白（theme-light） */
export function Section({
  children,
  id,
  className = "",
  labelledBy,
  divider = true,
  band = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  labelledBy?: string;
  divider?: boolean;
  /** true でわずかに明るい帯にする（セクションの濃淡） */
  band?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`theme-light relative py-24 sm:py-32 ${band ? "band" : ""} ${className}`}>
      {/* 縦の細い罫線（PC）：ヒーローから続くグリッド */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-site border-x border-ivory/[0.07]" />
      </div>
      {divider && <span aria-hidden data-reveal="line-x" className="absolute inset-x-0 top-0 h-px bg-ivory/[0.1]" />}
      <div className="relative">{children}</div>
    </section>
  );
}

/** 小さなラベル（見出しの上） */
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span aria-hidden className="h-[5px] w-[5px] rotate-45 bg-gold" />
      <span>{children}</span>
    </p>
  );
}

/** ラベル＋大見出し（スクロールで表示） */
export function SectionHeading({
  eyebrow,
  title,
  id,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : ""}>
      <div data-reveal>
        <Eyebrow center={center}>{eyebrow}</Eyebrow>
      </div>
      <Tag id={id} className="heading-en mt-6" data-reveal="split" style={delay(0.1)}>
        <SplitText>{title}</SplitText>
      </Tag>
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
  className?: string;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/**
 * ボタン（リンク）
 * primary … 細い金の縁のカプセル＋金の丸い矢印（ホバーで金色が満ちる）
 * outline … 丸い枠の矢印＋文字
 */
export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const extLabel = external ? <span className="sr-only">（外部サイトが新しいタブで開きます）</span> : null;

  if (variant === "primary") {
    const cls = `btn-pill group relative inline-flex h-[3.6rem] items-center justify-between gap-8 overflow-hidden whitespace-nowrap rounded-full pl-7 pr-2 text-[0.85rem] tracking-[0.16em] ${className}`;
    const inner = (
      <>
        <span aria-hidden className="btn-pill-fill absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-x-100" />
        <span className="btn-pill-label relative transition-colors duration-500">{children}</span>
        <span className="btn-orb relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-black transition-transform duration-500 group-hover:translate-x-0.5">
          <ArrowIcon />
        </span>
        {extLabel}
      </>
    );
    return external ? (
      <a href={href} {...ext} className={cls}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  const cls = `group inline-flex h-[3.6rem] items-center gap-4 whitespace-nowrap text-[0.85rem] tracking-[0.16em] text-ivory/85 transition-colors hover:text-ivory ${className}`;
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/25 transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
        <ArrowIcon />
      </span>
      <span>{children}</span>
      {extLabel}
    </>
  );
  return external ? (
    <a href={href} {...ext} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** 下層ページ上部のタイトル帯（夜明けの地平線＋大きな英字タイトル） */
export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="theme-dark relative overflow-hidden bg-black pb-16 pt-36 sm:pb-24 sm:pt-44">
      <HeroHorizon variant="page" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-site border-x border-white/[0.07]" />
      </div>
      <Container className="relative">
        <div className="lg:px-12">
          <p className="fade-up flex items-center gap-3 text-xs tracking-[0.2em] text-gold sm:text-[0.8rem]">
            <span aria-hidden className="h-[5px] w-[5px] rotate-45 bg-gold" />
            {eyebrow}
          </p>
          <h1
            className={`mt-6 font-display font-medium uppercase tracking-[0.04em] text-ivory ${
              title.length > 14
                ? "text-[1.9rem] leading-[1.4] sm:text-[2.8rem] lg:text-[3.4rem]"
                : "text-[2.8rem] leading-[1.05] sm:text-[4.6rem] lg:text-[5.6rem]"
            }`}
          >
            <span className="split-load block" style={delay(0.15)}>
              <SplitText>{title}</SplitText>
            </span>
          </h1>
          {lead && <p className="fade-up-delay mt-8 max-w-2xl text-[0.95rem] leading-[2.05] tracking-[0.04em] text-ivory/70 sm:text-base">{lead}</p>}
        </div>
      </Container>
    </div>
  );
}

/** 注意書き */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-gold bg-charcoal/70 px-6 py-5 text-[0.85rem] leading-[1.95] tracking-[0.04em] text-ivory-muted">
      {children}
    </div>
  );
}
