import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SampleTracks } from "@/components/landing/SampleTracks";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { getFeaturedSongs } from "@/lib/actions";

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = !!session;

  // Fetch featured songs from database
  const featuredSongs = await getFeaturedSongs();

  return (
    <>
      <LandingNav isAuthenticated={isAuthenticated} />

      <main className="flex flex-col">
        <Hero isAuthenticated={isAuthenticated} />

        {/* Features section */}
        <Features />

        {/* HowItWorks section */}
        <HowItWorks />

        {/* SampleTracks section - shows most liked published songs */}
        <SampleTracks songs={featuredSongs} />

        {/* Pricing section */}
        <Pricing />

        {/* Final CTA section */}
        <CTA isAuthenticated={isAuthenticated} />
      </main>

      <LandingFooter />
    </>
  );
}
