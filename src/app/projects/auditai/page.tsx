import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AuditAI case study",
  description:
    "Multi-agent AI program for a global nonprofit audit organization — discovery, governance, orchestration, and measured automation.",
  openGraph: {
    title: "AuditAI — case study",
    description:
      "Six internal agents, compliance alignment, and ~30% / ~50% impact on scoped audit workflows.",
  },
};

export default function AuditAiCaseStudyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 md:py-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        <Link href="/projects/" className="hover:underline">
          Projects
        </Link>
        <span className="mx-2 text-fg/30" aria-hidden>
          /
        </span>
        Case study
      </p>
      <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-fg md:text-5xl">
        AuditAI — multi-agent automation at nonprofit scale
      </h1>
      <p className="mt-4 text-lg text-muted">
        IT Project Manager (Jan–May 2026) · Information and Communication Services — global nonprofit · Riverton, UT
      </p>

      <dl className="mt-10 grid gap-4 rounded-2xl border border-fg/10 bg-surface/50 p-6 text-sm backdrop-blur-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-accent">Scale context</dt>
          <dd className="mt-1 text-muted">50,000+ volunteer auditors · 31,000+ units on modernized AWS platform</dd>
        </div>
        <div>
          <dt className="font-semibold text-accent">What shipped</dt>
          <dd className="mt-1 text-muted">Six operational internal AI agents (agentic workflows + human review gates)</dd>
        </div>
        <div>
          <dt className="font-semibold text-accent">Governance</dt>
          <dd className="mt-1 text-muted">Aligned Auditing, engineering & General Counsel on compliant releases</dd>
        </div>
        <div>
          <dt className="font-semibold text-accent">Measured impact (scoped)</dt>
          <dd className="mt-1 text-muted">~30% automation of common processes · ~50% manual labor reduction on targeted tasks</dd>
        </div>
      </dl>

      <section className="mt-14 space-y-4 text-base leading-relaxed text-muted">
        <h2 className="font-display text-2xl font-bold text-fg">Problem</h2>
        <p>
          Audit teams were juggling legacy modernization on AWS with rising demand for intelligent assistance. Manual
          steps in repeatable workflows consumed capacity that should have gone to judgment-heavy review — and any AI
          assist had to survive scrutiny from Auditing and legal stakeholders, not just engineering demos.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-muted">
        <h2 className="font-display text-2xl font-bold text-fg">Discovery</h2>
        <p>
          I partnered with audit leadership to map high-volume paths where probabilistic assistance could add value
          without bypassing policy. We prioritized workflows with clear inputs, verifiable outputs, and explicit
          escalation when confidence or policy fit was unclear — the same pattern I later applied to campus RAG:
          <span className="text-fg/90"> define “good,” then design fallbacks.</span>
        </p>
      </section>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-muted">
        <h2 className="font-display text-2xl font-bold text-fg">What we built</h2>
        <p>
          <strong className="text-fg">Six internal agents</strong> covered specialized steps — intake, classification,
          drafting support, routing, and similar — orchestrated so outputs fed human reviewers with context instead of
          replacing them. Tool use and handoffs were designed explicitly (multi-agent orchestration), not as a single
          monolithic prompt.
        </p>
        <p>
          <strong className="text-fg">Trust &amp; compliance:</strong> We coordinated with General Counsel on release
          criteria, logging, and parallel modernization tracks so AI capability shipped on the same 2-week cadence as
          other production work — not as a side experiment.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-muted">
        <h2 className="font-display text-2xl font-bold text-fg">Outcomes</h2>
        <p>
          On the workflows we measured with audit leadership, we saw roughly <strong className="text-fg">30%</strong>{" "}
          automation of common processes and <strong className="text-fg">~50%</strong> reduction in manual labor time.
          Those metrics are only meaningful because the denominators were agreed with domain owners — something I
          highlight in interviews when discussing responsible AI PM work.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-muted">
        <h2 className="font-display text-2xl font-bold text-fg">What I’d do next</h2>
        <p>
          Expand evaluation harnesses (golden sets per agent), tighten observability for regression after model or
          policy changes, and publish clearer operator playbooks for escalation — the product surface around AI, not
          just the models.
        </p>
      </section>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link
          href="/experience/"
          className="inline-flex rounded-full border border-fg/15 px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent"
        >
          View experience timeline
        </Link>
        <Link
          href="/writing/auditai-case-study/"
          className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
        >
          Shorter essay version
        </Link>
      </div>
    </div>
  );
}
