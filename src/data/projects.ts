import type { Project } from "@/types";

/**
 * Project cards — resume-backed; replace `href` with live demo/repo URLs when you have them.
 */
export const projects: Project[] = [
  {
    id: "u2-kbxcom",
    name: "U2 — Unified Property/Utility Billing SaaS",
    year: "2025",
    category: "Full-stack product",
    description: [
      "Co-built U2 for the Unified Property/Utility Billing SaaS, targeting a $340M serviceable market.",
      "Wrote PRDs, prioritized across three investor pillars, and used legacy benchmarking to justify the roadmap.",
      "Designed an AI analytics roadmap (six ML capabilities) and deployed on AWS; accelerated build with AI-assisted dev tools.",
    ],
    tags: ["AWS", "React", "TypeScript", "Product"],
    imageSrc: "/u2.png",
    imageAlt: "U2 Unified Property/Utility Billing SaaS logo",
    href: "https://www.linkedin.com/in/ethantrent",
    teaserCta: "Product story →",
    ctaLabel: "View overview",
    featured: true,
  },
  {
    id: "byui-chatbot",
    name: "BYU–I ChatBot",
    year: "2025",
    category: "RAG · campus AI",
    description: [
      "Prototyped an AI-powered campus chatbot, now live in beta at BYU–Idaho for 20,000+ students across Financial Aid, Registration, and Tech support.",
      "Defined intent categories, conversational flows, and escalation logic; authored requirements and PRD for a prototype adopted into institutional deployment.",
    ],
    tags: ["Python", "LangChain", "OpenAI", "RAG"],
    imageSrc: "/projects/placeholder-rag.svg",
    imageAlt: "Abstract visual for BYU–I campus chatbot",
    href: "https://www.linkedin.com/in/ethantrent",
    teaserCta: "Campus chatbot →",
    ctaLabel: "View overview",
    featured: true,
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
    imageAlt: "Abstract visual for Coding Interviews leadership",
    href: "https://www.linkedin.com/in/ethantrent",
    teaserCta: "Leadership story →",
    ctaLabel: "View overview",
    featured: true,
  },
];
