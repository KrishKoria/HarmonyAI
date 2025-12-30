"use client";

import { SamplePlayer } from "./SamplePlayer";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";
import type { FeaturedSong } from "@/lib/sample-tracks";

interface SampleTracksProps {
  songs: FeaturedSong[];
  className?: string;
}

export function SampleTracks({ songs, className }: SampleTracksProps) {
  // Hide section if no songs available
  if (songs.length === 0) {
    return null;
  }

  return (
    <section
      id="samples"
      className={cn("px-4 py-16 sm:px-6 md:py-24 lg:px-8", className)}
    >
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Most Loved Creations
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Discover the community&apos;s favorite AI-generated tracks. Each one
            crafted from a simple text prompt.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {songs.slice(0, 4).map((song, index) => (
            <AnimatedSection key={song.id} delay={index * 100}>
              <SamplePlayer song={song} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
