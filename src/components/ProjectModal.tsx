"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Check, Layers, Cpu } from "lucide-react";
import { GithubIcon } from "./common/Icons";
import { Project } from "@/data/portfolioData";
import { Badge } from "./common/Badge";
import { Button } from "./common/Button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-canvas/75 backdrop-blur-md animate-fade-in" onClick={onClose} />

      {/* Dialog — bottom sheet on mobile, centred card on larger screens */}
      <div className="glass relative z-10 w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88dvh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-canvas-2/95 animate-scale-in overflow-hidden">
        <div className="h-px w-full bg-gilded opacity-70" />
        {/* Grab handle (mobile) */}
        <div className="sm:hidden mx-auto mt-2.5 h-1 w-10 rounded-full bg-line-strong" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-5 sm:pt-7 pb-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="gold" size="sm">{project.category}</Badge>
              {project.badge && <Badge variant="cyan" size="sm">{project.badge}</Badge>}
            </div>
            <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
              {project.title}
            </h3>
            <p className="font-display italic text-lg text-ink-muted mt-1">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="grid place-items-center h-10 w-10 shrink-0 rounded-full border border-line bg-surface text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 pb-6">
          <p className="text-ink-muted text-[15px] sm:text-base leading-relaxed mb-6 text-pretty">
            {project.description}
          </p>

          <div className="mb-6 rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <h4 className="eyebrow flex items-center gap-2 mb-4">
              <Cpu className="w-3.5 h-3.5 text-gold" /> Architecture &amp; highlights
            </h4>
            <ul className="space-y-3">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                  <span className="mt-0.5 grid place-items-center h-4 w-4 rounded-full bg-mint/15 shrink-0">
                    <Check className="w-2.5 h-2.5 text-mint" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-champagne" /> Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="subtle" size="sm">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex flex-col-reverse min-[420px]:flex-row min-[420px]:justify-end gap-2 px-5 sm:px-8 py-4 border-t border-line pb-[max(1rem,env(safe-area-inset-bottom))]">
            {project.githubUrl && (
              <Button
                variant="secondary"
                size="md"
                href={project.githubUrl}
                external
                icon={<GithubIcon className="w-4 h-4" />}
              >
                View source
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
                Visit live site
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
