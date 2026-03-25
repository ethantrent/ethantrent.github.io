/**
 * Global site copy and outbound links. Add `social.twitter` when you have a URL (hidden if empty).
 */

export const siteConfig = {
  name: "Ethan Trent",
  watermarkName: "Ethan Trent",
  title: "Ethan Trent — Product Manager & AI Builder",
  description:
    "Computer Science student and product-minded builder: incoming Digital Product Manager (Schwab), AI Fellow (Cornell Tech × Break Through Tech), and shipped work in cloud migration, internal AI agents, and campus-scale RAG.",
  tagline: "Where strategy meets execution.",
  footerTagline: {
    before: "Where ",
    highlight1: "strategy",
    middle: " meets ",
    highlight2: "execution",
    after: ".",
  },
  /** Shown in footer bar — update when you ship meaningful changes. */
  lastUpdated: "March 2026",
  location: "Dallas, TX",
  email: "ethanjotrent@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/ethantrent",
    github: "https://github.com/ethantrent",
    twitter: "",
  },
  resumePath: "/Ethan_Trent_Resume.pdf",
  /** Profile image in `/public`. Space in filename → use %20 in URL. On error, UI falls back to mark. */
  profilePhoto: {
    primarySrc: "/Professional%20Photo.JPG",
    fallbackSrc: "/profile-mark.svg",
  },
  /** Homepage impact strip — only metrics you can defend in an interview. */
  impactStats: [
    { label: "Auditors on modernized platform", value: "50,000+" },
    { label: "Internal AI agents shipped (AuditAI)", value: "6" },
    { label: "Process automation (common paths)", value: "~30%" },
    { label: "Manual labor time reduction", value: "~50%" },
    { label: "Students in chatbot scope", value: "20,000+" },
    { label: "Fellowship applicants (Cornell)", value: "3,500+" },
    { label: "U2 addressable market", value: "$340M SOM" },
  ] as const,
  aiPmPhilosophy: {
    title: "My take on AI product",
    paragraphs: [
      "The best AI products aren’t built around the model — they’re built around the moment of friction they remove. The hardest part usually isn’t the LLM; it’s defining what “good” looks like when every output is probabilistic.",
      "I believe AI PMs need to be part designer, part translator between policy and engineering, and fully obsessed with trust: evaluation criteria, escalation when confidence is low, and human-in-the-loop paths that don’t feel like failure modes.",
    ] as const,
  },
  /** Mid-page CTA on home */
  homeCta: {
    title: "Let’s talk product, AI, and what you’re hiring for",
    body: "I’m interested in full-time PM roles where I can own ambiguous AI problems, align stakeholders, and ship responsibly — from discovery to production.",
    buttonLabel: "Get in touch",
  },
  manifesto: {
    line1: "Shipping Products",
    line2: "Scaling Systems",
    body:
      "I care about efficiency in how teams ship, aesthetics in the user experience, and functionality that still works after the launch confetti — from audit platforms at global scale to AI assistants students actually use.",
    highlightWords: ["efficiency", "aesthetics", "functionality"] as const,
  },
  techMarquee: {
    introBefore: "Tools and domains I work across — see the ",
    introHighlight1: "full skills matrix",
    introMiddle: " for how I group ",
    introHighlight2: "PM, AI, and engineering craft",
    introAfter: ".",
  },
  /** Paste a LinkedIn excerpt when ready — hidden while quote is empty. */
  testimonial: {
    quote: "",
    author: "",
    role: "",
  },
  /** Meta descriptions for route-level SEO (recruiter / link-preview friendly). */
  seoPages: {
    about:
      "About Ethan Trent — CS at BYU–Idaho, incoming Digital Product Manager at Charles Schwab (Conversational AI), Cornell Tech × Break Through Tech AI Fellow, and shipped cloud & AI work.",
    experience:
      "Experience timeline: incoming Charles Schwab Digital Product Manager, Cornell Tech AI Fellow, ICS global nonprofit IT Project Manager, and KBXCOM software engineering intern.",
    projects:
      "Project highlights: AuditAI multi-agent program, financial audit AWS modernization, U2 billing SaaS, campus RAG support agent, and technical leadership.",
    skills:
      "Skills across product delivery, cloud & engineering, and applied AI — roadmapping, AWS, TypeScript, Python, LangChain, RAG, agentic systems, and stakeholder alignment.",
    contact:
      "Contact Ethan Trent for recruiting, internships, and collaboration — portfolio inquiry form, email, LinkedIn, and downloadable resume.",
    privacy: "Privacy notice for Ethan Trent’s portfolio and how contact submissions are handled.",
    writing:
      "Writing on AI product management, AuditAI, and how Ethan specs probabilistic features — essays and artifacts from a PM builder.",
  },
  /** Short intros shown under page headings (no bracket placeholders). */
  pageIntros: {
    featuredProjects: "The projects I'm most proud of — real systems, real users.",
    contact:
      "Recruiters and hiring managers: I’m open to PM, AI, and technical program conversations. I usually reply within a few business days.",
    experience:
      "Internships and roles from global-scale nonprofit platforms and startup SaaS to incoming Digital Product Manager at Schwab and a year-long AI fellowship with Cornell Tech.",
    skills: "What I actually know how to do, grouped by how I use it day to day.",
    projects: "Scope, stack, and outcomes behind each initiative.",
    writing: "Notes on AI PM craft, shipped work, and how I think about trust in product.",
  },
} as const;
