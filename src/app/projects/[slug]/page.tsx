import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { getProjectBySlug, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.name} — Case Study`,
    description: project.description,
    path: `/projects/${project.slug}`,
    noIndex: project.isPlaceholder,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    {
      title: "The challenge",
      text: "Describe the problem this project set out to solve, and who it was for.",
    },
    {
      title: "Our approach",
      text: "Explain the strategy, design decisions and technology choices behind the solution.",
    },
    {
      title: "The outcome",
      text: "Share the results in the client's own terms, once they are real and approved.",
    },
  ];

  return (
    <>
      <PageHero
        title={project.name}
        description={project.description}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      />

      <section aria-label="Case study" className="py-16 sm:py-20">
        <Container>
          {project.isPlaceholder ? (
            <p
              role="note"
              className="mb-8 flex flex-wrap items-center gap-3 border border-dashed border-border-strong bg-surface px-4 py-3.5 text-sm text-muted"
            >
              <Badge tone="warning">Placeholder</Badge>
              This case study is a template. The project is a concept, not real
              client work.
            </p>
          ) : null}

          {/* Hero image — flat border, no shadow */}
          <div className="relative overflow-hidden border border-border">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-20">
            {/* Long-form sections */}
            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-primary">
                    {section.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {project.isPlaceholder
                      ? `[Placeholder] ${section.text}`
                      : section.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Sidebar metadata */}
            <aside
              aria-label="Project details"
              className="h-fit border border-border bg-surface p-6"
            >
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-accent-text">
                    Industry
                  </dt>
                  <dd className="mt-1 font-medium text-primary">
                    {project.industry}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-accent-text">
                    Category
                  </dt>
                  <dd className="mt-1 font-medium text-primary">
                    {project.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-accent-text">
                    Service
                  </dt>
                  <dd className="mt-1 font-medium">
                    <Link
                      href={`/services#${project.serviceId}`}
                      className="text-accent-text underline-offset-4 hover:text-primary hover:underline"
                    >
                      {project.service}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-accent-text">
                    Technologies
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border border-accent/25 bg-accent-soft px-2.5 py-1 text-xs text-accent-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <ButtonLink
                href={`/contact?service=${project.serviceId}`}
                className="mt-7 w-full justify-center"
              >
                Start a Similar Project
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
