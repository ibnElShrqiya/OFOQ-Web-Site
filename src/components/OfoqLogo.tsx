import React from 'react';
import { Language } from '../types.ts';

interface OfoqLogoProps {
  className?: string;
  lang?: Language;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const OfoqLogo: React.FC<OfoqLogoProps> = ({
  className = '',
  lang = 'en',
  showWordmark = true,
  size = 'md'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric Horizon Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-lg bg-[#0b1528] border border-cyan-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]`}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:6px_6px]" />
        
        {/* Horizon Arc and Core Shield Node */}
        <svg viewBox="0 0 36 36" className="w-full h-full p-1.5 z-10" fill="none">
          <defs>
            <linearGradient id="ofoqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="ofoqGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Cyber Horizon Curvature */}
          <path
            d="M 6 22 C 12 11, 24 11, 30 22"
            stroke="url(#ofoqGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#ofoqGlow)"
          />
          
          {/* Core Central Node */}
          <circle cx="18" cy="15" r="2.8" fill="#22d3ee" />
          
          {/* Sub-horizon baseline */}
          <line x1="10" y1="26" x2="26" y2="26" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* Modern Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-bold tracking-tight text-white ${textSizes[size]}`}>
              OFOQ
            </span>
            <span className="text-xs text-cyan-400/80 font-mono font-semibold tracking-wider">
              {lang === 'ar' ? 'أُفُق' : 'TECH'}
            </span>
          </div>
          <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium mt-0.5">
            {lang === 'ar' ? 'للبرمجيات والحلول الرقمية' : 'Software & Digital Products'}
          </span>
        </div>
      )}
    </div>
  );
};
