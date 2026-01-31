/**
 * MVI Tech Portfolio Projects
 * 
 * Central data source for all portfolio projects.
 * Edit this file to add, remove, or modify projects.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  image?: string;
  tags: string[];
  highlights?: string[];
  comingSoon?: boolean;
}

export const projects: Project[] = [
  // Projects imported from old portfolio
  {
    id: 'mediconnect',
    title: 'MediConnect',
    description: 'Plataforma de telemedicina conectando pacientes e médicos com consultas online, assinatura digital e IA para prontuários.',
    category: 'Plataforma de Saúde',
    url: 'https://mediconnect-pied.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/medi-connect.png',
    tags: ['Telemedicina', 'IA', 'SaaS'],
    highlights: [
      'Consultas online em tempo real',
      'Prontuário eletrônico com IA',
      'Assinatura digital integrada'
    ],
  },
  {
    id: 'motor-metrics',
    title: 'Motor Metrics',
    description: 'Plataforma de análise de métricas com dashboard moderno, visualizações em tempo real e relatórios detalhados.',
    category: 'Dashboard Analytics',
    url: 'https://motor-metrics.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/motor-metrics.png',
    tags: ['Dashboard', 'Analytics', 'BI'],
    highlights: [
      'Visualizações em tempo real',
      'Relatórios personalizados',
      'Integração com múltiplas fontes'
    ],
  },
  {
    id: 'frete-rapido',
    title: 'Frete Rápido',
    description: 'Landing page profissional para empresa de logística com foco em conversão e experiência do usuário.',
    category: 'Logística',
    url: 'https://freterapido.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/frete.png',
    tags: ['Landing Page', 'Logística', 'Conversão'],
    highlights: [
      'Design focado em conversão',
      'Experiência responsiva',
      'Performance otimizada'
    ],
  },
  {
    id: 'farmacia-vital-care',
    title: 'Farmácia Vital Care',
    description: 'Landing page institucional para farmácia com design moderno, responsivo e otimizado para conversão.',
    category: 'Saúde & Varejo',
    url: 'https://farm-cia-vital-care.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/farmacia,png.png',
    tags: ['Landing Page', 'Saúde', 'Varejo'],
    highlights: [
      'Design moderno e clean',
      'Integração WhatsApp',
      'SEO otimizado'
    ],
  },
  {
    id: 'style-barba',
    title: 'Style Barba',
    description: 'Landing page moderna para barbearia premium com design elegante, tema escuro e agendamento integrado.',
    category: 'Serviços',
    url: 'https://style-barba.vercel.app/',
    image: 'https://portfolio-mvi.vercel.app/projects/barbearia.png',
    tags: ['Landing Page', 'Serviços', 'Agendamento'],
    highlights: [
      'Design premium dark theme',
      'Sistema de agendamento',
      'Experiência mobile-first'
    ],
  },
  {
    id: 'ecommerce-ling',
    title: 'E-commerce Ling',
    description: 'Plataforma de e-commerce moderna com catálogo de produtos, carrinho de compras e checkout integrado.',
    category: 'E-Commerce',
    url: '',
    image: 'https://portfolio-mvi.vercel.app/projects/ecommerce.png',
    tags: ['E-commerce', 'Catálogo', 'Checkout'],
    highlights: [
      'Catálogo dinâmico',
      'Carrinho de compras',
      'Checkout integrado'
    ],
    comingSoon: true,
  },
  // New projects added
  {
    id: 'grupo-aa-compras-coletivas',
    title: 'Compras Coletivas de Semijoias (Grupo AA / Artea Joias)',
    description: 'Plataforma de acesso com autenticação para compras coletivas de semijoias, centralizando pedidos e operação de vendas em um fluxo digital simples e organizado.',
    category: 'Sistema / E-commerce B2B',
    url: 'https://www.grupoaadecomprascoletivas.site/login',
    tags: ['Sistema', 'E-commerce B2B', 'Autenticação'],
    highlights: [
      'Login e acesso ao sistema',
      'Fluxo de pedidos e acompanhamento',
      'Experiência responsiva'
    ],
  },
  {
    id: 'motor-hub',
    title: 'Motor Hub (DYQUE & DAYA)',
    description: 'Sistema com autenticação voltado à operação e gestão do fluxo de trabalho, com foco em organização e agilidade para rotina interna.',
    category: 'Sistema / Operações',
    url: 'https://imberio-motor-hub.vercel.app/login',
    tags: ['Sistema', 'Operações', 'Autenticação'],
    highlights: [
      'Login e áreas restritas',
      'Experiência direta e rápida',
      'Interface clean e responsiva'
    ],
  },
];
