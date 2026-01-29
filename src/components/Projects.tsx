import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Atlas Operações',
    category: 'Sistema',
    tagline: 'Gestão operacional para indústrias de grande porte.',
    problem: 'Processos fragmentados em planilhas e sistemas legados, gerando retrabalho e falta de visibilidade.',
    solution: 'Plataforma unificada com dashboards em tempo real, automação de workflows e integrações com ERPs existentes.',
    result: 'Redução expressiva no tempo de operação e maior previsibilidade nas entregas.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 2,
    name: 'Aurora Finance',
    category: 'Plataforma',
    tagline: 'Fintech para gestão de recebíveis.',
    problem: 'Empresas sem acesso rápido a antecipação de recebíveis e análise de crédito.',
    solution: 'Plataforma white-label para bancos e fintechs, com motor de análise de risco e integração bancária.',
    result: 'Aumento significativo na velocidade de onboarding e aprovação de operações.',
    stack: ['Next.js', 'Python', 'AWS', 'Stripe'],
  },
  {
    id: 3,
    name: 'Nexo Logistics',
    category: 'Dashboard',
    tagline: 'Visibilidade total da cadeia logística.',
    problem: 'Falta de rastreabilidade e comunicação entre transportadoras, armazéns e clientes finais.',
    solution: 'Dashboard integrado com tracking em tempo real, alertas automatizados e relatórios de performance.',
    result: 'Melhoria na satisfação do cliente final e redução de ocorrências.',
    stack: ['React', 'Go', 'MongoDB', 'WebSockets'],
  },
  {
    id: 4,
    name: 'Vértice Saúde',
    category: 'Website',
    tagline: 'Presença digital para rede de clínicas.',
    problem: 'Site desatualizado, baixa conversão e dificuldade de agendamento online.',
    solution: 'Redesign completo com foco em conversão, integração com sistema de agendamento e SEO técnico.',
    result: 'Crescimento consistente em agendamentos via site e melhor posicionamento orgânico.',
    stack: ['Next.js', 'Tailwind', 'Sanity CMS'],
  },
  {
    id: 5,
    name: 'Prisma Educação',
    category: 'App',
    tagline: 'Plataforma de ensino adaptativo.',
    problem: 'Conteúdo educacional genérico que não atendia às necessidades individuais dos alunos.',
    solution: 'App mobile com trilhas personalizadas, gamificação e acompanhamento de progresso para pais e professores.',
    result: 'Engajamento elevado e melhora nos indicadores de aprendizagem.',
    stack: ['React Native', 'Firebase', 'Node.js'],
  },
  {
    id: 6,
    name: 'Órbita CRM',
    category: 'Sistema',
    tagline: 'CRM para times de vendas B2B.',
    problem: 'Vendedores perdiam oportunidades por falta de organização e follow-ups esquecidos.',
    solution: 'CRM intuitivo com automação de follow-up, scoring de leads e integração com e-mail e WhatsApp.',
    result: 'Aumento na taxa de conversão e ciclo de vendas mais curto.',
    stack: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
  },
];

const ProjectRow = ({ project, onOpen, index }: {
  project: typeof projects[0];
  onOpen: () => void;
  index: number;
}) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      className="group border-b border-border py-6 cursor-pointer hover:bg-accent/30 transition-colors duration-300 px-4 -mx-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-baseline gap-4 flex-wrap">
          <h3 className="text-xl md:text-2xl font-semibold group-hover:translate-x-2 transition-transform duration-300">
            {project.name}
          </h3>
          <span className="mono-sm text-muted-foreground">/ {project.category}</span>
        </div>

        <motion.div
          animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-sm text-muted-foreground hidden sm:block">{project.tagline}</span>
          <ArrowUpRight className="w-5 h-5 shrink-0" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: {
  project: typeof projects[0];
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-y-auto"
    >
      <div className="min-h-screen section-container py-24">
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16">
            <span className="mono-sm text-muted-foreground mb-4 block">/ {project.category}</span>
            <h2 className="display-lg mb-4">{project.name}</h2>
            <p className="body-lg text-muted-foreground">{project.tagline}</p>
          </div>

          {/* Case details */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="mono-sm text-foreground mb-4">Problema</h4>
              <p className="body-md text-muted-foreground">{project.problem}</p>
            </div>
            <div>
              <h4 className="mono-sm text-foreground mb-4">Solução</h4>
              <p className="body-md text-muted-foreground">{project.solution}</p>
            </div>
            <div>
              <h4 className="mono-sm text-foreground mb-4">Resultado</h4>
              <p className="body-md text-muted-foreground">{project.result}</p>
            </div>
          </div>

          {/* Stack */}
          <div className="mb-16">
            <h4 className="mono-sm text-foreground mb-4">Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Mock images */}
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-video bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center ${
                  i === 3 ? 'md:col-span-2' : ''
                }`}
              >
                <span className="mono-label">Visual {i}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <>
      <section id="projetos" ref={sectionRef} className="section-spacing bg-card">
        <div className="section-container">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="mono-label text-muted-foreground mb-4 block">(Projetos)</span>
            <h2 className="display-lg">Projetos</h2>
          </motion.div>

          {/* Projects list */}
          <div>
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                onOpen={() => setSelectedProject(project)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
