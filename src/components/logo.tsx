"use client";

import React from "react";

export function AnimatedLogo({ size, className }: { size?: number; className?: string }) {
  const sizeStyle = size ? { width: size, height: size } : {};
  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-forest to-emerald-950 p-0.5 shadow-md shadow-emerald-950/20 group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-900/30 ${className || ""}`}
      style={sizeStyle}
    >
      {/* Halo Pulse Effect */}
      <div className="absolute inset-0 -z-10 rounded-full bg-emerald-500 opacity-20 blur-sm transition-all duration-700 group-hover:scale-125 group-hover:opacity-40 group-hover:blur-md" />

      {/* Outer Rotating Premium Border */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40 opacity-70 group-hover:animate-[spin_12s_linear_infinite]" />

      {/* Outer Solid Golden Frame */}
      <div className="absolute inset-0 rounded-full border border-amber-400/30" />

      {/* Inner Metallic Circular Plate */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-900 via-forest to-emerald-950 shadow-inner">
        {/* Shimmer/Sheen Metallic Shine Animation */}
        <div 
          className="absolute -inset-full top-0 h-full w-[50%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine"
        />

        {/* 3D Realistic and Premium Crown-Paw-Wing Hybrid Emblem */}
        <svg
          className="h-[65%] w-[65%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[5deg]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Golden Gradient */}
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" /> {/* Amber 500 */}
              <stop offset="30%" stopColor="#FDE68A" /> {/* Amber 200 */}
              <stop offset="70%" stopColor="#D97706" /> {/* Amber 600 */}
              <stop offset="100%" stopColor="#B45309" /> {/* Amber 700 */}
            </linearGradient>
            
            {/* Core Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Majestic Enterprise Crown Top */}
          <path
            d="M35 28 L42 36 L50 24 L58 36 L65 28 L62 44 L38 44 Z"
            fill="url(#gold-grad)"
            opacity="0.9"
          />

          {/* Realistic Paw Pads & Wing Silhouette (Stylized Emblem) */}
          {/* Main Pad */}
          <path
            d="M32 68 C32 58, 40 50, 50 50 C60 50, 68 58, 68 68 C68 76, 60 82, 50 82 C40 82, 32 76, 32 68 Z"
            fill="url(#gold-grad)"
            className="transition-all duration-300 group-hover:opacity-100"
          />

          {/* Left Toe Pad & Wing Element */}
          <circle cx="26" cy="50" r="8" fill="url(#gold-grad)" />
          {/* Middle-Left Toe Pad */}
          <circle cx="39" cy="38" r="9" fill="url(#gold-grad)" />
          {/* Middle-Right Toe Pad */}
          <circle cx="61" cy="38" r="9" fill="url(#gold-grad)" />
          {/* Right Toe Pad & Fish Tail Element */}
          <circle cx="74" cy="50" r="8" fill="url(#gold-grad)" />

          {/* Stylized Floating Sparkles/Stars */}
          <path
            d="M50 10 L51.5 13.5 L55 15 L51.5 16.5 L50 20 L48.5 16.5 L45 15 L48.5 13.5 Z"
            fill="url(#gold-grad)"
            filter="url(#glow)"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}
