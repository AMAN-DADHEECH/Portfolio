"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Clock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./common/Icons";
import { portfolioService } from "@/services/portfolioService";
import { contactService, ContactPayload } from "@/services/contactService";
import { Card } from "./common/Card";
import { Badge } from "./common/Badge";
import { Button } from "./common/Button";
import { SectionHeading } from "./common/SectionHeading";

interface ContactSectionProps {
  onCopySuccess: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopySuccess }) => {
  const personal = portfolioService.getPersonalData();
  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatusMessage({ text: response.message, type: "error" });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Let's Connect"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="Start a Conversation or"
          highlightedText="Discuss an Opportunity"
          subtitle="Whether you're looking for a full-stack engineer, have a project proposal, or want to talk tech architecture—my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Email Quick Card */}
            <Card padding="md" className="border border-white/10 hover:border-indigo-500/40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase">Direct Email</div>
                    <a
                      href={personal.links.email}
                      className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="sm" className="border border-white/10">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-slate-400 font-mono uppercase">Phone</span>
                </div>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                  className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                >
                  {personal.phone}
                </a>
              </Card>

              <Card padding="sm" className="border border-white/10">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-400 font-mono uppercase">Location</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  Jaipur, Rajasthan, India
                </div>
              </Card>
            </div>

            {/* Availability & Timezone Widget */}
            <Card padding="md" className="border border-white/10 bg-slate-900/40">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <h4 className="text-sm font-semibold text-white">Work Status &amp; Timezone</h4>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                Operating in <strong>India Standard Time (IST / UTC+5:30)</strong> with full flexibility for worldwide asynchronous collaboration.
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  Open to Full-Time, Remote &amp; Hybrid Positions
                </span>
              </div>
            </Card>

            {/* Social Links Bar */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                href={personal.links.linkedin}
                external
                icon={<LinkedinIcon className="w-4 h-4" />}
                className="flex-1"
              >
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="md"
                href={personal.links.github}
                external
                icon={<GithubIcon className="w-4 h-4" />}
                className="flex-1"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                  <p className="text-xs text-slate-400">Quick response within 24 hours</p>
                </div>
              </div>

              {statusMessage && (
                <div
                  className={`mb-6 p-4 rounded-xl border text-sm flex items-start gap-2.5 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                  }`}
                >
                  <p>{statusMessage.text}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Project Inquiry / Full-Time Role Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-slate-300 mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Hi Aman, I saw your work on Restroeye and would love to discuss..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  loading={loading}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
