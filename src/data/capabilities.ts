/** Confirmed contributions and explicit learning interests, shared with the assistant. */
export const capabilities = [
  {
    title: "AI product judgment",
    body: "At ICS, I worked with the Audit team to understand its needs and helped take six internal agents from discovery into operational use. As U2’s sole developer, I handled product requirements directly with MadisonTek’s founder.",
    example: "AuditAI · Discovery and rollout",
    href: "/projects/auditai/#contribution",
    foundation: "Working prototypes made U2’s requirements concrete during discussions with the founder. Faster prototyping does not, by itself, establish customer value.",
    earlier: [
      { label: "U2 · Requirements to software", href: "/projects/u2/#decisions" },
    ],
    tools: "Discovery · Requirements · Prototyping · Cross-functional delivery",
  },
  {
    title: "AI systems and developer platforms",
    body: "I was the sole developer of the BYU–I Support Agent prototype and authored its requirements, intent categories, conversation flows, and escalation logic. The university adapted my prototype, refined it, and connected it to the byui.edu site; institutional integration and operation involved others.",
    example: "BYU–I · Prototype and conversation design",
    href: "/projects/byui-chatbot/#contribution",
    foundation: "Cravyr and ProfScore offer public examples of application and API integration code. Their READMEs explain setup and compatibility limits. Developer platforms remain an area I’m interested in developing further.",
    earlier: [{ label: "Explore application and API code", href: "/projects/#public-code" }],
    tools: "Python · RAG · React · TypeScript · APIs · Conversation design",
  },
  {
    title: "Evaluation and security",
    body: "For the BYU–I prototype, I defined supported questions and escalation to a person. AuditAI kept people responsible for reviewing agent output. These cases explain those boundaries and distinguish reported outcomes from measurements that are not publicly available.",
    example: "BYU–I · Support boundaries",
    href: "/projects/byui-chatbot/#decisions",
    foundation: "I’m developing my evaluation and security knowledge, with particular interest in answer quality, failure cases, and when human review is needed.",
    earlier: [{ label: "AuditAI · Outcome and limitations", href: "/projects/auditai/#results" }],
    tools: "Human review · Escalation logic · Outcome interpretation",
  },
  {
    title: "Technical teaching and adoption",
    body: "I founded the Coding Interviews club at BYU–Idaho, organized workshops, and revised its curriculum using weekly member feedback over two semesters.",
    example: "Coding Interviews · Workshops and feedback",
    href: "/projects/coding-interviews/#decisions",
    foundation: "Membership grew from 11 to 30+ active members. Reported internship placements do not establish that the club caused those outcomes, and attendance alone does not establish learning.",
    earlier: [{ label: "Coding Interviews · Outcome and limitations", href: "/projects/coding-interviews/#results" }],
    tools: "Workshops · Curriculum · Peer learning · Member feedback",
  },
];
