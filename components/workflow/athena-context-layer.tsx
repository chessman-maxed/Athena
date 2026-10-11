"use client";

import { Shield, GitBranch, GitCommit, GitPullRequest, Layers, GitMerge } from "lucide-react";

export function AthenaContextLayer() {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 p-4 bg-black/60 border-b border-border-tech backdrop-blur-md">
      {/* Brand & Sentinel State */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
          <Shield className="w-4 h-4 text-cyan-accent" />
        </div>
        <div>
          <div className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-2">
            <span>ATHENA WORKFLOW TELEMETRY</span>
          </div>
          <div className="text-[10px] font-mono text-text-tertiary">
            CROSS-STAGE CONTEXT ENGINE
          </div>
        </div>
      </div>

      {/* Stage Status Telemetry Badges */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
        {/* Branch */}
        <div className="wf-badge-branch flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-text-tertiary transition-all duration-300">
          <GitBranch className="w-3 h-3" />
          <span>BRANCH</span>
        </div>

        {/* Commit */}
        <div className="wf-badge-commit flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-text-tertiary transition-all duration-300">
          <GitCommit className="w-3 h-3" />
          <span>COMMIT</span>
        </div>

        {/* PR */}
        <div className="wf-badge-pr flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-text-tertiary transition-all duration-300">
          <GitPullRequest className="w-3 h-3" />
          <span>PULL REQUEST</span>
        </div>

        {/* CI */}
        <div className="wf-badge-ci flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-text-tertiary transition-all duration-300">
          <Layers className="w-3 h-3" />
          <span>CI PIPELINE</span>
        </div>

        {/* Merge */}
        <div className="wf-badge-merge flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-text-tertiary transition-all duration-300">
          <GitMerge className="w-3 h-3" />
          <span>MERGE</span>
        </div>
      </div>
    </div>
  );
}
