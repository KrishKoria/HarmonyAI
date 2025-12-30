"use client";

import { workflowSteps } from "@/lib/landing-content";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className={cn(
        "bg-muted/50 px-4 py-16 sm:px-6 md:py-24 lg:px-8",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create Music in Three Simple Steps
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            From idea to finished track in minutes. No musical experience
            required.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <AnimatedSection key={step.step} delay={index * 150}>
              <div className="relative text-center">
                {/* Step number */}
                <div className="from-primary to-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold text-white">
                  {step.step}
                </div>

                {/* Connector line (hidden on mobile, between cards on desktop) */}
                {index < workflowSteps.length - 1 && (
                  <div className="from-primary/50 to-secondary/50 absolute top-8 left-[calc(50%+2rem)] hidden h-0.5 w-[calc(100%-4rem)] bg-gradient-to-r md:block" />
                )}

                {/* Icon */}
                <div className="text-primary mb-3 inline-flex items-center justify-center">
                  <step.icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
