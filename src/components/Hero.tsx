import { motion, Variants } from 'framer-motion';
const capabilities = ['Web Apps', 'Sites & Landing Pages', 'UI/UX & Design Systems', 'Branding & Identidade', 'Automação & Integrações'];
const Hero = () => {
  const containerVariants: Variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };
  return <section id="home" className="relative min-h-screen gradient-dark flex items-center overflow-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Content */}
      <div className="section-container section-spacing pt-32 md:pt-40">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl">
          {/* Main headline */}
          <div className="relative mb-12">
            <motion.h1 variants={itemVariants} className="display-xl">
              Design
            </motion.h1>
            <motion.h1 variants={itemVariants} className="display-xl">
              & Software
            </motion.h1>
            <motion.div variants={itemVariants} className="relative">
              <h1 className="display-xl">makers</h1>
              {/* Echo effect */}
              <span className="display-xl text-echo" aria-hidden="true">
                makers®
              </span>
            </motion.div>
          </div>

          {/* Capabilities list */}
          <motion.div variants={itemVariants} className="mb-12 space-y-2">
            {capabilities.map((cap, index) => <motion.p key={cap} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.6 + index * 0.1,
            duration: 0.5
          }} className="mono-sm text-muted-foreground">
                /// {cap}
              </motion.p>)}
          </motion.div>

          {/* Subheadline */}
          <motion.p variants={itemVariants} className="body-lg text-muted-foreground max-w-xl mb-12">
            Soluções digitais com propósito. Design impecável + engenharia que escala.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href="#contato" className="btn-primary">
              Falar com a MVI
            </a>
            <a href="#projetos" className="btn-outline">
              Ver projetos
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.5,
      duration: 0.5
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{
        y: [0, 8, 0]
      }} transition={{
        repeat: Infinity,
        duration: 1.5
      }} className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </motion.div>
    </section>;
};
export default Hero;