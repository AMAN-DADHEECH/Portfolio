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
    <footer className="relative border-t border-cyan-500/30 bg-[#02050c] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Column: Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-base font-black font-mono uppercase text-white tracking-widest">
                {personal.name}
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-[#fcee0a]/10 text-[#fcee0a] border border-[#fcee0a]/40 font-mono">
                NET_SYS // v2026.CYBER
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-400/80">
              Full-Stack Software Engineer • High-Throughput SaaS Platforms &amp; Multi-Tenant Systems
            </p>
          </div>

          {/* Center Column: Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#070c18] border border-cyan-500/30 text-slate-400 hover:text-[#fcee0a] hover:border-[#fcee0a]/50 transition-all cyber-cut-sm"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#070c18] border border-cyan-500/30 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all cyber-cut-sm"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.links.email}
              className="p-2.5 bg-[#070c18] border border-cyan-500/30 text-slate-400 hover:text-[#ff0055] hover:border-[#ff0055]/50 transition-all cyber-cut-sm"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#070c18] border border-cyan-500/40 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 hover:text-black hover:bg-[#fcee0a] hover:border-[#fcee0a] transition-all cursor-pointer cyber-cut-sm"
            aria-label="Scroll to top of page"
          >
            <span>TOP_OF_STACK</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-cyan-500/15 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} AMAN DADHEECH // ALL RIGHTS SECURED</p>
          <p className="flex items-center gap-1.5">
            CORE: <span className="text-[#fcee0a]">NEXT.JS 15</span> • MESH:{" "}
            <span className="text-[#00f0ff]">TYPESCRIPT</span> • ENCRYPTION:{" "}
            <span className="text-[#00ff66]">ACTIVE</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
