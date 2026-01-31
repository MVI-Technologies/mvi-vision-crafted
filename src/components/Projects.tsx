import { useState, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Copy, Check } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { projects, Project } from '@/data/projects';
import { copyToClipboard } from '@/lib/clipboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ProjectRow = memo(function ProjectRow({ 
  project, 
  onOpen, 
  index 
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
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
            {project.title}
          </h3>
          <span className="mono-sm text-muted-foreground">/ {project.category}</span>
          {project.comingSoon && (
            <Badge variant="secondary" className="text-xs">Em Breve</Badge>
          )}
        </div>

        <motion.div
          animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-sm text-muted-foreground hidden sm:block line-clamp-1 max-w-[200px]">
            {project.description.slice(0, 50)}...
          </span>
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
  project: Project;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyUrl = async () => {
    if (!project.url) return;
    
    const success = await copyToClipboard(project.url);
    if (success) {
      setCopied(true);
      toast({
        title: 'URL copiada!',
        description: 'Link do projeto copiado para a área de transferência.',
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar o link.',
        variant: 'destructive',
      });
    }
  };

  const handleOpenProject = () => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

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
            <span className="mono-sm text-muted-foreground mb-4 block">/ {project.category}</span>
            <h2 className="display-lg mb-4">{project.title}</h2>
            <p className="body-lg text-muted-foreground">{project.description}</p>
          </div>

          {/* URL Section */}
          {project.url && !project.comingSoon && (
            <div className="mb-16 p-6 bg-secondary/30 border border-border rounded-lg">
              <h4 className="mono-sm text-foreground mb-4">Link do Projeto</h4>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all flex-1"
                >
                  {project.url}
                </a>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyUrl}
                    className="gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado!' : 'Copiar URL'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleOpenProject}
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir projeto
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Coming Soon Notice */}
          {project.comingSoon && (
            <div className="mb-16 p-6 bg-secondary/30 border border-border rounded-lg">
              <Badge variant="secondary" className="text-sm">Em Breve</Badge>
              <p className="text-muted-foreground mt-2">Este projeto ainda está em desenvolvimento.</p>
            </div>
          )}

          {/* Case details */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {project.highlights.map((highlight, index) => (
                <div key={index}>
                  <h4 className="mono-sm text-foreground mb-4">Destaque {index + 1}</h4>
                  <p className="body-md text-muted-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          )}

          {/* Stack */}
          {project.tags.length > 0 && (
            <div className="mb-16">
              <h4 className="mono-sm text-foreground mb-4">{t('projects.stack')}</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Image */}
          {project.image && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-gradient-to-br from-secondary to-accent rounded-lg overflow-hidden md:col-span-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          {project.url && !project.comingSoon && (
            <div className="flex justify-center mt-12">
              <Button
                size="lg"
                onClick={handleOpenProject}
                className="gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Abrir projeto
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
});

const Projects = memo(function Projects() {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleOpen = useCallback((project: Project) => {
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
            {projects.map((project, index) => (
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
