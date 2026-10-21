import Image from "next/image";
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
  sizes = "(max-width: 640px) 220px, 320px",
}: Props) {
  const { logo } = siteConfig;

  if (logo.src) {
    return (
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
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
