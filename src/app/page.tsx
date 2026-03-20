import { Hero } from "@/components/Hero";
import { ManifestoBlock } from "@/components/ManifestoBlock";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TechMarquee } from "@/components/TechMarquee";

/**
 * Home: rich hero, manifesto, four-tile services, project teasers, tech marquee.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoBlock />
      <WhatIDoSection />
      <FeaturedProjects />
      <TechMarquee />
    </>
  );
}
