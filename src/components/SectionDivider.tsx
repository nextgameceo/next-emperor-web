/**
 * セクションの区切り（控えめ版）
 * ・セクションの境目に重ねて置く細い線
 * ・画面に入ると、線が中央から左右へ伸び、中央の小さなエンブレムが回りながら現れる
 * ・左に次のセクションの番号、右に名前
 */
export default function SectionDivider({ no, label, total = 10 }: { no: number; label: string; total?: number }) {
  return (
    <div className="divider relative z-10 h-0" data-reveal aria-hidden>
      <div className="absolute inset-x-0 top-0 -translate-y-1/2">
        <span className="divider-line absolute inset-x-0 top-1/2 h-px" />
        <div className="relative mx-auto flex h-14 max-w-site items-center justify-between px-5 sm:px-8 lg:px-20">
          <span className="divider-side flex items-baseline gap-2 rounded-full bg-white px-3 py-1">
            <span className="font-display text-sm leading-none text-[#926828]">{String(no).padStart(2, "0")}</span>
            <span className="font-display text-[0.55rem] tracking-[0.25em] text-[#17161b]/35">/ {String(total).padStart(2, "0")}</span>
          </span>
          <span className="divider-mark grid h-9 w-9 place-items-center rounded-full border border-[#ddb46e]/60 bg-white">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#c8954f]" fill="currentColor">
              <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
            </svg>
          </span>
          <span className="divider-side rounded-full bg-white px-3 py-1 font-display text-[0.58rem] uppercase tracking-[0.3em] text-[#17161b]/55">{label}</span>
        </div>
      </div>
    </div>
  );
}
