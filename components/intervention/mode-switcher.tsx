"use client";

import { useState } from "react";
import { Shield, MessageSquareCode, AlertTriangle, ArrowRight, CornerDownLeft, Sparkles, Terminal, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeSwitcher() {
  const [activeTab, setActiveTab] = useState<"passive" | "active">("passive");

  return (
    <div className="w-full max-w-4xl mx-auto mt-20">
      {/* Mode Toggle Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono text-cyan-accent uppercase tracking-widest mb-1">
            System Operating Modalities
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Dual-Engine Protection Architecture
          </h3>
        </div>

        <div className="inline-flex p-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("passive")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-mono font-medium transition-all duration-300",
              activeTab === "passive"
                ? "bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                : "text-text-secondary hover:text-white border border-transparent"
            )}
          >
            <Shield className="w-3.5 h-3.5" />
            PASSIVE MODE
            <span className="text-[10px] opacity-70 ml-1">Proactive Guard</span>
          </button>

          <button
            onClick={() => setActiveTab("active")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-mono font-medium transition-all duration-300",
              activeTab === "active"
                ? "bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                : "text-text-secondary hover:text-white border border-transparent"
            )}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            ACTIVE MODE
            <span className="text-[10px] opacity-70 ml-1">Interactive Assistant</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Display Panel */}
      <div className="relative glass-panel rounded-xl border border-border-tech overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* PASSIVE VIEW */}
        {activeTab === "passive" && (
          <div className="p-6 md:p-8 flex flex-col justify-between gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-white/90">Autonomous Zero-Friction Telemetry</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-text-tertiary border border-white/5">
                  SILENT BACKGROUND DAEMON
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-text-tertiary text-xs font-mono">SIMULATED GITHUB ACTION: PUSH COMMITS TO MAIN</div>
                
                <div className="p-4 rounded-lg bg-black/50 border border-white/5 font-mono text-sm flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-text-tertiary" />
                    <span className="text-text-secondary">git push origin main</span>
                  </div>
                  <span className="text-xs text-text-tertiary">Direct push attempt</span>
                </div>
              </div>

              {/* Passive Intercept Warning */}
              <div className="glass-panel-cyan p-5 rounded-lg border-l-4 border-l-cyan-accent space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-accent font-semibold text-sm">
                    <Shield className="w-4 h-4" />
                    ATHENA INTERVENTION TRIGGERED
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-cyan-accent/20 px-2 py-0.5 rounded text-cyan-accent">
                    Blocked Risky Action
                  </span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Direct push to <code className="text-cyan-accent font-mono text-xs bg-black/40 px-1 py-0.5 rounded">main</code> contains unreviewed changes in security-critical paths (<code className="text-white/80 font-mono text-xs">/auth/session.ts</code>).
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-cyan-accent/80 font-mono">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Redirecting workflow: Create PR #109 with required branch protection rules.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-text-tertiary font-mono">
              <span>Latency: &lt;12ms</span>
              <span>Zero prompt overhead</span>
            </div>
          </div>
        )}

        {/* ACTIVE VIEW */}
        {activeTab === "active" && (
          <div className="p-6 md:p-8 flex flex-col justify-between gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-5">
              {/* Context Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-accent" />
                  <span className="font-mono text-xs text-white/90 font-medium">Contextual Assistant Panel</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-text-tertiary">
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    <FileCode className="w-3 h-3 text-cyan-accent" /> PR Diff Context
                  </span>
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    <AlertTriangle className="w-3 h-3 text-red-400" /> CI Logs Attached
                  </span>
                </div>
              </div>

              {/* Conversation Flow */}
              <div className="space-y-4">
                {/* User Prompt */}
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-white/10 text-white rounded-lg px-4 py-2.5 max-w-md text-sm">
                    Why did this build fail on the integration step?
                  </div>
                </div>

                {/* Athena Contextual Reply */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center shrink-0 mt-1">
                    <Shield className="w-3.5 h-3.5 text-cyan-accent" />
                  </div>
                  <div className="glass-panel-cyan p-4 rounded-lg border border-cyan-accent/20 max-w-xl text-sm space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-cyan-accent font-medium">
                      <span>ANALYZED CI LOG // JOB #8942</span>
                    </div>
                    <p className="text-white/90 leading-relaxed text-xs md:text-sm">
                      The build failed because <code className="text-cyan-accent font-mono text-xs bg-black/50 px-1.5 py-0.5 rounded">stripe_webhook_handler</code> expected <code className="text-white font-mono text-xs">STRIPE_SIGNING_SECRET</code> in the mock test environment, which was removed in commit <code className="text-emerald-400 font-mono text-xs">c93f01b</code>.
                    </p>
                    <div className="p-2.5 rounded bg-black/40 border border-white/5 font-mono text-xs text-text-secondary">
                      <span className="text-emerald-400">+ Fix:</span> Restore variable in <span className="text-white">.env.test.example</span> or update test suite mocking.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="pt-4 border-t border-white/5">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-text-tertiary">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-accent" />
                  Ask Athena about this PR, merge conflict, or failed workflow...
                </span>
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded text-[10px] text-text-secondary border border-white/5">
                  <span>Enter</span>
                  <CornerDownLeft className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
