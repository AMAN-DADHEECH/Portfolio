"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, CheckCircle2, Layers, Cpu } from "lucide-react";
import { GithubIcon } from "./common/Icons";
import { Project } from "@/data/portfolioData";
import { Badge } from "./common/Badge";
import { Button } from "./common/Button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#040814] border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200 hud-frame">
        {/* Cyber Hazard Header bar */}
        <div className="h-2 w-full cyber-hazard-sm" />

        <div className="p-6 sm:p-8">
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="yellow" size="sm">
                  {project.category}
                </Badge>
                {project.badge && (
                  <Badge variant="cyan" size="sm">
                    {project.badge}
                  </Badge>
                )}
              </div>
              <h3 className="text-2xl font-black font-mono uppercase text-white tracking-tight">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-[#ff0055] p-2 bg-[#070c18] border border-cyan-500/30 hover:border-[#ff0055]/50 transition-colors cyber-cut-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          {/* Architectural Key Points */}
          <div className="mb-6 bg-[#070c18] border border-cyan-500/20 rounded-lg p-4 sm:p-5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#fcee0a] flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-[#fcee0a]" /> // Architectural Telemetry & Systems
            </h4>
            <ul className="space-y-2.5">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-2.5">
              <Layers className="w-4 h-4 text-cyan-400" /> // Stack Modules
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="subtle" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-cyan-500/20">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="md"
                href={project.githubUrl}
                external
                icon={<GithubIcon className="w-4 h-4 text-cyan-400" />}
              >
                Repo Source
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="primary"
                size="md"
                href={project.liveUrl}
                external
                iconRight={<ExternalLink className="w-4 h-4" />}
              >
                Launch Production
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
