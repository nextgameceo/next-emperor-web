import Image from "next/image";
import type { Partner } from "@/data/partners";

export default function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="card corners flex h-full flex-col p-7 sm:p-8">
      {partner.logo && (
        <Image
          src={partner.logo.src}
          alt={`${partner.name} ロゴ`}
          width={partner.logo.width}
          height={partner.logo.height}
          className="mb-6 h-12 w-auto object-contain object-left"
        />
      )}
      <h3 className="font-serif text-xl tracking-[0.06em]">{partner.name}</h3>
      <dl className="mt-6 space-y-4 text-sm">
        {partner.business.length > 0 && (
          <div>
            <dt className="text-xs tracking-[0.14em] text-gold">事業内容</dt>
            <dd className="mt-1 text-ivory-muted">{partner.business.join("／")}</dd>
          </div>
        )}
        {partner.recruiting.length > 0 && (
          <div>
            <dt className="text-xs tracking-[0.14em] text-gold">採用職種</dt>
            <dd className="mt-1 text-ivory-muted">{partner.recruiting.join("／")}</dd>
          </div>
        )}
      </dl>
      {partner.url && (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-6 text-xs tracking-[0.16em] text-ivory/70 hover:text-gold"
        >
          公式サイト <span aria-hidden>↗</span>
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      )}
    </article>
  );
}
