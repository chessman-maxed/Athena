"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowRight, ArrowLeft, Folder, MousePointer } from "lucide-react";

interface ChromeSetupStepProps {
  onNext: () => void;
  onPrev: () => void;
}

export function ChromeSetupStep({ onNext, onPrev }: ChromeSetupStepProps) {
  const [copied, setCopied] = useState(false);
  const [activeItem, setActiveItem] = useState<1 | 2 | 3 | 4>(1);

  const handleCopy = () => {
    navigator.clipboard.writeText("chrome://extensions");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-6 w-full">
      {/* Panel Sub-Header */}
      <div className="text-center sm:text-left mb-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Load Athena into Chrome
        </h3>
        <span className="text-[11px] font-mono text-cyan-accent uppercase tracking-wider">
          Developer Mode Walkthrough
        </span>
      </div>

      {/* 2-Column Clean Layout: Steps List + Stylized Mini-Schematic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: 4 Numbered Concise Steps (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {/* Step 1 */}
          <div
            onClick={() => setActiveItem(1)}
            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              activeItem === 1
                ? "bg-cyan-accent/10 border-cyan-accent/40 shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/15"
            }`}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                activeItem === 1 ? "bg-cyan-accent text-black" : "bg-white/10 text-text-secondary"
              }`}>
                01
              </span>
              <span className="text-xs font-semibold text-white">Open Extensions</span>
            </div>

            {/* Direct URL Box with Copy Button */}
            <div className="pl-6">
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-black/60 border border-white/10 font-mono text-xs text-text-secondary">
                <span className="text-cyan-accent select-all text-[11px]">chrome://extensions</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  className="text-[10px] font-mono text-cyan-accent hover:text-white flex items-center gap-1 bg-cyan-accent/10 hover:bg-cyan-accent/20 px-2 py-0.5 rounded border border-cyan-accent/20 transition-colors shrink-0"
                  title="Copy chrome://extensions to clipboard"
                >
                  {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setActiveItem(2)}
            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              activeItem === 2
                ? "bg-cyan-accent/10 border-cyan-accent/40 shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/15"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                activeItem === 2 ? "bg-cyan-accent text-black" : "bg-white/10 text-text-secondary"
              }`}>
                02
              </span>
              <span className="text-xs font-semibold text-white">Enable Developer Mode</span>
            </div>
            <div className="mt-1 text-[11px] text-text-tertiary pl-6">
              Toggle the switch in top-right corner.
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setActiveItem(3)}
            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              activeItem === 3
                ? "bg-cyan-accent/10 border-cyan-accent/40 shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/15"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                activeItem === 3 ? "bg-cyan-accent text-black" : "bg-white/10 text-text-secondary"
              }`}>
                03
              </span>
              <span className="text-xs font-semibold text-white">Click &ldquo;Load unpacked&rdquo;</span>
            </div>
            <div className="mt-1 text-[11px] text-text-tertiary pl-6">
              Appears in top toolbar when developer mode is on.
            </div>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => setActiveItem(4)}
            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              activeItem === 4
                ? "bg-cyan-accent/10 border-cyan-accent/40 shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/15"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                activeItem === 4 ? "bg-cyan-accent text-black" : "bg-white/10 text-text-secondary"
              }`}>
                04
              </span>
              <span className="text-xs font-semibold text-white">Select the &ldquo;dist&rdquo; Folder</span>
            </div>
            <div className="mt-1 text-[11px] text-text-tertiary pl-6 leading-relaxed">
              Selecting just the unzipped root folder won&apos;t work. Open it and select the <code className="text-cyan-accent font-mono font-semibold">dist</code> folder inside.
            </div>
          </div>
        </div>

        {/* Right Side: Stylized Mini Chrome Extensions Illustration (7 cols) */}
        <div className="lg:col-span-7 bg-black/80 rounded-xl border border-white/10 p-4 relative overflow-hidden shadow-inner">
          {/* Top Browser Bar */}
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-500/50" />
              <span className="w-2 h-2 rounded-full bg-amber-500/50" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/50" />
            </div>

            {/* URL input */}
            <div className={`flex-1 flex items-center justify-between px-2.5 py-1 rounded bg-white/[0.04] border font-mono text-[11px] transition-all duration-300 ${
              activeItem === 1
                ? "border-cyan-accent text-cyan-accent bg-cyan-accent/5 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                : "border-white/10 text-text-secondary"
            }`}>
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-text-tertiary">🔒</span>
                <span>chrome://extensions</span>
              </div>
              {activeItem === 1 && (
                <span className="text-[9px] bg-cyan-accent/20 text-cyan-accent px-1.5 rounded font-mono font-bold">
                  STEP 01
                </span>
              )}
            </div>
          </div>

          {/* Mini Toolbar: Developer Mode & Load Unpacked */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 mb-3">
            {/* Load Unpacked button */}
            <div className={`relative px-3 py-1.5 rounded border text-[11px] font-mono transition-all duration-300 ${
              activeItem === 3
                ? "bg-cyan-accent text-black font-bold border-cyan-accent shadow-[0_0_15px_rgba(0,240,255,0.35)] scale-105"
                : "bg-white/5 text-text-secondary border-white/10"
            }`}>
              <span>Load unpacked</span>
              {activeItem === 3 && (
                <MousePointer className="w-3 h-3 text-cyan-accent absolute -bottom-4 right-0 animate-bounce" />
              )}
            </div>

            {/* Developer Mode switch */}
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded border text-[11px] font-mono transition-all duration-300 ${
              activeItem === 2
                ? "border-cyan-accent bg-cyan-accent/10 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                : "border-white/10 text-text-secondary"
            }`}>
              <span>Developer mode</span>
              <div className="w-6 h-3.5 rounded-full bg-cyan-accent p-0.5 flex items-center justify-end">
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              </div>
            </div>
          </div>

          {/* Folder selection preview */}
          <div className={`p-3 rounded-lg border font-mono text-[11px] transition-all duration-300 ${
            activeItem === 4
              ? "bg-cyan-accent/10 border-cyan-accent shadow-[0_0_18px_rgba(0,240,255,0.2)]"
              : "bg-white/[0.01] border-white/5 text-text-tertiary"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className={`w-4 h-4 ${activeItem === 4 ? "text-cyan-accent" : "text-text-tertiary"}`} />
                <span className="text-white font-bold">
                  athena-dist / <span className="text-cyan-accent">dist/</span>
                </span>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded ${
                activeItem === 4 ? "bg-cyan-accent text-black font-bold" : "bg-white/5 text-text-tertiary"
              }`}>
                {activeItem === 4 ? "SELECT 'DIST'" : "READY"}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Nav Controls */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="text-xs font-mono text-text-tertiary hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to 01 Download</span>
        </button>

        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <span>Next: 03 Activate</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>
    </div>
  );
}
