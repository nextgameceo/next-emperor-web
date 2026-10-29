"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * 記事・ページのシェアボタン（LINE / X / Facebook / リンクをコピー）
 * ・url はサイトの絶対URL、title はシェア時の文言
 */
export default function ShareButtons({ url, title, label = "この記事をシェアする", contentType = "article" }: { url: string; title: string; label?: string; contentType?: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const items = [
    { key: "line", name: "LINE", href: `https://social-plugins.line.me/lineit/share?url=${u}`, icon: <LineGlyph /> },
    { key: "x", name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: <XGlyph /> },
    { key: "facebook", name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <FbGlyph /> },
  ];

  const onShare = (method: string) => track("share", { method, content_type: contentType, item_id: url.replace(/^https?:\/\/[^/]+/, "") });

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      onShare("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("このURLをコピーしてください", url);
    }
  }

  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory/75 transition-[color,border-color,background-color] duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold";

  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="text-xs tracking-[0.14em] text-ivory-dim">{label}</p>
      <ul className="flex items-center gap-3">
        {items.map((it) => (
          <li key={it.key}>
            <a href={it.href} target="_blank" rel="noopener noreferrer" aria-label={`${it.name}でシェア（新しいタブで開きます）`} title={`${it.name}でシェア`} className={btn} onClick={() => onShare(it.key)}>
              {it.icon}
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} aria-label="リンクをコピー" title="リンクをコピー" className={btn}>
            {copied ? <CheckGlyph /> : <LinkGlyph />}
          </button>
        </li>
      </ul>
      <span role="status" aria-live="polite" className="text-xs text-gold">
        {copied ? "リンクをコピーしました" : ""}
      </span>
    </div>
  );
}

const svg = { viewBox: "0 0 24 24", className: "h-[18px] w-[18px]", "aria-hidden": true } as const;

function LineGlyph() {
  return (
    <svg {...svg} fill="currentColor">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6 1.1-.5 6-3.5 8.2-6.1C21.6 14.3 22 12.7 22 11c0-4.4-4.5-8-10-8Zm-3.6 10.6H6.4a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 1 0v3.6h1.5a.5.5 0 0 1 0 1Zm2-.5a.5.5 0 0 1-1 0V9a.5.5 0 0 1 1 0Zm4.8 0a.5.5 0 0 1-.9.3l-2-2.8v2.5a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .9-.3l2 2.8V9a.5.5 0 0 1 1 0Zm3.3-2.6a.5.5 0 0 1 0 1h-1.5v1.1h1.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-1.5v1Z" />
    </svg>
  );
}
function XGlyph() {
  return (
    <svg {...svg} fill="currentColor">
      <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.3l4.4 5.8Zm-1.1 16.2h1.7L7.4 4.7H5.6Z" />
    </svg>
  );
}
function FbGlyph() {
  return (
    <svg {...svg} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21Z" />
    </svg>
  );
}
function LinkGlyph() {
  return (
    <svg {...svg} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  );
}
function CheckGlyph() {
  return (
    <svg {...svg} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
