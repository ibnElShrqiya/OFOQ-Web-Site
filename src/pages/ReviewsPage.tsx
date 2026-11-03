import React, { useState } from 'react';
import { Language, ReviewItem } from '../types.ts';
import { translations } from '../data/translations.ts';
import { calculateReviewStats } from '../data/storage.ts';
import { Filter, Plus, Quote, ShieldCheck, Sparkles, Star, ThumbsUp } from 'lucide-react';

interface ReviewsPageProps {
  lang: Language;
  reviews: ReviewItem[];
  onOpenAddReview: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ lang, reviews, onOpenAddReview }) => {
  const t = translations[lang];
  const isArabic = lang === 'ar';
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const stats = calculateReviewStats(reviews);
  const filteredReviews = reviews.filter(review => selectedRating === 'all' || review.rating === selectedRating);

  const handleHelpfulClick = (id: string, currentCount: number) => {
    setHelpfulMap(previous => ({ ...previous, [id]: (previous[id] ?? currentCount) + 1 }));
  };

  return (
    <main className="ofoq-page ofoq-reviews-page" dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="ofoq-reviews-hero">
        <div className="ofoq-reviews-heading">
          <span className="ofoq-reviews-kicker"><Sparkles size={15} />{t.reviews.kicker}</span>
          <h1>{t.reviews.title}</h1>
          <p>{t.reviews.subtitle}</p>
          <button className="ofoq-reviews-submit" onClick={onOpenAddReview}>
            <Plus size={17} /><span>{t.reviews.submitReview}</span>
          </button>
        </div>
        <div className="ofoq-reviews-score-card">
          <span className="ofoq-reviews-score-label">{t.reviews.overallRating}</span>
          <div className="ofoq-reviews-score">{stats.totalCount ? stats.average.toFixed(1) : '—'}</div>
          <div className="ofoq-reviews-stars" aria-label={isArabic ? `متوسط ${stats.average.toFixed(1)} من 5` : `Average ${stats.average.toFixed(1)} out of 5`}>
            {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} className={star <= Math.round(stats.average) ? 'is-filled' : ''} />)}
          </div>
          <p>{t.reviews.basedOn}</p>
          <strong>{stats.totalCount} {isArabic ? 'تقييم منشور' : 'published reviews'}</strong>
          <div className="ofoq-reviews-distribution" aria-label={isArabic ? 'توزيع التقييمات' : 'Rating distribution'}>
            {[5, 4, 3, 2, 1].map(star => {
              const count = stats.distribution[star as 1 | 2 | 3 | 4 | 5] || 0;
              const percent = stats.totalCount ? (count / stats.totalCount) * 100 : 0;
              return <div className="ofoq-reviews-distribution-row" key={star}>
                <span>{star}</span><Star size={12} className="is-filled"/><div><i style={{ width: `${percent}%` }}/></div><small>{count}</small>
              </div>;
            })}
          </div>
        </div>
        <div className="ofoq-reviews-orbit" aria-hidden="true"><span/><span/><span/></div>
      </section>

      <section className="ofoq-reviews-listing" aria-labelledby="ofoq-reviews-list-title">
        <div className="ofoq-reviews-toolbar">
          <div><span className="ofoq-reviews-kicker"><Quote size={14}/>{isArabic ? 'تجارب حقيقية' : 'REAL EXPERIENCES'}</span><h2 id="ofoq-reviews-list-title">{isArabic ? 'ما يقوله عملاؤنا' : 'What our clients say'}</h2></div>
          <div className="ofoq-reviews-filters" role="group" aria-label={t.reviews.filterRating}>
            <span><Filter size={14}/>{t.reviews.filterRating}</span>
            <button type="button" aria-pressed={selectedRating === 'all'} className={selectedRating === 'all' ? 'selected' : ''} onClick={() => setSelectedRating('all')}>{t.reviews.allRatings} <small>{stats.totalCount}</small></button>
            {[5, 4, 3, 2, 1].map(star => <button type="button" key={star} aria-pressed={selectedRating === star} className={selectedRating === star ? 'selected' : ''} onClick={() => setSelectedRating(star)}><Star size={13} className="is-filled"/>{star}<small>{stats.distribution[star as 1 | 2 | 3 | 4 | 5] || 0}</small></button>)}
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="ofoq-reviews-empty"><span><Quote size={24}/></span><h3>{isArabic ? (reviews.length ? 'لا توجد تقييمات بهذا التصنيف' : 'لا توجد تقييمات منشورة حتى الآن') : (reviews.length ? 'No reviews in this rating' : 'No published reviews yet')}</h3><p>{isArabic ? (reviews.length ? 'اختر تصنيفًا آخر لمشاهدة آراء العملاء.' : 'يمكنك إرسال تقييمك، وسيظهر هنا بعد مراجعته واعتماده.') : (reviews.length ? 'Choose another rating to see more feedback.' : 'Submit a review and it will appear after approval.')}</p></div>
        ) : (
          <div className="ofoq-reviews-grid">
            {filteredReviews.map((review, index) => {
              const currentHelpful = helpfulMap[review.id] ?? review.helpfulCount;
              return <article key={review.id} className="ofoq-review-card" style={{ animationDelay: `${Math.min(index, 7) * 65}ms` }}>
                <div className="ofoq-review-card-top"><span className="ofoq-review-quote"><Quote size={20}/></span><time>{review.date}</time></div>
                <div className="ofoq-review-card-stars" aria-label={isArabic ? `${review.rating} من 5 نجوم` : `${review.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={15} className={star <= review.rating ? 'is-filled' : ''}/>)}
                </div>
                <p className="ofoq-review-comment">“{review.comment[lang]}”</p>
                <div className="ofoq-review-author">
                  <div className="ofoq-review-avatar" aria-hidden="true">{review.authorName.trim().slice(0, 1)}</div>
                  <div className="ofoq-review-author-copy">
                    <strong>{review.authorName}{review.verified && <span className="ofoq-review-verified"><ShieldCheck size={13}/>{t.reviews.verifiedClient}</span>}</strong>
                    <span>{review.authorRole[lang]}</span><small>{review.company} · {review.sector[lang]}</small>
                  </div>
                  <button type="button" onClick={() => handleHelpfulClick(review.id, review.helpfulCount)} aria-label={isArabic ? 'علّم هذا التقييم بأنه مفيد' : 'Mark this review as helpful'} title={t.reviews.helpful}>
                    <ThumbsUp size={15}/><span>{currentHelpful}</span>
                  </button>
                </div>
              </article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
};
