"use client";

import { MessageCircle } from "lucide-react";
import { openAskEthan } from "@/lib/askEthan";
import { buttonSecondary } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Props = {
  /** Case study short name for context label. */
  caseName: string;
  /** Seed question shown in Ask Ethan. */
  prompt: string;
  className?: string;
};

/**
 * Contextual entry into Ask Ethan from a case-study footer.
 */
export function CaseStudyAskEntry({ caseName, prompt, className }: Props) {
  return (
    <button
      type="button"
      onClick={() =>
        openAskEthan({
          prompt,
          context: caseName,
          autoSend: true,
        })
      }
      className={cn(buttonSecondary, className)}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      Ask about this case
    </button>
  );
}
