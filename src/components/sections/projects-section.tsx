import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { projects } from "@/data/projects";

interface ProjectsSectionProps {
  /** Homepage preview: show 3 projects and a link to the full list. */
  preview?: boolean;
}

export function ProjectsSection({ preview = false }: ProjectsSectionProps) {
  const hasPlaceholders = projects.some((project) => project.isPlaceholder);

  return (
    <Section id="projects" labelledBy="projects-heading">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            id="projects-heading"
            title="Ideas We've Turned Into Technology."
            description={
              hasPlaceholders
                ? "Sample project concepts showing the kind of work we build. Each is a placeholder until real case studies are published."
                : "A selection of the products and systems we have designed and built."
            }
          />
          {preview ? (
            <ButtonLink href="/projects" variant="secondary" className="shrink-0">
              View All Projects
            </ButtonLink>
          ) : null}
        </Reveal>
        <div className="mt-14">
          <ProjectsShowcase limit={preview ? 3 : undefined} showFilters={!preview} />
        </div>
      </Container>
    </Section>
  );
}
