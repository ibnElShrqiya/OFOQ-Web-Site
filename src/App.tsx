import React, { useState, useEffect } from 'react';
import { Language, PageId, ServiceItem, ProjectItem, ReviewItem } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { ProjectDetailModal } from './components/ProjectDetailModal.tsx';
import { AddReviewModal } from './components/AddReviewModal.tsx';

import { HomePage } from './pages/HomePage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ProjectsPage } from './pages/ProjectsPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ReviewsPage } from './pages/ReviewsPage.tsx';
import { AssessmentPage } from './pages/AssessmentPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPage } from './pages/PrivacyPage.tsx';
import { TermsPage } from './pages/TermsPage.tsx';
import { LibraryPage } from './pages/LibraryPage.tsx';
import { MessageCircle } from 'lucide-react';

const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  services: '/services',
  projects: '/projects',
  library: '/library',
  about: '/about',
  reviews: '/reviews',
  assessment: '/assessment',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
};

const PAGE_BY_PATH = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page as PageId]),
) as Record<string, PageId>;

const getPageFromPath = (pathname: string): PageId => {
  const path = pathname.replace(/\/+$/, '') || '/';
  return PAGE_BY_PATH[path] ?? 'home';
};

const PAGE_LABELS: Record<PageId, { ar: string; en: string }> = {
  home: { ar: 'الرئيسية', en: 'Home' },
  services: { ar: 'خدماتنا', en: 'Services' },
  projects: { ar: 'مشاريعنا', en: 'Projects' },
  library: { ar: 'المكتبة', en: 'Library' },
  about: { ar: 'عن الفريق', en: 'About the team' },
  reviews: { ar: 'آراء العملاء', en: 'Client reviews' },
  assessment: { ar: 'تقييم التقنية', en: 'Technology assessment' },
  contact: { ar: 'تواصل معنا', en: 'Contact us' },
  privacy: { ar: 'سياسة الخصوصية', en: 'Privacy policy' },
  terms: { ar: 'الشروط والأحكام', en: 'Terms and conditions' },
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try { return localStorage.getItem('ofoq_language') === 'en' ? 'en' : 'ar'; }
    catch { return 'ar'; }
  });
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromPath(window.location.pathname));
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [contactServiceId, setContactServiceId] = useState<string | undefined>(undefined);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  // Load reviews on mount
  useEffect(() => {
    setReviews([]);
    fetch('/api/reviews')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Reviews unavailable')))
      .then(({ items }) => {
        if (Array.isArray(items)) setReviews(items.map((r: any) => ({
          id: r.id, authorName: r.display_name, authorRole: { en: '', ar: '' },
          company: r.company || '', sector: { en: '', ar: '' }, rating: r.rating,
          date: String(r.created_at).slice(0, 10), comment: { en: r.review_text, ar: r.review_text },
          verified: false, helpfulCount: 0,
        })));
      })
      .catch(() => setReviews([]));
  }, []);

  // Keep locale, route, and share metadata aligned with the current page.
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    const pageLabel = PAGE_LABELS[currentPage][lang];
    document.title = currentPage === 'home'
      ? (lang === 'ar' ? 'أُفُق | هندسة البرمجيات والأمن السيبراني' : 'OFOQ | Software Engineering & Cybersecurity')
      : (lang === 'ar' ? `${pageLabel} | أُفُق` : `${pageLabel} | OFOQ`);
    const description = lang === 'ar'
      ? `صفحة ${pageLabel} من موقع أُفُق لهندسة البرمجيات والأمن السيبراني.`
      : `${pageLabel} at OFOQ, a software engineering and cybersecurity team.`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    try { localStorage.setItem('ofoq_language', lang); } catch { /* Storage can be unavailable in private browsing. */ }
  }, [lang, currentPage]);

  useEffect(() => {
    const syncPageWithLocation = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      setSelectedService(null);
      setSelectedProject(null);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', syncPageWithLocation);
    return () => window.removeEventListener('popstate', syncPageWithLocation);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleNavigate = (page: PageId) => {
    const path = PAGE_PATHS[page];
    if (window.location.pathname !== path) window.history.pushState({ page }, '', path);
    setCurrentPage(page);
    setSelectedService(null);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquireService = (serviceId: string) => {
    setContactServiceId(serviceId);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070d19] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectService={setSelectedService}
            onSelectProject={setSelectedProject}
            onOpenAddReview={() => setIsAddReviewOpen(true)}
            reviews={reviews}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectService={setSelectedService}
            onInquireService={handleInquireService}
          />
        )}

        {currentPage === 'library' && <LibraryPage lang={lang} />}

        {currentPage === 'projects' && (
          <ProjectsPage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectProject={setSelectedProject}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'reviews' && (
          <ReviewsPage
            lang={lang}
            reviews={reviews}
            onOpenAddReview={() => setIsAddReviewOpen(true)}
          />
        )}

        {currentPage === 'assessment' && (
          <AssessmentPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            lang={lang}
            initialServiceId={contactServiceId}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage lang={lang} />
        )}

        {currentPage === 'terms' && (
          <TermsPage lang={lang} />
        )}
      </main>

      {/* Floating WhatsApp contact action */}
      <a
        href="https://wa.me/201101774594"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={lang === 'ar' ? 'تواصل مع OFOQ عبر واتساب' : 'Contact OFOQ on WhatsApp'}
        title={lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'}
        className="fixed bottom-24 right-5 rtl:right-auto rtl:left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-[#062b16] shadow-lg shadow-black/30 transition-transform hover:scale-105 hover:bg-[#4be184] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-64 rtl:sm:right-auto rtl:sm:left-64"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>

      {/* Enterprise Multi-Column Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modal Dialogs */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        lang={lang}
        onInquire={handleInquireService}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />

      <AddReviewModal
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        lang={lang}
      />

    </div>
  );
}
