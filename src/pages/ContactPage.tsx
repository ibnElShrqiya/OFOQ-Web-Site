import React, { useState } from 'react';
import { Language } from '../types.ts';
import { translations } from '../data/translations.ts';
import { servicesData } from '../data/servicesData.ts';
import { saveContactSubmission } from '../data/storage.ts';
import { 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Lock, 
  AlertCircle,
  MessageCircle
} from 'lucide-react';

interface ContactPageProps {
  lang: Language;
  initialServiceId?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  initialServiceId
}) => {
  const t = translations[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [serviceId, setServiceId] = useState(initialServiceId || servicesData[0].id);
  const [priority, setPriority] = useState<'routine' | 'elevated' | 'critical_soc'>('routine');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !company.trim() || !message.trim()) {
      setErrorMessage(t.contact.validationError);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please provide a valid corporate or work email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), company: company.trim(), phone: phone.trim(),
          serviceId, priority, message: message.trim(), subject: `${serviceId} inquiry`,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || (lang === 'ar' ? 'تعذر إرسال الرسالة. حاول لاحقًا.' : 'Unable to send your message. Please try again.'));
      // Keep a local copy for the existing on-device history, but the database is authoritative.
      saveContactSubmission({ name: name.trim(), email: email.trim(), company: company.trim(), phone: phone.trim(), serviceId, priority, message: message.trim() });
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : (lang === 'ar' ? 'حدث خطأ غير متوقع.' : 'An unexpected error occurred.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          {t.contact.kicker}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
          {t.contact.title}
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Intake Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#091122] border border-cyan-500/25 shadow-2xl">
            
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-400/50 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_4px_18px_-8px_rgba(6,182,212,0.22)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {t.contact.successText}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setCompany('');
                      setMessage('');
                    }}
                    className="px-5 py-2 text-xs font-medium text-slate-400 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'إرسال مشروع آخر' : 'Submit Another Project Brief'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-center gap-3 text-xs text-rose-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Timeline Selection Bar */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    {t.contact.priorityLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPriority('routine')}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-left rtl:text-right transition-colors cursor-pointer ${
                        priority === 'routine'
                          ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-white">1–3 Months</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Planning &amp; Roadmapping</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPriority('elevated')}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-left rtl:text-right transition-colors cursor-pointer ${
                        priority === 'elevated'
                          ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-white">2–4 Weeks</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Immediate Need</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPriority('critical_soc')}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-left rtl:text-right transition-colors cursor-pointer ${
                        priority === 'critical_soc'
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-cyan-300 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Ready to Start</span>
                      </div>
                      <div className="text-[10px] text-cyan-400/80 mt-0.5">Urgent Sprint Kickoff</div>
                    </button>
                  </div>
                </div>

                {/* Name & Corporate Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Abdullah Al-Zahrani"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t.contact.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. a.zahrani@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t.contact.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+20 1XX XXX XXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t.contact.companyLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Fintech Startup / Retail Brand"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Interest */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.contact.serviceLabel}
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.contact.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-[0_4px_16px_-8px_rgba(6,182,212,0.22)] cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.submitting}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 rtl:rotate-180" />
                        <span>{t.contact.submitBtn}</span>
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-500 font-mono">
                    Protected by Mutual Non-Disclosure Agreement (NDA)
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>

        {/* Right Column: Direct contact and confidentiality */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-900 border border-cyan-800/60 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <PhoneCall className="w-5 h-5 shrink-0" />
              <span>{lang === 'ar' ? 'تواصل مباشرة مع فريق أفق' : 'Contact the OFOQ team directly'}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'ar' ? 'اختر الطريقة الأنسب لك. يمكنك الاتصال بنا أو بدء محادثة واتساب مباشرة.' : 'Choose the way that works best for you. Call us or start a WhatsApp conversation.'}
            </p>
            <a href="tel:+201101774594" dir="ltr" className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/50 p-4 hover:border-cyan-500/60 transition-colors">
              <PhoneCall className="w-5 h-5 text-cyan-400 shrink-0" />
              <span className="flex-1">
                <span className="block text-xs text-slate-400">{lang === 'ar' ? 'اتصال محلي' : 'Local call'}</span>
                <span className="block mt-1 font-mono text-lg font-bold text-white">01101774594</span>
              </span>
            </a>
            <a href="https://wa.me/201101774594" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-[#062b16] hover:bg-[#4be184] transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{lang === 'ar' ? 'ابدأ محادثة واتساب' : 'Start a WhatsApp chat'}</span>
            </a>
            <p className="text-xs text-slate-500">{lang === 'ar' ? 'البريد الإلكتروني الرسمي سيُضاف بعد إنشائه.' : 'The official email will be added once it is created.'}</p>
          </div>

          {/* Confidentiality */}
          <div className="p-5 rounded-2xl bg-[#081020] border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{t.contact.pgpTitle}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">{t.contact.pgpText}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
