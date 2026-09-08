/** Role connections describe the work, not employment titles or hiring eligibility. */
export const capabilities = [
  {
    title: "AI product judgment",
    body: "I defined the assistant’s scope and success measures, analyzed search and support behavior with SQL and Python, and brought the findings and options into a product decision memo.",
    example: "Discovery brief and analytics",
    href: "/projects/financial-literacy-discovery/#decisions",
    foundation: "At ICS, I supported discovery and rollout for six internal agents. As U2’s sole developer, I handled requirements directly with MadisonTek’s founder.",
    earlier: [
      { label: "AuditAI · Discovery and rollout", href: "/projects/auditai/#contribution" },
      { label: "U2 · Requirements to software", href: "/projects/u2/#contribution" },
    ],
    tools: "Discovery · Requirements · SQL · Python · Product metrics",
  },
  {
    title: "AI systems and developer platforms",
    body: "I built the citation-first assistant, defined its conversation flows, and included a bounded read-only MCP/tool example. I also prepared setup and troubleshooting instructions for other developers.",
    example: "Assistant implementation and setup",
    href: "/projects/financial-literacy-rag/#decisions",
    foundation: "I was the sole developer of the BYU–I Support Agent prototype and authored its requirements, intent categories, conversation flows, and escalation logic. The university adapted my prototype, refined it, and connected it to the byui.edu site; institutional integration and operation involved others.",
    earlier: [{ label: "BYU–I · Prototype and conversation design", href: "/projects/byui-chatbot/#contribution" }],
    tools: "RAG · APIs · MCP · Conversation design · Developer documentation",
  },
  {
    title: "Evaluation and security",
    body: "I assembled evaluation cases, examined retrieval and agent failures, and documented release criteria, tool permissions, and residual risks. Passing scores and verified control effectiveness are not reported here.",
    example: "Evaluation and release criteria",
    href: "/projects/eval-launch-readiness/#decisions",
    foundation: "AuditAI kept people responsible for review. Its reported improvements apply to scoped tasks; the underlying measurements are not included here.",
    earlier: [{ label: "AuditAI · Outcome and limitations", href: "/projects/auditai/#results" }],
    tools: "Evaluation · Failure analysis · Human review · Agent permissions",
  },
  {
    title: "Technical teaching and adoption",
    body: "I prepared setup guides, recorded demonstrations, and workshops on evaluating a citation-first RAG assistant and on MCP, Claude Code, and agent guardrails. Attendance, feedback, and adoption outcomes are not reported here.",
    example: "Workshops and supporting materials",
    href: "/projects/eval-launch-readiness/#decisions",
    foundation: "I founded a voluntary interview-prep club and adjusted its workshops and curriculum using weekly member feedback.",
    earlier: [{ label: "Coding Interviews · Workshops and feedback", href: "/projects/coding-interviews/#decisions" }],
    tools: "Technical writing · Demos · Workshops · Onboarding · Feedback",
  },
];
