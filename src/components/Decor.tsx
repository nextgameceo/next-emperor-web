/** ロゴのモチーフ（4方向に光る星）を使った小さな装飾 */

export function Sparkle({ className = "h-3 w-3", twinkle = false, delay = "0s" }: { className?: string; twinkle?: boolean; delay?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${twinkle ? "twinkle" : ""}`}
      style={twinkle ? ({ "--d": delay } as React.CSSProperties) : undefined}
      aria-hidden
      fill="currentColor"
    >
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

/** 「線・星・線」の飾り。animate で線が中央から伸びる */
export function Ornament({ className = "", animate = false }: { className?: string; animate?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className={`hairline w-16 origin-right sm:w-24 ${animate ? "draw-x" : ""}`} style={{ "--d": "0.4s" } as React.CSSProperties} />
      <Sparkle className="h-2 w-2 text-ice" twinkle={animate} delay="0.6s" />
      <Sparkle className="h-3.5 w-3.5 text-gold" twinkle={animate} />
      <Sparkle className="h-2 w-2 text-ice" twinkle={animate} delay="1.2s" />
      <span className={`hairline-r w-16 origin-left sm:w-24 ${animate ? "draw-x" : ""}`} style={{ "--d": "0.4s" } as React.CSSProperties} />
    </div>
  );
}
