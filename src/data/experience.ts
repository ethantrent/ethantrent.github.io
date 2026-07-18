import type { ExperienceEntry } from "@/types";

/**
 * Professional experience — aligned to Ethan Trent’s resume (verified transcript).
 * Bullets follow “I [action] [what] → [result/scale]”; context gives the 1-line role frame.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "schwab-pm",
    role: "Digital Product Manager",
    company: "Charles Schwab",
    dateRange: "June 2026 — August 2026",
    context: "Currently on the Conversational AI team (Summer 2026 · Westlake, TX).",
    bullets: [
      "I own product work on conversational AI in a regulated fintech environment — product direction, stakeholder alignment, and shipping with compliance in the loop.",
      "I partner with engineering, design, and risk/compliance stakeholders to define success criteria for probabilistic assistant experiences before release.",
    ],
    logoSrc: "/charles-schwab-corporation-logo.svg.png",
    logoAlt: "Charles Schwab logo",
    detail:
      "Conversational AI product work inside a large regulated enterprise — emphasis on trust, clarity of “good,” and cross-functional shipping discipline.",
  },
  {
    id: "cornell-fellow",
    role: "AI Fellow",
    company: "Cornell Tech × Break Through Tech AI",
    dateRange: "May 2026 — April 2027 · Remote",
    context: "12-month AI/ML fellowship pairing Cornell coursework with an industry AI Studio challenge.",
    bullets: [
      "I was selected from 3,500+ applicants → earning the Cornell University Machine Learning Certificate with Cornell faculty upon completion.",
      "I'm partnering with an industry company through AI Studio on a real-world ML challenge — agentic workflows, evaluation harnesses, and shipping discipline in an academic–industry setting.",
    ],
    logoSrc: "/break_through_tech_logo.jpg",
    logoAlt: "Break Through Tech logo",
    detail:
      "Program blends academic rigor with industry application — deepening end-to-end ML product skills alongside formal certification.",
  },
  {
    id: "ics-pm",
    role: "IT Project Manager",
    company: "Information and Communication Services – Global Nonprofit",
    dateRange: "January 2026 — May 2026 · Riverton, UT",
    context:
      "Technology arm of a global nonprofit — I owned AI capability and AWS modernization for the Audit department.",
    bullets: [
      "I drove AWS migration of the Financial Audit System → modernized the platform for 50,000+ volunteer auditors across 31,000 units, managing sprints and release roadmaps in Azure DevOps.",
      "I led discovery and operational rollout of AuditAI, six internal agentic AI assistants → ~30% automation of common processes and ~50% less manual labor time on scoped tasks.",
      "I aligned engineering, Auditing, and General Counsel on trust, safety, and compliance → release criteria, escalation paths, and AI shipping on the same 2-week cadence as production work.",
    ],
    logoSrc: "/1200x675size-English-square.jpg",
    logoAlt: "The Church of Jesus Christ of Latter-day Saints logo",
    detail:
      "High-stakes environment balancing legacy modernization, compliance, and new AI capability — strong training in cross-functional PM at scale.",
    featuredCaseStudy: { href: "/projects/auditai/", label: "AuditAI case study" },
  },
  {
    id: "kbxcom",
    role: "Software Developer Intern",
    company: "KBXCOM – Unified Property/Utility Billing SaaS",
    dateRange: "July 2025 — December 2025 · Rexburg, ID",
    logoSrc: "/u2.png",
    logoAlt: "U2 logo",
    context: "Founding-stage SaaS startup — builder role with product ownership of PRDs and roadmap.",
    bullets: [
      "I co-built U2, a unified property/utility billing SaaS → live product targeting a $340M SOM, with features prioritized across three investor pillars using legacy benchmarking.",
      "I researched AI analytics and designed a roadmap for six ML capabilities (anomaly detection, usage forecasting, equity heatmaps, predictive collections) → deployed on AWS as the product's differentiation story.",
      "I compressed the PRD-to-prototype cycle from weeks to days using AI-assisted development (Claude Code, Codex) → faster validation every sprint.",
    ],
    detail:
      "Combined builder and PM instincts: shipping features, owning discovery, and using modern AI dev workflows to move from spec to prototype quickly.",
    featuredCaseStudy: { href: "/projects/u2/", label: "U2 case study" },
  },
];
