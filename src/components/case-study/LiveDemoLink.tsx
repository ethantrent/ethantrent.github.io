import { ExternalLink } from "lucide-react";
import { buttonSecondary } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  /** Honest constraint, e.g. “Campus login required”. */
  note?: string;
  className?: string;
};

/**
 * External product link with optional constraint note — honest “try / see live” affordance.
 */
export function LiveDemoLink({ href, label, note, className }: Props) {
  return (
    <div
      className={cn(
        "my-6 flex flex-col gap-3 rounded-xl border border-hairline bg-surface p-5 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-fg">See it live</p>
        {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("w-fit shrink-0", buttonSecondary)}
      >
        {label}
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
