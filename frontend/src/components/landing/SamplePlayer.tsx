"use client";

import { useTransition } from "react";
import { Play, Pause, Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/usePlayer";
import { getPublicPlayUrl } from "@/lib/actions";
import type { FeaturedSong } from "@/lib/sample-tracks";

interface SamplePlayerProps {
  song: FeaturedSong;
  className?: string;
}

export function SamplePlayer({ song, className }: SamplePlayerProps) {
  const [isPending, startTransition] = useTransition();
  const { track, setTrack } = usePlayerStore();

  const isCurrentTrack = track?.currentTrackId === song.id;
  const primaryCategory = song.categories[0]?.name ?? "Music";

  const handlePlay = () => {
    startTransition(async () => {
      const playUrl = await getPublicPlayUrl(song.id);

      setTrack({
        currentTrackId: song.id,
        title: song.title,
        url: playUrl,
        artwork: song.thumbnailUrl,
        prompt: song.prompt,
        createdBy: song.user.name,
      });
    });
  };

  return (
    <div
      className={cn(
        "bg-card group overflow-hidden rounded-xl border transition-all hover:shadow-lg",
        className
      )}
    >
      {/* Artwork - use thumbnail or gradient fallback */}
      <div
        className={cn(
          "relative flex h-48 items-center justify-center",
          !song.thumbnailUrl && "bg-gradient-to-br from-purple-500 to-pink-500"
        )}
      >
        {song.thumbnailUrl && (
          <Image
            src={song.thumbnailUrl}
            alt={song.title}
            fill
            className="object-cover"
            unoptimized
          />
        )}
        <Button
          size="lg"
          variant="secondary"
          onClick={handlePlay}
          disabled={isPending}
          className="relative z-10 h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          {isPending ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : isCurrentTrack ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="ml-1 h-8 w-8" />
          )}
        </Button>
      </div>

      {/* Track info */}
      <div className="p-4">
        <div className="mb-3">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
            {primaryCategory}
          </p>
          <h3 className="text-lg font-semibold">{song.title}</h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            &ldquo;{song.prompt}&rdquo;
          </p>
        </div>

        {/* Creator and likes */}
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>{song.user.name ?? "Anonymous"}</span>
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {song.likeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
