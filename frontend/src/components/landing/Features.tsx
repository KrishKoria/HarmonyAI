"use client";

import { features } from "@/lib/landing-content";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";

interface FeaturesProps {
  className?: string;
}

export function Features({ className }: FeaturesProps) {
  return (
    <section
      id="features"
      className={cn("px-4 py-16 sm:px-6 md:py-24 lg:px-8", className)}
    >
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Create Music
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Powerful AI tools that make professional music creation accessible
            to everyone.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.id} delay={index * 100}>
              <div className="bg-card hover:border-primary/50 group rounded-xl border p-6 transition-colors">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
