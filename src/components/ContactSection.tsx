"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Copy, Check, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./common/Icons";
import { portfolioService } from "@/services/portfolioService";
import { contactService, ContactPayload } from "@/services/contactService";
import { Card } from "./common/Card";
import { Button } from "./common/Button";
import { SectionHeading } from "./common/SectionHeading";

interface ContactSectionProps {
  onCopySuccess: () => void;
}

const inputClasses =
  "w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-[15px] sm:text-sm text-ink placeholder:text-ink-dim transition-all focus:outline-none focus:border-gold/60 focus:ring-4 focus:ring-gold/15 disabled:opacity-50 disabled:cursor-not-allowed";
const labelClasses = "block text-sm font-medium text-ink-muted mb-2";

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

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Contact"
          title="Let's build something"
          highlightedText="together"
          subtitle="Hiring a full-stack engineer, need a SaaS architect, or want a technical second opinion? Send a message — I reply within a day."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Info column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {/* Email */}
            <Card padding="md" accent="gold" className="col-span-2">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="eyebrow mb-0.5">Email</div>
                  <a
                    href={personal.links.email}
                    className="block text-[15px] font-medium text-ink hover:text-white transition-colors break-all"
                  >
                    {personal.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="grid place-items-center h-10 w-10 shrink-0 rounded-full border border-line bg-surface text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </Card>

            {/* Phone */}
            <Card padding="sm" className="min-w-0">
              <div className="eyebrow mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-champagne" /> Phone
              </div>
              <a
                href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                className="text-sm sm:text-[15px] font-medium text-ink hover:text-white transition-colors whitespace-nowrap"
              >
                {personal.phone}
              </a>
            </Card>

            {/* Location */}
            <Card padding="sm" className="min-w-0">
              <div className="eyebrow mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose" /> Location
              </div>
              <div className="text-[15px] font-medium text-ink">Jaipur, India</div>
            </Card>

            {/* Availability */}
            <Card padding="md" accent="mint" className="col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-mint" />
                <h4 className="text-sm font-semibold text-ink">IST · UTC+5:30</h4>
              </div>
              <p className="text-sm text-ink-muted mb-4 leading-relaxed">
                Based in India and comfortable working async with teams anywhere in the world.
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1 text-xs font-medium text-mint">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                Ready to start
              </span>
            </Card>

            {/* Socials */}
            <div className="col-span-2 grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="md"
                href={personal.links.linkedin}
                external
                icon={<LinkedinIcon className="w-4 h-4" />}
                className="w-full"
              >
                LinkedIn
              </Button>
              <Button
                variant="secondary"
                size="md"
                href={personal.links.github}
                external
                icon={<GithubIcon className="w-4 h-4" />}
                className="w-full"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Card padding="lg" interactive={false} glow={false} className="flow-border">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">Send a message</h3>
                <p className="text-sm text-ink-dim mt-1">Usually answered within 24 hours.</p>
              </div>

              {statusMessage && (
                <div
                  role="alert"
                  className={`mb-6 flex items-start gap-2.5 rounded-xl border p-4 text-sm ${
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

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelClasses}>
                      Name <span className="text-gold">*</span>
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
                      placeholder="Alex Morgan"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClasses}>
                      Email <span className="text-gold">*</span>
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
                      placeholder="alex@company.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className={labelClasses}>
                    Subject <span className="text-gold">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    placeholder="Project inquiry, contract, full-time role…"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClasses}>
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    placeholder="Hi Aman, I saw your work on Restroeye and would love to talk about…"
                    className={`${inputClasses} resize-y min-h-[140px]`}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                  iconRight={<Send className="w-4 h-4" />}
                  className="w-full"
                >
                  {loading ? "Sending…" : "Send message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
