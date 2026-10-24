/**
 * セクションの区切り（黒い帯）
 * ・金と水色の線が中央から左右へ伸び、その上を光が走り続ける
 * ・中央のエンブレムが回転しながら現れる
 * ・左に次のセクションの番号、右に名前
 */
export default function SectionDivider({ no, label, total = 9 }: { no: number; label: string; total?: number }) {
  return (
    <div className="theme-dark divider relative overflow-hidden bg-black" data-reveal aria-hidden>
      {/* 縦の罫線（PC） */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-site border-x border-white/[0.07]" />
      </div>
      {/* 背景を流れる大きな文字 */}
      <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
        <div className="marquee-track flex w-max">
          {[0, 1].map((k) => (
            <span key={k} className="divider-bgtext shrink-0 whitespace-nowrap pr-16 font-display text-[4.2rem] font-semibold uppercase leading-none sm:text-[6.5rem]">
              {label} ・ {label} ・ {label} ・{" "}
            </span>
          ))}
        </div>
      </div>
      {/* 線と、走る光 */}
      <span className="divider-line absolute inset-x-0 top-1/2 h-px" />
      <span className="divider-sweep absolute top-1/2 h-[3px] w-[38vw] -translate-y-1/2" />
      <span className="divider-glow absolute left-1/2 top-1/2 h-24 w-[60vw] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto flex h-28 max-w-site items-center justify-between px-5 sm:h-36 sm:px-8 lg:px-20">
        <span className="divider-side flex items-baseline gap-3 pr-4">
          <span className="font-display text-2xl font-light leading-none text-gold sm:text-3xl">{String(no).padStart(2, "0")}</span>
          <span className="font-display text-[0.6rem] tracking-[0.3em] text-ivory/40">/ {String(total).padStart(2, "0")}</span>
        </span>
        <span className="divider-mark relative grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-black sm:h-14 sm:w-14">
          <span className="divider-ring absolute inset-[-7px] rounded-full border border-dashed border-ice/30" />
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="currentColor">
            <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
          </svg>
        </span>
        <span className="divider-side pl-4 text-right font-display text-[0.62rem] uppercase tracking-[0.32em] text-ivory/70 sm:text-xs">{label}</span>
      </div>
    </div>
  );
}
