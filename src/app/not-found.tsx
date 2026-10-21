import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center pt-20 text-center">
      <p className="font-display text-7xl text-gold/80">404</p>
      <h1 className="heading-lg mt-6">ページが見つかりません</h1>
      <p className="body-text mt-4">お探しのページは移動または削除された可能性があります。</p>
      <div className="mt-10">
        <ButtonLink href="/">トップページへ</ButtonLink>
      </div>
    </Container>
  );
}
