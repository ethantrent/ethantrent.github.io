/**
 * Toolkit cards — tuned to Ethan’s stack (Azure DevOps, AWS, AI-assisted dev, LangChain/OpenAI).
 */

export type ToolkitCard = {
  id: string;
  title: string;
  blurb: string;
  panelClass: string;
  iconKeys: string[];
};

export const toolkitCards: ToolkitCard[] = [
  {
    id: "delivery",
    title: "Azure DevOps + Jira",
    blurb:
      "Where I ran sprints and releases for a large audit modernization — backlogs, stakeholders, and shipping on a two-week cadence without breaking compliance.",
    panelClass: "from-sky-600/40 to-blue-900/60",
    iconKeys: ["azuredevops", "jira"],
  },
  {
    id: "infra",
    title: "AWS + Terraform + Docker",
    blurb:
      "Cloud work from migrating core systems to AWS through designing ML-forward analytics roadmaps — infra that has to survive real auditors and real traffic.",
    panelClass: "from-amber-600/35 to-stone-900/70",
    iconKeys: ["aws", "terraform", "docker"],
  },
  {
    id: "code",
    title: "Cursor + Claude + GitHub",
    blurb:
      "PRD-to-prototype in days, not weeks — the same AI-assisted workflow I used at KBXCOM (Claude Code, Cursor, Codex) to validate ideas every sprint.",
    panelClass: "from-violet-600/40 to-slate-900/70",
    iconKeys: ["claude", "cursor", "github", "typescript"],
  },
  {
    id: "ai",
    title: "LangChain + OpenAI + RAG",
    blurb:
      "How I shipped a campus-scale support agent: intents, escalation, and RAG so 20,000+ students get answers on aid, registration, and tech — not generic chat fluff.",
    panelClass: "from-emerald-600/35 to-slate-900/70",
    iconKeys: ["langchain", "openai", "rag"],
  },
];
