import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/#hero" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

export const primaryCta: NavItem = { label: "Start Your Project", href: "/#contact" };

export const footerServiceLinks: NavItem[] = [
  { label: "App Development", href: "/#services" },
  { label: "Web Development", href: "/#services" },
  { label: "AI Solutions", href: "/#services" },
  { label: "Business Automation", href: "/#services" },
  { label: "Custom Software", href: "/#services" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];
