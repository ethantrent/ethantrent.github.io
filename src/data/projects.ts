import type { Project } from "../types";
import { roadmapProjects } from "./roadmap-projects";

/** Approved public facts. The assistant quotes contributions as Ethan's own description. */
export const earlierProjects: Project[] = [
  {
    id: "auditai-ics",
    contentStatus: "verified",
    name: "AuditAI",
    year: "2026",
    category: "Internal AI tools",
    problem:
      "AI assistance for repetitive tasks in a nonprofit Audit department.",
    decision:
      "Use agents for repeatable tasks while keeping people responsible for review.",
    contribution:
      "I helped take six internal AI agents from discovery into operational use, coordinating with the Audit team and supporting rollout.",
    outcome:
      "The project reported about 30% automation of common workflows and 50% less manual labor on scoped tasks.",
    role: "Project management intern · ICS",
    status: "Internal operational use",
    presentation: { kind: "text" },
    href: "/projects/auditai/",
    featured: false,
    tags: ["Discovery", "AI workflows", "Delivery"],
    description: ["Six internal agents in a nonprofit Audit department."],
  },
  {
    id: "byui-chatbot",
    contentStatus: "verified",
    name: "BYU–I Support Agent",
    year: "2025",
    category: "Campus support",
    problem:
      "A support assistant for Financial Aid, Registration, and Tech questions at BYU–Idaho.",
    decision:
      "Define supported questions and a path to a person alongside the assistant's answers.",
    contribution:
      "I was the sole developer of the prototype and authored its requirements, intent categories, conversation flows, and escalation logic.",
    outcome:
      "The university adapted the prototype, refined it, and connected it to the byui.edu site. Usage is not reported here.",
    role: "Sole prototype developer and requirements author · BYU–Idaho",
    status: "Institutional beta · Campus login required",
    presentation: {
      kind: "screenshot",
      src: "/artifacts/byui-support-agent-ui.png",
      alt: "BYU–Idaho Support Agent with suggested questions and a live representative option",
      caption:
        "The institutional beta interface. The live service requires a campus login.",
    },
    href: "/projects/byui-chatbot/",
    featured: false,
    tags: ["RAG", "Python", "Conversation design"],
    description: ["A prototype adopted into an institutional beta."],
    externalHref: "https://supportagent.byui.edu/",
    externalCtaLabel: "Open campus beta (login required)",
  },
  {
    id: "u2-madisontek",
    contentStatus: "verified",
    name: "U2",
    year: "2025–2026",
    category: "Billing software",
    problem: "The product brings property management and utility billing into one system.",
    decision:
      "Use working prototypes to make product requirements concrete.",
    contribution:
      "I was U2’s sole developer and handled product requirements, working directly with MadisonTek’s founder.",
    outcome:
      "AI-assisted development shortened prototype cycles from weeks to days; this describes prototyping, not every feature’s delivery time.",
    role: "Sole developer and product requirements · MadisonTek",
    timeline:
      "Paid internship: July–December 2025. Project work continued into 2026.",
    status: "Development work through 2026",
    presentation: {
      kind: "logo",
      src: "/u2.png",
      alt: "U2 logo",
      caption: "Product work at MadisonTek.",
    },
    href: "/projects/u2/",
    featured: false,
    tags: ["React", "TypeScript", "Prototyping", "Requirements"],
    description: ["A unified property-management and utility-billing product."],
    externalHref: "https://u2qbo.tech",
    externalCtaLabel: "Visit U2",
  },
  {
    id: "coding-interviews",
    contentStatus: "verified",
    name: "Coding Interviews club",
    year: "2025",
    category: "Student leadership",
    problem: "A peer-led technical interview practice group at BYU–Idaho.",
    decision: "Adjust the workshops and curriculum using member feedback.",
    contribution:
      "I founded the club, organized workshops, and revised the curriculum with participants over two semesters.",
    outcome:
      "Membership grew from 11 to 30+ active members. 40% reported landing internships; this does not establish that the club caused those placements.",
    role: "Founder and president · BYU–Idaho",
    status: "Two-semester program",
    presentation: { kind: "text" },
    href: "/projects/coding-interviews/",
    featured: false,
    tags: ["Workshops", "Peer learning"],
    description: ["Peer interview preparation and member-led feedback."],
  },
];
export const projects: Project[] = [...roadmapProjects, ...earlierProjects];
export function getProject(id: string): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}
