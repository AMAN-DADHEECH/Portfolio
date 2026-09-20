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

  return (
    <footer className="relative border-t border-white/10 bg-[#05070c] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Column: Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base font-bold text-white tracking-wide">
                {personal.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                v2026.1
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Full-Stack Software Developer • Building Production SaaS Platforms
            </p>
          </div>

          {/* Center Column: Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.links.email}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Aman Dadheech. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <span className="text-indigo-400 font-mono">Next.js</span> &amp;{" "}
            <span className="text-cyan-400 font-mono">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
