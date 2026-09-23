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
          badgeText="[ SEC_02 // DEPLOYED WORK & SYSTEMS ]"
          badgeVariant="yellow"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="MISSION-CRITICAL"
          highlightedText="PRODUCTION PLATFORMS"
          subtitle="Real-world multi-tenant SaaS platforms, distributed real-time transactional workflows, and high-performance full-stack applications."
        />

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-1.5 p-1.5 bg-[#070c18] border border-cyan-500/30 cyber-cut-sm shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#fcee0a] text-black shadow-[0_0_15px_rgba(252,238,10,0.5)]"
                    : "text-slate-300 hover:text-[#00f0ff] hover:bg-cyan-500/10"
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project, idx) => (
            <Card
              key={project.id}
              padding="none"
              hudCorners={true}
              accent={idx % 2 === 0 ? "yellow" : "cyan"}
              className="flex flex-col justify-between group overflow-hidden border border-cyan-500/30 hover:border-[#fcee0a]/60 hover:shadow-[0_0_25px_rgba(252,238,10,0.2)]"
            >
              {/* Card Top Cyber Hazard Caution Bar */}
              <div className="h-1.5 w-full cyber-hazard-sm opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Badge Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#fcee0a] border border-[#fcee0a]/40 px-1.5 py-0.5">
                        [ PRJ_0{idx + 1} ]
                      </span>
                      <Badge variant="yellow" size="sm">
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
                      className="text-xs font-mono text-[#00f0ff] hover:text-[#fcee0a] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      SPEC_SHEET <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-xl sm:text-2xl font-black font-mono uppercase text-white mb-2 group-hover:text-[#fcee0a] transition-colors cursor-pointer tracking-tight"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300 font-mono mb-4">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="mb-6 space-y-2.5 bg-[#03060f] p-3.5 border border-cyan-500/20 cyber-cut-sm">
                    {project.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tech Stack & Links */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-cyan-500/20">
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
                      Specs Dossier
                    </Button>
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        href={project.githubUrl}
                        external
                        icon={<GithubIcon className="w-3.5 h-3.5 text-cyan-400" />}
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
