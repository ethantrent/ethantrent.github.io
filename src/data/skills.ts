import type { SkillCategory } from "@/types";

/**
 * Skills aligned to resume — `iconKey` maps in `src/lib/tech-icons.tsx`.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Product & management",
    items: [
      { name: "Roadmapping", iconKey: "roadmapping", borderClass: "border-accent/40" },
      { name: "PRDs", iconKey: "prds", borderClass: "border-sky-500/50" },
      { name: "Azure DevOps", iconKey: "azuredevops", borderClass: "border-blue-500/50" },
      { name: "User research", iconKey: "userresearch", borderClass: "border-teal-500/50" },
      { name: "Jira", iconKey: "jira", borderClass: "border-sky-500/50" },
      { name: "Agile / Scrum", iconKey: "agile", borderClass: "border-emerald-500/50" },
      { name: "Stakeholder management", iconKey: "stakeholders", borderClass: "border-violet-500/50" },
    ],
  },
  {
    title: "Languages & engineering",
    items: [
      { name: "Python", iconKey: "python", borderClass: "border-cyan-500/50" },
      { name: "JavaScript", iconKey: "javascript", borderClass: "border-yellow-500/50" },
      { name: "TypeScript", iconKey: "typescript", borderClass: "border-blue-500/50" },
      { name: "SQL", iconKey: "sql", borderClass: "border-orange-500/50" },
      { name: "Git", iconKey: "git", borderClass: "border-red-500/40" },
      { name: "GitHub", iconKey: "github", borderClass: "border-fg/30" },
    ],
  },
  {
    title: "Cloud & frameworks",
    items: [
      { name: "AWS", iconKey: "aws", borderClass: "border-amber-500/50" },
      { name: "React", iconKey: "react", borderClass: "border-cyan-400/50" },
      { name: "Node.js", iconKey: "nodejs", borderClass: "border-green-500/50" },
      { name: "Next.js", iconKey: "nextjs", borderClass: "border-fg/30" },
    ],
  },
  {
    title: "AI / ML",
    items: [
      { name: "Claude", iconKey: "claude", borderClass: "border-orange-400/50" },
      { name: "OpenAI", iconKey: "openai", borderClass: "border-emerald-500/50" },
      { name: "scikit-learn", iconKey: "scikitlearn", borderClass: "border-orange-500/50" },
      { name: "pandas", iconKey: "pandas", borderClass: "border-sky-500/50" },
      { name: "NumPy", iconKey: "numpy", borderClass: "border-blue-600/50" },
      { name: "LangChain", iconKey: "langchain", borderClass: "border-green-600/50" },
      { name: "Hugging Face", iconKey: "huggingface", borderClass: "border-yellow-500/50" },
      { name: "Prompt engineering", iconKey: "promptengineering", borderClass: "border-violet-500/50" },
      { name: "RAG", iconKey: "rag", borderClass: "border-accent/50" },
    ],
  },
];
