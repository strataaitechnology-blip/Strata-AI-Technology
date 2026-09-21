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
      "Placeholder testimonial. Replace this text with a genuine quote from a client describing what it was like to work with STRATA Technologies.",
    author: "Partner name",
    role: "Role / title",
    company: "Company name",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "Placeholder testimonial. Use this space for a real quote about the challenge a partner faced and the outcome they experienced.",
    author: "Partner name",
    role: "Role / title",
    company: "Company name",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    quote:
      "Placeholder testimonial. Add an approved statement here, then mark the entry as no longer a placeholder.",
    author: "Partner name",
    role: "Role / title",
    company: "Company name",
    isPlaceholder: true,
  },
];
