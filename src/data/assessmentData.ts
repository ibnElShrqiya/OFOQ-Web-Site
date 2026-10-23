import { AssessmentQuestion } from '../types.ts';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    question: {
      en: 'What is your current web and frontend architecture stack and performance profile?',
      ar: 'ما هي البنية البرمجية الحالية لواجهات الويب وتجربة الأداء لديكم؟'
    },
    description: {
      en: 'Modern component-driven frontends directly determine conversion rates, SEO rankings, and user retention.',
      ar: 'تحدد بنية الواجهات البرمجية الحديثة سرعة التصفح وتصنيفات محركات البحث ومعدل تحويل الزوار إلى عملاء.'
    },
    options: [
      {
        label: {
          en: 'Modern React 19 / Next.js with TypeScript, sub-second First Contentful Paint, and automated design system',
          ar: 'أطر حديثة كـ React 19 / Next.js مع TypeScript، وسرعة تحميل تقل عن ثانية، ونظام تصميم موحد'
        },
        score: 25,
        recommendedAction: {
          en: 'Maintain high standards and incorporate Edge caching or Progressive Web App (PWA) capabilities.',
          ar: 'الاستمرار في هذا المستوى المتقدم وتوسيع المزايا لتشمل الحوسبة الطرفية Edge أو تطبيقات الويب التقدمية PWA.'
        }
      },
      {
        label: {
          en: 'Decent modern framework, but suffering from heavy bundles, inconsistent UI components, or 2–3s load delays',
          ar: 'استخدام أطر عمل مقبولة ولكن مع بطء في تحميل الصفحات (2-3 ثوانٍ) أو عدم اتساق في عناصر التصميم'
        },
        score: 15,
        recommendedAction: {
          en: 'Refactor client bundle with tree-shaking, server components, and establish a unified Figma design system.',
          ar: 'إعادة هيكلة حزم الكود واستخدام مكونات الخادم Server Components وتأسيس مكتبة تصميم موحدة في Figma.'
        }
      },
      {
        label: {
          en: 'Legacy monolithic templates (jQuery/WordPress/custom PHP) with high technical debt and poor mobile responsiveness',
          ar: 'قوالب تقليدية قديمة ذات ديون برمجية متراكمة وضعف في التجاوب مع شاشات الهواتف الذكية'
        },
        score: 5,
        recommendedAction: {
          en: 'Migrate to a modern headless web architecture with React/Next.js to unlock modern user experience and speed.',
          ar: 'الانتقال إلى بنية ويب حديثة تعتمد على React و Next.js لتحقيق سرعة فائقة وتجربة مستخدم عصرية.'
        }
      }
    ]
  },
  {
    id: 2,
    question: {
      en: 'What is your mobile application strategy and cross-platform capability?',
      ar: 'ما هي استراتيجيتكم البرمجية لتطبيقات الأجهزة المحمولة (iOS & Android)؟'
    },
    description: {
      en: 'Mobile represents over 70% of consumer digital interactions in the region.',
      ar: 'تمثل الهواتف الذكية أكثر من 70% من تفاعلات المستخدمين الرقمية في المنطقة.'
    },
    options: [
      {
        label: {
          en: 'Unified high-performance Flutter or React Native apps with native Swift/Kotlin modules and offline sync',
          ar: 'تطبيقات عالية الأداء عبر Flutter أو React Native تدعم العمل دون اتصال والمزامنة الفورية'
        },
        score: 25,
        recommendedAction: {
          en: 'Optimize in-app purchase funnels and integrate proactive mobile telemetry.',
          ar: 'تحسين مسارات الدفع داخل التطبيق وتضمين التحليلات اللحظية لسلوك المستخدمين.'
        }
      },
      {
        label: {
          en: 'Responsive website only, with plans to launch a mobile app but no active codebase yet',
          ar: 'موقع ويب متجاوب فقط، مع وجود رغبة في إطلاق تطبيق جوال دون البدء الفعلي في تطويره'
        },
        score: 12,
        recommendedAction: {
          en: 'Partner with OFOQ to design and launch an agile cross-platform MVP in under 8 weeks.',
          ar: 'التعاون مع فريق أفق لتصميم وإطلاق تطبيق جوال تجريبي عالي الجودة خلال أقل من 8 أسابيع.'
        }
      },
      {
        label: {
          en: 'Webview wrapper or outdated unmaintained mobile apps with frequent crashes and poor ratings',
          ar: 'تطبيق يعتمد على تضمين صفحات الويب (Webview) أو تطبيق قديم يعاني من بطء وتقييمات منخفضة'
        },
        score: 0,
        recommendedAction: {
          en: 'Re-engineer the mobile client with native-feel Flutter or React Native to restore brand credibility.',
          ar: 'إعادة بناء تطبيق الجوال من الصفر لتوفير تجربة انسيابية تليق بمكانة علامتكم التجارية.'
        }
      }
    ]
  },
  {
    id: 3,
    question: {
      en: 'How are your backend services, APIs, and database transactions structured for scalability?',
      ar: 'كيف تتم هندسة الخدمات الخلفية والواجهات البرمجية وقواعد البيانات لديكم؟'
    },
    description: {
      en: 'Resilient APIs and clean data architectures prevent crashes during high-traffic growth spikes.',
      ar: 'الواجهات البرمجية المتينة وقواعد البيانات المنظمة تمنع انهيار الأنظمة أثناء تضاعف أعداد الزوار.'
    },
    options: [
      {
        label: {
          en: 'High-throughput microservices or modular monolith (Go/Node.js) with Redis caching and sub-100ms API response',
          ar: 'خدمات مصغرة سريعة (Go/Node.js) مع تخزين مؤقت Redis وزمن استجابة للواجهات البرمجية يقل عن 100 ميلي ثانية'
        },
        score: 25,
        recommendedAction: {
          en: 'Implement event-driven streaming queues (Kafka/RabbitMQ) for asynchronous heavy workloads.',
          ar: 'تضمين طوابير معالجة البيانات غير المتزامنة (Kafka/RabbitMQ) للعمليات الحسابية الضخمة.'
        }
      },
      {
        label: {
          en: 'Single database with standard REST endpoints, but experiencing query bottlenecks during peak business hours',
          ar: 'قاعدة بيانات وحيدة مع واجهات REST اعتيادية، ولكن تواجه بطئاً واختناقات أثناء ساعات الذروة'
        },
        score: 12,
        recommendedAction: {
          en: 'Optimize database indexes, introduce read-replicas, and implement Redis distributed caching.',
          ar: 'تحسين فهارس قاعدة البيانات، وتوزيع استعلامات القراءة، وإضافة كاش سريع عبر Redis.'
        }
      },
      {
        label: {
          en: 'Direct database connections without clean API layers, or unoptimized shared hosting with frequent timeouts',
          ar: 'اتصال مباشر بقاعدة البيانات دون طبقة برمجية واقية، أو استضافة مشتركة تعاني من الانقطاع المتكرر'
        },
        score: 0,
        recommendedAction: {
          en: 'Architect a secure REST/GraphQL API layer with automated rate limiting and cloud containerization.',
          ar: 'بناء طبقة واجهات برمجية آمنة ومنظمة مع إدارة معدل الطلبات ونقل النظام لحاويات سحابية.'
        }
      }
    ]
  },
  {
    id: 4,
    question: {
      en: 'What is your deployment automation, CI/CD, and software release cycle velocity?',
      ar: 'ما هي درجة أتمتة عمليات النشر والاختبار ودورات إطلاق المزايا البرمجية الجديدة؟'
    },
    description: {
      en: 'Continuous delivery enables engineering teams to ship updates rapidly with zero customer downtime.',
      ar: 'الأتمتة تمكن الفرق البرمجية من إطلاق التحديثات والتحسينات بسرعة ودون أي توقف في الخدمة.'
    },
    options: [
      {
        label: {
          en: 'Automated CI/CD pipelines (GitHub Actions) with automated tests and zero-downtime cloud deployments',
          ar: 'مسارات أتمتة كاملة (GitHub Actions) مع اختبارات آلية ونشر سحابي فوري دون انقطاع'
        },
        score: 25,
        recommendedAction: {
          en: 'Incorporate automated canary releases and comprehensive distributed tracing.',
          ar: 'تفعيل استراتيجيات النشر التدريجي Canary Releases والمراقبة التوزيعية المتقدمة.'
        }
      },
      {
        label: {
          en: 'Semi-automated deployment scripts, but releases still require manual sanity checks and take several hours',
          ar: 'نشر شبه آلي ولكن إطلاق التحديثات ما زال يستغرق ساعات ويتطلب مراجعات يدوية مقلقة'
        },
        score: 12,
        recommendedAction: {
          en: 'Standardize Docker container builds and add automated integration test stages.',
          ar: 'توحيد بناء الحاويات Docker وأتمتة مراحل اختبار تكامل الشيفرات قبل النشر.'
        }
      },
      {
        label: {
          en: 'Manual code uploads via FTP/SSH directly to production servers with high risk of downtime and bugs',
          ar: 'رفع يدوي للملفات عبر FTP أو SSH مباشرة إلى خادم الإنتاج مع مخاطر عالية لحدوث أخطاء وتعطل الموقع'
        },
        score: 0,
        recommendedAction: {
          en: 'Establish modern Git workflow, automated CI/CD pipeline, and staged environments (Dev/Staging/Prod).',
          ar: 'بناء مسار عمل Git احترافي، وتفعيل النشر الآلي، وفصل بيئات التطوير والتجربة والإنتاج.'
        }
      }
    ]
  }
];
