import React from 'react';
import { ServiceItem, Language } from '../types.ts';
import { translations } from '../data/translations.ts';
import { X, CheckCircle2, Code2, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  lang: Language;
  onInquire: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  lang,
  onInquire
}) => {
  if (!service) return null;
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b1325] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:left-5 rtl:right-auto p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10 rtl:pl-10 rtl:pr-0">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-medium mb-2">
            <Code2 className="w-4 h-4" />
            <span>{service.stat[lang]} {service.statLabel[lang]}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {service.title[lang]}
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {service.fullDescription[lang]}
          </p>
        </div>

        {/* Deliverables List */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {t.services.keyDeliverables}
          </h3>
          <ul className="space-y-3">
            {service.deliverables[lang].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies & Frameworks */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {t.services.frameworks}
          </h3>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            {service.technologies.map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:border-slate-600 transition-colors cursor-pointer text-center"
          >
            {lang === 'ar' ? 'إغلاق النافذة' : 'Close Scope'}
          </button>
          <button
            onClick={() => {
              onClose();
              onInquire(service.id);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md cursor-pointer"
          >
            <span>{t.services.inquireService}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
