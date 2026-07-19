import type { Metadata } from "next";
import Link from "next/link";
import { ArtifactFrame } from "@/components/case-study/ArtifactFrame";
import { ArtifactWalkthrough } from "@/components/case-study/ArtifactWalkthrough";
import { Callout } from "@/components/case-study/Callout";
import { CaseStudyAskEntry } from "@/components/case-study/CaseStudyAskEntry";
import { CaseStudyHireActions } from "@/components/case-study/CaseStudyHireActions";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { DecisionOptions } from "@/components/case-study/DecisionOptions";
import { LiveDemoLink } from "@/components/case-study/LiveDemoLink";
import { buttonSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "U2 Billing SaaS — PM Case Study",
  description:
    "Co-building a unified property/utility billing SaaS: PRDs, investor-pillar prioritization, an AI analytics roadmap, and a live AWS product — with market context sized at $340M SOM.",
  openGraph: {
    title: "U2 Billing SaaS — PM Case Study",
    description:
      "Co-building a unified property/utility billing SaaS: PRDs, investor-pillar prioritization, an AI analytics roadmap, and a live AWS product — with market context sized at $340M SOM.",
  },
};

const U2_TOC = [
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

const U2_PRIORITY_STEPS = [
  {
    title: "Billing core first",
    body: "Own the unified billing record before anything else — the data model is the moat and the prerequisite for analytics.",
  },
  {
    title: "Operator workflows next",
    body: "Sequence day-to-day property/utility operator flows after the core record exists so demos show real work, not slides.",
  },
  {
    title: "AI analytics roadmapped",
    body: "Six ML capabilities designed on top of the unified model — differentiation after the moat, not a v1 distraction.",
  },
] as const;

export default function U2CaseStudyPage() {
  return (
    <CaseStudyLayout
      title="U2 — unified property/utility billing SaaS"
      subtitle="Software Developer Intern with product ownership (Jul–Dec 2025) · KBXCOM · Rexburg, ID"
      tags={["AWS", "React", "TypeScript", "PRDs", "AI-assisted development"]}
      toc={U2_TOC}
      skim={{
        problem:
          "Property and utility billing lived in fragmented legacy tools — rework, errors, and no unified tenant view.",
        decision: "Unified platform with billing core first; park analytics-first wedge until the data model exists.",
        outcome: "Live AWS product · weeks→days PRD cycle · 6-capability AI roadmap adopted",
        role: "Builder with PM ownership — PRDs, prioritization across three investor pillars, legacy benchmarking",
        jumps: [
          { id: "options", label: "Options" },
          { id: "built", label: "What shipped" },
          { id: "results", label: "Results" },
        ],
      }}
      summary={[
        {
          term: "Market context",
          detail: "$340M serviceable obtainable market across property/utility billing",
        },
        {
          term: "What shipped",
          detail: "Live unified billing SaaS on AWS (u2qbo.tech) with AI analytics roadmap",
        },
        {
          term: "My ownership",
          detail: "PRDs, prioritization across three investor pillars, legacy benchmarking",
        },
        {
          term: "Velocity",
          detail: "PRD-to-prototype cycle compressed from weeks to days with AI-assisted dev",
        },
      ]}
      footer={
        <CaseStudyHireActions>
          <CaseStudyAskEntry
            caseName="U2"
            prompt="How did you prioritize across investor pillars on U2, and what did you cut?"
          />
          <a
            href="https://u2qbo.tech"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonSecondary}
          >
            Visit live product
          </a>
          <Link href="/experience/" className={buttonSecondary}>
            View experience timeline
          </Link>
        </CaseStudyHireActions>
      }
    >
      <CaseStudySection id="context" title="Context">
        <p>
          KBXCOM is an early-stage SaaS company building U2, a unified property/utility billing platform. As a
          software developer intern on a small founding-stage team (July–December 2025), I worked as a
          builder-with-PM-ownership: writing product requirements, prioritizing the roadmap, and shipping features.
        </p>
      </CaseStudySection>

      <CaseStudySection id="problem" title="Problem">
        <p>
          Property managers and utility providers run billing across fragmented legacy tools — separate systems for
          property charges, utility metering, and collections, stitched together manually. That fragmentation creates
          rework, billing errors, and no unified view of a tenant’s account. The serviceable market for a unified
          alternative was sized at <strong className="text-fg">$340M SOM</strong> — useful context for investors, not
          a personal productivity KPI.
        </p>
      </CaseStudySection>

      <CaseStudySection id="goals" title="Goal & Success Metrics">
        <p>
          Ship a credible unified billing product fast enough to support investor conversations, with a roadmap
          prioritized against the three pillars investors cared about.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">North star:</strong> a live, demonstrable product covering the unified billing
            core.
          </li>
          <li>
            <strong className="text-fg">Supporting:</strong> roadmap coverage of the three investor pillars, justified
            by legacy benchmarking rather than opinion.
          </li>
          <li>
            <strong className="text-fg">Guardrail:</strong> do not ship an AI analytics wedge before the billing data
            model exists — differentiation without the moat is theater.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="discovery" title="Discovery & Research">
        <p>
          The core research method was <strong className="text-fg">legacy benchmarking</strong>: cataloging what
          incumbent property and utility billing systems did well and where workflows broke, then using those gaps to
          justify roadmap priorities. I also researched the AI analytics space to identify where ML could
          differentiate a billing platform rather than decorate it.
        </p>
        <Callout>
          Benchmarking the legacy systems turned roadmap debates from taste into evidence — every prioritization call
          traced back to a documented gap in an incumbent workflow.
        </Callout>
      </CaseStudySection>

      <CaseStudySection id="options" title="Options Explored">
        <DecisionOptions
          intro="Platform shape and roadmap sequencing were separate decisions:"
          options={[
            {
              title: "Integrate with incumbents",
              body: "Build a layer over existing billing tools. Lower build cost, but inherits the fragmentation we were trying to remove. Rejected for the core product.",
              status: "rejected",
            },
            {
              title: "Analytics-first wedge",
              body: "Sell insights over customers’ existing data. Faster story for investors, but weak without owning the underlying billing workflows. Parked until after the unified data model shipped.",
              status: "parked",
            },
            {
              title: "Unified platform, billing core first",
              body: "Own the full billing record, ship the unified core, layer analytics on top. Larger build, but the unified data model is the moat and the prerequisite for the AI roadmap.",
              status: "chosen",
            },
          ]}
          closing="Across the three investor pillars I owned prioritization trade-offs in the PRDs: ship the billing core first, sequence operator workflows next, and treat AI analytics as a designed differentiation story — not a v1 distraction."
        />
        <ArtifactWalkthrough
          label="Investor pillar prioritization"
          imageSrc="/artifacts/u2-prioritization.svg"
          imageAlt="U2 prioritization across three investor pillars: billing core shipped first, operator workflows next, AI analytics roadmapped"
          caption="Ship-now vs cut-later across investor pillars — justified by legacy benchmarking, not taste."
          steps={U2_PRIORITY_STEPS}
        />
      </CaseStudySection>

      <CaseStudySection id="built" title="What We Built">
        <ArtifactFrame
          label="AI analytics roadmap"
          imageSrc="/artifacts/u2-ai-roadmap.svg"
          imageAlt="U2 AI analytics roadmap: six ML capabilities on the unified billing data model"
          caption="Six ML capabilities sequenced on top of the unified billing data model — differentiation after the moat, not before."
        />
        <p>
          A unified property/utility billing SaaS deployed on <strong className="text-fg">AWS</strong>, plus a
          designed AI analytics roadmap of <strong className="text-fg">six ML capabilities</strong> — anomaly
          detection, usage forecasting, equity heatmaps, predictive collections, and more — sequenced so each
          capability builds on the unified billing data model.
        </p>
        <p>
          I compressed the PRD-to-prototype cycle from weeks to days using AI-assisted development (Claude Code,
          Codex), which meant each sprint could validate a spec with a working prototype instead of a mockup. AI
          accelerated implementation; I still owned problem framing, acceptance criteria, and what got cut from the
          roadmap.
        </p>
      </CaseStudySection>

      <CaseStudySection id="launch" title="Launch & Rollout">
        <LiveDemoLink
          href="https://u2qbo.tech"
          label="Open u2qbo.tech"
          note="Public product — open in a new tab to explore the live billing SaaS."
        />
        <p>
          Roadmap sequencing followed the investor pillars, with legacy benchmarking used to justify each release’s
          scope to stakeholders.
        </p>
      </CaseStudySection>

      <CaseStudySection id="results" title="Results">
        <p>
          Separating <strong className="text-fg">what shipped</strong> from{" "}
          <strong className="text-fg">market context</strong> — the distinction hiring managers should see:
        </p>
        <div className="my-6 grid gap-4 rounded-xl border border-hairline bg-surface p-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">Live</p>
            <p className="mt-1 text-sm font-semibold text-fg">Product on AWS</p>
            <p className="mt-0.5 text-xs text-muted">
              <a
                href="https://u2qbo.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                u2qbo.tech
              </a>
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">Days</p>
            <p className="mt-1 text-sm font-semibold text-fg">PRD → prototype</p>
            <p className="mt-0.5 text-xs text-muted">was weeks — AI-assisted build</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">6</p>
            <p className="mt-1 text-sm font-semibold text-fg">ML capabilities</p>
            <p className="mt-0.5 text-xs text-muted">roadmap adopted as differentiation</p>
          </div>
        </div>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">Prioritization owned:</strong> billing core before analytics; secondary
            polish and premature ML cut so investor demos showed a real unified record, not a slide.
          </li>
          <li>
            <strong className="text-fg">Market context (not a personal KPI):</strong> product targets a{" "}
            <strong className="text-fg">$340M SOM</strong> — useful for sizing the opportunity investors care about,
            not something I “delivered” as an individual metric.
          </li>
        </ul>
        <Callout label="Why the framing is honest">
          Early-stage shipping proof is a live product, a defendable roadmap, and faster learning loops — not ARR I
          didn’t own. I keep $340M SOM in the problem/context so the opportunity is clear without dressing market
          size as personal impact.
        </Callout>
      </CaseStudySection>

      <CaseStudySection id="differently" title="What I'd Do Differently">
        <p>
          I’d push for direct customer discovery earlier. Legacy benchmarking told us where incumbent workflows broke,
          but it’s a proxy for user pain, not a substitute — a handful of structured interviews with property managers
          in the first month would have de-risked prioritization across the investor pillars and given the AI roadmap
          sharper acceptance criteria than competitive inference could.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
