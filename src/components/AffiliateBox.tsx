"use client";

import type { Affiliate } from "@/data/affiliates";
import { track } from "@/lib/analytics";

/**
 * 求職者向けコラムの最後に出す「PR（広告）」枠
 * ・ステルスマーケティング規制（景品表示法）に沿って、広告であることを見出しの横と注記で明示します。
 * ・リンクには rel="sponsored" を付けます（検索エンジンに広告リンクだと伝えるため）。
 */
export default function AffiliateBox({ items, place = "article" }: { items: Affiliate[]; place?: string }) {
  if (items.length === 0) return null;
  return (
    <aside aria-labelledby="pr-title" className="card corners p-8 sm:p-10">
      <div className="flex items-center gap-3">
        <span className="border border-ivory/40 px-2 py-0.5 text-[0.7rem] font-medium tracking-[0.14em] text-ivory">PR</span>
        <p id="pr-title" className="eyebrow">CAREER SUPPORT</p>
      </div>
      <p className="mt-4 text-[1.05rem] font-medium leading-[1.7] tracking-[0.04em] text-ivory">
        昼の仕事探しを、プロに相談するという選択肢
      </p>
      <ul className="mt-6 space-y-5">
        {items.map((a) => (
          <li key={a.id} className="border-t border-ivory/10 pt-5">
            <p className="font-medium tracking-[0.04em] text-ivory">{a.name}</p>
            <p className="mt-2 text-sm leading-[1.9] text-ivory-muted">{a.description}</p>
            <a
              href={a.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => track("affiliate_click", { id: a.id, place })}
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full border border-gold px-7 text-sm tracking-[0.1em] text-gold transition-colors hover:bg-gold/10"
            >
              {a.cta}
              <span className="sr-only">（広告・外部サイトが新しいタブで開きます）</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs leading-[1.9] text-ivory-dim">
        この枠は広告です。リンク先で登録があると、NEXT EMPERORが広告主から報酬を受け取ることがあります。紹介しているのは、夜の仕事からの転職に合うと当社が判断したサービスです。
      </p>
    </aside>
  );
}
