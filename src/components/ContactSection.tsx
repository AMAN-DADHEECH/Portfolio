"use client";

import React, { useState } from "react";
import { Send, Copy, Check, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";
import { contactService, ContactPayload } from "@/services/contactService";
import { Button } from "./common/Button";
import { MaskWords, FadeIn, Magnetic, DrawLine } from "./motion/Motion";

interface ContactSectionProps {
  onCopySuccess: () => void;
}

/* Minimal underlined field: the gold line draws in on focus */
const fieldWrap = "group relative";
const inputClasses =
  "peer w-full bg-transparent border-0 border-b border-line-strong px-0 pt-2 pb-3 text-base text-ink placeholder:text-ink-dim/70 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed";
const focusLine =
  "pointer-events-none absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[rgb(var(--edge))] to-[rgb(var(--edge-light))] transition-transform duration-500 peer-focus:scale-x-100";
const labelClasses = "block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim";

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopySuccess }) => {
  const personal = portfolioService.getPersonalData();
  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage) setStatusMessage(null);
  };

  const handleCopyEmail = async () => {
    const success = await contactService.copyToClipboard(personal.email);
    if (success) {
      setCopiedEmail(true);
      onCopySuccess();
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const response = await contactService.submitContactForm(formData);

    setLoading(false);
    if (response.success) {
      setStatusMessage({ text: response.message, type: "success" });
      setFormData({ name: "", email: "", subject: "", message: "", _gotcha: "" });
    } else {
      setStatusMessage({ text: response.message, type: "error" });
    }
  };

  const [local, domain] = personal.email.split("@");
  const links = [
    { label: "LinkedIn", href: personal.links.linkedin },
    { label: "GitHub", href: personal.links.github },
    { label: "Résumé", href: personal.links.resume },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[rgb(var(--edge))]">
          <span>05</span>
          <DrawLine className="w-10 sm:w-16 bg-[rgb(var(--edge))]" />
          <span>Contact</span>
        </div>

        {/* Giant headline + magnetic orb */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <h2 className="font-display text-[2.6rem] leading-[1] sm:text-6xl lg:text-[4.6rem] tracking-[-0.01em]">
            <MaskWords text="Let's create" className="text-soft-gradient" />
            <br />
            <MaskWords text="something" className="text-soft-gradient" delay={0.12} />{" "}
            <MaskWords text="precious." className="italic text-gilded" delay={0.24} />
          </h2>

          <FadeIn delay={0.3} className="shrink-0 self-start lg:self-end">
            <Magnetic strength={0.4}>
              <a
                href={personal.links.email}
                className="group relative grid place-items-center h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-gilded-static text-black shadow-[0_20px_60px_-15px_rgba(217,180,90,0.7)] transition-transform duration-500 hover:scale-105"
              >
                <span className="absolute inset-[-10px] rounded-full border border-[rgb(var(--edge)/0.4)] animate-spin-slow [border-style:dashed]" />
                <span className="text-center">
                  <ArrowUpRight className="mx-auto w-6 h-6 transition-transform duration-500 group-hover:rotate-45" />
                  <span className="mt-1 block font-display text-2xl italic">Say hello</span>
                </span>
              </a>
            </Magnetic>
          </FadeIn>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Direct details */}
          <FadeIn className="lg:col-span-5 space-y-10">
            <div>
              <div className={labelClasses}>Email</div>
              <div className="mt-3 flex items-start gap-3">
                <a
                  href={personal.links.email}
                  className="group relative font-display text-[1.7rem] sm:text-4xl leading-tight text-ink [overflow-wrap:anywhere]"
                >
                  {local}
                  <wbr />
                  <span className="text-gilded">@{domain}</span>
                  <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-[rgb(var(--edge))] transition-transform duration-500 group-hover:scale-x-100" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="mt-1 grid place-items-center h-10 w-10 shrink-0 rounded-full border border-line-strong text-ink-muted hover:text-ink hover:border-[rgb(var(--edge))] transition-colors cursor-pointer"
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className={labelClasses}>Phone</div>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                  className="mt-2 block text-lg text-ink hover:text-[rgb(var(--edge-light))] transition-colors"
                >
                  {personal.phone}
                </a>
              </div>
              <div>
                <div className={labelClasses}>Location</div>
                <div className="mt-2 text-lg text-ink">Jaipur, India</div>
              </div>
            </div>

            <div>
              <div className={labelClasses}>Elsewhere</div>
              <ul className="mt-3 border-t border-line">
                {links.map((l) => (
                  <li key={l.label} className="border-b border-line">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 font-display text-2xl text-ink-muted hover:text-ink transition-colors"
                    >
                      <span className="transition-transform duration-500 group-hover:translate-x-2">{l.label}</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45 group-hover:text-[rgb(var(--edge))]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="inline-flex items-center gap-2 text-sm text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Available now · replies within 24 hours
            </p>
          </FadeIn>

          {/* Form */}
          <FadeIn className="lg:col-span-7" delay={0.15}>
            <h3 className="font-display text-3xl sm:text-4xl text-ink">
              Or leave a <span className="italic text-gilded">note</span>
            </h3>

            {statusMessage && (
              <div
                role="alert"
                className={`mt-6 flex items-start gap-2.5 rounded-xl border p-4 text-sm ${
                  statusMessage.type === "success"
                    ? "bg-mint/10 border-mint/25 text-mint"
                    : "bg-rose/10 border-rose/25 text-rose"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                )}
                <p>{statusMessage.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-10 space-y-10">
              {/* Anti-spam honeypot - invisible to humans, catches automated bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-gotcha">Do not fill this field</label>
                <input
                  id="contact-gotcha"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._gotcha || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className={fieldWrap}>
                  <label htmlFor="contact-name" className={labelClasses}>
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                  <span className={focusLine} />
                </div>
                <div className={fieldWrap}>
                  <label htmlFor="contact-email" className={labelClasses}>
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                  <span className={focusLine} />
                </div>
              </div>

              <div className={fieldWrap}>
                <label htmlFor="contact-subject" className={labelClasses}>
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder="What is this about?"
                  className={inputClasses}
                />
                <span className={focusLine} />
              </div>

              <div className={fieldWrap}>
                <label htmlFor="contact-message" className={labelClasses}>
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder="Write your message…"
                  className={`${inputClasses} resize-none`}
                />
                <span className={focusLine} />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
                iconRight={<Send className="w-4 h-4" />}
              >
                {loading ? "Sending…" : "Send message"}
              </Button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
