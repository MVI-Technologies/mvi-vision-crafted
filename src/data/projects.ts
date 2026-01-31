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
  {
      id: 'artea-joias',
  translations: {
    'pt-BR': {
      title: 'Artea Joias',
      description:
        'Negócios B2C de semijoias que operam com alto volume de pedidos enfrentam desafios como controle de estoque por grupo, organização de pedidos, geração de romaneios e consolidação de dados gerenciais.\n\nO sistema Artea Joias foi desenvolvido para operar no modelo de compras coletivas por grupo, centralizando toda a operação de vendas em uma única plataforma. A solução permite o gerenciamento completo de pedidos, controle de romaneios, acompanhamento de vendas e geração de relatórios gerenciais, garantindo organização, escalabilidade e eficiência operacional.',
      category: 'E-commerce B2C / Compras Coletivas',
      highlights: [
        'Modelo B2C de compras coletivas por grupo',
        'Gestão completa de vendas e pedidos',
        'Geração e controle de romaneios',
        'Relatórios gerenciais para tomada de decisão',
      ],
    },
    en: {
      title: 'Artea Joias',
      description:
        'B2C semi-jewelry businesses operating at scale often face challenges in group-based order management, stock control, shipment documentation, and consolidated reporting.\n\nThe Artea Joias system was designed to operate under a collective purchasing model, centralizing the entire sales operation into a single platform. It enables full management of orders, shipment records, sales tracking, and managerial reports, ensuring operational efficiency and scalability.',
      category: 'B2C E-commerce / Collective Purchasing',
      highlights: [
        'B2C collective purchasing by groups',
        'End-to-end sales and order management',
        'Shipment and dispatch record control',
        'Managerial reports for decision-making',
      ],
    },
  },
  image: 'artea-joias.png',
  url: 'https://www.grupoaadecomprascoletivas.site/login', // ajuste se necessário
  tags: ['E-commerce', 'B2C', 'Collective Buying', 'Reports'],
},
{
  id: 'dyque-daya-registros',
  translations: {
    'pt-BR': {
      title: 'Dyque & Daya Registros',
      description:
        'Oficinas de motores elétricos que dependem de processos manuais enfrentam dificuldades no controle de orçamentos, histórico de clientes, gestão de peças e emissão de laudos técnicos.\n\nO sistema DYQUE & DAYA Registros foi desenvolvido para profissionalizar essa operação, oferecendo uma plataforma completa para gestão de clientes, peças, orçamentos e laudos técnicos. A solução centraliza informações, reduz erros operacionais e aumenta a eficiência no atendimento e na tomada de decisões.',
      category: 'Sistema de Gestão / Oficinas Técnicas',
      highlights: [
        'Gestão completa de orçamentos',
        'Cadastro e histórico de clientes',
        'Controle de peças e insumos',
        'Emissão de laudos técnicos profissionais',
      ],
    },
    en: {
      title: 'Dyque & Daya Records',
      description:
        'Electric motor workshops relying on manual processes often struggle with budget control, customer history, parts management, and technical report generation.\n\nDYQUE & DAYA Records was built to professionalize these operations through a complete management system for clients, parts, budgets, and technical reports. The platform centralizes data, reduces operational errors, and improves efficiency and decision-making.',
      category: 'Management System / Technical Workshops',
      highlights: [
        'Complete budget management',
        'Customer registration and history',
        'Parts and inventory control',
        'Professional technical report generation',
      ],
    },
  },
  image: 'dyque-daya-registros.png',
  url: 'https://imberio-motor-hub.vercel.app/login',
  tags: ['Management System', 'Budgets', 'Technical Reports', 'Operations'],
},
{
    id: 'mediconnect',
    translations: {
      'pt-BR': {
        title: 'MediConnect',
        description:
          'O acesso à saúde ainda enfrenta desafios como longas filas, dificuldade de agendamento, deslocamentos desnecessários e processos burocráticos que impactam tanto pacientes quanto profissionais da área médica. Além disso, a gestão manual de documentos e prontuários torna o atendimento mais lento e sujeito a falhas.\n\nA MediConnect foi desenvolvida para transformar esse cenário, conectando médicos e pacientes por meio de consultas online seguras, eliminando barreiras geográficas e reduzindo o tempo entre o atendimento e o cuidado efetivo. A plataforma integra assinatura digital com validade jurídica e inteligência artificial aplicada à organização e análise de prontuários médicos, trazendo mais eficiência, segurança e qualidade ao atendimento.',
        category: 'Plataforma de Saúde',
        highlights: [
          'Consultas online seguras e em tempo real',
          'Prontuário eletrônico inteligente com IA',
          'Assinatura digital com validade legal',
          'Otimização do fluxo clínico e redução de burocracia',
        ],
      },
      en: {
        title: 'MediConnect',
        description:
          'Access to healthcare still faces challenges such as long waiting times, difficult scheduling, unnecessary travel, and bureaucratic processes that affect both patients and medical professionals. Manual document handling and fragmented medical records further slow down care delivery.\n\nMediConnect was designed to redefine this experience by connecting doctors and patients through secure online consultations, removing geographical barriers and reducing the time between diagnosis and care. The platform integrates legally compliant digital signatures and AI-powered medical record management, delivering greater efficiency, security, and quality in healthcare services.',
        category: 'Health Platform',
        highlights: [
          'Secure real-time online consultations',
          'AI-powered electronic medical records',
          'Legally compliant digital signatures',
          'Optimized clinical workflows',
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
        description:
          'Empresas que lidam com grandes volumes de dados frequentemente enfrentam dificuldades para transformar informações brutas em decisões estratégicas. Relatórios descentralizados e métricas pouco claras comprometem a análise de performance e a tomada de decisão.\n\nO Motor Metrics resolve esse problema ao centralizar dados em dashboards modernos, com visualizações em tempo real e relatórios personalizados. A plataforma permite acompanhar indicadores-chave, identificar gargalos e apoiar decisões baseadas em dados confiáveis.',
        category: 'Dashboard Analytics',
        highlights: [
          'Dashboards interativos em tempo real',
          'Relatórios personalizados para tomada de decisão',
          'Integração com múltiplas fontes de dados',
          'Visualização clara de KPIs estratégicos',
        ],
      },
      en: {
        title: 'Motor Metrics',
        description:
          'Companies dealing with large data volumes often struggle to turn raw information into strategic decisions. Disconnected reports and unclear metrics hinder performance analysis.\n\nMotor Metrics solves this by centralizing data into modern dashboards with real-time visualizations and customized reports, enabling KPI tracking, bottleneck identification, and data-driven decision-making.',
        category: 'Dashboard Analytics',
        highlights: [
          'Interactive real-time dashboards',
          'Custom reports for decision-making',
          'Multi-source data integration',
          'Clear KPI visualization',
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
        description:
          'Empresas de logística muitas vezes perdem oportunidades por sites lentos, pouco claros e sem foco em conversão. A dificuldade em comunicar valor afasta potenciais clientes.\n\nA landing page do Frete Rápido foi desenvolvida para resolver esse problema, priorizando performance, clareza da proposta de valor e experiência do usuário. O resultado é uma presença digital eficiente, capaz de transformar visitantes em leads qualificados.',
        category: 'Logística',
        highlights: [
          'Estrutura focada em conversão',
          'Experiência totalmente responsiva',
          'Performance e carregamento otimizados',
          'Mensagem clara e objetiva do serviço',
        ],
      },
      en: {
        title: 'Frete Rápido',
        description:
          'Logistics companies often lose opportunities due to slow websites, unclear messaging, and poor conversion focus.\n\nFrete Rápido’s landing page addresses this by emphasizing performance, value proposition clarity, and user experience, turning visitors into qualified leads.',
        category: 'Logistics',
        highlights: [
          'Conversion-focused structure',
          'Fully responsive experience',
          'Optimized performance and loading speed',
          'Clear service communication',
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
        description:
          'Farmácias que não possuem presença digital estruturada enfrentam dificuldades para se destacar e atender clientes de forma ágil.\n\nA Farmácia Vital Care ganhou uma landing page institucional moderna, focada em SEO local, integração com WhatsApp e conversão, facilitando o contato com clientes e fortalecendo sua presença online.',
        category: 'Saúde & Varejo',
        highlights: [
          'Design moderno e profissional',
          'Integração direta com WhatsApp',
          'SEO otimizado para buscas locais',
          'Experiência mobile-first',
        ],
      },
      en: {
        title: 'Vital Care Pharmacy',
        description:
          'Pharmacies without a structured digital presence struggle to stand out and efficiently serve customers.\n\nThis institutional landing page strengthens online visibility through modern design, local SEO, WhatsApp integration, and conversion-focused structure.',
        category: 'Health & Retail',
        highlights: [
          'Modern and professional design',
          'Direct WhatsApp integration',
          'SEO optimized for local searches',
          'Mobile-first experience',
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
        description:
          'Barbearias premium precisam transmitir identidade, sofisticação e praticidade desde o primeiro contato digital.\n\nA Style Barba recebeu uma landing page com tema escuro, tipografia elegante e sistema de agendamento integrado, oferecendo uma experiência moderna e alinhada ao público premium.',
        category: 'Serviços',
        highlights: [
          'Design premium com dark theme',
          'Sistema de agendamento integrado',
          'Experiência otimizada para mobile',
          'Identidade visual alinhada ao público premium',
        ],
      },
      en: {
        title: 'Style Barba',
        description:
          'Premium barbershops must convey identity, sophistication, and convenience from the first digital touchpoint.\n\nStyle Barba’s landing page delivers a dark theme, elegant typography, and integrated booking for a modern, premium experience.',
        category: 'Services',
        highlights: [
          'Premium dark theme design',
          'Integrated booking system',
          'Optimized mobile experience',
          'Strong brand-oriented visual identity',
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
        description:
          'Plataformas de e-commerce pouco intuitivas impactam diretamente a conversão e a experiência do usuário.\n\nO E-commerce Ling foi desenvolvido para oferecer uma jornada de compra fluida, com catálogo dinâmico, carrinho inteligente e checkout otimizado, preparado para escalar conforme o crescimento do negócio.',
        category: 'E-Commerce',
        highlights: [
          'Catálogo de produtos dinâmico',
          'Carrinho de compras intuitivo',
          'Checkout integrado e otimizado',
          'Arquitetura preparada para escala',
        ],
      },
      en: {
        title: 'E-commerce Ling',
        description:
          'Poorly designed e-commerce platforms directly impact conversion and user experience.\n\nE-commerce Ling delivers a seamless shopping journey with a dynamic catalog, intuitive cart, and optimized checkout, built for scalability.',
        category: 'E-Commerce',
        highlights: [
          'Dynamic product catalog',
          'Intuitive shopping cart',
          'Optimized integrated checkout',
          'Scalable architecture',
        ],
      },
    },
    url: '',
    image: 'https://portfolio-mvi.vercel.app/projects/ecommerce.png',
    tags: ['E-commerce', 'Catalog', 'Checkout'],
    comingSoon: true,
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
