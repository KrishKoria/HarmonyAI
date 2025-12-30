import {
  Wand2,
  FileText,
  Image,
  Users,
  MessageSquare,
  Sparkles,
  Download,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: Feature[] = [
  {
    id: "ai-generation",
    icon: Wand2,
    title: "AI Music Generation",
    description:
      "Create original music from natural language descriptions. Just describe what you want to hear.",
  },
  {
    id: "lyrics",
    icon: FileText,
    title: "AI-Generated Lyrics",
    description:
      "Generate complete song lyrics or bring your own. Our AI adapts to any style.",
  },
  {
    id: "cover-art",
    icon: Image,
    title: "Automatic Cover Art",
    description:
      "Every track gets unique AI-generated artwork that matches your music.",
  },
  {
    id: "community",
    icon: Users,
    title: "Share & Discover",
    description:
      "Publish your creations and explore trending music from the community.",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    title: "Describe Your Music",
    description:
      "Tell us what you want - genre, mood, instruments, or just a vibe.",
    icon: MessageSquare,
  },
  {
    step: 2,
    title: "AI Creates Your Track",
    description:
      "Our AI generates a unique, high-quality music track in minutes.",
    icon: Sparkles,
  },
  {
    step: 3,
    title: "Download & Share",
    description:
      "Get your track with cover art. Share with the world or keep it private.",
    icon: Download,
  },
];
