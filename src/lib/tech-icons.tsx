import type { ComponentType } from "react";
import {
  SiClaude,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGnubash,
  SiHuggingface,
  SiJavascript,
  SiJira,
  SiLangchain,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import {
  Binary,
  Cloud,
  Code2,
  FileText,
  ListChecks,
  MapPinned,
  MessageSquare,
  MousePointer2,
  Search,
  Server,
  Users,
  Workflow,
} from "lucide-react";
import { skillCategories } from "@/data/skills";

export type TechIconComponent = ComponentType<{ className?: string }>;

/**
 * Shared map for skills grid, toolkit, and marquee (`key` matches data files).
 */
export const TECH_ICON_MAP: Record<string, TechIconComponent> = {
  azuredevops: Workflow,
  jira: SiJira,
  figma: SiFigma,
  notion: SiNotion,
  agile: ListChecks,
  aws: Cloud,
  azure: Server,
  terraform: SiTerraform,
  docker: SiDocker,
  githubactions: SiGithubactions,
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  sql: SiPostgresql,
  bash: SiGnubash,
  nextjs: SiNextdotjs,
  react: SiReact,
  nodejs: SiNodedotjs,
  openai: SiOpenai,
  rest: Code2,
  git: SiGit,
  github: SiGithub,
  scikitlearn: SiScikitlearn,
  pandas: SiPandas,
  numpy: SiNumpy,
  huggingface: SiHuggingface,
  langchain: SiLangchain,
  claude: SiClaude,
  roadmapping: MapPinned,
  prds: FileText,
  userresearch: Search,
  stakeholders: Users,
  promptengineering: MessageSquare,
  rag: Binary,
  cursor: MousePointer2,
};

/** Shown on home tech marquee — every skill from `skills.ts` plus common delivery/infra tools (deduped). */
function buildMarqueeTech(): { key: string; label: string }[] {
  const seen = new Set<string>();
  const out: { key: string; label: string }[] = [];
  for (const cat of skillCategories) {
    for (const item of cat.items) {
      if (seen.has(item.iconKey)) continue;
      seen.add(item.iconKey);
      out.push({ key: item.iconKey, label: item.name });
    }
  }
  return out;
}

export const MARQUEE_TECH = buildMarqueeTech();
