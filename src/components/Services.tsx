import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const services = [
  {
    index: '001',
    title: 'UI/UX & Interface',
    description: 'Interfaces que parecem simples — porque foram bem pensadas.',
    approaches: ['Design visual', 'Hierarquia', 'Componentes', 'Acessibilidade', 'Conversão'],
  },
  {
    index: '002',
    title: 'Desenvolvimento Frontend',
    description: 'Experiências rápidas, responsivas e pixel-perfect.',
    approaches: ['React/Next', 'Performance', 'Componentização', 'SEO'],
  },
  {
    index: '003',
    title: 'Backend & APIs',
    description: 'Arquitetura limpa, integrações e segurança na base.',
    approaches: ['REST', 'Autenticação', 'Banco de dados', 'Observabilidade'],
  },
  {
    index: '004',
    title: 'Branding & Identidade',
    description: 'Marca com voz, sistema visual e consistência.',
    approaches: ['Logo', 'Paleta', 'Guidelines', 'Aplicações'],
  },
];

const ServiceItem = ({ service, isOpen, onToggle, index }: {
  service: typeof services[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

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
      >
        <span className="index-label pt-1">({service.index})</span>
        <div className="flex-1">
          <h3 className="display-md group-hover:translate-x-2 transition-transform duration-300">
            {service.title}
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
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.approaches.map((approach) => (
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
};

const Services = () => {
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
          <span className="mono-label text-muted-foreground mb-4 block">(Serviços)</span>
          <h2 className="display-lg">Serviços.</h2>
        </motion.div>

        {/* Services accordion */}
        <div>
          {services.map((service, index) => (
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
};

export default Services;
