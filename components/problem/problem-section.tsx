"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StateSecret, StateMerge, StatePipeline } from "./workspace-states";

gsap.registerPlugin(ScrollTrigger);

export function ProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  
  // States refs
  const state1Ref = useRef<HTMLDivElement>(null);
  const state2Ref = useRef<HTMLDivElement>(null);
  const state3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: pinWrapperRef.current,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        }
      });

      // 1. SECRET EXPOSED
      tl.to(".secret-scan-line", { scaleX: 1, opacity: 1, duration: 0.8 })
        .to(".secret-scan-line", { opacity: 0, duration: 0.2 })
        .to(".secret-highlight", { opacity: 1, duration: 0.4 }, "-=0.2")
        .to(".secret-warning", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        
        // Pause briefly
        .to({}, { duration: 0.6 })

        // Transition 1 -> 2
        .to(state1Ref.current, { opacity: 0, scale: 0.96, duration: 0.8 })
        .fromTo(state2Ref.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.8 }, "<")
        
      // 2. MERGE CONFLICT
        .to(".merge-status", { backgroundColor: "rgba(239, 68, 68, 0.15)", borderColor: "rgba(239, 68, 68, 0.3)", duration: 0.8 })
        .to(".merge-warning", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        
        // Pause briefly
        .to({}, { duration: 0.6 })

        // Transition 2 -> 3
        .to(state2Ref.current, { opacity: 0, scale: 0.96, duration: 0.8 })
        .fromTo(state3Ref.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.8 }, "<")
        
      // 3. PIPELINE FAIL
        .to(".pipeline-success-icon", { opacity: 0, scale: 0, duration: 0.4 })
        .to(".pipeline-fail-icon", { opacity: 1, scale: 1, duration: 0.4 }, "<")
        .to(".pipeline-fail-bg", { opacity: 1, duration: 0.4 }, "<")
        .to(".pipeline-warning", { opacity: 1, y: 0, duration: 0.6 })
        
        // Pause briefly
        .to({}, { duration: 0.6 })
        
        // Final scene: workspace dims and conclusion steps forward cleanly
        .to(".problem-headline", { opacity: 0.2, duration: 0.6 })
        .to(".conclusion-box", { opacity: 1, y: 0, duration: 0.8 }, "<")
        .to(".workspace-container", { scale: 0.95, opacity: 0.4, duration: 0.8 }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" ref={containerRef} className="relative w-full bg-obsidian-900">
      {/* Pinned Viewport Container */}
      <div 
        ref={pinWrapperRef} 
        className="min-h-screen w-full flex items-center justify-center relative py-20 overflow-hidden"
      >
        {/* Subtle Background Textures */}
        <div className="absolute inset-0 bg-noise opacity-25 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-grid-tech opacity-40 pointer-events-none" />
        
        <div className="container relative z-10 px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Copy */}
          <div className="flex flex-col max-w-lg">
            <span className="text-cyan-accent text-xs font-mono tracking-widest uppercase mb-4">
              The Problem // Invisible Risk
            </span>
            
            <h2 className="problem-headline text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-6 transition-opacity duration-300">
              Most Git mistakes don&apos;t look dangerous until it&apos;s already too late.
            </h2>
            
            <div className="conclusion-box opacity-0 transform translate-y-3 transition-all duration-300">
              <span className="block text-xl md:text-2xl text-cyan-accent font-semibold mb-2">
                That&apos;s where Athena steps in.
              </span>
              <p className="text-text-secondary text-base leading-relaxed">
                It understands intent, validates live context across your workflow, and intercepts before a mistake reaches production.
              </p>
            </div>
          </div>

          {/* Right Column: Simulated Workspace */}
          <div className="workspace-container relative w-full h-[440px] max-w-lg mx-auto lg:ml-auto transition-all duration-500">
            <div className="relative w-full h-full glass-panel rounded-xl border border-border-tech shadow-2xl overflow-hidden">
              <StateSecret ref={state1Ref} />
              <StateMerge ref={state2Ref} className="opacity-0 pointer-events-none" />
              <StatePipeline ref={state3Ref} className="opacity-0 pointer-events-none" />
            </div>
            
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-cyan-accent/5 blur-[50px] -z-10 rounded-full pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
