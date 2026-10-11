"use client";

import { GitFork, GitCommit, GitBranch } from "lucide-react";

export function BranchGraph() {
  return (
    <div className="p-5 glass-panel rounded-xl border border-border-tech flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary">
          <GitFork className="w-4 h-4 text-cyan-accent" />
          Branch Topology Graph
        </div>
        <span className="text-[10px] font-mono text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded">
          LIVE MAP
        </span>
      </div>

      {/* Visual Branch Tree */}
      <div className="relative py-3 px-2 font-mono text-xs">
        {/* SVG connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border-tech">
          {/* Main vertical trunk */}
          <line x1="28" y1="20" x2="28" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          
          {/* Fork to feature/security */}
          <path
            d="M 28 45 C 45 45, 55 70, 75 70"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          
          {/* Fork to feature/ui */}
          <path
            d="M 28 75 C 45 75, 55 105, 75 105"
            fill="none"
            stroke="rgba(0, 240, 255, 0.4)"
            strokeWidth="2"
          />
        </svg>

        {/* Tree Nodes */}
        <div className="space-y-6 relative z-10 pl-1">
          {/* Main Node */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded border border-white/10">
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white font-medium">main</span>
              <span className="text-[10px] text-text-tertiary">(HEAD // c82ef01)</span>
            </div>
          </div>

          {/* Branch: feature/security */}
          <div className="flex items-center gap-3 pl-12">
            <div className="w-5 h-5 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/30">
              <GitCommit className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 font-medium">feature/security</span>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-400/20 px-1.5 py-0.5 rounded">
                -14 COMMITS
              </span>
            </div>
          </div>

          {/* Branch: feature/ui */}
          <div className="flex items-center gap-3 pl-12">
            <div className="w-5 h-5 rounded-full bg-cyan-accent/20 border-2 border-cyan-accent flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
            </div>
            <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded border border-white/10">
              <GitCommit className="w-3.5 h-3.5 text-cyan-accent" />
              <span className="text-text-secondary">feature/ui</span>
              <span className="text-[10px] text-text-tertiary">(up to date)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-text-tertiary flex items-center justify-between">
        <span>AST Divergence Risk: High</span>
        <span className="text-amber-400 font-semibold">Conflict Probability 89%</span>
      </div>
    </div>
  );
}
