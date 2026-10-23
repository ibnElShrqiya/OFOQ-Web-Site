import React, { useState } from 'react';
import { Language, ReviewItem } from '../types.ts';
import { translations } from '../data/translations.ts';
import { calculateReviewStats } from '../data/storage.ts';
import { Star, ShieldCheck, ThumbsUp, Filter, Plus } from 'lucide-react';

interface ReviewsPageProps {
  lang: Language;
  reviews: ReviewItem[];
  onOpenAddReview: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  lang,
  reviews,
  onOpenAddReview
}) => {
  const t = translations[lang];
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});

  const stats = calculateReviewStats(reviews);

  const filteredReviews = reviews.filter((r) => {
    if (selectedRating === 'all') return true;
    return r.rating === selectedRating;
  });

  const handleHelpfulClick = (id: string, currentCount: number) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? currentCount) + 1
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            {t.reviews.kicker}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            {t.reviews.title}
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        <button
          onClick={onOpenAddReview}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.reviews.submitReview}</span>
        </button>
      </div>

      {/* Score Summary & Distribution Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091122] border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left: Big Score */}
        <div className="md:col-span-4 text-center md:text-left rtl:md:text-right border-b md:border-b-0 md:border-r rtl:md:border-l rtl:md:border-r-0 border-slate-800 pb-6 md:pb-0 md:pr-8 rtl:md:pl-8">
          <div className="text-5xl font-extrabold font-mono text-cyan-400 tabular-nums">
            {stats.totalCount ? stats.average.toFixed(1) : '—'}
          </div>
          <div className="flex items-center justify-center md:justify-start rtl:md:justify-end gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(stats.average) ? 'fill-cyan-400 text-cyan-400' : 'fill-transparent text-slate-700'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-400 font-medium">{t.reviews.basedOn}</p>
          <p className="text-xs font-mono text-cyan-300 mt-1">{stats.totalCount} {lang === 'ar' ? 'تقييم منشور' : 'published reviews'}</p>
        </div>

        {/* Right: Star Rating Distribution Histogram */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = stats.distribution[stars as 1|2|3|4|5] || 0;
            const percentage = stats.totalCount > 0 ? (count / stats.totalCount) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="w-12 shrink-0">{stars} {lang === 'ar' ? 'نجوم' : 'stars'}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right rtl:text-left tabular-nums text-slate-300">{count}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mr-2 rtl:ml-2">
          <Filter className="w-3.5 h-3.5" />
          <span>{t.reviews.filterRating}:</span>
        </span>
        <button
          onClick={() => setSelectedRating('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            selectedRating === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          {t.reviews.allRatings} ({stats.totalCount})
        </button>
        <button
          onClick={() => setSelectedRating(5)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            selectedRating === 5
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          5 {lang === 'ar' ? 'نجوم' : 'Stars'} ({stats.distribution[5] || 0})
        </button>
        <button
          onClick={() => setSelectedRating(4)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            selectedRating === 4
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          4 {lang === 'ar' ? 'نجوم' : 'Stars'} ({stats.distribution[4] || 0})
        </button>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#091122] p-8 sm:p-10 text-center space-y-3">
          <h2 className="text-xl font-bold text-white">{lang === 'ar' ? 'لا توجد تقييمات منشورة حتى الآن' : 'No published reviews yet'}</h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-400">
            {lang === 'ar' ? 'يمكنك إرسال تقييمك، وسيظهر بعد مراجعته واعتماده من الإدارة.' : 'You can submit a review. It will appear here after it has been reviewed and approved by the team.'}
          </p>
        </div>
      ) : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((review) => {
          const currentHelpful = helpfulMap[review.id] ?? review.helpfulCount;
          return (
            <div
              key={review.id}
              className="p-7 rounded-2xl bg-[#091122] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{review.date}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{review.comment[lang]}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">{review.authorName}</p>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-1.5 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cyan-400 mt-0.5">{review.authorRole[lang]}</p>
                  <p className="text-xs text-slate-400">{review.company} · {review.sector[lang]}</p>
                </div>

                <button
                  onClick={() => handleHelpfulClick(review.id, review.helpfulCount)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 rounded transition-colors cursor-pointer"
                  title="Mark review as helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="font-mono tabular-nums">{currentHelpful}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>}

    </div>
  );
};
