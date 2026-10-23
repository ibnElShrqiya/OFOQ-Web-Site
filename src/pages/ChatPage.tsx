import React, { useState, useRef, useEffect } from 'react';
import { Language, ChatMessage } from '../types.ts';
import { translations } from '../data/translations.ts';
import { Send, Bot, User, Sparkles, Trash2, ArrowRight, Zap, Code2, ShieldAlert } from 'lucide-react';

interface ChatPageProps {
  lang: Language;
  onNavigateContact: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  lang,
  onNavigateContact
}) => {
  const t = translations[lang];

  const initialWelcomeMessage: ChatMessage = {
    id: 'welcome-0',
    role: 'assistant',
    content: lang === 'ar'
      ? 'مرحباً بك! أنا مستشار أفق التقني السريع (OFOQ Fast Tech Architect).\nأنا مخصص حصرياً للردود والاستشارات التقنية والبرمجية:\n• اختيار أطر العمل (React, Next.js, Flutter, Go, Python)\n• معمارية النظم وقواعد البيانات (PostgreSQL, Redis)\n• تقدير الجداول الزمنية للنسخ الأولية (MVP)\n• البنية السحابية وأتمتة النشر (DevOps & Docker)\n\nاطرح سؤالك التقني وسأجيبك فوراً وبأقصى سرعة!'
      : 'Hello! I am OFOQ’s Fast Tech Architect.\nI am strictly dedicated to technical & software engineering inquiries:\n• Framework & tech stack evaluation (React, Next.js, Flutter, Go, Python)\n• System design & database modeling (PostgreSQL, Redis)\n• Technical scoping & MVP timelines\n• Cloud infrastructure & DevOps (Docker, Kubernetes, CI/CD)\n\nAsk your technical question for an immediate, high-speed architectural analysis!',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          lang
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || (lang === 'ar' ? 'جاهز لأي استفسار تقني.' : 'Ready for any technical query.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply = lang === 'ar'
        ? 'عذراً، حدث تأخير في الاتصال. يرجى إعادة إرسال سؤالك التقني حول هندسة البرمجيات أو اختيار التقنيات وسأجيبك فوراً.'
        : 'Connection issue. Please re-send your technical software inquiry and I will answer immediately.';
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([initialWelcomeMessage]);
  };

  const samplePrompts = lang === 'ar' ? [
    'ما الفرق بين Flutter و React Native في أداء التطبيقات؟',
    'كيف نبني واجهات برمجية عالية التحمل بـ Go و PostgreSQL؟',
    'ما هي أفضل معمارية لتطبيق ويب يعتمد Next.js 15؟',
    'كيف نؤسس مسار نشر آلي CI/CD مع حاويات Docker؟'
  ] : [
    'Flutter vs React Native: Which should we pick for 60fps performance?',
    'How to design a scalable high-throughput API with Go and PostgreSQL?',
    'Best practices for Next.js 15 App Router & React 19 Server Components?',
    'How to architect automated CI/CD pipelines with Docker & Kubernetes?'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 font-semibold">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'ar' ? 'استجابة فائقة السرعة' : 'Ultra-Fast Response (Gemini 3.1 Flash-Lite)'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-300">
              <Code2 className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'ar' ? 'مخصص للاستشارات التقنية والبرمجية فقط' : 'Strictly Technical & Software Queries Only'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.chat.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            {lang === 'ar'
              ? 'مساعد هندسي فوري يجيبك عن أطر العمل، معمارية قواعد البيانات، تقدير الجداول الزمنية، ونظم البرمجيات.'
              : 'Instant engineering advisor answering framework choices, system architecture, database modeling, and technical scoping.'}
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.chat.clearChat}</span>
        </button>
      </div>

      {/* Suggested Quick Prompt Starters */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-slate-400 block">
          {lang === 'ar' ? 'اختر سؤالاً تقنياً سريعاً أو اكتب استفسارك بالأسفل:' : 'Quick technical prompt starters:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-xs text-slate-300 hover:text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-lg transition-all text-left rtl:text-right cursor-pointer"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread Container */}
      <div className="rounded-2xl bg-[#091122] border border-cyan-500/25 shadow-2xl overflow-hidden flex flex-col h-[560px]">
        
        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-800 text-cyan-300 border border-slate-700'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 font-medium rounded-tr-sm rtl:rounded-tr-2xl rtl:rounded-tl-sm'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm rtl:rounded-tl-2xl rtl:rounded-tr-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <span
                    className={`block text-[10px] mt-1.5 font-mono ${
                      isUser ? 'text-cyan-950/70 text-right rtl:text-left' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono">{lang === 'ar' ? 'جاري التحليل التقني الفوري...' : 'Processing technical response...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#070e1c] border-t border-slate-800/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={lang === 'ar' ? 'اطرح سؤالك البرمجي أو المعماري هنا (مخصص للاستفسارات التقنية فقط)...' : 'Ask your programming, architecture, or tech stack question (technical queries only)...'}
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-[#070d19] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <span>{t.chat.sendBtn}</span>
              <Send className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </form>

          <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-500 font-mono">
            <span>⚡ {lang === 'ar' ? 'استجابة فائقة السرعة بواسطة Gemini 3.1 Flash-Lite' : 'Powered by Ultra-Fast Gemini 3.1 Flash-Lite'}</span>
            <button
              onClick={onNavigateContact}
              className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 underline underline-offset-2 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'حجز جلسة استكشافية مع كبير المهندسين' : 'Schedule Discovery Call with Lead Architect'}</span>
              <ArrowRight className="w-3 h-3 rtl:rotate-180" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
