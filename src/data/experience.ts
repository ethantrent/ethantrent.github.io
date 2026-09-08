import type { ExperienceEntry } from "../types";
import { publicProfile } from "./public-profile";
import { getProject } from "./projects";
export const experience: ExperienceEntry[] = [
  {
    id: "schwab-pm",
    role: publicProfile.role,
    company: publicProfile.company,
    dateRange: "August 2026 — Present · Westlake, TX",
    context:
      "I work on the Assistants & Search team. Details of my current employer’s internal work are not included in this portfolio.",
    bullets: [],
  },
  {
    id: "cornell-fellow",
    role: "AI Fellow",
    company: "Cornell Tech × Break Through Tech",
    dateRange: "May 2026 — April 2027 · Remote",
    context:
      "A fellowship combining machine-learning coursework and an industry AI Studio challenge. Completed the Cornell Machine Learning Foundations Certificate in August 2026.",
    bullets: [],
  },
  {
    id: "ics-pm",
    role: "Project management intern",
    company: "Information and Communication Services",
    dateRange: "January — May 2026 · Riverton, UT",
    context:
      "I supported an AWS financial-audit platform migration and helped take six internal AuditAI agents from discovery into operational use.",
    bullets: [],
    featuredCaseStudy: {
      href: getProject("auditai-ics").href,
      label: "Inside AuditAI",
    },
  },
  {
    id: "madisontek",
    role: "Software developer intern",
    company: "MadisonTek",
    dateRange: "July — December 2025 · Rexburg, ID",
    context:
      "I was U2’s sole developer and handled product requirements, working directly with MadisonTek’s founder. The paid internship ended in December 2025; project work continued into 2026.",
    bullets: [],
    featuredCaseStudy: {
      href: getProject("u2-madisontek").href,
      label: "Inside U2",
    },
  },
];
