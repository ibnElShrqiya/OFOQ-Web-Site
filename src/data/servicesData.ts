import { ServiceItem } from '../types.ts';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-engineering',
    slug: 'web-development-cloud-platforms',
    title: {
      en: 'Modern Web Applications & Cloud Platforms',
      ar: 'تطوير تطبيقات الويب والمنصات السحابية الحديثة'
    },
    shortDescription: {
      en: 'Web applications and cloud platforms scoped to each project's requirements.',
      ar: 'تطوير تطبيقات ويب وتقنيات سحابية وفق متطلبات ونطاق العمل المتفق عليه.'
    },
    fullDescription: {
      en: 'Web projects can include application interfaces, APIs, and integrations. Architecture and performance goals are defined for each project.',
      ar: 'قد تشمل مشاريع الويب واجهات التطبيقات وواجهات API والتكاملات. تُحدد البنية وأهداف الأداء لكل مشروع.'
    },
    deliverables: {
      en: [
        'Full-Stack Web App Development (React, Next.js, Node.js, TypeScript)',
        'Progressive Web Applications (PWAs) with Offline Caching',
        'Headless CMS & Custom High-Throughput Admin Dashboards',
        'Performance review and optimization based on agreed goals',
        'Enterprise Single Sign-On (SSO) & Role-Based Access Control',
        'End-to-End Automated Testing (Playwright, Jest, Vitest)'
      ],
      ar: [
        'تطوير متكامل لتطبيقات الويب (React و Next.js و Node.js و TypeScript)',
        'تطبيقات ويب تقدمية (PWA) تدعم العمل بدون اتصال بالإنترنت',
        'لوحات تحكم وإدارة محتوى حسب نطاق المشروع',
        'تحسين أداء المواقع ومؤشرات الويب الأساسية Core Web Vitals',
        'توحيد تسجيل الدخول وإدارة الصلاحيات المؤسسية الدقيقة',
        'أتمتة الفحوصات البرمجية الشاملة (Unit, Integration & E2E Testing)'
      ]
    },
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    icon: 'Globe',
    stat: { en: 'Performance', ar: 'الأداء' },
    statLabel: { en: 'Performance-focused engineering', ar: 'هندسة تراعي الأداء' }
  },
  {
    id: 'mobile-engineering',
    slug: 'mobile-app-development',
    title: {
      en: 'Native & Cross-Platform Mobile Applications',
      ar: 'تطوير تطبيقات الأجهزة المحمولة (iOS & Android)'
    },
    shortDescription: {
      en: 'Intuitive, fluid mobile experiences crafted for iOS and Android using Flutter, React Native, Swift, and Kotlin.',
      ar: 'تجارب مستخدم انسيابية وسريعة للأجهزة المحمولة مبنية باستخدام Flutter و React Native و Swift و Kotlin.'
    },
    fullDescription: {
      en: 'Mobile application features are selected according to platform, product requirements, and supported integrations.',
      ar: 'تُحدد ميزات تطبيقات الجوال وفق المنصة ومتطلبات المنتج والتكاملات المطلوبة.'
    },
    deliverables: {
      en: [
        'Cross-Platform Mobile Engineering (Flutter & React Native)',
        'Native iOS (Swift / SwiftUI) and Android (Kotlin / Jetpack Compose)',
        'Offline-First Data Synchronization & Local Caching Architecture',
        'In-App Payments, Apple Pay, Google Pay, and Subscription Engines',
        'Real-Time Push Notifications & Background Location Services',
        'App Store and Google Play Release Orchestration & Continuous Delivery'
      ],
      ar: [
        'تطوير تطبيقات متعددة المنصات عبر Flutter و React Native',
        'تطوير أصيل Native بنظامي Swift (iOS) و Kotlin (Android)',
        'بنية مزامنة البيانات والعمل دون اتصال بالإنترنت',
        'تكامل الدفع الإلكتروني Apple Pay و Google Pay والاشتراكات الدورية',
        'إشعارات أو خدمات موقع حسب الحاجة وموافقة المستخدم',
        'إدارة النشر والتحديثات على متاجر App Store و Google Play'
      ]
    },
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'SQLite'],
    icon: 'Smartphone',
    stat: { en: 'Cross-platform', ar: 'متعدد المنصات' },
    statLabel: { en: 'iOS and Android development', ar: 'تطوير iOS وAndroid' }
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design-systems',
    title: {
      en: 'UI/UX Design Systems & Digital Product Strategy',
      ar: 'تصميم تجربة وواجهة المستخدم وبناء نظم التصميم'
    },
    shortDescription: {
      en: 'User journeys, interface design, prototypes, and design systems as scoped for each project.',
      ar: 'تصميم تجارب رقمية تتمحور حول الإنسان، ورحلات مستخدم عالية التحويل، ونظم تصميم متكاملة وقابلة للتوسع.'
    },
    fullDescription: {
      en: 'Design work can include research, wireframes, prototypes, and design systems. Accessibility requirements are agreed for each project.',
      ar: 'قد يشمل التصميم أبحاث المستخدمين والنماذج الأولية ونظم التصميم. تُحدد متطلبات الوصول لكل مشروع.'
    },
    deliverables: {
      en: [
        'User Research, Persona Modeling & Competitive UX Audits',
        'Interactive Figma Clickable Prototypes & Usability Testing',
        'Comprehensive Component Design Systems & Typography Tokens',
        'Micro-Interactions, State Transitions & Fluid Animations',
        'Accessibility review against agreed requirements',
        'Bilingual Arabic (RTL) & English (LTR) UI Engineering Alignment'
      ],
      ar: [
        'أبحاث وسلوكيات المستخدمين وتحليل تجربة المنافسين',
        'نماذج تفاعلية قابلة للاختبار السريع واختبارات قابلية الاستخدام',
        'بناء مكتبات ونظم تصميم متكاملة Component Libraries & Design Tokens',
        'تصميم الحركات والتفاعلات الدقيقة Micro-Interactions',
        'مراجعة إمكانية الوصول وفق المتطلبات المتفق عليها',
        'تصميم متقن يدعم ثنائية الاتجاه: العربية (RTL) والإنجليزية (LTR)'
      ]
    },
    technologies: ['Figma', 'Design Tokens', 'Storybook', 'Framer Motion', 'Tailwind'],
    icon: 'Palette',
    stat: { en: 'User-focused', ar: 'يركز على المستخدم' },
    statLabel: { en: 'Research-led experience design', ar: 'تصميم مبني على فهم المستخدم' }
  },
  {
    id: 'custom-software',
    slug: 'custom-software-enterprise-solutions',
    title: {
      en: 'Custom Software & Enterprise Architecture',
      ar: 'هندسة البرمجيات المخصصة والأنظمة المؤسسية'
    },
    shortDescription: {
      en: 'Custom software and backend development scoped to project requirements.',
      ar: 'تطوير برمجيات مخصصة وأنظمة خلفية وفق متطلبات كل مشروع.'
    },
    fullDescription: {
      en: 'When off-the-shelf software falls short, OFOQ engineers tailored software solutions engineered to handle complex business logic, concurrent data transactions, and legacy system modernization. Built with clean architecture, domain-driven design, and strict type safety.',
      ar: 'عندما تعجز الحلول الجاهزة عن تلبية متطلبات أعمالك، تصمم أفق برمجيات مخصصة للتعامل مع منطق الأعمال المعقد، ومتطلبات المعالجة المتفق عليها، وتحديث الأنظمة القديمة مع الالتزام بمبادئ Clean Architecture و Domain-Driven Design.'
    },
    deliverables: {
      en: [
        'Distributed Backend Architecture (Go, Node.js, Python, Java)',
        'RESTful and GraphQL API development',
        'Event-Driven Microservices with Kafka and RabbitMQ',
        'Relational & NoSQL Database Modeling (PostgreSQL, MongoDB, Redis)',
        'Legacy Monolith Decomposition & Incremental Modernization',
        'Comprehensive Technical Documentation & API Specifications'
      ],
      ar: [
        'هندسة الأنظمة الخلفية الموزعة (Go و Node.js و Python)',
        'تصميم واجهات برمجية متطورة RESTful و GraphQL',
        'خدمات مصغرة موجهة بالأحداث (Kafka و RabbitMQ)',
        'تصميم وتحسين قواعد البيانات العلائقية وغير العلائقية (PostgreSQL و Redis)',
        'تفكيك الأنظمة القديمة الضخمة وإعادة كتابتها بشكل مرحلي آمن',
        'توثيق تقني ومعماري شامل لمطوري المنشأة'
      ]
    },
    technologies: ['Go', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    icon: 'Layers',
    stat: { en: 'Resilient', ar: 'مرن' },
    statLabel: { en: 'Reliability-oriented architecture', ar: 'بنية تراعي الاعتمادية' }
  },
  {
    id: 'automation-ai',
    slug: 'intelligent-automation-ai-solutions',
    title: {
      en: 'Intelligent Automation & AI Product Integration',
      ar: 'الأتمتة الذكية وتكامل منتجات الذكاء الاصطناعي'
    },
    shortDescription: {
      en: 'Integrating AI or automation features where appropriate to the project.',
      ar: 'إضافة ميزات الذكاء الاصطناعي أو الأتمتة عند ملاءمتها لمتطلبات المشروع.'
    },
    fullDescription: {
      en: 'AI and automation integrations can be considered when they fit the project requirements and available services.',
      ar: 'يمكن مناقشة تكاملات الذكاء الاصطناعي والأتمتة إذا كانت مناسبة لمتطلبات المشروع والخدمات المتاحة.'
    },
    deliverables: {
      en: [
        'Gemini API & LLM Multi-Turn Integration & Custom Fine-Tuning',
        'Retrieval-Augmented Generation (RAG) Systems with Semantic Search',
        'Automated Document Processing & Natural Language Ingestion',
        'Analytics dashboards, if included in the agreed scope',
        'Chatbot & Virtual Customer Assistant Engineering',
        'Workflow Orchestration (Temporal, Apache Airflow, n8n)'
      ],
      ar: [
        'تكامل نماذج Gemini والذكاء الاصطناعي التوليدي المتعدد المحادثات',
        'بناء أنظمة البحث الدلالي المعزز بالمعرفة المؤسسية (RAG)',
        'معالجة الوثائق واستخراج البيانات التلقائي باللغتين العربية والإنجليزية',
        'لوحات تحليلات وتقارير، إذا شملها نطاق العمل',
        'تطوير المساعدات الافتراضية الذكية للمستخدمين',
        'أتمتة العمليات المتكررة وسلاسل الربط الآلي'
      ]
    },
    technologies: ['Gemini API', 'LangChain', 'Python', 'Pinecone', 'Temporal', 'FastAPI'],
    icon: 'Cpu',
    stat: { en: 'Automated', ar: 'مؤتمت' },
    statLabel: { en: 'Workflow automation solutions', ar: 'حلول أتمتة سير العمل' }
  },
  {
    id: 'devops-cloud',
    slug: 'cloud-architecture-devops-ci-cd',
    title: {
      en: 'Cloud Architecture, DevOps & Code Excellence',
      ar: 'البنية السحابية وهندسة النشر المستمر (DevOps)'
    },
    shortDescription: {
      en: 'Deployment automation and infrastructure configuration based on project needs.',
      ar: 'أتمتة النشر وإعداد البنية وفق احتياجات المشروع.'
    },
    fullDescription: {
      en: 'Cloud and deployment work can include automation, infrastructure configuration, testing, and monitoring, depending on the project scope.',
      ar: 'قد تشمل أعمال النشر السحابي الأتمتة وإعداد البنية والاختبارات والمراقبة، وفق نطاق المشروع.'
    },
    deliverables: {
      en: [
        'Automated CI/CD Pipelines (GitHub Actions, GitLab CI)',
        'Infrastructure as Code (IaC) via Terraform & Pulumi',
        'Kubernetes & Docker Container Orchestration & Autoscaling',
        'Multi-Cloud Strategy across AWS, Google Cloud, and Azure',
        'Observability, Distributed Tracing & Real-Time APM (Prometheus, Grafana)',
        'Deployment strategies selected for the application'
      ],
      ar: [
        'أتمتة مسارات النشر والتحديث البرمجي السريع عبر GitHub Actions',
        'بناء وإدارة البنية التحتية بالشيفرة (Terraform IaC)',
        'إدارة وتوزيع الحاويات والتوسع التلقائي عبر Kubernetes',
        'إدارة بيئات الاستضافة السحابية على AWS و Google Cloud و Azure',
        'مراقبة الأداء وتتبع تدفق البيانات في الوقت الفعلي (Observability)',
        'استراتيجيات نشر تُختار حسب التطبيق'
      ]
    },
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'Google Cloud', 'GitHub Actions'],
    icon: 'Terminal',
    stat: { en: 'CI/CD', ar: 'CI/CD' },
    statLabel: { en: 'Deployment automation', ar: 'أتمتة عمليات النشر' }
  }
];
