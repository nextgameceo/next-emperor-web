import Link from "next/link";
import type { ReactNode } from "react";
import { Sparkle, Starfield, Zuiun } from "./Decor";

/** 横幅を揃えるラッパー */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** セクション共通の余白 */
export function Section({
  children,
  id,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

/** 英字ラベル（星つき） */
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="hairline" aria-hidden />
      <Sparkle className="h-2.5 w-2.5 text-gold" />
      <span className="metal-gold">{children}</span>
      {center && (
        <>
          <Sparkle className="h-2.5 w-2.5 text-gold" />
          <span className="hairline-r" aria-hidden />
        </>
      )}
    </p>
  );
}

/** 英字ラベル＋見出し */
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
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <Tag id={id} className="heading-lg mt-6">
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
    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
        {children}
        {arrow}
        <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {arrow}
    </Link>
  );
}

/** 下層ページ上部のタイトル帯（星空＋瑞雲） */
export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-charcoal-line bg-night pb-16 pt-36 sm:pb-24 sm:pt-48">
      <Starfield count={45} sparkles={5} seed={title.length * 31 + 3} />
      <div className="pointer-events-none absolute -right-10 bottom-4 hidden sm:block">
        <Zuiun className="w-[420px]" opacity={0.22} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "radial-gradient(60% 100% at 70% 100%, rgba(205,177,119,0.12), transparent 70%)" }}
      />
      <Container className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="heading-xl metal-silver mt-6 inline-block">{title}</h1>
        {lead && <p className="body-text mt-6 max-w-2xl">{lead}</p>}
      </Container>
    </div>
  );
}

/** 注意書き */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l border-gold/60 bg-night px-5 py-4 text-sm leading-relaxed tracking-[0.04em] text-ivory-muted">
      {children}
    </div>
  );
}
