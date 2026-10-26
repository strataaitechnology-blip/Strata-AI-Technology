import Image from "next/image";
import { UserRound } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { LinkedinIcon } from "@/components/ui/social-icons";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TEAM_PLACEHOLDER_BIO, TEAM_PLACEHOLDER_NAME, team } from "@/data/team";
import type { TeamMember } from "@/types";

function Portrait({ member }: { member: TeamMember }) {
  return (
    <div className="relative aspect-[4/5] border border-border bg-surface overflow-hidden">
      {member.photo ? (
        <Image
          src={member.photo.src}
          alt={member.photo.alt}
          width={member.photo.width}
          height={member.photo.height}
          sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 45vw"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-accent-soft"
        >
          <UserRound
            className="h-[30%] w-[30%] text-accent-text"
            strokeWidth={1.2}
          />
        </div>
      )}
      {member.isPlaceholder ? (
        <div className="absolute left-3 top-3 z-10">
          <Badge tone="warning">Placeholder</Badge>
        </div>
      ) : null}
    </div>
  );
}

export function TeamSection() {
  const hasPlaceholders = team.some((member) => member.isPlaceholder);

  return (
    <Section id="team" labelledBy="team-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="team-heading"
            eyebrow="The Team"
            title="People Who Build The Future."
            description={
              hasPlaceholders
                ? "Team profiles are placeholders for now. Names, photos and biographies will appear here once they are added."
                : "The engineers, designers and leaders behind STRATA Technologies."
            }
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {team.map((member, index) => (
            <li key={member.id}>
              <Reveal delay={(index % 5) * 0.05}>
                <Portrait member={member} />
                {/* Teal role label */}
                <p className="mt-4 text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-accent-text">
                  {member.role}
                </p>
                <h3
                  className={`mt-1 text-[0.95rem] font-semibold ${
                    member.name ? "text-primary" : "text-muted"
                  }`}
                >
                  {member.name ?? TEAM_PLACEHOLDER_NAME}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {member.bio ?? TEAM_PLACEHOLDER_BIO}
                </p>
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name ?? member.role} on LinkedIn (opens in a new tab)`}
                    className="mt-3 inline-flex h-8 w-8 items-center justify-center border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
