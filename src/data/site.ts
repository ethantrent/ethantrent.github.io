import { publicProfile } from "./public-profile";

export const siteConfig = {
  ...publicProfile,
  title: "Ethan Trent — AI product and developer tools",
  description:
    "Ethan Trent works on Assistants & Search at Charles Schwab. Explore his software and product work, technical teaching, and path into product management.",
  lastUpdated: "September 2026",
  social: {
    linkedin: publicProfile.linkedin,
    github: publicProfile.github,
    twitter: "",
  },
  resumePath: "/Ethan_Trent_Resume.pdf",
  resumeLabel: "Résumé — through summer 2026",
  askEthanApiUrl: "https://ask-ethan.neat-fang.workers.dev",
  profilePhoto: {
    primarySrc: "/Professional%20Photo.JPG",
    fallbackSrc: "/profile-mark.svg",
  },
  seoPages: {
    about:
      "About Ethan Trent: gaming, an interest in physical therapy, programming, and a career in product management.",
    experience:
      "Ethan Trent’s experience at Charles Schwab, Cornell Tech × Break Through Tech, ICS, and MadisonTek.",
    projects:
      "An independent financial-information assistant across discovery, implementation, and evaluation, plus earlier product and community work.",
    skills:
      "AI product judgment, developer platforms, evaluation and security, and technical teaching, with examples to explore.",
    contact:
      "Connect with Ethan Trent about AI, product work, and relevant professional opportunities. Currently at Charles Schwab in Dallas.",
    privacy:
      "How this portfolio handles contact submissions and optional assistant questions.",
    writing:
      "Notes on assistant requirements, human handoff, and evaluating internal AI tools.",
  },
  pageIntros: {
    contact:
      "I’m open to conversations about AI product work, developer platforms, and technical teaching. Send me a message here or email me directly.",
    projects:
      "An independent financial-information assistant, a campus support prototype, product work with a founder, and internal AI tools. Each account explains my contribution and the limits of its results.",
    writing:
      "Short notes on assistant requirements, handoff, and evaluation, drawing on the projects here.",
  },
} as const;
