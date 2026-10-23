import { ReviewItem } from '../types.ts';

// Production starts with no testimonials. Only reviews submitted through the API
// and approved by an administrator should be displayed publicly.
export const initialReviewsData: ReviewItem[] = [];
