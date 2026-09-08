import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about/" },
  description: siteConfig.seoPages.about,
  openGraph: {
    url: "/about/",
    images: ["/og.png"],
    title: "About",
    description: siteConfig.seoPages.about,
  },
};

export default function AboutPage() {
  return <AboutSection />;
}
