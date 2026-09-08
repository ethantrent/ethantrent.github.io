import type { Metadata } from "next";
import { getProject } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
const project = getProject("byui-chatbot");
export const metadata: Metadata = {
  title: project.name,
  description: project.problem + " " + project.contribution,
  alternates: { canonical: project.href },
  openGraph: {
    url: project.href,
    images: ["/og.png"],
    title: project.name,
    description: project.problem,
  },
};
export default function CaseStudyPage() {
  return (
    <CaseStudyLayout project={project} sections={caseStudies[project.id]} />
  );
}
