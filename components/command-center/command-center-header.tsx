"use client";

import { Shield, Radio, Cpu, Layers } from "lucide-react";

export function CommandCenterHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-6 bg-black/60 border-b border-border-tech backdrop-blur-md">
      {/* Brand & Connection State */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
          <Shield className="w-4 h-4 text-cyan-accent" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-wider text-white font-mono">ATHENA // CORE ENGINE</span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PROTECTION ACTIVE
            </span>
          </div>
          <div className="text-[11px] font-mono text-text-tertiary mt-0.5">
            HOOKED TO GITHUB WEBHOOK DAEMON
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Badges */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        <div className="px-3 py-1.5 rounded bg-white/5 border border-white/5 flex items-center gap-2 text-text-secondary">
          <Cpu className="w-3.5 h-3.5 text-cyan-accent" />
          <span>SYS_ID: <strong className="text-white font-normal">ATH-07</strong></span>
        </div>

        <div className="px-3 py-1.5 rounded bg-white/5 border border-white/5 flex items-center gap-2 text-text-secondary">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>EVENTS: <strong className="text-white font-normal">24 LIVE</strong></span>
        </div>

        <div className="px-3 py-1.5 rounded bg-white/5 border border-white/5 flex items-center gap-2 text-text-secondary">
          <Layers className="w-3.5 h-3.5 text-cyan-accent" />
          <span>LAST SCAN: <strong className="text-white font-normal">00:00:03</strong></span>
        </div>
      </div>
    </div>
  );
}
