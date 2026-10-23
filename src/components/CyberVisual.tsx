import React from 'react';

interface CyberVisualProps {
  type: 'architecture' | 'cloud' | 'mobile' | 'ai';
  className?: string;
  title?: string;
}

export const CyberVisual: React.FC<CyberVisualProps> = ({
  type,
  className = '',
  title
}) => {
  if (type === 'architecture' || !type) {
    return (
      <div className={`relative w-full aspect-video rounded-xl bg-[#091122] border border-cyan-500/25 overflow-hidden flex items-center justify-center p-6 ${className}`}>
        {/* Ambient background grid & radial light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.18),transparent_70%)]" />
        <div className="absolute inset-0 cyber-grid-pattern opacity-40" />

        {/* Dynamic Software Architecture & Microservices Canvas */}
        <svg viewBox="0 0 600 340" className="w-full h-full relative z-10" fill="none">
          <defs>
            <linearGradient id="codeFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0b172d" />
              <stop offset="100%" stopColor="#082544" />
            </linearGradient>
          </defs>

          {/* Web & Mobile Clients (Left) */}
          <rect x="40" y="80" width="120" height="70" rx="8" fill="url(#nodeGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="55" y="105" fill="#38bdf8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Next.js 15 Web</text>
          <text x="55" y="122" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">React 19 · SSR</text>
          <text x="55" y="138" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Tailwind v4 · FCP &lt; 0.8s</text>

          <rect x="40" y="180" width="120" height="70" rx="8" fill="url(#nodeGrad)" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="55" y="205" fill="#22d3ee" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Flutter Mobile</text>
          <text x="55" y="222" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">iOS Swift · Kotlin</text>
          <text x="55" y="238" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Offline-First · 60fps</text>

          {/* API Gateway & Orchestration (Center) */}
          <polygon points="300,75 365,165 300,255 235,165" fill="#0c1f3d" stroke="#22d3ee" strokeWidth="2" />
          <text x="262" y="155" fill="#e0f2fe" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">API GATEWAY</text>
          <text x="268" y="172" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono">GraphQL · REST</text>
          <text x="272" y="188" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Sub-80ms Latency</text>

          {/* Connecting Data Pipelines */}
          <path d="M 160 115 L 235 165" stroke="url(#codeFlowGrad)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 160 215 L 235 165" stroke="url(#codeFlowGrad)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Microservices & Cloud Backends (Right) */}
          <rect x="440" y="55" width="125" height="60" rx="8" fill="url(#nodeGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="455" y="80" fill="#38bdf8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Go Microservice</text>
          <text x="455" y="98" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono">High-Throughput APIs</text>

          <rect x="440" y="135" width="125" height="60" rx="8" fill="url(#nodeGrad)" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="455" y="160" fill="#22d3ee" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Gemini AI Engine</text>
          <text x="455" y="178" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono">Multi-Turn · RAG Search</text>

          <rect x="440" y="215" width="125" height="60" rx="8" fill="url(#nodeGrad)" stroke="#0284c7" strokeWidth="1.5" />
          <text x="455" y="240" fill="#38bdf8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Postgres &amp; Redis</text>
          <text x="455" y="258" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono">Read Replicas · Cache</text>

          {/* Connection Lines to Services */}
          <path d="M 365 165 L 440 85" stroke="url(#codeFlowGrad)" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 365 165 L 440 165" stroke="url(#codeFlowGrad)" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 365 165 L 440 245" stroke="url(#codeFlowGrad)" strokeWidth="2" strokeDasharray="3 3" />

          {/* Dynamic status nodes */}
          <circle cx="200" cy="140" r="3" fill="#22d3ee" className="animate-ping" />
          <circle cx="400" cy="125" r="3" fill="#38bdf8" className="animate-ping" />

          {/* Title bar */}
          <rect x="20" y="20" width="180" height="30" rx="4" fill="#070e1c" stroke="#1e293b" />
          <text x="32" y="39" fill="#22d3ee" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">OFOQ SOFTWARE ARCHITECTURE</text>
        </svg>

        {/* Bottom bar overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-[#070e1b]/80 backdrop-blur px-3 py-1.5 rounded border border-slate-800">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>FULL-STACK PIPELINE: LIVE</span>
          </span>
          <span className="text-cyan-400 tabular-nums">SYSTEM STATUS: READY · SECURE WORKFLOW</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video rounded-xl bg-[#081020] border border-cyan-500/20 overflow-hidden flex items-center justify-center p-6 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.15),transparent_60%)]" />
      <div className="absolute inset-0 cyber-grid-pattern opacity-30" />

      <svg viewBox="0 0 600 340" className="w-full h-full relative z-10" fill="none">
        <rect x="80" y="90" width="140" height="150" rx="8" fill="#0b172d" stroke="#0ea5e9" strokeWidth="1.5" />
        <text x="95" y="120" fill="#38bdf8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Component Library</text>
        <text x="95" y="140" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">120+ Design Tokens</text>
        <text x="95" y="160" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">WCAG 2.1 AA Compliant</text>
        <text x="95" y="180" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Arabic RTL Ready</text>
        <circle cx="150" cy="210" r="5" fill="#22d3ee" />

        <polygon points="300,80 370,165 300,250 230,165" fill="#082544" stroke="#22d3ee" strokeWidth="2" />
        <text x="260" y="160" fill="#e0f2fe" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">DESIGN</text>
        <text x="263" y="176" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono">SYSTEM</text>

        <rect x="390" y="90" width="140" height="150" rx="8" fill="#0b172d" stroke="#0284c7" strokeWidth="1.5" />
        <text x="405" y="120" fill="#38bdf8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">Production Apps</text>
        <text x="405" y="140" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Web &amp; Mobile Clients</text>
        <text x="405" y="160" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Micro-Interactions</text>
        <text x="405" y="180" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Consistent Brand UX</text>
        <circle cx="460" cy="210" r="5" fill="#0ea5e9" />

        <path d="M 220 165 L 230 165" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M 370 165 L 390 165" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
      </svg>

      <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded border border-cyan-500/20">
        DESIGN SYSTEM TOKEN PIPELINE
      </div>
    </div>
  );
};
