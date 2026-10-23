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
      en: 'High-performance, accessible, and scalable web platforms built with React, Next.js, TypeScript, and resilient cloud architectures.',
      ar: 'بناء تطبيقات ويب فائقة السرعة والقابلية للتوسع باستخدام React و Next.js و TypeScript وأحدث المعايير البرمجية العالمية.'
    },
    fullDescription: {
      en: 'OFOQ’s web engineering team builds enterprise-grade web applications, responsive customer portals, and dynamic SaaS platforms. We prioritize sub-second load times, modular component architectures, clean code maintainability, and seamless API integrations that scale effortlessly from day one.',
      ar: 'يقوم مهندسو الويب في أفق بتطوير تطبيقات ويب بمستوى عالمي، وبوابات عملاء سريعة، ومنصات SaaS متقدمة. نركز على سرعة التحميل الفائقة، وهيكلة المكونات القابلة لإعادة الاستخدام، والشيفرات البرمجية النظيفة، والتكامل السلس مع واجهات البرمجة.'
    },
    deliverables: {
      en: [
        'Full-Stack Web App Development (React, Next.js, Node.js, TypeScript)',
        'Progressive Web Applications (PWAs) with Offline Caching',
        'Headless CMS & Custom High-Throughput Admin Dashboards',
        'Performance Optimization & Core Web Vitals Excellence (< 1s FCP)',
        'Enterprise Single Sign-On (SSO) & Role-Based Access Control',
        'End-to-End Automated Testing (Playwright, Jest, Vitest)'
      ],
      ar: [
        'تطوير متكامل لتطبيقات الويب (React و Next.js و Node.js و TypeScript)',
        'تطبيقات ويب تقدمية (PWA) تدعم العمل بدون اتصال بالإنترنت',
        'لوحات تحكم وإدارة محتوى مخصصة وفائقة السرعة',
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
      en: 'From consumer apps with millions of active users to specialized field operations tools, OFOQ engineers robust mobile products with offline-first synchronization, 60fps animations, biometric authentication, and frictionless mobile checkout experiences.',
      ar: 'سواء كنت تطلق تطبيقاً جماهيرياً يخدم ملايين المستخدمين أو تطبيقاً مؤسسياً داخلياً، يبتكر فريق أفق حلولاً محمولة تدعم العمل دون إنترنت، ومعدل إطارات سلس 60fps، ومصادقة حيوية، ودفعاً إلكترونياً آمناً.'
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
        'إشعارات فورية وخدمات الموقع في الخلفية بكفاءة عالية لا تستهلك البطارية',
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
      en: 'Human-centric user journeys, high-conversion visual design, interactive prototypes, and scalable multi-brand design systems.',
      ar: 'تصميم تجارب رقمية تتمحور حول الإنسان، ورحلات مستخدم عالية التحويل، ونظم تصميم متكاملة وقابلة للتوسع.'
    },
    fullDescription: {
      en: 'Exceptional software begins with deep user empathy. OFOQ’s product designers conduct user research, craft responsive wireframes, and construct comprehensive Figma design systems equipped with WCAG AA accessibility, interactive micro-states, and developer-ready design tokens.',
      ar: 'يبدأ التميز البرمجي بفهم عميق لاحتياجات المستخدمين. يجري مصممو أفق أبحاث المستخدمين، ونماذج التفاعل الأولية، ونظم تصميم متكاملة في Figma تلبي معايير الوصول العالمية وتسهل عمل المطورين.'
    },
    deliverables: {
      en: [
        'User Research, Persona Modeling & Competitive UX Audits',
        'Interactive Figma Clickable Prototypes & Usability Testing',
        'Comprehensive Component Design Systems & Typography Tokens',
        'Micro-Interactions, State Transitions & Fluid Animations',
        'Accessibility (WCAG 2.1 AA) Compliance Auditing',
        'Bilingual Arabic (RTL) & English (LTR) UI Engineering Alignment'
      ],
      ar: [
        'أبحاث وسلوكيات المستخدمين وتحليل تجربة المنافسين',
        'نماذج تفاعلية قابلة للاختبار السريع واختبارات قابلية الاستخدام',
        'بناء مكتبات ونظم تصميم متكاملة Component Libraries & Design Tokens',
        'تصميم الحركات والتفاعلات الدقيقة Micro-Interactions',
        'الامتثال لمعايير إمكانية الوصول العالمية للمحتوى (WCAG 2.1 AA)',
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
      en: 'Scalable distributed backends, resilient microservices, high-throughput APIs, and mission-critical business automation systems.',
      ar: 'بناء نظم خلفية موزعة، وخدمات مصغرة، وواجهات برمجية فائقة التحمل لتشغيل العمليات المؤسسية الحساسة.'
    },
    fullDescription: {
      en: 'When off-the-shelf software falls short, OFOQ engineers tailored software solutions engineered to handle complex business logic, concurrent data transactions, and legacy system modernization. Built with clean architecture, domain-driven design, and strict type safety.',
      ar: 'عندما تعجز الحلول الجاهزة عن تلبية متطلبات أعمالك، تصمم أفق برمجيات مخصصة للتعامل مع منطق الأعمال المعقد، وملايين العمليات المتزامنة، وتحديث الأنظمة القديمة مع الالتزام بمبادئ Clean Architecture و Domain-Driven Design.'
    },
    deliverables: {
      en: [
        'Distributed Backend Architecture (Go, Node.js, Python, Java)',
        'High-Performance RESTful & GraphQL API Ecosystems',
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
      en: 'Empowering digital products with modern LLM capabilities, predictive data workflows, intelligent search, and autonomous business processes.',
      ar: 'تضمين قدرات الذكاء الاصطناعي التوليدي ونماذج LLM المتطورة وأتمتة مسارات البيانات داخل منتجاتك الرقمية.'
    },
    fullDescription: {
      en: 'OFOQ bridges cutting-edge artificial intelligence with production web and mobile software. We integrate Google Gemini models, vector search databases, retrieval-augmented generation (RAG), and robotic workflow automation to deliver tangible business efficiency.',
      ar: 'يربط فريق أفق بين أحدث ابتكارات الذكاء الاصطناعي والتطبيقات البرمجية العملية. ندمج نماذج Google Gemini، وقواعد البيانات الموجهة Vector Search، وتقنيات البحث المعزز بالتوليد (RAG)، وأتمتة مسارات العمل لرفع كفاءة أعمالك.'
    },
    deliverables: {
      en: [
        'Gemini API & LLM Multi-Turn Integration & Custom Fine-Tuning',
        'Retrieval-Augmented Generation (RAG) Systems with Semantic Search',
        'Automated Document Processing & Natural Language Ingestion',
        'Intelligent Analytics Dashboards & Predictive Metrics',
        'Chatbot & Virtual Customer Assistant Engineering',
        'Workflow Orchestration (Temporal, Apache Airflow, n8n)'
      ],
      ar: [
        'تكامل نماذج Gemini والذكاء الاصطناعي التوليدي المتعدد المحادثات',
        'بناء أنظمة البحث الدلالي المعزز بالمعرفة المؤسسية (RAG)',
        'معالجة الوثائق واستخراج البيانات التلقائي باللغتين العربية والإنجليزية',
        'لوحات تحليلات ذكية ومؤشرات تنبؤية دقيقة',
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
      en: 'Automated CI/CD pipelines, container orchestration, zero-downtime deployments, and optimized multi-cloud infrastructure.',
      ar: 'أتمتة مسارات التطوير والنشر المستمر CI/CD، وإدارة الحاويات، والنشر البرمجي السلس بدون أي توقف في الخدمة.'
    },
    fullDescription: {
      en: 'Ship software rapidly with absolute confidence. OFOQ establishes modern DevOps automation spanning GitHub Actions, Kubernetes, Terraform Infrastructure as Code (IaC), automated testing gates, and 24/7 observability monitoring.',
      ar: 'أطلق تحديثاتك البرمجية بسرعة وثقة تامة. يبني فريق أفق مسارات أتمتة حديثة تشمل GitHub Actions، وحاويات Kubernetes، والبنية التحتية المكتوبة بالشيفرات Terraform، وأنظمة المراقبة الاستباقية لتشغيل سلس ومستدام.'
    },
    deliverables: {
      en: [
        'Automated CI/CD Pipelines (GitHub Actions, GitLab CI)',
        'Infrastructure as Code (IaC) via Terraform & Pulumi',
        'Kubernetes & Docker Container Orchestration & Autoscaling',
        'Multi-Cloud Strategy across AWS, Google Cloud, and Azure',
        'Observability, Distributed Tracing & Real-Time APM (Prometheus, Grafana)',
        'Zero-Downtime Blue/Green and Canary Deployment Strategies'
      ],
      ar: [
        'أتمتة مسارات النشر والتحديث البرمجي السريع عبر GitHub Actions',
        'بناء وإدارة البنية التحتية بالشيفرة (Terraform IaC)',
        'إدارة وتوزيع الحاويات والتوسع التلقائي عبر Kubernetes',
        'إدارة بيئات الاستضافة السحابية على AWS و Google Cloud و Azure',
        'مراقبة الأداء وتتبع تدفق البيانات في الوقت الفعلي (Observability)',
        'استراتيجيات النشر المتقدم (Blue/Green Deployments) دون انقطاع'
      ]
    },
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'Google Cloud', 'GitHub Actions'],
    icon: 'Terminal',
    stat: { en: 'CI/CD', ar: 'CI/CD' },
    statLabel: { en: 'Deployment automation', ar: 'أتمتة عمليات النشر' }
  }
];
