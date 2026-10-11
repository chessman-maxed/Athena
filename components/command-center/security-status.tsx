"use client";

import { ShieldCheck, AlertTriangle, Activity, Search } from "lucide-react";

interface StatusMetric {
  title: string;
  value: string;
  sub: string;
  status: "clear" | "warning" | "active";
  icon: typeof ShieldCheck;
}

const metrics: StatusMetric[] = [
  {
    title: "SECRETS & KEYS",
    value: "CLEAR",
    sub: "No exposed credentials detected",
    status: "clear",
    icon: ShieldCheck,
  },
  {
    title: "BRANCH INTEGRITY",
    value: "WARNING",
    sub: "14 commits behind target base",
    status: "warning",
    icon: AlertTriangle,
  },
  {
    title: "CI/CD PIPELINE",
    value: "MONITORING",
    sub: "All pre-commit suites passing",
    status: "active",
    icon: Activity,
  },
  {
    title: "PULL REQUEST",
    value: "ANALYZING",
    sub: "Scanning AST diffs for side-effects",
    status: "active",
    icon: Search,
  },
];

export function SecurityStatus() {
  return (
    <div className="p-5 glass-panel rounded-xl border border-border-tech flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary">
          <ShieldCheck className="w-4 h-4 text-cyan-accent" />
          Security Status Monitor
        </div>
        <span className="text-[10px] font-mono text-text-tertiary">4 ENGINE SENSORS</span>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-text-tertiary">{m.title}</span>
                <Icon
                  className={`w-3.5 h-3.5 ${
                    m.status === "warning"
                      ? "text-amber-400"
                      : m.status === "clear"
                      ? "text-emerald-400"
                      : "text-cyan-accent"
                  }`}
                />
              </div>

              <div>
                <div
                  className={`text-sm font-mono font-bold tracking-wider ${
                    m.status === "warning"
                      ? "text-amber-400"
                      : m.status === "clear"
                      ? "text-emerald-400"
                      : "text-cyan-accent"
                  }`}
                >
                  {m.value}
                </div>
                <div className="text-[10px] text-text-tertiary leading-tight mt-1 line-clamp-2">
                  {m.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
