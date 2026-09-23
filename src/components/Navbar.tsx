"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, Send, Sparkles } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { Button } from "./common/Button";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const personal = portfolioService.getPersonalData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#030712]/92 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-950/40"
          : "py-4.5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Aman Dadheech - Cyberpunk Portfolio Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-[#fcee0a] p-0.5 shadow-[0_0_15px_rgba(252,238,10,0.5)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all duration-300 cyber-cut-sm">
              <div className="w-full h-full bg-[#030712] flex items-center justify-center">
                <span className="text-xs font-mono font-extrabold text-[#fcee0a] group-hover:text-[#00f0ff] transition-colors tracking-widest">
                  AD
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold tracking-wider text-white group-hover:text-[#00f0ff] transition-colors">
                  {personal.name.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-[#fcee0a] border border-[#fcee0a]/40 px-1 py-0.2 rounded-xs">
                  v2.6
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
                </span>
                <span className="text-[11px] text-[#00ff66] font-mono tracking-wide">
                  SYS.ONLINE // HIREABLE
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#070c18]/90 border border-cyan-500/30 px-5 py-1.5 backdrop-blur-lg cyber-cut-sm shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider uppercase text-slate-300 hover:text-[#fcee0a] hover:bg-cyan-500/10 transition-colors"
              >
                <span className="text-cyan-500/50 mr-1">//</span>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              href={personal.links.resume}
              download="Aman_Dadheech_Resume.pdf"
              icon={<FileText className="w-3.5 h-3.5 text-[#00f0ff]" />}
            >
              Resume.pdf
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Init Comms
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-[#070c18] border border-cyan-500/40 text-cyan-300 hover:text-[#fcee0a] cyber-cut-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#040814]/98 border-b border-cyan-500/30 px-6 py-6 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="flex flex-col gap-3 mb-6 font-mono">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-[#fcee0a] py-2 transition-colors border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-cyan-500 text-xs">// 0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              size="md"
              href={personal.links.resume}
              download="Aman_Dadheech_Resume.pdf"
              icon={<FileText className="w-4 h-4 text-cyan-400" />}
              className="w-full"
            >
              Download Resume
            </Button>
            <Button
              variant="primary"
              size="md"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              icon={<Sparkles className="w-4 h-4" />}
              className="w-full"
            >
              Init Comms
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
