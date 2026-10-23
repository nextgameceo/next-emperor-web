/** 小さな装飾（菱形の点）。箇条書きの記号などに使用 */
export function Sparkle({ className = "h-3 w-3" }: { className?: string; twinkle?: boolean; delay?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <rect x="8.5" y="8.5" width="7" height="7" transform="rotate(45 12 12)" />
    </svg>
  );
}

/** 区切りの細い線 */
export function Ornament({ className = "" }: { className?: string; animate?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gold/60" />
    </div>
  );
}
