import type { Metadata } from "next";
import { ToolkitSection } from "@/components/ToolkitSection";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Toolkit",
  description: siteConfig.seoPages.toolkit,
  openGraph: { title: "Toolkit", description: siteConfig.seoPages.toolkit },
};

export default function ToolkitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
      <ToolkitSection />
    </div>
  );
}
