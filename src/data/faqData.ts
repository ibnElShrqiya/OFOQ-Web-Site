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
      en: 'We work in two-week Agile sprints with transparent, continuous communication. Each sprint begins with sprint planning and concludes with a live demonstration and interactive build review. Clients receive dedicated Slack/Teams communication channels, weekly progress debriefs, and direct access to our product managers and tech leads.',
      ar: 'نعمل وفق دورات تطوير رشيقة (Agile Sprints) مدتها أسبوعان، مع تواصل شفاف ومستمر. تبدأ كل دورة بالتخطيط وتنتهي بعرض عملي مباشر لما تم إنجازه. نخصص قنوات اتصال مباشرة مع مدراء المنتجات وقادة الفرق الهندسية مع تقارير أسبوعية مفصلة.'
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
      en: 'Our core stack includes modern web frameworks (React 19, Next.js, TypeScript, Tailwind CSS), mobile engineering (Flutter, React Native, native Swift for iOS, Kotlin for Android), scalable distributed backends (Node.js, Go, Python, FastAPI), and cloud infrastructure (AWS, Google Cloud, Docker, Kubernetes, PostgreSQL, Redis). We also specialize in Google Gemini and AI integrations.',
      ar: 'تشمل تقنياتنا الرئيسية أطر الويب الحديثة (React 19 و Next.js و TypeScript)، وتطبيقات الجوال (Flutter و React Native و Swift و Kotlin)، والأنظمة الخلفية السريعة (Node.js و Go و Python)، والبنية السحابية (AWS و Google Cloud و Docker و PostgreSQL و Redis)، بالإضافة إلى حلول وتكامل نماذج الذكاء الاصطناعي Google Gemini.'
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
      en: 'Ownership, third-party licenses, and source-code or design-file handover are agreed in writing for each project before work begins.',
      ar: 'تُحدد حقوق الملكية وتراخيص المكونات الخارجية وتسليم الشيفرات وملفات التصميم في الاتفاق المكتوب الخاص بكل مشروع قبل بدء العمل.'
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
      en: 'We offer two flexible models: (1) Fixed-Scope Milestone Delivery for well-defined MVPs and product launches, with clearly scheduled deliverables; and (2) Dedicated Agile Engineering Squads on a monthly retainer for companies scaling ongoing product development with flexible scope requirements.',
      ar: 'نقدم نموذجين مرنين: (1) نطاق محدد بمراحل تسليم واضحة (Milestone-based) للمنتجات ذات المتطلبات المحددة كإطلاق النسخ الأولية MVPs؛ و(2) فرق هندسية رشيقة مخصصة (Dedicated Squads) باشتراك شهري للشركات التي تتطلب تطويراً مستمراً وسريعاً لمنتجاتها.'
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
      en: 'Yes. Our product design team conducts discovery workshops, user story mapping, clickable interactive prototyping in Figma, and complete design system creation before writing a single line of production code, ensuring full alignment with your business vision and user needs.',
      ar: 'نعم بالتأكيد. يقوم فريق التصميم والمنتجات لدينا بعقد ورش عمل استكشافية، ورسم رحلات المستخدم، وبناء نماذج تفاعلية ونظم تصميم متكاملة في Figma قبل كتابة أي كود برمجي، لضمان تطابق التصميم التام مع أهدافكم الاستثمارية وتطلعات المستخدمين.'
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
      en: 'A focused, production-grade MVP typically takes 6 to 10 weeks from architectural discovery to public launch. This includes full UI/UX design, core functional frontend/backend development, testing, and deployment to cloud infrastructure.',
      ar: 'تستغرق النسخة التجريبية الأولى عالية الجودة (MVP) عادة ما بين 6 إلى 10 أسابيع من بداية التخطيط وحتى الإطلاق الفعلي، ويشمل ذلك تصميم تجربة وواجهة المستخدم، والبرمجة المتكاملة للواجهات والنظم الخلفية، والفحص الشامل، والنشر السحابي.'
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
      en: 'We architect production-ready AI pipelines including multi-turn conversational agents, intelligent semantic search (RAG), automated data extraction, and content generation using the official @google/genai SDK, ensuring fast response times, proper prompt engineering, and secure data handling.',
      ar: 'نصمم بنى ذكاء اصطناعي إنتاجية تشمل المساعدات الحوارية التفاعلية، والبحث الدلالي الذكي RAG، والمعالجة التلقائية للبيانات باستخدام مكتبة @google/genai الرسمية مع الالتزام بأسرع أوقات الاستجابة وحماية خصوصية بيانات العميل.'
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
      en: 'Yes. We provide comprehensive post-launch Service Level Agreements (SLAs) including 24/7 uptime monitoring, server health maintenance, bug fixes, dependency updates, and dedicated monthly sprint hours for feature expansion and product enhancements.',
      ar: 'نعم، نوفر عقود دعم وصيانة متكاملة (SLA) تشمل المراقبة المستمرة لجاهزية الخوادم، وحل المشكلات الفنية، وتحديث المكتبات، وتخصيص ساعات تطوير دورية لإضافة المزايا الجديدة ومواكبة نمو أعمالكم.'
    }
  }
];
