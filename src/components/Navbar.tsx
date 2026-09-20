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
          ? "py-3.5 bg-[#06080e]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Aman Dadheech - Portfolio Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <span className="text-sm font-bold text-white tracking-wider">AD</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                {personal.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Available for hire
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-5 py-1.5 backdrop-blur-lg">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
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
              icon={<FileText className="w-3.5 h-3.5" />}
            >
              Resume
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d16]/98 border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-indigo-400 py-2 transition-colors border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              size="md"
              href={personal.links.resume}
              download="Aman_Dadheech_Resume.pdf"
              icon={<FileText className="w-4 h-4" />}
              className="w-full"
            >
              Download Resume
            </Button>
            <Button
              variant="glow"
              size="md"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              icon={<Sparkles className="w-4 h-4" />}
              className="w-full"
            >
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
