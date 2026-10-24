import React from 'react';
import { Language, PageId } from '../types.ts';
import { translations } from '../data/translations.ts';
import { leadershipTeam, officeLocations } from '../data/companyData.ts';
import { Code2, Palette, Layers, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          {lang === 'ar' ? 'فريق أفق البرمجي' : 'About OFOQ'}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
          {lang === 'ar' ? 'عن فريق أفق' : 'About OFOQ'}
        </h1>
        <p className="mt-4 text-base text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'أفق فريق يعمل في مجال البرمجيات والمنتجات الرقمية. نناقش نطاق كل مشروع ومتطلباته قبل الاتفاق على الحل والجدول والتسليم.'
            : 'OFOQ works on software and digital products. We discuss each project’s requirements, scope, timeline, and handover before agreeing on an approach.'}
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Code2 className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'تنظيم الشيفرة' : 'Code Structure'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'يُحدد أسلوب تنظيم الشيفرة والتوثيق والفحوصات وفق احتياجات كل مشروع.'
              : 'Code structure, documentation, and testing are agreed according to each project’s needs.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Palette className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'تصميم الواجهات' : 'Interface Design'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'يمكن أن يشمل نطاق المشروع تصميم الواجهات ودعم العربية والإنجليزية حسب المتطلبات.'
              : 'Project scope can include interface design and Arabic or English support, as required.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Layers className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'متابعة التقدم' : 'Project Updates'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'يُتفق على طريقة التواصل ومواعيد تحديثات المشروع عند تحديد نطاق العمل.'
              : 'Communication channels and update frequency are agreed when the project scope is defined.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'التسليم' : 'Handover'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'تُناقش ترتيبات التسليم والملكية ضمن الاتفاق الخاص بالمشروع.'
              : 'Handover and ownership terms are discussed as part of each project agreement.'}
          </p>
        </div>
      </div>

      {/* Leadership & Engineering Team */}
      {leadershipTeam.length > 0 && (
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            {lang === 'ar' ? 'قادة الفرق الهندسية' : 'Engineering Leads'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            {lang === 'ar' ? 'خبراء يقودون الابتكار البرمجي' : 'Practitioners Directing Software Excellence'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipTeam.map((leader, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3"
            >
              <div>
                <h3 className="text-base font-bold text-white">{leader.name}</h3>
                <p className="text-xs text-cyan-400 font-medium mt-0.5">{leader.role[lang]}</p>
                <p className="text-[11px] font-mono text-slate-500 mt-1">{leader.credentials}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                {leader.bio[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>

      )}

      {/* Global & Regional Hubs */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#081020] border border-slate-800 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            {lang === 'ar' ? 'طريقة عملنا' : 'How We Work'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            {lang === 'ar' ? 'التواصل والعمل عن بُعد' : 'Remote communication'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officeLocations.map((office, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{office.city[lang]}</span>
              </div>
              <p className="text-xs text-slate-300">{office.address[lang]}</p>
              <div className="pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                <p className="text-cyan-400 font-semibold">{office.phone}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">{office.hours[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
