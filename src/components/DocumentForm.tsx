"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { SERVICE_GUIDE, validateDocument, type DocumentErrors, type DocumentInput } from "@/lib/document";

const initial: DocumentInput = { company: "", name: "", email: "", phone: "", agree: false };

type Status = "idle" | "sending" | "done" | "error";

/** サービス資料のダウンロードフォーム（送信後に資料のリンクを表示し、メールでも送る） */
export default function DocumentForm() {
  const [configured, setConfigured] = useState(true);
  const [values, setValues] = useState<DocumentInput>(initial);
  const [errors, setErrors] = useState<DocumentErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number>(0);
  const doneRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    fetch("/api/document", { method: "GET" })
      .then((r) => r.json())
      .then((d: { configured?: boolean }) => setConfigured(d.configured !== false))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
    if (status === "error") alertRef.current?.focus();
  }, [status]);

  const set = <K extends keyof DocumentInput>(key: K, v: DocumentInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateDocument(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById(`d-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        track("generate_lead", { form: "document" });
        setStatus("done");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(data.message ?? "送信に失敗しました。時間をおいて再度お試しください。");
      setStatus("error");
    } catch {
      setServerMessage("通信エラーが発生しました。時間をおいて再度お試しください。");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} className="card px-8 py-14 text-center outline-none sm:px-14" role="status">
        <p className="eyebrow">Thank You</p>
        <h2 className="heading-lg mt-6">資料をご用意しました。</h2>
        <p className="body-text mx-auto mt-6 max-w-lg">
          下のボタンから資料（PDF）をダウンロードいただけます。ご入力のメールアドレスにも、資料のリンクをお送りしました。
        </p>
        <a
          href={SERVICE_GUIDE.path}
          target="_blank"
          rel="noopener"
          onClick={() => track("file_download", { file_name: "service-guide" })}
          className="btn-pill group relative mt-10 inline-flex h-[3.6rem] items-center justify-between gap-8 overflow-hidden rounded-full pl-7 pr-2 text-[0.85rem] tracking-[0.16em]"
        >
          <span aria-hidden className="btn-pill-fill absolute inset-0 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
          <span className="btn-pill-label relative transition-colors duration-500">資料をダウンロード（PDF）</span>
          <span className="btn-orb relative grid h-11 w-11 place-items-center rounded-full text-black">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M8 3v8M4 8l4 4 4-4M3 14h10" />
            </svg>
          </span>
        </a>
        <p className="mt-10 text-sm text-ivory-muted">
          ご相談は{" "}
          <Link href="/contact" className="text-gold underline underline-offset-4">
            お問い合わせフォーム
          </Link>
          {" "}からも受け付けています。
        </p>
      </div>
    );
  }

  const fieldProps = (key: keyof DocumentInput) => ({
    id: `d-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `de-${key}` : undefined,
  });

  const Err = ({ k }: { k: keyof DocumentInput }) =>
    errors[k] ? (
      <p id={`de-${k}`} className="mt-2 text-sm text-danger">
        {errors[k]}
      </p>
    ) : null;

  const Label = ({ k, children, required }: { k: string; children: string; required?: boolean }) => (
    <label htmlFor={`d-${k}`} className="mb-2 flex items-center gap-3 text-sm tracking-[0.08em] text-ivory/90">
      {children}
      <span className={`text-[0.7rem] tracking-[0.1em] ${required ? "text-gold" : "text-ivory-dim"}`}>
        {required ? "必須" : "任意"}
      </span>
    </label>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8" aria-label="サービス資料ダウンロードフォーム">
      {!configured && (
        <div role="note" className="border border-danger/50 bg-danger/10 px-5 py-4 text-sm leading-relaxed text-ivory">
          【管理者向け】メール送信先が未設定のため、現在このフォームからは送信できません。環境変数
          RESEND_API_KEY（ResendのAPIキー）をCloudflareに設定してください。
        </div>
      )}

      {status === "error" && serverMessage && (
        <div ref={alertRef} tabIndex={-1} role="alert" className="border border-danger/50 bg-danger/10 px-5 py-4 text-sm leading-relaxed text-ivory outline-none">
          {serverMessage}
        </div>
      )}

      <div>
        <Label k="company" required>会社名</Label>
        <input {...fieldProps("company")} type="text" autoComplete="organization" className="field" value={values.company} onChange={(e) => set("company", e.target.value)} />
        <Err k="company" />
      </div>

      <div>
        <Label k="name" required>担当者名</Label>
        <input {...fieldProps("name")} type="text" autoComplete="name" className="field" value={values.name} onChange={(e) => set("name", e.target.value)} />
        <Err k="name" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <Label k="email" required>メールアドレス</Label>
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" className="field" value={values.email} onChange={(e) => set("email", e.target.value)} />
          <Err k="email" />
        </div>
        <div>
          <Label k="phone">電話番号</Label>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" className="field" value={values.phone} onChange={(e) => set("phone", e.target.value)} />
          <Err k="phone" />
        </div>
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="d-website">Website</label>
        <input id="d-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div>
        <label htmlFor="d-agree" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ivory/90">
          <input {...fieldProps("agree")} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#7FD6F2]" checked={values.agree} onChange={(e) => set("agree", e.target.checked)} />
          <span>
            <Link href="/privacy" target="_blank" className="text-gold underline underline-offset-4">
              プライバシーポリシー
            </Link>
            に記載の個人情報の取り扱いに同意します。
            <span className="ml-2 text-[0.7rem] tracking-[0.1em] text-gold">必須</span>
          </span>
        </label>
        <Err k="agree" />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-pill group relative inline-flex h-[3.6rem] w-full items-center justify-between gap-10 overflow-hidden rounded-full pl-8 pr-2 text-[0.85rem] tracking-[0.16em] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          <span aria-hidden className="btn-pill-fill absolute inset-0 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
          <span className="btn-pill-label relative transition-colors duration-500">{status === "sending" ? "送信中…" : "資料をダウンロードする"}</span>
          <span className="btn-orb relative grid h-11 w-11 place-items-center rounded-full text-black">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M8 3v8M4 8l4 4 4-4M3 14h10" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
