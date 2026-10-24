import React, { useState } from 'react';
import { Language, PageId, ServiceItem, ProjectItem, ReviewItem } from '../types.ts';
import { translations } from '../data/translations.ts';
import { servicesData } from '../data/servicesData.ts';
import { projectsData } from '../data/projectsData.ts';
import { faqData } from '../data/faqData.ts';
import { calculateReviewStats } from '../data/storage.ts';
import { CyberVisual } from '../components/CyberVisual.tsx';
import { 
  ArrowRight, 
  ChevronDown, 
  Star, 
  CheckCircle2, 
  Layers,
  Code2,
  Cpu,
  Smartphone,
  Globe,
  Palette
} from 'lucide-react';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAddReview: () => void;
  reviews: ReviewItem[];
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onSelectService,
  onSelectProject,
  onOpenAddReview,
  reviews
}) => {
  const t = translations[lang];
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-01');
  const reviewStats = calculateReviewStats(reviews);

  return (
    <div className="space-y-20 md:space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Engineering Team Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{t.hero.teamStatus}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.15] text-balance">
                {t.hero.headlineStart}{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  {t.hero.headlineGradient}
                </span>{' '}
                {t.hero.headlineEnd}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-[0_4px_18px_-8px_rgba(6,182,212,0.24)] cursor-pointer"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => onNavigate('projects')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  {t.hero.secondaryCta}
                </button>
              </div>

            </div>

            {/* Right Column: Illustrative software architecture */}
            <div className="lg:col-span-5">
              <CyberVisual type="architecture" title={lang === 'ar' ? 'رسم توضيحي لبنية برمجية' : 'Illustrative software architecture'} />
            </div>

          </div>

        </div>
      </section>

      {/* 2. TECH STACK & TOOLS BAR */}
      <section className="border-y border-slate-800/80 bg-[#060a14] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
            {t.trust.label}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="py-2.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300">
              {t.trust.react}
            </div>
            <div className="py-2.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300">
              {t.trust.typescript}
            </div>
            <div className="py-2.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300">
              {t.trust.flutter}
            </div>
            <div className="py-2.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300">
              {t.trust.node}
            </div>
            <div className="py-2.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300">
              {t.trust.cloud}
            </div>
            <div className="py-2.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300">
              {t.trust.docker}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE (Bento-Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              {t.services.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1">
              {t.services.title}
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-2 leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            <span>{t.services.exploreAll}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#091122] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_6px_18px_-10px_rgba(6,182,212,0.16)]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 font-mono">
                  <span className="text-cyan-400 font-semibold">{service.stat[lang]} {service.statLabel[lang]}</span>
                  <span>{service.technologies[0]}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title[lang]}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {service.shortDescription[lang]}
                </p>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  <span>{t.services.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
                <span className="text-[11px] font-mono text-slate-500">
                  0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY VISIONARY CLIENTS CHOOSE OFOQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#081020] border border-cyan-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />

          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              {t.whyUs.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {t.whyUs.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {t.whyUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-cyan-400" />
                <span>{t.whyUs.point1Title}</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed pl-6 rtl:pr-6 rtl:pl-0">
                {t.whyUs.point1Desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>{t.whyUs.point2Title}</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed pl-6 rtl:pr-6 rtl:pl-0">
                {t.whyUs.point2Desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{t.whyUs.point3Title}</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed pl-6 rtl:pr-6 rtl:pl-0">
                {t.whyUs.point3Desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{t.whyUs.point4Title}</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed pl-6 rtl:pr-6 rtl:pl-0">
                {t.whyUs.point4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEVELOPMENT METHODOLOGY / WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            {t.workflow.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            {t.workflow.title}
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            {t.workflow.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-cyan-400">{t.workflow.step1Num}.</span>
            <h3 className="text-base font-bold text-white">{t.workflow.step1Title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.workflow.step1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-cyan-400">{t.workflow.step2Num}.</span>
            <h3 className="text-base font-bold text-white">{t.workflow.step2Title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.workflow.step2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-cyan-400">{t.workflow.step3Num}.</span>
            <h3 className="text-base font-bold text-white">{t.workflow.step3Title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.workflow.step3Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-3">
            <span className="text-2xl font-bold font-mono text-cyan-400">{t.workflow.step4Num}.</span>
            <h3 className="text-base font-bold text-white">{t.workflow.step4Title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.workflow.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* 6. FEATURED CASE STUDIES / PROJECTS */}
      {projectsData.length > 0 && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              {t.projects.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {t.projects.title}
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-2 leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            <span>{lang === 'ar' ? 'عرض كافة المشاريع البرمجية' : 'Explore All Projects'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.slice(0, 2).map((project) => (
            <div
              key={project.id}
              className="p-7 rounded-2xl bg-[#091122] border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-cyan-400 font-semibold">{project.clientSector[lang]}</span>
                  <span className="font-mono">{project.year}</span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {project.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.summary[lang]}
                </p>

                {/* Top outcome bullet */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{project.outcomes[lang][0]}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  <span>{t.projects.viewCase}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
                <span className="text-xs font-mono text-slate-500">{project.region[lang]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      )}

      {/* 8. CLIENT REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#081020] border border-slate-800">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                {t.reviews.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                {t.reviews.title}
              </h2>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                {t.reviews.subtitle}
              </p>
            </div>

            {/* Score Card */}
            <div className="flex w-full max-w-full flex-col items-start gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 lg:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
                  {reviewStats.totalCount ? reviewStats.average.toFixed(1) : '—'}
                </div>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${reviewStats.totalCount && i < Math.round(reviewStats.average) ? 'fill-cyan-400 text-cyan-400' : 'text-slate-600'}`} />
                  ))}
                </div>
              </div>
              <div className="border-l rtl:border-r rtl:border-l-0 border-slate-800 pl-4 rtl:pr-4 text-xs text-slate-400">
                <p className="font-semibold text-white">{t.reviews.overallRating}</p>
                <p className="mt-0.5 font-mono">{reviewStats.totalCount} {lang === 'ar' ? 'تقييم منشور' : 'published reviews'}</p>
              </div>
              <button
                onClick={onOpenAddReview}
                className="w-full px-4 py-2 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg hover:from-cyan-300 hover:to-cyan-200 transition-all cursor-pointer sm:w-auto"
              >
                {t.reviews.submitReview}
              </button>
            </div>
          </div>

          {/* Approved reviews only; no fabricated testimonials are used. */}
          {reviews.length === 0 && <p className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-400">{lang === 'ar' ? 'لا توجد تقييمات منشورة حتى الآن. يمكنك إرسال تقييم لمراجعته.' : 'No reviews have been published yet. You can submit one for review.'}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${reviewStats.totalCount && i < Math.round(reviewStats.average) ? 'fill-cyan-400 text-cyan-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{review.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{review.comment[lang]}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <p className="text-xs font-bold text-white">{review.authorName}</p>
                  <p className="text-[11px] text-cyan-400">{review.authorRole[lang]}</p>
                  <p className="text-[11px] text-slate-400">{review.company}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('reviews')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>{lang === 'ar' ? 'عرض جميع التقييمات والآراء' : 'View All Client Reviews'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. ENTERPRISE FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            {lang === 'ar' ? 'كل ما تحتاج لمعرفته حول التعاون مع أفق' : 'Everything You Need to Know About Working with OFOQ'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-[#091122] border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question[lang]}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                    {faq.answer[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL PROJECT INITIATION BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#0a1428] to-[#070d19] border border-cyan-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              {t.contact.kicker}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === 'ar' ? 'جاهز لتحويل فكرتك إلى منتج رقمي استثنائي؟' : 'Ready to Transform Your Vision Into High-Impact Software?'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.contact.subtitle}
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-[0_4px_16px_-8px_rgba(6,182,212,0.22)] cursor-pointer"
              >
                {t.hero.primaryCta}
              </button>
              
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
