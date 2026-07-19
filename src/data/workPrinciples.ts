/**
 * PM operating principles — shared by About and the home How I work strip.
 * Each principle links to a case study that demonstrates it.
 */

export const workPrinciples = [
  {
    id: "define-good",
    title: "I define “good” before designing fallbacks",
    body: "Evaluation criteria come before prompts or retrieval. If we can’t say what a successful output looks like, we’re not ready to automate the workflow — that ordering shaped both AuditAI and the campus Support Agent.",
    caseHref: "/projects/byui-chatbot/",
    caseLabel: "BYU–I Support Agent",
  },
  {
    id: "constraints-first",
    title: "I align stakeholders on constraints before solutions",
    body: "On AuditAI, General Counsel’s release criteria were a design input, not a blocker. Agreeing on constraints first turns compliance reviews from a veto at the end into guardrails from the start.",
    caseHref: "/projects/auditai/",
    caseLabel: "AuditAI",
  },
  {
    id: "agreed-metrics",
    title: "Metrics only count when the denominator is agreed",
    body: "The ~30% / ~50% AuditAI numbers hold up because audit leadership signed off on what we counted. I’d rather report a smaller, defensible number than a bigger one nobody trusts.",
    caseHref: "/projects/auditai/",
    caseLabel: "AuditAI results",
  },
  {
    id: "human-handoff",
    title: "Human handoff is product, not a failure mode",
    body: "Escalation paths get designed with the same care as the happy path. When confidence is low, handing off to a human should feel like the system working — because it is.",
    caseHref: "/projects/byui-chatbot/",
    caseLabel: "Support Agent trust design",
  },
] as const;
