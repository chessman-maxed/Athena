import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Athena | Proactive Security",
  description: "GitHub proactive safety guardrail and guided-learning extension.",
  icons: {
    icon: "/athena-logo.png",
    shortcut: "/athena-logo.png",
    apple: "/athena-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-obsidian-900 text-text-primary min-h-screen selection:bg-cyan-accent/30 selection:text-cyan-accent relative`}
      >
        <div className="fixed inset-0 bg-noise pointer-events-none z-50 mix-blend-overlay"></div>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
