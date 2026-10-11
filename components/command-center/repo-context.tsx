"use client";

import { FolderGit2, GitBranch, GitCommit, AlertTriangle } from "lucide-react";

export function RepoContext() {
  return (
    <div className="p-5 glass-panel rounded-xl border border-border-tech flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary">
            <FolderGit2 className="w-4 h-4 text-cyan-accent" />
            Repository Context
          </div>
          <span className="text-[10px] font-mono text-cyan-accent/80 bg-cyan-accent/10 px-2 py-0.5 rounded">
            SYNCED
          </span>
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-text-tertiary">Repository</span>
            <span className="text-white font-medium bg-black/40 px-2 py-1 rounded border border-white/5">
              project-athena
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-tertiary">Active Branch</span>
            <span className="text-cyan-accent font-medium flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5">
              <GitBranch className="w-3.5 h-3.5" /> feature/security
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-tertiary">Base Target</span>
            <span className="text-text-secondary flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5">
              <GitBranch className="w-3.5 h-3.5" /> main
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-tertiary">Sync Delta</span>
            <span className="text-amber-400 font-medium flex items-center gap-1">
              <GitCommit className="w-3.5 h-3.5" /> 14 behind main
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[11px] font-mono text-text-tertiary">Branch Health</span>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          OUT OF DATE
        </div>
      </div>
    </div>
  );
}
