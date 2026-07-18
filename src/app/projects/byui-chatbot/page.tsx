import type { Metadata } from "next";
import Link from "next/link";
import { ArtifactFrame } from "@/components/case-study/ArtifactFrame";
import { Callout } from "@/components/case-study/Callout";
import { CaseStudyHireActions } from "@/components/case-study/CaseStudyHireActions";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { buttonSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "BYU–I ChatBot — PM Case Study",
  description:
    "From student prototype to institutional beta: a RAG campus assistant for 20,000+ BYU–Idaho students with intent design, evaluation criteria, and safe escalation.",
  openGraph: {
    title: "BYU–I ChatBot — PM Case Study",
    description:
      "From student prototype to institutional beta: a RAG campus assistant for 20,000+ BYU–Idaho students with intent design, evaluation criteria, and safe escalation.",
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
      title="BYU–I ChatBot — campus RAG assistant"
      subtitle="Product lead on prototype adopted into institutional deployment (2025) · BYU–Idaho · Rexburg, ID"
      tags={["Python", "LangChain", "OpenAI", "RAG", "Agentic UX"]}
      toc={BYUI_TOC}
      summary={[
        {
          term: "Scale context",
          detail: "20,000+ students in scope across Financial Aid, Registration, and Tech support",
        },
        {
          term: "What shipped",
          detail: "RAG-based campus assistant, live in institutional beta",
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
          <Link href="/writing/how-i-spec-ai-features/" className={buttonSecondary}>
            How I spec AI features
          </Link>
        </CaseStudyHireActions>
      }
    >
      <CaseStudySection id="context" title="Context">
        <p>
          BYU–Idaho serves 20,000+ students whose support questions route through separate offices — Financial Aid,
          Registration, and Tech support. In 2025, while a CS student there, I prototyped an AI-powered campus
          chatbot and authored the requirements that carried it into institutional deployment; it is now live in
          beta.
        </p>
      </CaseStudySection>

      <CaseStudySection id="problem" title="Problem">
        <p>
          Students bounced between offices to answer routine questions — aid disbursement dates, registration holds,
          password resets — and support staff spent their queues on questions a well-grounded system could answer
          instantly. But a campus assistant that confidently gives a wrong answer about financial aid is worse than no
          assistant at all, so the real problem was automation <em>with</em> trustworthy handoff, not deflection at
          any cost.
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
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-fg">Better FAQ search</strong> — cheapest and safest, but doesn’t resolve
            multi-step questions and pushes the synthesis work back onto students.
          </li>
          <li>
            <strong className="text-fg">Scripted rule-based bot</strong> — predictable and policy-safe, but brittle:
            every new question shape requires authoring, and coverage decays as policies change.
          </li>
          <li>
            <strong className="text-fg">RAG assistant with designed escalation (chosen)</strong> — answers grounded in
            institutional sources, flexible to phrasing, with explicit fallback to human staff when retrieval or
            safety checks fail. More evaluation work, but the only option that scales coverage while protecting trust.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="built" title="What We Built">
        <p>
          A RAG-based campus assistant covering the three intent domains, with conversational flows and escalation
          logic defined in the PRD. Answer quality was treated as a product surface: evaluation criteria per intent,
          and fallback paths when retrieval returned nothing useful or safety checks failed — balancing automation
          with responsible handoff to human staff.
        </p>
        <ArtifactFrame
          label="RAG escalation flow"
          imageSrc="/artifacts/byui-rag-flow.svg"
          imageAlt="BYU–I ChatBot RAG escalation flow from intent routing through answer or staff handoff"
          caption="Intent routing → grounded retrieval → confidence and safety checks → answer with citations, or handoff to human staff."
        />
      </CaseStudySection>

      <CaseStudySection id="launch" title="Launch & Rollout">
        <p>
          The prototype and its requirements were adopted into institutional deployment, launching as a{" "}
          <strong className="text-fg">live beta</strong> scoped to the three highest-volume support domains — a
          deliberate rollout guardrail: prove quality where volume is highest and sources are best-maintained before
          widening coverage.
        </p>
      </CaseStudySection>

      <CaseStudySection id="results" title="Results">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">Live in beta</strong> at BYU–Idaho for{" "}
            <strong className="text-fg">20,000+ students</strong>.
          </li>
          <li>
            <strong className="text-fg">Student prototype → institutional product:</strong> requirements and PRD
            authored by me carried into official deployment.
          </li>
        </ul>
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
