import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/motion';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { labelKey: 'nav.home' as const, href: '#home', id: 'home' },
  { labelKey: 'nav.about' as const, href: '#sobre', id: 'sobre' },
  { labelKey: 'nav.services' as const, href: '#servicos', id: 'servicos' },
  { labelKey: 'nav.projects' as const, href: '#projetos', id: 'projetos' },
  { labelKey: 'nav.contact' as const, href: '#contato', id: 'contato' },
];

const Navbar = memo(function Navbar() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-strong border-b border-border' : ''
        }`}
      >
        <div className="section-container">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-2" aria-label="MVI Tech">
              <span className="font-display text-xl font-bold tracking-tight">MVI</span>
              <span className="mono-sm text-muted-foreground transition-colors group-hover:text-brand-1">
                Tech
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((link, index) => {
                const active = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm transition-colors duration-300 ${
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="mono-label mr-1 opacity-40">
                      ({String(index + 1).padStart(2, '0')})
                    </span>
                    {t(link.labelKey)}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-brand-1 to-brand-2"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
              <LanguageToggle />
              <ThemeToggle />
              <a href="#contato" className="btn-accent !px-5 !py-2.5 text-xs group">
                {t('nav.cta')}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-4 md:hidden">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-px w-6 bg-foreground"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-px w-6 bg-foreground"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-px w-6 bg-foreground"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-strong md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.08 }}
                  className="font-display text-3xl font-semibold transition-colors hover:text-brand-1"
                >
                  <span className="mono-label mr-2 text-muted-foreground">
                    ({String(index + 1).padStart(2, '0')})
                  </span>
                  {t(link.labelKey)}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="btn-accent mt-4"
              >
                {t('nav.cta')}
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
