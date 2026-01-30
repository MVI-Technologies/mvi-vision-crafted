import { memo } from 'react';
import { useI18n, Language } from '@/i18n/LanguageProvider';

const LanguageToggle = memo(function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  const handleToggle = (newLang: Language) => {
    if (newLang !== lang) {
      setLang(newLang);
    }
  };

  return (
    <div 
      className="flex items-center gap-1 text-sm"
      role="group"
      aria-label={t('nav.selectLanguage')}
    >
      <button
        onClick={() => handleToggle('pt-BR')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          lang === 'pt-BR' 
            ? 'text-foreground font-medium' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-pressed={lang === 'pt-BR'}
        aria-label="Português (Brasil)"
      >
        PT
      </button>
      <span className="text-muted-foreground/50">/</span>
      <button
        onClick={() => handleToggle('en')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          lang === 'en' 
            ? 'text-foreground font-medium' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-pressed={lang === 'en'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
});

export default LanguageToggle;
