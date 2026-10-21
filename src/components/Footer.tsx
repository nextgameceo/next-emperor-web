import Link from "next/link";
import Logo from "./Logo";
import { footerItems, siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-navy-deep">
      <div className="mx-auto max-w-site px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label="NEXT EMPEROR ホーム" className="inline-block">
              <Logo className="h-auto w-[200px] sm:w-[240px]" sizes="240px" />
            </Link>
            <p className="mt-5 font-serif text-sm tracking-[0.12em] text-ivory/75">夜の経験を、明日の可能性へ。</p>
          </div>
          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm tracking-[0.08em] sm:grid-cols-3">
              {footerItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory-muted transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-charcoal-line pt-8 text-xs tracking-[0.1em] text-ivory-dim sm:flex-row sm:justify-between">
          <p>{siteConfig.legalName}</p>
          <p>Copyright © NEXT EMPEROR. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
