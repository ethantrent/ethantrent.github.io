import { roadmapCases } from "./roadmap-projects";

export type CaseSection = {
  id: string;
  title: string;
  aliases: string[];
  paragraphs: string[];
  materialsNote?: string;
  groups?: {
    title: string;
    paragraphs: string[];
  }[];
  artifacts?: {
    src: string;
    alt: string;
    caption: string;
    width?: number;
    height?: number;
  }[];
};
export const caseStudies: Record<string, CaseSection[]> = {
  ...roadmapCases,
  "auditai-ics": [
    {
      id: "problem",
      title: "Problem and constraints",
      aliases: ["context", "goals"],
      paragraphs: [
        "AuditAI was internal work in a nonprofit Audit department. The team wanted to use AI to reduce repetitive tasks while keeping people involved in review.",
        "It ran alongside a broader financial-audit platform modernization. That platform served an audience of 50,000+ volunteer auditors across 31,000 units; those figures describe the platform, not use of the six agents.",
      ],
    },
    {
      id: "contribution",
      title: "My contribution",
      aliases: ["discovery"],
      paragraphs: [
        "As a project management intern at ICS, I helped take six agents through discovery and into operational use. I worked with the Audit team to understand its needs, coordinated with the people involved, and supported rollout.",
        "I also supported roadmap execution and cross-functional delivery for the AWS migration. The engineering infrastructure and agent implementation were shared team work.",
      ],
    },
    {
      id: "decisions",
      title: "Decisions and evidence",
      aliases: ["options", "built", "launch"],
      paragraphs: [
        "The review boundary was central to the project: agents could assist with repeatable work, while people retained judgment over the output. My contribution was helping the department’s needs become work the team could deliver.",
        "The public account covers the scope and reported results. Internal screens, task examples, and implementation documents remain private.",
      ],
    },
    {
      id: "results",
      title: "Outcome and limitations",
      aliases: [],
      paragraphs: [
        "Six internal agents reached operational use. The project reported approximately 30% automation of common workflows and approximately 50% less manual labor time on scoped tasks. The underlying measurements are not public, so these figures should not be extended to all audit work or the wider platform.",
      ],
    },
    {
      id: "differently",
      title: "What I learned",
      aliases: [],
      paragraphs: [
        "On a similar project, I would plan evaluation earlier. I would start with representative tasks and a description of acceptable output, then record what reviewers still need to correct. That would make it easier to judge whether the next change is an improvement, rather than relying on an overall time-saving estimate.",
      ],
    },
  ],
  "byui-chatbot": [
    {
      id: "problem",
      title: "Problem and constraints",
      aliases: ["context", "goals"],
      paragraphs: [
        "The prototype covered Financial Aid, Registration, and Tech support at BYU–Idaho. Students needed answers across these services, with a route to staff when the assistant could not help.",
      ],
    },
    {
      id: "contribution",
      title: "My contribution",
      aliases: ["discovery"],
      paragraphs: [
        "I was the sole developer of the prototype and authored the requirements and PRD, including intent categories, conversation flows, and escalation logic.",
        "The university adapted my prototype, refined it, and connected it to the byui.edu site. My work was on the prototype; institutional integration, deployment, and ongoing operation involved others.",
      ],
    },
    {
      id: "decisions",
      title: "Decisions and evidence",
      aliases: ["options", "built", "launch"],
      paragraphs: [
        "I defined both the supported question paths and escalation. That gave the assistant a scope the team could discuss and made human support part of the requirements.",
        "The opening screen shows suggested questions and a live-representative option. The interaction screenshot shows how the institutional beta presents an answer to a financial-aid question. It documents the interface, not an evaluation of answer accuracy or usage. Institutional development continued beyond my prototype work.",
      ],
      artifacts: [
        {
          src: "/artifacts/byui-support-agent-ui.png",
          alt: "BYU–Idaho Support Agent with suggested questions and a live representative option",
          caption:
            "Existing institutional beta screenshot. Campus login is required to access the service.",
        },
        {
          src: "/artifacts/byui-support-agent-interaction.png",
          alt: "BYU–Idaho Support Agent beta displaying a question about applying for Pell Grants and a step-by-step response",
          caption:
            "Institutional beta example showing a financial-aid question and response. Campus login is required to access the service.",
          width: 3024,
          height: 1544,
        },
      ],
    },
    {
      id: "results",
      title: "Outcome and limitations",
      aliases: [],
      paragraphs: [
        "The prototype became an institutional beta covering three support domains. The campus audience is 20,000+ students, but that is not an adoption or active-usage figure. I do not have public resolution-rate or ticket-deflection measurements to report. The live service requires a campus login.",
      ],
    },
    {
      id: "differently",
      title: "What I learned",
      aliases: [],
      paragraphs: [
        "I would add measurement at the intent level from the start: which questions get answered, where students ask for more help, and when they reach a person. I would also look at whether the handoff helps them continue their task. A response alone does not tell me whether someone found what they needed.",
      ],
    },
  ],
  "u2-madisontek": [
    {
      id: "problem",
      title: "Problem and constraints",
      aliases: ["context", "goals"],
      paragraphs: [
        "U2 brings property management and utility billing into one system. MadisonTek employed me to help develop the product.",
        "My paid software developer internship ran from July through December 2025; I continued working on the project into 2026.",
      ],
    },
    {
      id: "contribution",
      title: "My contribution",
      aliases: ["discovery"],
      paragraphs: [
        "I was U2’s sole developer and handled product requirements, working directly with MadisonTek’s founder. I translated the product needs we discussed into working software.",
      ],
    },
    {
      id: "decisions",
      title: "Decisions and evidence",
      aliases: ["options", "built", "launch"],
      paragraphs: [
        "I used AI-assisted development to prepare working prototypes for requirements discussions with the founder. We could discuss the software while I was still developing it, making the requirements concrete.",
      ],
    },
    {
      id: "results",
      title: "Outcome and limitations",
      aliases: [],
      paragraphs: [
        "AI-assisted development shortened prototype cycles from weeks to days; that describes prototyping, not every feature’s delivery time.",
        "This account covers my development work, without claiming customer adoption, revenue, or shipped AI capabilities. The linked U2 website describes the product today and may differ from what I worked on.",
      ],
    },
    {
      id: "differently",
      title: "What I learned",
      aliases: [],
      paragraphs: [
        "Working across requirements and code helped me notice details that a feature description could leave unresolved. I would keep using prototypes to examine requirements on future projects. Shorter prototype cycles gave me more opportunities to do that; they did not, by themselves, establish that the product met users’ needs.",
      ],
    },
  ],
  "coding-interviews": [
    {
      id: "problem",
      title: "Problem and constraints",
      aliases: ["context", "goals"],
      paragraphs: [
        "I founded a technical interview-prep club at BYU–Idaho after conversations and surveys with students. They wanted a regular place to practice with peers. Participation was voluntary, so the sessions needed to be worth returning to.",
      ],
    },
    {
      id: "contribution",
      title: "My contribution",
      aliases: ["discovery"],
      paragraphs: [
        "As founder and president, I organized workshops and revised the curriculum using weekly member feedback. I ran the program over two semesters, during which active membership grew from 11 to more than 30.",
      ],
    },
    {
      id: "decisions",
      title: "Decisions and evidence",
      aliases: ["options", "built", "launch"],
      paragraphs: [
        "I used feedback from one session to adjust the next. The curriculum was something I could revise with participants, rather than a fixed syllabus.",
        "The work was mostly organizing, facilitating practice, and listening to members. There is no original workshop artifact available in this public portfolio.",
      ],
    },
    {
      id: "results",
      title: "Outcome and limitations",
      aliases: [],
      paragraphs: [
        "The club grew from 11 to 30+ active members. 40% of active members reported landing internships after participating. That is an association: members had other preparation and experience, and there was no controlled comparison showing the club caused those placements.",
      ],
    },
    {
      id: "differently",
      title: "What I learned",
      aliases: [],
      paragraphs: [
        "I would define active participation and keep a consistent feedback record from the beginning. That would give me a clearer view of who returned, what they found helpful, and what to adjust. Leading the club gave me practice changing a plan in response to the people using it.",
      ],
    },
  ],
};
