import { motion } from 'framer-motion';
import { memo } from 'react';
import { useI18n } from '@/i18n/LanguageProvider';

const Footer = memo(function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <span className="font-bold text-lg tracking-tight">MVI Tech</span>
            <span className="mono-label text-muted-foreground">{t('footer.copyright')}</span>
          </motion.div>

          {/* Minimal tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mono-label text-muted-foreground"
          >
            {t('footer.tagline')}
          </motion.p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
