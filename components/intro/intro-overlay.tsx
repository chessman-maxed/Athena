"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface IntroOverlayProps {
  onComplete?: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scanBeamRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      // Force GPU layer promotion
      gsap.set([containerRef.current, logoWrapperRef.current, ringRef.current, scanBeamRef.current, textRef.current, statusRef.current], {
        force3D: true,
      });

      // Initial states using pure transforms and opacity
      gsap.set(logoWrapperRef.current, { scale: 0.88, opacity: 0 });
      gsap.set(ringRef.current, { scale: 0.7, opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 8 });
      gsap.set(statusRef.current, { opacity: 0 });
      gsap.set(scanBeamRef.current, { yPercent: -120, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete?.();
        },
      });

      // Sequence:
      // 1. Logo materializes with smooth spring ease (fast and crisp)
      tl.to(logoWrapperRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      })
      // 2. Pulse ring expands outward smoothly
      .to(
        ringRef.current,
        {
          scale: 1.28,
          opacity: 0.6,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ringRef.current,
        {
          opacity: 0,
          scale: 1.45,
          duration: 0.3,
          ease: "power1.out",
        },
        "-=0.15"
      )
      // 3. Scan beam sweeps across vertically using yPercent (GPU accelerated)
      .fromTo(
        scanBeamRef.current,
        { yPercent: -120, opacity: 0 },
        { yPercent: 120, opacity: 0.9, duration: 0.45, ease: "power2.inOut" },
        "-=0.45"
      )
      // 4. Text fades into place
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.25"
      )
      .to(
        statusRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // 5. Crisp, cinematic curtain lift with zero lag
      .to(containerRef.current, {
        yPercent: -100,
        opacity: 0.95,
        duration: 0.55,
        ease: "power3.inOut",
        delay: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040404] will-change-transform select-none overflow-hidden"
    >
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Subtle background tech grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-15 pointer-events-none" />

      {/* Center Shield & Logo Assembly */}
      <div className="relative flex flex-col items-center">
        {/* Holographic Pulse Ring */}
        <div
          ref={ringRef}
          className="absolute -inset-6 rounded-3xl border border-cyan-accent/50 pointer-events-none shadow-[0_0_35px_rgba(0,240,255,0.25)]"
        />

        {/* Shield Container with Scan Beam */}
        <div
          ref={logoWrapperRef}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-900/90 border border-cyan-accent/40 p-3 shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden flex items-center justify-center will-change-transform"
        >
          {/* Laser Scan Beam */}
          <div
            ref={scanBeamRef}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-accent to-transparent shadow-[0_0_12px_#00f0ff] pointer-events-none z-10"
          />

          <Image
            src="/athena-logo.png"
            alt="Athena Security Engine"
            width={96}
            height={96}
            priority
            className="w-full h-full object-contain relative z-0 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          />
        </div>

        {/* Brand Text */}
        <div ref={textRef} className="mt-5 flex items-center gap-2">
          <span className="font-bold text-lg sm:text-xl text-white tracking-wider">
            ATHENA
          </span>
          <span className="text-xs font-mono text-cyan-accent px-1.5 py-0.5 rounded bg-cyan-accent/10 border border-cyan-accent/30">
            v1.0
          </span>
        </div>

        {/* Security Engine Subtitle */}
        <div
          ref={statusRef}
          className="mt-2 text-[10px] font-mono text-text-tertiary uppercase"
        >
          SECURITY ENGINE ACTIVE
        </div>
      </div>
    </div>
  );
}
