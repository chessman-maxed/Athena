"use client";

import React, { useState } from "react";
import { DownloadStep } from "./download-step";
import { ChromeSetupStep } from "./chrome-setup-step";
import { ActivationStep } from "./activation-step";

export function InstallationSection() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  return (
    <section
      id="deploy"
      className="relative w-full bg-obsidian-900 border-t border-border-tech/40 py-24 sm:py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-accent/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="container relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-accent/20 bg-cyan-accent/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent shadow-[0_0_8px_var(--color-cyan-accent)] animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-accent uppercase tracking-widest font-semibold">
              Athena // Deployment
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Get Athena running in under a minute.
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
            Download the extension, load it into Chrome, and let Athena protect your GitHub workflow.
          </p>
        </div>

        {/* 3-Step Connected Stage Indicator (01 ───── 02 ───── 03) */}
        <div className="w-full max-w-2xl mb-8 sm:mb-10 px-2">
          <div className="flex items-center justify-between relative">
            
            {/* Connecting Background Line */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] bg-white/10 z-0" />
            
            {/* Active Progress Line */}
            <div
              className="absolute top-1/2 left-8 -translate-y-1/2 h-[1px] bg-cyan-accent transition-all duration-300 z-0"
              style={{
                width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "calc(100% - 64px)",
              }}
            />

            {/* Step 1: Download */}
            <button
              onClick={() => setCurrentStep(1)}
              className="group relative z-10 flex flex-col items-center focus:outline-none"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
                  currentStep === 1
                    ? "bg-cyan-accent text-black border-cyan-accent shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-110"
                    : currentStep > 1
                    ? "bg-black text-emerald-400 border-emerald-500/40"
                    : "bg-black text-text-tertiary border-white/15 hover:border-white/40"
                }`}
              >
                01
              </div>
              <span
                className={`mt-2 font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-colors ${
                  currentStep === 1
                    ? "text-cyan-accent font-semibold"
                    : currentStep > 1
                    ? "text-white"
                    : "text-text-tertiary group-hover:text-text-secondary"
                }`}
              >
                DOWNLOAD
              </span>
            </button>

            {/* Step 2: Load */}
            <button
              onClick={() => setCurrentStep(2)}
              className="group relative z-10 flex flex-col items-center focus:outline-none"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
                  currentStep === 2
                    ? "bg-cyan-accent text-black border-cyan-accent shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-110"
                    : currentStep > 2
                    ? "bg-black text-emerald-400 border-emerald-500/40"
                    : "bg-black text-text-tertiary border-white/15 hover:border-white/40"
                }`}
              >
                02
              </div>
              <span
                className={`mt-2 font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-colors ${
                  currentStep === 2
                    ? "text-cyan-accent font-semibold"
                    : currentStep > 2
                    ? "text-white"
                    : "text-text-tertiary group-hover:text-text-secondary"
                }`}
              >
                LOAD
              </span>
            </button>

            {/* Step 3: Activate */}
            <button
              onClick={() => setCurrentStep(3)}
              className="group relative z-10 flex flex-col items-center focus:outline-none"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
                  currentStep === 3
                    ? "bg-cyan-accent text-black border-cyan-accent shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-110"
                    : "bg-black text-text-tertiary border-white/15 hover:border-white/40"
                }`}
              >
                03
              </div>
              <span
                className={`mt-2 font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-colors ${
                  currentStep === 3
                    ? "text-cyan-accent font-semibold"
                    : "text-text-tertiary group-hover:text-text-secondary"
                }`}
              >
                ACTIVATE
              </span>
            </button>

          </div>
        </div>

        {/* Central Installation Panel */}
        <div 
          id="installation-card"
          className="w-full max-w-2xl bg-black/60 border border-white/10 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-2xl transition-all duration-300 scroll-mt-24 sm:scroll-mt-28"
        >
          
          {/* Top Panel Status Strip */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02] text-[10px] font-mono">
            <div className="flex items-center gap-2 text-text-tertiary">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
              <span>LOCAL RUNTIME</span>
            </div>
            <div className="text-text-tertiary uppercase">
              CHROME EXTENSION // NO ACCOUNT
            </div>
          </div>

          {/* Dynamic Step Content */}
          <div className="p-2 sm:p-4">
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <DownloadStep onNext={() => setCurrentStep(2)} />
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-fade-in">
                <ChromeSetupStep
                  onNext={() => setCurrentStep(3)}
                  onPrev={() => setCurrentStep(1)}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-fade-in">
                <ActivationStep onPrev={() => setCurrentStep(2)} />
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
