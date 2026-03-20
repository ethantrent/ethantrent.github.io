import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.seoPages.about,
  openGraph: { title: "About", description: siteConfig.seoPages.about },
};

export default function AboutPage() {
  return <AboutSection />;
}
