/**
 * 大きな英字が横に流れる帯（輪郭だけの文字）
 * セクションの区切りに使います。
 */
export default function BigMarquee({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="theme-light relative overflow-hidden border-y border-ivory/[0.08] py-6 sm:py-10">
      <div className={`marquee-track flex w-max ${reverse ? "reverse" : ""}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className={`px-8 font-display text-[3.4rem] font-semibold uppercase leading-none tracking-[0.02em] sm:px-12 sm:text-[6.5rem] ${i % 2 ? "text-outline" : "metal-gold"}`}>
                  {w}
                </span>
                <span className="h-2.5 w-2.5 rotate-45 bg-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
