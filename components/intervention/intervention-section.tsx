"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AthenaCore } from "./athena-core";
import { ModeSwitcher } from "./mode-switcher";

gsap.registerPlugin(ScrollTrigger);

export function InterventionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const coreWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single Master Scrub Timeline for Pinned Storytelling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: pinWrapperRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 0% -> 15%: Headline & Core HUD fade in
      tl.fromTo(
        ".intervention-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(
        coreWrapperRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "<"
      )

      // 15% -> 45%: Event stream items arrive one-by-one
      .to(".core-event-item-1", { opacity: 1, x: 0, duration: 0.8 })
      .to(".core-event-item-2", { opacity: 1, x: 0, duration: 0.8 }, "-=0.3")
      .to(".core-event-item-3", { opacity: 1, x: 0, duration: 0.8 }, "-=0.3")
      .to(".core-event-item-4", { opacity: 1, x: 0, duration: 0.8 }, "-=0.3")

      // 45% -> 60%: Athena Core analyzes & pulses
      .to(".core-hud-pulse", { opacity: 1, duration: 0.5 })
      .to(".core-hud-pulse", { opacity: 0.2, duration: 0.5 })

      // 60% -> 75%: Intercept state triggers (Status switches to INTERVENTION)
      .to(".core-status-dot", { backgroundColor: "#ef4444", boxShadow: "0 0 14px #ef4444", duration: 0.6 }, "+=0.2")
      .to(".core-status-monitoring", { opacity: 0, duration: 0.4 }, "<")
      .to(".core-status-intervention", { opacity: 1, duration: 0.4 }, "<")
      .to(".core-hud-border", { borderColor: "rgba(239, 68, 68, 0.6)", duration: 0.6 }, "<")

      // 75% -> 90%: Warning expands
      .to(".core-risk-warning", { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.4)" })

      // 90% -> 100%: Narrative statement & Interactive Mode Switcher enter
      .to(".intervention-story-step-1", { opacity: 0.15, duration: 0.8 })
      .fromTo(
        ".intervention-story-step-2",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "<"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-obsidian-900">
      {/* Pinned Viewport Story Sequence */}
      <div
        ref={pinWrapperRef}
        className="min-h-screen w-full flex flex-col items-center justify-center relative py-16 px-4 md:px-6 overflow-hidden"
      >
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-accent/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="container relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Section Step 1: Active Monitoring & Intervention */}
          <div className="intervention-story-step-1 w-full flex flex-col items-center transition-all duration-300">
            {/* Header */}
            <div className="intervention-header text-center max-w-3xl mb-12 space-y-3 opacity-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-accent/20 bg-cyan-accent/5">
                <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-widest">
                  Turning Point // Proactive Defense
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Don&apos;t wait for the mistake.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-white to-cyan-accent">
                  Let Athena see it coming.
                </span>
              </h2>
            </div>

            {/* Live Core HUD */}
            <div ref={coreWrapperRef} className="w-full opacity-0">
              <AthenaCore />
            </div>
          </div>

          {/* Section Step 2: Mode Modalities (Appears as user finishes scrubbing through intervention) */}
          <div className="intervention-story-step-2 w-full mt-12 opacity-0">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <div className="text-xs font-mono text-cyan-accent uppercase tracking-widest">
                Architecture Philosophy
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Passive until it matters.
              </h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                Athena runs quietly in the background, watching GitHub context and stepping in when an action becomes risky.
              </p>
            </div>

            <ModeSwitcher />
          </div>

        </div>
      </div>
    </section>
  );
}
