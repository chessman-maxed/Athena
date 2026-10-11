"use client";

import { Activity, Shield, GitPullRequest, GitMerge, MessageSquare, AlertTriangle, Terminal, ChevronRight } from "lucide-react";

export function AthenaCore() {
  return (
    <div className="athena-core-container relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
      
      {/* Left: Activity Stream */}
      <div className="flex flex-col gap-3 w-full md:w-1/3">
        <div className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
          <Activity className="w-3 h-3 text-cyan-accent" /> Event Stream
        </div>
        
        <div className="core-event-item-1 opacity-0 -translate-x-4 flex items-center gap-3 p-3 rounded glass-panel text-sm">
          <GitPullRequest className="w-4 h-4 text-emerald-400" />
          <span className="text-text-secondary">PR #142 Opened</span>
        </div>
        <div className="core-event-item-2 opacity-0 -translate-x-4 flex items-center gap-3 p-3 rounded glass-panel text-sm">
          <Terminal className="w-4 h-4 text-cyan-accent" />
          <span className="text-text-secondary">Branch updated</span>
        </div>
        <div className="core-event-item-3 opacity-0 -translate-x-4 flex items-center gap-3 p-3 rounded glass-panel text-sm">
          <MessageSquare className="w-4 h-4 text-text-tertiary" />
          <span className="text-text-secondary">Comment detected</span>
        </div>
        <div className="core-event-item-4 opacity-0 -translate-x-4 flex items-center gap-3 p-3 rounded glass-panel border border-amber-500/30 bg-amber-500/5 text-sm">
          <GitMerge className="w-4 h-4 text-amber-500" />
          <span className="text-amber-500">Merge action detected</span>
        </div>
      </div>

      {/* Center & Right: Athena Core */}
      <div className="flex-1 w-full relative">
        <div className="core-hud-border border border-border-tech-cyan glass-panel-cyan rounded-xl p-6 relative overflow-hidden transition-colors duration-300">
          
          <div className="core-hud-pulse absolute inset-0 bg-cyan-accent/5 pointer-events-none opacity-0" />
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-white" />
                <h3 className="text-white font-bold tracking-wide">ATHENA CORE</h3>
              </div>
              <div className="flex items-center gap-2 relative h-4">
                <div className="core-status-dot w-2 h-2 rounded-full bg-cyan-accent shadow-[0_0_8px_var(--color-cyan-accent)]" />
                <span className="core-status-monitoring text-cyan-accent text-xs font-mono tracking-widest uppercase">
                  Monitoring
                </span>
                <span className="core-status-intervention text-red-500 text-xs font-mono tracking-widest uppercase opacity-0 absolute left-4 font-bold">
                  Intervention
                </span>
              </div>
            </div>
            
            <div className="text-right text-xs font-mono text-text-tertiary space-y-1">
              <div>PROJECT-ATHENA</div>
              <div>FEATURE/SECURITY</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 relative z-10 mb-6">
            <div className="bg-black/40 p-3 rounded border border-white/5">
              <div className="text-text-tertiary text-xs mb-1">CI STATUS</div>
              <div className="text-emerald-400 text-sm font-mono">PASSING</div>
            </div>
            <div className="bg-black/40 p-3 rounded border border-white/5">
              <div className="text-text-tertiary text-xs mb-1">SECURITY</div>
              <div className="text-cyan-accent text-sm font-mono">ACTIVE</div>
            </div>
          </div>

          <div className="core-risk-warning opacity-0 scale-95 translate-y-3 bg-red-500/10 border border-red-500/30 p-4 rounded relative z-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-red-500 font-medium text-sm mb-1">RISK INTERVENTION</div>
                <div className="text-white/80 text-xs leading-relaxed">
                  The incoming merge action conflicts with protected branches. Athena has temporarily suspended the operation pending review.
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Connection line between stream and core on desktop */}
        <div className="hidden md:block absolute top-1/2 -left-16 w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-accent/50 -translate-y-1/2">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <ChevronRight className="w-4 h-4 text-cyan-accent" />
          </div>
        </div>
      </div>

    </div>
  );
}
