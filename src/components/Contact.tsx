import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Linkedin, Github, Send } from 'lucide-react';
const projectTypes = [{
  value: '',
  label: 'Tipo de projeto'
}, {
  value: 'website',
  label: 'Website'
}, {
  value: 'plataforma',
  label: 'Plataforma'
}, {
  value: 'app',
  label: 'App'
}, {
  value: 'sistema',
  label: 'Sistema'
}, {
  value: 'branding',
  label: 'Branding'
}, {
  value: 'outro',
  label: 'Outro'
}];
const socialLinks = [{
  icon: Instagram,
  href: '#',
  label: 'Instagram'
}, {
  icon: Linkedin,
  href: '#',
  label: 'LinkedIn'
}, {
  icon: Github,
  href: '#',
  label: 'GitHub'
}];
const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };
  return <section id="contato" ref={sectionRef} className="section-spacing gradient-cta">
      <div className="section-container">
        {/* CTA headline */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }} className="text-center mb-16">
          <span className="mono-label text-muted-foreground mb-4 block">(Contato)</span>
          <h2 className="display-md max-w-3xl mx-auto">
            Sua próxima entrega começa numa conversa.
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }} onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required className="input-editorial" />
              <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required className="input-editorial" />
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <input type="tel" name="phone" placeholder="WhatsApp / Contato" value={formData.phone} onChange={handleChange} className="input-editorial" />
              <select name="projectType" value={formData.projectType} onChange={handleChange} required className="input-editorial bg-transparent cursor-pointer">
                {projectTypes.map(type => <option key={type.value} value={type.value} className="bg-background">
                    {type.label}
                  </option>)}
              </select>
            </div>

            <textarea name="message" placeholder="Conte um pouco sobre o projeto" value={formData.message} onChange={handleChange} rows={4} required className="input-editorial resize-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="mono-label text-muted-foreground order-2 sm:order-1">
                Respondemos em até 48 horas.
              </span>
              <button type="submit" className="btn-primary order-1 sm:order-2 w-full sm:w-auto group">
                Vamos criar
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.form>

        {/* Social & email */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }} className="mt-24 pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            {/* Social links */}
            <div className="flex items-center gap-6">
              {socialLinks.map(social => <a key={social.label} href={social.href} aria-label={social.label} className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-accent hover:border-foreground/20 transition-all duration-300 hover-lift">
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>

            {/* Email */}
            <a className="link-underline text-muted-foreground hover:text-foreground transition-colors" href="mvitech.contato@gmail.com">
              mvitech.contato@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Contact;