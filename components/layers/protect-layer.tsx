"use client";

import { ShieldAlert, Lock, ArrowRight, CheckCircle2, AlertCircle, Terminal, Layers } from "lucide-react";

export function ProtectLayer() {
  return (
    <div className="protect-layer-container w-full h-full flex flex-col justify-between p-5 md:p-6">
      {/* Tier Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
              03 // PROTECT
            </span>
            <span className="text-white font-medium text-sm">Security & Pipeline Interceptor</span>
          </div>
          <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20 flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            HIGH INTERVENTION
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-1.5">
          Stop the dangerous action.
        </h3>
        <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-4">
          Live AST inspection scans comment fields, code reviews, and pipelines—quarantining leaked secrets and broken deploys instantly.
        </p>

        {/* Secret Input Area with Scan Simulation */}
        <div className="p-3 rounded-lg bg-black/60 border border-red-500/30 font-mono text-xs space-y-2 mb-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-text-tertiary">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-red-400" />
              <span>GITHUB ISSUE / PR COMMENT FIELD</span>
            </div>
            <span className="text-[10px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">
              LEAK BLOCKED
            </span>
          </div>

          <div className="p-2 rounded bg-black/80 border border-white/5 relative">
            <span className="text-text-tertiary text-[11px]"># Commit message or token paste</span>
            <div className="text-white mt-0.5">
              <span>API_KEY=</span>
              <span className="text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded border border-red-500/40 font-mono text-xs">
                sk_live_••••••••••••
              </span>
            </div>

            {/* Red Scan Line */}
            <div className="protect-scan-line absolute top-0 bottom-0 left-0 w-1 bg-cyan-accent shadow-[0_0_12px_#00f0ff]" />
          </div>

          {/* Pipeline Context Mini Row */}
          <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-text-tertiary flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-accent" /> Pipeline State:
            </span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 flex items-center gap-1">BUILD <CheckCircle2 className="w-3 h-3" /></span>
              <span className="text-emerald-400 flex items-center gap-1">TEST <CheckCircle2 className="w-3 h-3" /></span>
              <span className="text-amber-400 flex items-center gap-1">DEPLOY <AlertCircle className="w-3 h-3" /></span>
            </div>
          </div>
        </div>

        {/* Athena Security Intercept Alert */}
        <div className="p-3.5 rounded-lg glass-panel-cyan border border-cyan-accent/40 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-accent font-mono text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>SECRET DETECTED // LEAK PREVENTED</span>
            </div>
          </div>
          <p className="text-white text-xs md:text-sm leading-relaxed">
            Athena quarantined sensitive live credentials and halted post-commit deployment triggers automatically.
          </p>
        </div>
      </div>

      {/* Workflow Diagram Footer */}
      <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-text-tertiary mt-2">
        <div className="flex items-center gap-2 text-text-secondary">
          <span className="text-white">User Action</span>
          <ArrowRight className="w-3 h-3 text-red-400" />
          <span className="text-amber-400">Athena Detects</span>
          <ArrowRight className="w-3 h-3 text-cyan-accent" />
          <span className="text-cyan-accent font-bold">Athena Intervenes</span>
        </div>
        <div className="flex items-center gap-1.5 text-red-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Real-Time Defense</span>
        </div>
      </div>
    </div>
  );
}
