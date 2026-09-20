"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "./common/Icons";
import { portfolioService } from "@/services/portfolioService";
import { Project } from "@/data/portfolioData";
import { Card } from "./common/Card";
import { Badge } from "./common/Badge";
import { Button } from "./common/Button";
import { SectionHeading } from "./common/SectionHeading";
import { ProjectModal } from "./ProjectModal";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Featured Work & Production Systems"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="Engineered for"
          highlightedText="Impact & Reliability"
          subtitle="A showcase of real-world SaaS platforms, multi-tenant architectures, and scalable full-stack applications."
        />

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              padding="none"
              className="flex flex-col justify-between group overflow-hidden border border-white/10 hover:border-indigo-500/40"
            >
              {/* Card Top Accent Glow Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Badge Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="glow" size="sm">
                        {project.category}
                      </Badge>
                      {project.badge && (
                        <Badge variant="cyan" size="sm">
                          {project.badge}
                        </Badge>
                      )}
                    </div>
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                    >
                      View Specs <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400 font-mono mb-4">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="mb-6 space-y-2 bg-[#090d16]/70 rounded-xl p-3.5 border border-white/5">
                    {project.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tech Stack & Links */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <Badge key={tech} variant="subtle" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 6 && (
                      <Badge variant="outline" size="sm">
                        +{project.technologies.length - 6} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setActiveModalProject(project)}
                      className="flex-1"
                    >
                      Deep Dive
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
                        variant="glow"
                        size="sm"
                        href={project.liveUrl}
                        external
                        iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                      >
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
