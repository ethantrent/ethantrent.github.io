import { Hero } from "@/components/Hero";
import { ManifestoBlock } from "@/components/ManifestoBlock";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ImpactStrip } from "@/components/ImpactStrip";
import { HomeCta } from "@/components/HomeCta";
import { SkillsSnapshot } from "@/components/SkillsSnapshot";
import { TechMarquee } from "@/components/TechMarquee";

/**
 * Home: hero, impact strip, manifesto, project teasers, CTA, skills bento, tech marquee.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <div className="bg-surface/20 dark:bg-bg/40">
        <ManifestoBlock />
      </div>
      <FeaturedProjects />
      <HomeCta />
      <div className="bg-surface/15 dark:bg-black/20">
        <SkillsSnapshot />
      </div>
      <TechMarquee />
    </>
  );
}
