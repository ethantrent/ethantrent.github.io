import type { Metadata } from "next";
import Link from "next/link";
import { ArtifactFrame } from "@/components/case-study/ArtifactFrame";
import { Callout } from "@/components/case-study/Callout";
import { CaseStudyHireActions } from "@/components/case-study/CaseStudyHireActions";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { buttonSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "U2 Billing SaaS — PM Case Study",
  description:
    "Co-building a unified property/utility billing SaaS targeting a $340M market: PRDs, investor-pillar prioritization, an AI analytics roadmap, and a live AWS product.",
  openGraph: {
    title: "U2 Billing SaaS — PM Case Study",
    description:
      "Co-building a unified property/utility billing SaaS targeting a $340M market: PRDs, investor-pillar prioritization, an AI analytics roadmap, and a live AWS product.",
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

export default function U2CaseStudyPage() {
  return (
    <CaseStudyLayout
      title="U2 — unified property/utility billing SaaS"
      subtitle="Software Developer Intern with product ownership (Jul–Dec 2025) · KBXCOM · Rexburg, ID"
      tags={["AWS", "React", "TypeScript", "PRDs", "AI-assisted development"]}
      toc={U2_TOC}
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
          alternative was sized at <strong className="text-fg">$340M SOM</strong>.
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
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-fg">Integrate with incumbents</strong> — build a layer over existing billing
            tools. Lower build cost, but inherits the fragmentation we were trying to remove.
          </li>
          <li>
            <strong className="text-fg">Unified platform, billing core first (chosen)</strong> — own the full billing
            record, ship the unified core, layer analytics on top. Larger build, but the unified data model is the
            moat and the prerequisite for the AI roadmap.
          </li>
          <li>
            <strong className="text-fg">Analytics-first wedge</strong> — sell insights over customers’ existing data.
            Faster wedge, but weak without owning the underlying billing workflows.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="built" title="What We Built">
        <p>
          A unified property/utility billing SaaS deployed on <strong className="text-fg">AWS</strong>, plus a
          designed AI analytics roadmap of <strong className="text-fg">six ML capabilities</strong> — anomaly
          detection, usage forecasting, equity heatmaps, predictive collections, and more — sequenced so each
          capability builds on the unified billing data model.
        </p>
        <ArtifactFrame
          label="AI analytics roadmap"
          imageSrc="/artifacts/u2-ai-roadmap.svg"
          imageAlt="U2 AI analytics roadmap: six ML capabilities on the unified billing data model"
          caption="Six ML capabilities sequenced on top of the unified billing data model."
        />
        <p>
          I compressed the PRD-to-prototype cycle from weeks to days using AI-assisted development (Claude Code,
          Codex), which meant each sprint could validate a spec with a working prototype instead of a mockup.
        </p>
      </CaseStudySection>

      <CaseStudySection id="launch" title="Launch & Rollout">
        <p>
          The product is live at{" "}
          <a
            href="https://u2qbo.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            u2qbo.tech
          </a>
          . Roadmap sequencing followed the investor pillars, with legacy benchmarking used to justify each release’s
          scope to stakeholders.
        </p>
      </CaseStudySection>

      <CaseStudySection id="results" title="Results">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">Live product</strong> shipped on AWS targeting a{" "}
            <strong className="text-fg">$340M SOM</strong>.
          </li>
          <li>
            <strong className="text-fg">Weeks → days</strong> PRD-to-prototype cycle via AI-assisted development.
          </li>
          <li>
            <strong className="text-fg">Six-capability</strong> AI analytics roadmap adopted as the product’s
            differentiation story.
          </li>
        </ul>
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
