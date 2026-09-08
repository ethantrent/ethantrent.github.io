import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/" } };
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { SelectedNotes } from "@/components/SelectedNotes";
import { HomeCta } from "@/components/HomeCta";
import { EarlierWork } from "@/components/EarlierWork";
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <EarlierWork />
      <SelectedNotes />
      <HomeCta />
    </>
  );
}
