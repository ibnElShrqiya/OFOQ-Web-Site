import React from 'react';
import { Language, PageId, ServiceItem } from '../types.ts';
import { translations } from '../data/translations.ts';
import { servicesData } from '../data/servicesData.ts';
import { CheckCircle2, ArrowRight, Code2 } from 'lucide-react';

interface ServicesPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onSelectService: (service: ServiceItem) => void;
  onInquireService: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  lang,
  onNavigate,
  onSelectService,
  onInquireService
}) => {
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          {t.services.kicker}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
          {t.services.title}
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          {t.services.subtitle}
        </p>
      </div>

      {/* Services List with Full Details */}
      <div className="space-y-12">
        {servicesData.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className="p-8 sm:p-10 rounded-3xl bg-[#091122] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Core Info & Deliverables */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 mb-2">
                    <span className="font-bold text-sm">0{idx + 1}.</span>
                    <span>{service.stat[lang]} {service.statLabel[lang]}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {service.title[lang]}
                  </h2>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {service.fullDescription[lang]}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>{t.services.keyDeliverables}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.deliverables[lang].map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-mono text-slate-500">{t.services.frameworks}:</span>
                  {service.technologies.map((tech, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Stat Card & Direct Action */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0b152b] border border-cyan-500/20 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="text-3xl font-extrabold font-mono text-cyan-400 tabular-nums">
                    {service.stat[lang]}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-1">
                    {service.statLabel[lang]}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                    {service.shortDescription[lang]}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => onInquireService(service.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    <span>{t.services.inquireService}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>

                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full py-2 px-3 text-center text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'عرض تفاصيل المواصفات الكاملة' : 'View Full Technical Scope'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#081020] border border-slate-800 text-center">
        <h3 className="text-xl font-bold text-white">
          {lang === 'ar' ? 'هل تمتلك متطلبات برمجية مخصصة أو فكرة مبتكرة؟' : 'Have Custom Engineering Requirements or an Ambitious Digital Product?'}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          {lang === 'ar'
            ? 'يتعاون كبار مهندسينا معكم لدراسة الفكرة، وتقدير حجم العمل، وبناء نموذج أولي يحقق أهدافكم.'
            : 'Our lead software architects and product designers will partner with you to outline the optimal tech stack and delivery roadmap.'}
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="mt-5 px-6 py-2.5 text-xs font-semibold text-[#070d19] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all cursor-pointer"
        >
          {t.nav.ctaAudit}
        </button>
      </div>

    </div>
  );
};
