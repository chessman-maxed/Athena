"use client";

import { MessageSquare, AlertTriangle, ShieldCheck, RotateCcw, Shield, Sparkles } from "lucide-react";
import { DetectionResult } from "./detection-engine";
import { DemoState } from "./detection-trace";

interface Props {
  code: string;
  onChange: (val: string) => void;
  detection: DetectionResult;
  demoState: DemoState;
  onRemoveSecret: () => void;
  onKeepSecret: () => void;
  onReset: () => void;
  onInjectSample: (sample: string) => void;
  hasInteracted: boolean;
}

export function CodeEditor({
  code,
  onChange,
  demoState,
  onRemoveSecret,
  onKeepSecret,
  onReset,
  onInjectSample,
  hasInteracted,
}: Props) {
  const lineNumbers = code.split("\n").map((_, i) => i + 1);

  return (
    <div
      className={`glass-panel rounded-xl border transition-all duration-300 overflow-hidden shadow-2xl flex flex-col h-full ${
        demoState === "detected"
          ? "border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
          : demoState === "recovered"
          ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          : "border-border-tech focus-within:border-cyan-accent/50"
      }`}
    >
      {/* Editor Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-black/60 border-b border-white/5 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-4 h-4 text-cyan-accent" />
          <span className="text-white font-medium">GITHUB / ISSUE #142 — COMMENT</span>
          <span className="text-[10px] text-text-tertiary bg-white/5 px-2 py-0.5 rounded">
            LIVE BUFFER
          </span>
        </div>

        {/* Demo Injection Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-text-tertiary mr-1">Inject:</span>
          
          <button
            onClick={() => onInjectSample(`// Configuration with live Stripe token\nconst config = {\n  env: "production",\n  stripeSecret: "sk_live_demo_98412948102948",\n};`)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-accent/15 hover:text-cyan-accent hover:border-cyan-accent/30 text-text-secondary text-[11px] font-mono transition-all border border-white/5 font-medium"
          >
            + Stripe Key
          </button>

          <button
            onClick={() => onInjectSample(`// AWS S3 client setup\nconst s3Client = {\n  region: "us-east-1",\n  AWS_ACCESS_KEY_ID: "AKIA_DEMO_ACCESS_KEY_8912",\n};`)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-accent/15 hover:text-cyan-accent hover:border-cyan-accent/30 text-text-secondary text-[11px] font-mono transition-all border border-white/5 font-medium"
          >
            + AWS Key
          </button>

          <button
            onClick={onReset}
            title="Reset code editor"
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-text-tertiary hover:text-white transition-colors border border-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 min-h-[260px] md:min-h-[300px] flex bg-black/50 font-mono text-xs">
        {/* Dynamic Scanning Line */}
        {demoState === "scanning" && (
          <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-cyan-accent shadow-[0_0_15px_#00f0ff] z-20 animate-pulse pointer-events-none" />
        )}

        {/* Line Numbers */}
        <div className="w-10 py-4 select-none text-right pr-3 text-text-tertiary bg-black/30 border-r border-white/5 shrink-0 space-y-1">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Live Textarea Input */}
        <div className="relative flex-1">
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type or paste code or sensitive tokens here..."
            spellCheck={false}
            className="w-full h-full p-4 bg-transparent text-white font-mono text-xs leading-6 resize-none focus:outline-none placeholder:text-text-tertiary/50"
          />

          {/* Interaction Prompt (Fades out once user interacts) */}
          {!hasInteracted && demoState === "idle" && (
            <div className="absolute right-4 top-4 pointer-events-none animate-bounce">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent font-mono text-[10px]">
                <Sparkles className="w-3 h-3" />
                <span>TYPE A DEMO SECRET TO TRIGGER ATHENA</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Athena Threat Intervention Bar */}
      {demoState === "detected" && (
        <div className="p-4 bg-red-500/15 border-t border-red-500/40 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-red-300 flex items-center gap-2">
                <span>SECRET DETECTED</span>
                <span className="text-[10px] bg-red-500/20 px-1.5 py-0.2 rounded font-mono uppercase">
                  Commit Blocked
                </span>
              </div>
              <div className="text-[11px] text-white/90 mt-0.5">
                Potential credential-like value found. Remove sensitive values before committing to your repository.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <button
              onClick={onRemoveSecret}
              className="px-3.5 py-1.5 rounded bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-colors shadow-[0_0_12px_rgba(239,68,68,0.4)]"
            >
              REMOVE SECRET
            </button>
            <button
              onClick={onKeepSecret}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white text-xs transition-colors border border-white/10"
            >
              KEEP FOR DEMO
            </button>
          </div>
        </div>
      )}

      {/* Recovery Success Bar */}
      {demoState === "recovered" && (
        <div className="p-3 bg-emerald-500/15 border-t border-emerald-500/30 flex items-center justify-between text-[11px] font-mono text-emerald-300 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Athena Local Sentinel: Secret cleansed • Buffer safe to commit</span>
          </div>
          <span className="text-text-tertiary">Try injecting another key above</span>
        </div>
      )}

      {/* Clean Status Footer */}
      {demoState === "idle" && (
        <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-text-tertiary">
          <div className="flex items-center gap-2 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Athena Local Sentinel: No secrets in buffer</span>
          </div>
          <span>Safe environment</span>
        </div>
      )}
    </div>
  );
}
