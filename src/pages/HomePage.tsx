import React, { useMemo, useState } from 'react';
import { Language, PageId, ServiceItem, ProjectItem, ReviewItem } from '../types.ts';
import { translations } from '../data/translations.ts';
import { servicesData } from '../data/servicesData.ts';
import { projectsData } from '../data/projectsData.ts';
import { faqData } from '../data/faqData.ts';
import { calculateReviewStats } from '../data/storage.ts';
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight, CheckCircle2, Code2, Cpu, Globe2, Layers3, Palette, ShieldCheck, Star } from 'lucide-react';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAddReview: () => void;
  reviews: ReviewItem[];
}

const heroWords = {
  ar: { eyebrow: 'نفكر · نصمّم · نبني', first: 'نصنع', accent: 'المستقبل الرقمي', last: 'بفكر هندسي وهوية لا تشبه أحدًا.', body: 'أفق فريق تقني يبني مواقع ومنتجات رقمية وتجارب ذكية، من الفكرة الأولى حتى الإطلاق والنمو.' },
  en: { eyebrow: 'THINK · DESIGN · BUILD', first: 'We build', accent: 'digital futures', last: 'with clarity and intention.', body: 'OFOQ is a technology studio crafting digital products, modern websites and thoughtful software experiences.' }
};

