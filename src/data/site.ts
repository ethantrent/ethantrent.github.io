/**
 * Global site copy and outbound links. Add `social.twitter` when you have a URL (hidden if empty).
 */

export const siteConfig = {
  name: "Ethan Trent",
  watermarkName: "Ethan Trent",
  title: "Ethan Trent — Product Manager & AI Builder",
  description:
    "Product manager and builder: Digital Product Manager at Charles Schwab (Conversational AI), AI Fellow (Cornell Tech × Break Through Tech), and shipped work in cloud migration, internal AI agents, and campus-scale RAG.",
  tagline: "Where strategy meets execution.",
  footerTagline: {
    before: "Where ",
    highlight1: "strategy",
    middle: " meets ",
    highlight2: "execution",
    after: ".",
  },
  /** Shown in footer bar — update when you ship meaningful changes. */
  lastUpdated: "July 2026",
  location: "Dallas, TX",
  email: "ethanjotrent@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/ethantrent",
    github: "https://github.com/ethantrent",
    twitter: "",
  },
  resumePath: "/Ethan_Trent_Resume.pdf",
  /**
   * Ask Ethan chat API (public Worker URL — not a secret).
   * Override at build time with `NEXT_PUBLIC_ASK_ETHAN_API_URL` if the endpoint moves.
   */
  askEthanApiUrl: "https://ask-ethan.neat-fang.workers.dev",
  /** Hero copy — value-led headline with PM positioning; role title lives in the label, not the H1. */
  hero: {
    label: "AI Product Manager & Builder",
    headlineLines: ["I help teams turn", "ambiguous AI problems", "into shipped products."] as const,
    positioning:
      "From discovery to production — I define what “good” looks like for probabilistic products, align stakeholders on constraints, and ship AI users can trust.",
    availability: "Open to full-time PM roles · Dallas, TX / Remote",
    primaryCta: { label: "See my case studies", href: "/projects/" },
    secondaryCtaLabel: "Download resume",
  },
  /** Profile image in `/public`. Space in filename → use %20 in URL. On error, UI falls back to mark. */
  profilePhoto: {
    primarySrc: "/Professional%20Photo.JPG",
    fallbackSrc: "/profile-mark.svg",
  },
  /**
   * Homepage impact snapshot — top 5 only, each defensible in an interview.
   * Format: big number → bold so-what label → italic context.
   * (Dropped ~30% automation and 3,500+ applicants live on in the AuditAI case study and experience page.)
   */
  impactStats: [
    { value: "50,000+", label: "Auditors served", context: "on modernized AWS audit platform" },
    { value: "6", label: "AI agents shipped", context: "operational in a regulated nonprofit" },
    { value: "~50%", label: "Manual labor cut", context: "on targeted audit task workflows" },
    { value: "20,000+", label: "Students served", context: "by campus RAG assistant in beta" },
    { value: "$340M", label: "Market targeted", context: "SOM for U2 unified billing SaaS" },
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
  /**
   * Paste a LinkedIn / manager excerpt when ready (do not invent).
   * Shown on About and on home via `TestimonialHook` — both stay hidden while quote is empty.
   * Example shape: quote: "…", author: "Name", role: "Title, Org"
   */
  testimonial: {
    quote: "",
    author: "",
    role: "",
  },
  /** Meta descriptions for route-level SEO (recruiter / link-preview friendly). */
  seoPages: {
    about:
      "About Ethan Trent — CS at BYU–Idaho, Digital Product Manager at Charles Schwab (Conversational AI), Cornell Tech × Break Through Tech AI Fellow, and shipped cloud & AI work.",
    experience:
      "Experience: Digital Product Manager at Charles Schwab (Conversational AI), Cornell Tech AI Fellow, ICS IT Project Manager, and earlier product-engineering work at KBXCOM.",
    projects:
      "PM case studies: AuditAI multi-agent automation, U2 billing SaaS, BYU–Idaho campus RAG chatbot, and program leadership — problem, discovery, decisions, and measured outcomes.",
    skills:
      "Skills across product delivery, cloud & engineering, and applied AI — roadmapping, AWS, TypeScript, Python, LangChain, RAG, agentic systems, and stakeholder alignment.",
    contact:
      "Contact Ethan Trent for full-time PM and Conversational AI roles — portfolio inquiry form, email, LinkedIn, and downloadable resume.",
    privacy: "Privacy notice for Ethan Trent’s portfolio and how contact submissions are handled.",
    writing:
      "Writing on AI product management, AuditAI, and how Ethan specs probabilistic features — essays and artifacts from a PM builder.",
  },
  /** Short intros shown under page headings (no bracket placeholders). */
  pageIntros: {
    featuredProjects: "The work I'm most proud of — real systems, real users, full narrative arcs.",
    contact:
      "Recruiters and hiring managers: I’m open to PM, AI, and technical program conversations. I usually reply within a few business days.",
    experience:
      "Digital Product Manager at Charles Schwab (Conversational AI), Cornell Tech × Break Through Tech AI Fellow, plus earlier shipping work at ICS and KBXCOM.",
    skills: "What I actually know how to do, grouped by how I use it day to day.",
    projects:
      "Problem, discovery, decisions, and outcomes behind each initiative — full PM case studies, not feature lists.",
    writing: "Notes on AI PM craft, shipped work, and how I think about trust in product.",
  },
} as const;
