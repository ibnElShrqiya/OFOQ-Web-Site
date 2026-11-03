import React from 'react';
import { ArrowUpLeft, ArrowUpRight, Binary, BookOpen, Boxes, Braces, Cpu, Database, Globe2, Layers3, LockKeyhole, Network, ShieldCheck, TerminalSquare } from 'lucide-react';
import { Language, PageId } from '../types.ts';

type Copy = { ar: string; en: string };
const label = (lang: Language, ar: string, en: string) => lang === 'ar' ? ar : en;

export const GlassObjectScene: React.FC<{lang: Language}> = ({lang}) => (
  <div className="ofoq-glass-scene" role="img" aria-label={label(lang,'تكوين زجاجي هندسي مضيء','Luminous glass geometric sculpture')}>
    <div className="glass-scene-aura"/><div className="glass-scene-floor"/>
    <div className="glass-scene-platform platform-back"/><div className="glass-scene-platform platform-front"/>
    <div className="glass-cube"><div className="glass-cube-face face-top"/><div className="glass-cube-face face-left"/><div className="glass-cube-face face-right"/><div className="glass-flower"><i/><i/><i/><i/><i/><i/></div></div>
    <div className="glass-scene-caption"><span>OFOQ / DIGITAL SYSTEMS</span><span>01 — 07</span></div>
  </div>
);

export const CompanyTimeline: React.FC<{lang: Language}> = ({lang}) => {
  const steps = [
    {n:'01', title:label(lang,'فهم الفكرة','Understand'), desc:label(lang,'نحدد الهدف والمستخدم ونطاق العمل قبل اختيار التقنية.','Define the goal, audience and scope before choosing the stack.'), icon:Globe2},
    {n:'02', title:label(lang,'رسم التجربة','Design'), desc:label(lang,'نحوّل المتطلبات إلى بنية واضحة وتجربة استخدام مدروسة.','Turn requirements into a clear architecture and considered experience.'), icon:Layers3},
    {n:'03', title:label(lang,'الهندسة والبناء','Engineer'), desc:label(lang,'نبني ونختبر ونراجع التفاصيل ضمن نطاق متفق عليه.','Build, test and review details against an agreed scope.'), icon:Braces},
    {n:'04', title:label(lang,'الإطلاق والتطوير','Deliver'), desc:label(lang,'نسلّم العمل ونوضح طريقة تشغيله وصيانته وتطويره.','Handover with clear operation, maintenance and evolution guidance.'), icon:Cpu},
  ];
  return <section className="ofoq-timeline-scene" aria-label={label(lang,'منهج العمل','Our process')}>
    <div className="timeline-visual"><div className="timeline-hourglass"><span/><span/><b/></div><div className="timeline-orbit orbit-one"/><div className="timeline-orbit orbit-two"/><div className="timeline-visual-caption">OUR PROCESS / OFOQ</div></div>
    <div className="timeline-content"><span className="scene-kicker">{label(lang,'منهجية العمل','HOW WE WORK')}</span><h2>{label(lang,'من الفكرة إلى منتج رقمي متقن','From first thought to a crafted digital product')}</h2><p>{label(lang,'مراحل واضحة تساعدنا على اتخاذ قرارات تقنية مناسبة، دون وعود جاهزة أو حلول أكبر من احتياج المشروع.','A considered process for making sound technical decisions without one-size-fits-all promises.')}</p>
      <div className="timeline-steps">{steps.map(s=>{const Icon=s.icon;return <article key={s.n}><span className="timeline-number">{s.n}</span><Icon size={19}/><div><h3>{s.title}</h3><p>{s.desc}</p></div></article>})}</div>
    </div>
  </section>;
};

export const PortfolioNodeMap: React.FC<{lang: Language; onNavigate:(page:PageId)=>void}> = ({lang,onNavigate}) => {
 const nodes = [
  {id:'services', title:label(lang,'الخدمات','SERVICES'), sub:'01 / CAPABILITIES', icon:Boxes, x:'50%', y:'18%', page:'services' as PageId},
  {id:'web', title:label(lang,'منصات الويب','WEB SYSTEMS'), sub:'02 / ENGINEERING', icon:TerminalSquare, x:'19%', y:'48%', page:'services' as PageId},
  {id:'mobile', title:label(lang,'تطبيقات الجوال','MOBILE'), sub:'03 / PRODUCTS', icon:Cpu, x:'81%', y:'48%', page:'services' as PageId},
  {id:'library', title:label(lang,'المكتبة التقنية','KNOWLEDGE'), sub:'04 / OPEN SOURCE', icon:BookOpen, x:'29%', y:'82%', page:'library' as PageId},
  {id:'contact', title:label(lang,'ابدأ مشروعًا','START A PROJECT'), sub:'05 / CONTACT', icon:ArrowUpLeft, x:'71%', y:'82%', page:'contact' as PageId},
 ];
 return <section className="ofoq-node-map" aria-label={label(lang,'خريطة أقسام أفق','OFOQ interactive navigation map')}>
   <div className="node-map-top"><span>OFOQ / INTERACTIVE INDEX</span><span>{label(lang,'اختر مسارًا للانتقال','SELECT A NODE TO EXPLORE')}</span></div>
   <svg className="node-map-lines" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true"><path d="M500 110 L190 270 L290 460 L500 280 L810 270 L710 460 L500 280 L500 110"/><path d="M190 270 L810 270 M290 460 L710 460"/></svg>
   <div className="node-map-core"><Network size={34}/><span>أُفُق</span><small>DIGITAL STUDIO</small></div>
   {nodes.map(n=>{const Icon=n.icon;return <button key={n.id} className="node-map-node" style={{left:n.x,top:n.y}} onClick={()=>onNavigate(n.page)}><span className="node-map-icon"><Icon size={20}/></span><b>{n.title}</b><small>{n.sub}</small></button>})}
   <div className="node-map-footer"><span>CONNECTED WORKFLOWS</span><span>RTL / ARABIC FIRST</span></div>
 </section>;
};

