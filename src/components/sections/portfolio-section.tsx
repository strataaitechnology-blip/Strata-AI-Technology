import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TechPill } from "@/components/ui/tech-pill";
import { projects } from "@/data/projects";

interface PortfolioSectionProps {
  limit?: number;
}

export function PortfolioSection({ limit }: PortfolioSectionProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <Section id="portfolio" labelledBy="portfolio-heading" className="relative overflow-hidden">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeader
            id="portfolio-heading"
            eyebrow="Our Work"
            title={
              <span>
                Featured AI &amp;{" "}
                <span className="highlight-accent text-primary">Research Projects</span>
              </span>
            }
            description="Explore our proven AI and deep-learning implementations, with open-source repositories and research models available on GitHub."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {displayedProjects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.1}>
              <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:border-accent/40 hover:shadow-panel hover:-translate-y-1 sm:p-8">
                <div>
                  {/* Category & Industry */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-text">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {project.industry}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-primary transition-colors group-hover:text-accent">
                    {project.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <TechPill key={tech}>{tech}</TechPill>
                    ))}
                  </div>
                </div>

                {/* Project GitHub Action */}
                <div className="mt-8 border-t border-border pt-5">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-accent-hover hover:shadow-md cursor-pointer"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
