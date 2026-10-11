"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, ArrowRight, CheckCircle2 } from "lucide-react";
import { ATHENA_DOWNLOAD_CONFIG } from "./config";

interface DownloadStepProps {
  onNext: () => void;
}

export function DownloadStep({ onNext }: DownloadStepProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    const link = document.createElement("a");
    link.href = ATHENA_DOWNLOAD_CONFIG.url;
    link.download = ATHENA_DOWNLOAD_CONFIG.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center text-center py-6 sm:py-8 px-4 sm:px-8">
      {/* Athena Official Logo with subtle Cyan Aura */}
      <div className="relative mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.22)] p-2">
          <Image
            src="/athena-logo.png"
            alt="Athena Package Logo"
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-accent" />
        </span>
      </div>

      {/* Package Header */}
      <div className="space-y-1.5 mb-8">
        <div className="text-[11px] font-mono text-cyan-accent tracking-widest uppercase font-semibold">
          Athena Extension
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
          {ATHENA_DOWNLOAD_CONFIG.filename}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-text-secondary">
          {ATHENA_DOWNLOAD_CONFIG.version}
        </p>
      </div>

      {/* Primary Download Button */}
      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <button
          onClick={handleDownload}
          className="w-full py-4 px-8 bg-white text-black font-semibold text-sm rounded-lg hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.18)] group"
        >
          <Download className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
          <span>DOWNLOAD ATHENA</span>
        </button>

        {downloaded ? (
          <button
            onClick={onNext}
            className="w-full py-3 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center justify-center gap-2 hover:bg-emerald-500/15 transition-colors animate-fade-in"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Downloaded • Continue to 02 Load →</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="text-xs font-mono text-text-tertiary hover:text-cyan-accent transition-colors flex items-center gap-1.5 pt-1"
          >
            <span>Next: 02 Load into Chrome</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
