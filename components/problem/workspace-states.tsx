import React, { forwardRef } from "react";
import { Shield, GitBranch, GitMerge, CheckCircle2, XCircle, Activity, Box, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

// STATE 01 — EXPOSED SECRET
export const StateSecret = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0 flex flex-col p-6", className)} {...props}>
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
          <Terminal className="w-4 h-4 text-text-tertiary" />
          <span className="text-text-secondary text-sm font-mono">config/env.ts - Editing</span>
        </div>
        
        <div className="font-mono text-sm space-y-2 mt-4 relative">
          <div className="text-text-tertiary">export const config = {"{"}</div>
          <div className="pl-4 text-text-secondary">apiUrl: &quot;https://api.production.com&quot;,</div>
          
          <div className="pl-4 relative group">
            {/* The secret line */}
            <span className="text-white">stripeKey:</span> <span className="text-emerald-400">&quot;sk_live_51M...&quot;</span>,
            
            {/* The scan line (animated via GSAP) */}
            <div className="secret-scan-line absolute top-1/2 left-0 w-full h-[2px] bg-cyan-accent shadow-[0_0_10px_rgba(0,240,255,0.8)] opacity-0 -translate-y-1/2 scale-x-0 origin-left z-20 pointer-events-none" />
            
            {/* The highlight that appears after scan */}
            <div className="secret-highlight absolute -inset-y-1 -inset-x-2 border border-cyan-accent/50 bg-cyan-accent/10 opacity-0 rounded z-10 pointer-events-none" />
          </div>

          <div className="text-text-tertiary">{"}"};</div>
        </div>

        {/* Athena Warning Panel */}
        <div className="secret-warning opacity-0 translate-y-4 absolute bottom-6 left-6 right-6 glass-panel-cyan p-4 rounded border-l-2 border-l-cyan-accent flex items-start gap-3 z-30">
          <Shield className="w-5 h-5 text-cyan-accent mt-0.5" />
          <div>
            <h4 className="text-cyan-accent font-medium text-sm">SECRET DETECTED</h4>
            <p className="text-white/80 text-xs mt-1">This value appears to contain a sensitive API credential. Committing this will expose it to the repository.</p>
          </div>
        </div>
      </div>
    );
  }
);
StateSecret.displayName = "StateSecret";

// STATE 02 — MERGE CONFLICT
export const StateMerge = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0 flex flex-col p-6", className)} {...props}>
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
          <GitMerge className="w-4 h-4 text-text-tertiary" />
          <span className="text-text-secondary text-sm font-mono">Pull Request #42</span>
        </div>

        <div className="flex flex-col gap-6 mt-4">
          <div className="flex items-center justify-between text-sm bg-black/40 p-3 rounded border border-white/5">
            <div className="flex items-center gap-2 font-mono text-text-secondary">
              <GitBranch className="w-4 h-4" /> feature/payment-flow
            </div>
            <span className="text-text-tertiary text-xs">into</span>
            <div className="flex items-center gap-2 font-mono text-text-primary">
              <GitBranch className="w-4 h-4" /> main
            </div>
          </div>

          <div className="merge-status flex items-center justify-between p-3 rounded bg-amber-500/10 border border-amber-500/20 text-sm">
            <span className="text-amber-500 font-medium">Branch is out of date</span>
            <span className="text-amber-500/70 font-mono text-xs">12 commits behind</span>
          </div>
        </div>

        {/* Athena Warning Panel */}
        <div className="merge-warning opacity-0 translate-y-4 absolute bottom-6 left-6 right-6 glass-panel-cyan p-4 rounded border-l-2 border-l-cyan-accent flex items-start gap-3 z-30">
          <Shield className="w-5 h-5 text-cyan-accent mt-0.5" />
          <div>
            <h4 className="text-cyan-accent font-medium text-sm">POTENTIAL MERGE CONFLICT</h4>
            <p className="text-white/80 text-xs mt-1">Athena detected changes in main that conflict with your core files. Merge not recommended.</p>
          </div>
        </div>
      </div>
    );
  }
);
StateMerge.displayName = "StateMerge";

// STATE 03 — PIPELINE FAILURE
export const StatePipeline = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0 flex flex-col p-6", className)} {...props}>
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
          <Activity className="w-4 h-4 text-text-tertiary" />
          <span className="text-text-secondary text-sm font-mono">CI/CD Pipeline Workflow</span>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between p-3 rounded bg-black/40 border border-white/5 text-sm">
            <div className="flex items-center gap-3">
              <Box className="w-4 h-4 text-text-secondary" />
              <span className="text-white">Build</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="pipeline-test relative flex items-center justify-between p-3 rounded bg-black/40 border border-white/5 text-sm overflow-hidden">
            {/* The fail overlay activated by GSAP */}
            <div className="pipeline-fail-bg absolute inset-0 bg-red-500/10 opacity-0 pointer-events-none" />
            
            <div className="flex items-center gap-3 relative z-10">
              <Box className="w-4 h-4 text-text-secondary" />
              <span className="text-white">Test (Jest/Playwright)</span>
            </div>
            
            <div className="relative z-10 pipeline-icon">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-100 pipeline-success-icon absolute right-0 top-1/2 -translate-y-1/2" />
              <XCircle className="w-4 h-4 text-red-500 opacity-0 pipeline-fail-icon absolute right-0 top-1/2 -translate-y-1/2 scale-50" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-black/40 border border-white/5 text-sm opacity-50">
            <div className="flex items-center gap-3">
              <Box className="w-4 h-4 text-text-secondary" />
              <span className="text-white">Deploy</span>
            </div>
            <span className="w-4 h-4 rounded-full border border-text-tertiary" />
          </div>
        </div>

        {/* Athena Warning Panel */}
        <div className="pipeline-warning opacity-0 translate-y-4 absolute bottom-6 left-6 right-6 glass-panel-cyan p-4 rounded border-l-2 border-l-cyan-accent flex items-start gap-3 z-30">
          <Shield className="w-5 h-5 text-cyan-accent mt-0.5" />
          <div>
            <h4 className="text-cyan-accent font-medium text-sm">PIPELINE ISSUE DETECTED</h4>
            <p className="text-white/80 text-xs mt-1">Failed on integration tests. Missing mock for payment gateway route.</p>
          </div>
        </div>
      </div>
    );
  }
);
StatePipeline.displayName = "StatePipeline";
