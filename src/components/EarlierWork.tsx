import Link from "next/link";
import { earlierProjects } from "@/data/projects";

export function EarlierWork() {
  return (
    <section className="shell pb-10" aria-labelledby="more-work-heading">
      <div className="border-t border-hairline pt-9">
        <h2 id="more-work-heading" className="text-2xl font-medium">More work</h2>
        <div className="mt-5 grid gap-x-10 sm:grid-cols-2">
          {earlierProjects.filter((project) => ["auditai-ics", "coding-interviews"].includes(project.id)).map((project) => (
            <div key={project.id} className="border-t border-hairline py-4">
              <Link className="text-link" href={project.href}>{project.name}</Link>
              <p className="text-sm leading-relaxed text-muted">{project.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
