"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { questions, results, typeOrder, type TypeKey } from "@/data/diagnosis";
import LineFollow from "./LineFollow";
import ShareButtons from "./ShareButtons";

/**
 * 適職診断（昼職タイプ診断）
 * ・回答はこの画面の中だけで集計し、どこにも送信・保存しません
 *   （アクセス解析には「診断を完了した」ことと結果のタイプ名だけを送ります）
 */
export default function Diagnosis({ shareUrl }: { shareUrl: string }) {
  const [step, setStep] = useState(-1); // -1: スタート前 / 0..n-1: 質問 / n: 結果
  const [answers, setAnswers] = useState<TypeKey[]>([]);
  const topRef = useRef<HTMLDivElement>(null);
  const total = questions.length;

  useEffect(() => {
    if (step < 0) return;
    const el = topRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    if (Math.abs(window.scrollY - y) > 40) window.scrollTo({ top: y, behavior: "smooth" });
  }, [step]);

  function start() {
    setAnswers([]);
    setStep(0);
    track("diagnosis_start");
  }

  function answer(t: TypeKey) {
    const next = [...answers.slice(0, step), t];
    setAnswers(next);
    if (step + 1 >= total) {
      const r = rank(next);
      track("diagnosis_complete", { result_type: r[0] });
    }
    setStep(step + 1);
  }

  if (step < 0) {
    return (
      <div className="card corners p-8 text-center sm:p-14">
        <p className="eyebrow justify-center">全{total}問・約1分</p>
        <h2 className="heading-lg mt-6">夜の経験が活きる、昼職のタイプは？</h2>
        <p className="body-text mx-auto mt-6 max-w-xl">
          直感で、いちばん近いものを選んでください。あなたの強みと、その強みが活きやすい仕事の例をお伝えします。
        </p>
        <button type="button" onClick={start} className="btn-pill group relative mt-10 inline-flex h-[3.6rem] items-center justify-between gap-8 overflow-hidden rounded-full pl-8 pr-2 text-[0.85rem] tracking-[0.16em]">
          <span aria-hidden className="btn-pill-fill absolute inset-0 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
          <span className="btn-pill-label relative transition-colors duration-500">診断をはじめる</span>
          <span className="btn-orb relative grid h-11 w-11 place-items-center rounded-full text-black">
            <Arrow />
          </span>
        </button>
        <p className="mt-8 text-xs leading-[1.9] text-ivory-dim">回答内容は送信・保存されません。</p>
      </div>
    );
  }

  if (step < total) {
    const q = questions[step];
    return (
      <div ref={topRef} tabIndex={-1} className="card corners p-7 outline-none sm:p-12">
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-sm tracking-[0.2em] text-gold">
            Q{step + 1} <span className="text-ivory-dim">/ {total}</span>
          </p>
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="text-xs tracking-[0.14em] text-ivory-dim hover:text-gold">
              ← ひとつ戻る
            </button>
          )}
        </div>
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-ivory/10" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step} aria-label="診断の進み具合">
          <div className="h-full bg-gradient-to-r from-gold to-ice transition-[width] duration-500" style={{ width: `${(step / total) * 100}%` }} />
        </div>
        <h2 className="mt-8 text-[1.2rem] font-medium leading-[1.7] tracking-[0.04em] text-ivory sm:text-[1.4rem]">{q.q}</h2>
        <ul className="mt-8 grid gap-3">
          {q.options.map((o) => {
            const selected = answers[step] === o.type;
            return (
              <li key={o.label}>
                <button
                  type="button"
                  onClick={() => answer(o.type)}
                  aria-pressed={selected}
                  className={`w-full rounded-xl border px-5 py-4 text-left text-[0.95rem] leading-[1.7] tracking-[0.03em] transition-colors sm:px-6 ${
                    selected ? "border-gold bg-gold/10 text-ivory" : "border-ivory/15 text-ivory/90 hover:border-gold hover:bg-gold/5"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const ranked = rank(answers);
  const main = results[ranked[0]];
  const sub = results[ranked[1]];

  return (
    <div ref={topRef} tabIndex={-1} className="space-y-10 outline-none">
      <div className="card corners p-7 sm:p-12">
        <p className="eyebrow">診断結果</p>
        <p className="mt-6 font-display text-sm tracking-[0.3em] text-ice">{main.en}</p>
        <h2 className="mt-2 text-[1.8rem] font-medium leading-[1.4] tracking-[0.04em] text-ivory sm:text-[2.4rem]">
          あなたは<span className="metal-gold">「{main.name}」</span>
        </h2>
        <p className="mt-3 text-[1.1rem] tracking-[0.06em] text-gold">{main.catch}</p>
        <p className="body-text mt-6">{main.body}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm tracking-[0.14em] text-gold">夜の経験が活きるポイント</h3>
            <ul className="body-text mt-4 space-y-2">
              {main.strengths.map((s) => (
                <li key={s} className="flex gap-3">
                  <span aria-hidden className="mt-[0.75em] h-[5px] w-[5px] shrink-0 rotate-45 bg-gold" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm tracking-[0.14em] text-gold">強みが活きやすい仕事の例</h3>
            <ul className="body-text mt-4 space-y-2">
              {main.jobs.map((s) => (
                <li key={s} className="flex gap-3">
                  <span aria-hidden className="mt-[0.75em] h-[5px] w-[5px] shrink-0 rotate-45 bg-ice" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-l-2 border-gold bg-charcoal/70 px-6 py-5">
          <p className="text-sm tracking-[0.12em] text-gold">今日からできる一歩</p>
          <p className="body-text mt-2">{main.step}</p>
        </div>

        <p className="mt-8 text-sm leading-[1.9] text-ivory-muted">
          あなたには<span className="text-ivory">「{sub.name}」</span>（{sub.catch}）の一面もあります。ひとつのタイプにしばられず、気になる仕事は気軽にのぞいてみてください。
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/recruit"
            onClick={() => track("diagnosis_cta_click", { target: "recruit", result_type: main.key })}
            className="btn-pill group relative inline-flex h-[3.6rem] items-center justify-between gap-8 overflow-hidden rounded-full pl-7 pr-2 text-[0.85rem] tracking-[0.16em]"
          >
            <span aria-hidden className="btn-pill-fill absolute inset-0 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
            <span className="btn-pill-label relative transition-colors duration-500">掲載中の求人を見る</span>
            <span className="btn-orb relative grid h-11 w-11 place-items-center rounded-full text-black">
              <Arrow />
            </span>
          </Link>
          <button type="button" onClick={start} className="inline-flex h-[3.6rem] items-center gap-3 text-[0.85rem] tracking-[0.16em] text-ivory/80 hover:text-gold">
            もう一度診断する
          </button>
        </div>

        <p className="mt-8 text-xs leading-[1.9] text-ivory-dim">
          ※ この診断は、ご自身の強みを考えるきっかけとしての目安です。特定の求人や企業をおすすめ・紹介するものではありません。応募の際は、各求人の仕事内容や条件をご確認ください。
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ivory-muted">
          職務経歴書の書き方は、
          <Link href="/news/column-20261028-resume" className="text-gold underline underline-offset-4">
            こちらのコラム
          </Link>
          でも紹介しています。
        </p>
      </div>

      <LineFollow place="diagnosis_result" />

      <ShareButtons url={shareUrl} title="夜の経験が活きる、昼職のタイプは？｜NEXT EMPEROR 適職診断" label="この診断をシェアする" contentType="diagnosis" />
    </div>
  );
}

function rank(answers: TypeKey[]): TypeKey[] {
  const score = Object.fromEntries(typeOrder.map((k) => [k, 0])) as Record<TypeKey, number>;
  answers.forEach((a) => (score[a] += 1));
  return [...typeOrder].sort((a, b) => score[b] - score[a] || typeOrder.indexOf(a) - typeOrder.indexOf(b));
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
