import { ReviewItem, ContactSubmission } from '../types.ts';
import { initialReviewsData } from './reviewsData.ts';

const REVIEWS_STORAGE_KEY = 'ofoq_user_reviews_v1';
const CONTACT_STORAGE_KEY = 'ofoq_contact_submissions_v1';

export function getStoredReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(initialReviewsData));
      return initialReviewsData;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialReviewsData;
  } catch (e) {
    console.error('Failed reading reviews from storage', e);
    return initialReviewsData;
  }
}

export function saveNewReview(review: Omit<ReviewItem, 'id' | 'date' | 'helpfulCount'>): ReviewItem {
  const current = getStoredReviews();
  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    date: new Date().toISOString().split('T')[0],
    helpfulCount: 0
  };

  const updated = [newReview, ...current];
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed writing review to storage', e);
  }
  return newReview;
}

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

export function saveContactSubmission(submission: Omit<ContactSubmission, 'id' | 'createdAt'>): ContactSubmission {
  const newSubmission: ContactSubmission = {
    ...submission,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(CONTACT_STORAGE_KEY);
    const existing: ContactSubmission[] = raw ? JSON.parse(raw) : [];
    existing.unshift(newSubmission);
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed saving contact submission', e);
  }

  return newSubmission;
}

export function getStoredContactSubmissions(): ContactSubmission[] {
  try {
    const raw = localStorage.getItem(CONTACT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
