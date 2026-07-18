/**
 * Shared TypeScript shapes for portfolio content (projects, jobs, skills).
 * Replace bracketed placeholder strings in `src/data/*` with your real copy.
 */

export type Project = {
  id: string;
  name: string;
  year: string;
  /** Shown on home teaser cards, e.g. “Platform & AI”. */
  category?: string;
  /** One-line problem statement — leads the card (business context, not stack). */
  problem: string;
  /** Key outcome metric, bolded on cards (e.g. “~50% less manual labor on targeted tasks”). */
  outcome: string;
  /** My role + org, shown under the outcome (e.g. “IT Project Manager · ICS”). */
  role: string;
  /** Long-form bullets — used inside case studies, not on cards. */
  description: string[];
  /** Tech/stack tags — shown inside case studies, not on cards. */
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  /** When set, card media renders a labeled abstract artifact placeholder instead of the image. */
  artifactLabel?: string;
  /** Primary action: internal case study path (e.g. `/projects/auditai/`). */
  href: string;
  featured?: boolean;
  /** Home teaser link line (e.g. “How I shipped it →”). */
  teaserCta?: string;
  /** Full card primary button label. */
  ctaLabel?: string;
  /** One-line outcomes for teasers / cards (e.g. “~30% automation”). */
  metrics?: string[];
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
