import React from 'react';
import { Language, PageId } from '../types.ts';
import { translations } from '../data/translations.ts';
import { OfoqLogo } from './OfoqLogo.tsx';
import { Sparkles, Code2, Download, PhoneCall, MessageCircle } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenSourceModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onOpenSourceModal
}) => {
  const t = translations[lang];

  return (
    <footer className="w-full bg-[#050913] border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Upper Footer: Strategic Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <OfoqLogo lang={lang} size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-3">
              {t.footer.tagline}
            </p>
            
            {/* Tech Stack Unboxed Metadata */}
            <div className="pt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500 font-mono">
              <span>React 19 &amp; Next.js</span>
              <span aria-hidden="true">·</span>
              <span>Flutter &amp; Native</span>
              <span aria-hidden="true">·</span>
              <span>TypeScript Strict</span>
              <span aria-hidden="true">·</span>
              <span>Go &amp; Node.js</span>
              <span aria-hidden="true">·</span>
              <span>Kubernetes &amp; AWS</span>
            </div>

            {/* Direct Contact */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-sm space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>{lang === 'ar' ? 'تواصل معنا مباشرة' : 'Contact us directly'}</span>
              </div>
              <a href="tel:+201101774594" dir="ltr" className="block text-white font-mono font-semibold tabular-nums hover:text-cyan-300 transition-colors">+20 110 177 4594</a>
              <a href="https://wa.me/201101774594" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-2 text-sm font-semibold text-[#55e58b] hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
                {lang === 'ar' ? 'راسلنا على واتساب' : 'Chat on WhatsApp'}
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-left rtl:text-right"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-left rtl:text-right"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-left rtl:text-right"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-left rtl:text-right"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-left rtl:text-right"
                >
                  {t.nav.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('chat'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-left rtl:text-right flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.nav.chat}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-left rtl:text-right"
                >
                  {t.nav.assessment}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {t.footer.services}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{lang === 'ar' ? 'تطبيقات الويب والمنصات السحابية' : 'Modern Web & Next.js Apps'}</li>
              <li>{lang === 'ar' ? 'تطبيقات الجوال (iOS & Android)' : 'Cross-Platform & Native Mobile'}</li>
              <li>{lang === 'ar' ? 'تصميم تجربة المستخدم ونظم التصميم' : 'UI/UX Design Systems (Figma)'}</li>
              <li>{lang === 'ar' ? 'هندسة البرمجيات المخصصة والمايكروسيرفس' : 'Custom Enterprise Microservices'}</li>
              <li>{lang === 'ar' ? 'أتمتة العمليات وتكامل الذكاء الاصطناعي' : 'Intelligent Automation & AI'}</li>
              <li>{lang === 'ar' ? 'البنية السحابية وأتمتة النشر DevOps' : 'Cloud Architecture & DevOps'}</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {lang === 'ar' ? 'تواصل معنا' : 'Get in touch'}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a href="tel:+201101774594" dir="ltr" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <PhoneCall className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>01101774594</span>
              </a>
              <a href="https://wa.me/201101774594" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#55e58b] transition-colors">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
              </a>
              <p className="text-xs text-slate-500 leading-relaxed">{lang === 'ar' ? 'البريد الإلكتروني الرسمي سيُضاف قريبًا.' : 'Official email coming soon.'}</p>
              <div className="pt-2">
                <button
                  onClick={onOpenSourceModal}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/60 border border-cyan-800/50 rounded transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.nav.sourceCode} (.zip)</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-slate-800/80 bg-[#04070f] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footer.copyright}</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => { onNavigate('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-slate-300 transition-colors"
            >
              {t.footer.privacy}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => { onNavigate('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-slate-300 transition-colors"
            >
              {t.footer.terms}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="font-mono text-slate-400">Clear Project Handover Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
