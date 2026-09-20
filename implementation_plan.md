# Implementation Plan: Aman Dadheech — Full-Stack Portfolio (Next.js)

Design and build an elite, high-performance personal portfolio tailored for **Aman Dadheech**, Full-Stack Software Developer specializing in SaaS platforms, real-time systems, multi-tenant architecture, and modern web applications. The site will feature a **Sleek Dark Mode & Bento Grid** aesthetic with rich glassmorphism, neon glow accents, interactive project showcases, real-time architecture diagrams, and a ready-to-deploy structure for free hosting on **Vercel** or **Netlify**.

---

## User Profile Integration (from Resume)

- **Name**: Aman Dadheech
- **Role**: Full-Stack Software Developer & SaaS Architect
- **Location**: Jaipur, Rajasthan, India
- **Contact**: work.amandadheech2005@gmail.com | +91 8824741359
- **Links**: LinkedIn (aman-dadheech-62897323a), GitHub (AMAN-DADHEECH)
- **Current Experience**: Idea2Reality (Full Stack Developer on *Restroeye* multi-tenant SaaS)
- **Previous Experience**: Catalyst Atal Incubation Center (Web Developer Intern)
- **Education**: B.Tech in Computer Science & Engineering, Global Institute Of Technology (2021–2025)
- **Resume Download**: Copy `AD_SEP_RESUME.pdf` to `public/Aman_Dadheech_Resume.pdf` for direct download in the Hero & Navigation.

---

## Proposed Architecture & Design System

### 1. Visual Theme & Aesthetics
- **Theme**: Premium Deep Slate / Obsidian Dark Mode (`#090d16`, `#0f172a`) with subtle ambient radial glow accents (`indigo`, `cyan`, `violet`).
- **Typography**: Clean, modern fonts (Geist / Inter + JetBrains Mono for code/tech elements).
- **Layout Architecture**:
  - **Bento Grid**: Modular cards highlighting core capabilities, architecture mindset, live stats, and tech proficiency.
  - **Glassmorphism**: Subtle frosted-glass borders (`rgba(255, 255, 255, 0.08)`), backdrop blur, and glowing hover borders.
  - **Micro-Interactions**: Smooth card tilt/hover states, active navigation tracking, copy-to-clipboard email pill, and project preview modals.

### 2. Core Sections
1. **Header / Navigation**:
   - Floating glassmorphic dock with logo, smooth anchor links (`#about`, `#skills`, `#projects`, `#experience`, `#contact`), and "Available for work" glowing badge.
2. **Hero Section**:
   - High-impact headline: Full-Stack Developer & System Architect.
   - Interactive terminal widget previewing developer profile / stack in real time.
   - Dual Call-to-Action (CTA): "Explore Projects" & "Get in Touch" / "Download Resume".
3. **Bento Grid (About & Engineering Philosophy)**:
   - System design & architecture philosophy card.
   - Dynamic tech stack categorized into **Frontend**, **Backend & APIs**, **Databases & DevOps**, and **Tools**.
   - Key metrics card (Projects delivered, code quality, uptime focus).
4. **Featured Projects Showcase**:
   - Filterable project grid (All, Full-Stack, Frontend, Backend & APIs).
   - Rich project cards featuring live demo links, GitHub source links, tech tags, architectural highlights, and responsive preview mockups.
5. **Experience & Milestones Timeline**:
   - Chronological timeline for work history, freelance contracts, education, and milestones.
6. **Contact Section & Footer**:
   - Interactive contact form with client-side validation, loading states, and notification feedback.
   - Direct connect cards (Email with 1-click copy, GitHub, LinkedIn, Discord).
   - Clean footer with back-to-top button and deployment badges.

---

## Proposed Changes

### Setup & Foundation
#### [NEW] Next.js Project Bootstrap
- Initialize Next.js project in `./` with App Router, TypeScript/JavaScript, and structured directory layout (`src/app`, `src/components`, `src/data`, `src/styles`).
- Install icon system (`lucide-react`) for clean, responsive iconography.

#### [NEW] [src/styles/globals.css](file:///d:/A_D/Portfolio/src/styles/globals.css)
- Comprehensive design tokens: CSS custom properties for dark mode, glassmorphism, radiant gradients, bento grid borders, responsive typography, and keyframe animations.

#### [NEW] [src/data/portfolioData.ts](file:///d:/A_D/Portfolio/src/data/portfolioData.ts)
- Single source of truth containing:
  - Personal info, titles, bio, status badges, social links.
  - Categorized skills (Frontend, Backend, Databases, Cloud & DevOps).
  - Featured projects with tags, descriptions, live demo URLs, and GitHub links.
  - Work history & education timeline milestones.

---

### Component Layer (`src/components/`)
#### [NEW] [Navbar.tsx](file:///d:/A_D/Portfolio/src/components/Navbar.tsx)
- Floating sticky glassmorphic navigation dock with active section indicator, mobile hamburger menu, and quick action CTA.

#### [NEW] [Hero.tsx](file:///d:/A_D/Portfolio/src/components/Hero.tsx)
- Hero banner with animated badge, full-stack headline, interactive terminal / code preview, and CTA buttons.

#### [NEW] [BentoAbout.tsx](file:///d:/A_D/Portfolio/src/components/BentoAbout.tsx)
- Asymmetric bento grid showcasing engineering philosophy, live skill badges, quick facts, and development workflow.

#### [NEW] [ProjectsSection.tsx](file:///d:/A_D/Portfolio/src/components/ProjectsSection.tsx)
- Filterable project cards with hover zoom preview, tech stack badges, external live demo & GitHub repository links.

#### [NEW] [ExperienceSection.tsx](file:///d:/A_D/Portfolio/src/components/ExperienceSection.tsx)
- Vertical timeline component illustrating career journey, roles, and accomplishments.

#### [NEW] [ContactSection.tsx](file:///d:/A_D/Portfolio/src/components/ContactSection.tsx)
- Validated contact form, 1-click email copy button, social links, and timezone/availability card.

#### [NEW] [Footer.tsx](file:///d:/A_D/Portfolio/src/components/Footer.tsx)
- Minimalist footer with copyright, back-to-top button, and platform details.

---

### Page Assembly
#### [NEW] [src/app/page.tsx](file:///d:/A_D/Portfolio/src/app/page.tsx)
- Assemble components into a seamless, high-performance single-page portfolio with smooth scrolling.

#### [NEW] [src/app/layout.tsx](file:///d:/A_D/Portfolio/src/app/layout.tsx)
- SEO meta tags (title, description, OpenGraph preview, viewport settings, favicon).

#### [NEW] [DEPLOYMENT_GUIDE.md](file:///d:/A_D/Portfolio/DEPLOYMENT_GUIDE.md)
- Complete step-by-step guide to push to GitHub and deploy to Vercel / Netlify for free with automatic SSL.

---

## Verification Plan

### Automated Build Verification
1. **TypeScript / Linter Check**:
   ```bash
   npm run lint
   ```
2. **Next.js Production Build**:
   ```bash
   npm run build
   ```
   Ensures zero compilation errors, proper static page generation, and optimized bundles.

### Browser & Responsive Verification
1. Launch local dev server:
   ```bash
   npm run dev
   ```
2. Test responsive layouts using browser subagent on:
   - Mobile viewport (`390px x 844px`)
   - Tablet viewport (`768px x 1024px`)
   - Desktop viewport (`1440px x 900px`)
3. Validate interactive elements:
   - Navigation links scroll smoothly to matching section IDs.
   - Project filter buttons switch categories seamlessly.
   - Contact form fields validate input (required, valid email).
   - "Copy Email" button triggers feedback notification.
