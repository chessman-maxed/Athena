"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CommandCenterHeader } from "./command-center-header";
import { RepoContext } from "./repo-context";
import { ActivityStream } from "./activity-stream";
import { SecurityStatus } from "./security-status";
import { BranchGraph } from "./branch-graph";
import { CIPipeline } from "./ci-pipeline";
import { InterventionPanel } from "./intervention-panel";

gsap.registerPlugin(ScrollTrigger);

export function CommandCenterSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cockpitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
          },
        }
      );

      // Cockpit entrance animation with subtle 3D perspective
      gsap.fromTo(
        cockpitRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cockpitRef.current,
            start: "top 75%",
          },
        }
      );

      // Bottom zoom focus effect on deep scroll toward Intervention Card
      gsap.to(".intervention-trigger-card", {
        boxShadow: "0 0 50px 10px rgba(0, 240, 255, 0.3)",
        borderColor: "rgba(0, 240, 255, 0.9)",
        scrollTrigger: {
          trigger: cockpitRef.current,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-obsidian-900 py-32 overflow-hidden border-t border-border-tech/40"
    >
      {/* Background Visual Layers */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-accent/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
        {/* Section Header */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-accent/20 bg-cyan-accent/5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-widest">
              Athena // Live Context Engine
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            One workspace.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-white to-cyan-accent">
              Every signal.
            </span>
          </h2>

          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Athena continuously reads the context around your GitHub actions so the important warnings surface before the damage does.
          </p>
        </div>

        {/* Master Command Center Cockpit */}
        <div
          ref={cockpitRef}
          className="w-full rounded-2xl glass-panel border border-border-tech-cyan overflow-hidden shadow-2xl relative"
        >
          {/* Cockpit Status Header */}
          <CommandCenterHeader />

          {/* Connected Panels Grid */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-black/40">
            {/* Column 1: Repo Context & Branch Topology */}
            <div className="space-y-5 flex flex-col">
              <RepoContext />
              <BranchGraph />
            </div>

            {/* Column 2: Security Status & CI Pipeline */}
            <div className="space-y-5 flex flex-col">
              <SecurityStatus />
              <CIPipeline />
            </div>

            {/* Column 3: Live Activity Stream & Proactive Intervention Panel */}
            <div className="space-y-5 flex flex-col">
              <ActivityStream />
              <InterventionPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
