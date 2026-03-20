import type { ExperienceEntry } from "@/types";

/**
 * Professional experience — aligned to Ethan Trent’s resume (verified transcript).
 */
export const experience: ExperienceEntry[] = [
  {
    id: "schwab-pm",
    role: "Product Manager Intern",
    company: "Charles Schwab",
    dateRange: "June 2026 — August 2026",
    bullets: [
      "Incoming Summer 2026 on the Conversational AI team (Westlake, TX).",
      "Preparing to contribute to product direction, stakeholder alignment, and shipping in a regulated fintech environment.",
    ],
    logoSrc: "/experience/placeholder-schwab.svg",
    logoAlt: "Charles Schwab",
    detail:
      "Focus will be conversational AI in a large enterprise context — details to update after the internship with projects, metrics, and outcomes.",
  },
  {
    id: "cornell-fellow",
    role: "AI Fellow",
    company: "Cornell Tech × Break Through Tech AI",
    dateRange: "May 2026 — April 2027 · Remote",
    bullets: [
      "Selected from 3,500+ applicants for a 12-month AI/ML fellowship with Cornell faculty; earning the Cornell University Machine Learning Certificate upon completion.",
      "Partnering with an industry company through AI Studio on a real-world ML challenge project (scope TBD).",
    ],
    detail:
      "Program blends academic rigor with industry application — ideal for deepening end-to-end ML product skills alongside formal certification.",
  },
  {
    id: "ics-pm",
    role: "Project Manager Intern",
    company: "Information and Communication Services – Global Nonprofit",
    dateRange: "January 2026 — May 2026 · Riverton, UT",
    bullets: [
      "Drove AWS migration of the Financial Audit System, modernizing the platform for 50,000+ volunteer auditors across 31,000 units; managed sprint planning and release roadmaps in Azure DevOps.",
      "Spearheaded discovery-phase development and operational use of AuditAI — 6 internal AI agents for the Audit department, automating ~30% of common processes and reducing ~50% of manual labor time.",
      "Aligned engineering, Auditing, and General Counsel on parallel maintenance and modernization workstreams, delivering regulatory-compliant releases on a 2-week sprint cadence.",
    ],
    logoSrc: "/1200x675size-English-square.jpg",
    logoAlt: "The Church of Jesus Christ of Latter-day Saints logo",
    detail:
      "High-stakes environment balancing legacy modernization, compliance, and new AI capability — strong training in cross-functional PM at scale.",
  },
  {
    id: "kbxcom",
    role: "Software Developer Intern",
    company: "KBXCOM – Unified Property/Utility Billing SaaS",
    dateRange: "July 2025 — December 2025 · Rexburg, ID",
    bullets: [
      "Co-built U2, a unified real estate and utility billing SaaS targeting a $340M SOM; defined product requirements and prioritized features across three investor pillars using legacy benchmarking.",
      "Researched AI analytics and designed a roadmap for six ML capabilities (anomaly detection, usage forecasting, equity heatmaps, predictive collections), deployed on AWS.",
      "Compressed PRD-to-prototype cycle from weeks to days using AI-assisted development (Claude Code, Cursor, Codex) for faster validation each sprint.",
    ],
    detail:
      "Combined builder and PM instincts: shipping features, owning discovery, and using modern AI dev workflows to move from spec to prototype quickly.",
  },
];
