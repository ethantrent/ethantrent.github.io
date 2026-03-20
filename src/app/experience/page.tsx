import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { experience } from "@/data/experience";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description: siteConfig.seoPages.experience,
  openGraph: { title: "Experience", description: siteConfig.seoPages.experience },
};

const ExperienceTimeline = dynamic(
  () => import("@/components/ExperienceTimeline").then((m) => ({ default: m.ExperienceTimeline })),
  {
    ssr: true,
    loading: () => (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center text-sm text-muted" aria-busy="true">
        Loading timeline…
      </div>
    ),
  },
);

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Experience</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-fg md:text-5xl">Where I&apos;ve built</h1>
        <p className="mt-4 text-pretty text-muted">{siteConfig.pageIntros.experience}</p>
      </header>
      <div className="mt-16">
        <ExperienceTimeline entries={experience} />
      </div>
    </div>
  );
}
