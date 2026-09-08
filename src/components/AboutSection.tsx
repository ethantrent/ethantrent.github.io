import Link from "next/link";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { publicProfile } from "@/data/public-profile";
import { siteConfig } from "@/data/site";
export function AboutSection() {
  return (
    <div className="shell pb-14">
      <header className="page-head">
        <h1 className="editorial-title">About me</h1>
        <div className="mt-4 flex flex-wrap gap-x-7">
          <a href={siteConfig.social.linkedin} className="text-link">
            LinkedIn
          </a>
          <a href={siteConfig.resumePath} download className="text-link">
            {siteConfig.resumeLabel}
          </a>
        </div>
      </header>
      <div className="grid items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside className="max-w-[240px]">
          <ProfileAvatar
            size={300}
            priority
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Ethan Trent
            <br />
            Dallas, Texas
            <br />
            BYU–Idaho graduate
          </p>
        </aside>
        <div className="prose-copy">
          <h2 className="mb-4 text-2xl font-medium text-fg">
            How I got here
          </h2>
          <p>
            I grew up playing games on a Nintendo DS and Wii, then Xbox and
            PlayStation. Eventually I built my own gaming PC. I enjoyed
            streaming, too, and for a while I wanted to do that for a living. I
            liked spending time with technology long before I knew what kind of
            work I wanted to do.
          </p>
          <p>
            My interest in fitness, exercise, and nutrition took me toward
            physical therapy. An introductory programming class changed that. I
            enjoyed it enough to switch to computer science, then started
            learning about software engineering. Over time, I became interested
            in deciding what to build as well as writing the code. That interest
            led me toward product management.
          </p>
          <p>
            Outside work, I’m interested in gaming and fitness, and I enjoy
            learning by building with software.
          </p>
          <h2 className="mb-4 mt-8 text-2xl font-medium text-fg">
            Building and explaining software
          </h2>
          <p>
            I was U2’s sole developer and handled product requirements, working
            directly with MadisonTek’s founder. My paid internship ran
            from July through December 2025, and I continued working on U2 into
            2026.
          </p>
          <p>
            I was the sole developer of the BYU–I Support Agent prototype and
            authored its requirements, intent categories, conversation flows,
            and escalation logic. The university adapted my prototype, refined
            it, and connected it to the byui.edu site. Institutional integration
            and operation involved others. At ICS, I worked with the Audit team
            on discovery and rollout for six internal AI agents.
          </p>
          <p>
            I also founded an interview-prep club at BYU–Idaho, organizing
            workshops and changing the curriculum using member feedback.
            Teaching remains part of my work: the financial-information
            assistant pairs implementation and evaluation with setup guides,
            demonstrations, and workshop materials for other builders.
          </p>
          <h2 className="mb-4 mt-8 text-2xl font-medium text-fg">
            What I’m learning now
          </h2>
          <p>
            I’m interested in how people judge an assistant’s answers, where
            human support belongs, and what helps a developer understand a new
            tool. The financial-information project connects those interests:
            defining useful support, building the assistant, evaluating its
            behavior, and explaining how to work with it. My earlier notes
            preserve the questions I was asking before that work.
          </p>
          <p>
            My employment history through September 2026 includes my role as
            {" "}{publicProfile.role} on Assistants &amp; Search at Charles Schwab,
            which I started in {publicProfile.currentSince}. The independent project uses public
            material and is separate from my employer’s internal work.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-7">
            <Link className="text-link" href="/projects/">
              Work
            </Link>
            <Link className="text-link" href="/experience/">
              Experience
            </Link>
            <Link className="text-link" href="/skills/">
              Capabilities
            </Link>
            <Link className="text-link" href="/contact/">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
