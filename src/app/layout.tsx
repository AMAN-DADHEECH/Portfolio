import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Dadheech | Full-Stack Software Developer & SaaS Architect",
  description:
    "Portfolio of Aman Dadheech, Full-Stack Software Developer specializing in Next.js, Node.js, PostgreSQL, Redis, Socket.IO, and production multi-tenant SaaS systems.",
  keywords: [
    "Aman Dadheech",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Socket.IO",
    "Restroeye",
    "SaaS Architecture",
    "Jaipur",
  ],
  authors: [{ name: "Aman Dadheech" }],
  creator: "Aman Dadheech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aman-dadheech.vercel.app",
    title: "Aman Dadheech | Full-Stack Software Developer & SaaS Architect",
    description:
      "Full-Stack Software Developer building high-performance web applications, multi-tenant SaaS platforms, and real-time transactional systems.",
    siteName: "Aman Dadheech Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Dadheech | Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer specializing in Next.js, Node.js, PostgreSQL, Redis, and Socket.IO.",
  },
};

export const viewport: Viewport = {
  themeColor: "#06080e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <body className="bg-[#06080e] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
