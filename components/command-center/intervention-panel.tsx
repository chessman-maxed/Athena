"use client";

import { ShieldAlert, AlertTriangle, ArrowRight, X } from "lucide-react";

export function InterventionPanel() {
  return (
    <div className="intervention-trigger-card p-5 md:p-6 rounded-xl glass-panel-cyan border-2 border-cyan-accent/50 shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between relative overflow-hidden transition-all duration-500">
      {/* Background Pulse Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between border-b border-cyan-accent/20 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-cyan-accent/20 border border-cyan-accent/40 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-cyan-accent" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-cyan-accent tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-accent animate-ping" />
                RISK DETECTED
              </div>
              <div className="text-[10px] font-mono text-cyan-accent/70">
                PROACTIVE INTERCEPTION GATING
              </div>
            </div>
          </div>

          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
            ACTION BLOCKED
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-black/60 border border-cyan-accent/20 space-y-1.5">
            <div className="text-white font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Branch divergence: 14 commits behind main</span>
            </div>
            <p className="text-text-secondary text-[11px] leading-relaxed">
              Target branch has moved ahead with structural changes in <code className="text-cyan-accent bg-black/50 px-1 py-0.5 rounded">lib/auth.ts</code>. Direct merge will result in severe conflicting state.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-cyan-accent/20 flex flex-wrap items-center gap-3">
        <button className="flex-1 min-w-[140px] px-4 py-2.5 bg-cyan-accent text-black font-mono font-bold text-xs rounded hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <span>Review Changes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button className="px-4 py-2.5 rounded bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white font-mono text-xs transition-colors border border-white/10 flex items-center gap-1.5">
          <X className="w-3.5 h-3.5" />
          <span>Dismiss</span>
        </button>
      </div>
    </div>
  );
}
