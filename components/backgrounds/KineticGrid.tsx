"use client";

import React, { useEffect, useRef } from "react";

interface KineticGridProps {
  className?: string;
  gridSize?: number;
  mouseRadius?: number;
  distortionStrength?: number;
  glowColor?: string;
  baseLineColor?: string;
  baseDotColor?: string;
}

interface Point {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  highlight: number; // 0 to 1
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
  alpha: number;
}

export function KineticGrid({
  className = "absolute inset-0",
  gridSize = 38,
  mouseRadius = 180,
  distortionStrength = 28,
  glowColor = "0, 240, 255", // Athena Cyan
  baseLineColor = "rgba(255, 255, 255, 0.04)",
  baseDotColor = "rgba(255, 255, 255, 0.08)",
}: KineticGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[][] = [];
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;

    // Mouse state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isHovered: false,
    };

    const ripples: Ripple[] = [];

    // Check for pointer capability (disable heavy distortion on touch-only mobile devices)
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const initGrid = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / gridSize) + 2;
      rows = Math.ceil(height / gridSize) + 2;

      const offsetX = ((cols - 1) * gridSize - width) / 2;
      const offsetY = ((rows - 1) * gridSize - height) / 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const bx = c * gridSize - offsetX;
          const by = r * gridSize - offsetY;
          points[r][c] = {
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            highlight: 0,
          };
        }
      }
    };

    initGrid();

    // Mouse & Window event listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const rect = container.getBoundingClientRect();
      const inBounds =
        e.clientX >= rect.left - 80 &&
        e.clientX <= rect.right + 80 &&
        e.clientY >= rect.top - 80 &&
        e.clientY <= rect.bottom + 80;

      if (inBounds) {
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.isHovered = true;
      } else {
        mouse.isHovered = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inBounds) {
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 0,
          maxRadius: Math.max(width, height) * 0.8,
          speed: 7,
          strength: 22,
          alpha: 0.85,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      initGrid();
    });
    resizeObserver.observe(container);

    // Render loop
    const spring = 0.08;
    const friction = 0.82;
    const waveWidth = 70;

    const render = () => {
      // Smooth mouse coordinate interpolation
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x += (-9999 - mouse.x) * 0.1;
        mouse.y += (-9999 - mouse.y) * 0.1;
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.alpha *= 0.965;
        rip.strength *= 0.97;
        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // Update points physics & displacement
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          let targetX = p.baseX;
          let targetY = p.baseY;
          let highlight = 0;

          // Mouse distortion
          if (!isTouchDevice && mouse.isHovered) {
            const dx = p.baseX - mouse.x;
            const dy = p.baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius && dist > 0.1) {
              const normDist = dist / mouseRadius;
              const factor = (1 - normDist) ** 2;
              const push = factor * distortionStrength;
              targetX += (dx / dist) * push;
              targetY += (dy / dist) * push;
              highlight = Math.max(highlight, (1 - normDist) * 0.9);
            }
          }

          // Ripples distortion
          for (let k = 0; k < ripples.length; k++) {
            const rip = ripples[k];
            const rdx = p.baseX - rip.x;
            const rdy = p.baseY - rip.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = Math.abs(rdist - rip.radius);

            if (diff < waveWidth && rdist > 0.1) {
              const waveFactor = Math.cos((diff / waveWidth) * (Math.PI / 2));
              const wavePush = waveFactor * rip.strength * rip.alpha;
              targetX += (rdx / rdist) * wavePush;
              targetY += (rdy / rdist) * wavePush;
              highlight = Math.max(highlight, waveFactor * rip.alpha);
            }
          }

          // Spring physics
          const ax = (targetX - p.x) * spring;
          const ay = (targetY - p.y) * spring;
          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;
          p.x += p.vx;
          p.y += p.vy;

          p.highlight += (highlight - p.highlight) * 0.2;
        }
      }

      // 1. Draw horizontal grid lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = points[r][c];
          const p2 = points[r][c + 1];
          const avgHighlight = (p1.highlight + p2.highlight) * 0.5;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (avgHighlight > 0.02) {
            ctx.strokeStyle = `rgba(${glowColor}, ${0.04 + avgHighlight * 0.45})`;
            ctx.lineWidth = 1 + avgHighlight * 0.8;
          } else {
            ctx.strokeStyle = baseLineColor;
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        }
      }

      // 2. Draw vertical grid lines
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = points[r][c];
          const p2 = points[r + 1][c];
          const avgHighlight = (p1.highlight + p2.highlight) * 0.5;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (avgHighlight > 0.02) {
            ctx.strokeStyle = `rgba(${glowColor}, ${0.04 + avgHighlight * 0.45})`;
            ctx.lineWidth = 1 + avgHighlight * 0.8;
          } else {
            ctx.strokeStyle = baseLineColor;
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        }
      }

      // 3. Draw grid node intersection dots
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          const hl = p.highlight;

          ctx.beginPath();
          if (hl > 0.05) {
            const radius = 1.2 + hl * 1.8;
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${glowColor}, ${0.2 + hl * 0.8})`;
            ctx.fill();

            // Additional soft node glow for active points
            if (hl > 0.3) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${glowColor}, ${hl * 0.15})`;
              ctx.fill();
            }
          } else {
            ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
            ctx.fillStyle = baseDotColor;
            ctx.fill();
          }
        }
      }

      // 4. Subtle ambient cursor glow on the grid
      if (!isTouchDevice && mouse.isHovered) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius * 0.85
        );
        gradient.addColorStop(0, `rgba(${glowColor}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${glowColor}, 0.02)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      resizeObserver.disconnect();
    };
  }, [
    gridSize,
    mouseRadius,
    distortionStrength,
    glowColor,
    baseLineColor,
    baseDotColor,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
