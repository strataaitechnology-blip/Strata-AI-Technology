import type { Testimonial } from "@/types";

/**
 * PLACEHOLDER TESTIMONIALS
 * ------------------------------------------------------------------
 * These are NOT real testimonials and are labelled as placeholders in the UI.
 * Replace `quote`, `author`, `role` and `company` with genuine, approved
 * feedback, then set `isPlaceholder` to false.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Client review preview. Verified quotes and feedback from business clients will be published here as current projects go live.",
    author: "Client Partner",
    role: "Business Owner",
    company: "Partner Company",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "We focus on clear communication, on-time delivery, and building websites and software that make everyday business tasks easier.",
    author: "Client Partner",
    role: "Operations Manager",
    company: "Partner Company",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    quote:
      "Our commitment is to be a dependable technology partner you can always reach out to for questions, updates, and ongoing support.",
    author: "Client Partner",
    role: "Company Director",
    company: "Partner Company",
    isPlaceholder: true,
  },
];
