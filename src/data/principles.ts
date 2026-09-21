import { Blocks, Layers, Lightbulb, Sparkles, Users } from "lucide-react";
import type { Principle } from "@/types";

export const principles: Principle[] = [
  {
    id: "modern-engineering",
    title: "Modern Engineering",
    description: "Clean and scalable software architecture.",
    icon: Blocks,
  },
  {
    id: "intelligent-technology",
    title: "Intelligent Technology",
    description: "AI used where it creates meaningful value.",
    icon: Sparkles,
  },
  {
    id: "user-centered",
    title: "User-Centered Products",
    description: "Technology designed around real users.",
    icon: Users,
  },
  {
    id: "scalable-solutions",
    title: "Scalable Solutions",
    description: "Systems designed to evolve with businesses.",
    icon: Layers,
  },
  {
    id: "practical-innovation",
    title: "Practical Innovation",
    description: "Innovation focused on meaningful problems.",
    icon: Lightbulb,
  },
];
