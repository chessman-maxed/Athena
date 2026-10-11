"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface HeroGlitchLineProps {
  text: string;
  variant?: "white" | "cyan";
  delay?: number;
  className?: string;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function isPunctuationOrSpace(char: string) {
  return (
    char === " " ||
    char === "." ||
    char === "," ||
    char === "/" ||
    char === "-" ||
    char === "!"
  );
}

function generateScrambledString(fullText: string, resolvedCount: number = 0) {
  return fullText
    .split("")
    .map((char, index) => {
      if (isPunctuationOrSpace(char)) {
        return char;
      }
      if (index < resolvedCount) {
        return char;
      }
      return LETTERS[Math.floor(Math.random() * LETTERS.length)];
    })
    .join("");
}

export function HeroGlitchLine({
  text,
  variant = "white",
  delay = 0,
  className = "",
}: HeroGlitchLineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(text);

  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const jitterIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resolveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Entrance animation on mount (applied to the stable wrapper)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power3.out",
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [delay]);

  const clearAllTimers = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (jitterIntervalRef.current) {
      clearInterval(jitterIntervalRef.current);
      jitterIntervalRef.current = null;
    }
    if (resolveIntervalRef.current) {
      clearInterval(resolveIntervalRef.current);
      resolveIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const handleMouseEnter = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    clearAllTimers();

    // 1. Immediate Full Glitch
    setDisplayText(generateScrambledString(text, 0));

    // Jitter characters during the ~400ms hold
    jitterIntervalRef.current = setInterval(() => {
      setDisplayText(generateScrambledString(text, 0));
    }, 45);

    // 2. Hold ~400ms, then start slow left-to-right resolution (~95ms per character)
    holdTimeoutRef.current = setTimeout(() => {
      if (jitterIntervalRef.current) {
        clearInterval(jitterIntervalRef.current);
        jitterIntervalRef.current = null;
      }

      let resolvedIndex = 0;
      const totalLength = text.length;

      resolveIntervalRef.current = setInterval(() => {
        while (
          resolvedIndex < totalLength &&
          isPunctuationOrSpace(text[resolvedIndex])
        ) {
          resolvedIndex++;
        }

        if (resolvedIndex >= totalLength) {
          clearAllTimers();
          setDisplayText(text);
          return;
        }

        setDisplayText(generateScrambledString(text, resolvedIndex));
        resolvedIndex++;
      }, 95);
    }, 400);
  }, [text, clearAllTimers]);

  const handleMouseLeave = useCallback(() => {
    clearAllTimers();
    setDisplayText(text);
  }, [text, clearAllTimers]);

  const colorClasses =
    variant === "cyan"
      ? "text-cyan-accent"
      : "text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/80";

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-flex items-center justify-center will-change-transform ${className}`}
      style={{
        lineHeight: "1.08",
      }}
    >
      {/* 
        PERMANENT IN-FLOW GHOST TEXT:
        Permanently reserves the exact natural width, height, and typography
        of the original text. It never changes, guaranteeing 0px layout shift.
      */}
      <span
        aria-hidden="true"
        className="invisible select-none pointer-events-none whitespace-nowrap"
      >
        {text}
      </span>

      {/* Accessible screen-reader text */}
      <span className="sr-only">{text}</span>

      {/* 
        ACTIVE VISIBLE TEXT LAYER:
        Fills the dimensionally locked wrapper. Hovering and scrambling
        this text cannot affect the wrapper's layout bounds.
      */}
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute inset-0 flex items-center justify-center cursor-pointer select-none whitespace-nowrap ${colorClasses}`}
      >
        {displayText}
      </span>
    </div>
  );
}

// Backwards compatibility export
export const HeroGlitchText = HeroGlitchLine;
