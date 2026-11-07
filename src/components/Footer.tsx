"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./common/Icons";
import { portfolioService } from "@/services/portfolioService";

export const Footer: React.FC = () => {
  const personal = portfolioService.getPersonalData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const iconLink =
    "grid place-items-center h-10 w-10 rounded-full border border-line bg-surface text-ink-muted hover:text-ink hover:border-line-strong hover:bg-surface-2 transition-colors";

  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="absolute inset-x-0 top-0 h-px bg-gilded opacity-40" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Big closing line */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-soft-gradient text-balance">
              Have an idea? <span className="font-display italic font-normal text-gilded">Let&apos;s make it real.</span>
            </p>
            <a
              href={personal.links.email}
              className="inline-block mt-4 text-ink-muted hover:text-ink underline decoration-line-strong underline-offset-4 hover:decoration-gold transition-colors break-all"
            >
              {personal.email}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub profile">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn profile">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href={personal.links.email} className={iconLink} aria-label="Send email">
              <Mail className="w-4 h-4" />
            </a>
            <button onClick={scrollToTop} className={`${iconLink} cursor-pointer ml-2`} aria-label="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-ink-dim text-center sm:text-left">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};
