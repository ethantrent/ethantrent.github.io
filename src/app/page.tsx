import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ManifestoBlock } from "@/components/ManifestoBlock";
import { CredentialsStrip } from "@/components/CredentialsStrip";
import { TestimonialHook } from "@/components/TestimonialHook";
import { SkillsHomeLink } from "@/components/SkillsHomeLink";
import { HomeCta } from "@/components/HomeCta";

/**
 * Home storytelling sequence: hero → proof → case studies → how I work → credentials → skills → CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <FeaturedProjects />
      <ManifestoBlock />
      <CredentialsStrip />
      <TestimonialHook />
      <SkillsHomeLink />
      <HomeCta />
    </>
  );
}
