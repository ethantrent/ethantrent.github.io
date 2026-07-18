import type { ReactNode } from "react";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";

type Props = {
  /** Extra footer links (experience, essay, live product, etc.). */
  children?: ReactNode;
};

/**
 * Hire exits after a case study — Contact + Resume first, then any secondary links.
 */
export function CaseStudyHireActions({ children }: Props) {
  return (
    <>
      <Link href="/contact/" className={buttonPrimary}>
        Contact
      </Link>
      <Link href={siteConfig.resumePath} download className={buttonSecondary}>
        <FileDown className="h-4 w-4" aria-hidden />
        Download resume
      </Link>
      {children}
    </>
  );
}
