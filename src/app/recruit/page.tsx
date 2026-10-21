import type { Metadata } from "next";
import JobCard from "@/components/JobCard";
import RecruitNotice from "@/components/RecruitNotice";
import { Container, PageHero, Section } from "@/components/ui";
import { getPublishedJobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "求人情報",
  description:
    "夜職から昼職へ。NEXT EMPERORの提携企業の求人情報を掲載しています。これまでの接客力・営業力を活かせる新しい仕事を探せます。",
  alternates: { canonical: "/recruit" },
};

export default function RecruitPage() {
  const jobs = getPublishedJobs();

  return (
    <>
      <PageHero
        eyebrow="Recruit"
        title="求人情報"
        lead="今の経験を、もっと大きな未来につなげよう。新しい一歩を踏み出したい方へ、提携企業の求人情報をお届けします。"
      />
      <Section>
        <Container>
          <RecruitNotice />
          {jobs.length > 0 ? (
            <>
              <p className="mt-12 text-sm tracking-[0.1em] text-ivory-dim">
                公開中の求人 <span className="text-gold">{jobs.length}</span> 件
              </p>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <li key={job.slug}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="card mt-12 px-8 py-16 text-center">
              <p className="font-serif text-xl tracking-[0.06em]">現在、公開中の求人はありません。</p>
              <p className="body-text mt-4">求人情報は準備が整い次第、順次掲載いたします。</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
