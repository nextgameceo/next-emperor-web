/**
 * ロゴのモチーフ（星・瑞雲）を使った装飾パーツ
 * すべて静的なSVGで、発光やアニメーションは使っていません。
 */

type SparkleProps = { className?: string; color?: string };

/** ロゴと同じ4方向に光る星 */
export function Sparkle({ className = "h-3 w-3", color = "currentColor" }: SparkleProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill={color}>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

/** 見出し横などに置く「線・星・線」の飾り */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="hairline w-16 sm:w-24" />
      <Sparkle className="h-2 w-2 text-silver/70" />
      <Sparkle className="h-3.5 w-3.5 text-gold" />
      <Sparkle className="h-2 w-2 text-silver/70" />
      <span className="hairline-r w-16 sm:w-24" />
    </div>
  );
}

/** 疑似乱数（毎回同じ配置になるようにシード固定） */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** 星空（小さな点と、ところどころにロゴと同じ形の星） */
export function Starfield({
  count = 70,
  sparkles = 7,
  seed = 7,
  className = "absolute inset-0 h-full w-full",
}: {
  count?: number;
  sparkles?: number;
  seed?: number;
  className?: string;
}) {
  const r = rand(seed);
  const dots = Array.from({ length: count }, () => ({
    x: r() * 1000,
    y: r() * 600,
    s: 0.6 + r() * 1.3,
    o: 0.15 + r() * 0.45,
  }));
  // 文字と重ならないよう、大きな星は左右の端（中央を避けた位置）にだけ置く
  const stars = Array.from({ length: sparkles }, () => ({
    x: (() => {
      const v = r() * 520;
      return v < 260 ? 30 + v : 710 + (v - 260);
    })(),
    y: 20 + r() * 520,
    s: 5 + r() * 9,
    o: 0.35 + r() * 0.45,
    gold: r() > 0.6,
  }));
  return (
    <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="#E4E4EA" opacity={d.o} />
      ))}
      {stars.map((s, i) => (
        <path
          key={`s${i}`}
          transform={`translate(${s.x - s.s} ${s.y - s.s}) scale(${s.s / 12})`}
          d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z"
          fill={s.gold ? "#DCC086" : "#E8E8EE"}
          opacity={s.o}
        />
      ))}
    </svg>
  );
}

/**
 * 瑞雲（ずいうん）— ロゴの雲を、線画の吉祥文様として表現
 * stroke の色・太さで主張の強さを調整できます。
 */
export function Zuiun({
  className = "w-64",
  stroke = "#D3D3DA",
  opacity = 0.35,
  flip = false,
}: {
  className?: string;
  stroke?: string;
  opacity?: number;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 320 110"
      className={className}
      style={{ opacity, transform: flip ? "scaleX(-1)" : undefined }}
      fill="none"
      stroke={stroke}
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
    >
      {/* 雲の輪郭（もこもことした山） */}
      <path d="M40 86 C22 86 18 66 34 60 C30 40 56 30 70 44 C74 22 104 14 118 32 C126 12 160 8 172 30 C184 14 214 18 216 40 C232 30 258 40 252 58 C270 58 280 74 268 84 Z" />
      {/* 内側の渦 */}
      <path d="M70 44 C80 50 82 62 72 66 C64 69 60 60 66 57" />
      <path d="M118 32 C130 38 132 52 121 56 C112 59 108 49 115 46" />
      <path d="M172 30 C184 38 184 52 173 55 C164 57 161 47 168 45" />
      <path d="M216 40 C226 47 224 60 214 61 C206 62 205 53 211 52" />
      {/* 尾を引く雲脚 */}
      <path d="M268 84 C286 84 300 76 304 64 C307 55 298 50 292 55 C288 59 292 65 297 62" />
      <path d="M40 86 L8 86" />
      <path d="M90 96 L236 96" opacity="0.6" />
    </svg>
  );
}
