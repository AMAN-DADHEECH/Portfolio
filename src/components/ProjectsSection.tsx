"use client";

import React, { useState } from "react";
import { ExternalLink, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./common/Icons";
import { portfolioService } from "@/services/portfolioService";
import { Project } from "@/data/portfolioData";
import { Card } from "./common/Card";
import { Badge } from "./common/Badge";
import { Button } from "./common/Button";
import { SectionHeading } from "./common/SectionHeading";
import { ProjectModal } from "./ProjectModal";

const accents = ["gold", "champagne", "mint", "pink"] as const;

export const ProjectsSection: React.FC = () => {
  const allProjects = portfolioService.getAllProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ["All", "Full-Stack", "Backend", "Frontend"];

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Selected work"
          title="Production"
          highlightedText="platforms"
          subtitle="Multi-tenant SaaS, real-time transactional workflows and high-performance full-stack applications."
        />

        {/* Filters */}
        <div className="mb-10 sm:mb-12 -mx-4 px-4 overflow-x-auto no-scrollbar">
          <div className="flex w-max mx-auto gap-1 rounded-full border border-line bg-surface p-1" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 sm:px-5 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gilded-static text-black font-medium shadow-[0_4px_18px_-6px_rgba(217,180,90,0.7)]"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredProjects.map((project, idx) => (
            <Card
              key={project.id}
              padding="none"
              accent={accents[idx % accents.length]}
              className="group flex flex-col overflow-hidden"
            >
              <div className="p-5 sm:p-7 flex-1 flex flex-col">
                {/* Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-ink-dim">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <Badge variant="gold" size="sm">{project.category}</Badge>
                    {project.badge && <Badge variant="cyan" size="sm">{project.badge}</Badge>}
                  </div>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="grid place-items-center h-9 w-9 rounded-full border border-line text-ink-muted group-hover:text-ink group-hover:border-line-strong group-hover:bg-surface-2 transition-all cursor-pointer"
                    aria-label={`Open details for ${project.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-[1.75rem] font-semibold tracking-tight text-ink mb-1.5">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-left cursor-pointer hover:text-white transition-colors"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="font-display italic text-lg text-ink-muted mb-4">{project.tagline}</p>

                <p className="text-ink-muted text-sm sm:text-[15px] leading-relaxed mb-6 text-pretty">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="mb-6 space-y-2.5">
                  {project.features.slice(0, 2).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-sm text-ink-muted">
                      <span className="mt-0.5 grid place-items-center h-4 w-4 rounded-full bg-mint/15 shrink-0">
                        <Check className="w-2.5 h-2.5 text-mint" />
                      </span>
                      <span className="line-clamp-2">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-5 border-t border-line">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <Badge key={tech} variant="subtle" size="sm">{tech}</Badge>
                    ))}
                    {project.technologies.length > 6 && (
                      <Badge variant="outline" size="sm">+{project.technologies.length - 6}</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setActiveModalProject(project)}
                      className="flex-1 min-w-[8rem]"
                    >
                      Case study
                    </Button>
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        href={project.githubUrl}
                        external
                        icon={<GithubIcon className="w-3.5 h-3.5" />}
                      >
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        variant="primary"
                        size="sm"
                        href={project.liveUrl}
                        external
                        iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                      >
                        Live
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
