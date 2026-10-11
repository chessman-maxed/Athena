"use client";

import { ArrowRight, Terminal, Binary, Search, AlertTriangle, ShieldCheck, Check, Clock } from "lucide-react";

export type DemoState = "idle" | "scanning" | "detected" | "recovered";

interface Props {
  demoState: DemoState;
}

export function DetectionTrace({ demoState }: Props) {
  const getStepStatus = (index: number) => {
    switch (index) {
      case 0: // INPUT
        return { label: "INPUT", icon: Terminal, state: "checked", tag: "✓" };
      
      case 1: // LOCAL RULE MATCH
        if (demoState === "scanning") return { label: "LOCAL RULE MATCH", icon: Binary, state: "active", tag: "..." };
        if (demoState === "detected" || demoState === "recovered") return { label: "LOCAL RULE MATCH", icon: Binary, state: "checked", tag: "✓" };
        return { label: "LOCAL RULE MATCH", icon: Binary, state: "idle", tag: "—" };

      case 2: // PATTERN CLASSIFIED
        if (demoState === "scanning") return { label: "PATTERN CLASSIFIED", icon: Search, state: "active", tag: "..." };
        if (demoState === "detected" || demoState === "recovered") return { label: "PATTERN CLASSIFIED", icon: Search, state: "checked", tag: "✓" };
        return { label: "PATTERN CLASSIFIED", icon: Search, state: "idle", tag: "—" };

      case 3: // RISK FLAGGED / CLEARED
        if (demoState === "detected") return { label: "RISK FLAGGED", icon: AlertTriangle, state: "threat", tag: "ACTIVE" };
        if (demoState === "recovered") return { label: "RISK CLEARED", icon: ShieldCheck, state: "cleared", tag: "✓" };
        return { label: "RISK FLAGGED", icon: AlertTriangle, state: "idle", tag: "—" };

      case 4: // USER ACTION
        if (demoState === "detected") return { label: "USER ACTION", icon: Clock, state: "waiting", tag: "WAITING" };
        if (demoState === "recovered") return { label: "USER ACTION", icon: Check, state: "cleared", tag: "COMPLETE" };
        return { label: "USER ACTION", icon: ShieldCheck, state: "idle", tag: "—" };

      default:
        return { label: "", icon: Terminal, state: "idle", tag: "—" };
    }
  };

  const steps = [0, 1, 2, 3, 4].map(getStepStatus);

  return (
    <div className="p-5 glass-panel rounded-xl border border-border-tech space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-text-tertiary">
          Decision Trace Pipeline
        </span>
        <span className="text-[10px] font-mono text-cyan-accent">REAL-TIME PROPAGATION</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] pt-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          let styling = "bg-black/30 border-white/5 text-text-tertiary opacity-40";
          if (step.state === "checked") {
            styling = "bg-white/5 border-white/10 text-white font-medium";
          } else if (step.state === "active") {
            styling = "bg-cyan-accent/15 border-cyan-accent/40 text-cyan-accent animate-pulse font-medium";
          } else if (step.state === "threat") {
            styling = "bg-red-500/20 border-red-500/40 text-red-300 font-bold shadow-[0_0_12px_rgba(239,68,68,0.25)]";
          } else if (step.state === "waiting") {
            styling = "bg-amber-400/20 border-amber-400/40 text-amber-300 font-bold";
          } else if (step.state === "cleared") {
            styling = "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]";
          }

          return (
            <div key={idx} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all duration-300 ${styling}`}>
                <Icon className="w-3 h-3 shrink-0" />
                <span>{step.label}</span>
                <span className="text-[9px] opacity-70 ml-0.5">{step.tag}</span>
              </div>

              {!isLast && (
                <ArrowRight className="w-3 h-3 text-text-tertiary shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
