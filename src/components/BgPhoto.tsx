/**
 * 背景にうっすら敷く写真
 * ------------------------------------------------------------
 * ・写真はフリー素材（Unsplash ライセンス：商用利用可・クレジット不要）を、Unsplashの画像配信から読み込みます。
 * ・端末の画面幅に合わせた大きさの画像だけが読み込まれます（スマホでは小さい画像）。
 * ・上下（または指定方向）がふんわり消えるマスクをかけ、文字の読みやすさを優先しています。
 * ・写真を差し替えるときは、下の PHOTOS の id を変えてください。
 */

export const PHOTOS = {
  /** 夜の街（上空から） */
  nightCity: "photo-1611125161572-7dcd6b336a3f",
  /** 夜の高層ビル街 */
  nightTowers: "photo-1594621544535-1373ff8388b0",
  /** 夜の街並み（遠景） */
  nightView: "photo-1650385114503-ab8a04090e6a",
  /** 夕暮れから夜へ変わる街 */
  dusk: "photo-1707473323036-f89a88017cee",
} as const;

export type PhotoKey = keyof typeof PHOTOS;

// ※重ね方は、マスクをかけた外側の要素に指定する（内側だと背景と混ざらないため）
const BLEND = { screen: "mix-blend-screen", multiply: "mix-blend-multiply", normal: "" } as const;

const src = (id: string, w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=60`;

type Props = {
  photo: PhotoKey;
  /** 濃さ（0〜1） */
  opacity?: number;
  /** 写真を白黒にする（白背景のセクション向け） */
  mono?: boolean;
  /** フェードの向き：both=上下、bottom=下だけ、top=上だけ、radial=中央だけ残す */
  fade?: "both" | "bottom" | "top" | "radial";
  /** 写真のどこを見せるか（CSSの object-position） */
  position?: string;
  /** ファーストビューの写真は true（すぐ読み込む） */
  priority?: boolean;
  /** 重ね方：screen=暗い背景に光だけを重ねる（黒背景向け）、multiply=紙に刷ったように（白背景向け） */
  blend?: "screen" | "multiply" | "normal";
  /** スクロールでゆっくり動かす */
  parallax?: boolean;
  className?: string;
};

export default function BgPhoto({
  photo,
  opacity = 0.25,
  mono = false,
  fade = "both",
  position = "center",
  priority = false,
  parallax = true,
  blend = "normal",
  className = "",
}: Props) {
  const id = PHOTOS[photo];
  return (
    <div aria-hidden className={`bg-photo bg-photo--${fade} pointer-events-none absolute inset-0 overflow-hidden ${BLEND[blend]} ${className}`}>
      <div className="absolute inset-x-0 -inset-y-[8%]" data-parallax={parallax ? "0.06" : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src(id, 1400)}
          srcSet={[800, 1400, 2000].map((w) => `${src(id, w)} ${w}w`).join(", ")}
          sizes="100vw"
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`bg-photo__img h-full w-full object-cover ${mono ? "grayscale" : ""}`}
          style={{ objectPosition: position, "--o": opacity } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
