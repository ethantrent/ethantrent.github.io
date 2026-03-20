/**
 * Global site copy and outbound links. Add `social.github` / `social.twitter` when you have URLs.
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
  location: "Rexburg, ID · Westlake, TX (Summer 2026)",
  email: "ethanjotrent@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/ethantrent",
    /** Paste your profile URL when ready; hidden in UI if empty. */
    github: "",
    twitter: "",
  },
  resumePath: "/resume.pdf",
  hero: {
    roleCaption: "// Product Manager & CS student · AI + cloud delivery",
    availabilityLabel: "Open to opportunities",
    floatingNameTag: "Ethan Trent",
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
    whatIDo:
      "I work where AI product strategy, cloud delivery, and cross-functional execution meet — from roadmaps and PRDs to production releases.",
    featuredProjects:
      "Highlights across cloud migration, internal AI programs, SaaS delivery, and campus-scale assistants — the work I want hiring teams to remember.",
    toolkit: "The stacks and rituals I use to go from clarity to shipped software without losing velocity.",
    contact:
      "Recruiters and hiring managers: I’m open to PM, AI, and technical program conversations. I usually reply within a few business days.",
    experience:
      "Internships and roles from global-scale nonprofit platforms and startup SaaS to incoming PM at Schwab and a year-long AI fellowship with Cornell Tech.",
    skills:
      "How I group capabilities in practice — product leadership, engineering delivery, and applied AI — so you can scan for fit fast.",
    projects:
      "Scope, stack, and outcomes for each initiative. Add repo or demo URLs in the data file when they’re public.",
  },
} as const;
