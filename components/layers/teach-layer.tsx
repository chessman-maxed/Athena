"use client";

import { GitFork, GitBranch, GitPullRequest, GitMerge, Compass, ArrowRight, Lightbulb } from "lucide-react";

export function TeachLayer() {
  return (
    <div className="teach-layer-container w-full h-full flex flex-col justify-between p-5 md:p-6">
      {/* Tier Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded border border-cyan-accent/20">
              01 // TEACH
            </span>
            <span className="text-white font-medium text-sm">Guided Learning Engine</span>
          </div>
          <span className="text-[10px] font-mono text-text-tertiary bg-white/5 px-2 py-0.5 rounded border border-white/5">
            MODALITY: INSTRUCTIONAL
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-1.5">
          Understand before you act.
        </h3>
        <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-4">
          Contextual guidance directly inside GitHub. Athena explains complex Git workflows before you commit mistakes.
        </p>

        {/* GitHub Actions Interactive Guide */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono text-xs">
          <div className="teach-action-fork p-2.5 rounded-lg bg-cyan-accent/15 border-2 border-cyan-accent text-white shadow-[0_0_15px_rgba(0,240,255,0.15)] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <GitFork className="w-3.5 h-3.5 text-cyan-accent" />
              <span className="text-[9px] bg-cyan-accent text-black font-bold px-1.5 py-0.2 rounded">FOCUSED</span>
            </div>
            <span className="font-bold text-xs">FORK</span>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-text-tertiary flex flex-col gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-text-tertiary" />
            <span className="text-xs">BRANCH</span>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-text-tertiary flex flex-col gap-1.5">
            <GitPullRequest className="w-3.5 h-3.5 text-text-tertiary" />
            <span className="text-xs">PULL REQ</span>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-text-tertiary flex flex-col gap-1.5">
            <GitMerge className="w-3.5 h-3.5 text-text-tertiary" />
            <span className="text-xs">MERGE</span>
          </div>
        </div>

        {/* Contextual Annotation Box */}
        <div className="teach-annotation-box p-3.5 rounded-lg glass-panel-cyan border border-cyan-accent/30 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-accent font-mono text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>ATHENA CONTEXTUAL EXPLANATION</span>
          </div>
          <p className="text-white text-xs md:text-sm leading-relaxed">
            <strong className="text-cyan-accent font-semibold">FORK:</strong> Creates your own copy of this repository in your GitHub account so you can experiment freely without modifying upstream.
          </p>
        </div>
      </div>

      {/* Workflow Diagram Footer */}
      <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-text-tertiary mt-2">
        <div className="flex items-center gap-2 text-text-secondary">
          <span className="text-white">User Action</span>
          <ArrowRight className="w-3 h-3 text-cyan-accent" />
          <span className="text-cyan-accent">Athena Explains</span>
          <ArrowRight className="w-3 h-3 text-cyan-accent" />
          <span className="text-emerald-400">User Understands</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-accent">
          <Compass className="w-3.5 h-3.5" />
          <span>Active Onboarding</span>
        </div>
      </div>
    </div>
  );
}
