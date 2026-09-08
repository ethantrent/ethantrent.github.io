import { ProjectFeature } from "@/components/ProjectFeature";
import { roadmapProjects } from "@/data/roadmap-projects";

const chapters = [
  { label: "Building it", href: "/projects/financial-literacy-rag/" },
  { label: "Evaluating it", href: "/projects/eval-launch-readiness/" },
  { label: "Defining useful support", href: "/projects/financial-literacy-discovery/" },
] as const;

/** One project, with separate accounts of implementation, evaluation, and discovery. */
export function AssistantFeature({ heading = "h3" }: { heading?: "h2" | "h3" }) {
  const assistant = roadmapProjects[0];
  return (
    <ProjectFeature
      project={{
        ...assistant,
        name: "A financial-information assistant",
        problem: "One independent project using public investor-education material, explored through implementation, evaluation, and discovery.",
      }}
      heading={heading}
      links={chapters}
    />
  );
}
