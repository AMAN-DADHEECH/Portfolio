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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Cyber Status Tag */}
            <div className="mb-5 animate-in fade-in slide-in-from-top-3 duration-500">
              <Badge
                variant="yellow"
                size="md"
                icon={
                  <span className="relative flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcee0a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fcee0a] shadow-[0_0_8px_#fcee0a]"></span>
                  </span>
                }
              >
                [ SYS_ID: AD-2026 // {personal.status.text.toUpperCase()} ]
              </Badge>
            </div>

            {/* Main Greeting & Cyber Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-mono uppercase">
              HELLO WORLD, I&apos;M{" "}
              <span className="neon-text-yellow drop-shadow-[0_0_25px_rgba(252,238,10,0.5)]">
                {personal.name}
              </span>
              <br />
              <span className="gradient-text-cyan text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                Full-Stack Software Engineer
              </span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-sans">
              Engineering <strong className="text-[#fcee0a] font-mono">mission-critical SaaS architectures</strong>,{" "}
              <strong className="text-[#00f0ff] font-mono">real-time transactional pipelines</strong>, and{" "}
              <strong className="text-[#ff0055] font-mono">high-throughput web platforms</strong>. Spearheading core multi-tenant workflows for Restroeye at Idea2Reality.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-9 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                iconRight={<ArrowRight className="w-4 h-4 text-black" />}
              >
                EXEC_PROJECTS
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={personal.links.resume}
                download="Aman_Dadheech_Resume.pdf"
                icon={<Download className="w-4 h-4 text-cyan-400" />}
              >
                SYS_RESUME.PDF
              </Button>
            </div>

            {/* Quick Contact & Cyber Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-cyan-500/20 w-full">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#070c18] border border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-[#fcee0a] hover:border-[#fcee0a]/60 hover:shadow-[0_0_15px_rgba(252,238,10,0.3)] transition-all cursor-pointer cyber-cut-sm"
                title="Click to copy encrypted email address"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personal.email}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#070c18] border border-cyan-500/30 text-slate-400 hover:text-[#fcee0a] hover:border-[#fcee0a]/50 transition-all cyber-cut-sm"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#070c18] border border-cyan-500/30 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all cyber-cut-sm"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Cyber Terminal */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl bg-[#040814] border border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.15)] overflow-hidden hud-frame">
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#070c18] border-b border-cyan-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-none bg-[#ff0055] shadow-[0_0_8px_#ff0055]" />
                  <div className="w-2.5 h-2.5 rounded-none bg-[#fcee0a] shadow-[0_0_8px_#fcee0a]" />
                  <div className="w-2.5 h-2.5 rounded-none bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
                  <span className="ml-2 text-xs font-mono text-cyan-300 flex items-center gap-1.5 tracking-wider">
                    <TerminalIcon className="w-3.5 h-3.5 text-[#fcee0a]" />
                    root@cyber-net: ~
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#03060f] p-0.5 border border-cyan-500/30">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-2.5 py-0.5 text-[11px] font-mono tracking-wider transition-all ${
                      activeTab === "profile"
                        ? "bg-[#fcee0a] text-black font-bold shadow-[0_0_10px_rgba(252,238,10,0.5)]"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    neural.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`px-2.5 py-0.5 text-[11px] font-mono tracking-wider transition-all ${
                      activeTab === "architecture"
                        ? "bg-[#00f0ff] text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    core.config
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
                {activeTab === "profile" ? (
                  <div>
                    <div className="text-slate-500">// Aman Dadheech // Neural Profile Dossier</div>
                    <div className="mt-2">
                      <span className="text-[#ff0055] font-bold">const</span>{" "}
                      <span className="text-[#00f0ff] font-bold">architect</span>:{" "}
                      <span className="text-[#fcee0a]">FullStackAgent</span> = &#123;
                    </div>
                    <div className="pl-4">
                      name: <span className="text-[#fcee0a]">&quot;Aman Dadheech&quot;</span>,
                    </div>
                    <div className="pl-4">
                      currentRole:{" "}
                      <span className="text-[#00f0ff]">&quot;Full Stack Developer @ Idea2Reality&quot;</span>,
                    </div>
                    <div className="pl-4">
                      flagshipProject:{" "}
                      <span className="text-[#ff0055]">&quot;Restroeye (HORECA Multi-Tenant SaaS)&quot;</span>,
                    </div>
                    <div className="pl-4">
                      stack: [
                      <span className="text-[#00ff66]">&quot;Next.js&quot;</span>,{" "}
                      <span className="text-[#00ff66]">&quot;Node.js&quot;</span>,{" "}
                      <span className="text-[#00ff66]">&quot;PostgreSQL&quot;</span>,{" "}
                      <span className="text-[#00ff66]">&quot;Redis&quot;</span>,{" "}
                      <span className="text-[#00ff66]">&quot;Socket.IO&quot;</span>],
                    </div>
                    <div className="pl-4">
                      focusAreas: [
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-cyan-300">&quot;Multi-Tenant Data Isolation&quot;</span>,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-cyan-300">&quot;Sub-Second Order Dispatch Mesh&quot;</span>,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-cyan-300">&quot;Real-Time WebSocket Sync&quot;</span>
                      <br />
                      &nbsp;&nbsp;],
                    </div>
                    <div className="pl-4">
                      location: <span className="text-[#fcee0a]">&quot;Jaipur, India [26.9124° N, 75.7873° E]&quot;</span>,
                    </div>
                    <div className="pl-4">
                      status: <span className="text-[#00ff66] font-bold">&quot;ONLINE // READY_TO_DEPLOY&quot;</span>,
                    </div>
                    <div>&#125;;</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-slate-500"># Restroeye Production Telemetry</div>
                    <div className="mt-2 text-[#fcee0a] font-bold">[MultiTenantArchitecture]</div>
                    <div className="pl-2">
                      tenancy = <span className="text-[#00f0ff]">&quot;Role &amp; Property Scoped (RLS)&quot;</span>
                    </div>
                    <div className="pl-2">
                      database = <span className="text-[#00f0ff]">&quot;PostgreSQL 16 + Drizzle ORM&quot;</span>
                    </div>
                    <div className="pl-2">
                      caching = <span className="text-[#00f0ff]">&quot;Redis In-Memory KeyStore&quot;</span>
                    </div>
                    <div className="pl-2">
                      eventMesh = <span className="text-[#00f0ff]">&quot;Socket.IO + Web Push Service&quot;</span>
                    </div>
                    <div className="mt-3 text-[#ff0055] font-bold">[LiveOperationalNodes]</div>
                    <div className="pl-2 text-[#00ff66]">✓ Dine-In Contactless QR Engine</div>
                    <div className="pl-2 text-[#00ff66]">✓ Instant KOT / KDS Kitchen Pipeline</div>
                    <div className="pl-2 text-[#00ff66]">✓ Automated Tax &amp; Split Settlement</div>
                    <div className="pl-2 text-[#00ff66]">✓ Real-time Cross-Role Push Sync</div>
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-[#02050c] border-t border-cyan-500/20 flex items-center justify-between text-[11px] text-cyan-400/70 font-mono">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#00ff66]" />
                  SYS.STATUS: OPERATIONAL
                </span>
                <span className="text-[10px] text-slate-500">LATENCY: 14ms • BUFFER: 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cyberpunk Stats Bento Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {personal.stats.map((stat, idx) => (
            <Card
              key={idx}
              padding="sm"
              accent={idx % 2 === 0 ? "yellow" : "cyan"}
              className="hover:border-[#fcee0a]/60 hover:shadow-[0_0_20px_rgba(252,238,10,0.2)]"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                  // {stat.label}
                </span>
                <span className="text-[9px] font-mono text-[#fcee0a] border border-[#fcee0a]/30 px-1 py-0.2">
                  0{idx + 1}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mb-0.5 tracking-tight">
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
