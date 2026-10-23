import React, { useState } from 'react';
import { Language } from '../types.ts';
import JSZip from 'jszip';
import { X, Download, Server, Cloud, CheckCircle, FileCode } from 'lucide-react';

interface SourceCodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SourceCodeExportModal: React.FC<SourceCodeExportModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);

      // Attempt to download the complete pre-packaged repository zip
      const response = await fetch('/api/download-zip');
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `ofoq-software-platform-complete.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
        return;
      }
      throw new Error('Fallback to client generation');
    } catch {
      // Fallback: direct window navigation or local trigger
      window.location.href = '/ofoq-project.zip';
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0b1325] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:left-5 rtl:right-auto p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
          <FileCode className="w-4 h-4" />
          <span>PRODUCTION SOURCE CODE ARCHIVE & DEPLOYMENT</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {lang === 'ar' ? 'تحميل الشيفرة المصدرية الكاملة ودليل النشر' : 'Complete Source Code & Deployment Guide'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'تطبيق منصة أفق مبني وفق أعلى المعايير الهندسية والإنتاجية الجاهزة للنشر الفوري. يمكنك تحميل حزمة الشيفرة المصدرية الكاملة بصيغة ZIP مع إرشادات النشر السحابي.'
            : 'OFOQ is built with a modern full-stack architecture. Download the complete clean source package with Dockerfiles, Gemini AI endpoint configurations, and step-by-step cloud deployment guides.'}
        </p>

        {/* Deployment Options Matrix */}
        <div className="mt-6 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <Server className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white">
                {lang === 'ar' ? 'البناء المحلي والتشغيل (Node.js)' : 'Local Build & Run (Node.js 20+)'}
              </h4>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                npm install &amp;&amp; npm run dev
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <Cloud className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white">
                {lang === 'ar' ? 'النشر السحابي (Docker / Cloud Run / Vercel)' : 'Cloud & Container Deployment (Docker / Cloud Run)'}
              </h4>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                docker build -t ofoq-software . &amp;&amp; docker run -p 3000:3000 ofoq-software
              </p>
            </div>
          </div>
        </div>

        {/* Download Action */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-mono">
            Format: .ZIP · Includes Source &amp; Gemini Backend
          </span>

          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#070d19] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-950" />
                <span>{lang === 'ar' ? 'تم تجهيز وتحميل الملف بنجاح!' : 'Archive Downloaded Successfully!'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>
                  {downloading
                    ? (lang === 'ar' ? 'جاري ضغط الملفات...' : 'Packaging Code ZIP...')
                    : (lang === 'ar' ? 'تحميل الشيفرة المصدرية (.zip)' : 'Download Source Code (.zip)')}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
