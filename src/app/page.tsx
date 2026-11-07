"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { MotionConfig } from "motion/react";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/common/Toast";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyToast = () => {
    setToastMessage("Email copied to clipboard!");
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative min-h-screen overflow-x-clip text-ink">
      <Navbar />
      <Hero onCopySuccess={handleCopyToast} />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection onCopySuccess={handleCopyToast} />
      <Footer />

      <Toast
        message={toastMessage || ""}
        isOpen={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </main>
    </MotionConfig>
  );
}
