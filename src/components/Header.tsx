"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { navItems } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "border-b border-gold/20 bg-ink/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ink focus:px-4 focus:py-2"
      >
        本文へスキップ
      </a>
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          aria-label="NEXT EMPEROR ホーム"
          className={`shrink-0 transition-all duration-700 ${
            pathname === "/" && !scrolled && !open ? "pointer-events-none -translate-y-2 opacity-0" : "opacity-100"
          }`}
        >
          <Logo className="h-12 w-auto sm:h-16" priority />
        </Link>

        <nav aria-label="メインナビゲーション" className="fade-up hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative font-display text-[0.8rem] tracking-[0.22em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-ice after:transition-transform after:duration-500 hover:text-gold hover:after:scale-x-100 ${
                    isActive(item.href) ? "text-gold after:scale-x-100" : "text-ivory/85 after:scale-x-0"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-ivory transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-6 bg-ivory transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-charcoal-line/70 bg-ink lg:hidden"
      >
        <nav aria-label="モバイルナビゲーション" className="px-8 py-10">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-charcoal-line/60">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between py-5 font-display text-lg tracking-[0.2em] ${
                    isActive(item.href) ? "text-gold" : "text-ivory"
                  }`}
                >
                  {item.label}
                  <span aria-hidden className="text-gold/70">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/business"
            className="btn-gold mt-10 block py-4 text-center text-sm tracking-[0.18em]"
          >
            企業の方はこちら
          </Link>
        </nav>
      </div>
    </header>
  );
}
