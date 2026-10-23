import React from 'react';
import { ProjectItem, Language } from '../types.ts';
import { translations } from '../data/translations.ts';
import { X, CheckCircle2, ShieldCheck, MapPin, Calendar, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  lang: Language;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  lang
}) => {
  if (!project) return null;
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

        {/* Header Metadata */}
        <div className="pr-10 rtl:pl-10 rtl:pr-0">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="text-cyan-400 font-semibold">{project.clientSector[lang]}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              {project.region[lang]}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              {project.year}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {project.title[lang]}
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {project.summary[lang]}
          </p>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="mt-6 pt-6 border-t border-slate-800 space-y-5">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {t.projects.challenge}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.challenge[lang]}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              {t.projects.solution}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.solution[lang]}
            </p>
          </div>
        </div>

        {/* Quantifiable Outcomes */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.projects.quantifiableResults}</span>
          </h3>
          <ul className="space-y-2.5">
            {project.outcomes[lang].map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>{lang === 'ar' ? 'البنية التقنية المطبقة' : 'Implemented Technologies & Frameworks'}</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-right rtl:text-left">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'إغلاق دراسة الحالة' : 'Close Case Study'}
          </button>
        </div>
      </div>
    </div>
  );
};
