export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Full-Stack" | "Frontend" | "Backend" | "All";
  description: string;
  features: string[];
  technologies: string[];
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  badge?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: string; highlight?: boolean }[];
}

export const portfolioData = {
  personal: {
    name: "Aman Dadheech",
    preferredName: "Aman",
    role: "Full-Stack Software Developer",
    subtitle: "Building resilient SaaS platforms, high-throughput real-time systems & modern web applications.",
    location: "Jaipur, Rajasthan, India",
    email: "work.amandadheech2005@gmail.com",
    phone: "+91 8824741359",
    status: {
      available: true,
      text: "Available for Full-time Roles & Contracts",
    },
    links: {
      github: "https://github.com/AMAN-DADHEECH",
      linkedin: "https://linkedin.com/in/aman-dadheech-62897323a",
      email: "mailto:work.amandadheech2005@gmail.com",
      resume: "/Aman_Dadheech_Resume.pdf",
    },
    bio: [
      "I am a Full-Stack Software Developer with deep hands-on expertise building production-grade web applications and multi-tenant SaaS platforms. I bridge pixel-perfect frontend engineering with robust, distributed backend architecture.",
      "Currently contributing to Restroeye at Idea2Reality—a mission-critical HORECA SaaS where I engineer transactional order-to-settlement workflows, real-time WebSocket state distribution with Redis, and tenant-isolated database designs.",
    ],
    stats: [
      { label: "Core Tech Stack", value: "Next.js & Node", detail: "TypeScript, PostgreSQL, Redis" },
      { label: "Production Experience", value: "SaaS & Real-Time", detail: "HORECA Multi-Tenant System" },
      { label: "Database Architect", value: "SQL & NoSQL", detail: "PostgreSQL, Drizzle ORM, Redis" },
      { label: "CS Background", value: "B.Tech CSE", detail: "Global Institute of Technology" },
    ],
  },

  skills: [
    {
      title: "Frontend Engineering",
      icon: "layout",
      skills: [
        { name: "Next.js 14/15", level: "Advanced", highlight: true },
        { name: "React.js", level: "Advanced", highlight: true },
        { name: "TypeScript", level: "Advanced", highlight: true },
        { name: "Tailwind CSS", level: "Advanced", highlight: true },
        { name: "HTML5 / CSS3", level: "Expert" },
        { name: "State Management", level: "Advanced" },
        { name: "Responsive UI/UX", level: "Expert" },
      ],
    },
    {
      title: "Backend & Systems",
      icon: "server",
      skills: [
        { name: "Node.js", level: "Advanced", highlight: true },
        { name: "Express.js", level: "Advanced", highlight: true },
        { name: "Socket.IO", level: "Advanced", highlight: true },
        { name: "RESTful APIs", level: "Expert", highlight: true },
        { name: "Web Push & Service Workers", level: "Proficient" },
        { name: "Python", level: "Proficient" },
        { name: "C++ / C", level: "Proficient" },
      ],
    },
    {
      title: "Databases & Caching",
      icon: "database",
      skills: [
        { name: "PostgreSQL", level: "Advanced", highlight: true },
        { name: "Redis", level: "Advanced", highlight: true },
        { name: "Drizzle ORM", level: "Advanced", highlight: true },
        { name: "MySQL", level: "Proficient" },
        { name: "MongoDB", level: "Proficient" },
        { name: "Relational Modeling", level: "Advanced" },
      ],
    },
    {
      title: "DevOps & Core Principles",
      icon: "cpu",
      skills: [
        { name: "Multi-Tenant Architecture", level: "Advanced", highlight: true },
        { name: "Real-Time Systems", level: "Advanced", highlight: true },
        { name: "Docker", level: "Proficient" },
        { name: "Git / GitHub CI", level: "Advanced" },
        { name: "Authentication & RBAC", level: "Advanced" },
        { name: "Data Structures & OOP", level: "Advanced" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "restroeye",
      title: "Restroeye — Multi-Tenant HORECA Restaurant SaaS",
      tagline: "End-to-end mission-critical restaurant management platform with real-time sync",
      category: "Full-Stack",
      featured: true,
      badge: "Production SaaS",
      description:
        "A multi-tenant HORECA SaaS that centralizes restaurant operations into a unified real-time workflow covering digital QR ordering, table reservations, KOT/KDS kitchen displays, split billing, payment settlement, and live role-scoped operational notifications.",
      features: [
        "Architected complete order-to-settlement lifecycle supporting dine-in, incremental ordering, multi-area seating, KOT generation, open bills, and server-authoritative settlement.",
        "Engineered real-time synchronization between kitchen, waiter, cashier, and manager dashboards using Socket.IO, Redis caching, and Web Push notifications.",
        "Implemented multi-tenant and role/property-scoped schema using PostgreSQL & Drizzle ORM with strict API contract validation and audit trails.",
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Drizzle ORM", "Redis", "Socket.IO", "Web Push"],
      githubUrl: "https://github.com/AMAN-DADHEECH",
      liveUrl: "https://github.com/AMAN-DADHEECH/Restroeye",
    },
    {
      id: "rental-dress",
      title: "Fashion & Dress Rental E-Commerce Platform",
      tagline: "Full-stack rental marketplace with booking schedules & customer workflows",
      category: "Full-Stack",
      featured: true,
      badge: "Full-Stack Web",
      description:
        "A responsive dress rental e-commerce platform featuring dynamic product catalogs, rental calendar availability, secure user authentication, order management, and customer-oriented navigation.",
      features: [
        "Dynamic rental catalog with interactive filtering by category, size, price, and booking dates.",
        "Integrated Node.js backend services powering customer authentication, cart operations, and session preservation.",
        "Optimized mobile-first interface ensuring seamless checkout flows across all devices.",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "REST APIs"],
      githubUrl: "https://github.com/AMAN-DADHEECH",
      liveUrl: "https://github.com/AMAN-DADHEECH",
    },
    {
      id: "realtime-event-mesh",
      title: "Distributed Real-Time WebSocket & Redis Mesh",
      tagline: "High-throughput Pub/Sub messaging pipeline for multi-client synchronization",
      category: "Backend",
      featured: false,
      badge: "Systems & Backend",
      description:
        "A resilient real-time event distribution broker engineered with Node.js and Redis Pub/Sub channels to broadcast state changes across isolated instances with sub-50ms latency.",
      features: [
        "Horizontally scalable WebSocket clustering backed by Redis Pub/Sub adapters.",
        "Heartbeat monitoring, automatic reconnect backoff, and state hydration upon reconnection.",
        "Role-based event routing ensuring strict tenant isolation across WebSocket rooms.",
      ],
      technologies: ["Node.js", "Socket.IO", "Redis Pub/Sub", "TypeScript", "Docker"],
      githubUrl: "https://github.com/AMAN-DADHEECH",
    },
    {
      id: "developer-analytics",
      title: "Interactive SaaS Metrics & Operational Console",
      tagline: "High-performance operational dashboard with dark-mode analytics",
      category: "Frontend",
      featured: false,
      badge: "Modern UI/UX",
      description:
        "A developer-centric operational console tracking API latencies, active tenant sessions, order flow volumes, and system resource health in a sleek bento grid interface.",
      features: [
        "Interactive SVG data visualizations and real-time metric counters.",
        "Glassmorphic design system with responsive card layouts and smooth micro-animations.",
        "Optimized client-side caching minimizing layout shifts and redundant network requests.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Modern CSS Tokens"],
      githubUrl: "https://github.com/AMAN-DADHEECH",
    },
  ] as Project[],

  experience: [
    {
      id: "exp-1",
      company: "Idea2Reality",
      role: "Full Stack Developer",
      period: "Apr 2026 – Present",
      location: "Udaipur, India",
      type: "Full-time",
      description: [
        "Contributing to Restroeye, a high-volume multi-tenant HORECA Restaurant Management SaaS, developing core features across Next.js, TypeScript, Node.js, Express.js, PostgreSQL, Drizzle ORM, Redis, and Socket.IO.",
        "Engineered end-to-end operational workflows for orders, QR ordering, tables, KOT/KDS, billing, payments, split bills, and customer sessions, coordinating frontend state, backend APIs, and transactional database operations.",
        "Implemented real-time operational communication using Socket.IO, Redis, Web Push, and service workers for kitchen, waiter, billing, and management workflows.",
        "Worked on multi-tenant and role/property-scoped application architecture, including API contracts, validation, database workflows, caching, auditability, and server-authoritative business logic.",
      ],
      skills: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Drizzle ORM", "Redis", "Socket.IO"],
    },
    {
      id: "exp-2",
      company: "Catalyst Atal Incubation Center",
      role: "Intern Web Developer",
      period: "Jun 2024 – Aug 2024",
      location: "Jaipur, India",
      type: "Internship",
      description: [
        "Developed responsive web interfaces and integrated Node.js backend services supporting authentication and application workflows.",
        "Built a dynamic user dashboard with personalized data presentation and interactive functionality, improving navigation and overall usability.",
        "Collaborated with senior engineers on REST API performance tuning and responsive mobile styling.",
      ],
      skills: ["JavaScript", "Node.js", "HTML5", "CSS3", "REST APIs", "Git"],
    },
  ] as Experience[],

  education: {
    institution: "Global Institute Of Technology",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2021 – 2025",
    location: "Jaipur, Rajasthan, India",
    grade: "GPA: 7.58 / 10.00",
    highlights: [
      "Specialized in Software Engineering, Relational Database Management, Data Structures & Algorithms",
      "Completed core coursework in Operating Systems, Computer Networks, and Object-Oriented System Design",
    ],
  },
};
