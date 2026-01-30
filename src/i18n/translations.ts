/**
 * MVI Tech Internationalization Translations
 * 
 * HOW TO EDIT:
 * - Add new keys in BOTH 'pt-BR' and 'en' objects
 * - Use dot notation for nested keys (e.g., 'nav.home', 'hero.headline')
 * - Keep translations consistent in tone: professional, direct, premium
 * 
 * CHATBOT FAQ:
 * - Edit 'chatbot.faq' object to update business responses
 * - Each FAQ entry has 'answer' and 'followUp'
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
    'hero.line3': 'makers®',
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
    'footer.copyright': '© 2026 MVI Tech®',
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

    // Chatbot FAQ answers
    'chatbot.faq.price': 'Os valores variam conforme a complexidade do projeto. Um site institucional pode partir de R$ 5.000 a R$ 15.000, enquanto plataformas e sistemas mais robustos ficam entre R$ 20.000 e R$ 80.000+. Tudo depende das funcionalidades, integrações e prazos.',
    'chatbot.faq.timeline': 'Sites institucionais levam de 2 a 4 semanas. Landing pages podem ficar prontas em 1 semana. Sistemas e plataformas mais complexos variam de 1 a 4 meses, dependendo do escopo.',
    'chatbot.faq.app': 'Sim! Desenvolvemos apps mobile com React Native, garantindo qualidade tanto para iOS quanto Android com uma única base de código. Também criamos PWAs para casos onde um app nativo não é necessário.',
    'chatbot.faq.process': 'Nosso processo: 1) Briefing e discovery para entender o projeto; 2) Proposta com escopo, prazo e valor; 3) Design e prototipação; 4) Desenvolvimento iterativo com entregas parciais; 5) Testes e ajustes; 6) Lançamento e suporte inicial.',
    'chatbot.faq.stack': 'Trabalhamos com React, Next.js, TypeScript no frontend. Node.js, Python e bancos como PostgreSQL e MongoDB no backend. Para apps, usamos React Native. Infraestrutura em AWS, Vercel ou conforme a necessidade.',
    'chatbot.faq.support': 'Oferecemos suporte pós-lançamento incluso por 30 dias. Após isso, podemos fechar pacotes de manutenção mensal ou horas avulsas conforme a demanda.',
    'chatbot.faq.branding': 'Sim! Criamos identidades visuais completas: logo, paleta de cores, tipografia, guidelines e aplicações. O branding pode ser contratado separadamente ou junto com o desenvolvimento.',
    'chatbot.faq.ecommerce': 'Desenvolvemos e-commerces personalizados ou integrações com plataformas como Shopify. Incluímos gateway de pagamento, gestão de estoque e integrações logísticas.',
    'chatbot.faq.unknown': 'Para te dar uma estimativa mais precisa, preciso saber: 1) Qual tipo de projeto você precisa? 2) Qual o objetivo principal?',

    // Chatbot follow-ups
    'chatbot.followUp.price': 'Posso ajudar a estimar um valor mais preciso. Qual tipo de projeto você tem em mente?',
    'chatbot.followUp.timeline': 'Quer me contar mais sobre o que precisa? Assim consigo estimar melhor o prazo.',
    'chatbot.followUp.app': 'Tem alguma ideia do que o app precisa fazer? Me conta mais!',
    'chatbot.followUp.process': 'Quer agendar uma conversa para entender melhor seu projeto?',
    'chatbot.followUp.stack': 'Tem preferência por alguma tecnologia específica?',
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
    'hero.line3': 'makers®',
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
    'footer.copyright': '© 2026 MVI Tech®',
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

    // Chatbot FAQ answers
    'chatbot.faq.price': 'Prices vary based on project complexity. An institutional website can range from $2,000 to $8,000, while more robust platforms and systems range from $10,000 to $50,000+. It all depends on features, integrations, and timelines.',
    'chatbot.faq.timeline': 'Institutional websites take 2 to 4 weeks. Landing pages can be ready in 1 week. More complex systems and platforms vary from 1 to 4 months, depending on scope.',
    'chatbot.faq.app': 'Yes! We develop mobile apps with React Native, ensuring quality for both iOS and Android with a single codebase. We also create PWAs for cases where a native app isn\'t necessary.',
    'chatbot.faq.process': 'Our process: 1) Briefing and discovery to understand the project; 2) Proposal with scope, timeline, and pricing; 3) Design and prototyping; 4) Iterative development with partial deliveries; 5) Testing and adjustments; 6) Launch and initial support.',
    'chatbot.faq.stack': 'We work with React, Next.js, TypeScript on frontend. Node.js, Python, and databases like PostgreSQL and MongoDB on backend. For apps, we use React Native. Infrastructure on AWS, Vercel, or as needed.',
    'chatbot.faq.support': 'We offer 30-day post-launch support included. After that, we can arrange monthly maintenance packages or hourly support as needed.',
    'chatbot.faq.branding': 'Yes! We create complete visual identities: logo, color palette, typography, guidelines, and applications. Branding can be contracted separately or together with development.',
    'chatbot.faq.ecommerce': 'We develop custom e-commerce or integrations with platforms like Shopify. We include payment gateway, inventory management, and logistics integrations.',
    'chatbot.faq.unknown': 'To give you a more accurate estimate, I need to know: 1) What type of project do you need? 2) What\'s the main goal?',

    // Chatbot follow-ups
    'chatbot.followUp.price': 'I can help estimate a more precise value. What type of project do you have in mind?',
    'chatbot.followUp.timeline': 'Want to tell me more about what you need? I can better estimate the timeline.',
    'chatbot.followUp.app': 'Have any idea what the app needs to do? Tell me more!',
    'chatbot.followUp.process': 'Want to schedule a call to better understand your project?',
    'chatbot.followUp.stack': 'Do you have a preference for any specific technology?',
  },
} as const;

export type TranslationKey = keyof typeof translations['pt-BR'];
