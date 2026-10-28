import { siteConfig } from "@/config/site";

type Props = { className?: string; priority?: boolean; sizes?: string };

/**
 * 公式ロゴ
 * siteConfig.logo.src の画像を、形状・文字を加工せずに表示します。
 * softenGlow が true の場合のみ、彩度をわずかに落として発光を控えめにします。
 */
export default function Logo({
  className = "h-10 w-auto",
  priority = false,
  sizes = "200px",
}: Props) {
  const { logo } = siteConfig;

  if (logo.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.srcSet ? "/images/logo-arch-640.webp" : logo.src}
        srcSet={logo.srcSet || undefined}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
        style={logo.softenGlow ? { filter: "saturate(0.82) brightness(0.96)" } : undefined}
        sizes={sizes}
      />
    );
  }

  return (
    <span className="inline-flex items-center font-display text-lg font-medium tracking-luxe text-ivory sm:text-xl">
      NEXT EMPEROR
    </span>
  );
}
