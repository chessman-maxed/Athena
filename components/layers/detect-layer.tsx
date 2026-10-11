"use client";

import { GitBranch, AlertTriangle, ArrowRight, Radar, ShieldAlert, GitCommit } from "lucide-react";

export function DetectLayer() {
  return (
    <div className="detect-layer-container w-full h-full flex flex-col justify-between p-5 md:p-6">
      {/* Tier Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              02 // DETECT
            </span>
            <span className="text-white font-medium text-sm">Conflict Radar & Drift Engine</span>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            SCANNING
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-1.5">
          See the problem before the merge.
        </h3>
        <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-4">
          Continuous repository AST telemetry monitors branch divergence and flags upstream collisions before you click merge.
        </p>

        {/* Visual Branch Flow Diagram */}
        <div className="p-3 rounded-lg bg-black/50 border border-white/5 space-y-2.5 font-mono text-xs mb-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300">
              <GitBranch className="w-3.5 h-3.5 text-amber-400" />
              <span>feature/payment</span>
            </div>
            <span className="text-text-tertiary text-[11px]">into</span>
            <div className="flex items-center gap-2 text-white">
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              <span>main</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded bg-amber-400/10 border border-amber-400/20 text-[11px]">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3" /> BRANCH OUT OF DATE
            </span>
            <span className="text-amber-300 flex items-center gap-1">
              <GitCommit className="w-3 h-3" /> 14 COMMITS BEHIND
            </span>
          </div>
        </div>

        {/* Athena Conflict Radar Intervention */}
        <div className="detect-radar-card p-3.5 rounded-lg glass-panel border border-amber-400/30 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <Radar className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>CONFLICT RADAR ACTIVE</span>
            </div>
            <span className="text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded font-bold">
              MERGE INTERCEPTED
            </span>
          </div>

          <p className="text-white text-xs md:text-sm leading-relaxed">
            Potential merge conflict detected with <code className="text-amber-300 font-mono">/services/stripe.ts</code>. Direct merge disabled.
          </p>
        </div>
      </div>

      {/* Workflow Diagram Footer */}
      <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-text-tertiary mt-2">
        <div className="flex items-center gap-2 text-text-secondary">
          <span className="text-white">GitHub State</span>
          <ArrowRight className="w-3 h-3 text-amber-400" />
          <span className="text-amber-400">Athena Analysis</span>
          <ArrowRight className="w-3 h-3 text-amber-400" />
          <span className="text-red-400 font-semibold">Risk Detected</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Automated Guard</span>
        </div>
      </div>
    </div>
  );
}
