import { Cloud, Database, Monitor, Server, Sparkles } from "lucide-react";
import type { TechnologyGroup } from "@/types";

export const technologyGroups: TechnologyGroup[] = [
  {
    id: "frontend",
    title: "Web & Mobile Screens",
    description: "Fast, easy-to-use screens that look great on phones, tablets, and computers.",
    icon: Monitor,
    items: ["Mobile-Friendly Design", "iPhone & Android Apps", "Fast Loading Pages", "Simple Navigation"],
  },
  {
    id: "backend",
    title: "Behind-the-Scenes Systems",
    description: "The reliable engine running your orders, customer accounts, and daily business logic.",
    icon: Server,
    items: ["Automated Order Processing", "Secure Customer Logins", "Live Notifications", "Connected Business Tools"],
  },
  {
    id: "data",
    title: "Safe Data Management",
    description: "Secure, organized storage that keeps your business and customer records protected.",
    icon: Database,
    items: ["Protected Business Records", "Customer Data Privacy", "Automatic Daily Backups", "Quick File Recovery"],
  },
  {
    id: "ai",
    title: "Smart Automation Tools",
    description: "Helpful tools and automated workflows that eliminate repetitive daily paperwork.",
    icon: Sparkles,
    items: ["24/7 Customer Assistants", "Automated Daily Tasks", "Smart Document Search", "Helpful Business Reports"],
  },
  {
    id: "infrastructure",
    title: "24/7 Hosting & Reliability",
    description: "Dependable, secure hosting so your website and apps are always available to customers.",
    icon: Cloud,
    items: ["24/7 Website Availability", "Fast Page Speeds", "Safe Cloud Storage", "Continuous Security Checks"],
  },
];
