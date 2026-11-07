"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, Mail, Copy, Check, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./common/Icons";
import { portfolioService } from "@/services/portfolioService";
import { contactService } from "@/services/contactService";
import { Button } from "./common/Button";
import { Card } from "./common/Card";
import { LuxuryWatch } from "./common/LuxuryWatch";
import { DemoPortrait } from "./common/DemoPortrait";

interface HeroProps {
  onCopySuccess: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCopySuccess }) => {
  const personal = portfolioService.getPersonalData();
  const [copied, setCopied] = useState(false);
  const [photoOk, setPhotoOk] = useState(true);

  const handleCopyEmail = async () => {
    const success = await contactService.copyToClipboard(personal.email);
    if (success) {
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const [firstName, ...rest] = personal.name.split(" ");

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 md:pt-40 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: headline & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start min-w-0">
            <div className="mb-6 animate-fade-up">
              <span className="glass flow-border relative inline-flex items-center gap-2 rounded-full pl-1.5 pr-3.5 py-1.5 text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-2 py-0.5 text-mint font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  Open
                </span>
                <span className="truncate">{personal.status.text}</span>
              </span>
            </div>

            <h1 className="animate-fade-up mb-6" style={{ animationDelay: "80ms" }}>
              <span className="flex items-center gap-3 mb-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.35em] text-gold">
                <span className="h-px w-8 sm:w-10 bg-gilded-static" aria-hidden="true" />
                Hi, I&apos;m
              </span>
              <span className="block font-display font-normal text-[2.6rem] min-[400px]:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-[-0.01em] text-balance">
                <span className="text-soft-gradient">{firstName}</span>{" "}
                <span className="italic text-gilded">{rest.join(" ")}</span>
              </span>
              <span className="block mt-3 text-base sm:text-lg font-light tracking-[0.04em] text-ink-muted">
                Full-stack software engineer
              </span>
            </h1>

            <p
              className="animate-fade-up text-ink-muted text-base sm:text-lg leading-relaxed mb-8 max-w-xl text-pretty"
              style={{ animationDelay: "160ms" }}
            >
              I build <span className="text-ink">multi-tenant SaaS platforms</span>,{" "}
              <span className="text-ink">real-time transactional systems</span> and{" "}
              <span className="text-ink">fast, accessible web apps</span>. Currently leading core
              workflows for Restroeye at Idea2Reality.
            </p>

            <div
              className="animate-fade-up flex flex-col min-[420px]:flex-row gap-3 mb-10 w-full min-[420px]:w-auto"
              style={{ animationDelay: "240ms" }}
            >
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                iconRight={<ArrowRight className="w-4 h-4" />}
                className="w-full min-[420px]:w-auto"
              >
                View my work
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={personal.links.resume}
                download="Aman_Dadheech_Resume.pdf"
                icon={<Download className="w-4 h-4" />}
                className="w-full min-[420px]:w-auto"
              >
                Download résumé
              </Button>
            </div>

            <div
              className="animate-fade-up flex flex-wrap items-center gap-2.5 w-full"
              style={{ animationDelay: "320ms" }}
            >
              <button
                onClick={handleCopyEmail}
                className="group inline-flex items-center gap-2 max-w-full rounded-full border border-line bg-surface px-3.5 h-10 text-sm text-ink-muted hover:text-ink hover:border-line-strong transition-colors cursor-pointer"
                title="Copy email address"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate">{personal.email}</span>
                {copied ? (
                  <Check className="w-4 h-4 shrink-0 text-mint" />
                ) : (
                  <Copy className="w-3.5 h-3.5 shrink-0 text-ink-dim group-hover:text-ink-muted" />
                )}
              </button>
              <a
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center h-10 w-10 rounded-full border border-line bg-surface text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center h-10 w-10 rounded-full border border-line bg-surface text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <span className="inline-flex items-center gap-1.5 text-sm text-ink-dim ml-1">
                <MapPin className="w-3.5 h-3.5" /> Jaipur, India
              </span>
            </div>
          </div>

          {/* Right: portrait in a gold arch, with the watch floating over its lower-left edge */}
          <div
            className="lg:col-span-6 min-w-0 pb-28 lg:pb-24 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative mx-auto w-[min(66vw,300px)] sm:w-[320px] lg:w-[360px] translate-x-[24%] sm:translate-x-[20%] lg:translate-x-[22%]">
              {/* slow-turning golden halo */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full opacity-35 blur-3xl animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(217,180,90,0.55), transparent 40%, rgba(138,106,31,0.5), transparent 75%)",
                }}
                aria-hidden="true"
              />

              {/* Arch frame */}
              <div className="glass flow-border relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-black/60">
                {/* Demo portrait — visible until /public/profile.jpg exists */}
                <DemoPortrait className="absolute inset-0 h-full w-full" />

                {photoOk && (
                  <Image
                    src="/profile.jpg"
                    alt={`Portrait of ${personal.name}`}
                    fill
                    sizes="(max-width: 640px) 66vw, (max-width: 1024px) 320px, 360px"
                    loading="eager"
                    fetchPriority="high"
                    className="object-cover object-top"
                    onError={() => setPhotoOk(false)}
                  />
                )}

                {/* fade the bottom of the photo into black */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
                {/* inner gold arch line */}
                <div
                  className="absolute inset-3 rounded-t-full rounded-b-[2rem] border border-line-strong pointer-events-none z-[2]"
                  aria-hidden="true"
                />
              </div>

              {/* The watch */}
              <div className="absolute z-10 w-[68%] lg:w-[84%] aspect-[320/600] -left-[48%] lg:-left-[58%] -bottom-[30%] lg:-bottom-[32%]">
                <LuxuryWatch className="h-full w-full animate-float drop-shadow-[0_30px_35px_rgba(0,0,0,0.95)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {personal.stats.map((stat, idx) => (
            <Card key={idx} padding="sm" accent={(["gold", "champagne", "mint", "pink"] as const)[idx % 4]}>
              <div className="eyebrow mb-3">{stat.label}</div>
              <div className="text-xl sm:text-2xl font-semibold tracking-tight text-ink mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-ink-muted">{stat.detail}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
