import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music, Sparkles, Wand2 } from "lucide-react";

interface HeroProps {
  isAuthenticated: boolean;
}

export function Hero({ isAuthenticated }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-36">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="from-primary/20 to-secondary/20 absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-secondary/20 to-primary/20 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr blur-3xl" />

        {/* Floating music icons */}
        <div className="absolute top-1/4 left-[10%] animate-pulse opacity-20">
          <Music className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute top-1/3 right-[15%] animate-pulse opacity-20" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="h-10 w-10 text-secondary" />
        </div>
        <div className="absolute bottom-1/4 left-[20%] animate-pulse opacity-20" style={{ animationDelay: "1s" }}>
          <Wand2 className="h-8 w-8 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>AI-Powered Music Creation</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Transform Your Ideas Into{" "}
          <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
            Music
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
          Create original, professional-quality music tracks from natural language
          descriptions. Just describe what you want to hear, and let AI bring
          your vision to life.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isAuthenticated ? (
            <Button size="lg" asChild className="h-12 px-8 text-base">
              <Link href="/discover">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button size="lg" asChild className="h-12 px-8 text-base">
                <Link href="/auth/sign-up">Start Creating Free</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-12 px-8 text-base"
              >
                <Link href="#samples">Listen to Samples</Link>
              </Button>
            </>
          )}
        </div>

        {/* Social proof hint */}
        <p className="text-muted-foreground mt-8 text-sm">
          Join thousands of creators making music with AI
        </p>
      </div>
    </section>
  );
}
