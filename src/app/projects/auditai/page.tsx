import type { Metadata } from "next";
import Link from "next/link";
import { ArtifactFrame } from "@/components/case-study/ArtifactFrame";
import { Callout } from "@/components/case-study/Callout";
import { CaseStudyHireActions } from "@/components/case-study/CaseStudyHireActions";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { buttonSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "AuditAI — PM Case Study",
  description:
    "How six internal AI agents shipped inside a regulated nonprofit: ~30% automation of common audit workflows and ~50% less manual labor on scoped tasks.",
  openGraph: {
    title: "AuditAI — PM Case Study",
    description:
      "How six internal AI agents shipped inside a regulated nonprofit: ~30% automation of common audit workflows and ~50% less manual labor on scoped tasks.",
  },
};

const AUDITAI_TOC = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "goals", label: "Goals & metrics" },
  { id: "discovery", label: "Discovery" },
  { id: "options", label: "Options" },
  { id: "built", label: "What we built" },
  { id: "launch", label: "Launch" },
  { id: "results", label: "Results" },
  { id: "differently", label: "Differently" },
] as const;

export default function AuditAiCaseStudyPage() {
  return (
    <CaseStudyLayout
      title="AuditAI — multi-agent automation at nonprofit scale"
      subtitle="IT Project Manager (Jan–May 2026) · Information and Communication Services — global nonprofit · Riverton, UT"
      tags={["Multi-agent", "LangChain", "OpenAI", "Azure DevOps", "AWS", "Compliance"]}
      toc={AUDITAI_TOC}
      summary={[
        {
          term: "Scale context",
          detail: "50,000+ volunteer auditors · 31,000+ units on modernized AWS platform",
        },
        {
          term: "What shipped",
          detail: "Six operational internal AI agents (agentic workflows + human review gates)",
        },
        {
          term: "Governance",
          detail: "Aligned Auditing, engineering & General Counsel on compliant releases",
        },
        {
          term: "Measured impact (scoped)",
          detail: "~30% automation of common processes · ~50% manual labor reduction on targeted tasks",
        },
      ]}
      footer={
        <CaseStudyHireActions>
          <Link href="/experience/" className={buttonSecondary}>
            View experience timeline
          </Link>
          <Link href="/writing/auditai-case-study/" className={buttonSecondary}>
            Shorter essay version
          </Link>
        </CaseStudyHireActions>
      }
    >
      <CaseStudySection id="context" title="Context">
        <p>
          Information and Communication Services (ICS) is the technology arm of a global nonprofit whose Audit
          department oversees <strong className="text-fg">50,000+ volunteer auditors</strong> across{" "}
          <strong className="text-fg">31,000+ units</strong>. I joined as IT Project Manager (January–May 2026),
          owning discovery and operational rollout of AuditAI while also managing the parallel AWS migration of the
          Financial Audit System — sprint planning and release roadmaps ran in Azure DevOps on a 2-week cadence.
        </p>
        <p>
          Core partners: the Audit department (domain owners), the platform engineering team, and General Counsel.
        </p>
      </CaseStudySection>

      <CaseStudySection id="problem" title="Problem">
        <p>
          Audit teams were juggling legacy modernization on AWS with rising demand for intelligent assistance. Manual
          steps in repeatable workflows — intake, classification, routing, first-pass drafting — consumed capacity
          that should have gone to judgment-heavy review. And any AI assist had to survive scrutiny from Auditing and
          legal stakeholders, not just engineering demos: outputs feed processes subject to regulatory-grade review.
        </p>
      </CaseStudySection>

      <CaseStudySection id="goals" title="Goal & Success Metrics">
        <p>
          The bet: automate the repeatable share of common audit workflows without ever bypassing human judgment or
          policy. “Done” meant agents running operationally inside the department — not a demo — with metrics whose
          definitions audit leadership had signed off on.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">North star:</strong> share of common audit processes automated end-to-end,
            measured on workflow slices agreed with audit leadership.
          </li>
          <li>
            <strong className="text-fg">Supporting:</strong> manual labor time reduction on targeted tasks.
          </li>
          <li>
            <strong className="text-fg">Guardrail:</strong> zero policy-sensitive outputs released without a human
            review gate; every agent action logged for audit trail.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="discovery" title="Discovery & Research">
        <p>
          I partnered with audit leadership to map high-volume paths where probabilistic assistance could add value
          without bypassing policy. We prioritized workflows with clear inputs, verifiable outputs, and explicit
          escalation when confidence or policy fit was unclear — the same pattern I later applied to campus RAG:{" "}
          <span className="text-fg">define “good,” then design fallbacks.</span>
        </p>
        <p>
          The most important constraint surfaced early, from General Counsel rather than engineering: releases had to
          carry release criteria, logging, and escalation paths that would hold up under regulatory scrutiny. That
          reframed the tradeoff space — the question was never “how much can we automate?” but “which steps can we
          automate while keeping a defensible human decision record?”
        </p>
        <Callout>
          Auditors needed confidence gates, not automation bypasses. Human-in-the-loop paths had to feel like
          first-class product behavior — not failure modes.
        </Callout>
      </CaseStudySection>

      <CaseStudySection id="options" title="Options Explored">
        <p>We weighed three approaches before committing:</p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-fg">One monolithic AI assistant</strong> — a single prompt/agent covering all
            workflows. Fastest to demo, but opaque: no clean audit trail per step, and one bad output contaminates
            trust in everything.
          </li>
          <li>
            <strong className="text-fg">Deterministic (RPA-style) automation</strong> — scripted rules over the same
            workflows. Predictable and easy to govern, but brittle on unstructured inputs, which is where most of the
            manual labor actually lived.
          </li>
          <li>
            <strong className="text-fg">Multi-agent orchestration with human review gates (chosen)</strong> — narrow
            agents per workflow step, explicit tool use and handoffs, humans reviewing at defined gates. Slower to
            stand up, but each agent is individually testable, loggable, and defensible to General Counsel.
          </li>
        </ul>
        <p>
          We prioritized the multi-agent path because it matched the governance constraint: narrow scopes made each
          agent’s behavior explainable, and review gates turned compliance from a blocker into a design input.
        </p>
      </CaseStudySection>

      <CaseStudySection id="built" title="What We Built">
        <p>
          <strong className="text-fg">Six internal agents</strong> covered specialized steps — intake, classification,
          drafting support, routing, and similar — orchestrated so outputs fed human reviewers with context instead of
          replacing them. Tool use and handoffs were designed explicitly (multi-agent orchestration), not as a single
          monolithic prompt.
        </p>
        <ArtifactFrame
          label="Agent architecture diagram"
          imageSrc="/artifacts/auditai-architecture.svg"
          imageAlt="AuditAI multi-agent architecture: six agents, confidence gate, human review, audit trail"
          caption="Six narrow agents with explicit handoffs, escalation on low confidence, and human review gates before policy-sensitive outputs."
        />
        <p>
          <strong className="text-fg">Trust &amp; compliance:</strong> We coordinated with General Counsel on release
          criteria, logging, and parallel modernization tracks so AI capability shipped on the same 2-week cadence as
          other production work — not as a side experiment.
        </p>
      </CaseStudySection>

      <CaseStudySection id="launch" title="Launch & Rollout">
        <p>
          Rollout rode the existing release train: AI capability shipped on the same 2-week sprint cadence as the AWS
          modernization work, with release criteria agreed with General Counsel before each increment. Guardrails were
          product features, not afterthoughts — escalation when model confidence was low, human review gates before
          anything policy-sensitive left the system, and audit-trail logging on every agent action.
        </p>
        <p>
          Stakeholder alignment ran continuously rather than as a one-time sign-off: Auditing owned the workflow
          definitions and metric denominators, engineering owned orchestration and observability, and legal reviewed
          release criteria sprint over sprint.
        </p>
      </CaseStudySection>

      <CaseStudySection id="results" title="Results">
        <p>
          On the workflows we measured with audit leadership (scoped estimates — measured on agreed slices of work,
          not the whole department):
        </p>
        <div className="my-6 grid gap-4 rounded-xl border border-hairline bg-surface p-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">~30%</p>
            <p className="mt-1 text-sm font-semibold text-fg">Automation</p>
            <p className="mt-0.5 text-xs text-muted">of common audit processes</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">~50%</p>
            <p className="mt-1 text-sm font-semibold text-fg">Less manual labor</p>
            <p className="mt-0.5 text-xs text-muted">on targeted task slices</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">6</p>
            <p className="mt-1 text-sm font-semibold text-fg">Agents operational</p>
            <p className="mt-0.5 text-xs text-muted">with GC-signed audit trail</p>
          </div>
        </div>
        <Callout label="Why the numbers hold">
          Those metrics are only meaningful because the denominators were agreed with domain owners — something I
          highlight in interviews when discussing responsible AI PM work.
        </Callout>
      </CaseStudySection>

      <CaseStudySection id="differently" title="What I'd Do Differently">
        <p>
          I’d invest in evaluation infrastructure from day one instead of retrofitting it. We proved value on scoped
          workflows, but golden sets per agent, regression harnesses for model or policy changes, and operator
          playbooks for escalation all arrived later than they should have — the product surface around AI, not just
          the models. Earlier evaluation would also have let us expand the measured slices faster, because every new
          workflow required renegotiating what “good” meant instead of inheriting a tested definition.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
