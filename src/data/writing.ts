export type WritingPost = {
  slug: string;
  title: string;
  date: string;
  updatedDate: string;
  excerpt: string;
  projectId: string;
  content: string[];
};
export const writingPosts: WritingPost[] = [
  {
    slug: "ai-pm-philosophy",
    title: "When a support assistant needs to hand off",
    date: "2026-07-08",
    updatedDate: "2026-09-07",
    excerpt:
      "Why I included escalation in the campus assistant’s requirements.",
    projectId: "byui-chatbot",
    content: [
      "I was the sole developer of the BYU–I Support Agent prototype and authored its requirements, including escalation logic, intent categories, and conversation flows. The prototype covered three support domains and needed a way for a student to reach someone when the conversation was not helping. The university later adapted my prototype, refined it, and connected it to the byui.edu site.",
      "That part of the product interests me as much as the answer itself. A student may need more context, help with a specific situation, or a staff member who can take action. Continuing to generate responses can add work for them if none of those responses gets them closer to a resolution.",
      "I would measure the handoff separately from the answer path. I would want to understand where students escalate and whether the next step resolves their question. I don’t have public usage data from the campus beta that answers those questions yet.",
      "For the next assistant I work on, I want the requirements to describe what happens when it cannot help, including how someone gets to a person. That belongs in the initial scope.",
    ],
  },
  {
    slug: "auditai-case-study",
    title: "What I’d measure on another agent project",
    date: "2026-03-10",
    updatedDate: "2026-09-06",
    excerpt: "A follow-up to the reported workflow improvements in AuditAI.",
    projectId: "auditai-ics",
    content: [
      "AuditAI reached operational use with six internal agents. The project reported less manual labor on scoped tasks, but I can’t share the underlying measurements here. Those results also do not tell me how every workflow changed.",
      "If I were starting a similar project, I would set up a small set of representative tasks before expanding the agent work. I would agree with reviewers on what acceptable output looks like and record where they still need to intervene.",
      "I would look at total effort, including the time spent checking and correcting output. A faster first draft might still leave substantial work for someone else. I would also separate results by task, since an overall average could hide a workflow that became harder.",
      "That is the evaluation work I would prioritize next. The reported improvements describe the completed project; this is how I would try to understand a future one in more detail.",
    ],
  },
  {
    slug: "how-i-spec-ai-features",
    title: "What I put in an assistant spec",
    date: "2025-11-18",
    updatedDate: "2026-09-07",
    excerpt:
      "Supported intents, answer behavior, and the route to human support.",
    projectId: "byui-chatbot",
    content: [
      "I was the sole developer of the campus Support Agent prototype and wrote its requirements and PRD, covering intent categories, conversation flows, and escalation logic. Describing what an assistant should answer did not cover what it should do when the conversation went beyond its scope. The university later adapted my prototype, refined it, and connected it to the byui.edu site.",
      "I want a spec to make those boundaries easy to discuss. It should describe the supported questions, the information available to the assistant, and what happens when that information is insufficient. Examples can help the team examine the behavior before implementing it.",
      "For example, “include sources a person can check” describes both an output and a way for someone to verify it. That is an illustrative requirement, not an excerpt from an internal document. The point is to be specific enough that a reviewer can inspect the result.",
      "I would revisit those examples as people try the product. If the same unsupported question comes up repeatedly, that is something to consider in the next scope discussion. Keeping the requirements close to those observations is part of the work.",
    ],
  },
];
export function getPostBySlug(slug: string) {
  return writingPosts.find((p) => p.slug === slug);
}
export function readTimeMinutes(post: WritingPost) {
  return Math.max(
    1,
    Math.ceil(post.content.join(" ").split(/\s+/).length / 200),
  );
}
export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
