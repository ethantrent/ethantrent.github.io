import { eyebrow } from "@/lib/ui";

export type RecruiterSkim = {
  problem: string;
  decision: string;
  outcome: string;
  role: string;
  /** Jump links into TOC section ids. */
  jumps?: readonly { id: string; label: string }[];
};

type Props = {
  skim: RecruiterSkim;
};

/**
 * 60-second takeaway for recruiters — problem / decision / outcome / role + jump links.
 */
export function RecruiterSkimBanner({ skim }: Props) {
  return (
    <aside
      className="mt-8 rounded-xl border border-hairline bg-surface p-5 sm:p-6"
      aria-label="60-second takeaway"
    >
      <p className={eyebrow}>60-second takeaway</p>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-[13px] font-medium text-fg">Problem</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{skim.problem}</dd>
        </div>
        <div>
          <dt className="text-[13px] font-medium text-fg">Decision</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{skim.decision}</dd>
        </div>
        <div>
          <dt className="text-[13px] font-medium text-fg">Outcome</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{skim.outcome}</dd>
        </div>
        <div>
          <dt className="text-[13px] font-medium text-fg">My role</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{skim.role}</dd>
        </div>
      </dl>
      {skim.jumps && skim.jumps.length > 0 ? (
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Jump into case study">
          {skim.jumps.map((jump) => (
            <a
              key={jump.id}
              href={`#${jump.id}`}
              className="inline-flex min-h-9 cursor-pointer items-center rounded-lg border border-hairline bg-surface-2 px-3 text-[13px] font-medium text-fg-muted transition duration-200 hover:border-hairline-strong hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {jump.label}
            </a>
          ))}
        </nav>
      ) : null}
    </aside>
  );
}