export const AnalyticsFrame: React.FC<{lang:Language; completed:number; total:number; score?:number}> = ({lang,completed,total,score}) => (
 <section className="ofoq-analytics-frame" aria-label={label(lang,'لوحة الفحص الذاتي','Self-assessment dashboard')}>
   <div className="analytics-rail"><div className="analytics-mark">◈</div><span><Globe2/></span><span><ShieldCheck/></span><span><Database/></span><span><LockKeyhole/></span></div>
   <div className="analytics-main"><div className="analytics-topline"><span>OFOQ / SECURITY REVIEW</span><span className="analytics-live"><i/>{label(lang,'فحص ذاتي','SELF CHECK')}</span></div>
    <div className="analytics-readouts"><article><small>{label(lang,'الإجابات المكتملة','COMPLETED ANSWERS')}</small><strong>{completed.toString().padStart(2,'0')}<em> / {total.toString().padStart(2,'0')}</em></strong></article><article><small>{label(lang,'حالة الفحص','ASSESSMENT STATE')}</small><strong>{completed===total?label(lang,'مكتمل','COMPLETE'):label(lang,'قيد التقدم','IN PROGRESS')}</strong></article><article><small>{label(lang,'النتيجة الحالية','CURRENT SCORE')}</small><strong>{score===undefined?'—':score}<em>{score===undefined?'': ' / 100'}</em></strong></article></div>
    <div className="analytics-panels"><div className="analytics-panel analytics-chart"><small>{label(lang,'مسار الإجابة','RESPONSE PATH')}</small><div className="analytics-chart-grid"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><span>{label(lang,'تتحدث المؤشرات مع إجاباتك','VISUALS UPDATE WITH YOUR ANSWERS')}</span></div><div className="analytics-panel analytics-radar"><div className="radar-ring"><span/><b/></div><small>{label(lang,'مراجعة منهجية','STRUCTURED REVIEW')}</small></div><div className="analytics-panel analytics-note"><ShieldCheck size={22}/><b>{label(lang,'تقييم إرشادي','GUIDANCE ONLY')}</b><p>{label(lang,'هذه أداة فحص ذاتي أولية وليست تدقيقًا أمنيًا أو قياسًا مباشرًا للتهديدات.','A preliminary self-check, not a security audit or live threat measurement.')}</p></div></div>
   </div>
 </section>
);

export const LibraryWorkspaceHeader: React.FC<{lang:Language}> = ({lang}) => (
 <div className="ofoq-library-workspace"><aside className="library-side-identity"><div className="library-emblem"><BookOpen/></div><b>OFOQ / ARCHIVE</b><p>{label(lang,'مساحة منظمة للمعرفة والأدوات والمراجع التقنية.','A structured space for tools, references and technical knowledge.')}</p><span>SYSTEM INDEX / 01</span></aside><div className="library-workspace-main"><div className="library-breadcrumb">WORKSPACE <b>›</b> OFOQ_LIBRARY_CORE</div><div className="library-workspace-heading"><div><small>{label(lang,'مركز الموارد','RESOURCE CENTER')}</small><h2>{label(lang,'استكشف المعرفة التقنية','Explore the technical archive')}</h2></div><span><i/> {label(lang,'محتوى منشور','PUBLISHED CONTENT')}</span></div><div className="library-commandbar"><span><BookOpen/>{label(lang,'الفهرس','INDEX')}</span><span><Binary/>{label(lang,'الأدوات','TOOLS')}</span><span><Code2Fallback/>{label(lang,'المشاريع المفتوحة','OPEN SOURCE')}</span><span><Database/>{label(lang,'قاعدة الموارد','RESOURCE DATABASE')}</span></div></div></div>
);
const Code2Fallback = Braces;
