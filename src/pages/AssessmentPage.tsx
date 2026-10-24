import React, { useState } from 'react';
import { Language, PageId } from '../types.ts';
import { translations } from '../data/translations.ts';
import { assessmentQuestions } from '../data/assessmentData.ts';
import { Activity, ShieldCheck, AlertTriangle, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

interface AssessmentPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  lang,
  onNavigate
}) => {
  const t = translations[lang];
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalQuestions = assessmentQuestions.length;
  const currentQ = assessmentQuestions[currentStep];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Compute Score & Level
  let totalScore = 0;
  const recommendations: { en: string; ar: string }[] = [];

  assessmentQuestions.forEach((q) => {
    const selectedIdx = selectedAnswers[q.id];
    if (selectedIdx !== undefined) {
      const opt = q.options[selectedIdx];
      totalScore += opt.score;
      recommendations.push(opt.recommendedAction);
    }
  });

  const getMaturityTier = (score: number) => {
    if (score >= 85) {
      return {
        tier: lang === 'ar' ? 'نتيجة ذاتية أعلى' : 'Higher self-reported score',
        desc: lang === 'ar'
          ? 'تعكس النتيجة إجاباتك على هذا الفحص المختصر فقط، ولا تمثل تدقيقًا أمنيًا.'
          : 'This score reflects your answers to this short self-check; it is not a security audit.',
        color: 'text-emerald-400',
        badgeColor: 'bg-emerald-950/50 border-emerald-500/40'
      };
    }
    if (score >= 60) {
      return {
        tier: lang === 'ar' ? 'مؤشرات تحتاج مراجعة' : 'Areas to review',
        desc: lang === 'ar'
          ? 'تعكس النتيجة إجاباتك على هذا الفحص المختصر فقط، ولا تمثل تدقيقًا أمنيًا.'
          : 'This score reflects your answers to this short self-check; it is not a security audit.',
        color: 'text-cyan-400',
        badgeColor: 'bg-cyan-950/50 border-cyan-500/40'
      };
    }
    return {
      tier: lang === 'ar' ? 'مؤشرات تحتاج مراجعة' : 'Areas to review',
      desc: lang === 'ar'
        ? 'تعكس النتيجة إجاباتك على هذا الفحص المختصر فقط، ولا تمثل تدقيقًا أمنيًا.'
        : 'This score reflects your answers to this short self-check; it is not a security audit.',
      color: 'text-rose-400',
      badgeColor: 'bg-rose-950/50 border-rose-500/40'
    };
  };

  const currentTier = getMaturityTier(totalScore);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center justify-center gap-1.5 mb-1">
          <Activity className="w-3.5 h-3.5" />
          <span>{t.assessment.kicker}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.assessment.title}
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          {t.assessment.subtitle}
        </p>
      </div>

      {!isCompleted ? (
        /* Questionnaire Box */
        <div className="p-4 sm:p-8 lg:p-10 rounded-3xl bg-[#091122] border border-cyan-500/25 shadow-2xl space-y-8">
          
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>
                {t.assessment.questionOf
                  .replace('{current}', String(currentStep + 1))
                  .replace('{total}', String(totalQuestions))}
              </span>
              <span className="text-cyan-400 font-semibold tabular-nums">
                {Math.round(((currentStep + 1) / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title & Description */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {currentQ.question[lang]}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {currentQ.description[lang]}
            </p>
          </div>

          {/* Radio Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full text-left rtl:text-right p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_-5px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-1 shrink-0 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#070d19]" />}
                  </div>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                    {option.label[lang]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
            >
              {t.assessment.prevBtn}
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>{currentStep === totalQuestions - 1 ? t.assessment.calculateBtn : t.assessment.nextBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

        </div>
      ) : (
        /* Results Report Box */
        <div className="p-4 sm:p-8 lg:p-10 rounded-3xl bg-[#091122] border border-cyan-500/30 shadow-2xl space-y-8 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {t.assessment.resultTitle}
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${currentTier.color}`}>
                {currentTier.tier}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                {currentTier.desc}
              </p>
            </div>

            {/* Score Wheel / Value */}
            <div className={`p-6 rounded-2xl border text-center shrink-0 ${currentTier.badgeColor}`}>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tabular-nums">
                {totalScore}
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">
                Score / 100
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{t.assessment.actionHeading}</span>
            </h3>

            <div className="space-y-3">
              {recommendations.map((action, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {action[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.assessment.restartBtn}</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md cursor-pointer"
            >
              <span>{t.assessment.scheduleConsultation}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
