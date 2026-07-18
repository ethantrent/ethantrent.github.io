import type { ReactNode } from "react";

type Props = {
  title: string;
  /** Anchor id for sticky TOC jump links. */
  id?: string;
  children: ReactNode;
};

/**
 * Case study section: consistent H2 scale, generous top whitespace, 1.75 line-height body.
 */
export function CaseStudySection({ title, id, children }: Props) {
  return (
    <section
      id={id}
      className="mt-14 scroll-mt-28 space-y-4 text-base leading-[1.75] text-muted md:mt-16"
    >
      <h2 className="font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}
