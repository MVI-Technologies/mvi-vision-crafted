import { useState, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';

interface ProjectData {
  id: number;
  name: string;
  categoryKey: TranslationKey;
  taglineKey: TranslationKey;
  problemKey: TranslationKey;
  solutionKey: TranslationKey;
  resultKey: TranslationKey;
  stack: string[];
}

const projectsData: ProjectData[] = [
  {
    id: 1,
    name: 'Atlas Operações',
    categoryKey: 'projects.category.system',
    taglineKey: 'projects.atlas.tagline',
    problemKey: 'projects.atlas.problem',
    solutionKey: 'projects.atlas.solution',
    resultKey: 'projects.atlas.result',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 2,
    name: 'Aurora Finance',
    categoryKey: 'projects.category.platform',
    taglineKey: 'projects.aurora.tagline',
    problemKey: 'projects.aurora.problem',
    solutionKey: 'projects.aurora.solution',
    resultKey: 'projects.aurora.result',
    stack: ['Next.js', 'Python', 'AWS', 'Stripe'],
  },
  {
    id: 3,
    name: 'Nexo Logistics',
    categoryKey: 'projects.category.dashboard',
    taglineKey: 'projects.nexo.tagline',
    problemKey: 'projects.nexo.problem',
    solutionKey: 'projects.nexo.solution',
    resultKey: 'projects.nexo.result',
    stack: ['React', 'Go', 'MongoDB', 'WebSockets'],
  },
  {
    id: 4,
    name: 'Vértice Saúde',
    categoryKey: 'projects.category.website',
    taglineKey: 'projects.vertice.tagline',
    problemKey: 'projects.vertice.problem',
    solutionKey: 'projects.vertice.solution',
    resultKey: 'projects.vertice.result',
    stack: ['Next.js', 'Tailwind', 'Sanity CMS'],
  },
  {
    id: 5,
    name: 'Prisma Educação',
    categoryKey: 'projects.category.app',
    taglineKey: 'projects.prisma.tagline',
    problemKey: 'projects.prisma.problem',
    solutionKey: 'projects.prisma.solution',
    resultKey: 'projects.prisma.result',
    stack: ['React Native', 'Firebase', 'Node.js'],
  },
  {
    id: 6,
    name: 'Órbita CRM',
    categoryKey: 'projects.category.system',
    taglineKey: 'projects.orbita.tagline',
    problemKey: 'projects.orbita.problem',
    solutionKey: 'projects.orbita.solution',
    resultKey: 'projects.orbita.result',
    stack: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
  },
];

const ProjectRow = memo(function ProjectRow({ 
  project, 
  onOpen, 
  index 
}: {
  project: ProjectData;
  onOpen: () => void;
  index: number;
}) {
  const { t } = useI18n();
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
          <span className="mono-sm text-muted-foreground">/ {t(project.categoryKey)}</span>
        </div>

        <motion.div
          animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-sm text-muted-foreground hidden sm:block">{t(project.taglineKey)}</span>
          <ArrowUpRight className="w-5 h-5 shrink-0" />
        </motion.div>
      </div>
    </motion.div>
  );
});

const ProjectModal = memo(function ProjectModal({ 
  project, 
  onClose 
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const { t } = useI18n();

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
          aria-label={t('chatbot.close')}
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
            <span className="mono-sm text-muted-foreground mb-4 block">/ {t(project.categoryKey)}</span>
            <h2 className="display-lg mb-4">{project.name}</h2>
            <p className="body-lg text-muted-foreground">{t(project.taglineKey)}</p>
          </div>

          {/* Case details */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="mono-sm text-foreground mb-4">{t('projects.problem')}</h4>
              <p className="body-md text-muted-foreground">{t(project.problemKey)}</p>
            </div>
            <div>
              <h4 className="mono-sm text-foreground mb-4">{t('projects.solution')}</h4>
              <p className="body-md text-muted-foreground">{t(project.solutionKey)}</p>
            </div>
            <div>
              <h4 className="mono-sm text-foreground mb-4">{t('projects.result')}</h4>
              <p className="body-md text-muted-foreground">{t(project.resultKey)}</p>
            </div>
          </div>

          {/* Stack */}
          <div className="mb-16">
            <h4 className="mono-sm text-foreground mb-4">{t('projects.stack')}</h4>
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
                <span className="mono-label">{t('projects.visual')} {i}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

const Projects = memo(function Projects() {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleOpen = useCallback((project: ProjectData) => {
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

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
            <span className="mono-label text-muted-foreground mb-4 block">{t('projects.label')}</span>
            <h2 className="display-lg">{t('projects.title')}</h2>
          </motion.div>

          {/* Projects list */}
          <div>
            {projectsData.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                onOpen={() => handleOpen(project)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
});

export default Projects;
