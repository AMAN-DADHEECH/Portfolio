# Aman Dadheech — Full-Stack Developer Portfolio

High-performance developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Custom Design Tokens**. Engineered with an obsidian dark theme, interactive bento grid cards, live terminal widget, and production SaaS architecture breakdowns.

---

## 🛠 Available Scripts

In the project directory, you can run:

### `npm run type-check`
Runs the TypeScript compiler (`tsc --noEmit`) to verify all types, props, component interfaces, and DOM bindings across the entire codebase without needing browser DOM extraction or building bundles.

### `npm run type-check:watch`
Runs TypeScript in watch mode so type-checking runs continuously as you edit code.

### `npm run dev`
Starts the Next.js local development server with Turbopack on [http://localhost:3000](http://localhost:3000).

### `npm run build`
Creates an optimized production build with static route generation.

### `npm run start`
Starts the Next.js production server.

### `npm run lint`
Runs ESLint to check for code quality and style rules.

---

## 📂 Architecture Overview

- **`src/app/`**: Next.js App Router root layout, SEO metadata, and obsidian theme tokens (`globals.css`).
- **`src/components/common/`**: Reusable primitives (`Button`, `Card`, `Badge`, `SectionHeading`, `Toast`, `Icons`).
- **`src/components/`**: Feature sections (`Hero`, `BentoAbout`, `ProjectsSection`, `ProjectModal`, `ExperienceSection`, `ContactSection`, `Navbar`, `Footer`).
- **`src/services/`**: Modular logic layer:
  - `themeService.ts`: Design tokens and gradient utilities.
  - `portfolioService.ts`: Data access and category filters.
  - `contactService.ts`: Form validation, feedback, and clipboard copying.
- **`src/data/portfolioData.ts`**: Single source of truth for resume info, projects, and skills.
- **`src/types/index.ts`**: Centralized domain and DOM event types.

---

## 🚀 Free Deployment

To deploy for free on **Vercel** or **Netlify**, refer to the step-by-step guide in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).
