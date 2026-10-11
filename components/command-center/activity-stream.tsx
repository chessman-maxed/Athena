"use client";

import { Activity, ShieldAlert, GitPullRequest, GitBranch, CheckCircle2, MessageSquare, Terminal } from "lucide-react";

interface EventEntry {
  time: string;
  label: string;
  icon: typeof Activity;
  color: string;
  highlight?: boolean;
}

const events: EventEntry[] = [
  { time: "14:32:08", label: "PR #108 opened by @core-dev", icon: GitPullRequest, color: "text-emerald-400" },
  { time: "14:32:11", label: "Branch feature/security analyzed", icon: GitBranch, color: "text-cyan-accent" },
  { time: "14:32:12", label: "CI check suite completed (3/3 pass)", icon: CheckCircle2, color: "text-emerald-400" },
  { time: "14:32:14", label: "Comment field modified in PR review", icon: MessageSquare, color: "text-text-tertiary" },
  { time: "14:32:15", label: "Risk signal detected (14 commits behind)", icon: ShieldAlert, color: "text-amber-400", highlight: true },
  { time: "14:32:16", label: "Athena intervention modal triggered", icon: Terminal, color: "text-cyan-accent", highlight: true },
];

export function ActivityStream() {
  return (
    <div className="p-5 glass-panel rounded-xl border border-border-tech flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary">
          <Activity className="w-4 h-4 text-emerald-400" />
          Live Activity Stream
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          STREAMING
        </div>
      </div>

      <div className="space-y-2.5 overflow-hidden flex-1">
        {events.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-2.5 rounded-lg font-mono text-xs transition-all duration-300 ${
                evt.highlight
                  ? "bg-cyan-accent/10 border border-cyan-accent/30 text-white"
                  : "bg-black/30 border border-white/5 text-text-secondary hover:bg-white/5"
              }`}
            >
              <span className="text-text-tertiary text-[11px] shrink-0 pt-0.5">{evt.time}</span>
              <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${evt.color}`} />
              <span className="leading-snug">{evt.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
