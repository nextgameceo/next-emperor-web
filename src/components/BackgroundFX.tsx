/**
 * サイト全体の背景演出
 * チャコールの地に、ロゴの「金・銀（ラベンダー）・水色」の光がゆっくり漂います。
 * 上に細かな粒子（ノイズ）と四隅の陰影を重ねて、奥行きと質感を出しています。
 * 不要な場合は layout.tsx の <BackgroundFX /> を消すだけで単色に戻ります。
 */
export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="bg-orb bg-orb-gold" />
      <div className="bg-orb bg-orb-lavender" />
      <div className="bg-orb bg-orb-ice" />
      <div className="bg-orb bg-orb-gold-2" />
      <div className="bg-orb bg-orb-ice-2" />
      <div className="bg-vignette absolute inset-0" />
      <div className="bg-grain absolute inset-0" />
    </div>
  );
}
