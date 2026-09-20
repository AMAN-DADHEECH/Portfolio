"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Download,
  Mail,
  Copy,
  Check,
  Terminal as TerminalIcon,
  Sparkles,
  Server,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./common/Icons";
import { portfolioService } from "@/services/portfolioService";
import { contactService } from "@/services/contactService";
import { Button } from "./common/Button";
import { Badge } from "./common/Badge";
import { Card } from "./common/Card";

interface HeroProps {
  onCopySuccess: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCopySuccess }) => {
  const personal = portfolioService.getPersonalData();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "architecture">("profile");

  const handleCopyEmail = async () => {
    const success = await contactService.copyToClipboard(personal.email);
    if (success) {
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Pill */}
            <div className="mb-6 animate-in fade-in slide-in-from-top-3 duration-500">
              <Badge
                variant="glow"
                size="md"
                icon={
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                }
              >
                {personal.status.text}
              </Badge>
            </div>

            {/* Main Greeting & Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Hi, I&apos;m <span className="gradient-text-accent">{personal.name}</span>.
              <br />
              <span className="gradient-text-primary text-3xl sm:text-4xl md:text-5xl font-bold">
                Full-Stack Software Developer
              </span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Specialized in building <span className="text-white font-medium">production SaaS</span>,{" "}
              <span className="text-indigo-300 font-medium">real-time transactional workflows</span>, and{" "}
              <span className="text-cyan-300 font-medium">multi-tenant web architecture</span>. Currently
              engineering mission-critical features for Restroeye at Idea2Reality.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <Button
                variant="glow"
                size="lg"
                href="#projects"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Explore Projects
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={personal.links.resume}
                download="Aman_Dadheech_Resume.pdf"
                icon={<Download className="w-4 h-4" />}
              >
                Get Resume
              </Button>
            </div>

            {/* Quick Contact & Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 w-full">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-white/10 transition-all cursor-pointer"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{personal.email}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code & Architecture Terminal */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0b0f19] border border-white/10 shadow-2xl shadow-indigo-950/40 overflow-hidden">
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#080b12] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
                    aman@developer: ~
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white/5 rounded-md p-0.5">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                      activeTab === "profile"
                        ? "bg-indigo-500/30 text-indigo-200"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    engineer.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                      activeTab === "architecture"
                        ? "bg-cyan-500/30 text-cyan-200"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    system.config
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
                {activeTab === "profile" ? (
                  <div>
                    <div className="text-slate-500">// Aman Dadheech — Full-Stack Profile</div>
                    <div className="mt-2">
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-cyan-300">engineer</span>:{" "}
                      <span className="text-emerald-400">DeveloperProfile</span> = &#123;
                    </div>
                    <div className="pl-4">
                      name: <span className="text-amber-300">&quot;Aman Dadheech&quot;</span>,
                    </div>
                    <div className="pl-4">
                      currentRole:{" "}
                      <span className="text-amber-300">&quot;Full Stack Developer @ Idea2Reality&quot;</span>,
                    </div>
                    <div className="pl-4">
                      flagshipProject:{" "}
                      <span className="text-amber-300">&quot;Restroeye (HORECA SaaS)&quot;</span>,
                    </div>
                    <div className="pl-4">
                      stack: [
                      <span className="text-amber-300">&quot;Next.js&quot;</span>,{" "}
                      <span className="text-amber-300">&quot;Node.js&quot;</span>,{" "}
                      <span className="text-amber-300">&quot;PostgreSQL&quot;</span>,{" "}
                      <span className="text-amber-300">&quot;Redis&quot;</span>,{" "}
                      <span className="text-amber-300">&quot;Socket.IO&quot;</span>],
                    </div>
                    <div className="pl-4">
                      focusAreas: [
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-amber-300">&quot;Multi-Tenant Architecture&quot;</span>,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-amber-300">&quot;Real-Time Order-to-Settlement&quot;</span>,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-amber-300">&quot;Distributed WebSocket Clusters&quot;</span>
                      <br />
                      &nbsp;&nbsp;],
                    </div>
                    <div className="pl-4">
                      location: <span className="text-amber-300">&quot;Jaipur, Rajasthan, India&quot;</span>,
                    </div>
                    <div className="pl-4">
                      availableForHire: <span className="text-emerald-400">true</span>,
                    </div>
                    <div>&#125;;</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-slate-500"># Restroeye Production Architecture</div>
                    <div className="mt-2 text-cyan-300">[MultiTenantSaaS]</div>
                    <div className="pl-2">
                      tenancy = <span className="text-amber-300">&quot;Role &amp; Property Scoped&quot;</span>
                    </div>
                    <div className="pl-2">
                      database = <span className="text-amber-300">&quot;PostgreSQL + Drizzle ORM&quot;</span>
                    </div>
                    <div className="pl-2">
                      caching = <span className="text-amber-300">&quot;Redis In-Memory KeyStore&quot;</span>
                    </div>
                    <div className="pl-2">
                      eventMesh = <span className="text-amber-300">&quot;Socket.IO + Web Push&quot;</span>
                    </div>
                    <div className="mt-2 text-purple-300">[OperationalWorkflows]</div>
                    <div className="pl-2 text-emerald-400">✓ Dine-In QR Ordering</div>
                    <div className="pl-2 text-emerald-400">✓ Instant KOT / KDS Kitchen Sync</div>
                    <div className="pl-2 text-emerald-400">✓ Split Bills &amp; Tax Settlement</div>
                    <div className="pl-2 text-emerald-400">✓ Real-time Role Notifications</div>
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-[#06080e] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  Live System Ready
                </span>
                <span>UTF-8 • Next.js App Router</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Bento Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {personal.stats.map((stat, idx) => (
            <Card key={idx} padding="sm" className="hover:border-indigo-500/40">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {stat.detail}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
