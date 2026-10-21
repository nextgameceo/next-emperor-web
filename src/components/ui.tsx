import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

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
    <section id={id} aria-labelledby={labelledBy} className={`relative py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

/** 英字の小見出し */
export function Eyebrow({
  children,
  center = false,
  light = false,
}: {
  children: ReactNode;
  center?: boolean;
  /** 明るい背景の上で使うとき true（濃い金色で表示） */
  light?: boolean;
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${light ? "!text-gold-deep" : ""}`}>
      {!center && <span className={`hairline ${light ? "!bg-gold-deep" : ""}`} aria-hidden />}
      {children}
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
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  lead?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : ""}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <Tag id={id} className="heading-lg mt-4">
        {title}
      </Tag>
      {lead && <p className={`body-text mt-5 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{lead}</p>}
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

/** ボタン（リンク）：primary＝金、outline＝白の縁 */
export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const base =
    "group inline-flex min-h-[3.25rem] items-center justify-center gap-5 px-8 text-sm tracking-[0.16em] transition-all duration-300";
  const styles = variant === "primary" ? "btn-gold" : "btn-silver text-white hover:border-gold hover:text-gold-soft";
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

/** 下層ページ上部のタイトル帯（写真＋ネイビーの暗幕） */
export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-gold/30 bg-navy-deep pb-16 pt-36 sm:pb-20 sm:pt-44">
      {siteConfig.heroImage && (
        <Image
          src={siteConfig.heroImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_30%] opacity-40"
          aria-hidden
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/40" />
      <Container className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="heading-xl mt-5 text-white">{title}</h1>
        {lead && <p className="body-text mt-6 max-w-2xl text-ivory/80">{lead}</p>}
      </Container>
    </div>
  );
}

/** 注意書き */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-gold/70 bg-navy px-5 py-4 text-sm leading-relaxed tracking-[0.04em] text-ivory-muted">
      {children}
    </div>
  );
}
