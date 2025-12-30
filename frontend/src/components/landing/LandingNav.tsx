"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface LandingNavProps {
  isAuthenticated: boolean;
}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#samples", label: "Samples" },
  { href: "#pricing", label: "Pricing" },
];

export function LandingNav({ isAuthenticated }: LandingNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Music2 className="text-primary h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">HarmonyAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Button asChild>
              <Link href="/discover">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-11 w-11">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-primary text-lg font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-4">
                {isAuthenticated ? (
                  <Button asChild className="h-11">
                    <Link href="/discover">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild className="h-11">
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild className="h-11">
                      <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
