import { cn } from "@/lib/utils";

/** Matches `SkillsGrid` chip language (filled surface + tinted border). */
const TAG_BORDER_ROTATION = [
  "border-sky-500/50",
  "border-violet-500/50",
  "border-teal-500/50",
  "border-blue-500/50",
  "border-cyan-500/50",
] as const;

export function projectCategoryChipClassName() {
  return cn(
    "inline-flex items-center gap-2 rounded-full border border-accent/45 bg-accent/10 px-4 py-2 text-sm font-semibold text-fg shadow-sm backdrop-blur",
  );
}

export function projectTagChipClassName(index: number) {
  return cn(
    "inline-flex items-center gap-1.5 rounded-full border bg-surface/70 px-3 py-1.5 text-xs font-medium text-fg shadow-sm backdrop-blur",
    TAG_BORDER_ROTATION[index % TAG_BORDER_ROTATION.length],
  );
}
