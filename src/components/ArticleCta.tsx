import Link from "next/link";
import type { Audience } from "@/lib/blog";
import LineFollow from "./LineFollow";
import { ButtonLink } from "./ui";

/** 記事の下に出す「次の一歩」（読者に合わせて内容を切り替える） */
export default function ArticleCta({ audience }: { audience: Audience }) {
  if (audience === "business") {
    return (
      <div className="card corners p-8 sm:p-10">
        <p className="eyebrow">FOR BUSINESS</p>
        <p className="mt-4 text-[1.15rem] font-medium leading-[1.7] tracking-[0.04em] text-ivory">採用の「届け方」から、一緒に考えませんか。</p>
        <p className="body-text mt-3">
          NEXT EMPERORは、求人の発信・集客を支援する採用マーケティングの会社です。サービスの内容は、資料（PDF）でもご覧いただけます。
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/document">資料をダウンロード</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            相談してみる
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card corners p-8 sm:p-10">
        <p className="eyebrow">NEXT STEP</p>
        <p className="mt-4 text-[1.15rem] font-medium leading-[1.7] tracking-[0.04em] text-ivory">あなたの経験が活きる仕事を、のぞいてみませんか。</p>
        <p className="body-text mt-3">
          まずは1分の
          <Link href="/shindan" className="text-gold underline underline-offset-4">
            適職診断
          </Link>
          で自分の強みを確かめるのもおすすめです。
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/recruit">求人情報を見る</ButtonLink>
          <ButtonLink href="/shindan" variant="outline">
            適職診断をしてみる
          </ButtonLink>
        </div>
      </div>
      <LineFollow place="article" />
    </div>
  );
}
