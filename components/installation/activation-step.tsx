"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, ArrowLeft, Sparkles } from "lucide-react";
import { ATHENA_DOWNLOAD_CONFIG } from "./config";

interface ActivationStepProps {
  onPrev: () => void;
}

export function ActivationStep({ onPrev }: ActivationStepProps) {
  const handleOpenGitHub = () => {
    window.open(ATHENA_DOWNLOAD_CONFIG.githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center text-center py-6 sm:py-8 px-4 sm:px-8">
      {/* Athena Official Logo with Cyan Pulse Effect */}
      <div className="relative mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.3)] p-2">
          <Image
            src="/athena-logo.png"
            alt="Athena Active Logo"
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="absolute -inset-2 rounded-2xl border border-cyan-accent/40 animate-pulse pointer-events-none" />
      </div>

      {/* Activation Header & Status */}
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
          <span className="font-bold tracking-wider uppercase">INSTALLED</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Athena is ready
        </h3>

        <p className="max-w-md mx-auto text-xs sm:text-sm text-text-secondary leading-relaxed">
          Open GitHub and Athena will begin monitoring your workflow.
        </p>
      </div>

      {/* Primary Action */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <button
          onClick={handleOpenGitHub}
          className="w-full py-4 px-8 bg-white text-black font-semibold text-sm rounded-lg hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.18)] group"
        >
          <span>OPEN GITHUB</span>
          <ExternalLink className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-mono text-text-tertiary pt-1">
          <Sparkles className="w-3 h-3 text-cyan-accent" />
          <span>Installation complete.</span>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onPrev}
        className="mt-8 text-xs font-mono text-text-tertiary hover:text-white transition-colors flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to 02 Load</span>
      </button>
    </div>
  );
}
