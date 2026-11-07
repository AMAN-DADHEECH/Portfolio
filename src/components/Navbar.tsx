"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { Button } from "./common/Button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const personal = portfolioService.getPersonalData();

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    let frame = 0;
    const handleScroll = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      // active section = last one whose top has passed 40% of the viewport
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(handleScroll);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
    };
  }, []);

  // Lock page scroll + close on Escape / resize to desktop while the mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  const initials = personal.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4">
      <div
        className={`mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-full pl-2 pr-2 sm:pl-3 py-2 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "glass flow-border relative bg-black/80"
            : "border border-transparent"
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 min-w-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          aria-label={`${personal.name} — Home`}
        >
          <span className="relative grid place-items-center h-9 w-9 shrink-0 rounded-full bg-gilded p-[1.5px]">
            <span className="grid place-items-center h-full w-full rounded-full bg-canvas text-[13px] font-semibold tracking-tight text-ink">
              {initials}
            </span>
          </span>
          <span className="flex flex-col min-w-0 leading-tight">
            <span className="text-sm font-semibold text-ink truncate">{personal.name}</span>
            <span className="flex items-center gap-1.5 text-[11px] text-ink-dim">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <span className="truncate">Available for work</span>
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
          {navLinks.map((link) => {
            const active = activeId === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={`relative px-3.5 py-2 rounded-full text-sm transition-colors duration-300 ${
                  active ? "text-gold bg-gold/10" : "text-ink-muted hover:text-ink hover:bg-surface-2"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-1/2 -bottom-0.5 h-px -translate-x-1/2 bg-gilded-static transition-all duration-500 ${
                    active ? "w-5 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            href={personal.links.resume}
            download="Aman_Dadheech_Resume.pdf"
            icon={<FileText className="w-3.5 h-3.5" />}
          >
            Resume
          </Button>
          <Button
            variant="primary"
            size="sm"
            href="#contact"
            iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Let&apos;s talk
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="lg:hidden grid place-items-center h-10 w-10 shrink-0 rounded-full border border-line bg-surface text-ink hover:bg-surface-2 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 -z-10 bg-canvas/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="lg:hidden mx-auto max-w-6xl mt-2 glass bg-canvas-2/90 rounded-3xl p-3 animate-scale-in max-h-[calc(100dvh-6rem)] overflow-y-auto"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base text-ink hover:bg-surface-2 transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-ink-dim">0{i + 1}</span>
                </a>
              ))}
            </nav>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 mt-3 pt-3 border-t border-line">
              <Button
                variant="secondary"
                size="md"
                href={personal.links.resume}
                download="Aman_Dadheech_Resume.pdf"
                icon={<FileText className="w-4 h-4" />}
                className="w-full"
              >
                Resume
              </Button>
              <Button
                variant="primary"
                size="md"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                iconRight={<ArrowUpRight className="w-4 h-4" />}
                className="w-full"
              >
                Let&apos;s talk
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
