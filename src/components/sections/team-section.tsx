import Image from "next/image";
import { UserRound } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { LinkedinIcon } from "@/components/ui/social-icons";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TEAM_PLACEHOLDER_BIO, TEAM_PLACEHOLDER_NAME, team } from "@/data/team";
import type { TeamMember } from "@/types";

function Portrait({ member }: { member: TeamMember }) {
  return (
    <TiltCard className="aspect-[4/5] border border-border-strong bg-surface" maxDegree={12}>
      <div className="relative h-full w-full">
        {member.photo ? (
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            width={member.photo.width}
            height={member.photo.height}
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 45vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            {/* Concentric plates behind a neutral silhouette: a deliberate, not-yet-filled state. */}
            <span className="absolute h-[78%] w-[78%] rounded-3xl border border-border bg-surface-strong/50" />
            <span className="absolute h-[58%] w-[58%] rounded-2xl border border-border-strong bg-card" />
            <UserRound className="relative h-[28%] w-[28%] text-border-strong" strokeWidth={1.4} />
          </div>
        )}
        {member.isPlaceholder ? <Badge tone="warning" className="absolute left-3 top-3 z-10">Placeholder</Badge> : null}
      </div>
    </TiltCard>
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
                <p className="mt-4 text-sm font-medium text-accent-text">{member.role}</p>
                <h3 className={`mt-1 text-lg font-semibold ${member.name ? "text-foreground" : "text-subtle"}`}>
                  {member.name ?? TEAM_PLACEHOLDER_NAME}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{member.bio ?? TEAM_PLACEHOLDER_BIO}</p>
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name ?? member.role} on LinkedIn (opens in a new tab)`}
                    className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-muted transition-colors hover:border-accent-text hover:text-accent-text"
                  >
                    <LinkedinIcon className="h-4 w-4" />
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
