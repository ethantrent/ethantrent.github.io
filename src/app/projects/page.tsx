import type { Metadata } from "next";
import Link from "next/link";
import { earlierProjects } from "@/data/projects";
import { ProjectFeature } from "@/components/ProjectFeature";
import { AssistantFeature } from "@/components/AssistantFeature";
import { siteConfig } from "@/data/site";
export const metadata: Metadata = {
  openGraph: { url: "/projects/", images: ["/og.png"] },
  title: "Work",
  description: siteConfig.seoPages.projects,
  alternates: { canonical: "/projects/" },
};
export default function ProjectsPage() {
  return (
    <div className="shell pb-16">
      <header className="page-head">
        <h1 className="editorial-title">Work</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          {siteConfig.pageIntros.projects}
        </p>
        <Link href="/skills/" className="text-link mt-4">
          Capabilities with examples
        </Link>
      </header>
      <AssistantFeature heading="h2" />
      <section className="mt-8" aria-labelledby="earlier-work-heading">
        <h2 id="earlier-work-heading" className="mb-5 text-2xl font-medium">Earlier work</h2>
        {earlierProjects.map((project) => (
          <ProjectFeature heading="h3" key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
