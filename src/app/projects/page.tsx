import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { publicCode } from "@/data/public-code";
import { ProjectFeature } from "@/components/ProjectFeature";
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
      <section aria-labelledby="case-studies-heading">
        <h2 id="case-studies-heading" className="mb-3 text-2xl font-medium">Case studies</h2>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">
          These project repositories aren’t public. The case studies explain my
          contributions, the available artifacts, and what the results can tell us.
        </p>
        {projects.map((project) => (
          <ProjectFeature heading="h3" key={project.id} project={project} />
        ))}
      </section>
      <section id="public-code" aria-labelledby="public-code-heading" className="border-t border-hairline pt-9">
        <h2 id="public-code-heading" className="text-2xl font-medium">Explore the code</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Public repositories with code, setup notes, and project context.
        </p>
        <div className="mt-6 grid gap-x-10 md:grid-cols-2">
          {publicCode.map((project) => (
            <div key={project.id} className="border-t border-hairline py-5">
              <h3 className="text-xl font-medium"><a href={project.href} className="text-link">{project.name}</a></h3>
              <p className="mt-2 text-base leading-relaxed text-fg-muted">{project.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.limitations}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
