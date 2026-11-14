import { ReviewItem } from '../types.ts';

export function calculateReviewStats(reviews: ReviewItem[]) {
  if (reviews.length === 0) {
    return {
      average: 0,
      totalCount: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  for (const rev of reviews) {
    sum += rev.rating;
    const roundedRating = Math.min(5, Math.max(1, Math.round(rev.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[roundedRating] = (distribution[roundedRating] || 0) + 1;
  }

  const average = Number((sum / reviews.length).toFixed(1));

  return {
    average,
    totalCount: reviews.length,
    distribution
  };
}
