import type { Project } from "@/types";

type Props = {
  project: Project;
  as?: "h2" | "h3";
  className?: string;
};

/**
 * Renders project titles; U2 product name shows the digit as superscript (matches brand lockup).
 */
export function ProjectHeading({ project, as: Tag = "h3", className }: Props) {
  if (project.id === "u2-kbxcom" && project.name.startsWith("U2")) {
    const rest = project.name.slice(2);
    return (
      <Tag className={className} aria-label={project.name}>
        U
        <sup className="text-[0.58em] font-bold leading-none">2</sup>
        {rest}
      </Tag>
    );
  }
  return <Tag className={className}>{project.name}</Tag>;
}
