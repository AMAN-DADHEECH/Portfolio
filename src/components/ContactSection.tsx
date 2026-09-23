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
    _gotcha: "",
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
      setFormData({ name: "", email: "", subject: "", message: "", _gotcha: "" });
    } else {
      setStatusMessage({ text: response.message, type: "error" });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="[ SEC_04 // SECURE COMMS LINK ]"
          badgeVariant="yellow"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="OPEN TRANSMISSION //"
          highlightedText="INITIATE CONTACT"
          subtitle="Looking for a high-performance full-stack engineer, SaaS architect, or technical consultation? Transmit a direct message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Email Quick Card */}
            <Card padding="md" hudCorners={true} accent="yellow" className="border border-cyan-500/30 hover:border-[#fcee0a]/60">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#fcee0a]/10 border border-[#fcee0a]/30 text-[#fcee0a] cyber-cut-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider">// Encrypted Direct Email</div>
                    <a
                      href={personal.links.email}
                      className="text-sm font-bold font-mono text-white hover:text-[#fcee0a] transition-colors"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 bg-[#03060f] border border-cyan-500/30 text-slate-400 hover:text-[#fcee0a] hover:border-[#fcee0a]/50 transition-colors cyber-cut-sm cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#00ff66]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="sm" hudCorners={true} accent="cyan" className="border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <Phone className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-[11px] text-cyan-400 font-mono uppercase tracking-wider">// COMMS</span>
                </div>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                  className="text-xs sm:text-sm font-bold font-mono text-white hover:text-[#00f0ff] transition-colors"
                >
                  {personal.phone}
                </a>
              </Card>

              <Card padding="sm" hudCorners={true} accent="cyan" className="border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-[#ff0055]" />
                  <span className="text-[11px] text-cyan-400 font-mono uppercase tracking-wider">// LOC_COORDS</span>
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono text-white">
                  Jaipur, India [26.9°N]
                </div>
              </Card>
            </div>

            {/* Availability & Timezone Widget */}
            <Card padding="md" hudCorners={true} accent="cyan" className="border border-cyan-500/30 bg-[#040814]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#fcee0a]" />
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                  // TELEMETRY: IST / UTC+5:30
                </h4>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed font-sans">
                Operating in <strong>India Standard Time</strong> with complete availability for worldwide asynchronous teams and sprint delivery.
              </p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
                </span>
                <span className="text-xs font-mono text-[#00ff66] font-semibold">
                  STATUS: READY FOR ENGAGEMENT
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
                icon={<LinkedinIcon className="w-4 h-4 text-cyan-400" />}
                className="flex-1"
              >
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="md"
                href={personal.links.github}
                external
                icon={<GithubIcon className="w-4 h-4 text-cyan-400" />}
                className="flex-1"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Cyber Contact Form */}
          <div className="lg:col-span-7">
            <Card padding="lg" hudCorners={true} accent="yellow" className="border border-cyan-500/30 shadow-2xl">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/20">
                <div className="p-2 bg-[#fcee0a]/10 border border-[#fcee0a]/30 text-[#fcee0a] cyber-cut-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black font-mono uppercase text-white tracking-tight">
                    TRANSMIT DISPATCH
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/80">LATENCY &lt; 24 HOURS // 256-BIT SECURE</p>
                </div>
              </div>

              {statusMessage && (
                <div
                  className={`mb-6 p-4 border text-xs font-mono flex items-start gap-2.5 cyber-cut-sm ${
                    statusMessage.type === "success"
                      ? "bg-[#00ff66]/10 border-[#00ff66]/40 text-[#00ff66]"
                      : "bg-[#ff0055]/10 border-[#ff0055]/40 text-[#ff0055]"
                  }`}
                >
                  <p>{statusMessage.text}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase"
                    >
                      // IDENTIFIER / NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 bg-[#03060f] border border-cyan-500/30 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-[#fcee0a] focus:ring-1 focus:ring-[#fcee0a] transition-all cyber-cut-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase"
                    >
                      // RETURN_COMMS / EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      placeholder="e.g. alex@enterprise.com"
                      className="w-full px-4 py-2.5 bg-[#03060f] border border-cyan-500/30 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-[#fcee0a] focus:ring-1 focus:ring-[#fcee0a] transition-all cyber-cut-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase"
                  >
                    // DISPATCH_TOPIC / SUBJECT *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    placeholder="Project Inquiry / Engineering Contract / Full-Time Role"
                    className="w-full px-4 py-2.5 bg-[#03060f] border border-cyan-500/30 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-[#fcee0a] focus:ring-1 focus:ring-[#fcee0a] transition-all cyber-cut-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase"
                  >
                    // PAYLOAD / MESSAGE *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    placeholder="Hi Aman, I reviewed your work on Restroeye and would like to collaborate on..."
                    className="w-full px-4 py-2.5 bg-[#03060f] border border-cyan-500/30 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-[#fcee0a] focus:ring-1 focus:ring-[#fcee0a] transition-all resize-none cyber-cut-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                  icon={<Send className="w-4 h-4 text-black" />}
                  className="w-full"
                >
                  {loading ? "TRANSMITTING DISPATCH..." : "TRANSMIT MESSAGE // EXECUTE"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