const projectVisuals = [
  { title: 'منصات الويب', category: 'تطوير الويب', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85', tags: ['React', 'TypeScript', 'واجهات تفاعلية'] },
  { title: 'تطبيقات ذكية', category: 'تطبيقات الجوال', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85', tags: ['Flutter', 'Android', 'iOS'] },
  { title: 'حلول رقمية', category: 'هندسة البرمجيات', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85', tags: ['API', 'Cloud', 'Systems'] },
];
const projectFilters = ['الكل', 'تطوير الويب', 'تطبيقات الجوال', 'هندسة البرمجيات'];

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate, onSelectService, onSelectProject, onOpenAddReview, reviews }) => {
  const t = translations[lang];
  const copy = heroWords[lang];
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-01');
  const [activeFilter, setActiveFilter] = useState('الكل');
  const reviewStats = calculateReviewStats(reviews);
  const isArabic = lang === 'ar';
  const visuals = useMemo(() => projectVisuals.filter(p => activeFilter === 'الكل' || p.category === activeFilter), [activeFilter]);

  return (
    <div className="ofoq-home">
      <section className="ofoq-hero-stage">
        <div className="ofoq-hero-grid" aria-hidden="true"/>
        <div className="ofoq-hero-particles" aria-hidden="true"/>
        <div className="ofoq-hero-glow" aria-hidden="true"/>
        <div className="ofoq-hero-content">
          <div className="ofoq-hero-copy">
            <span className="ofoq-eyebrow"><i/> {copy.eyebrow}</span>
            <h1>{copy.first}<br/><span>{copy.accent}</span><br/>{copy.last}</h1>
            <p>{copy.body}</p>
            <div className="ofoq-hero-actions">
              <button className="ofoq-primary-button" onClick={() => onNavigate('contact')}>{isArabic ? 'ابدأ مشروعك' : 'Start a project'} <ArrowUpLeft size={17}/></button>
              <button className="ofoq-ghost-button" onClick={() => onNavigate('projects')}>{isArabic ? 'اكتشف أعمالنا' : 'Explore our work'} <ArrowUpRight size={16}/></button>
            </div>
          </div>
          <div className="ofoq-hero-art" aria-label={isArabic ? 'تجسيد بصري رقمي ثلاثي الأبعاد' : 'Abstract digital 3D visual'} role="img">
            <div className="ofoq-art-halo"/><div className="ofoq-art-ring ring-a"/><div className="ofoq-art-ring ring-b"/>
            <div className="ofoq-art-glass"><div className="ofoq-art-core"/></div>
            <div className="ofoq-art-orbit orbit-a"/><div className="ofoq-art-orbit orbit-b"/>
            <span className="ofoq-art-coordinate coordinate-a">24° 27' N / 54° 22' E</span>
            <span className="ofoq-art-coordinate coordinate-b">OFOQ / DIGITAL STUDIO</span>
          </div>
          <div className="ofoq-hero-bottom">
            <span>{isArabic ? 'فكرة واضحة. تنفيذ متقن. أثر يدوم.' : 'Clear thinking. Crafted execution. Lasting impact.'}</span>
            <button onClick={() => document.getElementById('ofoq-services')?.scrollIntoView({behavior:'smooth'})}>{isArabic ? 'اكتشف المزيد' : 'Discover more'} <ArrowDownLeft size={16}/></button>
          </div>
        </div>
      </section>

      <section className="ofoq-trust-strip" aria-label={isArabic ? 'التقنيات' : 'Technology stack'}>
        <span>{isArabic ? 'نبني باستخدام تقنيات موثوقة' : 'BUILT WITH MODERN TECHNOLOGY'}</span>
        <div><b>REACT</b><b>FLUTTER</b><b>TYPESCRIPT</b><b>NODE.JS</b><b>SUPABASE</b></div>
      </section>

      <section id="ofoq-services" className="ofoq-section ofoq-services-section">
        <div className="ofoq-section-heading">
          <div><span className="ofoq-section-kicker">{t.services.kicker}</span><h2>{t.services.title}</h2><p>{t.services.subtitle}</p></div>
          <button className="ofoq-text-link" onClick={() => onNavigate('services')}>{t.services.exploreAll}<ArrowUpLeft size={17}/></button>
        </div>
        <div className="ofoq-services-grid">
          {servicesData.slice(0,6).map((service, index) => (
            <button key={service.id} className="ofoq-service-card" onClick={() => onSelectService(service)}>
              <span className="ofoq-card-index">0{index+1}</span><span className="ofoq-card-icon">{[<Code2/>,<Layers3/>,<Cpu/>,<Globe2/>,<Palette/>,<ShieldCheck/>][index]}</span>
              <h3>{service.title[lang]}</h3><p>{service.shortDescription[lang]}</p><span className="ofoq-card-foot">{t.services.viewDetails}<ArrowUpLeft size={16}/></span>
            </button>
          ))}
        </div>
      </section>

      <section className="ofoq-projects-showcase">
        <div className="ofoq-projects-inner">
          <div className="ofoq-section-heading centered"><div><span className="ofoq-section-kicker">{isArabic ? 'مختارات من قدراتنا' : 'WHAT WE CREATE'}</span><h2>{isArabic ? 'أفكار تتحول إلى تجارب' : 'Ideas turned into experiences'}</h2><p>{isArabic ? 'نماذج بصرية لأنواع الحلول التي نصممها ونطورها.' : 'A visual look at the kinds of products and systems we build.'}</p></div></div>
          <div className="ofoq-project-filters" role="group" aria-label={isArabic ? 'تصفية المعرض' : 'Filter showcase'}>
            {projectFilters.map(filter => <button key={filter} className={activeFilter===filter?'selected':''} onClick={()=>setActiveFilter(filter)}>{isArabic?filter:({ 'الكل':'All','تطوير الويب':'Web','تطبيقات الجوال':'Mobile','هندسة البرمجيات':'Software'}[filter])}</button>)}
          </div>
          <div className="ofoq-project-grid">
            {visuals.map((project,index)=><article className="ofoq-project-card" key={project.title}>
              <div className="ofoq-project-image"><img src={project.image} alt={project.title} loading="lazy"/><span>{project.category}</span></div>
              <div className="ofoq-project-info"><h3>{project.title}</h3><div className="ofoq-project-tags">{project.tags.map(tag=><small key={tag}>{tag}</small>)}</div><button onClick={()=>onNavigate('projects')}>{isArabic?'استكشف حلولنا':'Explore solutions'} <ArrowUpLeft size={15}/></button></div>
            </article>)}
          </div>
          <div className="ofoq-projects-cta"><button className="ofoq-primary-button" onClick={()=>onNavigate('projects')}>{isArabic?'عرض صفحة الأعمال':'View portfolio'} <ArrowUpLeft size={17}/></button></div>
        </div>
      </section>

      <section className="ofoq-statement-section">
        <span className="ofoq-section-kicker">{isArabic ? 'فلسفتنا في العمل' : 'OUR APPROACH'}</span>
        <h2>{isArabic ? 'التقنية ليست غاية، بل وسيلة لصناعة شيء أفضل.' : 'Technology is not the destination. It is how we make something better.'}</h2>
        <p>{t.whyUs.subtitle}</p>
        <div className="ofoq-statement-line"/>
      </section>

      <section className="ofoq-section">
        <div className="ofoq-section-heading"><div><span className="ofoq-section-kicker">{t.workflow.kicker}</span><h2>{t.workflow.title}</h2><p>{t.workflow.subtitle}</p></div></div>
        <div className="ofoq-workflow-grid">{[1,2,3,4].map((n)=><article className="ofoq-workflow-card" key={n}><span>0{n}</span><h3>{t.workflow[`step${n}Title` as keyof typeof t.workflow]}</h3><p>{t.workflow[`step${n}Desc` as keyof typeof t.workflow]}</p></article>)}</div>
      </section>

      <section className="ofoq-reviews-band">
        <div className="ofoq-reviews-content"><div><span className="ofoq-section-kicker">{t.reviews.kicker}</span><h2>{t.reviews.title}</h2><p>{t.reviews.subtitle}</p></div>
          <div className="ofoq-review-score"><strong>{reviewStats.totalCount ? reviewStats.average.toFixed(1) : '—'}</strong><span>{reviewStats.totalCount} {isArabic?'تقييم منشور':'published reviews'}</span><div>{[...Array(5)].map((_,i)=><Star key={i} size={14} className={reviewStats.totalCount&&i<Math.round(reviewStats.average)?'filled':''}/>)}</div><button onClick={onOpenAddReview}>{t.reviews.submitReview}</button></div>
        </div>
        {reviews.length>0 && <div className="ofoq-review-list">{reviews.slice(0,2).map(review=><article key={review.id}><p>“{review.comment[lang]}”</p><b>{review.authorName}</b></article>)}</div>}
      </section>

      <section className="ofoq-final-cta"><span className="ofoq-section-kicker">{isArabic?'هل لديك فكرة؟':'HAVE AN IDEA?'}</span><h2>{isArabic?'لنبدأ ببناء شيء يستحق أن يُرى.':'Let’s build something worth seeing.'}</h2><button className="ofoq-primary-button" onClick={()=>onNavigate('contact')}>{t.nav.ctaAudit}<ArrowUpLeft size={17}/></button></section>
    </div>
  );
};
