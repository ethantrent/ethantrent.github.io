import Link from "next/link";
import type { ReactNode } from "react";
import { CaseStudyToc, type TocItem } from "@/components/case-study/CaseStudyToc";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { projectTagChipClassName } from "@/lib/projectChips";

export type CaseStudySummaryItem = {
  term: string;
  detail: string;
};

type Props = {
  title: string;
  /** Role · timeline · org line under the H1. */
  subtitle: string;
  /** 4-box summary grid (Scale / What shipped / Governance / Impact style). */
  summary: CaseStudySummaryItem[];
  /** Stack & tools chips — tech details live here, not on listing cards. */
  tags?: readonly string[];
  /** Sticky desktop TOC + reading progress when provided. */
  toc?: readonly TocItem[];
  children: ReactNode;
  /** Footer actions (links) rendered after the article body. */
  footer?: ReactNode;
};

/**
 * Shared case study shell: breadcrumb, H1, context line, summary card grid, body.
 */
export function CaseStudyLayout({
  title,
  subtitle,
  summary,
  tags,
  toc,
  children,
  footer,
}: Props) {
  const hasToc = Boolean(toc?.length);

  return (
    <>
      {hasToc ? <ReadingProgress /> : null}
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
        <div className={hasToc ? "lg:flex lg:items-start lg:gap-12" : undefined}>
          {hasToc && toc ? <CaseStudyToc items={toc} /> : null}

          <div className={hasToc ? "min-w-0 flex-1 lg:max-w-3xl" : "mx-auto max-w-3xl"}>
            <p className="text-[13px] font-medium tracking-[0.03em] text-muted">
              <Link href="/projects/" className="text-accent hover:underline">
                Case Studies
              </Link>
              <span className="mx-2 text-muted/50" aria-hidden>
                /
              </span>
              Case study
            </p>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight text-fg md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-muted">{subtitle}</p>

            <dl className="mt-10 grid gap-4 rounded-xl border border-hairline bg-surface p-6 text-sm sm:grid-cols-2">
              {summary.map((item) => (
                <div key={item.term}>
                  <dt className="font-medium text-fg">{item.term}</dt>
                  <dd className="mt-1 text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>

            {tags && tags.length > 0 ? (
              <div className="mt-6">
                <p className="text-[13px] font-medium tracking-[0.03em] text-muted">Stack & tools</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag, ti) => (
                    <span key={tag} className={projectTagChipClassName(ti)}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <article>{children}</article>

            {footer ? <div className="mt-14 flex flex-wrap gap-4">{footer}</div> : null}
          </div>
        </div>
      </div>
    </>
  );
}
