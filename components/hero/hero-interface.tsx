"use client";

import { GitBranch, GitCommit, GitMerge, GitPullRequest, CheckCircle2, Shield, AlertTriangle, Search } from "lucide-react";

export function HeroInterface() {
  return (
    <div className="hero-pr-container relative w-full max-w-3xl mx-auto rounded-xl glass-panel overflow-hidden border border-border-tech shadow-2xl">
      {/* Cyan Scanning Line */}
      <div 
        className="hero-scan-line absolute left-0 w-full h-[2px] bg-cyan-accent shadow-[0_0_15px_3px_var(--color-cyan-accent)] z-50 opacity-0 pointer-events-none -top-2"
      />

      {/* Interface Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3.5">
          <GitPullRequest className="text-emerald-400 w-5 h-5" />
          <div>
            <h3 className="text-white font-medium text-base md:text-lg leading-tight">
              Update core dependencies and fix routing
            </h3>
            <div className="text-text-tertiary text-xs md:text-sm flex items-center gap-2 mt-1 font-mono">
              <span className="text-emerald-400">#142</span>
              <span>opened 2 hours ago by <span className="text-text-secondary">dev-team</span></span>
            </div>
          </div>
        </div>

        {/* Live Analysis Badge */}
        <div className="hero-analyzing-badge opacity-0 flex items-center gap-1.5 text-[10px] font-mono text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/20 px-2.5 py-1 rounded">
          <Search className="w-3 h-3 animate-spin" />
          <span>ANALYZING BRANCH</span>
        </div>
      </div>

      {/* Interface Body */}
      <div className="p-6 flex flex-col gap-6 relative">
        
        {/* Branch Info Row */}
        <div className="hero-branch-row flex flex-wrap items-center justify-between gap-3 text-sm p-3 rounded-lg bg-black/40 border border-white/5 transition-colors duration-300">
          <div className="flex items-center gap-2 font-mono">
            <GitBranch className="w-4 h-4 text-cyan-accent" />
            <span className="text-text-secondary">feature/routing-fix</span>
          </div>
          <span className="text-text-tertiary text-xs font-mono">into</span>
          <div className="flex items-center gap-2 font-mono">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span className="text-text-primary">main</span>
          </div>
        </div>

        {/* Commits & CI Status */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono text-text-tertiary">
            <GitCommit className="w-4 h-4" />
            <span className="text-text-secondary">3 commits</span>
            <span>•</span>
            <span className="hero-drift-tag text-amber-400 font-semibold opacity-0">14 COMMITS BEHIND MAIN</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-black/30 border border-white/5 text-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-xs md:text-sm">All checks have passed</span>
            </div>

            <div className="relative font-mono text-xs tracking-wider">
              <span className="hero-status-uptodate text-emerald-400">
                UP TO DATE
              </span>
              <span className="hero-status-outofdate text-amber-400 opacity-0 absolute right-0 top-0 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                OUT OF DATE
              </span>
            </div>
          </div>
        </div>

        {/* Athena Conflict Radar & Warning Panel */}
        <div 
          className="hero-warning-panel opacity-0 translate-y-3 glass-panel-cyan p-5 rounded-lg border-l-4 border-l-cyan-accent space-y-3 relative z-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-accent font-medium text-sm">
              <Shield className="w-4 h-4 text-cyan-accent" />
              <span>Athena Conflict Radar</span>
            </div>
            <span className="text-[10px] bg-cyan-accent/20 px-2 py-0.5 rounded text-cyan-accent font-mono uppercase font-bold">
              Risk Detected
            </span>
          </div>

          <p className="text-white text-xs md:text-sm leading-relaxed">
            Potential merge conflict detected. This branch is 14 commits behind <code className="text-cyan-accent font-mono bg-black/50 px-1 py-0.5 rounded">main</code>. Merging now will overwrite recent hotfixes.
          </p>

          {/* Context Reveal Grid */}
          <div className="hero-context-grid opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-cyan-accent/20 text-[10px] font-mono">
            <div className="p-2 rounded bg-black/50 border border-white/5">
              <div className="text-text-tertiary">BASE</div>
              <div className="text-white font-bold">main</div>
            </div>
            <div className="p-2 rounded bg-black/50 border border-white/5">
              <div className="text-text-tertiary">HEAD</div>
              <div className="text-cyan-accent font-bold">feature/routing-fix</div>
            </div>
            <div className="p-2 rounded bg-black/50 border border-white/5">
              <div className="text-text-tertiary">STATUS</div>
              <div className="text-amber-400 font-bold">14 behind</div>
            </div>
            <div className="p-2 rounded bg-black/50 border border-white/5">
              <div className="text-text-tertiary">RISK</div>
              <div className="text-red-400 font-bold">Conflict</div>
            </div>
          </div>
        </div>

        {/* Merge Action Row */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="hero-intercept-label opacity-0 text-xs font-mono text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Athena Intervention: Review branch changes before merging.</span>
          </div>

          <div className="relative ml-auto">
            <button 
              className="hero-merge-btn-normal flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-medium text-xs md:text-sm transition-colors"
            >
              <GitMerge className="w-4 h-4" />
              <span>Merge pull request</span>
            </button>

            <button 
              className="hero-merge-btn-blocked opacity-0 pointer-events-none absolute inset-0 flex items-center gap-2 px-5 py-2.5 bg-red-500/20 text-red-300 border border-red-500/40 rounded font-medium text-xs md:text-sm transition-colors font-mono"
            >
              <Shield className="w-4 h-4 text-red-400" />
              <span>Action Intercepted</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
