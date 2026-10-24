import React, { useState } from 'react';
import { Language } from '../types.ts';
import { translations } from '../data/translations.ts';
import { X, Star, CheckCircle, AlertCircle } from 'lucide-react';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const t = translations[lang];

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setError(lang === 'ar' ? 'يرجى تعبئة كافة الحقول المطلوبة' : 'Please fill in all required fields.');
      return;
    }

    if (comment.trim().length < 20) {
      setError(lang === 'ar' ? 'يرجى كتابة تقييم تفصيلي لا يقل عن 20 حرفاً' : 'Please provide a detailed comment of at least 20 characters.');
      return;
    }

    try {
      const response = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ display_name: name.trim(), company: company.trim(), rating, review_text: comment.trim() }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to submit review.');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : (lang === 'ar' ? 'تعذر إرسال التقييم.' : 'Unable to submit review.'));
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onClose();
      setSuccess(false);
      setName('');
      setCompany('');
      setComment('');
      setRating(5);
      setError('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0b1325] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:left-5 rtl:right-auto p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white tracking-tight">
          {t.reviews.writeReviewTitle}
        </h2>
        <p className="mt-1 text-xs text-slate-400 leading-relaxed">
          {t.reviews.writeReviewDesc}
        </p>

        {success ? (
          <div className="my-8 p-6 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto" />
            <p className="text-sm font-semibold text-white">{t.reviews.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/50 flex items-center gap-2 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Interactive Star Rating */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.reviews.ratingLabel}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 text-slate-600 hover:text-cyan-400 transition-colors cursor-pointer"
                    aria-label={`${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        (hoverRating !== null ? star <= hoverRating : star <= rating)
                          ? 'fill-cyan-400 text-cyan-400'
                          : 'fill-transparent text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 rtl:mr-2 text-xs font-mono text-cyan-400 font-semibold tabular-nums">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.reviews.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Khalid Al-Otaibi"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.reviews.companyLabel}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={lang === 'ar' ? 'اسم الشركة (اختياري)' : 'Company name (optional)'}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.reviews.commentLabel} *
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your feedback about the website or your experience with OFOQ..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md cursor-pointer"
              >
                {t.reviews.submitBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
