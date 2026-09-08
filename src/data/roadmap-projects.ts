import type { Project } from "../types";
import type { CaseSection } from "./case-studies";

/**
 * Local editorial draft: the user requested completed-work language for the roadmap.
 * These descriptions are assumptions, not verified accomplishments. Do not infer
 * dates, degrees, employers, customers, measurements, or existing evidence files.
 * See review/README.md before any publication or change of contentStatus.
 */
export const roadmapProjects: Project[] = [
  {
    id: "financial-literacy-rag",
    contentStatus: "assumed-complete",
    name: "Building a citation-first AI assistant",
    year: "Independent project",
    category: "AI systems and developer tools",
    problem: "Financial-information support with checkable sources and clear boundaries on what the assistant can do.",
    contribution: "I built the assistant, defined its conversation flows and source boundaries, and prepared setup guides and demos for other builders.",
    decision: "Connect useful answers to source evidence, with abstention, human handoff, and bounded tool access.",
    outcome: "An assistant implementation with evaluation coverage and reusable onboarding materials. Answer-quality and adoption measurements are not included here.",
    role: "Product requirements, implementation, and developer documentation",
    status: "Independent public-data project",
    presentation: { kind: "text" },
    href: "/projects/financial-literacy-rag/",
    featured: true,
    tags: ["RAG", "Conversation design", "MCP", "Developer experience"],
    description: ["The implementation perspective on one financial-information support project."],
  },
  {
    id: "eval-launch-readiness",
    contentStatus: "assumed-complete",
    name: "Evaluating and preparing an AI system for release",
    year: "Independent project",
    category: "Evaluation and security",
    problem: "Make answer quality, failure modes, and tool permissions part of the release decision for the same assistant.",
    contribution: "I built an evaluation package, examined retrieval and agent failure modes, and documented release criteria, controls, and residual risks.",
    decision: "Use task evidence and risk-specific checks to support release judgment; retain human review of consequential decisions.",
    outcome: "An evaluation and launch-readiness package with teaching materials. Pass rates, verified control effectiveness, and a production release outcome are not reported here.",
    role: "Evaluation, risk analysis, release criteria, and technical teaching",
    status: "Evaluation of the same independent assistant",
    presentation: { kind: "text" },
    href: "/projects/eval-launch-readiness/",
    featured: true,
    tags: ["Evaluation", "Agent controls", "Release judgment", "Workshops"],
    description: ["Evaluation and agentic red-team work, presented as one case."],
  },
  {
    id: "financial-literacy-discovery",
    contentStatus: "assumed-complete",
    name: "Discovering and measuring a financial-information support experience",
    year: "Independent project",
    category: "Product discovery and analytics",
    problem: "Define useful self-service before treating more answers or fewer escalations as success.",
    contribution: "I framed the support problem, defined scope and success measures, and built a search-analytics package to inform product priorities.",
    decision: "Measure progress toward a resolved task alongside answer behavior, review effort, and escalation.",
    outcome: "A discovery brief, analytics package, and product decision memo for the same assistant. Customer research findings and measured user impact are not included here.",
    role: "Discovery, requirements, analytics, and product communication",
    status: "Discovery and measurement for the same independent project",
    presentation: { kind: "text" },
    href: "/projects/financial-literacy-discovery/",
    featured: true,
    tags: ["Discovery", "SQL", "Python", "Product metrics"],
    description: ["Discovery and search/support analytics, presented as one case."],
  },
];

