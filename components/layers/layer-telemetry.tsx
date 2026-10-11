"use client";

import { Shield, Sparkles, Radar, Lock } from "lucide-react";

export function LayerTelemetry() {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 p-4 md:p-5 bg-black/60 border-b border-border-tech backdrop-blur-md">
      {/* Brand Label */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
          <Shield className="w-4 h-4 text-cyan-accent" />
        </div>
        <div>
          <div className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-2">
            <span>ATHENA ADAPTIVE ENGINE</span>
          </div>
          <div className="text-[10px] font-mono text-text-tertiary">
            CONTINUOUS CAPABILITY ESCALATION
          </div>
        </div>
      </div>

      {/* 3 Interactive Tier Indicators */}
      <div className="flex items-center gap-2 font-mono text-xs">
        {/* Tier 1 */}
        <div className="tier-indicator-1 flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-accent/15 border border-cyan-accent/40 text-cyan-accent font-semibold transition-all">
          <Sparkles className="w-3.5 h-3.5" />
          <span>01 TEACH</span>
        </div>

        {/* Tier 2 */}
        <div className="tier-indicator-2 flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-text-tertiary transition-all">
          <Radar className="w-3.5 h-3.5" />
          <span>02 DETECT</span>
        </div>

        {/* Tier 3 */}
        <div className="tier-indicator-3 flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-text-tertiary transition-all">
          <Lock className="w-3.5 h-3.5" />
          <span>03 PROTECT</span>
        </div>
      </div>
    </div>
  );
}
