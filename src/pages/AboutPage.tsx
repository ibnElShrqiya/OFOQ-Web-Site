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
          {lang === 'ar' ? 'مهندسون ومصممون شغوفون بصناعة المستقبل الرقمي' : 'Software Engineers & Designers Building Digital Innovation'}
        </h1>
        <p className="mt-4 text-base text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'أفق هو فريق تقني متكامل يجمع بين خبرة هندسة البرمجيات المعقدة، والتصميم الإبداعي الانسيابي، وإدارة المنتجات الذكية. نعمل يداً بيد مع الشركات الناشئة الطموحة والمؤسسات الكبرى لتحويل الأفكار إلى منتجات رقمية عالمية المستوى تمتاز بالسرعة الفائقة، والتصميم الأخّاذ، والقابلية للتوسع.'
            : 'OFOQ is a dedicated multidisciplinary software engineering and product design team. We partner with ambitious startup founders and forward-thinking enterprises to architect, design, and engineer world-class digital products characterized by blistering speed, intuitive design, and scalable clean code.'}
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Code2 className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'براعة الشيفرة النظيفة' : 'Clean Code Craftsmanship'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'نكتب كوداً منظماً وموثقاً وخالياً من التعقيدات الزائدة، مع فحوصات آلية تضمن استقرار النظام وسهولة صيانته.'
              : 'Strict typing, modular components, automated tests, and domain-driven design ensuring painless long-term scalability.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Palette className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'تصميم يتمحور حول المستخدم' : 'Human-Centric UI/UX'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'نظم تصميم متكاملة في Figma تجمع بين جمال المظهر وسهولة الاستخدام وثنائية اللغة الحقيقية (العربية والإنجليزية).'
              : 'Deep user empathy, pixel-perfect design systems, and responsive bilingual RTL/LTR interfaces that convert.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Layers className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'تطوير رشيق كل أسبوعين' : 'Agile Sprint Velocity'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'تحديثات مستمرة وعروض توضيحية حية كل أسبوعين تمنحكم رؤية كاملة وشفافة لمراحل بناء منتجكم.'
              : 'Bi-weekly demo reviews, open Slack channels, and iterative sprint deliveries that eliminate surprises.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'اتفاق واضح على الملكية والتسليم' : 'Clear Ownership & Handover Terms'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'تُحدد حقوق الملكية الفكرية وتسليم الشيفرات والملفات في اتفاق مكتوب خاص بكل مشروع.'
              : 'Source-code handover and intellectual-property terms are agreed in writing for each project.'}
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
            {lang === 'ar' ? 'فريق رقمي متاح للتواصل من أي مكان' : 'A digital team ready to work with clients anywhere'}
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
