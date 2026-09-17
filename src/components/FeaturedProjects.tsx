import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectFeature } from "@/components/ProjectFeature";

const homepageProjects = ["auditai-ics", "byui-chatbot", "u2-madisontek"].map(
  (id) => projects.find((project) => project.id === id)!,
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
      {homepageProjects.map((p) => (
        <ProjectFeature key={p.id} project={p} />
      ))}
    </section>
  );
}
