import Link from "next/link";
import Logo from "./Logo";
import { Ornament, Starfield } from "./Decor";
import { footerItems, siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-charcoal-line bg-night">
      <Starfield count={60} sparkles={6} seed={97} />
      <div className="relative mx-auto max-w-site px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
        <div className="text-center">
          <Link href="/" aria-label="NEXT EMPEROR ホーム" className="inline-block">
            <Logo className="mx-auto h-auto w-[260px] sm:w-[320px]" sizes="320px" />
          </Link>
          <Ornament className="mt-8" />
          <p className="mt-6 font-serif text-sm tracking-[0.14em] text-ivory/80">夜の経験を、明日の可能性へ。</p>
        </div>

        <nav aria-label="フッターナビゲーション" className="mt-14">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm tracking-[0.08em]">
            {footerItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ivory-muted transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 flex flex-col items-center gap-2 border-t border-charcoal-line pt-8 text-xs tracking-[0.1em] text-ivory-dim sm:flex-row sm:justify-between">
          <p>{siteConfig.legalName}</p>
          <p>Copyright © NEXT EMPEROR. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
