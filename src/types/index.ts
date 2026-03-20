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
  description: string[];
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
  featured?: boolean;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  bullets: string[];
  /** Path under /public for a logo, or empty to show initials */
  logoSrc?: string;
  logoAlt?: string;
  detail?: string;
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
