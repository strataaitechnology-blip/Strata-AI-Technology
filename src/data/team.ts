import type { TeamMember } from "@/types";

/**
 * PLACEHOLDER TEAM
 * ------------------------------------------------------------------
 * No real people are described here. To add a real team member, set
 * `name`, `bio`, optionally `photo` / `linkedin`, and change
 * `isPlaceholder` to false. The UI adapts automatically.
 *
 * Example:
 * {
 *   id: "cto",
 *   role: "CTO",
 *   name: "Full Name",
 *   bio: "One or two sentences.",
 *   photo: { src: "/images/team/full-name.jpg", alt: "Full Name", width: 800, height: 1000 },
 *   linkedin: "https://www.linkedin.com/in/...",
 *   isPlaceholder: false,
 * }
 */
export const team: TeamMember[] = [
  { id: "founder-ceo", role: "Founder / CEO", isPlaceholder: true },
  { id: "cto", role: "CTO", isPlaceholder: true },
  { id: "software-engineer", role: "Software Engineer", isPlaceholder: true },
  { id: "ai-engineer", role: "AI Engineer", isPlaceholder: true },
  { id: "ui-ux-designer", role: "UI/UX Designer", isPlaceholder: true },
];

export const TEAM_PLACEHOLDER_NAME = "Name to be announced";
export const TEAM_PLACEHOLDER_BIO =
  "A short biography will appear here once this profile is filled in.";
