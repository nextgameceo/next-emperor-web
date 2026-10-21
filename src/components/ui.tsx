import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Sparkle } from "./Decor";

/** スクロール表示の遅延を指定するためのヘルパー（例：delay(0.2)） */
export const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** 横幅を揃えるラッパー */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** セクション共通の余白（上に細い金の罫線） */
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
    <section id={id} aria-labelledby={labelledBy} className={`relative py-24 sm:py-32 ${band ? "band" : ""} ${className}`}>
      {divider && (
        <span
          aria-hidden
          data-reveal="line"
          className="absolute inset-x-0 top-0 mx-auto h-px w-[min(80%,900px)] origin-center bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      )}
      {children}
    </section>
  );
}

/** 英字ラベル（星つき） */
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="hairline" aria-hidden />
      <Sparkle className="h-2.5 w-2.5 text-ice" twinkle />
      <span className="metal-gold">{children}</span>
      {center && (
        <>
          <Sparkle className="h-2.5 w-2.5 text-ice" twinkle delay="1.6s" />
          <span className="hairline-r" aria-hidden />
        </>
      )}
    </p>
  );
}

/** 英字ラベル＋見出し（スクロールで表示） */
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
      <Tag id={id} className="heading-lg mt-6" data-reveal style={delay(0.12)}>
        {title}
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

/** ボタン（リンク）：primary＝金、outline＝銀の縁 */
export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const base =
    "group inline-flex min-h-[3.4rem] items-center justify-center gap-4 px-9 text-sm tracking-[0.18em] transition-all duration-300";
  const styles = variant === "primary" ? "btn-gold" : "btn-silver text-ivory hover:text-gold-soft";
  const arrow = (
    <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  );
  const label = <span className="relative z-10">{children}</span>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
        {label}
        {arrow}
        <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {label}
      {arrow}
    </Link>
  );
}

/** 下層ページ上部のタイトル帯 */
export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="relative border-b border-gold/20 pb-16 pt-36 sm:pb-24 sm:pt-48">
      <Container>
        <div className="fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="heading-xl mt-6">
          <span className="line-rise metal-silver" style={delay(0.15)}>
            {title}
          </span>
        </h1>
        {lead && <p className="body-text fade-up-delay mt-6 max-w-2xl">{lead}</p>}
      </Container>
    </div>
  );
}

/** 注意書き */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l border-gold/60 bg-charcoal px-5 py-4 text-sm leading-relaxed tracking-[0.04em] text-ivory-muted">
      {children}
    </div>
  );
}
