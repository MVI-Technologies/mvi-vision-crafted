import { useState, useRef, useMemo, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Copy, Check } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { projects, Project, ProjectKind, getProjectTranslation } from '@/data/projects';
import { copyToClipboard } from '@/lib/clipboard';
import { useToast } from '@/hooks/use-toast';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';
import SectionHeading from '@/components/common/SectionHeading';
import { cn } from '@/lib/utils';

/* --------------------------------- Card --------------------------------- */

const ProjectCard = memo(function ProjectCard({
  project,
  onOpen,
  index,
  total,
  featured = false,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
  total: number;
  featured?: boolean;
}) {
  const { t, lang } = useI18n();
  const translated = getProjectTranslation(project, lang);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: EASE_OUT_EXPO }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={translated.title}
      className={cn(
        'group gradient-border relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card outline-none transition-all duration-500',
        'hover:-translate-y-2 hover:border-brand-1/40 hover:shadow-[0_30px_80px_-30px_hsl(var(--brand-1)/0.45)]',
        'focus-visible:ring-2 focus-visible:ring-brand-1/60',
        featured && 'sm:col-span-2 lg:row-span-2'
      )}
    >
      {/* Image */}
      <div className={cn('relative overflow-hidden', featured ? 'aspect-[16/11]' : 'aspect-[16/10]')}>
        {project.image ? (
          <img
            src={project.image}
            alt={translated.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[800ms] ease-out group-hover:scale-[1.07]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-accent">
            <span className="font-display text-5xl font-bold text-muted-foreground/30">
              {translated.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {/* Brand tint on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-1/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Editorial index */}
        <span className="absolute right-5 top-4 font-mono text-xs font-medium text-foreground/60">
          {String(index + 1).padStart(2, '0')}
          <span className="text-foreground/30">/{String(total).padStart(2, '0')}</span>
        </span>

        {/* Hover CTA pill */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-sm font-medium">
            {t('projects.viewCase')}
            <ArrowUpRight className="h-4 w-4 text-brand-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={cn('flex flex-1 flex-col p-6', featured && 'md:p-8')}>
        <div className="flex items-center gap-2.5">
          <span className="h-px w-7 bg-gradient-to-r from-brand-1 to-brand-2" />
          <span className="mono-sm text-brand-1/90">{translated.category}</span>
        </div>
        <h3
          className={cn(
            'mt-3 font-display font-semibold tracking-tight transition-colors duration-300 group-hover:text-brand-1',
            featured ? 'text-2xl md:text-4xl' : 'text-xl'
          )}
        >
          {translated.title}
        </h3>
        <p
          className={cn(
            'mt-3 text-sm text-muted-foreground',
            featured ? 'line-clamp-3 md:text-base' : 'line-clamp-2'
          )}
        >
          {translated.description.replace(/\n+/g, ' ')}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, featured ? 6 : 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
});

/* -------------------------------- Modal --------------------------------- */

const ProjectModal = memo(function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const translated = getProjectTranslation(project, lang);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Lock scroll + close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleCopyUrl = async () => {
    if (!project.url) return;
    const success = await copyToClipboard(project.url);
    if (success) {
      setCopied(true);
      toast({
        title: lang === 'pt-BR' ? 'URL copiada!' : 'URL copied!',
        description:
          lang === 'pt-BR'
            ? 'Link do projeto copiado para a área de transferência.'
            : 'Project link copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: lang === 'pt-BR' ? 'Erro ao copiar' : 'Copy error',
        description: lang === 'pt-BR' ? 'Não foi possível copiar o link.' : 'Could not copy the link.',
        variant: 'destructive',
      });
    }
  };

  const openProject = () => {
    if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 backdrop-blur-lg"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={translated.title}
    >
      <button
        onClick={onClose}
        className="fixed right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full glass-strong transition-colors hover:text-brand-1"
        aria-label={t('chatbot.close')}
      >
        <X className="h-5 w-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
        className="section-container py-24"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="mono-sm text-brand-1">/ {translated.category}</span>
          <h2 className="display-lg mt-4 mb-6">{translated.title}</h2>
          {project.url && !project.comingSoon && (
            <div className="flex flex-wrap gap-3">
              <button onClick={openProject} className="btn-accent">
                <ExternalLink className="h-4 w-4" />
                {t('projects.viewLive')}
              </button>
              <button onClick={handleCopyUrl} className="btn-outline">
                {copied ? <Check className="h-4 w-4 text-brand-1" /> : <Copy className="h-4 w-4" />}
                {t('projects.copyLink')}
              </button>
            </div>
          )}
        </div>

        {/* Image */}
        {project.image && (
          <div className="mb-12 overflow-hidden rounded-xl border border-border gradient-border">
            <img src={project.image} alt={translated.title} className="w-full object-cover" />
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Description */}
          <div className="lg:col-span-2">
            {translated.description.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="body-lg mb-5 text-muted-foreground">
                {para}
              </p>
            ))}
          </div>

          {/* Sidebar: highlights + stack */}
          <div className="space-y-10">
            {translated.highlights && translated.highlights.length > 0 && (
              <div>
                <h4 className="mono-sm mb-5 text-foreground">{t('projects.highlights')}</h4>
                <ul className="space-y-3">
                  {translated.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-1" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.tags.length > 0 && (
              <div>
                <h4 className="mono-sm mb-5 text-foreground">{t('projects.stack')}</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.comingSoon && (
              <div className="rounded-lg border border-border bg-secondary/30 p-5">
                <p className="text-sm text-muted-foreground">
                  {lang === 'pt-BR'
                    ? 'Este projeto ainda está em desenvolvimento.'
                    : 'This project is still in development.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ------------------------------- Section -------------------------------- */

const Projects = memo(function Projects() {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeKind, setActiveKind] = useState<'all' | ProjectKind>('all');

  const filters: { value: 'all' | ProjectKind; label: string }[] = [
    { value: 'all', label: t('projects.allTags') },
    { value: 'system', label: t('projects.kindSystems') },
    { value: 'landing', label: t('projects.kindLanding') },
  ];

  // Data is authored chronologically (oldest first). We surface the most
  // recently added landing pages first; systems keep their authored order,
  // with the featured one at the front. New landings added to the end of the
  // data file therefore appear at the top automatically.
  const { systems, landings } = useMemo(
    () => ({
      systems: projects.filter((p) => p.kind === 'system'),
      landings: projects.filter((p) => p.kind === 'landing').slice().reverse(),
    }),
    []
  );

  const filtered = useMemo(() => {
    if (activeKind === 'system') return systems;
    if (activeKind === 'landing') return landings;
    return [...systems, ...landings];
  }, [activeKind, systems, landings]);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section id="projetos" className="section-spacing bg-card relative overflow-hidden">
        <div
          className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--brand-1) / 0.3), transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="section-container relative">
          <SectionHeading
            label={t('projects.label')}
            title={t('projects.title')}
            description={t('projects.description')}
          />

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="mb-12 flex flex-wrap gap-2"
            role="tablist"
            aria-label={t('projects.title')}
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                role="tab"
                aria-selected={activeKind === filter.value}
                onClick={() => setActiveKind(filter.value)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
                  activeKind === filter.value
                    ? 'bg-foreground text-background shadow-lg shadow-foreground/10'
                    : 'border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                )}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid auto-rows-auto gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  total={filtered.length}
                  featured={activeKind === 'all' && index === 0}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">{t('projects.empty')}</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
});

export default Projects;
