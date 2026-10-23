import Image from "next/image";
import type { Partner } from "@/data/partners";

/**
 * 提携企業カード（ロゴのみ表示）
 * ロゴが未登録の企業は、代わりに社名を表示します。
 * url を設定すると、カード全体が公式サイトへのリンクになります。
 */
export default function PartnerCard({ partner }: { partner: Partner }) {
  const inner = partner.logo ? (
    <Image
      src={partner.logo.src}
      alt={partner.name}
      width={partner.logo.width}
      height={partner.logo.height}
      className="h-14 w-auto max-w-full object-contain sm:h-16"
    />
  ) : (
    <span className="text-lg tracking-[0.06em] text-ivory">{partner.name}</span>
  );

  const cls = "theme-dark card corners flex h-40 items-center justify-center px-8 sm:h-44";

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${partner.name}（新しいタブで開きます）`}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}
