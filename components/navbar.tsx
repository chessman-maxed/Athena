"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled 
          ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/10" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-cyan-accent/10 border border-cyan-accent/30 group-hover:border-cyan-accent/60 transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)]">
          <Image
            src="/athena-logo.png"
            alt="Athena Logo"
            width={32}
            height={32}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <span className="font-bold text-white tracking-wide text-lg group-hover:text-cyan-accent transition-colors">
          Athena
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
        <a href="#pr-demo" className="hover:text-white transition-colors">How It Works</a>
        <a href="#problem" className="hover:text-white transition-colors">Risk Detection</a>
      </nav>

      <a 
        href="#installation-card" 
        className="px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-gray-200 transition-colors"
      >
        Install Athena
      </a>
    </header>
  );
}
