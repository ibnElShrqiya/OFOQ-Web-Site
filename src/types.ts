export type Language = 'en' | 'ar';

export type PageId = 
  | 'home' 
  | 'services' 
  | 'projects' 
  | 'library' 
  | 'about' 
  | 'reviews' 
  | 'assessment'  | 'contact' 
  | 'privacy' 
  | 'terms';

export interface ServiceItem {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  shortDescription: { en: string; ar: string };
  fullDescription: { en: string; ar: string };
  deliverables: { en: string[]; ar: string[] };
  technologies: string[];
  icon: string;
  stat: { en: string; ar: string };
  statLabel: { en: string; ar: string };
}

export interface ProjectItem {
  id: string;
  title: { en: string; ar: string };
  clientSector: { en: string; ar: string };
  region: { en: string; ar: string };
  year: string;
  summary: { en: string; ar: string };
  challenge: { en: string; ar: string };
  solution: { en: string; ar: string };
  outcomes: { en: string[]; ar: string[] };
  technologies: string[];
  verified: boolean;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorRole: { en: string; ar: string };
  company: string;
  sector: { en: string; ar: string };
  rating: number; // 1 to 5
  date: string;
  comment: { en: string; ar: string };
  verified: boolean;
  helpfulCount: number;
}

export interface FaqItem {
  id: string;
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
  category: 'general' | 'development' | 'process' | 'pricing';
}

export interface OfficeLocation {
  city: { en: string; ar: string };
  country: { en: string; ar: string };
  address: { en: string; ar: string };
  phone: string;
  email: string;
  hours: { en: string; ar: string };
  isHQ?: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceId: string;
  priority?: string;
  timeline?: string;
  message: string;
  createdAt: string;
}

export interface AssessmentQuestion {
  id: number;
  question: { en: string; ar: string };
  description: { en: string; ar: string };
  options: {
    label: { en: string; ar: string };
    score: number;
    recommendedAction: { en: string; ar: string };
  }[];
}
