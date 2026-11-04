"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { recordApplyClick } from "@/lib/applyCount";

/**
 * LINEで応募フォーム
 * ------------------------------------------------------------
 * 入力内容をメッセージ文にして、応募窓口のLINE公式アカウントのトーク画面を開きます。
 * 送信はご本人がLINE上で行います。入力内容が NEXT EMPEROR のサーバーに送られることはありません。
 */
type Props = {
  lineId: string; // 例："@030cihhe"
  jobTitle: string;
  jobSlug: string; // 計測用（求人ごとの集計に使用）
  selfHiring?: boolean; // NEXT EMPEROR自身の求人（文言を自社向けに切り替える）
  friendUrl?: string; // 友だち追加用のURL（任意）
};

type Values = {
  name: string;
  age: string;
  area: string;
  career: string;
  d1: string;
  d2: string;
  d3: string;
};

const initial: Values = { name: "", age: "", area: "", career: "", d1: "", d2: "", d3: "" };

const WEEK = ["日", "月", "火", "水", "木", "金", "土"];
/** "2026-11-10T14:00" → "11月10日（月）14:00" */
const fmtDate = (s: string) => {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return s;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return `${Number(m[2])}月${Number(m[3])}日（${WEEK[d.getDay()]}）${m[4]}:${m[5]}`;
};

