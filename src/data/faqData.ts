import { FaqItem } from '../types.ts';

export const faqData: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'process',
    question: {
      en: 'How does OFOQ work with clients during a software development project?',
      ar: 'كيف يتعاون فريق أفق مع العملاء أثناء مراحل تطوير المشاريع البرمجية؟'
    },
    answer: {
      en: 'Communication channels, update frequency, and review milestones are agreed for each project.',
      ar: 'يُتفق على قنوات التواصل ومواعيد التحديث ومراجعة التقدم لكل مشروع.'
    }
  },
  {
    id: 'faq-02',
    category: 'development',
    question: {
      en: 'What technologies and frameworks does OFOQ specialize in?',
      ar: 'ما هي أهم التقنيات وأطر العمل التي يتخصص فيها فريق أفق؟'
    },
    answer: {
      en: 'This website uses React, TypeScript, Vite, Express, Tailwind CSS, and Supabase. Technologies for other projects depend on their requirements and agreed scope.',
      ar: 'يستخدم هذا الموقع React وTypeScript وVite وExpress وTailwind CSS وSupabase. وتُختار التقنيات للمشاريع الأخرى وفق متطلباتها ونطاق العمل المتفق عليه.'
    }
  },
  {
    id: 'faq-03',
    category: 'general',
    question: {
      en: 'How are intellectual-property rights and source-code handover handled?',
      ar: 'كيف تُحدد حقوق الملكية الفكرية وتسليم الشيفرة المصدرية؟'
    },
    answer: {
      en: 'Ownership, third-party licenses, and source-code or design-file handover should be discussed and recorded in the project agreement.',
      ar: 'ينبغي مناقشة حقوق الملكية وتراخيص المكونات الخارجية وتسليم الملفات وتسجيلها في اتفاق المشروع.'
    }
  },
  {
    id: 'faq-04',
    category: 'pricing',
    question: {
      en: 'How are development engagements structured and estimated?',
      ar: 'كيف يتم تسعير وتقدير تكاليف مشاريع البرمجة والتطوير في أفق؟'
    },
    answer: {
      en: 'Pricing and delivery arrangements depend on the project requirements and are discussed after an initial review of the requested scope.',
      ar: 'تعتمد الأسعار وترتيبات التسليم على متطلبات المشروع، وتُناقش بعد مراجعة نطاق العمل المطلوب.'
    }
  },
  {
    id: 'faq-05',
    category: 'development',
    question: {
      en: 'Can OFOQ help us define our product roadmap and design the UI/UX from scratch?',
      ar: 'هل يمكن لفريق أفق مساعدتنا في تخطيط خارطة طريق المنتج وتصميم واجهات UI/UX من البداية؟'
    },
    answer: {
      en: 'Product discovery, interface design, and prototyping can be discussed as part of a project. The agreed scope determines which activities are included.',
      ar: 'يمكن مناقشة اكتشاف المنتج وتصميم الواجهات والنماذج الأولية ضمن المشروع. ويحدد نطاق العمل المتفق عليه الأنشطة المشمولة.'
    }
  },
  {
    id: 'faq-06',
    category: 'process',
    question: {
      en: 'How fast can OFOQ build and launch a Minimum Viable Product (MVP)?',
      ar: 'ما هي المدة المتوقعة التي يستغرقها فريق أفق لبناء وإطلاق منتج أولي تجريبي (MVP)؟'
    },
    answer: {
      en: 'MVP timelines vary with requirements, integrations, and available resources. We can discuss an estimate after reviewing the proposed scope.',
      ar: 'تختلف مدة تطوير النسخة الأولية حسب المتطلبات والتكاملات والموارد المتاحة. يمكن مناقشة تقدير زمني بعد مراجعة نطاق المشروع.'
    }
  },
  {
    id: 'faq-07',
    category: 'development',
    question: {
      en: 'How does OFOQ integrate modern AI features and Gemini models into applications?',
      ar: 'كيف يدمج فريق أفق قدرات الذكاء الاصطناعي ونماذج Gemini في التطبيقات؟'
    },
    answer: {
      en: 'AI features and integrations can be considered where they suit the project. Their scope, provider, and data-handling requirements should be agreed before implementation.',
      ar: 'يمكن مناقشة ميزات وتكاملات الذكاء الاصطناعي إذا ناسبت المشروع. وينبغي الاتفاق مسبقًا على نطاقها ومزود الخدمة ومتطلبات التعامل مع البيانات.'
    }
  },
  {
    id: 'faq-08',
    category: 'pricing',
    question: {
      en: 'Do you provide ongoing technical support, maintenance, and feature enhancements after launch?',
      ar: 'هل تقدمون الدعم الفني والصيانة والتطوير المستمر للمنتج بعد الإطلاق؟'
    },
    answer: {
      en: 'Support and maintenance arrangements, including response times and service levels, must be discussed and included in the project agreement if required.',
      ar: 'تُناقش ترتيبات الدعم والصيانة ومستويات الخدمة وأوقات الاستجابة، وتُدرج في اتفاق المشروع عند الحاجة.'
    }
  }
];
