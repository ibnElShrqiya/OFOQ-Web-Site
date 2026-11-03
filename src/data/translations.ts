import { Language } from '../types.ts';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      about: 'About Team',
      reviews: 'Reviews',
      assessment: 'Stack Evaluator',
      contact: 'Contact Us',
      ctaAudit: 'Start Your Project',
      ctaEmergency: 'Talk to an Engineer',
      sourceCode: 'Download Source Code'
    },
    hero: {
      badge: 'Software Engineering & Digital Product Studio',
      headlineStart: 'Software for your next idea',
      headlineGradient: 'Built with care',
      headlineEnd: '',
      subtitle: 'OFOQ works on software and digital products. Share your requirements with us to discuss a suitable scope.',
      primaryCta: 'Start Your Project',
      secondaryCta: 'Explore Our Work',
      teamStatus: 'Discuss a project with OFOQ',
      kpi1Value: 'Reliable',
      kpi1Label: 'Reliability-focused engineering',
      kpi2Value: 'Fast',
      kpi2Label: 'Performance-conscious delivery',
      kpi3Value: 'Clear',
      kpi3Label: 'Project handover terms agreed in writing',
      kpi4Value: 'Custom',
      kpi4Label: 'Web and mobile product development'
    },
    trust: {
      label: 'Technologies used in this website',
      react: 'React',
      typescript: 'TypeScript',
      flutter: 'Vite',
      node: 'Express',
      cloud: 'Supabase',
      docker: 'Tailwind CSS'
    },
    services: {
      kicker: 'Our Capabilities',
      title: 'Full-Cycle Software Engineering & Product Design',
      subtitle: 'Discuss your requirements with us. Project scope, deliverables, and timeline are agreed before work begins.',
      viewDetails: 'View Technical Scope',
      exploreAll: 'Explore All 6 Engineering Disciplines',
      keyDeliverables: 'Possible project scope',
      frameworks: 'Example technologies (selected per project)',
      inquireService: 'Inquire About This Service'
    },
    whyUs: {
      kicker: 'The OFOQ Difference',
      title: 'How we approach projects',
      subtitle: 'We discuss requirements, priorities, and constraints before proposing an approach.',
      point1Title: 'Understand the requirements',
      point1Desc: 'Project goals and user needs help shape the proposed solution.',
      point2Title: 'Implementation choices',
      point2Desc: 'Architecture, documentation, and testing are selected according to the project scope.',
      point3Title: 'Project communication',
      point3Desc: 'Update frequency and review milestones are agreed with each project.',
      point4Title: 'Technology selection',
      point4Desc: 'The tools and frameworks depend on the requirements, existing systems, and agreed scope.'
    },
    workflow: {
      kicker: 'Development Lifecycle',
      title: 'A possible project workflow',
      subtitle: 'The project plan and milestones are agreed after requirements are discussed.',
      step1Num: '01',
      step1Title: 'Discovery & Product Architecture',
      step1Desc: 'Discuss project goals, users, constraints, and priorities.',
      step2Num: '02',
      step2Title: 'UI/UX Design Systems & Prototyping',
      step2Desc: 'Agree on interface requirements and prepare designs or prototypes when needed.',
      step3Num: '03',
      step3Title: 'Full-Stack Agile Development',
      step3Desc: 'Implement the agreed features and review progress at planned milestones.',
      step4Num: '04',
      step4Title: 'Cloud Deployment, QA & Scale',
      step4Desc: 'Agree on testing, deployment, documentation, and handover requirements.'
    },
    projects: {
      kicker: 'Featured Work',
      title: 'Digital Products Engineered for High-Growth Impact',
      subtitle: 'Projects will be listed here when they are approved for public display.',
      viewCase: 'View Project Details',
      filterAll: 'All Categories',
      filterFintech: 'Fintech & Banking',
      filterHealthcare: 'Healthcare & Portals',
      filterUtilities: 'Logistics & Operations',
      challenge: 'The Challenge',
      solution: 'OFOQ Engineering Solution',
      quantifiableResults: 'Quantifiable Outcomes'
    },
    reviews: {
      kicker: 'Client Feedback',
      title: 'Customer feedback',
      subtitle: 'Reviews submitted by visitors and approved for publication.',
      overallRating: 'Overall Client Rating',
      basedOn: 'Based on published reviews',
      submitReview: 'Submit Client Review',
      filterRating: 'Filter by Rating',
      allRatings: 'All Reviews',
      verifiedClient: 'Published review',
      helpful: 'Helpful',
      writeReviewTitle: 'Submit a Review for OFOQ',
      writeReviewDesc: 'We value transparent, authentic feedback from our client partners.',
      nameLabel: 'Your Full Name',
      roleLabel: 'Your Title / Role',
      companyLabel: 'Organization / Startup Name',
      sectorLabel: 'Industry Sector',
      ratingLabel: 'Overall Rating (1 to 5 Stars)',
      commentLabel: 'Detailed Feedback / Experience Working with OFOQ',
      submitBtn: 'Submit Review',
      successMessage: 'Thank you! Your review was submitted and is awaiting approval.'
    },
    assessment: {
      kicker: 'Interactive Evaluator',
      title: 'Software Architecture & Tech Stack Diagnostic',
      subtitle: 'Use this short self-check to review your answers. It is not a professional security or architecture audit.',
      questionOf: 'Question {current} of {total}',
      nextBtn: 'Next Question',
      prevBtn: 'Previous Question',
      calculateBtn: 'Calculate Architecture Score',
      restartBtn: 'Start New Evaluation',
      resultTitle: 'Product Architecture Maturity Level',
      scoreLabel: 'Overall Score: {score} / 100',
      actionHeading: 'Recommended Engineering Roadmap',
      scheduleConsultation: 'Discuss Results With An OFOQ Lead Engineer'
    },
    contact: {
      kicker: 'Get in Touch',
      title: 'Let’s Build Something Exceptional Together',
      subtitle: 'Share your vision or technical requirements with our engineering leads. We provide honest technical assessments and actionable roadmaps.',
      nameLabel: 'Full Name',
      emailLabel: 'Work Email Address',
      phoneLabel: 'Phone / Mobile Number',
      companyLabel: 'Company or Startup Name',
      serviceLabel: 'Service of Primary Interest',
      priorityLabel: 'Target Project Timeline',
      routinePriority: 'Planning Phase (Ready to kick off in 1–3 months)',
      elevatedPriority: 'Immediate Need (Kick off within 2–4 weeks)',
      criticalPriority: 'Urgent Project (Ready to start immediately)',
      messageLabel: 'Project Overview & Technical Vision',
      messagePlaceholder: 'Tell us about your project, target audience, preferred tech stack, or key features you wish to build...',
      submitBtn: 'Send Project Brief',
      submitting: 'Submitting Your Inquiry...',
      successTitle: 'Project Brief Received!',
      successText: 'Your message was submitted. We will use the contact details you provided if follow-up is needed.',
      officesTitle: 'Contact details',
      emergencyTitle: 'Phone contact',
      emergencyText: 'Call or message us using the contact details shown here.',
      pgpTitle: 'Confidentiality',
      pgpText: 'Confidentiality and data handling terms should be agreed in writing before sharing sensitive information.',
      validationError: 'Please complete all required fields with valid contact details.'
    },
    footer: {
      tagline: 'OFOQ works on software and digital products. Contact us to discuss a project.',
      navigation: 'Quick Links',
      services: 'Engineering Services',
      governance: 'Our Tech Stack',
      legal: 'Legal & IP',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: '© 2026 OFOQ.',
      disclaimer: 'Ownership and handover terms are defined in each signed project agreement.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية', services: 'الخدمات', projects: 'المشاريع', about: 'من نحن',
      reviews: 'آراء العملاء', assessment: 'التقييم التقني', contact: 'تواصل معنا',
      ctaAudit: 'ابدأ مشروعك', ctaEmergency: 'تحدث مع الفريق', sourceCode: 'تحميل الشيفرة المصدرية'
    },
    hero: {
      badge: 'استوديو أفق للتقنية والتصميم الرقمي',
      headlineStart: 'نصنع تجارب', headlineGradient: 'رقمية للمستقبل', headlineEnd: 'بفكر هندسي وهوية لا تشبه أحدًا.',
      subtitle: 'أفق فريق تقني يبني مواقع ومنتجات رقمية وتجارب ذكية، من الفكرة الأولى حتى الإطلاق والنمو.',
      primaryCta: 'ابدأ مشروعك', secondaryCta: 'اكتشف أعمالنا', teamStatus: 'نستقبل مشاريع جديدة',
      kpi1Value: 'متقن', kpi1Label: 'هندسة واضحة', kpi2Value: 'سريع', kpi2Label: 'أداء وتجربة استخدام',
      kpi3Value: 'موثوق', kpi3Label: 'تواصل وتسليم واضح', kpi4Value: 'مخصص', kpi4Label: 'حلول تناسب احتياجك'
    },
    trust: { label: 'تقنيات نبني بها', react: 'React', typescript: 'TypeScript', flutter: 'Flutter', node: 'Node.js', cloud: 'Supabase', docker: 'Cloud' },
    services: {
      kicker: 'ماذا نصنع', title: 'حلول رقمية تبدأ بفكرة وتنتهي بمنتج متقن',
      subtitle: 'نصمم ونطور تجارب رقمية واضحة، سريعة، وقابلة للنمو وفق احتياج كل مشروع.',
      viewDetails: 'اكتشف الخدمة', exploreAll: 'استكشف جميع الخدمات', keyDeliverables: 'المخرجات الرئيسية',
      frameworks: 'التقنيات المستخدمة', inquireService: 'اطلب هذه الخدمة'
    },
    whyUs: {
      kicker: 'لماذا أفق', title: 'نوازن بين الفكرة والهندسة والتفاصيل',
      subtitle: 'نؤمن أن التقنية الجيدة تبدأ بفهم الناس، ثم تتحول إلى تجربة سهلة ومنتج يعتمد عليه.',
      point1Title: 'تفكير يضع المستخدم أولًا', point1Desc: 'نبدأ بفهم أهدافك واحتياجات جمهورك قبل اختيار الحل.',
      point2Title: 'بنية نظيفة وقابلة للتوسع', point2Desc: 'نختار الأدوات والمعمارية المناسبة لنطاق المشروع.',
      point3Title: 'تواصل واضح طوال التنفيذ', point3Desc: 'نعمل بمراحل محددة ومراجعات متفق عليها.',
      point4Title: 'تقنيات حديثة بعناية', point4Desc: 'نستخدم أدوات حديثة عندما تضيف قيمة حقيقية للمنتج.'
    },
    workflow: {
      kicker: 'رحلة العمل', title: 'من الفكرة إلى الإطلاق، بخطوات واضحة',
      subtitle: 'منهج عمل يساعدنا على تحويل المتطلبات إلى منتج رقمي يمكن تطويره بثقة.',
      step1Num: '01', step1Title: 'نفهم الفكرة', step1Desc: 'نحدد الهدف والجمهور والمتطلبات والأولويات.',
      step2Num: '02', step2Title: 'نرسم التجربة', step2Desc: 'نرتب بنية المنتج وواجهاته ومسارات الاستخدام.',
      step3Num: '03', step3Title: 'نبني ونختبر', step3Desc: 'نطور الوظائف ونراجع الجودة والأداء.',
      step4Num: '04', step4Title: 'نطلق ونواصل التطوير', step4Desc: 'نجهز النشر والتسليم ونخطط للتحسينات التالية.'
    },
    projects: {
      kicker: 'أعمالنا', title: 'حلول رقمية صُممت لتصنع فرقًا',
      subtitle: 'نعرض هنا الأعمال التي يسمح أصحابها بنشرها، إلى جانب المجالات التي نمتلك خبرة في بنائها.',
      viewCase: 'عرض تفاصيل المشروع', filterAll: 'الكل', filterFintech: 'التقنية المالية',
      filterHealthcare: 'الصحة والمنصات', filterUtilities: 'اللوجستيات', challenge: 'التحدي',
      solution: 'الحل من أفق', quantifiableResults: 'النتائج'
    },
    reviews: {
      kicker: 'آراء العملاء', title: 'الثقة تُبنى من تجربة حقيقية',
      subtitle: 'آراء العملاء التي أرسلت وجرى اعتمادها للنشر.',
      overallRating: 'متوسط التقييم', basedOn: 'بناءً على التقييمات المنشورة',
      submitReview: 'أضف تقييمك', filterRating: 'تصفية حسب التقييم', allRatings: 'كل التقييمات',
      verifiedClient: 'تقييم منشور', helpful: 'مفيد', writeReviewTitle: 'شاركنا تجربتك',
      writeReviewDesc: 'يسعدنا استقبال رأيك ومراجعته قبل النشر.', nameLabel: 'الاسم الكامل',
      roleLabel: 'المسمى الوظيفي', companyLabel: 'الشركة', sectorLabel: 'مجال العمل',
      ratingLabel: 'التقييم من 1 إلى 5', commentLabel: 'تجربتك مع فريق أفق',
      submitBtn: 'إرسال التقييم', successMessage: 'شكرًا لك، تم إرسال تقييمك للمراجعة.'
    },
    assessment: {
      kicker: 'مقياس تقني', title: 'راجع جاهزية فكرتك التقنية',
      subtitle: 'أسئلة أولية تساعد على ترتيب المتطلبات، ولا تُعد تدقيقًا هندسيًا أو أمنيًا.',
      questionOf: 'السؤال {current} من {total}', nextBtn: 'التالي', prevBtn: 'السابق',
      calculateBtn: 'عرض النتيجة', restartBtn: 'ابدأ من جديد', resultTitle: 'نتيجة التقييم',
      scoreLabel: 'النتيجة: {score} من 100', actionHeading: 'خطوات مقترحة',
      scheduleConsultation: 'ناقش النتيجة مع أفق'
    },
    contact: {
      kicker: 'تواصل معنا', title: 'لديك فكرة؟ دعنا نحولها إلى واقع.',
      subtitle: 'شاركنا نبذة عن مشروعك، وسنعود إليك لمناقشة الخطوة المناسبة.',
      nameLabel: 'الاسم الكامل', emailLabel: 'البريد الإلكتروني', phoneLabel: 'رقم الهاتف',
      companyLabel: 'اسم الشركة أو المشروع', serviceLabel: 'الخدمة المطلوبة',
      priorityLabel: 'موعد البدء المتوقع', routinePriority: 'خلال شهر إلى ثلاثة أشهر',
      elevatedPriority: 'خلال أسبوعين إلى شهر', criticalPriority: 'جاهز للبدء الآن',
      messageLabel: 'تفاصيل المشروع', messagePlaceholder: 'اكتب لنا عن فكرتك وما تريد بناءه...',
      submitBtn: 'إرسال الطلب', submitting: 'جارٍ الإرسال...', successTitle: 'وصلنا طلبك',
      successText: 'شكرًا لتواصلك. سنراجع التفاصيل ونتواصل معك.',
      officesTitle: 'بيانات التواصل', emergencyTitle: 'تواصل مباشر',
      emergencyText: 'يمكنك التواصل معنا عبر الهاتف أو واتساب.',
      pgpTitle: 'الخصوصية', pgpText: 'نتعامل مع بيانات التواصل وفق سياسة الخصوصية.',
      validationError: 'يرجى مراجعة الحقول المطلوبة.'
    },
    footer: {
      tagline: 'أفق، استوديو تقني لتصميم وبناء المنتجات والتجارب الرقمية.',
      navigation: 'روابط الموقع', services: 'الخدمات', governance: 'التقنيات',
      legal: 'معلومات قانونية', privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام',
      copyright: '© 2026 أفق.', disclaimer: 'تُحدد تفاصيل التسليم والملكية في اتفاق كل مشروع.'
    }
  },

};
