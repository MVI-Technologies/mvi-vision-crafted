import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Copy, Check } from 'lucide-react';
import { Project } from '@/data/projects';
import { copyToClipboard } from '@/lib/clipboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: () => void;
}

const ProjectCard = memo(function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyUrl = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleOpenProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onOpenDetails}
      className="group relative bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-muted-foreground/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image */}
      <div className="aspect-video bg-secondary relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="mono-label">Sem imagem</span>
          </div>
        )}
        
        {/* Coming Soon Badge */}
        {project.comingSoon && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">Em Breve</Badge>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="mono-sm text-muted-foreground mb-2 block">{project.category}</span>
        
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* URL Display */}
        {project.url && !project.comingSoon && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-secondary/50 rounded text-xs overflow-hidden">
            <span className="text-muted-foreground shrink-0">URL:</span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-primary hover:underline truncate flex-1"
            >
              {project.url.replace(/^https?:\/\//, '')}
            </a>
            <button
              onClick={handleCopyUrl}
              className="shrink-0 p-1 hover:bg-accent rounded transition-colors"
              title="Copiar URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {project.url && !project.comingSoon && (
            <Button
              size="sm"
              onClick={handleOpenProject}
              className="flex-1 gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir projeto
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails();
            }}
            className="gap-2"
          >
            Ver detalhes
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;
