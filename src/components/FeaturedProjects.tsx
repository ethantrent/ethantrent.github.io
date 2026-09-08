import Link from "next/link";
import { earlierProjects } from "@/data/projects";
import { ProjectFeature } from "@/components/ProjectFeature";
import { AssistantFeature } from "@/components/AssistantFeature";

const homepageProjects = ["byui-chatbot", "u2-madisontek"].map(
  (id) => earlierProjects.find((project) => project.id === id)!,
);
export function FeaturedProjects() {
  return (
    <section
      id="selected-work"
      className="shell pb-8"
      aria-labelledby="work-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-5">
        <h2 id="work-heading" className="text-xl font-medium">
          Selected work
        </h2>
        <Link href="/projects/" className="text-link">
          All work
        </Link>
      </div>
      <AssistantFeature />
      {homepageProjects.map((p) => (
        <ProjectFeature key={p.id} project={p} />
      ))}
    </section>
  );
}
