import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Linkedin, Github } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { viewportOnce } from '@/lib/motion';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const navLinks = [
  { labelKey: 'nav.home' as const, href: '#home' },
  { labelKey: 'nav.about' as const, href: '#sobre' },
  { labelKey: 'nav.services' as const, href: '#servicos' },
  { labelKey: 'nav.projects' as const, href: '#projetos' },
  { labelKey: 'nav.contact' as const, href: '#contato' },
];

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const Footer = memo(function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div className="section-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight">MVI</span>
              <span className="mono-sm text-muted-foreground">Tech</span>
            </div>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">{t('footer.tagline')}</p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-1/40 hover:text-brand-1"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="https://wa.me/5544999641464"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/50 hover:text-[#25D366]"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="mono-label mb-5 text-muted-foreground">{t('footer.navTitle')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="mono-label mb-5 text-muted-foreground">{t('footer.contactTitle')}</h4>
            <a
              href="mailto:mvitech.contato@gmail.com"
              className="link-underline mb-3 block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              mvitech.contato@gmail.com
            </a>
            <a
              href="https://wa.me/5544999641464"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              +55 44 99964-1464
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="mono-label text-muted-foreground">
            {t('footer.copyright')} · {t('footer.rights')}
          </p>
          <p className="mono-label text-muted-foreground">{t('footer.madeWith')}</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1 }}
        className="pointer-events-none select-none px-6 pb-4"
        aria-hidden="true"
      >
        <h2 className="text-gradient bg-clip-text text-center font-display text-[18vw] font-bold leading-none tracking-tighter opacity-[0.04]">
          MVI Tech
        </h2>
      </motion.div>
    </footer>
  );
});

export default Footer;
