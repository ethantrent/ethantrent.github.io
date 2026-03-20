/**
 * Global site copy and outbound links. Add `social.twitter` when you have a URL (hidden if empty).
 */

export const siteConfig = {
  name: "Ethan Trent",
  watermarkName: "Ethan Trent",
  title: "Ethan Trent — Product Manager & AI Builder",
  description:
    "Computer Science student and product-minded builder: PM intern (Schwab), AI Fellow (Cornell Tech × Break Through Tech), and shipped work in cloud migration, internal AI agents, and campus-scale RAG.",
  tagline: "Where strategy meets execution.",
  footerTagline: {
    before: "Where ",
    highlight1: "strategy",
    middle: " meets ",
    highlight2: "execution",
    after: ".",
  },
  location: "Dallas, TX · Westlake, TX (Summer 2026)",
  email: "ethanjotrent@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/ethantrent",
    github: "https://github.com/ethantrent",
    twitter: "",
  },
  resumePath: "/resume.pdf",
  hero: {
    roleCaption: "// Product Manager & CS student · AI + cloud delivery",
  },
  manifesto: {
    line1: "Shipping Products",
    line2: "Scaling Systems",
    body:
      "I care about efficiency in how teams ship, aesthetics in the user experience, and functionality that still works after the launch confetti — from audit platforms at global scale to AI assistants students actually use.",
    highlightWords: ["efficiency", "aesthetics", "functionality"] as const,
  },
  techMarquee: {
    introBefore: "I work with ",
    introHighlight1: "skills",
    introMiddle: " that ship ",
    introHighlight2: "cutting-edge solutions",
    introAfter: " — from idea to production.",
  },
  /** Meta descriptions for route-level SEO (recruiter / link-preview friendly). */
  seoPages: {
    about:
      "About Ethan Trent — CS at BYU–Idaho, incoming PM intern at Charles Schwab (Conversational AI), Cornell Tech × Break Through Tech AI Fellow, and shipped cloud & AI work.",
    experience:
      "Experience timeline: Charles Schwab PM intern, Cornell Tech AI Fellow, ICS global nonprofit PM intern, and KBXCOM software engineering intern.",
    projects:
      "Project highlights: financial audit AWS modernization, internal AI agent programs, unified billing SaaS, campus RAG support agent, and technical leadership.",
    skills:
      "Skills across product delivery, cloud & engineering, and applied AI — roadmapping, AWS, TypeScript, Python, LangChain, RAG, and stakeholder alignment.",
    toolkit:
      "Tools and workflows for shipping product: Azure DevOps, AWS, Cursor & Claude, GitHub, LangChain, OpenAI, and modern TypeScript stacks.",
    contact:
      "Contact Ethan Trent for recruiting, internships, and collaboration — portfolio inquiry form, email, LinkedIn, and downloadable resume.",
    privacy: "Privacy notice for Ethan Trent’s portfolio and how contact submissions are handled.",
  },
  /** Short intros shown under page headings (no bracket placeholders). */
  pageIntros: {
    whatIDo: "",
    featuredProjects: "The projects I'm most proud of — real systems, real users.",
    toolkit: "The stacks and rituals I use to go from clarity to shipped software without losing velocity.",
    contact:
      "Recruiters and hiring managers: I’m open to PM, AI, and technical program conversations. I usually reply within a few business days.",
    experience:
      "Internships and roles from global-scale nonprofit platforms and startup SaaS to incoming PM at Schwab and a year-long AI fellowship with Cornell Tech.",
    skills: "What I actually know how to do, grouped by how I use it day to day.",
    projects: "Scope, stack, and outcomes behind each initiative.",
  },
} as const;
