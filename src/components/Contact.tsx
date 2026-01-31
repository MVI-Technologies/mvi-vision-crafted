import { useState, useRef, memo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Linkedin, Github, Send } from 'lucide-react';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';

const projectTypeKeys: { value: string; labelKey: TranslationKey }[] = [
  { value: 'website', labelKey: 'contact.projectType.website' },
  { value: 'platform', labelKey: 'contact.projectType.platform' },
  { value: 'app', labelKey: 'contact.projectType.app' },
  { value: 'system', labelKey: 'contact.projectType.system' },
  { value: 'branding', labelKey: 'contact.projectType.branding' },
  { value: 'other', labelKey: 'contact.projectType.other' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const Contact = memo(function Contact() {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  }, [formData]);

  return (
    <section id="contato" ref={sectionRef} className="section-spacing gradient-cta">
      <div className="section-container">
        {/* CTA headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="mono-label text-muted-foreground mb-4 block">{t('contact.label')}</span>
          <h2 className="display-md max-w-3xl mx-auto">
            {t('contact.headline')}
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                placeholder={t('contact.namePlaceholder')}
                value={formData.name}
                onChange={handleChange}
                required
                className="input-editorial"
                aria-label={t('contact.nameLabel')}
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
                className="input-editorial"
                aria-label={t('contact.emailLabel')}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <input
                type="tel"
                name="phone"
                placeholder={t('contact.whatsappPlaceholder')}
                value={formData.phone}
                onChange={handleChange}
                className="input-editorial"
                aria-label={t('contact.whatsappLabel')}
              />
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="input-editorial bg-transparent cursor-pointer"
                aria-label={t('contact.projectTypeLabel')}
              >
                <option value="" disabled className="bg-background">
                  {t('contact.projectTypePlaceholder')}
                </option>
                {projectTypeKeys.map(type => (
                  <option key={type.value} value={type.value} className="bg-background">
                    {t(type.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="message"
              placeholder={t('contact.messagePlaceholder')}
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="input-editorial resize-none"
              aria-label={t('contact.messageLabel')}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="mono-label text-white order-2 sm:order-1">
                {t('contact.responseTime')}
              </span>
              <button type="submit" className="btn-primary order-1 sm:order-2 w-full sm:w-auto group">
                {t('contact.cta')}
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.form>

        {/* Social & email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 pt-12 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            {/* Social links */}
            <div className="flex items-center gap-6">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-accent hover:border-foreground/20 transition-all duration-300 hover-lift"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              className="link-underline text-muted-foreground hover:text-foreground transition-colors"
              href="mailto:mvitech.contato@gmail.com"
            >
              mvitech.contato@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Contact;
