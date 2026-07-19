import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { HumanCue } from "@/components/HumanCue";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ManifestoBlock } from "@/components/ManifestoBlock";
import { HowIWorkPrinciples } from "@/components/HowIWorkPrinciples";
import { CredentialsStrip } from "@/components/CredentialsStrip";
import { TestimonialHook } from "@/components/TestimonialHook";
import { SkillsHomeLink } from "@/components/SkillsHomeLink";
import { HomeCta } from "@/components/HomeCta";

/**
 * Home storytelling sequence: hero → proof → human cue → case studies → how I work → credentials → skills → CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <HumanCue />
      <FeaturedProjects />
      <ManifestoBlock />
      <HowIWorkPrinciples />
      <CredentialsStrip />
      <TestimonialHook />
      <SkillsHomeLink />
      <HomeCta />
    </>
  );
}
