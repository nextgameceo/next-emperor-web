"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * スマホ用の固定ボタン（画面の下）
 * ・少しスクロールすると現れ、フッター（締めのボタンがある場所）に来ると隠れます
 * ・ページに合わせてボタンが変わります
 *   求人の詳細 → 「LINEで応募する」（ページ内の応募フォームへ）
 *   お問い合わせ → 表示しない（フォームがあるため）
 *   それ以外 → 「求人を見る」「企業の方へ」
 * ・PC（横幅が広い画面）では表示しません
 */
export default function MobileCTA() {
  const pathname = usePathname() || "/";
  const [show, setShow] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const footer = document.querySelector("footer");
    let io: IntersectionObserver | null = null;
    if (footer && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
      io.observe(footer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;

  const isJob = /^\/recruit\/[^/]+/.test(pathname);
  const isBusiness = pathname.startsWith("/business");

  const primary = isJob
    ? { href: "#apply", label: "LINEで応募する", id: "apply" }
    : isBusiness
      ? { href: "/contact", label: "お問い合わせ", id: "contact" }
      : { href: "/recruit", label: "求人を見る", id: "recruit" };
  const secondary = isJob
    ? { href: "/recruit", label: "求人一覧", id: "recruit_list" }
    : isBusiness
      ? { href: "/recruit", label: "求人を見る", id: "recruit" }
      : { href: "/business", label: "企業の方へ", id: "business" };

  const visible = show && !atFooter;
  const onClick = (id: string) => track("mobile_cta_click", { target: id, page: pathname });

  return (
    <div
      className={`mobile-cta fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden ${
        visible ? "is-shown" : ""
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-md gap-2 rounded-full border border-white/10 bg-black/80 p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <Link
          href={secondary.href}
          tabIndex={visible ? 0 : -1}
          onClick={() => onClick(secondary.id)}
          className="flex h-12 flex-[0.8] items-center justify-center rounded-full text-[0.8rem] tracking-[0.12em] text-ivory/85"
        >
          {secondary.label}
        </Link>
        {primary.href.startsWith("#") ? (
          <a
            href={primary.href}
            tabIndex={visible ? 0 : -1}
            onClick={() => onClick(primary.id)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#06C755] text-[0.82rem] font-semibold tracking-[0.12em] text-white"
          >
            {primary.label} <span aria-hidden>→</span>
          </a>
        ) : (
          <Link
            href={primary.href}
            tabIndex={visible ? 0 : -1}
            onClick={() => onClick(primary.id)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#DDB46E] text-[0.82rem] font-semibold tracking-[0.12em] text-black"
          >
            {primary.label} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
