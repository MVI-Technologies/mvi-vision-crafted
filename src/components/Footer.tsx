import { motion } from 'framer-motion';
const Footer = () => {
  return <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & copyright */}
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} transition={{
          duration: 0.5
        }} className="flex items-center gap-4">
            <span className="font-bold text-lg tracking-tight">MVI Tech</span>
            
          </motion.div>

          {/* Minimal tagline */}
          <motion.p initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="mono-label text-muted-foreground">
            Design & Software makers
          </motion.p>
        </div>
      </div>
    </footer>;
};
export default Footer;