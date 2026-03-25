export type WritingPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** Plain paragraphs (no MDX — static export friendly). */
  content: string[];
};

export const writingPosts: WritingPost[] = [
  {
    slug: "ai-pm-philosophy",
    title: "How I think about AI product management",
    date: "2026-03-15",
    excerpt:
      "Probabilistic outputs, trust, and why the hardest work is defining “good” before you touch the model.",
    content: [
      "Most AI features fail in the specification layer, not the API layer. Teams jump to prompts and retrieval when they haven’t agreed what a successful session looks like for the user — or for compliance.",
      "I start from friction: what manual loop is expensive, error-prone, or slow? Then I ask what humans must still own (approvals, escalations, audit logs) and design those paths as first-class product behavior, not exceptions.",
      "Evaluation is a product surface. For campus RAG and internal agents alike, I care about golden questions, regression sets, and clear fallback when confidence is low — because “the model said so” is not a release strategy.",
    ],
  },
  {
    slug: "auditai-case-study",
    title: "AuditAI: six agents, governance, and measured automation",
    date: "2026-03-10",
    excerpt:
      "Shipping multi-agent workflows inside a regulated nonprofit — alignment with Auditing, engineering, and General Counsel.",
    content: [
      "AuditAI started as a discovery bet: could we chain specialized agents over repetitive audit workflows without bypassing human judgment? The product answer was yes — but only with explicit handoffs, logging, and sprint-level alignment with legal stakeholders.",
      "We treated each agent as a narrow worker: intake, classification, draft generation, and routing — orchestrated so humans stayed in the loop for edge cases and policy-sensitive outputs.",
      "Impact was measured on agreed slices of work: roughly ~30% automation on common paths and ~50% reduction in manual labor time on those slices. The numbers matter less than the definition of what we counted; we documented that with audit leadership so outcomes were interview-defensible.",
    ],
  },
  {
    slug: "how-i-spec-ai-features",
    title: "How I write specs when the output is probabilistic",
    date: "2026-03-01",
    excerpt:
      "A lightweight PRD pattern for RAG and agents: intents, failure modes, and success metrics that aren’t vanity.",
    content: [
      "For AI features I still write PRDs — but the non-functional section gets as much love as user stories. I capture latency budgets, allowed versus disallowed topics, retention of transcripts, and what happens when the retriever returns nothing useful.",
      "User stories read like: “As an auditor, I want a first-pass summary with citations so I can verify in the source system” — never “As a user, I want AI magic.” Acceptance criteria reference evaluation scenarios and escalation to human support.",
      "This is the same muscle I used on the BYU–I chatbot: intents and flows first, then retrieval, then guardrails. The spec is the contract between policy, engineering, and the user’s trust.",
    ],
  },
];

export function getPostBySlug(slug: string): WritingPost | undefined {
  return writingPosts.find((p) => p.slug === slug);
}
