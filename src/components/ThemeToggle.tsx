import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/theme/ThemeProvider';
import { useI18n } from '@/i18n/LanguageProvider';

/**
 * Light/dark theme switch. Animated sun/moon icon, persists via ThemeProvider.
 */
const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-accent/50 hover:text-foreground"
      aria-label={t('nav.toggleTheme')}
      title={isDark ? t('nav.lightMode') : t('nav.darkMode')}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
});

export default ThemeToggle;
