import { siteConfig } from "@/config/site";

/**
 * ソーシャルメディアのリンク（フッター用）
 * ・src/config/site.ts の social にURLを入れたものだけ表示されます
 */
type Key = keyof typeof siteConfig.social;

const LABELS: Record<Key, string> = {
  line: "LINE公式アカウント",
  instagram: "Instagram",
  threads: "Threads",
  tiktok: "TikTok",
  x: "X（旧Twitter）",
  youtube: "YouTube",
};

/** シンプルな線画のアイコン（各サービスを表す目印） */
function Icon({ name }: { name: Key }) {
  const common = { viewBox: "0 0 24 24", className: "h-[18px] w-[18px]", "aria-hidden": true } as const;
  switch (name) {
    case "line":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6 1.1-.5 6-3.5 8.2-6.1C21.6 14.3 22 12.7 22 11c0-4.4-4.5-8-10-8Zm-3.6 10.6H6.4a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 1 0v3.6h1.5a.5.5 0 0 1 0 1Zm2-.5a.5.5 0 0 1-1 0V9a.5.5 0 0 1 1 0Zm4.8 0a.5.5 0 0 1-.9.3l-2-2.8v2.5a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .9-.3l2 2.8V9a.5.5 0 0 1 1 0Zm3.3-2.6a.5.5 0 0 1 0 1h-1.5v1.1h1.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-1.5v1Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "threads":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M18.6 8.4C17.6 5.2 15.2 3.5 12 3.5c-4.6 0-7.5 3.3-7.5 8.5s2.9 8.5 7.5 8.5c3.9 0 6.6-2.3 6.6-5.2 0-2.6-2.2-4.1-5.6-4.1-2.4 0-3.9 1.2-3.9 2.8 0 1.5 1.3 2.5 3 2.5 2.6 0 3.9-2 3.9-5 0-2.6-1.4-4.2-3.9-4.2-1.6 0-2.8.6-3.5 1.7" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.5 3c.3 2.2 1.7 3.7 4 3.9v3a7 7 0 0 1-4-1.3v6.2A5.8 5.8 0 1 1 10.7 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.3l4.4 5.8Zm-1.1 16.2h1.7L7.4 4.7H5.6Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z" />
        </svg>
      );
  }
}

export default function SocialLinks({ className = "" }: { className?: string }) {
  const items = (Object.keys(siteConfig.social) as Key[]).filter((k) => siteConfig.social[k]);
  if (items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`} aria-label="ソーシャルメディア">
      {items.map((k) => (
        <li key={k}>
          <a
            href={siteConfig.social[k]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${LABELS[k]}（新しいタブで開きます）`}
            title={LABELS[k]}
            data-magnetic
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ivory/70 transition-[color,border-color,background-color] duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
          >
            <Icon name={k} />
          </a>
        </li>
      ))}
    </ul>
  );
}
