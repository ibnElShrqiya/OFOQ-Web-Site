import React from 'react';
import { Language } from '../types.ts';
import { ShieldCheck, Lock, FileText, Code2 } from 'lucide-react';

interface PrivacyPageProps {
  lang: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ lang }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          {lang === 'ar' ? 'الخصوصية والشفافية' : 'Client Privacy & Data Governance'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          {lang === 'ar' ? 'سياسة الخصوصية وسرية المشاريع البرمجية' : 'Privacy Policy & Source Code Confidentiality'}
        </h1>
        <p className="mt-2 text-xs font-mono text-slate-400">
          {lang === 'ar' ? 'سارية لعام 2026 · أفق لهندسة البرمجيات والحلول الرقمية' : 'Effective 2026 · OFOQ Software Engineering & Digital Products'}
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
        
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? '1. السرية المطلقة للأفكار والشيفرات البرمجية' : '1. Absolute Confidentiality of Source Code & IP'}</span>
          </h2>
          <p>
            {lang === 'ar'
              ? 'نتعامل مع معلومات التواصل وطلبات العملاء لغرض متابعة الاستفسارات وتقديم الخدمات المطلوبة. تُحدد السرية ومشاركة الملفات وحقوق الملكية الفكرية الخاصة بأي مشروع وفق الاتفاق المكتوب مع العميل، ولا تُعد هذه الصفحة بديلاً عن اتفاقية سرية أو عقد خدمات.'
              : 'We use contact information and project inquiries to follow up on requests and provide services. Confidentiality, file sharing, and intellectual-property terms for a specific project should be agreed in writing with the client; this page is not a substitute for a confidentiality agreement or services contract.'}
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? '2. التعامل مع بيانات الاختبار والتطوير' : '2. Staging & Development Data Governance'}</span>
          </h2>
          <p>
            {lang === 'ar'
              ? 'نستخدم البيانات التي يرسلها الزائر عبر نماذج التواصل والتقييم لتلقي الطلبات ومراجعتها والرد عليها. تُحفظ رسائل التواصل والتقييمات في قاعدة البيانات عند تهيئة الخدمة، ولا تظهر التقييمات للعامة إلا بعد مراجعتها واعتمادها. لا ترسل معلومات حساسة أو كلمات مرور عبر نماذج التواصل.'
              : 'Information submitted through contact and review forms is used to receive, review, and respond to requests. Contact messages and reviews are stored in the database when the service is configured; reviews are not shown publicly until approved. Please do not submit sensitive information or passwords through contact forms.'}
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? '3. عدم مشاركة أو بيع أي بيانات تجارية' : '3. Zero Third-Party Monetization'}</span>
          </h2>
          <p>
            {lang === 'ar'
              ? 'لا نبيع بيانات التواصل التي يرسلها الزوار. وقد تتم معالجة البيانات من خلال مزود الاستضافة وقاعدة البيانات اللازمة لتشغيل الموقع.'
              : 'We do not sell visitor contact details. Data may be processed by the hosting and database providers required to operate this website.'}
          </p>
        </section>

      </div>
    </div>
  );
};
