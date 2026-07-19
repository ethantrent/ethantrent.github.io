import type { Metadata } from "next";
import Link from "next/link";
import { ArtifactFrame } from "@/components/case-study/ArtifactFrame";
import { Callout } from "@/components/case-study/Callout";
import { CaseStudyAskEntry } from "@/components/case-study/CaseStudyAskEntry";
import { CaseStudyHireActions } from "@/components/case-study/CaseStudyHireActions";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { DecisionOptions } from "@/components/case-study/DecisionOptions";
import { LiveDemoLink } from "@/components/case-study/LiveDemoLink";
import { buttonSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "BYU–I Support Agent — PM Case Study",
  description:
    "From student prototype to institutional beta: BYU–Idaho Support Agent for 20,000+ students with intent design, evaluation criteria, and safe escalation.",
  openGraph: {
    title: "BYU–I Support Agent — PM Case Study",
    description:
      "From student prototype to institutional beta: BYU–Idaho Support Agent for 20,000+ students with intent design, evaluation criteria, and safe escalation.",
  },
};

const BYUI_TOC = [
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

export default function ByuiChatbotCaseStudyPage() {
  return (
    <CaseStudyLayout
      title="BYU–I Support Agent"
      subtitle="Product lead on prototype adopted into institutional deployment (2025) · BYU–Idaho · Rexburg, ID"
      tags={["Python", "LangChain", "OpenAI", "RAG", "Agentic UX"]}
      toc={BYUI_TOC}
      skim={{
        problem:
          "Students bounced between offices for routine answers — but a confident wrong answer on financial aid is worse than no agent.",
        decision: "RAG Support Agent with designed escalation — not FAQ-only, scripted bot, or always-answer generative.",
        outcome: "Institutional beta · 3 domains · eval criteria + escalation shipped",
        role: "Product lead — intents, flows, escalation logic, requirements & PRD",
        jumps: [
          { id: "options", label: "Options" },
          { id: "built", label: "Product UI" },
          { id: "results", label: "Results" },
        ],
      }}
      summary={[
        {
          term: "Scale context",
          detail: "20,000+ students in scope across Financial Aid, Registration, and Tech support",
        },
        {
          term: "What shipped",
          detail: "Live beta at supportagent.byui.edu (campus login)",
        },
        {
          term: "My ownership",
          detail: "Intent categories, conversational flows, escalation logic, requirements & PRD",
        },
        {
          term: "Trust design",
          detail: "Evaluation criteria for answer quality + fallback paths on failed retrieval or safety checks",
        },
      ]}
      footer={
        <CaseStudyHireActions>
          <CaseStudyAskEntry
            caseName="BYU–I Support Agent"
            prompt="How did you design evaluation and escalation for the BYU–Idaho Support Agent?"
          />
          <a
            href="https://supportagent.byui.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonSecondary}
          >
            Campus Support Agent
            <span className="text-muted">(login required)</span>
          </a>
          <Link href="/writing/how-i-spec-ai-features/" className={buttonSecondary}>
            How I spec AI features
          </Link>
        </CaseStudyHireActions>
      }
    >
      <CaseStudySection id="context" title="Context">
        <p>
          BYU–Idaho serves 20,000+ students whose support questions route through separate offices — Financial Aid,
          Registration, and Tech support. In 2025, while a CS student there, I prototyped the campus Support Agent
          and authored the requirements that carried it into institutional deployment; it is now live in beta at{" "}
          <a
            href="https://supportagent.byui.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            supportagent.byui.edu
          </a>
          .
        </p>
      </CaseStudySection>

      <CaseStudySection id="problem" title="Problem">
        <p>
          Students bounced between offices to answer routine questions — aid disbursement dates, registration holds,
          password resets — and support staff spent their queues on questions a well-grounded system could answer
          instantly. But a Support Agent that confidently gives a wrong answer about financial aid is worse than no
          agent at all, so the real problem was automation <em>with</em> trustworthy handoff, not deflection at any
          cost.
        </p>
      </CaseStudySection>

      <CaseStudySection id="goals" title="Goal & Success Metrics">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">North star:</strong> routine questions resolved without staff involvement,
            measured per intent category.
          </li>
          <li>
            <strong className="text-fg">Quality bar:</strong> answer-quality evaluation criteria per intent — grounded
            in retrieved sources, not model priors.
          </li>
          <li>
            <strong className="text-fg">Guardrail:</strong> clean escalation to human staff whenever retrieval or
            safety checks failed; no dead ends.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="discovery" title="Discovery & Research">
        <p>
          Discovery started with the support surface itself: which questions arrived most often, which offices owned
          the answers, and where authoritative source content lived. From that I defined{" "}
          <strong className="text-fg">intent categories</strong> and conversational flows for the three highest-volume
          domains — Financial Aid, Registration, and Tech support — before any retrieval work began.
        </p>
        <Callout>
          Intents and flows first, then retrieval, then guardrails. The spec is the contract between policy,
          engineering, and the user’s trust.
        </Callout>
      </CaseStudySection>

      <CaseStudySection id="options" title="Options Explored">
        <DecisionOptions
          intro="We weighed approaches before committing — and explicitly chose what not to ship:"
          options={[
            {
              title: "Better FAQ search",
              body: "Cheapest and safest, but doesn’t resolve multi-step questions and pushes synthesis back onto students. Improves findability without removing the bounce between offices.",
              status: "rejected",
            },
            {
              title: "Scripted rule-based bot",
              body: "Predictable and policy-safe, but brittle: every new question shape requires authoring, and coverage decays as policies change. Fine for canned intents; not a campus-scale assistant.",
              status: "rejected",
            },
            {
              title: "Always-answer generative bot",
              body: "Maximum “magic,” maximum risk. Without retrieval grounding and escalation gates, a confident wrong answer on financial aid becomes a trust and compliance failure.",
              status: "rejected",
            },
            {
              title: "RAG Support Agent with designed escalation",
              body: "Answers grounded in institutional sources, flexible to phrasing, with explicit fallback to human staff when retrieval or safety checks fail. More evaluation work, but the only option that scales coverage while protecting trust.",
              status: "chosen",
            },
          ]}
          closing="The trade-off I owned: slower to demo than a single prompt chat, faster to defend when a wrong answer would hurt a student. Escalation gates were product requirements, not engineering afterthoughts."
        />
      </CaseStudySection>

      <CaseStudySection id="built" title="What We Built">
        <ArtifactFrame
          label="Support Agent product UI"
          imageSrc="/artifacts/byui-support-agent-ui.png"
          imageAlt="BYU-Idaho Support Agent beta UI: sidebar navigation, Support Agent hero, suggested prompts for Financial Aid, Registration, and live agent, and ask-anything input"
          caption="Institutional beta at supportagent.byui.edu — suggested intents for Financial Aid, Registration, and live-agent handoff (campus login required)."
        />
        <ArtifactFrame
          label="RAG + escalation flow"
          imageSrc="/artifacts/byui-rag-flow.svg"
          imageAlt="BYU-Idaho Support Agent flow: intent, retrieval, quality checks, answer or escalate to staff"
          caption="Answer only when grounded and in-scope — otherwise escalate with context."
        />
        <p>
          The BYU–Idaho Support Agent covering the three intent domains, with conversational flows and escalation
          logic defined in the PRD. Answer quality was treated as a product surface: evaluation criteria per intent,
          and fallback paths when retrieval returned nothing useful or safety checks failed — balancing automation
          with responsible handoff to human staff.
        </p>
        <Callout label="Intent + quality bar">
          The product surface matches the three high-volume domains in the PRD (Aid, Registration, Tech), with a
          shared bar for answers: grounded in sources, in-scope for a defined intent, and safe — fail any check and
          escalate to staff with context, including the “live representative” path shown in the UI.
        </Callout>
      </CaseStudySection>

      <CaseStudySection id="launch" title="Launch & Rollout">
        <LiveDemoLink
          href="https://supportagent.byui.edu/"
          label="Open Support Agent"
          note="Campus SSO / login required — visitors outside BYU–Idaho will hit the login wall. Honest constraint, not a broken link."
        />
        <p>
          The prototype and its requirements were adopted into institutional deployment as a{" "}
          <strong className="text-fg">live beta</strong>. Scoped to the three highest-volume support domains as a
          deliberate rollout guardrail: prove quality where volume is highest and sources are best-maintained before
          widening coverage.
        </p>
      </CaseStudySection>

      <CaseStudySection id="results" title="Results">
        <p>
          Decision-quality outcomes I can defend in an interview (scoped to what shipped — not invented usage
          dashboards):
        </p>
        <div className="my-6 grid gap-4 rounded-xl border border-hairline bg-surface p-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">3</p>
            <p className="mt-1 text-sm font-semibold text-fg">Domains in beta</p>
            <p className="mt-0.5 text-xs text-muted">Aid · Registration · Tech</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">20k+</p>
            <p className="mt-1 text-sm font-semibold text-fg">Students in scope</p>
            <p className="mt-0.5 text-xs text-muted">institutional beta audience</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-accent">PRD</p>
            <p className="mt-1 text-sm font-semibold text-fg">Carried into deploy</p>
            <p className="mt-0.5 text-xs text-muted">prototype → institutional product</p>
          </div>
        </div>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">Trust surface shipped:</strong> per-intent evaluation criteria plus
            escalation when retrieval or safety checks failed — automation designed not to invent answers.
          </li>
          <li>
            <strong className="text-fg">Rollout guardrail held:</strong> beta stayed on the three highest-volume
            domains with the best-maintained sources before widening coverage.
          </li>
        </ul>
        <Callout label="What these numbers mean — and don’t">
          “20,000+ students in scope” is the institutional audience for the beta, not a claim of weekly active users
          or ticket deflection. Resolution rate, escalation rate, and thumbs feedback are the metrics I’d instrument
          next — called out honestly in What I’d Do Differently because they weren’t live from day one.
        </Callout>
      </CaseStudySection>

      <CaseStudySection id="differently" title="What I'd Do Differently">
        <p>
          I’d instrument the feedback loop before launch, not after. The evaluation criteria defined what a good
          answer looked like, but the beta needed per-intent dashboards — resolution rate, escalation rate, thumbs
          feedback — from day one to know where the quality bar was actually holding. Retrofitting measurement onto a
          live assistant means flying partially blind during exactly the period when trust is being formed.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
