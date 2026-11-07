import React from "react";

/**
 * Stylised placeholder portrait (silhouette in a suit, rim-lit in gold).
 * Shown in the hero arch until a real photo exists at /public/profile.jpg.
 */
export const DemoPortrait: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 400 500"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    role="img"
    aria-label="Portrait placeholder"
  >
    <defs>
      <radialGradient id="dp-bg" cx="0.5" cy="0.38" r="0.7">
        <stop offset="0" stopColor="#2b2318" />
        <stop offset="0.55" stopColor="#0d0b08" />
        <stop offset="1" stopColor="#000" />
      </radialGradient>
      <radialGradient id="dp-halo" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#d9b45a" stopOpacity="0.32" />
        <stop offset="1" stopColor="#d9b45a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="dp-skin" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0" stopColor="#1c150e" />
        <stop offset="0.65" stopColor="#3a2c1d" />
        <stop offset="1" stopColor="#6b5233" />
      </linearGradient>
      <linearGradient id="dp-suit" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#050505" />
        <stop offset="0.6" stopColor="#14120f" />
        <stop offset="1" stopColor="#2a241b" />
      </linearGradient>
      <linearGradient id="dp-rim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff4cf" />
        <stop offset="1" stopColor="#d9b45a" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="dp-tie" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e8c873" />
        <stop offset="1" stopColor="#6e5216" />
      </linearGradient>
    </defs>

    <rect width="400" height="500" fill="url(#dp-bg)" />
    <circle cx="200" cy="215" r="170" fill="url(#dp-halo)" />

    {/* shoulders / jacket */}
    <path d="M30,500 C40,405 100,362 158,346 L242,346 C300,362 360,405 370,500 Z" fill="url(#dp-suit)" />
    {/* neck */}
    <path d="M172,288 L172,350 Q200,374 228,350 L228,288 Z" fill="url(#dp-skin)" />
    {/* shirt */}
    <path d="M166,346 L200,430 L234,346 Q200,370 166,346 Z" fill="#e9e2d0" opacity="0.92" />
    {/* tie */}
    <path d="M193,372 L207,372 L212,446 L200,462 L188,446 Z" fill="url(#dp-tie)" />
    <path d="M191,360 L209,360 L207,374 L193,374 Z" fill="#b8892f" />
    {/* lapels */}
    <path d="M158,346 L200,466 L172,384 L132,362 Z" fill="#0b0a08" stroke="#d9b45a" strokeOpacity="0.25" />
    <path d="M242,346 L200,466 L228,384 L268,362 Z" fill="#14110d" stroke="#d9b45a" strokeOpacity="0.35" />
    {/* pocket square */}
    <path d="M276,410 L300,404 L298,416 L278,420 Z" fill="#d9b45a" opacity="0.8" />

    {/* head */}
    <ellipse cx="139" cy="228" rx="9" ry="16" fill="#1c150e" />
    <ellipse cx="261" cy="228" rx="9" ry="16" fill="#4a3824" />
    <ellipse cx="200" cy="222" rx="62" ry="78" fill="url(#dp-skin)" />
    {/* hair */}
    <path
      d="M136,214 C128,150 170,128 206,132 C250,136 274,170 264,216 C258,186 236,170 200,172 C168,174 146,188 136,214 Z"
      fill="#0a0806"
    />

    {/* gold rim light (right side) */}
    <g fill="none" stroke="url(#dp-rim)" strokeLinecap="round">
      <path d="M248,160 C268,185 268,250 248,284" strokeWidth="3" />
      <path d="M244,350 C300,364 352,406 364,480" strokeWidth="2.5" />
    </g>
  </svg>
);
