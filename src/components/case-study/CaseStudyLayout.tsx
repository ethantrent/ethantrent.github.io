import Link from "next/link";
import type { Project } from "@/types";
import type { CaseSection } from "@/data/case-studies";
import { CaseStudyArtifact } from "./CaseStudyArtifact";
import { CaseStudyContents } from "./CaseStudyContents";
import { roadmapProjects } from "@/data/roadmap-projects";

export function CaseStudyLayout({
  project,
  sections,
}: {
  project: Project;
  sections: CaseSection[];
}) {
  return (
    <div className="shell pb-14">
      <header className="page-head border-b border-hairline">
        <Link href="/projects/" className="text-link">
          All work
        </Link>
        <p className="eyebrow mt-6">
          {project.category} · {project.year}
        </p>
        <h1 className="editorial-title mt-4">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-fg-muted">
          {project.problem}
        </p>
        <dl className="mt-9 grid gap-x-10 gap-y-6 text-sm md:grid-cols-2">
          <div>
            <dt className="eyebrow">My role</dt>
            <dd className="mt-2 leading-relaxed">{project.role}</dd>
          </div>
          <div>
            <dt className="eyebrow">Project status</dt>
            <dd className="mt-2 leading-relaxed">{project.status}</dd>
          </div>
          <div>
            <dt className="eyebrow">Central decision</dt>
            <dd className="mt-2 leading-relaxed text-fg-muted">
              {project.decision}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Result</dt>
            <dd className="mt-2 leading-relaxed text-fg-muted">
              {project.outcome}
            </dd>
          </div>
        </dl>
      </header>
      <div className="relative grid gap-10 pt-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <CaseStudyContents sections={sections} />
        <article className="min-w-0">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="relative mb-9 border-b border-hairline pb-9 last:border-b-0"
              aria-labelledby={`${s.id}-title`}
            >
              {s.aliases.map((alias) => (
                <span
                  key={alias}
                  id={alias}
                  className="absolute top-0"
                  aria-hidden="true"
                />
              ))}
              <h2
                id={`${s.id}-title`}
                className="font-display mb-5 text-2xl md:text-[28px]"
              >
                {s.title}
              </h2>
              <div className="prose-copy">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {s.groups?.map((group) => (
                <div key={group.title} className="mt-7">
                  <h3 className="mb-4 text-xl font-medium">{group.title}</h3>
                  <div className="prose-copy">
                    {group.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              ))}
              {s.materialsNote ? (
                <p className="mt-5 max-w-[68ch] text-sm leading-relaxed text-muted" data-materials-note>
                  {s.materialsNote}
                </p>
              ) : null}
              {s.artifacts?.map((a) => (
                <CaseStudyArtifact key={a.src} artifact={a} />
              ))}
              {s.id === "results" && project.externalHref ? (
                <a href={project.externalHref} className="text-link mt-5">
                  {project.externalCtaLabel}
                </a>
              ) : null}
            </section>
          ))}
          {project.contentStatus === "assumed-complete" ? (
            <nav aria-label="Other perspectives on this project" className="mb-8">
              <h2 className="mb-3 text-xl font-medium">Other perspectives on this project</h2>
              {roadmapProjects.filter((p) => p.id !== project.id).map((p) => (
                <Link key={p.id} href={p.href} className="text-link mr-6">{p.name}</Link>
              ))}
            </nav>
          ) : null}
          <footer className="flex flex-wrap gap-x-8 border-t border-hairline pt-7">
            <Link href="/projects/" className="text-link">
              All work
            </Link>
            <Link href="/contact/" className="text-link">
              Contact me
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}
