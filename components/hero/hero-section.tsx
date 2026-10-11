"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Terminal } from "lucide-react";
import { HeroInterface } from "./hero-interface";
import { KineticGrid } from "@/components/backgrounds/KineticGrid";
import { HeroGlitchText } from "./hero-glitch-text";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const introSectionRef = useRef<HTMLElement>(null);
  const prSectionRef = useRef<HTMLElement>(null);
  const prPinWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Entrance for Hero Intro (following headline glitch reveal)
      const introTl = gsap.timeline();
      introTl
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.85
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          1.05
        );

      // 2. Master Pinned Scrub Timeline on the Dedicated PR Showcase Section
      // This ensures the box is 100% FULLY VISIBLE in viewport before pinning & animating
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: prSectionRef.current,
          start: "top top",
          end: "+=280%",
          pin: prPinWrapperRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 0% -> 15%: Subtle scan starts
      scrubTl
        .fromTo(
          ".hero-scan-line",
          { top: "-2%", opacity: 0 },
          { top: "102%", opacity: 1, duration: 1.5, ease: "none" }
        )

        // 20% -> 35%: Athena Analyzes (Branch Analysis State)
        .to(".hero-analyzing-badge", { opacity: 1, duration: 0.6 }, "-=1.0")
        .to(".hero-branch-row", { borderColor: "rgba(0, 240, 255, 0.4)", backgroundColor: "rgba(0, 240, 255, 0.05)", duration: 0.6 }, "<")
        .to(".hero-drift-tag", { opacity: 1, duration: 0.6 }, "<")

        // 35% -> 50%: Risk Detected (Status changes from UP TO DATE to OUT OF DATE)
        .to(".hero-status-uptodate", { opacity: 0, duration: 0.4 })
        .to(".hero-status-outofdate", { opacity: 1, duration: 0.4 }, "<")

        // 50% -> 70%: Intervention (Merge Button Intercepted)
        .to(".hero-merge-btn-normal", { opacity: 0, duration: 0.4 })
        .to(".hero-merge-btn-blocked", { opacity: 1, pointerEvents: "auto", duration: 0.4 }, "<")
        .to(".hero-intercept-label", { opacity: 1, duration: 0.6 }, "<")

        // 70% -> 90%: Context Reveal & Warning Panel
        .to(".hero-warning-panel", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(".hero-context-grid", { opacity: 1, duration: 0.6 }, "-=0.3")

        // 90% -> 100%: Hold Final Complete State
        .to({}, { duration: 0.8 });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-obsidian-900">
      {/* 1. HERO INTRO PORTION (Header, Title, Subtitle, CTAs) */}
      <section 
        ref={introSectionRef}
        className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-16 px-4 md:px-6 overflow-hidden"
      >
        {/* Kinetic Grid Background (confine to Hero section, behind everything) */}
        <KineticGrid className="absolute inset-0 z-0 pointer-events-none" />

        {/* Atmosphere Background Elements */}
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-30 mix-blend-overlay z-[1]" />
        <div className="absolute inset-0 bg-grid-tech z-[1] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[45vh] bg-cyan-accent/5 blur-[140px] rounded-full z-[1] pointer-events-none" />

        <div className="container relative z-10 mx-auto flex flex-col items-center text-center max-w-4xl">
          {/* Status indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-cyan-accent/20 bg-cyan-accent/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-cyan-accent shadow-[0_0_8px_var(--color-cyan-accent)] animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-widest">
              Athena // GitHub Protection System
            </span>
          </div>

          {/* Headline with independent 3-line TextGlitch Reveal */}
          <h1 
            ref={headlineRef}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.08] flex flex-col items-center"
          >
            <HeroGlitchText
              text="Your GitHub."
              variant="white"
              delay={0.1}
            />
            <HeroGlitchText
              text="Protected before"
              variant="cyan"
              delay={0.35}
            />
            <HeroGlitchText
              text="you click."
              variant="white"
              delay={0.6}
            />
          </h1>

          {/* Subtext */}
          <p 
            ref={subtextRef}
            className="max-w-2xl text-base sm:text-xl text-text-secondary font-medium leading-relaxed mb-10"
          >
            An open-source, proactive safety layer that understands what you&apos;re doing on GitHub — and warns you before a mistake becomes a problem.
          </p>

          {/* Actions */}
          <div ref={actionsRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a 
              href="#installation-card" 
              className="px-8 py-4 bg-white text-black font-semibold text-sm rounded hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Install Athena
            </a>
            <a href="#pr-demo" className="px-7 py-4 text-white text-sm font-medium flex items-center gap-2 hover:text-cyan-accent transition-colors group">
              <span>See How It Works</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Scroll Cue */}
          <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
            <Terminal className="w-3.5 h-3.5 text-cyan-accent" />
            <span>SCROLL TO INITIALIZE LIVE INTERCEPTION DEMO</span>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED PINNED PR SHOWCASE SECTION */}
      {/* Box is 100% visible & centered before it pins and plays the animation */}
      <section 
        id="pr-demo"
        ref={prSectionRef} 
        className="relative w-full bg-obsidian-900 border-t border-border-tech/30"
      >
        <div 
          ref={prPinWrapperRef}
          className="min-h-screen w-full flex flex-col items-center justify-center relative py-12 px-4 md:px-6 overflow-hidden"
        >
          {/* Atmosphere Background */}
          <div className="absolute inset-0 bg-noise pointer-events-none opacity-25 mix-blend-overlay z-[1]" />
          <div className="absolute inset-0 bg-grid-tech z-[1] opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-accent/5 blur-[150px] rounded-full z-[1] pointer-events-none" />

          <div className="container relative z-10 mx-auto flex flex-col items-center max-w-4xl">
            {/* Context Label above box */}
            <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary mb-6 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-accent" />
              <span>Interactive GitHub Simulation // Live Intercept</span>
            </div>

            {/* The PR Interface Box: Fully Centered & 100% Visible */}
            <div className="w-full">
              <HeroInterface />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
