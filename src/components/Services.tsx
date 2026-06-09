import { useState, useRef, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Palette, Code2, Server, Sparkles } from 'lucide-react';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/motion';
import SectionHeading from '@/components/common/SectionHeading';

interface ServiceData {
  index: string;
  icon: typeof Palette;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  approachesKey: TranslationKey;
}

const servicesData: ServiceData[] = [
  {
    index: '001',
    icon: Palette,
    titleKey: 'services.service1.title',
    descriptionKey: 'services.service1.description',
    approachesKey: 'services.service1.approaches',
  },
  {
    index: '002',
    icon: Code2,
    titleKey: 'services.service2.title',
    descriptionKey: 'services.service2.description',
    approachesKey: 'services.service2.approaches',
  },
  {
    index: '003',
    icon: Server,
    titleKey: 'services.service3.title',
    descriptionKey: 'services.service3.description',
    approachesKey: 'services.service3.approaches',
  },
  {
    index: '004',
    icon: Sparkles,
    titleKey: 'services.service4.title',
    descriptionKey: 'services.service4.description',
    approachesKey: 'services.service4.approaches',
  },
];

const ServiceItem = memo(function ServiceItem({
  service,
  isOpen,
  onToggle,
  index,
}: {
  service: ServiceData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const { t } = useI18n();
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });
  const Icon = service.icon;

  const approaches = t(service.approachesKey).split(', ');

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT_EXPO }}
      className="group border-b border-border"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-5 py-7 text-left transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
            isOpen ? 'bg-brand-1/20 text-brand-1' : 'bg-secondary text-muted-foreground group-hover:text-foreground'
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="index-label hidden shrink-0 sm:block">({service.index})</span>

        <div className="flex-1">
          <h3
            className={`display-md text-2xl transition-all duration-300 md:text-3xl ${
              isOpen ? 'text-gradient-brand' : 'group-hover:translate-x-1'
            }`}
          >
            {t(service.titleKey)}
          </h3>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          className="shrink-0 text-muted-foreground group-hover:text-foreground"
        >
          <Plus className="h-6 w-6" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-0 sm:pl-[5.5rem]">
              <p className="body-lg mb-6 max-w-2xl text-muted-foreground">
                {t(service.descriptionKey)}
              </p>
              <div className="flex flex-wrap gap-2">
                {approaches.map((approach) => (
                  <span key={approach} className="tag">
                    {approach}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const Services = memo(function Services() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="servicos" className="section-spacing">
      <div className="section-container">
        <SectionHeading
          label={t('services.label')}
          title={t('services.title')}
          description={t('services.description')}
        />

        <div className="border-t border-border">
          {servicesData.map((service, index) => (
            <ServiceItem
              key={service.index}
              service={service}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Services;
