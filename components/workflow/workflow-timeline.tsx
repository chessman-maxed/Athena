"use client";

import { GitBranch, GitCommit, GitPullRequest, Layers, GitMerge, CheckCircle2, AlertTriangle, Shield, ShieldAlert, Check, ArrowRight } from "lucide-react";

export function WorkflowTimeline() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 space-y-6">
      {/* Horizontal Workflow Stage Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
        
        {/* STAGE 1: BRANCH (Cyan) */}
        <div className="wf-node-1 p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between space-y-3 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-white font-semibold">
              <GitBranch className="w-3.5 h-3.5 text-cyan-accent" />
              <span>01 / BRANCH</span>
            </div>
            <span className="text-[9px] font-mono text-cyan-accent bg-cyan-accent/10 px-1.5 py-0.5 rounded">
              OBSERVING
            </span>
          </div>

          <div className="font-mono text-xs space-y-1">
            <div className="text-white font-medium">feature/payment</div>
            <div className="text-text-tertiary text-[10px]">Forked from main</div>
          </div>

          <div className="wf-note-1 opacity-0 p-2 rounded bg-cyan-accent/10 border border-cyan-accent/20 text-[10px] font-mono text-cyan-accent flex items-center gap-1.5">
            <Shield className="w-3 h-3 shrink-0" />
            <span>Athena: Context Aware</span>
          </div>
        </div>

        {/* STAGE 2: COMMIT (Green / Success Styling) */}
        <div className="wf-node-2 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col justify-between space-y-3 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-300 font-semibold">
              <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
              <span>02 / COMMIT</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded font-bold">
              CLEAN
            </span>
          </div>

          <div className="font-mono text-xs space-y-1">
            <div className="text-white font-medium truncate">&quot;Update payment&quot;</div>
            <div className="text-emerald-400/70 text-[10px]">2 files modified • verified</div>
          </div>

          <div className="wf-note-2 opacity-0 p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>AST clean: No secrets found</span>
          </div>
        </div>

        {/* STAGE 3: PULL REQUEST (Amber / Drift Warning) */}
        <div className="wf-node-3 p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between space-y-3 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-white font-semibold">
              <GitPullRequest className="w-3.5 h-3.5 text-amber-400" />
              <span>03 / PR OPENED</span>
            </div>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded font-bold">
              ANALYZING
            </span>
          </div>

          <div className="font-mono text-xs space-y-1">
            <div className="text-white font-medium">PR #108</div>
            <div className="text-amber-300 text-[10px]">8 commits behind main</div>
          </div>

          <div className="wf-note-3 opacity-0 p-2 rounded bg-amber-400/10 border border-amber-400/30 text-[10px] font-mono text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3 shrink-0 text-amber-400" />
            <span>Branch drift detected</span>
          </div>
        </div>

        {/* STAGE 4: CI PIPELINE (Green / Pass Correlated) */}
        <div className="wf-node-4 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col justify-between space-y-3 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-300 font-semibold">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>04 / CI SUITE</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded font-bold">
              PASS
            </span>
          </div>

          <div className="font-mono text-[10px] space-y-1 text-text-tertiary">
            <div className="flex items-center justify-between">
              <span className="text-emerald-300">BUILD / TEST</span>
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">PASS <CheckCircle2 className="w-2.5 h-2.5" /></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-tertiary">CORRELATION</span>
              <span className="text-emerald-400 font-mono">LINKED</span>
            </div>
          </div>

          <div className="wf-note-4 opacity-0 p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-400" />
            <span>Workflow verified: Clean build</span>
          </div>
        </div>

        {/* STAGE 5: MERGE INTERCEPT (Red) */}
        <div className="wf-node-5 p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between space-y-3 transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-white font-semibold">
              <GitMerge className="w-3.5 h-3.5 text-cyan-accent" />
              <span>05 / MERGE GATE</span>
            </div>
            <span className="wf-merge-tag text-[9px] font-mono text-cyan-accent bg-cyan-accent/10 px-1.5 py-0.5 rounded">
              GUARDED
            </span>
          </div>

          <div className="font-mono text-xs space-y-1">
            <div className="text-white font-medium">Merge pull request</div>
            <div className="text-text-tertiary text-[10px]">Pre-merge verification</div>
          </div>

          <div className="wf-note-5 opacity-0 p-2 rounded bg-red-500/15 border border-red-500/30 text-[10px] font-mono text-red-300 flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-3 h-3 shrink-0 text-red-400" />
            <span>ACTION INTERCEPTED</span>
          </div>
        </div>

      </div>

      {/* Cross-Stage Interception Callout Banner */}
      <div className="wf-context-banner opacity-0 p-4 rounded-xl glass-panel-cyan border border-cyan-accent/40 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-cyan-accent/20 border border-cyan-accent/40 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-cyan-accent" />
          </div>
          <div>
            <span className="text-cyan-accent font-bold block">
              ONE MORE THING // CONTEXT CHANGED WHILE PR WAS OPEN
            </span>
            <span className="text-white/80 text-[11px]">
              Upstream main merged 8 new commits modifying <code className="text-cyan-accent">/auth/validation.ts</code>. Review diff before proceeding.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-text-tertiary text-[11px]">
          <span className="text-white">Context Collected</span>
          <ArrowRight className="w-3 h-3 text-cyan-accent" />
          <span className="text-amber-400">Risk Identified</span>
          <ArrowRight className="w-3 h-3 text-cyan-accent" />
          <span className="text-cyan-accent font-bold">User Informed</span>
        </div>
      </div>
    </div>
  );
}
