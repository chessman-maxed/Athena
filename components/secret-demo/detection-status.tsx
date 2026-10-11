"use client";

import { ShieldAlert, Cpu, Activity, Lock, CheckCircle2, ShieldCheck } from "lucide-react";
import { DetectionResult } from "./detection-engine";
import { DemoState } from "./detection-trace";

interface Props {
  demoState: DemoState;
  detection: DetectionResult;
}

export function DetectionStatus({ demoState, detection }: Props) {
  const getRuleEngineText = () => {
    if (demoState === "scanning") return "SCANNING...";
    if (demoState === "detected") return "MATCH FOUND";
    return "LOCAL AST PARSER";
  };

  const getPatternClassifierText = () => {
    if (demoState === "scanning") return "ANALYZING";
    if (demoState === "detected") return "CREDENTIAL-LIKE";
    return "PASSING // CLEAN";
  };

  const getInterceptionText = () => {
    if (demoState === "scanning") return "EVALUATING";
    if (demoState === "detected") return "BLOCKED";
    return "SAFE TO COMMIT";
  };

  return (
    <div className="p-5 glass-panel rounded-xl border border-border-tech space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-accent" />
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            DETECTION ENGINE // AST
          </span>
        </div>

        {/* Live Status Badge */}
        {demoState === "detected" ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>THREAT DETECTED</span>
          </div>
        ) : demoState === "scanning" ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-accent/15 border border-cyan-accent/30 text-cyan-accent font-mono text-[10px] font-bold">
            <Activity className="w-3.5 h-3.5 animate-spin" />
            <span>ANALYZING INPUT...</span>
          </div>
        ) : demoState === "recovered" ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BUFFER CLEARED</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>MONITORING ACTIVE</span>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <div className="text-text-tertiary text-[10px]">RULE ENGINE</div>
          <div className={`font-medium transition-colors ${
            demoState === "detected" ? "text-red-400 font-bold" : demoState === "scanning" ? "text-cyan-accent" : "text-white"
          }`}>
            {getRuleEngineText()}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <div className="text-text-tertiary text-[10px]">PATTERN CLASSIFIER</div>
          <div className={`font-medium transition-colors ${
            demoState === "detected" ? "text-red-400 font-bold" : demoState === "scanning" ? "text-cyan-accent" : "text-emerald-400"
          }`}>
            {getPatternClassifierText()}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <div className="text-text-tertiary text-[10px]">INTERCEPTION STATUS</div>
          <div className={`font-medium transition-colors ${
            demoState === "detected" ? "text-amber-400 font-bold" : demoState === "scanning" ? "text-cyan-accent" : "text-emerald-400"
          }`}>
            {getInterceptionText()}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <div className="text-text-tertiary text-[10px]">EXECUTION LATENCY</div>
          <div className="text-cyan-accent">&lt; 1.4ms (ZERO NETWORK)</div>
        </div>
      </div>

      {/* Detected Rule Details if Active */}
      {demoState === "detected" && detection.hasThreat && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 space-y-1.5 text-xs font-mono animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-red-300">
            <span className="font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-red-400" />
              {detection.ruleName}
            </span>
            <span className="text-[10px] bg-red-500/20 px-1.5 py-0.5 rounded text-red-300">
              CONFIDENCE {detection.confidence}
            </span>
          </div>
          <div className="text-text-secondary text-[11px] truncate">
            Flagged Token: <code className="text-red-300 bg-black/50 px-1.5 py-0.5 rounded border border-red-500/20">{detection.match}</code>
          </div>
        </div>
      )}
    </div>
  );
}
