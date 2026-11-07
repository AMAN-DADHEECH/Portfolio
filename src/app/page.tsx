"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BentoAbout } from "@/components/BentoAbout";
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
    <main className="relative min-h-screen overflow-x-clip text-ink">
      <Navbar />
      <Hero onCopySuccess={handleCopyToast} />
      <BentoAbout />
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
  );
}
