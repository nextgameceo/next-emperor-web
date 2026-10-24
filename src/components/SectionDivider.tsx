/**
 * セクションの区切り（控えめ版）
 * ・セクションの境目に重ねて置く細い線
 * ・画面に入ると、線が中央から左右へ伸びる
 * ・左に次のセクションの番号、右に名前
 */
export default function SectionDivider({ no, label, total = 10 }: { no: number; label: string; total?: number }) {
  return (
    <div className="divider relative z-10 h-0" data-reveal aria-hidden>
      <div className="absolute inset-x-0 top-0 -translate-y-1/2">
        {/* 背景を流れる文字（小さめ） */}
        <div className="divider-flow pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center overflow-hidden">
          <div className="marquee-track flex w-max">
            {[0, 1].map((k) => (
              <span key={k} className="shrink-0 whitespace-nowrap pr-10 font-display text-[1.6rem] font-semibold uppercase leading-none tracking-[0.12em] sm:text-[2.2rem]">
                {Array.from({ length: 6 }, () => `${label} ・ `).join("")}
              </span>
            ))}
          </div>
        </div>
        <span className="divider-line absolute inset-x-0 top-1/2 h-px" />
        <div className="relative mx-auto flex h-14 max-w-site items-center justify-between px-5 sm:px-8 lg:px-20">
          <span className="divider-side flex items-baseline gap-2 rounded-full bg-white px-3 py-1">
            <span className="font-display text-sm leading-none text-[#926828]">{String(no).padStart(2, "0")}</span>
            <span className="font-display text-[0.55rem] tracking-[0.25em] text-[#17161b]/35">/ {String(total).padStart(2, "0")}</span>
          </span>
          <span className="w-[72px]" />
        </div>
      </div>
    </div>
  );
}
