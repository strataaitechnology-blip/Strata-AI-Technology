import { Building2, ChartColumn, Cloud, Layers, MessagesSquare, Workflow } from "lucide-react";
import type { Solution, SolutionStage } from "@/types";

/** The five stages every solution moves through, explained simply. */
export const solutionStages: SolutionStage[] = [
  { id: "challenge", label: "The Problem" },
  { id: "strategy", label: "The Plan" },
  { id: "technology", label: "The Solution" },
  { id: "intelligence", label: "Smart Automation" },
  { id: "impact", label: "The Result" },
];

export const solutions: Solution[] = [
  {
    id: "business-automation",
    title: "Business Automation",
    summary: "Eliminate repetitive paperwork, manual data entry, and slow response times.",
    icon: Workflow,
    stages: {
      challenge: "Staff spend hours copying details between spreadsheets, emails, and separate apps.",
      strategy: "We identify which daily tasks take up the most time and can be safely automated.",
      technology: "We connect your everyday tools so information updates automatically across systems.",
      intelligence: "Smart tools draft replies and file documents, keeping your team in full control.",
      impact: "Faster work, zero copy-paste errors, and hours saved for your team every week.",
    },
  },
  {
    id: "enterprise-software",
    title: "Custom Business Software",
    summary: "Software designed specifically around how your company operates.",
    icon: Building2,
    stages: {
      challenge: "Generic off-the-shelf software doesn't fit your business and charges costly monthly fees.",
      strategy: "We design a straightforward system around your real workflows, staff roles, and goals.",
      technology: "A secure, dependable web or mobile platform that you own and control completely.",
      intelligence: "Helpful notifications and dashboards that keep daily operations running smoothly.",
      impact: "One central platform that runs your business reliably as you grow.",
    },
  },
  {
    id: "customer-experience",
    title: "Websites & Mobile Apps",
    summary: "Make it effortless for customers to find, trust, and buy from your business.",
    icon: MessagesSquare,
    stages: {
      challenge: "Confusing websites and slow mobile pages cause potential customers to leave.",
      strategy: "We streamline the customer journey from the first click to the final inquiry or purchase.",
      technology: "Fast, attractive websites and mobile apps that work smoothly on all devices.",
      intelligence: "Instant customer assistants that answer inquiries at any time of day or night.",
      impact: "More customer inquiries, higher sales, and a professional digital presence.",
    },
  },
  {
    id: "data-analytics",
    title: "Business Reporting & Insights",
    summary: "See your sales, inventory, and performance numbers clearly in one place.",
    icon: ChartColumn,
    stages: {
      challenge: "Important business numbers are scattered across notebooks, sheets, and apps.",
      strategy: "We identify the key numbers and metrics you need to run your business with clarity.",
      technology: "A clean dashboard that brings all your sales, orders, and expenses together.",
      intelligence: "Automatic alerts when inventory is low or sales milestones are reached.",
      impact: "Make confident decisions based on clear facts rather than guesswork.",
    },
  },
  {
    id: "cloud-solutions",
    title: "Reliable Hosting & Security",
    summary: "Keep your website and business data safe, fast, and always online.",
    icon: Cloud,
    stages: {
      challenge: "Slow websites, crashing servers, and worries about data security.",
      strategy: "We set up secure hosting with automatic daily backups and continuous protection.",
      technology: "Fast, reliable cloud hosting that keeps your website online 24 hours a day.",
      intelligence: "Automatic monitoring that prevents issues before they affect your customers.",
      impact: "Peace of mind knowing your business systems are secure and never go down.",
    },
  },
  {
    id: "digital-platforms",
    title: "New Digital Products",
    summary: "Turn a new business idea into a launched, working digital product.",
    icon: Layers,
    stages: {
      challenge: "You have a great business idea but need the right team to build and launch it.",
      strategy: "We define the most important features needed for a successful first launch.",
      technology: "A clean web or mobile app built to welcome your first paying customers.",
      intelligence: "Smart features added where they provide real, measurable customer value.",
      impact: "A launched digital product ready to attract users and generate revenue.",
    },
  },
];
