import Image from "next/image";
import type { Partner } from "@/data/partners";

/**
 * 提携企業（ロゴのみ表示）
 * ・枠やカードは付けず、ロゴだけを並べます。
 * ・白背景用のロゴ（logoOnLight）があればそちらを使います。
 * ・ロゴが未登録の企業は、代わりに社名を表示します。
 * ・url を設定すると、ロゴが公式サイトへのリンクになります。
 */
export default function PartnerCard({ partner }: { partner: Partner }) {
  const inner = partner.logo ? (
    <Image
      src={partner.logoOnLight ?? partner.logo.src}
      alt={partner.name}
      width={partner.logo.width}
      height={partner.logo.height}
      className="h-12 w-auto max-w-full object-contain sm:h-14"
    />
  ) : (
    <span className="text-lg tracking-[0.06em] text-ivory">{partner.name}</span>
  );

  const cls = "flex h-24 items-center justify-center transition-opacity duration-300 hover:opacity-70 sm:justify-start";

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${partner.name}（新しいタブで開きます）`}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}
