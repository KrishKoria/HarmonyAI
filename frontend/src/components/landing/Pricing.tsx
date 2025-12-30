"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

interface PricingProps {
  className?: string;
}

const freeFeatures = [
  "5 free credits to start",
  "Generate full-length tracks",
  "AI cover art generation",
  "Download in MP3 format",
  "Share to community",
];

export function Pricing({ className }: PricingProps) {
  return (
    <section
      id="pricing"
      className={cn(
        "bg-muted/50 px-4 py-16 sm:px-6 md:py-24 lg:px-8",
        className
      )}
    >
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Credit-Based Pricing
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Start creating for free. Each track uses one credit. Buy more
            credits as you need them.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="from-primary/10 to-secondary/10 mt-12 rounded-2xl border bg-gradient-to-br p-8 md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-sm font-medium">
                  <Sparkles className="text-primary h-4 w-4" />
                  <span>Free to Start</span>
                </div>
                <h3 className="text-2xl font-bold">Get 5 Free Credits</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  No credit card required. Sign up and start creating music
                  immediately.
                </p>

                <ul className="mt-6 space-y-3">
                  {freeFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full">
                        <Check className="text-primary h-4 w-4" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-card rounded-xl border p-6 shadow-lg">
                  <p className="text-muted-foreground text-sm">
                    Start for free
                  </p>
                  <p className="mt-2 text-4xl font-bold">$0</p>
                  <p className="text-muted-foreground text-sm">
                    5 credits included
                  </p>
                  <Button size="lg" asChild className="mt-6 w-full">
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                  <p className="text-muted-foreground mt-3 text-xs">
                    Need more? Credits available from $5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
