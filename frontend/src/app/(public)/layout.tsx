import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "HarmonyAI - AI Music Generation",
  description:
    "Create original music from natural language descriptions. Transform your ideas into professional-quality tracks with AI-powered music generation.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "AI music",
    "music generation",
    "AI composer",
    "text to music",
    "artificial intelligence music",
  ],
  openGraph: {
    title: "HarmonyAI - AI Music Generation",
    description:
      "Create original music from natural language descriptions. Transform your ideas into professional-quality tracks with AI.",
    type: "website",
    siteName: "HarmonyAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "HarmonyAI - AI Music Generation",
    description:
      "Create original music from natural language descriptions. Transform your ideas into professional-quality tracks with AI.",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-background min-h-svh antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
