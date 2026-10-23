import React from 'react';
import { Language } from '../types.ts';
import { Shield, FileCheck, Code2 } from 'lucide-react';

interface TermsPageProps {
  lang: Language;
}

export const TermsPage: React.FC<TermsPageProps> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          {lang === 'ar' ? 'العقود والشروط' : 'Master Services Agreement'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          {lang === 'ar' ? 'شروط التعاقد وتطوير البرمجيات' : 'Enterprise Software Development Terms & IP Ownership'}
        </h1>
        <p className="mt-2 text-xs font-mono text-slate-400">
          {lang === 'ar' ? 'الإصدار المعتمد 2026 · أفق لهندسة البرمجيات والحلول الرقمية' : 'Standard Development Agreement Terms · OFOQ Technology Studio'}
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
        
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? '1. حقوق الملكية الفكرية وتسليم الملفات' : '1. Intellectual Property & Project Handover'}</span>
          </h2>
          <p>
            {lang === 'ar'
              ? 'تُحدد حقوق الملكية الفكرية للشيفرات والتصميمات والملفات وآلية تسليمها في الاتفاق المكتوب الخاص بكل مشروع، بما في ذلك أي مكونات أو تراخيص لطرف ثالث.'
              : 'Intellectual-property ownership, third-party components and licenses, and delivery of source code or design files are defined in the written agreement for each project.'}
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? '2. مراحل التطوير الرشيقة والاعتماد (Agile Sprints)' : '2. Agile Sprint Acceptance & Delivery Milestones'}</span>
          </h2>
          <p>
            {lang === 'ar'
              ? 'قد يتضمن المشروع دورات تطوير ومراجعة مرحلية إذا تم الاتفاق على ذلك في خطة العمل. تُحدد مواعيد التسليم ومعايير القبول والتعديلات في العرض أو العقد الخاص بالمشروع.'
              : 'A project may use iterative development and review milestones when agreed in its delivery plan. Timelines, acceptance criteria, and revisions are defined in the project proposal or contract.'}
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? '3. ضمان الجودة ودعم ما بعد الإطلاق (Warranty & SLA)' : '3. Code Quality Warranty & Post-Launch Support'}</span>
          </h2>
          <p>
            {lang === 'ar'
              ? 'تمنح أفق فترة ضمان تشغيلي مجاني لمدة 60 يوماً بعد الإطلاق لمعالجة أي أخطاء برمجية أو شوائب تقنية، مع خيارات عقود صيانة ودعم فني مستمرة وفق اتفاقيات مستوى خدمة (SLA) محددة.'
              : 'OFOQ provides a standard 60-day post-launch warranty covering any functional regressions or bug fixes, alongside dedicated monthly SLA maintenance options for long-term platform evolution.'}
          </p>
        </section>

      </div>
    </div>
  );
};
