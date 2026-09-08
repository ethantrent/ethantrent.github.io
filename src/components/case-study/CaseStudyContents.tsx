import type { CaseSection } from "@/data/case-studies";

export function CaseStudyContents({ sections }: { sections: CaseSection[] }) {
  const links = (
    <ol>
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <div className="self-start lg:sticky lg:top-28">
      <details className="border-b border-hairline pb-3 lg:hidden">
        <summary className="min-h-11 cursor-pointer py-3 text-sm text-accent">
          Jump to section
        </summary>
        <nav aria-label="In this case study">{links}</nav>
      </details>
      <nav aria-label="In this case study" className="hidden lg:block">
        <p className="eyebrow mb-3">Contents</p>
        {links}
      </nav>
    </div>
  );
}
