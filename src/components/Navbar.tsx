import React, { useState } from 'react';
import { Language, PageId } from '../types.ts';
import { translations } from '../data/translations.ts';
import { OfoqLogo } from './OfoqLogo.tsx';
import { Menu, X, Globe, ArrowUpLeft } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, lang, onToggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];
  const links: { page: PageId; label: string }[] = [
    { page: 'home', label: t.nav.home },
    { page: 'about', label: t.nav.about },
    { page: 'services', label: t.nav.services },
    { page: 'projects', label: t.nav.projects },
    { page: 'library', label: lang === 'ar' ? 'المكتبة التقنية' : 'Tech Library' },
    { page: 'reviews', label: t.nav.reviews },
    { page: 'assessment', label: t.nav.assessment },
    { page: 'contact', label: t.nav.contact },
  ];
  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="ofoq-nav-shell sticky top-0 z-50 w-full">
      <div className="ofoq-nav-inner">
        <button onClick={() => handleNavClick('home')} className="ofoq-brand" aria-label="أفق - الرئيسية">
          <OfoqLogo lang={lang} size="md" />
        </button>
        <nav className="ofoq-desktop-nav" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
          {links.map(({ page, label }) => (
            <button key={page} onClick={() => handleNavClick(page)} className={currentPage === page ? 'active' : ''}>
              {label}
            </button>
          ))}
        </nav>
        <div className="ofoq-nav-actions">
          <button className="ofoq-language" onClick={onToggleLang} aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>
            <Globe size={15} /><span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </button>
          <button className="ofoq-nav-cta" onClick={() => handleNavClick('contact')}>
            <span>{lang === 'ar' ? 'ابدأ مشروعك' : 'Start a project'}</span><ArrowUpLeft size={16}/>
          </button>
          <button className="ofoq-mobile-toggle" onClick={() => setMobileMenuOpen(v => !v)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}>
            {mobileMenuOpen ? <X/> : <Menu/>}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="ofoq-mobile-nav" aria-label={lang === 'ar' ? 'القائمة' : 'Navigation'}>
          {links.map(({ page, label }) => <button key={page} onClick={() => handleNavClick(page)}>{label}</button>)}
          <button onClick={() => handleNavClick('reviews')}>{t.nav.reviews}</button>
          <button onClick={() => handleNavClick('assessment')}>{t.nav.assessment}</button>
        </nav>
      )}
    </header>
  );
};
