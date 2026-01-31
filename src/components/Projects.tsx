import { useState, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useI18n } from '@/i18n/LanguageProvider';
import { projects, Project } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';

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

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenDetails={() => handleOpen(project)}
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
