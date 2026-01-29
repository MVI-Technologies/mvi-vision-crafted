import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const bulletPoints = [
  { index: '001', text: 'Pensamos como negócio.' },
  { index: '002', text: 'Validamos rápido, escalamos com segurança.' },
  { index: '003', text: 'Design que converte, código que aguenta.' },
];

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="sobre" ref={sectionRef} className="section-spacing bg-card">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="mono-label text-muted-foreground mb-4 block">(Sobre)</span>
          <h2 className="display-lg">Sobre</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Main text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="body-lg text-muted-foreground leading-relaxed">
              A MVI Tech cria produtos digitais do zero ao lançamento — com design de alto padrão e desenvolvimento sólido. Sem complicação. Sem teatro. Só entrega.
            </p>
          </motion.div>

          {/* Strategic partner block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-l border-border pl-6">
              <h3 className="mono-sm text-foreground mb-8">Parceiro estratégico</h3>
              <div className="space-y-6">
                {bulletPoints.map((point, index) => (
                  <motion.div
                    key={point.index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className="index-label shrink-0">({point.index})</span>
                    <p className="body-md text-foreground">{point.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="divider mt-24 origin-left"
        />
      </div>
    </section>
  );
};

export default About;
