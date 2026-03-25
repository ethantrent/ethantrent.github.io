import { Hero } from "@/components/Hero";
import { ManifestoBlock } from "@/components/ManifestoBlock";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TechMarquee } from "@/components/TechMarquee";

/**
 * Home: rich hero, manifesto, project teasers, tech marquee.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoBlock />
      <FeaturedProjects />
      <TechMarquee />
    </>
  );
}
