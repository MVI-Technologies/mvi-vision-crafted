import { useState, useRef, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';

interface ServiceData {
  index: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  approachesKey: TranslationKey;
}

const servicesData: ServiceData[] = [
  {
    index: '001',
    titleKey: 'services.service1.title',
    descriptionKey: 'services.service1.description',
    approachesKey: 'services.service1.approaches',
  },
  {
    index: '002',
    titleKey: 'services.service2.title',
    descriptionKey: 'services.service2.description',
    approachesKey: 'services.service2.approaches',
  },
  {
    index: '003',
    titleKey: 'services.service3.title',
    descriptionKey: 'services.service3.description',
    approachesKey: 'services.service3.approaches',
  },
  {
    index: '004',
    titleKey: 'services.service4.title',
    descriptionKey: 'services.service4.description',
    approachesKey: 'services.service4.approaches',
  },
];

const ServiceItem = memo(function ServiceItem({ 
  service, 
  isOpen, 
  onToggle, 
  index 
}: {
  service: ServiceData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const { t } = useI18n();
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  const approaches = t(service.approachesKey).split(', ');

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-b border-border"
    >
      <button
        onClick={onToggle}
        className="w-full py-8 flex items-start gap-6 text-left group hover:bg-accent/30 transition-colors duration-300 px-4 -mx-4"
        aria-expanded={isOpen}
      >
        <span className="index-label pt-1">({service.index})</span>
        <div className="flex-1">
          <h3 className="display-md group-hover:translate-x-2 transition-transform duration-300">
            {t(service.titleKey)}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="pt-2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-16 pr-4">
              <p className="body-lg text-muted-foreground mb-6">
                {t(service.descriptionKey)}
              </p>
              <div className="flex flex-wrap gap-2">
                {approaches.map((approach) => (
                  <span
                    key={approach}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                  >
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="servicos" ref={sectionRef} className="section-spacing">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="mono-label text-muted-foreground mb-4 block">{t('services.label')}</span>
          <h2 className="display-lg">{t('services.title')}</h2>
        </motion.div>

        {/* Services accordion */}
        <div>
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
