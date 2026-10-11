"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayerTelemetry } from "./layer-telemetry";
import { TeachLayer } from "./teach-layer";
import { DetectLayer } from "./detect-layer";
import { ProtectLayer } from "./protect-layer";

gsap.registerPlugin(ScrollTrigger);

export function LayersSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const cinematicSectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const systemBoxRef = useRef<HTMLDivElement>(null);
  const teachRef = useRef<HTMLDivElement>(null);
  const detectRef = useRef<HTMLDivElement>(null);
  const protectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Normal entrance reveal for the Section Header
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Master Pinned Scrub Timeline on the Cinematic Stage
      // Pin activates ONLY when the cinematic stage aligns with the viewport
      // The pt-20 padding guarantees the panel is fully visible and vertically centered BELOW the fixed navbar
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cinematicSectionRef.current,
          start: "top top",
          end: "+=320%",
          pin: pinWrapperRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 0% -> 33%: TEACH layer active interaction
      tl.to(".teach-annotation-box", { borderColor: "rgba(0,240,255,0.8)", duration: 0.6 })
        .to({}, { duration: 0.5 }) // Hold TEACH

        // 33% -> 40%: Transition from TEACH to DETECT
        .to(teachRef.current, { opacity: 0, scale: 0.97, duration: 0.8 })
        .fromTo(detectRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.8 }, "<")
        // Update telemetry indicators
        .to(".tier-indicator-1", { backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "#737373", duration: 0.4 }, "<")
        .to(".tier-indicator-2", { backgroundColor: "rgba(245,158,11,0.15)", borderColor: "rgba(245,158,11,0.4)", color: "#f59e0b", fontWeight: "bold", duration: 0.4 }, "<")

        // 40% -> 66%: DETECT layer analysis
        .to(".detect-radar-card", { borderColor: "rgba(245,158,11,0.8)", boxShadow: "0 0 20px rgba(245,158,11,0.2)", duration: 0.8 })
        .to({}, { duration: 0.5 }) // Hold DETECT

        // 66% -> 73%: Transition from DETECT to PROTECT
        .to(detectRef.current, { opacity: 0, scale: 0.97, duration: 0.8 })
        .fromTo(protectRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.8 }, "<")
        // Update telemetry indicators
        .to(".tier-indicator-2", { backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "#737373", duration: 0.4 }, "<")
        .to(".tier-indicator-3", { backgroundColor: "rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.4)", color: "#ef4444", fontWeight: "bold", duration: 0.4 }, "<")

        // 73% -> 90%: PROTECT scan line passes across secret
        .fromTo(
          ".protect-scan-line",
          { left: "0%", opacity: 1 },
          { left: "100%", opacity: 1, duration: 1.2, ease: "none" }
        )
        .to({}, { duration: 0.5 }) // Hold PROTECT

        // 90% -> 100%: Cockpit dims and Final Transition Statement reveals
        .to(systemBoxRef.current, { opacity: 0.2, scale: 0.96, duration: 0.8 })
        .fromTo(
          ".layers-final-statement",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "<"
        );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-obsidian-900 border-t border-border-tech/40">
      {/* 1. NORMAL SCROLL ENTRY FOR SECTION HEADER */}
      <div 
        ref={introRef}
        className="w-full pt-28 pb-10 px-4 md:px-6 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyan-accent/20 bg-cyan-accent/5">
          <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-widest">
            Three Layers of Intelligence
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
          From learning GitHub<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-white to-cyan-accent">
            to protecting it.
          </span>
        </h2>

        <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Athena grows from a contextual guide into a proactive safety layer that intercepts irreversible damage.
        </p>
      </div>

      {/* 2. DEDICATED CINEMATIC STAGE */}
      {/* Pinned Viewport Container with built-in Navbar top clearance (pt-20) and bottom breathing room */}
      <section 
        ref={cinematicSectionRef}
        className="relative w-full bg-obsidian-900"
      >
        <div
          ref={pinWrapperRef}
          className="h-screen max-h-screen w-full flex flex-col items-center justify-center relative pt-20 pb-6 px-4 md:px-6 overflow-hidden"
        >
          {/* Atmosphere Textures */}
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-accent/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="container relative z-10 max-w-4xl mx-auto flex flex-col items-center my-auto">
            
            {/* Central Layer System Cockpit Container */}
            <div
              ref={systemBoxRef}
              className="w-full glass-panel rounded-2xl border border-border-tech overflow-hidden shadow-2xl relative transition-all duration-500"
            >
              {/* Top Telemetry Bar */}
              <LayerTelemetry />

              {/* Viewport for the 3 Layers */}
              <div className="relative w-full h-[360px] md:h-[340px] bg-black/40 overflow-hidden">
                {/* Layer 01: TEACH */}
                <div ref={teachRef} className="absolute inset-0 transition-all duration-300">
                  <TeachLayer />
                </div>

                {/* Layer 02: DETECT */}
                <div ref={detectRef} className="absolute inset-0 opacity-0 pointer-events-none transition-all duration-300">
                  <DetectLayer />
                </div>

                {/* Layer 03: PROTECT */}
                <div ref={protectRef} className="absolute inset-0 opacity-0 pointer-events-none transition-all duration-300">
                  <ProtectLayer />
                </div>
              </div>
            </div>

            {/* Final Transition Statement (Reveals at 90-100% completion) */}
            <div className="layers-final-statement text-center max-w-2xl mx-auto mt-4 space-y-1 opacity-0 pointer-events-none">
              <div className="text-[11px] font-mono text-cyan-accent uppercase tracking-widest">
                Core Philosophy
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Athena doesn&apos;t just answer. <span className="text-cyan-accent">It intervenes.</span>
              </h3>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
