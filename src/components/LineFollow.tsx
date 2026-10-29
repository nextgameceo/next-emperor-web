"use client";

import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

/**
 * 「新着求人をLINEで受け取る」案内（公式LINEの友だち追加へのリンク）
 * ・リンク先は src/config/site.ts の social.line
 * ・友だち追加した方へのお知らせ配信は、LINE公式アカウントの管理画面から行ってください
 */
export default function LineFollow({ className = "", place = "default" }: { className?: string; place?: string }) {
  const href = siteConfig.social.line;
  if (!href) return null;
  return (
    <div className={`card corners relative flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9 ${className}`}>
      <div className="flex items-start gap-5">
        <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#06C755] text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6 1.1-.5 6-3.5 8.2-6.1C21.6 14.3 22 12.7 22 11c0-4.4-4.5-8-10-8Z" />
          </svg>
        </span>
        <div>
          <p className="eyebrow">NEW JOBS ON LINE</p>
          <p className="mt-2 text-[1.05rem] font-medium leading-[1.7] tracking-[0.04em] text-ivory">新着求人を、LINEで受け取る</p>
          <p className="mt-2 text-sm leading-[1.9] text-ivory-muted">
            NEXT EMPEROR公式LINEを友だち追加すると、新しい求人やコラムの更新をお知らせします。転職を迷っている段階でも大丈夫です。
          </p>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("line_follow_click", { place })}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#06C755] px-7 text-sm font-medium tracking-[0.1em] text-white transition-opacity hover:opacity-90"
      >
        友だち追加する
        <span className="sr-only">（LINEが新しいタブで開きます）</span>
      </a>
    </div>
  );
}
