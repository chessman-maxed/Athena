"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AthenaContextLayer } from "./athena-context-layer";
import { WorkflowTimeline } from "./workflow-timeline";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function WorkflowSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const cinematicSectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const cockpitRef = useRef<HTMLDivElement>(null);

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

      // 2. Master Pinned Scrub Timeline on the Workflow Cockpit
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

      // 0% -> 15%: Stage 1 (BRANCH) activates (Cyan)
      tl.to(".wf-badge-branch", { backgroundColor: "rgba(0, 240, 255, 0.15)", borderColor: "rgba(0, 240, 255, 0.4)", color: "#00f0ff", fontWeight: "bold", duration: 0.5 })
        .to(".wf-node-1", { borderColor: "rgba(0, 240, 255, 0.5)", backgroundColor: "rgba(0, 240, 255, 0.04)", duration: 0.5 }, "<")
        .to(".wf-note-1", { opacity: 1, duration: 0.4 }, "<")

        // 15% -> 30%: Stage 2 (COMMIT) evaluates (Emerald Green Success)
        .to(".wf-badge-commit", { backgroundColor: "rgba(16, 185, 129, 0.15)", borderColor: "rgba(16, 185, 129, 0.4)", color: "#10b981", fontWeight: "bold", duration: 0.5 })
        .to(".wf-node-2", { borderColor: "rgba(16, 185, 129, 0.5)", backgroundColor: "rgba(16, 185, 129, 0.05)", duration: 0.5 }, "<")
        .to(".wf-note-2", { opacity: 1, duration: 0.4 }, "<")

        // 30% -> 50%: Stage 3 (PR OPENED) discovers drift (Amber)
        .to(".wf-badge-pr", { backgroundColor: "rgba(245, 158, 11, 0.15)", borderColor: "rgba(245, 158, 11, 0.4)", color: "#f59e0b", fontWeight: "bold", duration: 0.5 })
        .to(".wf-node-3", { borderColor: "rgba(245, 158, 11, 0.5)", backgroundColor: "rgba(245, 158, 11, 0.04)", duration: 0.5 }, "<")
        .to(".wf-note-3", { opacity: 1, duration: 0.4 }, "<")

        // 50% -> 70%: Stage 4 (CI PIPELINE) correlates context (Emerald Green Success)
        .to(".wf-badge-ci", { backgroundColor: "rgba(16, 185, 129, 0.15)", borderColor: "rgba(16, 185, 129, 0.4)", color: "#10b981", fontWeight: "bold", duration: 0.5 })
        .to(".wf-node-4", { borderColor: "rgba(16, 185, 129, 0.5)", backgroundColor: "rgba(16, 185, 129, 0.05)", duration: 0.5 }, "<")
        .to(".wf-note-4", { opacity: 1, duration: 0.4 }, "<")

        // 70% -> 85%: Stage 5 (MERGE) intercepts action (Red)
        .to(".wf-badge-merge", { backgroundColor: "rgba(239, 68, 68, 0.15)", borderColor: "rgba(239, 68, 68, 0.4)", color: "#ef4444", fontWeight: "bold", duration: 0.5 })
        .to(".wf-node-5", { borderColor: "rgba(239, 68, 68, 0.6)", backgroundColor: "rgba(239, 68, 68, 0.06)", duration: 0.5 }, "<")
        .to(".wf-note-5", { opacity: 1, duration: 0.4 }, "<")
        .to(".wf-context-banner", { opacity: 1, duration: 0.6 }, "-=0.2")

        // 85% -> 100%: Cockpit dims into Final Statement
        .to(cockpitRef.current, { opacity: 0.2, scale: 0.96, duration: 0.8 })
        .fromTo(
          ".wf-final-statement",
          { opacity: 0, y: 25 },
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
            Athena // Workflow Intelligence
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
          From first branch<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-white to-cyan-accent">
            to final merge.
          </span>
        </h2>

        <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Athena stays in the background until context tells it that you need to know something.
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-cyan-accent/5 blur-[160px] rounded-full pointer-events-none" />

          <div className="container relative z-10 max-w-5xl mx-auto flex flex-col items-center my-auto">
            
            {/* Master Workflow Cockpit Container */}
            <div
              ref={cockpitRef}
              className="w-full glass-panel rounded-2xl border border-border-tech overflow-hidden shadow-2xl relative transition-all duration-500"
            >
              {/* Top Telemetry Layer */}
              <AthenaContextLayer />

              {/* Connected Timeline Stage */}
              <div className="w-full bg-black/40">
                <WorkflowTimeline />
              </div>
            </div>

            {/* Final Statement (Reveals at 85-100% completion) */}
            <div className="wf-final-statement text-center max-w-2xl mx-auto mt-6 space-y-4 opacity-0 pointer-events-none">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-cyan-accent uppercase tracking-widest">
                  Contextual Restraint
                </div>
                <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                  Good tools don&apos;t interrupt everything.<br />
                  <span className="text-cyan-accent">They interrupt the right thing.</span>
                </h3>
              </div>

              {/* Condensed Flow Sequence */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-black/60 border border-white/10 font-mono text-xs text-text-secondary">
                <span className="text-white font-medium">YOUR WORKFLOW</span>
                <ArrowDown className="w-3.5 h-3.5 text-cyan-accent -rotate-90" />
                <span className="text-cyan-accent font-semibold">ATHENA&apos;S CONTEXT</span>
                <ArrowDown className="w-3.5 h-3.5 text-cyan-accent -rotate-90" />
                <span className="text-emerald-400 font-medium">BETTER DECISIONS</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
