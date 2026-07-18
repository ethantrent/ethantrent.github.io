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
    date: "2026-07-08",
    excerpt:
      "Probabilistic outputs, trust, and why the hardest work is defining “good” before you touch the model.",
    content: [
      "Most AI features fail in the specification layer, not the API layer. Teams jump to prompts and retrieval when they haven’t agreed what a successful session looks like for the user — or for compliance. By the time the demo works, nobody can say whether the product does, because “works” was never defined.",
      "I start from friction: what manual loop is expensive, error-prone, or slow? Not “where could we add AI?” — that ordering produces features in search of a problem. On AuditAI, the friction was capacity: manual steps in repeatable audit workflows were consuming hours that should have gone to judgment-heavy review. On the BYU–Idaho chatbot, it was students bouncing between Financial Aid, Registration, and Tech support for answers that lived in documents nobody could find. In both cases the model was the least interesting part of the solution.",
      "Once the friction is named, I ask what humans must still own — approvals, escalations, audit logs — and design those paths as first-class product behavior, not exceptions. This is the single biggest mindset gap I see in AI product work. Escalation to a human gets treated like an error state, styled apologetically, buried at the bottom of the flow. But in any domain with real stakes, the handoff is where trust is either built or destroyed. When the campus chatbot hits a question where retrieval or safety checks fail, routing to a human should feel like the system working correctly — because it is.",
      "The same logic applies to stakeholders. On AuditAI, General Counsel’s release criteria could have been framed as a blocker; treated as a design input instead, they told us exactly which architecture to choose. A monolithic assistant couldn’t produce a defensible per-step audit trail; narrow agents with explicit handoffs could. The compliance constraint made the product decision for us — we just had to listen to it early instead of appealing it late.",
      "Evaluation is a product surface, not an engineering afterthought. For campus RAG and internal agents alike, I care about golden questions, regression sets, and clear fallback when confidence is low — because “the model said so” is not a release strategy. And when it comes time to report results, the denominator matters more than the number. The ~30% automation and ~50% labor-reduction figures from AuditAI hold up precisely because audit leadership agreed on what we were counting before we counted it. A smaller number everyone trusts beats a bigger one nobody can defend.",
      "If I had to compress all of this: the best AI products aren’t built around the model — they’re built around the moment of friction they remove, the humans who stay in the loop, and the definition of “good” that everyone signed before the first prompt was written.",
    ],
  },
  {
    slug: "auditai-case-study",
    title: "AuditAI: six agents, governance, and measured automation",
    date: "2026-03-10",
    excerpt:
      "Shipping multi-agent workflows inside a regulated nonprofit — alignment with Auditing, engineering, and General Counsel.",
    content: [
      "AuditAI started as a discovery bet: could we chain specialized agents over repetitive audit workflows without bypassing human judgment? The context raised the stakes — a global nonprofit audit organization with 50,000+ volunteer auditors across 31,000+ units, mid-migration to AWS, where any AI output could end up inside a process subject to regulatory-grade review. The product answer turned out to be yes — but only with explicit handoffs, logging, and sprint-level alignment with legal stakeholders.",
      "The first real decision wasn’t technical. We weighed a single monolithic assistant (fastest to demo, impossible to audit per-step), deterministic RPA-style automation (easy to govern, brittle on the unstructured inputs where the actual labor lived), and multi-agent orchestration with human review gates. We chose the third because it matched the governance constraint: narrow scopes made each agent’s behavior explainable, individually testable, and defensible to General Counsel. The architecture was chosen by the compliance requirements as much as by engineering judgment — which is exactly how it should work.",
      "We treated each agent as a narrow worker: intake, classification, draft generation, and routing — orchestrated so outputs fed human reviewers with context instead of replacing them. Escalation on low confidence and review gates before anything policy-sensitive weren’t safety nets bolted on at the end; they were requirements in the spec from the first sprint. That framing changed the conversation with auditors too. They didn’t want automation bypasses; they wanted confidence gates — a system that knew when to hand the work back.",
      "Rollout rode the existing release train. AI capability shipped on the same 2-week sprint cadence as the AWS modernization work, with release criteria agreed with General Counsel before each increment. Keeping AI on the production cadence — rather than running it as a side experiment — meant it inherited all the discipline production work already had: sprint planning in Azure DevOps, defined acceptance, logging requirements, and stakeholders who reviewed sprint over sprint rather than signing off once and disappearing.",
      "Impact was measured on agreed slices of work: roughly ~30% automation on common paths and ~50% reduction in manual labor time on those slices. The numbers matter less than the definition of what we counted; we documented that with audit leadership so outcomes were defensible — in the boardroom or in an interview. If I could rerun the program, I’d build the evaluation infrastructure first: golden sets per agent, regression harnesses for model and policy changes, and operator playbooks. Every workflow we added meant renegotiating what “good” meant instead of inheriting a tested definition — the clearest lesson AuditAI left me with.",
    ],
  },
  {
    slug: "how-i-spec-ai-features",
    title: "How I write specs when the output is probabilistic",
    date: "2025-11-18",
    excerpt:
      "A lightweight PRD pattern for RAG and agents: intents, failure modes, and success metrics that aren’t vanity.",
    content: [
      "For AI features I still write PRDs — the discipline doesn’t change because the output is probabilistic. What changes is where the weight goes: the non-functional section gets as much love as the user stories. I capture latency budgets, allowed versus disallowed topics, retention of transcripts, and what happens when the retriever returns nothing useful. In a deterministic feature those are edge cases; in an AI feature they’re the main event, because some fraction of sessions will hit them no matter how good the model is.",
      "User stories read like: “As an auditor, I want a first-pass summary with citations so I can verify in the source system” — never “As a user, I want AI magic.” The citation clause isn’t decoration. It encodes the actual trust model: the AI produces a draft, the human verifies against source, and the product is designed around that verification loop rather than pretending it won’t happen. If a story can’t articulate how the human checks the output, the story isn’t done.",
      "Acceptance criteria reference evaluation scenarios, not vibes. Before build starts I want a set of golden questions with agreed-good answers, a handful of adversarial or out-of-scope prompts with agreed-safe behaviors, and an explicit statement of what happens on low confidence. These become the regression set every subsequent change runs against. Without them, every model upgrade or prompt tweak is a fresh negotiation about whether the feature got better or worse — with them, it’s a test run.",
      "Failure modes get named individually, because “handle errors gracefully” is not a spec. For the BYU–Idaho chatbot that meant separate defined behaviors for retrieval returning nothing, retrieval returning something stale, safety checks failing, and the student simply asking something out of scope. Each path ends in a designed handoff to human staff — routed with context, phrased so it feels like the system working rather than apologizing. Escalation is a feature with its own acceptance criteria, not an exception handler.",
      "The sequence I follow is the same one that carried the chatbot from prototype to institutional beta serving 20,000+ students: intents and flows first, then retrieval, then guardrails. Get the intent taxonomy and conversation shapes agreed while everything is still cheap to change; only then let the retrieval architecture and model choices fill in behind them. Teams that start from the model end up reverse-engineering a spec from whatever the demo happens to do.",
      "The spec is the contract between policy, engineering, and the user’s trust. When the output is probabilistic, that contract is the only deterministic thing you ship — which is exactly why it deserves the most care.",
    ],
  },
];

export function getPostBySlug(slug: string): WritingPost | undefined {
  return writingPosts.find((p) => p.slug === slug);
}

/** Read time estimate at ~200 wpm, minimum 1 minute. */
export function readTimeMinutes(post: WritingPost): number {
  const words = post.content.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** “2026-03-15” → “March 15, 2026” for display. */
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
