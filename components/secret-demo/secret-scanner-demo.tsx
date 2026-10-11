"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Lock } from "lucide-react";
import { CodeEditor } from "./code-editor";
import { DetectionStatus } from "./detection-status";
import { DetectionTrace, DemoState } from "./detection-trace";
import { analyzeCodeLocally, DetectionResult } from "./detection-engine";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_CODE = `// Update authentication configuration
const environment = "production";
const apiEndpoint = "https://api.athena-security.internal/v1";

export function getAuthConfig() {
  return {
    environment,
    apiEndpoint,
    authHeader: "Bearer authorized_user_session",
  };
}`;

export function SecretScannerDemo() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [detection, setDetection] = useState<DetectionResult>({ hasThreat: false });
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Entrance animation (Standard scroll entrance, ZERO scroll hijacking)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Real-time dynamic analysis upon typing or injection
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setHasInteracted(true);
    setDemoState("scanning");

    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);

    scanTimerRef.current = setTimeout(() => {
      const res = analyzeCodeLocally(newCode);
      setDetection(res);
      if (res.hasThreat) {
        setDemoState("detected");
      } else {
        setDemoState("idle");
      }
    }, 250);
  };

  // Demo injection helper
  const handleInjectSample = (sampleCode: string) => {
    setHasInteracted(true);
    setDemoState("scanning");
    setCode(sampleCode);

    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);

    scanTimerRef.current = setTimeout(() => {
      const res = analyzeCodeLocally(sampleCode);
      setDetection(res);
      setDemoState(res.hasThreat ? "detected" : "idle");
    }, 300);
  };

  // Interactive Action: Remove Secret (Recovery Sequence)
  const handleRemoveSecret = () => {
    if (detection.hasThreat && detection.match) {
      const cleanCode = code.replace(detection.match, `"[SECRET_REMOVED_BY_ATHENA]"`);
      setCode(cleanCode);
      setDetection({ hasThreat: false });
      setDemoState("recovered");
    }
  };

  // Interactive Action: Keep for Demo
  const handleKeepSecret = () => {
    setDemoState("detected");
  };

  // Interactive Action: Reset
  const handleReset = () => {
    setCode(INITIAL_CODE);
    setDetection({ hasThreat: false });
    setDemoState("idle");
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-obsidian-900 py-28 px-4 md:px-6 overflow-hidden border-t border-border-tech/40"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-cyan-accent/5 blur-[160px] rounded-full pointer-events-none" />

      <div ref={contentRef} className="container relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-accent/20 bg-cyan-accent/5">
            <Shield className="w-3.5 h-3.5 text-cyan-accent" />
            <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-widest">
              Athena // Live Secret Detection
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Secrets don&apos;t belong<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-white to-cyan-accent">
              in your repository.
            </span>
          </h2>

          <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Athena watches sensitive text fields and identifies credential-like patterns before they become a commit. Test the live interactive simulator below.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Editable Code/Comment Simulator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              detection={detection}
              demoState={demoState}
              onRemoveSecret={handleRemoveSecret}
              onKeepSecret={handleKeepSecret}
              onReset={handleReset}
              onInjectSample={handleInjectSample}
              hasInteracted={hasInteracted}
            />
          </div>

          {/* Right Column: Real-time Telemetry & Pipeline Decision Trace (5 cols) */}
          <div className="lg:col-span-5 space-y-5 flex flex-col">
            <DetectionStatus demoState={demoState} detection={detection} />
            <DetectionTrace demoState={demoState} />

            {/* Privacy Guarantee Message */}
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-start gap-3 text-xs font-mono text-text-tertiary">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block mb-0.5">
                  100% Client-Side Demonstration
                </span>
                <span>
                  Detection runs locally in your browser session. No credentials, tokens, or typed inputs are transmitted over the network or stored remotely.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
