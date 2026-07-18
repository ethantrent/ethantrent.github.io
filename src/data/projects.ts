import type { Project } from "@/types";

/**
 * Case study cards — resume-backed. Cards lead with problem → outcome → role;
 * `description` and `tags` feed the long-form case study pages, not the cards.
 */
export const projects: Project[] = [
  {
    id: "auditai-ics",
    name: "AuditAI — Multi-agent automation (ICS)",
    year: "2026",
    category: "AI PM · Agentic systems",
    problem:
      "Manual steps in repeatable audit workflows drained capacity meant for judgment-heavy review — and any AI assist had to survive scrutiny from Auditing and General Counsel.",
    outcome: "~50% less manual labor on targeted tasks · 6 agents shipped",
    role: "IT Project Manager · ICS (global nonprofit)",
    description: [
      "Led discovery and operational rollout of six internal AI agents for a global nonprofit audit organization — multi-agent orchestration over manual review, classification, and routing workflows.",
      "Partnered with Auditing, engineering, and General Counsel on compliant releases: human-in-the-loop handoffs, escalation when model confidence was low, and audit trails suitable for regulatory scrutiny.",
      "Measured impact on representative workflows: ~30% automation of common audit processes and ~50% reduction in manual labor time on targeted tasks (definitions agreed with audit leadership).",
    ],
    tags: ["Multi-agent", "LangChain", "OpenAI", "Compliance", "PM"],
    imageSrc: "/artifacts/auditai-architecture.svg",
    imageAlt: "AuditAI multi-agent architecture: six agents, confidence gate, human review, audit trail",
    href: "/projects/auditai/",
    metrics: ["6 agents", "~30% automation", "~50% labor reduction", "50,000+ auditors on platform"],
    teaserCta: "Read case study →",
    ctaLabel: "Read case study",
    featured: true,
  },
  {
    id: "u2-kbxcom",
    name: "U2 — Unified Property/Utility Billing SaaS",
    year: "2025",
    category: "Full-stack product",
    problem:
      "Property managers and utility providers run billing across fragmented legacy tools — rework, billing errors, and no unified view of a tenant’s account.",
    outcome: "Live product on AWS targeting a $340M SOM",
    role: "Developer intern with product ownership · KBXCOM",
    description: [
      "Co-built U2 for the Unified Property/Utility Billing SaaS, targeting a $340M serviceable market.",
      "Wrote PRDs, prioritized across three investor pillars, and used legacy benchmarking to justify the roadmap.",
      "Designed an AI analytics roadmap (six ML capabilities) and deployed on AWS; accelerated build with AI-assisted dev tools.",
    ],
    tags: ["AWS", "React", "TypeScript", "Product"],
    imageSrc: "/u2.png",
    imageAlt: "U2 logo — unified property and utility billing",
    href: "/projects/u2/",
    metrics: ["$340M SOM", "Live product"],
    teaserCta: "Read case study →",
    ctaLabel: "Read case study",
    externalHref: "https://u2qbo.tech",
    externalCtaLabel: "Visit live product",
    featured: true,
  },
  {
    id: "byui-chatbot",
    name: "BYU–I ChatBot",
    year: "2025",
    category: "RAG · campus AI",
    problem:
      "20,000+ students bounced between Financial Aid, Registration, and Tech support for routine answers — automation had to protect trust, not just deflect tickets.",
    outcome: "Live beta serving 20,000+ students",
    role: "Product lead, prototype → institutional beta · BYU–Idaho",
    description: [
      "Prototyped an AI-powered campus chatbot, now live in beta at BYU–Idaho for 20,000+ students across Financial Aid, Registration, and Tech support.",
      "Defined intent categories, conversational flows, and escalation logic; authored requirements and PRD for a prototype adopted into institutional deployment.",
      "Designed evaluation criteria for answer quality and fallback paths when retrieval or safety checks failed — balancing automation with responsible handoff to human staff.",
    ],
    tags: ["Python", "LangChain", "OpenAI", "RAG", "Agentic UX"],
    imageSrc: "/artifacts/byui-rag-flow.svg",
    imageAlt: "BYU–I ChatBot RAG escalation flow: intent routing, retrieval, safety checks, answer or staff handoff",
    href: "/projects/byui-chatbot/",
    metrics: ["20,000+ students in scope", "Live beta"],
    teaserCta: "Read case study →",
    ctaLabel: "Read case study",
    featured: true,
  },
  {
    id: "coding-interviews",
    name: "Coding Interviews club",
    year: "2025",
    category: "Program leadership",
    problem:
      "CS students were failing technical interviews for lack of deliberate practice — and the club meant to help had 11 members and no outcome tracking.",
    outcome: "11 → 30+ members · 40% internship rate (active cohort)",
    role: "Program lead · BYU–Idaho",
    description: [
      "Owned a technical interview prep program end to end: curriculum, weekly workshops, and feedback loops — treating the club like a lightweight learning product.",
      "Scaled active membership from 11 to 30+ in two semesters using surveys, iteration on session design, and peer-led accountability.",
      "Tracked outcomes like PM metrics: 40% of active members landed internships after participation.",
    ],
    tags: ["Leadership", "Community", "Interview prep"],
    imageSrc: "/projects/coding-club-icon.svg",
    imageAlt: "Network icon for peer technical community program",
    href: "/projects/coding-interviews/",
    metrics: ["11 → 30+ members", "40% internship rate (active cohort)"],
    teaserCta: "Read case study →",
    ctaLabel: "Read case study",
    featured: false,
  },
];
