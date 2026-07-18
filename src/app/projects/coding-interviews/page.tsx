import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/case-study/Callout";
import { CaseStudyHireActions } from "@/components/case-study/CaseStudyHireActions";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { buttonSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Coding Interviews Club — PM Case Study",
  description:
    "Running a student club like a learning product: surveys, session iteration, and accountability loops that grew membership 11 → 30+ with a 40% internship rate.",
  openGraph: {
    title: "Coding Interviews Club — PM Case Study",
    description:
      "Running a student club like a learning product: surveys, session iteration, and accountability loops that grew membership 11 → 30+ with a 40% internship rate.",
  },
};

export default function CodingInterviewsCaseStudyPage() {
  return (
    <CaseStudyLayout
      title="Coding Interviews club — a learning product, run like one"
      subtitle="Program lead (2025, two semesters) · BYU–Idaho · Rexburg, ID"
      tags={["Leadership", "Community", "Interview prep", "Surveys & iteration"]}
      summary={[
        {
          term: "Scope",
          detail: "End-to-end ownership: curriculum, weekly workshops, feedback loops",
        },
        {
          term: "Growth",
          detail: "Active membership scaled 11 → 30+ across two semesters",
        },
        {
          term: "Method",
          detail: "Surveys, session-design iteration, peer-led accountability",
        },
        {
          term: "Outcome",
          detail: "40% of active members landed internships after participation",
        },
      ]}
      footer={
        <CaseStudyHireActions>
          <Link href="/projects/" className={buttonSecondary}>
            All case studies
          </Link>
        </CaseStudyHireActions>
      }
    >
      <CaseStudySection title="Context">
        <p>
          At BYU–Idaho I owned the Coding Interviews club end to end for two semesters in 2025 — curriculum, weekly
          workshops, and the feedback loops in between. I deliberately treated it as a lightweight learning product
          with users, retention, and outcomes, not as a weekly meeting to fill.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Problem">
        <p>
          CS students were failing technical interviews not for lack of coursework but for lack of deliberate,
          repeated practice under interview conditions. The existing club reached only{" "}
          <strong className="text-fg">11 active members</strong> — too small a cohort for peer practice to compound,
          and with no way to know whether sessions were actually helping anyone get hired.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Goal & Success Metrics">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">North star:</strong> internship offers among active members — the outcome
            students actually wanted.
          </li>
          <li>
            <strong className="text-fg">Supporting:</strong> active membership growth and week-over-week retention.
          </li>
          <li>
            <strong className="text-fg">Signal:</strong> survey feedback on session usefulness, reviewed every cycle.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="Discovery & Research">
        <p>
          Surveys did the discovery work: what members wanted from sessions, where they stalled in real interviews,
          and why attendees stopped coming. The pattern was clear — passive content (watching someone else solve
          problems) didn’t retain members; structured practice with feedback and social accountability did.
        </p>
        <Callout>
          Retention followed accountability, not content. Members stayed when someone expected them to show up and
          practice — which meant designing the peer structure was the product work.
        </Callout>
      </CaseStudySection>

      <CaseStudySection title="Options Explored">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-fg">Lecture-style prep series</strong> — easiest to run and scale, but surveys
            showed passive formats were exactly what members were leaving.
          </li>
          <li>
            <strong className="text-fg">Pure mock-interview marketplace</strong> — highest fidelity practice, but cold
            starts poorly at 11 members with mixed skill levels.
          </li>
          <li>
            <strong className="text-fg">Structured workshops + peer accountability (chosen)</strong> — a weekly
            curriculum spine with paired practice and peer-led follow-up between sessions. Retains beginners while
            still giving advanced members real reps.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="What We Built">
        <p>
          A repeatable weekly program: curriculum sequenced across the semester, workshop sessions built around live
          practice rather than lecture, and peer-led accountability loops between sessions. Every survey cycle fed
          session-design iteration — formats that scored poorly were cut or reworked the following week.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Launch & Rollout">
        <p>
          Changes rolled out semester over semester: iterate the format inside a semester based on surveys, then
          relaunch the improved structure at the start of the next when recruiting is easiest. Growth to 30+ came
          across two of these cycles, not from a single push.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-fg">11 → 30+ active members</strong> in two semesters.
          </li>
          <li>
            <strong className="text-fg">40% of active members</strong> landed internships after participation —
            tracked like a PM metric, not anecdote.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="What I'd Do Differently">
        <p>
          I’d define “active member” and start tracking outcomes from week one rather than reconstructing them later.
          The 40% internship figure held up because we eventually tracked the cohort deliberately, but earlier
          instrumentation — attendance streaks, practice reps completed, application funnel — would have shown which
          parts of the program actually moved outcomes versus which just felt engaging.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
