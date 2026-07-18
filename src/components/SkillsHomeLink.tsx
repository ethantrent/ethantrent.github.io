import Link from "next/link";

/**
 * Home skills pointer — full matrix lives on /skills/; placed before the final CTA so it’s discoverable.
 */
export function SkillsHomeLink() {
  return (
    <section className="border-t border-hairline py-12" aria-labelledby="skills-home-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[13px] font-medium tracking-[0.03em] text-muted">Skills</p>
          <h2
            id="skills-home-heading"
            className="font-display mt-1 text-xl font-semibold tracking-tight text-fg sm:text-2xl"
          >
            How I group my craft
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Product, AI, engineering, and cloud — grouped by how I use them day to day.
          </p>
        </div>
        <Link
          href="/skills/"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition hover:underline"
        >
          Full skills matrix
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
