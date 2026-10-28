import Link from "next/link";
import Logo from "./Logo";
import { Emblem } from "./Art";
import SplitText from "./SplitText";
import { ButtonLink } from "./ui";
import { siteConfig } from "@/config/site";
import BgPhoto from "./BgPhoto";
import SocialLinks from "./SocialLinks";

/** フッターのリンク（3つのまとまり） */
const groups = [
  {
    title: "Company",
    items: [
      { label: "会社概要", href: "/about" },
      { label: "事業内容", href: "/service" },
      { label: "提携企業", href: "/partner" },
      { label: "ニュース", href: "/news" },
    ],
  },
  {
    title: "Career",
    items: [
      { label: "求人情報", href: "/recruit" },
      { label: "法人向けサービス", href: "/business" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "お問い合わせ", href: "/contact" },
      { label: "プライバシーポリシー", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="theme-dark relative overflow-hidden bg-black">
      {/* 縦の罫線（PC） */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-site border-x border-white/[0.07]" />
      </div>

      {/* 上段：締めのメッセージ */}
      <div className="relative border-b border-white/[0.08]">
        {/* 夕暮れの街（明日へ向かう光） */}
        <BgPhoto photo="dusk" blend="screen" fade="both" opacity={0.32} />
        <div className="relative mx-auto max-w-site px-5 py-20 sm:px-8 sm:py-28 lg:px-20">
          <p className="flex items-center gap-3 text-xs tracking-[0.2em] text-gold sm:text-[0.8rem]" data-reveal>
            <span aria-hidden className="h-[5px] w-[5px] rotate-45 bg-gold" />
            夜の経験を、明日の可能性へ。
          </p>
          <div className="mt-8 flex flex-col gap-12 xl:flex-row xl:items-end xl:justify-between">
            <p className="font-display text-[2.6rem] font-medium uppercase leading-[1.05] tracking-[0.04em] text-ivory sm:text-[4.2rem] lg:text-[4.4rem]" data-reveal="split">
              <SplitText>
                From Night
                <br />
                <span className="metal-gold">To Tomorrow.</span>
              </SplitText>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" data-reveal>
              <ButtonLink href="/recruit">お仕事を探す</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                法人のお問い合わせ
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* 中段：ロゴとリンク */}
      <div className="relative mx-auto grid max-w-site gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_2fr] lg:px-20">
        <div>
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="NEXT EMPEROR ホーム" className="inline-block">
              <Logo className="h-auto w-[200px]" sizes="200px" />
            </Link>
            <Emblem className="h-20 w-20 shrink-0 text-ivory/60" />
          </div>
          <p className="mt-6 text-xs leading-[2] tracking-[0.08em] text-ivory/50">
            {siteConfig.legalName}
            <br />
            <a href={`mailto:${siteConfig.company.email}`} className="transition-colors hover:text-gold">
              {siteConfig.company.email}
            </a>
          </p>
          <div className="mt-7">
            <p className="font-display text-[0.68rem] uppercase tracking-[0.28em] text-ice">Follow Us</p>
            <SocialLinks className="mt-4" />
          </div>
        </div>
        <nav aria-label="フッターナビゲーション" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="font-display text-[0.68rem] uppercase tracking-[0.28em] text-ice">{g.title}</p>
              <ul className="mt-5 space-y-3 text-sm tracking-[0.06em]">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="text-ivory/70 transition-colors hover:text-gold">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* 下段：大きな社名とコピーライト */}
      <div className="relative border-t border-white/[0.08]">
        <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-20">
          <p
            aria-hidden
            data-reveal="split"
            className="select-none whitespace-nowrap pt-8 text-center font-display text-[10.8vw] font-semibold uppercase leading-[0.9] tracking-[0.02em] text-white/[0.05] lg:text-[9.6rem]"
          >
            <SplitText>Next Emperor</SplitText>
          </p>
          <div className="flex flex-col items-center gap-2 py-8 text-[0.7rem] tracking-[0.12em] text-ivory/40 sm:flex-row sm:justify-between">
            <p>{siteConfig.legalName}</p>
            <p>© {new Date().getFullYear()} NEXT EMPEROR LLC. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
