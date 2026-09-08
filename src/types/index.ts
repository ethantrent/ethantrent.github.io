/**
 * Shared TypeScript shapes for portfolio content (projects, jobs, skills).
 */

export type Project = {
  /** Editorial provenance, retained internally even when drafting in completed-work language. */
  contentStatus: "verified" | "assumed-complete";
  id: string;
  name: string;
  year: string;
  /** Distinguishes project involvement from the formal employment period. */
  timeline?: string;
  /** Project category shown beside the year. */
  category?: string;
  /** One-line problem statement — leads the card (business context, not stack). */
  problem: string;
  decision: string;
  contribution: string;
  status: string;
  /** Scoped result shared by project features, case summaries, and the assistant. */
  outcome: string;
  /** My role + org, shown under the outcome (e.g. “IT Project Manager · ICS”). */
  role: string;
  /** Long-form bullets — used inside case studies, not on cards. */
  description: string[];
  /** Tech/stack tags — shown inside case studies, not on cards. */
  tags: string[];
  presentation:
    | { kind: "text" }
    | {
        kind: "screenshot" | "logo";
        src: string;
        alt: string;
        caption: string;
      };
  /** Primary action: internal case study path (e.g. `/projects/auditai/`). */
  href: string;
  featured?: boolean;
  /** Optional second button for external demo when case study is internal. */
  externalHref?: string;
  externalCtaLabel?: string;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  /** One-line context sentence framing the role before the bullets. */
  context?: string;
  bullets: string[];
  /** Path under /public for a logo, or empty to show initials */
  logoSrc?: string;
  logoAlt?: string;
  detail?: string;
  /** Deep-link to the related case study (e.g. AuditAI for the ICS role). */
  featuredCaseStudy?: { href: string; label: string };
};

export type SkillItem = {
  name: string;
  /** Key used by `SkillsGrid` to resolve a react-icons logo */
  iconKey: string;
  borderClass: string;
};

export type SkillCategory = {
  title: string;
  items: SkillItem[];
};
