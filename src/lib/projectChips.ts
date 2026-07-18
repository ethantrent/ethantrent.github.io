import { cn } from "@/lib/utils";

export function projectCategoryChipClassName() {
  return cn(
    "inline-flex items-center gap-2 rounded-md bg-surface-2 px-3 py-1.5 text-[13px] font-medium text-fg-muted",
  );
}

/** One neutral chip style — Linear-style restraint, no color rotation. */
export function projectTagChipClassName(_index?: number) {
  return cn(
    "inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-medium text-fg-muted",
  );
}
