import React, { useState } from 'react';
import { Language, PageId } from '../types.ts';
import { translations } from '../data/translations.ts';
import { OfoqLogo } from './OfoqLogo.tsx';
import { Menu, X, Globe, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenSourceModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
  onOpenSourceModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070d19]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single Brand Zone */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left rtl:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md cursor-pointer whitespace-nowrap shrink-0"
            aria-label="OFOQ Home"
          >
            <OfoqLogo lang={lang} size="md" />
          </button>

          {/* Zone 2: 4-6 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'home' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'services' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'projects' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => handleNavClick('library')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'library' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' ? 'المكتبة التقنية' : 'Tech Library'}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'about' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'reviews' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {t.nav.reviews}
            </button>
            <button
              onClick={() => handleNavClick('assessment')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'assessment' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {t.nav.assessment}
            </button>
            <button
              onClick={() => handleNavClick('chat')}
              className={`inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 cursor-pointer ${
                currentPage === 'chat' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.nav.chat}</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              title={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono">{lang === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-sm hover:shadow-[0_4px_16px_-8px_rgba(6,182,212,0.22)] cursor-pointer whitespace-nowrap shrink-0"
            >
              {t.nav.ctaAudit}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
              aria-label="Open mobile navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#070d19] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'home' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'services' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.nav.services}
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'projects' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.nav.projects}
          </button>
          <button
            onClick={() => handleNavClick('library')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'library' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {lang === 'ar' ? 'المكتبة التقنية' : 'Tech Library'}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'about' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'reviews' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.nav.reviews}
          </button>
          <button
            onClick={() => handleNavClick('assessment')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'assessment' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.nav.assessment}
          </button>
          <button
            onClick={() => handleNavClick('chat')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              currentPage === 'chat' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.nav.chat}</span>
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left rtl:text-right px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 'contact' ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.nav.contact}
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg cursor-pointer"
            >
              {t.nav.ctaAudit}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSourceModal();
              }}
              className="w-full py-2 px-3 text-center text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded-lg hover:border-cyan-500/50"
            >
              {t.nav.sourceCode} (.zip)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
