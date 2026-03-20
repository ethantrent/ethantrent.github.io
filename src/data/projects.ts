import type { Project } from "@/types";

/**
 * Project cards — resume-backed; replace `href` with live demo/repo URLs when you have them.
 */
export const projects: Project[] = [
  {
    id: "financial-audit-aws",
    name: "Financial Audit System — AWS migration",
    year: "2026",
    category: "Platform & cloud modernization",
    description: [
      "Led platform direction for migrating the Financial Audit System to AWS, supporting 50,000+ volunteer auditors across 31,000 units.",
      "Owned sprint planning and release roadmaps in Azure DevOps with a 2-week cadence and regulatory-compliant delivery.",
      "Partnered across engineering, auditing, and legal to run parallel maintenance and modernization workstreams.",
    ],
    tags: ["AWS", "Azure DevOps", "Product management", "Compliance"],
    imageSrc: "/projects/placeholder-lufas.svg",
    imageAlt: "Abstract placeholder for Financial Audit System modernization",
    href: "https://www.linkedin.com/in/ethantrent",
    featured: true,
  },
  {
    id: "audit-ai",
    name: "AuditAI — internal agent suite",
    year: "2026",
    category: "AI & automation",
    description: [
      "Discovery through operational rollout of six internal AI agents for the Audit department.",
      "Automated roughly 30% of common processes and workflows and cut about half of manual labor time on targeted tasks.",
      "Defined how agents fit into existing audit operations alongside human reviewers and compliance requirements.",
    ],
    tags: ["AI agents", "Operations", "Azure DevOps", "Discovery"],
    imageSrc: "/projects/placeholder-ai.svg",
    imageAlt: "Placeholder for AuditAI program",
    href: "https://www.linkedin.com/in/ethantrent",
    featured: true,
  },
  {
    id: "u2-kbxcom",
    name: "U2 — unified billing SaaS (KBXCOM)",
    year: "2025",
    category: "Full-stack product",
    description: [
      "Co-built U2 for unified real estate and utility billing, targeting a $340M serviceable market.",
      "Wrote PRDs, prioritized across three investor pillars, and used legacy benchmarking to justify the roadmap.",
      "Designed an AI analytics roadmap (six ML capabilities) and deployed on AWS; accelerated build with AI-assisted dev tools.",
    ],
    tags: ["AWS", "React", "TypeScript", "Product", "ML roadmap"],
    imageSrc: "/projects/placeholder-u2.svg",
    imageAlt: "Placeholder for U2 billing platform",
    href: "https://www.linkedin.com/in/ethantrent",
    featured: true,
  },
  {
    id: "byui-support-agent",
    name: "BYU–Idaho Support Agent",
    year: "2025",
    category: "RAG · campus AI",
    description: [
      "Prototyped an AI-powered campus support agent (Python, LangChain, OpenAI, RAG), now in beta for 20,000+ students.",
      "Owned intent categories, conversational flows, escalation logic, requirements, and PRD — adopted into institutional deployment.",
      "Domains: Financial Aid, Registration, and Tech support.",
    ],
    tags: ["Python", "LangChain", "OpenAI", "RAG"],
    imageSrc: "/projects/placeholder-ai.svg",
    imageAlt: "Placeholder for BYU-Idaho support agent",
    href: "https://www.linkedin.com/in/ethantrent",
  },
  {
    id: "coding-interviews",
    name: "Coding Interviews club",
    year: "2025",
    category: "Leadership",
    description: [
      "Founded and led a peer technical interview prep club at BYU–Idaho (April–December 2025).",
      "Grew membership from 11 to 30+ active members in two semesters using surveys and iterative curriculum.",
      "40% of active members landed internships after workshop participation.",
    ],
    tags: ["Leadership", "Community", "Interview prep"],
    imageSrc: "/projects/placeholder-personal.svg",
    imageAlt: "Placeholder for Coding Interviews leadership",
    href: "https://www.linkedin.com/in/ethantrent",
  },
];
