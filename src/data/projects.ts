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

/** Project category used to split the portfolio into "Systems" and "Landing Pages". */
export type ProjectKind = 'system' | 'landing';

export interface Project {
  id: string;
  kind: ProjectKind;
  translations: Record<Language, ProjectTranslation>;
  url: string;
  image?: string;
  tags: string[];
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: 'vitrine-storefront',
    kind: 'system',
    translations: {
      'pt-BR': {
        title: 'Vitrine Storefront',
        description:
          'Negócios brasileiros que levam vendas a sério precisam de mais do que um perfil em marketplace: precisam de uma loja própria, sem mensalidades de plataforma, sem comissão por venda e sem limite de produtos.\n\nA Vitrine é uma plataforma de loja virtual onde cada loja opera no seu próprio endereço, com identidade visual própria, checkout completo e painel administrativo dedicado. O resultado é uma operação de e-commerce independente, escalável e totalmente sob controle do lojista.',
        category: 'Plataforma de E-commerce',
        highlights: [
          'Loja própria com endereço e identidade visual exclusivos',
          'Checkout completo e integrado',
          'Painel administrativo dedicado para cada loja',
          'Sem mensalidade, sem comissão e sem limite de produtos',
        ],
      },
      en: {
        title: 'Vitrine Storefront',
        description:
          'Brazilian businesses that take sales seriously need more than a marketplace listing: they need their own store, with no platform fees, no per-sale commission, and no product limits.\n\nVitrine is an online store platform where each shop runs on its own address, with its own visual identity, a full checkout, and a dedicated admin dashboard. The result is an independent, scalable e-commerce operation fully under the merchant’s control.',
        category: 'E-commerce Platform',
        highlights: [
          'Own store with a dedicated address and visual identity',
          'Full integrated checkout',
          'Dedicated admin dashboard per store',
          'No monthly fees, no commission, no product limits',
        ],
      },
    },
    image: '/vitrine-storefront.png',
    url: 'https://vitrine-storefront.vercel.app/',
    tags: ['E-commerce', 'Storefront', 'Checkout', 'SaaS'],
  },
  {
    id: 'mfl-distribuidora',
    kind: 'system',
    translations: {
      'pt-BR': {
        title: 'MFL Distribuidora',
        description:
          'Distribuidoras que vendem no atacado precisam de mais do que uma loja comum: o catálogo é restrito a clientes cadastrados, os preços variam por perfil e a atualização de produtos precisa ser ágil — sem retrabalho manual a cada nova tabela.\n\nA MFL Distribuidora é um e-commerce B2B de produtos naturais com acesso restrito por login, painel administrativo completo e um catálogo interativo. O grande diferencial é a importação de catálogos em PDF, que transforma tabelas e listas em produtos prontos para venda, acelerando a operação e mantendo o portfólio sempre atualizado.',
        category: 'E-commerce B2B / Distribuição',
        highlights: [
          'Catálogo restrito a clientes cadastrados',
          'Painel administrativo completo',
          'Catálogo interativo de produtos',
          'Importação de catálogos via PDF',
        ],
      },
      en: {
        title: 'MFL Distribuidora',
        description:
          'Wholesale distributors need more than a regular store: the catalog is restricted to registered clients, prices vary by profile, and product updates must be fast — with no manual rework for every new price list.\n\nMFL Distribuidora is a B2B e-commerce for natural products with login-restricted access, a full admin dashboard, and an interactive catalog. Its standout feature is PDF catalog import, turning tables and lists into ready-to-sell products, speeding up operations and keeping the portfolio always up to date.',
        category: 'B2B E-commerce / Distribution',
        highlights: [
          'Catalog restricted to registered clients',
          'Full admin dashboard',
          'Interactive product catalog',
          'PDF catalog import',
        ],
      },
    },
    image: '/mfl-distribuidora.png',
    url: 'https://mfldistribuidora.com.br/',
    tags: ['E-commerce', 'B2B', 'Admin Panel', 'PDF Import'],
  },
  {
      id: 'artea-joias',
      kind: 'system',
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
  image: '/artea-joias.png',
  url: 'https://www.grupoaadecomprascoletivas.site/login', // ajuste se necessário
  tags: ['E-commerce', 'B2C', 'Collective Buying', 'Reports'],
},
{
  id: 'dyque-daya-registros',
  kind: 'system',
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
  image: '/dyque-daya-registros.png',
  url: 'https://imberio-motor-hub.vercel.app/login',
  tags: ['Management System', 'Budgets', 'Technical Reports', 'Operations'],
},
{
    id: 'mediconnect',
    kind: 'system',
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
    kind: 'system',
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
    kind: 'landing',
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
    kind: 'landing',
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
    kind: 'landing',
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
    id: 'conquista-imoveis',
    kind: 'landing',
    translations: {
      'pt-BR': {
        title: 'Conquista Imóveis',
        description:
          'Comprar o primeiro imóvel assusta: medo de taxas escondidas, dúvidas sobre financiamento e a sensação de estar preso ao aluguel sem saída.\n\nA landing page do corretor Thiago Silva foi construída para destravar essa jornada, mostrando de forma clara como sair do aluguel usando subsídios do Minha Casa Minha Vida e o FGTS. Com simulação de financiamento da Caixa sem compromisso e foco em conversão, a página transforma o sonho da casa própria em um próximo passo concreto.',
        category: 'Imobiliário / Consultoria',
        highlights: [
          'Foco em quem busca o primeiro imóvel',
          'Orientação sobre Minha Casa Minha Vida e FGTS',
          'Simulação de financiamento sem compromisso',
          'Estrutura objetiva e voltada à conversão',
        ],
      },
      en: {
        title: 'Conquista Imóveis',
        description:
          'Buying a first home is intimidating: hidden-fee fears, financing doubts, and the feeling of being stuck renting with no way out.\n\nThis landing page for real-estate advisor Thiago Silva was built to unlock that journey, clearly showing how to leave renting behind using Minha Casa Minha Vida subsidies and FGTS funds. With a no-commitment Caixa financing simulation and a conversion-focused layout, it turns the dream of homeownership into a concrete next step.',
        category: 'Real Estate / Advisory',
        highlights: [
          'Focused on first-time home buyers',
          'Guidance on Minha Casa Minha Vida and FGTS',
          'No-commitment financing simulation',
          'Objective, conversion-driven structure',
        ],
      },
    },
    image: '/conquista-imoveis.png',
    url: 'https://conquista-imoveis.vercel.app/',
    tags: ['Landing Page', 'Real Estate', 'Conversion'],
  },
  {
    id: 'otakai-store',
    kind: 'landing',
    translations: {
      'pt-BR': {
        title: 'Otakai Store',
        description:
          'Lojas de nicho otaku competem por atenção e confiança: o colecionador quer curadoria de verdade, segurança na embalagem e um canal direto para encomendar títulos raros.\n\nA landing page da Otakai Store apresenta o catálogo de mangás (Shonen, Seinen, importados e boxes exclusivos) com identidade visual forte, prova social e pedidos diretos via WhatsApp. O resultado é uma vitrine que comunica paixão pelo universo dos mangás e converte visitantes em compradores.',
        category: 'Varejo / Cultura Otaku',
        highlights: [
          'Catálogo segmentado por gênero e coleção',
          'Encomenda direta via WhatsApp',
          'Prova social com depoimentos de colecionadores',
          'Identidade visual imersiva no universo otaku',
        ],
      },
      en: {
        title: 'Otakai Store',
        description:
          'Niche otaku stores compete for attention and trust: collectors want real curation, safe packaging, and a direct channel to order rare titles.\n\nThe Otakai Store landing page showcases its manga catalog (Shonen, Seinen, imports, and exclusive boxes) with a bold visual identity, social proof, and direct WhatsApp ordering. The result is a storefront that conveys passion for the manga universe and turns visitors into buyers.',
        category: 'Retail / Otaku Culture',
        highlights: [
          'Catalog segmented by genre and collection',
          'Direct ordering via WhatsApp',
          'Social proof from collector testimonials',
          'Immersive otaku-themed visual identity',
        ],
      },
    },
    image: '/otakai-store.png',
    url: 'https://loja-de-mangas.vercel.app/',
    tags: ['Landing Page', 'Retail', 'WhatsApp'],
  },
  {
    id: 'montenegro-trabalhista',
    kind: 'landing',
    translations: {
      'pt-BR': {
        title: 'Montenegro Advocacia Trabalhista',
        description:
          'Trabalhadores que enfrentam demissões abusivas, horas extras não pagas ou assédio muitas vezes não sabem se têm direitos — e desistem por falta de orientação clara e confiável.\n\nA landing page do advogado Marcos Montenegro comunica autoridade e segurança, detalhando especialidades como reversão de justa causa, horas extras, reconhecimento de vínculo e assédio. Com avaliação de viabilidade do caso e contato direto, a página gera leads qualificados com sigilo e credibilidade.',
        category: 'Advocacia / Direito do Trabalho',
        highlights: [
          'Especialidades trabalhistas bem definidas',
          'Avaliação de viabilidade do caso',
          'Comunicação de autoridade e sigilo',
          'Captação de leads via formulário e WhatsApp',
        ],
      },
      en: {
        title: 'Montenegro Labor Law',
        description:
          'Workers facing wrongful dismissals, unpaid overtime, or harassment often don’t know whether they have a case — and give up for lack of clear, trustworthy guidance.\n\nThis landing page for attorney Marcos Montenegro conveys authority and reassurance, detailing specialties like just-cause reversal, overtime, employment recognition, and harassment. With a case-viability assessment and direct contact, it generates qualified leads with confidentiality and credibility.',
        category: 'Law / Labor Rights',
        highlights: [
          'Clearly defined labor-law specialties',
          'Case viability assessment',
          'Authority- and confidentiality-driven messaging',
          'Lead capture via form and WhatsApp',
        ],
      },
    },
    image: '/montenegro-trabalhista.png',
    url: 'https://landing-adv-trabalhista.vercel.app/',
    tags: ['Landing Page', 'Legal', 'Lead Gen'],
  },
  {
    id: 'marcondes-previdenciario',
    kind: 'landing',
    translations: {
      'pt-BR': {
        title: 'Marcondes & Associados',
        description:
          'O segurado do INSS enfrenta um sistema complexo: benefícios negados, cálculos errados e regras de aposentadoria que mudam constantemente.\n\nA landing page do escritório Marcondes & Associados posiciona a banca como referência em Direito Previdenciário, apresentando soluções de planejamento, aposentadorias, revisão de benefícios e BPC/LOAS. Com números de autoridade, processo transparente e atendimento nacional digital, a página converte com confiança e profissionalismo.',
        category: 'Advocacia / Direito Previdenciário',
        highlights: [
          'Soluções para cada etapa previdenciária',
          'Indicadores de autoridade e resultados',
          'Processo de atendimento transparente',
          'Atendimento digital em todo o Brasil',
        ],
      },
      en: {
        title: 'Marcondes & Associados',
        description:
          'INSS beneficiaries face a complex system: denied benefits, miscalculations, and constantly changing retirement rules.\n\nThis landing page positions Marcondes & Associados as a reference in Brazilian social-security law, presenting planning, retirement, benefit-review, and BPC/LOAS solutions. With authority metrics, a transparent process, and nationwide digital service, it converts with confidence and professionalism.',
        category: 'Law / Social Security',
        highlights: [
          'Solutions for every social-security stage',
          'Authority and results metrics',
          'Transparent client process',
          'Nationwide digital service',
        ],
      },
    },
    image: '/marcondes-previdenciario.png',
    url: 'https://landing-adv-previdenciario.vercel.app/',
    tags: ['Landing Page', 'Legal', 'Institutional'],
  },
  {
    id: 'martins-criminal',
    kind: 'landing',
    translations: {
      'pt-BR': {
        title: 'Martins S.A. Advocacia Criminal',
        description:
          'Executivos e empresas sob investigação precisam de defesa técnica imediata, discrição absoluta e uma presença digital que transmita peso institucional.\n\nA landing page da Martins S.A. projeta sofisticação e autoridade na advocacia criminal de alta complexidade, com foco em crimes econômicos e atuação em tribunais superiores. O design sóbrio e o discurso de sigilo reforçam a credibilidade necessária para um público corporativo exigente.',
        category: 'Advocacia / Direito Criminal',
        highlights: [
          'Posicionamento premium em advocacia criminal',
          'Foco em crimes econômicos e tribunais superiores',
          'Discurso de sigilo e defesa estratégica',
          'Design sóbrio para público corporativo',
        ],
      },
      en: {
        title: 'Martins S.A. Criminal Law',
        description:
          'Executives and companies under investigation need immediate technical defense, absolute discretion, and a digital presence that conveys institutional weight.\n\nThe Martins S.A. landing page projects sophistication and authority in high-complexity criminal defense, focused on economic crimes and higher-court litigation. Its sober design and confidentiality-driven messaging reinforce the credibility required by a demanding corporate audience.',
        category: 'Law / Criminal Defense',
        highlights: [
          'Premium positioning in criminal defense',
          'Focus on economic crimes and higher courts',
          'Confidentiality and strategic-defense messaging',
          'Sober design for a corporate audience',
        ],
      },
    },
    image: '/martins-criminal.png',
    url: 'https://legal-vision-lab.vercel.app/',
    tags: ['Landing Page', 'Legal', 'Institutional'],
  },
  {
    id: 'cantata-ia',
    kind: 'landing',
    translations: {
      'pt-BR': {
        title: 'CantataIA',
        description:
          'Presentear de forma única é difícil: presentes genéricos não traduzem sentimentos nem histórias pessoais.\n\nA CantataIA resolve isso transformando memórias em músicas personalizadas geradas por inteligência artificial — letra, melodia e voz em poucos minutos. A landing page guia o visitante pelo funcionamento, exemplos e planos, com forte apelo emocional e uma estrutura clara de conversão para a criação da música.',
        category: 'Produto Digital / IA',
        highlights: [
          'Proposta de valor emocional e clara',
          'Explicação do fluxo em três passos',
          'Planos com preços transparentes',
          'Prova social e exemplos de músicas',
        ],
      },
      en: {
        title: 'CantataIA',
        description:
          'Giving a truly unique gift is hard: generic presents fail to capture feelings and personal stories.\n\nCantataIA solves this by turning memories into personalized songs generated by AI — lyrics, melody, and voice in minutes. The landing page walks visitors through how it works, examples, and pricing, with strong emotional appeal and a clear conversion path to create the song.',
        category: 'Digital Product / AI',
        highlights: [
          'Clear, emotional value proposition',
          'Three-step process explanation',
          'Transparent pricing plans',
          'Social proof and song examples',
        ],
      },
    },
    image: '/cantata-ia.png',
    url: 'https://melody-ai.vercel.app/',
    tags: ['Landing Page', 'AI', 'Conversion'],
  },

  {
    id: 'ecommerce-ling',
    kind: 'system',
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
