import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Github, Send, Mail, Clock } from 'lucide-react';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';
import { useToast } from '@/hooks/use-toast';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';

const WHATSAPP_NUMBER = '5544999641464';
const EMAIL = 'mvitech.contato@gmail.com';

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

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = { name: '', email: '', phone: '', projectType: '', message: '' };

const Contact = memo(function Contact() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback((data: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = t('contact.validation.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = t('contact.validation.email');
    if (!data.projectType) next.projectType = t('contact.validation.projectType');
    if (data.message.trim().length < 10) next.message = t('contact.validation.message');
    return next;
  }, [t]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => (prev[name as keyof FormState] ? { ...prev, [name]: undefined } : prev));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const found = validate(formData);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        return;
      }
      setSubmitting(true);

      // No backend wired yet — hand off to WhatsApp with a prefilled message.
      const typeLabel =
        projectTypeKeys.find((p) => p.value === formData.projectType)?.labelKey;
      const text = encodeURIComponent(
        `${formData.name}\n${typeLabel ? t(typeLabel) : ''}\n\n${formData.message}\n\n${formData.email}${
          formData.phone ? ` · ${formData.phone}` : ''
        }`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');

      toast({ title: t('contact.successTitle'), description: t('contact.successMessage') });
      setFormData(initialForm);
      setSubmitting(false);
    },
    [formData, validate, t, toast]
  );

  const fieldClass = (field: keyof FormState) =>
    cn('input-editorial', errors[field] && 'border-destructive focus:border-destructive');

  return (
    <section id="contato" className="section-spacing gradient-cta">
      <div className="section-container">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left: headline + direct contact */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-brand-1 to-brand-2" />
              <span className="mono-label text-muted-foreground">{t('contact.label')}</span>
            </div>
            <h2 className="display-md mb-6">{t('contact.headline')}</h2>
            <p className="body-lg mb-10 max-w-md text-muted-foreground">{t('contact.subheadline')}</p>

            {/* Direct contact links */}
            <div className="space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-1/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366]">
                  <WhatsAppIcon size={20} />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{t('contact.whatsappDirect')}</span>
                  <span className="text-xs text-muted-foreground">+55 44 99964-1464</span>
                </span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-1/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-1/15 text-brand-1">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">E-mail</span>
                  <span className="text-xs text-muted-foreground">{EMAIL}</span>
                </span>
              </a>

              <div className="flex items-center gap-3 px-1 pt-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="mono-sm normal-case tracking-normal">{t('contact.responseTime')}</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-10">
              <span className="mono-label mb-4 block text-muted-foreground">{t('contact.followTitle')}</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-1/40 hover:text-brand-1"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT_EXPO }}
          >
            <form onSubmit={handleSubmit} noValidate className="rounded-2xl glass p-8 md:p-10">
              <h3 className="mono-sm mb-8 text-foreground">{t('contact.formTitle')}</h3>

              <div className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={t('contact.namePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      className={fieldClass('name')}
                      aria-label={t('contact.nameLabel')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t('contact.emailPlaceholder')}
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass('email')}
                      aria-label={t('contact.emailLabel')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('contact.whatsappPlaceholder')}
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-editorial"
                    aria-label={t('contact.whatsappLabel')}
                  />
                  <div>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={cn(fieldClass('projectType'), 'cursor-pointer')}
                      aria-label={t('contact.projectTypeLabel')}
                      aria-invalid={!!errors.projectType}
                    >
                      <option value="" disabled className="bg-background">
                        {t('contact.projectTypePlaceholder')}
                      </option>
                      {projectTypeKeys.map((type) => (
                        <option key={type.value} value={type.value} className="bg-background">
                          {t(type.labelKey)}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="mt-2 text-xs text-destructive">{errors.projectType}</p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder={t('contact.messagePlaceholder')}
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={cn(fieldClass('message'), 'resize-none')}
                    aria-label={t('contact.messageLabel')}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-accent group w-full disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? t('contact.sending') : t('contact.cta')}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
