"use client";

import { CheckCircle2, Play, CircleSlash2, Layers } from "lucide-react";

interface PipelineStage {
  name: string;
  duration: string;
  status: "passed" | "running" | "pending";
}

const stages: PipelineStage[] = [
  { name: "BUILD", duration: "42s", status: "passed" },
  { name: "TEST", duration: "1m 18s", status: "passed" },
  { name: "LINT", duration: "12s", status: "passed" },
  { name: "DEPLOY", duration: "queued", status: "pending" },
];

export function CIPipeline() {
  return (
    <div className="p-5 glass-panel rounded-xl border border-border-tech flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary">
          <Layers className="w-4 h-4 text-emerald-400" />
          CI/CD Pipeline Matrix
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
          WORKFLOW #8942
        </span>
      </div>

      {/* Interactive Stages Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-auto">
        {stages.map((stg, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-white tracking-wider">{stg.name}</span>
              {stg.status === "passed" ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : stg.status === "running" ? (
                <Play className="w-3.5 h-3.5 text-cyan-accent animate-pulse shrink-0" />
              ) : (
                <CircleSlash2 className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-text-tertiary">
              <span className={stg.status === "passed" ? "text-emerald-400/80" : "text-text-tertiary"}>
                {stg.status.toUpperCase()}
              </span>
              <span>{stg.duration}</span>
            </div>

            {/* Stage bottom bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                stg.status === "passed"
                  ? "bg-emerald-400"
                  : stg.status === "running"
                  ? "bg-cyan-accent"
                  : "bg-white/10"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-text-tertiary flex items-center justify-between">
        <span>Target: Staging Cluster</span>
        <span className="text-emerald-400 font-medium">Ready for Deploy Gate</span>
      </div>
    </div>
  );
}
