import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { Project } from '@/data/projects';
import { copyToClipboard } from '@/lib/clipboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = memo(function ProjectModal({ project, onClose }: ProjectModalProps) {
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
          className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-accent transition-colors z-10"
          aria-label="Fechar"
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
          <div className="mb-12">
            <span className="mono-sm text-muted-foreground mb-4 block">/ {project.category}</span>
            <h2 className="display-lg mb-4">{project.title}</h2>
            <p className="body-lg text-muted-foreground max-w-3xl">{project.description}</p>
          </div>

          {/* URL Section */}
          {project.url && !project.comingSoon && (
            <div className="mb-12 p-6 bg-secondary/30 border border-border rounded-lg">
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
            <div className="mb-12 p-6 bg-secondary/30 border border-border rounded-lg">
              <Badge variant="secondary" className="text-sm">Em Breve</Badge>
              <p className="text-muted-foreground mt-2">Este projeto ainda está em desenvolvimento.</p>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-12">
              <h4 className="mono-sm text-foreground mb-4">Destaques</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags/Stack */}
          {project.tags.length > 0 && (
            <div className="mb-12">
              <h4 className="mono-sm text-foreground mb-4">Tecnologias / Tags</h4>
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
            <div className="mb-12">
              <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
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
            <div className="flex justify-center">
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

export default ProjectModal;
