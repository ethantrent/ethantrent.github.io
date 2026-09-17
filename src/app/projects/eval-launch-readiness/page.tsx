import type { Metadata } from "next";
import { UnavailableCase } from "@/components/case-study/UnavailableCase";

export const metadata: Metadata = {
  title: "Case study unavailable",
  description: "Explore Ethan Trent’s published project contributions and public code on the Work page.",
  alternates: { canonical: "/projects/eval-launch-readiness/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Case study unavailable",
    description: "Explore Ethan Trent’s published work.",
    url: "/projects/eval-launch-readiness/",
    images: ["/og.png"],
  },
};

export default function CaseStudyPage() {
  return <UnavailableCase />;
}
