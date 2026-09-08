import type { Metadata } from "next";
import Link from "next/link";
import { experience } from "@/data/experience";
import { siteConfig } from "@/data/site";
export const metadata: Metadata = {
  openGraph: { url: "/experience/", images: ["/og.png"] },
  title: "Experience",
  description: siteConfig.seoPages.experience,
  alternates: { canonical: "/experience/" },
};
export default function ExperiencePage() {
  return (
    <div className="shell pb-14">
      <header className="page-head">
        <h1 className="editorial-title mt-5">Experience</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Employment and fellowship history through September 2026. Project
          links cover the work in more detail.
        </p>
      </header>
      {experience.map((entry) => (
        <section
          key={entry.id}
          className="grid gap-5 border-t border-hairline py-8 md:grid-cols-[1fr_2fr]"
        >
          <p className="text-sm text-muted">{entry.dateRange}</p>
          <div>
            <h2 className="font-display text-3xl">{entry.company}</h2>
            <p className="mt-2 text-sm font-medium">{entry.role}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {entry.context}
            </p>
            {entry.featuredCaseStudy ? (
              <Link
                href={entry.featuredCaseStudy.href}
                className="text-link mt-3"
              >
                {entry.featuredCaseStudy.label}
              </Link>
            ) : null}
          </div>
        </section>
      ))}
      <div className="mt-8 flex flex-wrap gap-x-7 border-t border-hairline pt-7">
        <Link href="/about/" className="text-link">
          About me
        </Link>
        <Link href={siteConfig.resumePath} download className="text-link">
          {siteConfig.resumeLabel}
        </Link>
      </div>
    </div>
  );
}
