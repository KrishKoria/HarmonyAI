import Link from "next/link";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingFooterProps {
  className?: string;
}

const footerLinks = {
  product: [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#samples", label: "Samples" },
    { href: "#pricing", label: "Pricing" },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export function LandingFooter({ className }: LandingFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn("border-t bg-muted/30 px-4 py-12 sm:px-6 lg:px-8", className)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Music2 className="text-primary h-8 w-8" />
              <span className="text-xl font-bold tracking-tight">
                HarmonyAI
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm">
              Create original, professional-quality music from natural language
              descriptions powered by AI.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t pt-8">
          <p className="text-muted-foreground text-center text-sm">
            &copy; {currentYear} HarmonyAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
