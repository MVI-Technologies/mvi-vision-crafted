/**
 * MVI Tech Internationalization Translations
 * 
 * HOW TO EDIT:
 * - Add new keys in BOTH 'pt-BR' and 'en' objects
 * - Use dot notation for nested keys (e.g., 'nav.home', 'hero.headline')
 * - Keep translations consistent in tone: professional, direct, premium
 * 
 * CHATBOT FAQ:
 * - Chatbot now uses LLM with strict scope rules
 * - Edit system prompt in edge function for behavior changes
 */

export type Language = 'pt-BR' | 'en';

export const translations = {
  'pt-BR': {
    // Meta
    'meta.title': 'MVI Tech – Design & Software Makers',
    'meta.description': 'Soluções digitais com propósito. Design impecável + engenharia que escala.',
    
    // Navbar
    'nav.home': 'Home',
    'nav.projects': 'Projetos',
    'nav.services': 'Serviços',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.selectLanguage': 'Selecionar idioma',

    // Hero
    'hero.line1': 'Design',
    'hero.line2': '& Software',
    'hero.line3': 'makers',
    'hero.echoText': 'makers',
    'hero.capability1': 'Web Apps',
    'hero.capability2': 'Sites & Landing Pages',
    'hero.capability3': 'UI/UX & Design Systems',
    'hero.capability4': 'Branding & Identidade',
    'hero.capability5': 'Automação & Integrações',
    'hero.subheadline': 'Soluções digitais com propósito. Design impecável + engenharia que escala.',
    'hero.ctaPrimary': 'Falar com a MVI',
    'hero.ctaSecondary': 'Ver projetos',

    // About
    'about.label': '(Sobre)',
    'about.title': 'Sobre',
    'about.description': 'A MVI Tech cria produtos digitais do zero ao lançamento — com design de alto padrão e desenvolvimento sólido. Sem complicação. Sem teatro. Só entrega.',
    'about.partnerTitle': 'Parceiro estratégico',
    'about.bullet1': 'Pensamos como negócio.',
    'about.bullet2': 'Validamos rápido, escalamos com segurança.',
    'about.bullet3': 'Design que converte, código que aguenta.',

    // Services
    'services.label': '(Serviços)',
    'services.title': 'Serviços.',
    'services.service1.title': 'UI/UX & Interface',
    'services.service1.description': 'Interfaces que parecem simples — porque foram bem pensadas.',
    'services.service1.approaches': 'Design visual, Hierarquia, Componentes, Acessibilidade, Conversão',
    'services.service2.title': 'Desenvolvimento Frontend',
    'services.service2.description': 'Experiências rápidas, responsivas e pixel-perfect.',
    'services.service2.approaches': 'React/Next, Performance, Componentização, SEO',
    'services.service3.title': 'Backend & APIs',
    'services.service3.description': 'Arquitetura limpa, integrações e segurança na base.',
    'services.service3.approaches': 'REST, Autenticação, Banco de dados, Observabilidade',
    'services.service4.title': 'Branding & Identidade',
    'services.service4.description': 'Marca com voz, sistema visual e consistência.',
    'services.service4.approaches': 'Logo, Paleta, Guidelines, Aplicações',

    // Projects
    'projects.label': '(Projetos)',
    'projects.title': 'Projetos',
    'projects.viewCase': 'Ver case',
    'projects.category.system': 'Sistema',
    'projects.category.platform': 'Plataforma',
    'projects.category.dashboard': 'Dashboard',
    'projects.category.website': 'Website',
    'projects.category.app': 'App',
    'projects.problem': 'Problema',
    'projects.solution': 'Solução',
    'projects.result': 'Resultado',
    'projects.stack': 'Stack',
    'projects.visual': 'Visual',
    
    // Project details
    'projects.atlas.tagline': 'Gestão operacional para indústrias de grande porte.',
    'projects.atlas.problem': 'Processos fragmentados em planilhas e sistemas legados, gerando retrabalho e falta de visibilidade.',
    'projects.atlas.solution': 'Plataforma unificada com dashboards em tempo real, automação de workflows e integrações com ERPs existentes.',
    'projects.atlas.result': 'Redução expressiva no tempo de operação e maior previsibilidade nas entregas.',
    
    'projects.aurora.tagline': 'Fintech para gestão de recebíveis.',
    'projects.aurora.problem': 'Empresas sem acesso rápido a antecipação de recebíveis e análise de crédito.',
    'projects.aurora.solution': 'Plataforma white-label para bancos e fintechs, com motor de análise de risco e integração bancária.',
    'projects.aurora.result': 'Aumento significativo na velocidade de onboarding e aprovação de operações.',
    
    'projects.nexo.tagline': 'Visibilidade total da cadeia logística.',
    'projects.nexo.problem': 'Falta de rastreabilidade e comunicação entre transportadoras, armazéns e clientes finais.',
    'projects.nexo.solution': 'Dashboard integrado com tracking em tempo real, alertas automatizados e relatórios de performance.',
    'projects.nexo.result': 'Melhoria na satisfação do cliente final e redução de ocorrências.',
    
    'projects.vertice.tagline': 'Presença digital para rede de clínicas.',
    'projects.vertice.problem': 'Site desatualizado, baixa conversão e dificuldade de agendamento online.',
    'projects.vertice.solution': 'Redesign completo com foco em conversão, integração com sistema de agendamento e SEO técnico.',
    'projects.vertice.result': 'Crescimento consistente em agendamentos via site e melhor posicionamento orgânico.',
    
    'projects.prisma.tagline': 'Plataforma de ensino adaptativo.',
    'projects.prisma.problem': 'Conteúdo educacional genérico que não atendia às necessidades individuais dos alunos.',
    'projects.prisma.solution': 'App mobile com trilhas personalizadas, gamificação e acompanhamento de progresso para pais e professores.',
    'projects.prisma.result': 'Engajamento elevado e melhora nos indicadores de aprendizagem.',
    
    'projects.orbita.tagline': 'CRM para times de vendas B2B.',
    'projects.orbita.problem': 'Vendedores perdiam oportunidades por falta de organização e follow-ups esquecidos.',
    'projects.orbita.solution': 'CRM intuitivo com automação de follow-up, scoring de leads e integração com e-mail e WhatsApp.',
    'projects.orbita.result': 'Aumento na taxa de conversão e ciclo de vendas mais curto.',

    // Contact
    'contact.label': '(Contato)',
    'contact.headline': 'Sua próxima entrega começa numa conversa.',
    'contact.cta': 'Vamos criar',
    'contact.nameLabel': 'Nome',
    'contact.namePlaceholder': 'Seu nome',
    'contact.emailLabel': 'E-mail',
    'contact.emailPlaceholder': 'seu@email.com',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.whatsappPlaceholder': '+55 11 99999-9999',
    'contact.projectTypeLabel': 'Tipo de projeto',
    'contact.projectTypePlaceholder': 'Selecione uma opção',
    'contact.projectType.website': 'Website',
    'contact.projectType.platform': 'Plataforma',
    'contact.projectType.app': 'App',
    'contact.projectType.system': 'Sistema',
    'contact.projectType.branding': 'Branding',
    'contact.projectType.other': 'Outro',
    'contact.messageLabel': 'Mensagem',
    'contact.messagePlaceholder': 'Conte sobre seu projeto...',
    'contact.submit': 'Enviar mensagem',
    'contact.sending': 'Enviando...',
    'contact.responseTime': 'Respondemos em até 48 horas.',
    'contact.successTitle': 'Mensagem enviada!',
    'contact.successMessage': 'Entraremos em contato em breve.',
    'contact.errorTitle': 'Erro ao enviar',
    'contact.errorMessage': 'Tente novamente mais tarde.',

    // Footer
    'footer.copyright': '© 2026 MVI Tech',
    'footer.tagline': 'Design & Software makers',

    // Chatbot
    'chatbot.tooltip': 'Tirar dúvidas de negócio',
    'chatbot.title': 'MVI Business',
    'chatbot.subtitle': 'Serviços e contratação',
    'chatbot.placeholder': 'Digite sua dúvida...',
    'chatbot.send': 'Enviar',
    'chatbot.clearChat': 'Limpar conversa',
    'chatbot.close': 'Fechar chat',
    'chatbot.whatsapp': 'Falar no WhatsApp',
    'chatbot.talkToHuman': 'Falar com humano',
    'chatbot.typing': 'Digitando',
    'chatbot.welcome': 'Olá! Sou o assistente de negócios da MVI Tech. Posso ajudar com dúvidas sobre serviços, prazos e orçamentos. Como posso ajudar?',
    'chatbot.outOfScope': 'Posso ajudar com dúvidas sobre projetos, serviços, prazos e orçamento da MVI Tech. Quer falar sobre seu projeto?',
    'chatbot.budgetCta': 'Quer que eu faça 3 perguntas rápidas para estimar orçamento?',
    'chatbot.whatsappMessage': 'Olá! Vim pelo site da MVI Tech e queria orçamento para {projectType}. Meu objetivo é {goal}. Prazo desejado: {timeline}.',
    'chatbot.whatsappMessageGeneric': 'Olá! Vim pelo site da MVI Tech e queria saber mais sobre os serviços.',
    
    // Chatbot chips
    'chatbot.chip1': 'Quanto custa um site?',
    'chatbot.chip2': 'Qual o prazo médio?',
    'chatbot.chip3': 'Vocês fazem app?',
    'chatbot.chip4': 'Como funciona o processo?',
    'chatbot.chip5': 'Quais tecnologias usam?',
  },

  'en': {
    // Meta
    'meta.title': 'MVI Tech – Design & Software Makers',
    'meta.description': 'Purpose-driven digital solutions. Impeccable design + engineering that scales.',
    
    // Navbar
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.selectLanguage': 'Select language',

    // Hero
    'hero.line1': 'Design',
    'hero.line2': '& Software',
    'hero.line3': 'makers',
    'hero.echoText': 'makers',
    'hero.capability1': 'Web Apps',
    'hero.capability2': 'Sites & Landing Pages',
    'hero.capability3': 'UI/UX & Design Systems',
    'hero.capability4': 'Branding & Identity',
    'hero.capability5': 'Automation & Integrations',
    'hero.subheadline': 'Purpose-driven digital solutions. Impeccable design + engineering that scales.',
    'hero.ctaPrimary': 'Talk to MVI',
    'hero.ctaSecondary': 'View projects',

    // About
    'about.label': '(About)',
    'about.title': 'About',
    'about.description': 'MVI Tech creates digital products from scratch to launch — with high-end design and solid development. No complications. No drama. Just delivery.',
    'about.partnerTitle': 'Strategic partner',
    'about.bullet1': 'We think like a business.',
    'about.bullet2': 'We validate fast, scale safely.',
    'about.bullet3': 'Design that converts, code that endures.',

    // Services
    'services.label': '(Services)',
    'services.title': 'Services.',
    'services.service1.title': 'UI/UX & Interface',
    'services.service1.description': 'Interfaces that look simple — because they were well thought out.',
    'services.service1.approaches': 'Visual design, Hierarchy, Components, Accessibility, Conversion',
    'services.service2.title': 'Frontend Development',
    'services.service2.description': 'Fast, responsive, and pixel-perfect experiences.',
    'services.service2.approaches': 'React/Next, Performance, Componentization, SEO',
    'services.service3.title': 'Backend & APIs',
    'services.service3.description': 'Clean architecture, integrations, and security at the core.',
    'services.service3.approaches': 'REST, Authentication, Database, Observability',
    'services.service4.title': 'Branding & Identity',
    'services.service4.description': 'Brand with voice, visual system, and consistency.',
    'services.service4.approaches': 'Logo, Palette, Guidelines, Applications',

    // Projects
    'projects.label': '(Projects)',
    'projects.title': 'Projects',
    'projects.viewCase': 'View case',
    'projects.category.system': 'System',
    'projects.category.platform': 'Platform',
    'projects.category.dashboard': 'Dashboard',
    'projects.category.website': 'Website',
    'projects.category.app': 'App',
    'projects.problem': 'Problem',
    'projects.solution': 'Solution',
    'projects.result': 'Result',
    'projects.stack': 'Stack',
    'projects.visual': 'Visual',
    
    // Project details
    'projects.atlas.tagline': 'Operational management for large industries.',
    'projects.atlas.problem': 'Fragmented processes in spreadsheets and legacy systems, causing rework and lack of visibility.',
    'projects.atlas.solution': 'Unified platform with real-time dashboards, workflow automation, and integrations with existing ERPs.',
    'projects.atlas.result': 'Significant reduction in operation time and greater delivery predictability.',
    
    'projects.aurora.tagline': 'Fintech for receivables management.',
    'projects.aurora.problem': 'Companies without quick access to receivables anticipation and credit analysis.',
    'projects.aurora.solution': 'White-label platform for banks and fintechs, with risk analysis engine and banking integration.',
    'projects.aurora.result': 'Significant increase in onboarding speed and operation approval.',
    
    'projects.nexo.tagline': 'Total visibility of the logistics chain.',
    'projects.nexo.problem': 'Lack of traceability and communication between carriers, warehouses, and end customers.',
    'projects.nexo.solution': 'Integrated dashboard with real-time tracking, automated alerts, and performance reports.',
    'projects.nexo.result': 'Improved end-customer satisfaction and reduced incidents.',
    
    'projects.vertice.tagline': 'Digital presence for clinic network.',
    'projects.vertice.problem': 'Outdated website, low conversion, and difficulty with online scheduling.',
    'projects.vertice.solution': 'Complete redesign focused on conversion, scheduling system integration, and technical SEO.',
    'projects.vertice.result': 'Consistent growth in website appointments and better organic positioning.',
    
    'projects.prisma.tagline': 'Adaptive learning platform.',
    'projects.prisma.problem': 'Generic educational content that didn\'t meet individual student needs.',
    'projects.prisma.solution': 'Mobile app with personalized tracks, gamification, and progress tracking for parents and teachers.',
    'projects.prisma.result': 'High engagement and improvement in learning indicators.',
    
    'projects.orbita.tagline': 'CRM for B2B sales teams.',
    'projects.orbita.problem': 'Salespeople were losing opportunities due to lack of organization and forgotten follow-ups.',
    'projects.orbita.solution': 'Intuitive CRM with follow-up automation, lead scoring, and email/WhatsApp integration.',
    'projects.orbita.result': 'Increased conversion rate and shorter sales cycle.',

    // Contact
    'contact.label': '(Contact)',
    'contact.headline': 'Your next delivery starts with a conversation.',
    'contact.cta': 'Let\'s create',
    'contact.nameLabel': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.emailLabel': 'Email',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.whatsappPlaceholder': '+1 555 123-4567',
    'contact.projectTypeLabel': 'Project type',
    'contact.projectTypePlaceholder': 'Select an option',
    'contact.projectType.website': 'Website',
    'contact.projectType.platform': 'Platform',
    'contact.projectType.app': 'App',
    'contact.projectType.system': 'System',
    'contact.projectType.branding': 'Branding',
    'contact.projectType.other': 'Other',
    'contact.messageLabel': 'Message',
    'contact.messagePlaceholder': 'Tell us about your project...',
    'contact.submit': 'Send message',
    'contact.sending': 'Sending...',
    'contact.responseTime': 'We respond within 48 hours.',
    'contact.successTitle': 'Message sent!',
    'contact.successMessage': 'We\'ll be in touch soon.',
    'contact.errorTitle': 'Error sending',
    'contact.errorMessage': 'Please try again later.',

    // Footer
    'footer.copyright': '© 2026 MVI Tech',
    'footer.tagline': 'Design & Software makers',

    // Chatbot
    'chatbot.tooltip': 'Ask about business',
    'chatbot.title': 'MVI Business',
    'chatbot.subtitle': 'Services & hiring',
    'chatbot.placeholder': 'Type your question...',
    'chatbot.send': 'Send',
    'chatbot.clearChat': 'Clear chat',
    'chatbot.close': 'Close chat',
    'chatbot.whatsapp': 'Chat on WhatsApp',
    'chatbot.talkToHuman': 'Talk to a human',
    'chatbot.typing': 'Typing',
    'chatbot.welcome': 'Hello! I\'m MVI Tech\'s business assistant. I can help with questions about services, timelines, and pricing. How can I help?',
    'chatbot.outOfScope': 'I can help with MVI Tech\'s services, timelines, pricing ranges and hiring. Want to tell me about your project?',
    'chatbot.budgetCta': 'Want me to ask 3 quick questions to estimate a budget?',
    'chatbot.whatsappMessage': 'Hi! I came from MVI Tech\'s website and I\'d like a quote for {projectType}. My goal is {goal}. Desired timeline: {timeline}.',
    'chatbot.whatsappMessageGeneric': 'Hi! I came from MVI Tech\'s website and I\'d like to know more about your services.',
    
    // Chatbot chips
    'chatbot.chip1': 'How much does a website cost?',
    'chatbot.chip2': 'What\'s the average timeline?',
    'chatbot.chip3': 'Do you build apps?',
    'chatbot.chip4': 'How does your process work?',
    'chatbot.chip5': 'What technologies do you use?',
  },
} as const;

export type TranslationKey = keyof typeof translations['pt-BR'];
