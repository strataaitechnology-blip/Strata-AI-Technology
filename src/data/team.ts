import type { TeamMember } from "@/types";

/**
 * STRATA Team Members
 * Set `name`, `bio`, `role`, and optionally `photo` / `linkedin` for each member.
 */
export const team: TeamMember[] = [
  {
    id: "founder-ceo",
    role: "Founder & CEO",
    name: "Executive Leadership",
    bio: "Working closely with business owners to understand their daily challenges and deliver practical technology solutions.",
    isPlaceholder: true,
  },
  {
    id: "cto",
    role: "Chief Technology Officer",
    name: "Technical Leadership",
    bio: "Overseeing technical quality, data security, and ensuring all client projects run reliably.",
    isPlaceholder: true,
  },
  {
    id: "software-engineer",
    role: "Senior Full-Stack Engineer",
    name: "Software Engineering",
    bio: "Building fast, dependable websites, mobile applications, and internal business tools.",
    isPlaceholder: true,
  },
  {
    id: "ai-engineer",
    role: "AI & Automation Specialist",
    name: "AI Solutions Team",
    bio: "Creating smart assistants and automated workflows that eliminate repetitive daily paperwork.",
    isPlaceholder: true,
  },
  {
    id: "ui-ux-designer",
    role: "Lead UI/UX Designer",
    name: "Design Team",
    bio: "Designing clean, easy-to-use screens that make websites and apps simple and enjoyable to use.",
    isPlaceholder: true,
  },
];
