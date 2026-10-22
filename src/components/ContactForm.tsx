"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { inquiryTypes, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

const initial: ContactInput = {
  company: "",
  name: "",
  email: "",
  phone: "",
  type: "",
  message: "",
  agree: false,
};

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  // メール送信先が設定済みかを、サーバー（/api/contact）に確認する
  const [configured, setConfigured] = useState(true);
  const [values, setValues] = useState<ContactInput>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number>(0);
  const doneRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    fetch("/api/contact", { method: "GET" })
      .then((r) => r.json())
      .then((d: { configured?: boolean }) => setConfigured(d.configured !== false))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
    if (status === "error") alertRef.current?.focus();
  }, [status]);

  const set = <K extends keyof ContactInput>(key: K, v: ContactInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
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
      <div ref={doneRef} tabIndex={-1} className="card px-8 py-16 text-center outline-none sm:px-14" role="status">
        <p className="eyebrow">Thank You</p>
        <h2 className="heading-lg mt-6">お問い合わせを受け付けました。</h2>
        <p className="body-text mx-auto mt-6 max-w-lg">
          お問い合わせいただき、ありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <Link href="/" className="mt-10 inline-block text-sm tracking-[0.16em] text-gold hover:underline">
          トップページへ戻る →
        </Link>
      </div>
    );
  }

  const fieldProps = (key: keyof ContactInput) => ({
    id: `f-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `e-${key}` : undefined,
  });

  const Err = ({ k }: { k: keyof ContactInput }) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-2 text-sm text-[#E2A79A]">
        {errors[k]}
      </p>
    ) : null;

  const Label = ({ k, children, required }: { k: string; children: string; required?: boolean }) => (
    <label htmlFor={`f-${k}`} className="mb-2 flex items-center gap-3 text-sm tracking-[0.08em] text-ivory/90">
      {children}
      <span className={`text-[0.7rem] tracking-[0.1em] ${required ? "text-gold" : "text-ivory-dim"}`}>
        {required ? "必須" : "任意"}
      </span>
    </label>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8" aria-label="法人向けお問い合わせフォーム">
      {!configured && (
        <div role="note" className="border border-[#8A5A4E] bg-[#2A1C18] px-5 py-4 text-sm leading-relaxed text-[#E8C9BF]">
          【管理者向け】メール送信先が未設定のため、現在このフォームからは送信できません。環境変数
          RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL を設定してください。
        </div>
      )}

      {status === "error" && serverMessage && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="border border-[#8A5A4E] bg-[#2A1C18] px-5 py-4 text-sm leading-relaxed text-[#E8C9BF] outline-none"
        >
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

      <div>
        <Label k="type" required>お問い合わせ種別</Label>
        <select {...fieldProps("type")} className="field appearance-none" value={values.type} onChange={(e) => set("type", e.target.value)}>
          <option value="">選択してください</option>
          {inquiryTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <Err k="type" />
      </div>

      <div>
        <Label k="message" required>お問い合わせ内容</Label>
        <textarea {...fieldProps("message")} rows={7} className="field resize-y" value={values.message} onChange={(e) => set("message", e.target.value)} />
        <Err k="message" />
      </div>

      {/* スパム対策：人間には表示されない入力欄 */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div>
        <label htmlFor="f-agree" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ivory/90">
          <input
            {...fieldProps("agree")}
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[#7FD6F2]"
            checked={values.agree}
            onChange={(e) => set("agree", e.target.checked)}
          />
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
          className="inline-flex min-h-[3.25rem] w-full items-center justify-center bg-gold px-10 text-sm tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "送信中…" : "送信する"}
        </button>
      </div>
    </form>
  );
}
