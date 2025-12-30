import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTAProps {
  isAuthenticated: boolean;
  variant?: "primary" | "secondary";
  title?: string;
  description?: string;
  className?: string;
}

export function CTA({
  isAuthenticated,
  variant = "primary",
  title = "Ready to Create Your First Track?",
  description = "Join thousands of creators making music with AI. Start for free today.",
  className,
}: CTAProps) {
  const isPrimary = variant === "primary";

  return (
    <section
      className={cn(
        "px-4 py-16 sm:px-6 md:py-24 lg:px-8",
        isPrimary
          ? "from-primary/10 via-background to-secondary/10 bg-gradient-to-r"
          : "bg-muted/50",
        className
      )}
    >
      <div className="mx-auto max-w-4xl text-center">
        {isPrimary && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium">
            <Sparkles className="text-primary h-4 w-4" />
            <span>No credit card required</span>
          </div>
        )}

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>

        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isAuthenticated ? (
            <Button size="lg" asChild className="h-12 px-8 text-base">
              <Link href="/discover">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <>
              <Button size="lg" asChild className="h-12 px-8 text-base">
                <Link href="/auth/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {isPrimary && (
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="h-12 px-8 text-base"
                >
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
