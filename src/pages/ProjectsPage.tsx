import React, { useState } from 'react';
import { Language, PageId, ProjectItem } from '../types.ts';
import { translations } from '../data/translations.ts';
import { projectsData } from '../data/projectsData.ts';
import { ShieldCheck, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  onNavigate,
  onSelectProject
}) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'fintech') return p.id.includes('bank') || p.id.includes('fintech');
    if (filter === 'healthcare') return p.id.includes('health');
    if (filter === 'utilities') return p.id.includes('grid') || p.id.includes('city');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          {t.projects.kicker}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
          {t.projects.title}
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          {t.projects.subtitle}
        </p>
      </div>

      {/* Filters are shown only when real portfolio entries exist. */}
      {projectsData.length > 0 && <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.projects.filterAll}
        </button>
        <button
          onClick={() => setFilter('fintech')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filter === 'fintech'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.projects.filterFintech}
        </button>
        <button
          onClick={() => setFilter('healthcare')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filter === 'healthcare'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.projects.filterHealthcare}
        </button>
        <button
          onClick={() => setFilter('utilities')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filter === 'utilities'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.projects.filterUtilities}
        </button>
      </div>}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#091122] p-8 sm:p-10 text-center space-y-3">
          <h2 className="text-xl font-bold text-white">{lang === 'ar' ? 'أعمالنا قيد الإضافة' : 'Portfolio coming soon'}</h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-400">
            {lang === 'ar' ? 'نعرض هنا المشاريع التي يمكننا مشاركتها بإذن أصحابها. تواصل معنا لمناقشة احتياجات مشروعك.' : 'We will publish client work here when it is approved for public display. Contact us to discuss your project requirements.'}
          </p>
          <button onClick={() => onNavigate('contact')} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
            {lang === 'ar' ? 'تواصل معنا' : 'Contact OFOQ'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      ) : <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-8 rounded-3xl bg-[#091122] border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="text-cyan-400 font-semibold">{project.clientSector[lang]}</span>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>{project.region[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight">
                {project.title[lang]}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {project.summary[lang]}
              </p>

              {/* Quantifiable Highlights */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.projects.quantifiableResults}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {project.outcomes[lang].slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                <span>{t.projects.viewCase}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                <span>Project overview</span>
              </div>
            </div>
          </div>
        ))}
      </div>}

    </div>
  );
};
