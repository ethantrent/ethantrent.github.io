import type { Metadata } from "next";
import { UnavailableCase } from "@/components/case-study/UnavailableCase";

export const metadata: Metadata = {
  title: "Case study unavailable",
  description: "Explore Ethan Trent’s published project contributions and public code on the Work page.",
  alternates: { canonical: "/projects/financial-literacy-rag/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Case study unavailable",
    description: "Explore Ethan Trent’s published work.",
    url: "/projects/financial-literacy-rag/",
    images: ["/og.png"],
  },
};

export default function CaseStudyPage() {
  return <UnavailableCase />;
}
