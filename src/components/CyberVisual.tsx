
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
      <div
        dir="ltr"
        lang="en"
        role="img"
        aria-label={title || 'Illustrative software architecture'}
        className={`relative w-full min-w-0 aspect-video rounded-xl bg-[#091122] border border-cyan-500/25 overflow-hidden flex flex-col items-center justify-center p-3 sm:p-5 ${className}`}
        style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 cyber-grid-pattern opacity-40 pointer-events-none" />

        {/* Architecture diagram: fixed LTR coordinate system */}
        <div className="relative z-10 w-full min-w-0 flex-1 pb-14 sm:pb-12">
          <svg
            viewBox="0 0 600 340"
            preserveAspectRatio="xMidYMid meet"
            className="block w-full h-full"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ofoqCodeFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="ofoqNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0b172d" />
                <stop offset="100%" stopColor="#082544" />
              </linearGradient>
            </defs>

            {/* Web client */}
            <rect x="40" y="80" width="120" height="70" rx="8"
              fill="url(#ofoqNodeGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="50" y="105" fill="#38bdf8" fontSize="11"
              fontFamily="monospace" fontWeight="bold">Web Application</text>
            <text x="50" y="122" fill="#94a3b8" fontSize="10"
              fontFamily="monospace">Frontend</text>
            <text x="50" y="138" fill="#64748b" fontSize="9"
              fontFamily="monospace">Responsive UI</text>

            {/* Mobile client */}
            <rect x="40" y="180" width="120" height="70" rx="8"
              fill="url(#ofoqNodeGrad)" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="50" y="205" fill="#22d3ee" fontSize="10"
              fontFamily="monospace" fontWeight="bold">Mobile Application</text>
            <text x="50" y="222" fill="#94a3b8" fontSize="10"
              fontFamily="monospace">iOS / Android</text>
            <text x="50" y="238" fill="#64748b" fontSize="9"
              fontFamily="monospace">Mobile features</text>

            {/* API gateway */}
            <polygon
              points="300,75 365,165 300,255 235,165"
              fill="#0c1f3d"
              stroke="#22d3ee"
              strokeWidth="2"
            />
            <text x="300" y="151" textAnchor="middle" fill="#e0f2fe"
              fontSize="10" fontFamily="monospace" fontWeight="bold">
              APPLICATION
            </text>
            <text x="300" y="167" textAnchor="middle" fill="#38bdf8"
              fontSize="11" fontFamily="monospace" fontWeight="bold">
              API
            </text>
            <text x="300" y="183" textAnchor="middle" fill="#94a3b8"
              fontSize="9" fontFamily="monospace">
              Request handling
            </text>

            {/* Client connections */}
            <path d="M160 115 L235 165"
              stroke="url(#ofoqCodeFlowGrad)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M160 215 L235 165"
              stroke="url(#ofoqCodeFlowGrad)" strokeWidth="2" strokeDasharray="4 4" />

            {/* Backend */}
            <rect x="440" y="55" width="125" height="60" rx="8"
              fill="url(#ofoqNodeGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="450" y="80" fill="#38bdf8" fontSize="10"
              fontFamily="monospace" fontWeight="bold">Backend Service</text>
            <text x="450" y="98" fill="#94a3b8" fontSize="9"
              fontFamily="monospace">Application logic</text>

            {/* AI service */}
            <rect x="440" y="135" width="125" height="60" rx="8"
              fill="url(#ofoqNodeGrad)" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="450" y="160" fill="#22d3ee" fontSize="10"
              fontFamily="monospace" fontWeight="bold">Optional AI</text>
            <text x="450" y="178" fill="#94a3b8" fontSize="9"
              fontFamily="monospace">External integration</text>

            {/* Storage */}
            <rect x="440" y="215" width="125" height="60" rx="8"
              fill="url(#ofoqNodeGrad)" stroke="#0284c7" strokeWidth="1.5" />
            <text x="450" y="240" fill="#38bdf8" fontSize="10"
              fontFamily="monospace" fontWeight="bold">Data Storage</text>
            <text x="450" y="258" fill="#94a3b8" fontSize="9"
              fontFamily="monospace">Database / Cache</text>

            {/* Service connections */}
            <path d="M365 165 L440 85"
              stroke="url(#ofoqCodeFlowGrad)" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M365 165 L440 165"
              stroke="url(#ofoqCodeFlowGrad)" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M365 165 L440 245"
              stroke="url(#ofoqCodeFlowGrad)" strokeWidth="2" strokeDasharray="3 3" />

            {/* Activity indicators */}
            <circle cx="200" cy="140" r="3" fill="#22d3ee" className="animate-ping" />
            <circle cx="400" cy="125" r="3" fill="#38bdf8" className="animate-ping" />

            {/* Diagram title */}
            <rect x="20" y="20" width="205" height="30" rx="4"
              fill="#070e1c" stroke="#1e293b" />
            <text x="30" y="39" fill="#22d3ee" fontSize="10"
              fontFamily="monospace" fontWeight="600">
              SYSTEM ARCHITECTURE
            </text>
          </svg>
        </div>

        {/* Status bar: independent of page direction */}
        <div
          dir="ltr"
          className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 grid grid-cols-1 sm:grid-cols-2 items-center gap-1 sm:gap-3 text-[9px] sm:text-[10px] md:text-[11px] font-mono text-slate-400 bg-[#070e1b]/95 backdrop-blur px-2 sm:px-3 py-2 rounded border border-slate-800"
          style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
        >
          <span className="flex items-center justify-center sm:justify-start gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-center sm:text-left">
              FULL-STACK PIPELINE: LIVE
            </span>
          </span>
          <span className="text-cyan-400 text-center sm:text-right leading-relaxed">
            SYSTEM STATUS: READY · SECURE WORKFLOW
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className={`relative w-full min-w-0 aspect-video rounded-xl bg-[#081020] border border-cyan-500/20 overflow-hidden flex items-center justify-center p-3 sm:p-6 ${className}`}
      style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid-pattern opacity-30 pointer-events-none" />

      <svg
        viewBox="0 0 600 340"
        preserveAspectRatio="xMidYMid meet"
        className="relative z-10 w-full h-full"
        fill="none"
        aria-hidden="true"
      >
        <rect x="80" y="90" width="140" height="150" rx="8"
          fill="#0b172d" stroke="#0ea5e9" strokeWidth="1.5" />
        <text x="95" y="120" fill="#38bdf8" fontSize="11"
          fontFamily="monospace" fontWeight="bold">Component Library</text>
        <text x="95" y="140" fill="#64748b" fontSize="10"
          fontFamily="monospace">Reusable design tokens</text>
        <text x="95" y="160" fill="#64748b" fontSize="10"
          fontFamily="monospace">Accessibility support</text>
        <text x="95" y="180" fill="#64748b" fontSize="10"
          fontFamily="monospace">Arabic RTL support</text>
        <circle cx="150" cy="210" r="5" fill="#22d3ee" />

        <polygon points="300,80 370,165 300,250 230,165"
          fill="#082544" stroke="#22d3ee" strokeWidth="2" />
        <text x="300" y="160" textAnchor="middle" fill="#e0f2fe"
          fontSize="11" fontFamily="monospace" fontWeight="bold">DESIGN</text>
        <text x="300" y="176" textAnchor="middle" fill="#38bdf8"
          fontSize="10" fontFamily="monospace">SYSTEM</text>

        <rect x="390" y="90" width="140" height="150" rx="8"
          fill="#0b172d" stroke="#0284c7" strokeWidth="1.5" />
        <text x="405" y="120" fill="#38bdf8" fontSize="11"
          fontFamily="monospace" fontWeight="bold">Application UI</text>
        <text x="405" y="140" fill="#64748b" fontSize="10"
          fontFamily="monospace">Web &amp; Mobile Clients</text>
        <text x="405" y="160" fill="#64748b" fontSize="10"
          fontFamily="monospace">Micro-Interactions</text>
        <text x="405" y="180" fill="#64748b" fontSize="10"
          fontFamily="monospace">Consistent Brand UX</text>
        <circle cx="460" cy="210" r="5" fill="#0ea5e9" />

        <path d="M220 165 L230 165"
          stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M370 165 L390 165"
          stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
      </svg>

      <div
        dir="ltr"
        className="absolute top-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-[90%] text-[9px] sm:text-xs font-mono text-cyan-400 bg-slate-900/90 px-2.5 py-1 rounded border border-cyan-500/20"
      >
        DESIGN SYSTEM TOKEN PIPELINE
      </div>
    </div>
  );
};
