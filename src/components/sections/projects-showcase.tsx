"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectCategories, projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

function ProjectItem({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article className={cn("group relative", featured && "md:col-span-2")}>
      <div
        className={cn(
          "relative overflow-hidden border border-border",
          featured ? "aspect-[16/9]" : "aspect-[3/2]"
        )}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={
            featured
              ? "(min-width: 1280px) 1152px, 100vw"
              : "(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
          }
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone="neutral">{project.category}</Badge>
          {project.isPlaceholder ? <Badge tone="warning">Placeholder</Badge> : null}
        </div>
      </div>

      <div className={cn("mt-5 grid gap-x-10 gap-y-3", featured && "md:grid-cols-[1.1fr_1fr]")}>
        <div>
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-subtle">
            {project.industry}
          </p>
          <h3
            className={cn(
              "mt-2 font-semibold leading-tight tracking-tight text-foreground",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {project.name}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <dl className="space-y-1.5 text-xs">
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text transition-colors hover:text-primary after:absolute after:inset-0 after:content-['']"
          >
            View Case Study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">: {project.name}</span>
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

  const filtered = projects.filter(
    (project) => category === "All" || project.category === category
  );
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {projectCategories.map((item) => {
            const selected = item === category;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={cn(
                  "shrink-0 border px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border-strong text-muted hover:border-primary hover:text-primary"
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid gap-x-8 gap-y-14 md:grid-cols-2"
        >
          {visible.length > 0 ? (
            visible.map((project, index) => (
              <ProjectItem
                key={project.slug}
                project={project}
                featured={category === "All" && index === 0}
              />
            ))
          ) : (
            <p className="text-muted md:col-span-2">No projects in this category yet.</p>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
