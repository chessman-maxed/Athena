"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSynchronizer() {
  const lenis = useLenis();

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh so user lands on top
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!lenis) return;

    // If there is no hash in the URL on refresh/load, always start at top of page
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        try {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: 0,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            window.history.pushState(null, "", href);
          }
        } catch {
          // Ignore invalid selector queries
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenis]);

  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const update = () => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Initial refresh to ensure pinned sections compute heights accurately
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      gsap.ticker.remove(update);
      clearTimeout(timer);
    };
  }, []);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const Lenis = ReactLenis as unknown as React.ComponentType<{
    root?: boolean;
    options?: { lerp?: number; duration?: number; smoothWheel?: boolean };
    children?: React.ReactNode;
  }>;

  return (
    <Lenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ScrollTriggerSynchronizer />
      {children}
    </Lenis>
  );
}
