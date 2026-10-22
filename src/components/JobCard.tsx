import Link from "next/link";
import type { Job } from "@/data/jobs";
import { getJobCompany } from "@/lib/data";

export default function JobCard({ job }: { job: Job }) {
  const meta = [
    { k: "勤務地", v: job.location },
    { k: "雇用形態", v: job.employmentType },
    { k: "給与", v: job.salary },
  ].filter((m) => m.v);

  return (
    <article className="card corners group relative flex h-full flex-col p-7 transition-colors hover:border-gold/60 sm:p-8">
      <p className="text-xs tracking-[0.12em] text-gold">{getJobCompany(job)}</p>
      <h3 className="mt-3 font-serif text-xl tracking-[0.06em]">
        <Link href={`/recruit/${job.slug}`} className="after:absolute after:inset-0">
          {job.title}
        </Link>
      </h3>
      {meta.length > 0 && (
        <dl className="mt-6 space-y-2 text-sm">
          {meta.map((m) => (
            <div key={m.k} className="flex gap-4">
              <dt className="w-16 shrink-0 text-ivory-dim">{m.k}</dt>
              <dd className="text-ivory-muted">{m.v}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-auto pt-8 text-xs tracking-[0.18em] text-ivory/70 transition-colors group-hover:text-gold">
        詳しく見る <span aria-hidden>→</span>
      </p>
    </article>
  );
}
