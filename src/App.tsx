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
import { ChatPage } from './pages/ChatPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPage } from './pages/PrivacyPage.tsx';
import { TermsPage } from './pages/TermsPage.tsx';
import { LibraryPage } from './pages/LibraryPage.tsx';
import { Sparkles, MessageSquare, MessageCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
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

  // Update HTML dir and lang attributes on language toggle
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
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

        {currentPage === 'chat' && (
          <ChatPage
            lang={lang}
            onNavigateContact={() => handleNavigate('contact')}
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

      {/* Floating AI Consultant Quick Trigger (Visible when not on chat page) */}
      {currentPage !== 'chat' && (
        <aside aria-label="AI Tech Consultant Quick Action" className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40">
          <button
            onClick={() => handleNavigate('chat')}
            className="group flex items-center gap-2.5 px-4 py-3 bg-[#0a152d]/95 hover:bg-[#0d1d3d] border border-cyan-500/40 hover:border-cyan-400 rounded-full shadow-[0_4px_18px_-8px_rgba(6,182,212,0.24)] text-xs font-semibold text-white transition-all cursor-pointer backdrop-blur"
            title={lang === 'ar' ? 'استشر مستشار أفق التقني الذكي' : 'Consult OFOQ Tech Architect AI'}
          >
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">
              {lang === 'ar' ? 'مساعد تقني بالذكاء الاصطناعي' : 'AI Technical Assistant'}
            </span>
          </button>
        </aside>
      )}

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
