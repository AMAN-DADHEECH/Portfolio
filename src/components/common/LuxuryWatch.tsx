"use client";

import React, { useEffect, useRef } from "react";

/**
 * Vintage black & gold analog wristwatch, drawn in SVG.
 * Hands follow the viewer's local time; they're driven through refs inside a
 * requestAnimationFrame loop so the component never re-renders while ticking.
 * The server render shows the classic "10:10" display pose (no hydration mismatch).
 */

const CX = 160;
const CY = 300;
const ROMAN = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

/** Round so server & client serialise identical numbers (avoids hydration mismatch) */
const r2 = (n: number) => Math.round(n * 100) / 100;

const polar = (r: number, deg: number, cy: number = CY) => {
  const rad = (deg * Math.PI) / 180;
  return { x: r2(CX + r * Math.sin(rad)), y: r2(cy - r * Math.cos(rad)) };
};

/** Leaf-shaped (dauphine) hand pointing up from the origin */
const leafHand = (length: number, width: number, tail: number) =>
  `M0,${tail} C${-width},${tail * 0.2} ${-width},${-length * 0.55} 0,${-length} C${width},${-length * 0.55} ${width},${tail * 0.2} 0,${tail} Z`;

export const LuxuryWatch: React.FC<{ className?: string }> = ({ className = "" }) => {
  const hourRef = useRef<SVGGElement>(null);
  const minuteRef = useRef<SVGGElement>(null);
  const secondRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const now = new Date();
      const s = now.getSeconds() + now.getMilliseconds() / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;
      hourRef.current?.setAttribute("transform", `translate(${CX} ${CY}) rotate(${h * 30})`);
      minuteRef.current?.setAttribute("transform", `translate(${CX} ${CY}) rotate(${m * 6})`);
      secondRef.current?.setAttribute("transform", `translate(${CX} 345) rotate(${s * 6})`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const minuteTicks = Array.from({ length: 60 }, (_, i) => i);
  const fluting = Array.from({ length: 120 }, (_, i) => i * 3);
  const sunburst = Array.from({ length: 90 }, (_, i) => i * 4);

  return (
    <svg
      viewBox="0 0 320 600"
      className={className}
      role="img"
      aria-label="Vintage black and gold analog wristwatch showing the current time"
    >
      <defs>
        <linearGradient id="w-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff2c2" />
          <stop offset="0.25" stopColor="#d9b45a" />
          <stop offset="0.5" stopColor="#8a6a1f" />
          <stop offset="0.72" stopColor="#ecd082" />
          <stop offset="1" stopColor="#6e5216" />
        </linearGradient>
        <linearGradient id="w-gold-soft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e3a1" />
          <stop offset="1" stopColor="#b8892f" />
        </linearGradient>
        <linearGradient id="w-hand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff4cf" />
          <stop offset="0.5" stopColor="#e8c873" />
          <stop offset="0.5" stopColor="#9c7726" />
          <stop offset="1" stopColor="#6e5216" />
        </linearGradient>
        <linearGradient id="w-leather" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#060504" />
          <stop offset="0.5" stopColor="#1a1611" />
          <stop offset="1" stopColor="#060504" />
        </linearGradient>
        <radialGradient id="w-dial" cx="0.45" cy="0.4" r="0.65">
          <stop offset="0" stopColor="#1f1c17" />
          <stop offset="0.65" stopColor="#0a0907" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <radialGradient id="w-glare" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="w-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.13" stopColor="#fff" />
          <stop offset="0.87" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="w-strap-mask">
          <rect width="320" height="600" fill="url(#w-fade)" />
        </mask>
        <filter id="w-hand-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.6" floodColor="#000" floodOpacity="0.8" />
        </filter>
        <clipPath id="w-dial-clip">
          <circle cx={CX} cy={CY} r="104" />
        </clipPath>
      </defs>

      {/* ---------- Strap ---------- */}
      <g mask="url(#w-strap-mask)">
        <path d="M116,0 H204 L212,200 H108 Z" fill="url(#w-leather)" />
        <path d="M108,400 H212 L204,600 H116 Z" fill="url(#w-leather)" />
        {/* gold stitching */}
        <g stroke="#d9b45a" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="6 5" fill="none">
          <path d="M123,0 L116,196" />
          <path d="M197,0 L204,196" />
          <path d="M116,404 L123,600" />
          <path d="M204,404 L197,600" />
        </g>
        {/* keeper loop + holes */}
        <rect x="106" y="452" width="108" height="16" rx="3" fill="#0c0a08" stroke="url(#w-gold)" strokeWidth="1" />
        {[505, 535, 565].map((y) => (
          <circle key={y} cx="160" cy={y} r="3.2" fill="#000" stroke="#d9b45a" strokeOpacity="0.45" />
        ))}
      </g>

      {/* ---------- Lugs ---------- */}
      <rect x="90" y="166" width="140" height="268" rx="30" fill="url(#w-gold)" />
      <rect x="108" y="160" width="104" height="40" fill="url(#w-leather)" />
      <rect x="108" y="400" width="104" height="40" fill="url(#w-leather)" />

      {/* ---------- Crown ---------- */}
      <rect x="278" y="292" width="8" height="16" fill="url(#w-gold-soft)" />
      <rect x="284" y="284" width="16" height="32" rx="4" fill="url(#w-gold)" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="286" x2="298" y1={287.5 + i * 3.2} y2={287.5 + i * 3.2} stroke="#5a4310" strokeWidth="0.8" />
      ))}

      {/* ---------- Case & coin-edge bezel ---------- */}
      <circle cx={CX} cy={CY} r="125" fill="#3d2e0b" />
      <circle cx={CX} cy={CY} r="124" fill="url(#w-gold)" />
      <g stroke="#5a4310" strokeOpacity="0.55" strokeWidth="1">
        {fluting.map((deg) => {
          const a = polar(116, deg);
          const b = polar(123, deg);
          return <line key={deg} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>
      <circle cx={CX} cy={CY} r="113" fill="#0b0a08" stroke="url(#w-gold-soft)" strokeWidth="2.5" />
      <circle cx={CX} cy={CY} r="106" fill="none" stroke="#d9b45a" strokeOpacity="0.7" strokeWidth="1" />

      {/* ---------- Dial ---------- */}
      <circle cx={CX} cy={CY} r="104" fill="url(#w-dial)" />
      <g clipPath="url(#w-dial-clip)" stroke="#fff" strokeOpacity="0.018" strokeWidth="1.4">
        {sunburst.map((deg) => {
          const b = polar(104, deg);
          return <line key={deg} x1={CX} y1={CY} x2={b.x} y2={b.y} />;
        })}
      </g>

      {/* minute track */}
      {minuteTicks.map((i) => {
        const major = i % 5 === 0;
        const a = polar(major ? 91 : 95, i * 6);
        const b = polar(100, i * 6);
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#d9b45a"
            strokeOpacity={major ? 0.95 : 0.45}
            strokeWidth={major ? 2 : 0.8}
            strokeLinecap="round"
          />
        );
      })}

      {/* Roman numerals */}
      <g
        fill="url(#w-gold-soft)"
        fontSize="17"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
      >
        {ROMAN.map((n, i) => {
          const p = polar(77, i * 30);
          return (
            <text key={n} x={p.x} y={p.y + 6} transform={`rotate(${i * 30} ${p.x} ${p.y})`}>
              {n}
            </text>
          );
        })}
      </g>

      {/* Maker's mark */}
      <text
        x={CX}
        y="258"
        textAnchor="middle"
        fontSize="20"
        fontStyle="italic"
        fill="url(#w-gold-soft)"
        style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
      >
        AD
      </text>
      <text
        x={CX}
        y="272"
        textAnchor="middle"
        fontSize="6"
        letterSpacing="2.6"
        fill="#a9802c"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        SINCE 2005
      </text>

      {/* Small-seconds sub-dial */}
      <circle cx={CX} cy="345" r="17" fill="#060504" stroke="#d9b45a" strokeOpacity="0.55" strokeWidth="0.8" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = polar(13, i * 30, 345);
        const b = polar(16, i * 30, 345);
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#d9b45a"
            strokeOpacity="0.7"
            strokeWidth="0.7"
          />
        );
      })}
      <g ref={secondRef} transform={`translate(${CX} 345) rotate(180)`}>
        <line x1="0" y1="3.5" x2="0" y2="-14.5" stroke="#f1dfae" strokeWidth="1" strokeLinecap="round" />
        <circle r="1.8" fill="#d9b45a" />
      </g>

      {/* ---------- Hands ---------- */}
      <g filter="url(#w-hand-shadow)">
        <g ref={hourRef} transform={`translate(${CX} ${CY}) rotate(305)`}>
          <path d={leafHand(56, 6, 14)} fill="url(#w-hand)" />
        </g>
        <g ref={minuteRef} transform={`translate(${CX} ${CY}) rotate(60)`}>
          <path d={leafHand(88, 4.4, 16)} fill="url(#w-hand)" />
        </g>
        <circle cx={CX} cy={CY} r="5.5" fill="url(#w-gold)" />
        <circle cx={CX} cy={CY} r="1.8" fill="#3d2e0b" />
      </g>

      {/* Crystal glare */}
      <ellipse
        cx="122"
        cy="250"
        rx="72"
        ry="34"
        fill="url(#w-glare)"
        transform="rotate(-32 122 250)"
        pointerEvents="none"
      />
    </svg>
  );
};
