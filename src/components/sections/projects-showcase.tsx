"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { projectCategories, projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

function ProjectItem({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article className={cn("group relative", featured && "md:col-span-2")}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-panel",
          featured ? "aspect-[16/9]" : "aspect-[3/2]"
        )}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={featured ? "(min-width: 1280px) 1152px, 100vw" : "(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge tone="accent" className="bg-background/85 backdrop-blur">
            {project.category}
          </Badge>
          {project.isPlaceholder ? <Badge tone="warning">Placeholder</Badge> : null}
        </div>
      </div>

      <div className={cn("mt-5 grid gap-x-10 gap-y-3", featured && "md:grid-cols-[1.1fr_1fr]")}>
        <div>
          <p className="text-sm text-subtle">{project.industry}</p>
          <h3 className={cn("mt-1 font-semibold text-foreground", featured ? "text-3xl" : "text-2xl")}>{project.name}</h3>
          <p className="mt-3 max-w-xl text-muted">{project.description}</p>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-subtle">Service</dt>
              <dd className="text-foreground">{project.service}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-subtle">Technologies</dt>
              <dd className="text-foreground">{project.technologies.join(", ")}</dd>
            </div>
          </dl>
          <Link
            href={`/projects/${project.slug}`}
            className="w-fit text-sm font-medium text-accent-text underline decoration-accent-text/30 underline-offset-4 transition-colors after:absolute after:inset-0 after:content-[''] hover:decoration-accent-text"
          >
            View Case Study<span className="sr-only">: {project.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

interface ProjectsShowcaseProps {
  /** Show only the first N projects (used on the homepage). */
  limit?: number;
  /** Show the category filter. */
  showFilters?: boolean;
}

export function ProjectsShowcase({ limit, showFilters = false }: ProjectsShowcaseProps) {
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");

  const filtered = projects.filter((project) => category === "All" || project.category === category);
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      {showFilters ? (
        <div role="group" aria-label="Filter projects by category" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {projectCategories.map((item) => {
            const selected = item === category;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                  selected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border-strong text-muted hover:border-accent-text hover:text-accent-text"
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {category === "All" ? "" : ` in ${category}`}.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid gap-x-8 gap-y-14 md:grid-cols-2"
        >
          {visible.length > 0 ? (
            visible.map((project, index) => (
              <ProjectItem key={project.slug} project={project} featured={category === "All" && index === 0} />
            ))
          ) : (
            <p className="text-muted md:col-span-2">No projects in this category yet.</p>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
