import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = { label: "Get Started", href: "/contact" };

export const footerServiceLinks: NavItem[] = [
  { label: "Software Development", href: "/services#software-development" },
  { label: "Web Development", href: "/services#web-development" },
  { label: "Mobile App Development", href: "/services#mobile-app-development" },
  { label: "Agentic AI", href: "/services#agentic-ai" },
  { label: "AI-Based Systems", href: "/services#ai-based-systems" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];
