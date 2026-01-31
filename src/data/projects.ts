/**
 * MVI Tech Portfolio Projects
 * 
 * Central data source for all portfolio projects.
 * Edit this file to add, remove, or modify projects.
 * Supports PT-BR and EN translations.
 */

import { Language } from '@/i18n/translations';

export interface ProjectTranslation {
  title: string;
  description: string;
  category: string;
  highlights?: string[];
}

export interface Project {
  id: string;
  translations: Record<Language, ProjectTranslation>;
  url: string;
  image?: string;
  tags: string[];
  comingSoon?: boolean;
}

export const projects: Project[] = [
  // Projects imported from old portfolio
  {
    id: 'mediconnect',
    translations: {
      'pt-BR': {
        title: 'MediConnect',
        description: 'Plataforma de telemedicina conectando pacientes e médicos com consultas online, assinatura digital e IA para prontuários.',
        category: 'Plataforma de Saúde',
        highlights: [
          'Consultas online em tempo real',
          'Prontuário eletrônico com IA',
          'Assinatura digital integrada'
        ],
      },
      'en': {
        title: 'MediConnect',
        description: 'Telemedicine platform connecting patients and doctors with online consultations, digital signatures, and AI-powered medical records.',
        category: 'Health Platform',
        highlights: [
          'Real-time online consultations',
          'AI-powered electronic medical records',
          'Integrated digital signature'
        ],
      },
    },
    url: 'https://mediconnect-pied.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/medi-connect.png',
    tags: ['Telemedicine', 'AI', 'SaaS'],
  },
  {
    id: 'motor-metrics',
    translations: {
      'pt-BR': {
        title: 'Motor Metrics',
        description: 'Plataforma de análise de métricas com dashboard moderno, visualizações em tempo real e relatórios detalhados.',
        category: 'Dashboard Analytics',
        highlights: [
          'Visualizações em tempo real',
          'Relatórios personalizados',
          'Integração com múltiplas fontes'
        ],
      },
      'en': {
        title: 'Motor Metrics',
        description: 'Metrics analysis platform with modern dashboard, real-time visualizations, and detailed reports.',
        category: 'Dashboard Analytics',
        highlights: [
          'Real-time visualizations',
          'Customized reports',
          'Multi-source integration'
        ],
      },
    },
    url: 'https://motor-metrics.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/motor-metrics.png',
    tags: ['Dashboard', 'Analytics', 'BI'],
  },
  {
    id: 'frete-rapido',
    translations: {
      'pt-BR': {
        title: 'Frete Rápido',
        description: 'Landing page profissional para empresa de logística com foco em conversão e experiência do usuário.',
        category: 'Logística',
        highlights: [
          'Design focado em conversão',
          'Experiência responsiva',
          'Performance otimizada'
        ],
      },
      'en': {
        title: 'Frete Rápido',
        description: 'Professional landing page for logistics company focused on conversion and user experience.',
        category: 'Logistics',
        highlights: [
          'Conversion-focused design',
          'Responsive experience',
          'Optimized performance'
        ],
      },
    },
    url: 'https://freterapido.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/frete.png',
    tags: ['Landing Page', 'Logistics', 'Conversion'],
  },
  {
    id: 'farmacia-vital-care',
    translations: {
      'pt-BR': {
        title: 'Farmácia Vital Care',
        description: 'Landing page institucional para farmácia com design moderno, responsivo e otimizado para conversão.',
        category: 'Saúde & Varejo',
        highlights: [
          'Design moderno e clean',
          'Integração WhatsApp',
          'SEO otimizado'
        ],
      },
      'en': {
        title: 'Vital Care Pharmacy',
        description: 'Institutional landing page for pharmacy with modern, responsive design optimized for conversion.',
        category: 'Health & Retail',
        highlights: [
          'Modern and clean design',
          'WhatsApp integration',
          'Optimized SEO'
        ],
      },
    },
    url: 'https://farm-cia-vital-care.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/farmacia,png.png',
    tags: ['Landing Page', 'Health', 'Retail'],
  },
  {
    id: 'style-barba',
    translations: {
      'pt-BR': {
        title: 'Style Barba',
        description: 'Landing page moderna para barbearia premium com design elegante, tema escuro e agendamento integrado.',
        category: 'Serviços',
        highlights: [
          'Design premium dark theme',
          'Sistema de agendamento',
          'Experiência mobile-first'
        ],
      },
      'en': {
        title: 'Style Barba',
        description: 'Modern landing page for premium barbershop with elegant design, dark theme, and integrated booking.',
        category: 'Services',
        highlights: [
          'Premium dark theme design',
          'Booking system',
          'Mobile-first experience'
        ],
      },
    },
    url: 'https://style-barba.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/barbearia.png',
    tags: ['Landing Page', 'Services', 'Booking'],
  },
  {
    id: 'ecommerce-ling',
    translations: {
      'pt-BR': {
        title: 'E-commerce Ling',
        description: 'Plataforma de e-commerce moderna com catálogo de produtos, carrinho de compras e checkout integrado.',
        category: 'E-Commerce',
        highlights: [
          'Catálogo dinâmico',
          'Carrinho de compras',
          'Checkout integrado'
        ],
      },
      'en': {
        title: 'E-commerce Ling',
        description: 'Modern e-commerce platform with product catalog, shopping cart, and integrated checkout.',
        category: 'E-Commerce',
        highlights: [
          'Dynamic catalog',
          'Shopping cart',
          'Integrated checkout'
        ],
      },
    },
    url: '',
    image: 'https://portfolio-mvi.vercel.app/projects/ecommerce.png',
    tags: ['E-commerce', 'Catalog', 'Checkout'],
    comingSoon: true,
  },
  // New projects added
  {
    id: 'grupo-aa-compras-coletivas',
    translations: {
      'pt-BR': {
        title: 'Compras Coletivas de Semijoias (Grupo AA / Artea Joias)',
        description: 'Plataforma de acesso com autenticação para compras coletivas de semijoias, centralizando pedidos e operação de vendas em um fluxo digital simples e organizado.',
        category: 'Sistema / E-commerce B2B',
        highlights: [
          'Login e acesso ao sistema',
          'Fluxo de pedidos e acompanhamento',
          'Experiência responsiva'
        ],
      },
      'en': {
        title: 'Semi-Jewelry Collective Purchasing (Grupo AA / Artea Joias)',
        description: 'Access platform with authentication for collective semi-jewelry purchases, centralizing orders and sales operations in a simple and organized digital flow.',
        category: 'System / B2B E-commerce',
        highlights: [
          'Login and system access',
          'Order flow and tracking',
          'Responsive experience'
        ],
      },
    },
    url: 'https://www.grupoaadecomprascoletivas.site/login',
    tags: ['System', 'B2B E-commerce', 'Authentication'],
  },
  {
    id: 'motor-hub',
    translations: {
      'pt-BR': {
        title: 'Motor Hub (DYQUE & DAYA)',
        description: 'Sistema com autenticação voltado à operação e gestão do fluxo de trabalho, com foco em organização e agilidade para rotina interna.',
        category: 'Sistema / Operações',
        highlights: [
          'Login e áreas restritas',
          'Experiência direta e rápida',
          'Interface clean e responsiva'
        ],
      },
      'en': {
        title: 'Motor Hub (DYQUE & DAYA)',
        description: 'Authentication-based system for operations and workflow management, focused on organization and agility for internal routines.',
        category: 'System / Operations',
        highlights: [
          'Login and restricted areas',
          'Direct and fast experience',
          'Clean and responsive interface'
        ],
      },
    },
    url: 'https://imberio-motor-hub.vercel.app/login',
    tags: ['System', 'Operations', 'Authentication'],
  },
];

// Helper function to get translated project data
export function getProjectTranslation(project: Project, language: Language): ProjectTranslation & { url: string; image?: string; tags: string[]; comingSoon?: boolean } {
  return {
    ...project.translations[language],
    url: project.url,
    image: project.image,
    tags: project.tags,
    comingSoon: project.comingSoon,
  };
}
