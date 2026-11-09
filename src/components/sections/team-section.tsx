import { User } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { team } from "@/data/team";

export function TeamSection() {
  return (
    <Section id="team" labelledBy="team-heading" tone="muted" className="relative overflow-hidden">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeader
            id="team-heading"
            eyebrow="Our Team"
            title={
              <span>
                The People Behind{" "}
                <span className="highlight-accent text-primary">STRATA</span>
              </span>
            }
            description="Meet the experienced engineers, designers, and problem solvers committed to building dependable digital tools for your business."
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <li key={member.id}>
              <Reveal delay={(index % 3) * 0.08}>
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:border-accent/40 hover:shadow-panel hover:-translate-y-1">
                  <div>
                    {/* Member Avatar / Initial Icon */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent ring-4 ring-accent/10 transition-colors group-hover:bg-accent group-hover:text-white">
                        <User className="h-7 w-7" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold text-primary">
                          {member.name}
                        </h3>
                        <span className="inline-block rounded-md bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-text">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/80 pt-4">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                      STRATA Core Team
                    </span>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