export default function LineApplyForm({ lineId, jobTitle, jobSlug, friendUrl, selfHiring = false }: Props) {
  const [v, setV] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [opened, setOpened] = useState(false);

  const set = (k: keyof Values, value: string) => {
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!v.name.trim()) errs.name = "氏名を入力してください。";
    if (!/^\d{2}$/.test(v.age.trim())) errs.age = "年齢を数字で入力してください（例：25）。";
    if (!v.area.trim()) errs.area = "お住まいのエリアを入力してください。";
    if (!v.career.trim()) errs.career = "現在の仕事を入力してください。";
    const now = Date.now();
    (["d1", "d2", "d3"] as const).forEach((k, i) => {
      if (!v[k]) errs[k] = `面接の第${i + 1}希望の日時を選んでください。`;
      else if (new Date(v[k]).getTime() < now) errs[k] = "これから先の日時を選んでください。";
    });
    if (!errs.d2 && v.d2 && v.d2 === v.d1) errs.d2 = "第1希望とは別の日時を選んでください。";
    if (!errs.d3 && v.d3 && (v.d3 === v.d1 || v.d3 === v.d2)) errs.d3 = "第1・第2希望とは別の日時を選んでください。";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById(`la-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    const line = (label: string, value: string) => `${label}：${value.trim() || "—"}`;
    const text = [
      selfHiring ? "【採用応募】" : "【NEXT EMPEROR経由】",
      `「${jobTitle}」に応募します。`,
      "",
      line("氏名", v.name),
      line("年齢", `${v.age.trim()}歳`),
      line("お住まいのエリア", v.area),
      line("現在の仕事", v.career),
      "",
      "【面接可能日時】",
      line("第1希望", fmtDate(v.d1)),
      line("第2希望", fmtDate(v.d2)),
      line("第3希望", fmtDate(v.d3)),
    ].join("\n");
    const url = `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(text)}`;
    setOpened(true);
    // コンバージョン計測（求人名のみ。入力内容は送らない）
    track("line_apply_click", { job_slug: jobSlug, job_title: jobTitle });
    recordApplyClick(jobSlug);
    window.setTimeout(() => {
      window.location.href = url;
    }, 250);
  }

  const Label = ({ k, children, required }: { k: keyof Values; children: string; required?: boolean }) => (
    <label htmlFor={`la-${k}`} className="mb-2 flex items-center gap-3 text-sm tracking-[0.08em] text-ivory/90">
      {children}
      <span className={`text-[0.7rem] tracking-[0.1em] ${required ? "text-gold" : "text-ivory-dim"}`}>
        {required ? "必須" : "任意"}
      </span>
    </label>
  );

  const Err = ({ k }: { k: keyof Values }) =>
    errors[k] ? (
      <p id={`la-e-${k}`} className="mt-2 text-sm text-danger">
        {errors[k]}
      </p>
    ) : null;

  const aria = (k: keyof Values) => ({
    id: `la-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `la-e-${k}` : undefined,
  });

  return (
    <div className="card corners p-7 sm:p-10">
      <p className="font-display text-xs tracking-[0.28em] text-ice">APPLY VIA LINE</p>
      <h2 className="mt-3 text-xl tracking-[0.06em] text-ivory sm:text-2xl">LINEで応募する</h2>
      <p className="mt-4 text-sm leading-[2] text-ivory-muted">
        下の項目を入力して「LINEを開く」を押すと、入力した内容がメッセージに入った状態で、{selfHiring ? "NEXT EMPEROR公式" : "応募窓口（提携する人材紹介会社）"}のLINEが開きます。
        内容を確認して、LINEで送信してください。
      </p>

      <form noValidate onSubmit={onSubmit} className="mt-8 space-y-7" aria-label={`${jobTitle}へのLINE応募`}>
        <div className="grid gap-7 sm:grid-cols-[1fr_140px]">
          <div>
            <Label k="name" required>氏名</Label>
            <input {...aria("name")} type="text" autoComplete="name" placeholder="例：山田 花子" className="field" value={v.name} onChange={(e) => set("name", e.target.value)} />
            <Err k="name" />
          </div>
          <div>
            <Label k="age" required>年齢</Label>
            <input {...aria("age")} type="text" inputMode="numeric" maxLength={2} placeholder="25" className="field" value={v.age} onChange={(e) => set("age", e.target.value.replace(/[^\d]/g, ""))} />
            <Err k="age" />
          </div>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          <div>
            <Label k="area" required>お住まいのエリア</Label>
            <input {...aria("area")} type="text" placeholder="例：名古屋市中区" className="field" value={v.area} onChange={(e) => set("area", e.target.value)} />
            <Err k="area" />
          </div>
          <div>
            <Label k="career" required>現在の仕事</Label>
            <input {...aria("career")} type="text" placeholder="例：ラウンジ勤務" className="field" value={v.career} onChange={(e) => set("career", e.target.value)} />
            <Err k="career" />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm tracking-[0.08em] text-ivory/90">
            面接可能日時 <span className="ml-2 text-[0.7rem] tracking-[0.1em] text-gold">必須・3候補</span>
          </legend>
          <p className="mt-2 text-xs leading-relaxed text-ivory-dim">ご都合のよい日時を3つ選んでください。調整のうえ、{selfHiring ? "NEXT EMPEROR" : "応募窓口"}からご連絡します。</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            {(["d1", "d2", "d3"] as const).map((k, i) => (
              <div key={k}>
                <label htmlFor={`la-${k}`} className="mb-2 block text-xs tracking-[0.12em] text-gold">
                  第{i + 1}希望
                </label>
                <input
                  {...aria(k)}
                  type="datetime-local"
                  step={1800}
                  className="field min-h-[3.25rem]"
                  value={v[k]}
                  onChange={(e) => set(k, e.target.value)}
                />
                <Err k={k} />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="space-y-4 pt-2">
          <button
            type="submit"
            data-magnetic className="inline-flex h-[3.6rem] w-full items-center justify-center gap-3 rounded-full bg-[#06C755] px-10 text-sm font-semibold tracking-[0.16em] text-white shadow-[0_14px_30px_-14px_rgba(6,199,85,0.7)] transition-[opacity,transform] duration-500 hover:opacity-90 sm:w-auto"
          >
            LINEを開く <span aria-hidden>→</span>
          </button>
          <p className="text-xs leading-relaxed text-ivory-dim">
            {selfHiring
              ? "※ 入力内容は、LINE上でご本人が送信した時点で、NEXT EMPERORに届きます。それまでは、どこにも送信・保存されません。"
              : "※ 入力内容はNEXT EMPERORには送信・保存されません。LINE上でご本人が送信した時点で、応募窓口に届きます。"}
          </p>
          {opened && (
            <p role="status" className="border border-ice/40 px-4 py-3 text-sm leading-relaxed text-ice">
              LINEが開かない場合は、スマートフォンでこのページを開いてお試しください。
              {friendUrl && (
                <>
                  {" "}
                  または
                  <a href={friendUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    こちらから友だち追加
                  </a>
                  し、「NEXT EMPERORの求人を見た」とメッセージを送ってください。
                </>
              )}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