export const roadmapCases: Record<string, CaseSection[]> = {
  "financial-literacy-rag": [
    {
      id: "problem", title: "Problem and constraints", aliases: [],
      paragraphs: [
        "This independent project explored financial-information support using public investor-education material from FINRA and the SEC. The assistant needed to help a reader find and understand information while keeping sources available for inspection.",
        "The scope excluded personalized investment advice and financial transactions. Discovery, implementation, and evaluation are three perspectives on this one project; this case covers the assistant and the materials that help another developer work with it.",
      ],
    },
    {
      id: "contribution", title: "My contribution", aliases: [],
      paragraphs: [
        "I built the citation-first assistant and authored its requirements, conversation flows, source boundaries, and abstention and handoff behavior. I connected that product definition to the retrieval implementation and an initial evaluation set.",
        "I also prepared developer setup instructions, troubleshooting material, and recorded demonstrations. The aim of those materials was to let another builder understand the system and examine its behavior without relying on a live explanation from me.",
      ],
    },
    {
      id: "decisions", title: "Decisions and evidence", aliases: [], paragraphs: [],
      groups: [
        {
          title: "Answer boundaries and implementation",
          paragraphs: ["I defined supported questions, source expectations, refusal or redirection, and the route to human support in the requirements. Those behaviors made the assistant’s scope reviewable alongside the answer path.", "I worked through corpus boundaries, ingestion and chunking, and lexical, semantic, and hybrid retrieval comparisons. I included citation checks, abstention cases, and a bounded read-only MCP/tool example. The implementation and test record are needed to inspect the exact configuration and results."],
        },
        {
          title: "Helping another developer get started",
          paragraphs: ["I prepared a setup guide, starter material, troubleshooting notes, and demonstrations explaining the assistant’s behavior and limits. These materials connect implementation to developer onboarding; they do not establish that an audience adopted the system."],
        },
      ],
    },
    {
      id: "results", title: "Outcome and limitations", aliases: [],
      materialsNote: "Supporting materials are not linked here: code and architecture, evaluation runs, setup instructions, and recordings. The results cannot be reproduced from this account alone.",
      paragraphs: ["The work brought an assistant implementation, evaluation coverage, and developer onboarding materials into one project. This account does not report a benchmark score, production deployment, customer adoption, or a reduction in support effort."],
    },
    {
      id: "differently", title: "What I learned", aliases: [],
      paragraphs: ["The product question extends beyond generating an answer: a reader needs a way to check it, and a developer needs a way to reproduce and inspect its behavior. Those two needs connect conversation design, evaluation, and documentation.", "The next iteration should follow the recorded failure patterns and setup feedback. Specific lessons from individual runs or participants belong with their supporting evidence."],
    },
  ],
  "eval-launch-readiness": [
    {
      id: "problem", title: "Problem and constraints", aliases: [],
      paragraphs: ["This case covers evaluation and agent controls for the same public-data financial-information assistant. A convincing demonstration alone cannot establish whether the system handles unsupported questions, misleading sources, or tool requests reliably.", "The work combined an evaluation and launch-readiness package with an agentic red-team review. Financial actions stayed outside scope; consequential actions in the control exercises were simulated."],
    },
    {
      id: "contribution", title: "My contribution", aliases: [],
      paragraphs: ["I assembled evaluation cases, organized failure categories, reviewed traces, and documented quality gates and release criteria. I examined retrieval and generation failures separately so the evaluation could inform a specific change.", "I also examined agent and tool risks, documented controls and residual risks, and prepared two workshops connecting the technical checks to product and release decisions."],
    },
    {
      id: "decisions", title: "Decisions and evidence", aliases: [], paragraphs: [],
      groups: [
        {
          title: "Failure analysis",
          paragraphs: ["The evaluation covered answerable and unanswerable questions, ambiguous requests, citation failures, injection attempts, and tool authorization. I combined deterministic checks with human review and documented the calibration needed for model-based judging."],
        },
        {
          title: "Tool permissions and residual risks",
          paragraphs: ["The control review considered permissions, sensitive disclosure, output handling, supply-chain risks, and excessive autonomy. Each finding needs an observed attack path, mitigation, residual risk, and verification result; a checklist alone does not prove a control worked."],
        },
        {
          title: "Release criteria and workshops",
          paragraphs: ["I translated failure categories into release criteria, monitoring needs, escalation, and rollback considerations. The release memo connected the evidence to remaining uncertainty rather than presenting a single aggregate score as a release decision.", "I prepared two workshops: “How to Evaluate a Citation-First RAG Assistant” and “MCP, Claude Code, and Agent Guardrails.” The material connected retrieval diagnosis, release evidence, and bounded tool behavior to exercises another builder could follow."],
        },
      ],
    },
    {
      id: "results", title: "Outcome and limitations", aliases: [],
      materialsNote: "Supporting materials are not linked here: evaluation runs, the control review and release memo, and both workshops’ slides, labs, and recordings. Quality, safety, and readiness conclusions require that evidence.",
      paragraphs: ["The output was an evaluation and launch-readiness package, an agent-control review, and technical teaching materials. This case does not report a passing score, verified attack prevention, a successful production launch, or workshop attendance.", "The material here is not a certification or a claim of regulatory compliance."],
    },
    {
      id: "differently", title: "What I learned", aliases: [],
      paragraphs: ["Evaluation is useful when it changes a product or release decision. Keeping failures tied to tasks, controls, and explicit criteria makes that connection inspectable.", "Security review also needs a narrow claim: what was exercised, under which permissions, and what remained unresolved. A successful check on one path does not establish that the whole system is safe."],
    },
  ],
  "financial-literacy-discovery": [
    {
      id: "problem", title: "Problem and constraints", aliases: [],
      paragraphs: ["This is the discovery and analytics perspective on the financial-information support project. The starting question was how a search or support experience could help someone make progress on an information task.", "The project used public investor-education material. Analytics examples require clear data provenance, and illustrative data cannot establish real customer behavior or business impact."],
    },
    {
      id: "contribution", title: "My contribution", aliases: [],
      paragraphs: ["I framed the problem, defined the intended audience and scope, and connected success measures to task completion and support boundaries. I prepared a discovery and safety brief alongside a search/support analytics package.", "I used SQL and Python analysis and a dashboard to structure questions about search behavior, escalation, and repeat use. I brought the product framing and analysis together in a decision memo and walkthrough."],
    },
    {
      id: "decisions", title: "Decisions and evidence", aliases: [], paragraphs: [],
      groups: [
        {
          title: "Defining useful support",
          paragraphs: ["I defined scope and non-goals alongside success and guardrail metrics. The discovery brief separated the problem, available evidence, options, and recommendation. Research findings require a record of whether the inputs came from actual participants or explicitly labeled proxies."],
        },
        {
          title: "Measures and product priorities",
          paragraphs: ["I structured the analysis around search volume and intent, zero results, reformulation, clicks, abandonment or escalation, completion, and repeat use. The metric tree connected these observations to successful self-service and the effort needed to get there.", "I prepared a plain-language executive explanation and an analytics walkthrough. The materials explain how to interpret the measures and where they are insufficient to support a product decision."],
        },
      ],
    },
    {
      id: "results", title: "Outcome and limitations", aliases: [],
      materialsNote: "Supporting materials are not linked here: the discovery brief, analysis and dashboard, decision memo, and walkthrough. Numerical claims require data provenance, a baseline, method, and limitations.",
      paragraphs: ["The output was a discovery brief, an analytics package, and a decision memo for the assistant. This account does not report interview findings, an experiment lift, adoption, or a measured improvement in task completion."],
    },
    {
      id: "differently", title: "What I learned", aliases: [],
      paragraphs: ["A metric needs an interpretation tied to the user’s task. More answers, fewer escalations, or repeated visits can each have different meanings depending on whether someone found useful help.", "I would use the evidence record to decide which uncertainty matters most next. A polished dashboard should make those uncertainties easier to discuss, rather than conceal them."],
    },
  ],
};
