import React, { useState } from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ThankYouModal } from '../ui/ThankYouModal';
import { profile } from '../../data/profile';
import { links } from '../../data/links';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Linkedin,
  Github,
  Copy,
  Check,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    'idle' | 'success' | 'error' | 'rate-limited'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState({
    name: '',
    email: '',
    subject: '',
  });

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      _gotcha: '',
    });
    setErrors({});
    setStatus('idle');
    setStatusMessage('');
  };

  const copyEmailToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        throw new Error('Fallback needed');
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (e) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = profile.email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } catch (err) {
        console.warn('Could not copy to clipboard', err);
      }
    }
  };

  const copyPhoneToClipboard = async () => {
    if (!profile.phone) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.phone);
      } else {
        throw new Error('Fallback needed');
      }
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (e) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = profile.phone;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } catch (err) {
        console.warn('Could not copy to clipboard', err);
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot: if filled, quietly simulate success to deter spambots
    if (formData._gotcha) {
      setStatus('success');
      setStatusMessage('Thank you! Your message has been received.');
      return;
    }

    if (!validate()) return;

    // Client-side rate limiting: 1 message per 60 seconds
    const lastSubmission = localStorage.getItem('last_contact_submission');
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission, 10) < 60000) {
      const waitSeconds = Math.ceil(
        (60000 - (now - parseInt(lastSubmission, 10))) / 1000
      );
      setStatus('rate-limited');
      setStatusMessage(
        `Rate limit active. Please wait ${waitSeconds} seconds before sending another message.`
      );
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    // Tier 1: Attempt Vercel Serverless Function with Gmail SMTP
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const submitted = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
        };
        setSubmittedDetails(submitted);
        setIsThankYouOpen(true);
        localStorage.setItem('last_contact_submission', Date.now().toString());
        setStatus('success');
        setStatusMessage(
          'Thank you! Your message has been sent directly to Shivangi via Gmail. She will get back to you shortly.'
        );
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          _gotcha: '',
        });
        setIsSubmitting(false);
        return;
      }

      const resData = await response.json().catch(() => ({}));
      if (resData.unconfigured) {
        console.info(
          'Vercel SMTP endpoint awaiting MAIL_PASSWORD; proceeding to fallback dispatch.'
        );
      }
    } catch (apiErr) {
      console.warn(
        'Serverless endpoint /api/contact unavailable (local or non-Vercel environment); falling back:',
        apiErr
      );
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Tier 2: If EmailJS env vars are configured, attempt EmailJS send
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          publicKey
        );

        const submitted = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
        };
        setSubmittedDetails(submitted);
        setIsThankYouOpen(true);
        localStorage.setItem('last_contact_submission', Date.now().toString());
        setStatus('success');
        setStatusMessage(
          'Thank you! Your message has been sent successfully. Shivangi will get back to you shortly.'
        );
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          _gotcha: '',
        });
        setIsSubmitting(false);
        return;
      } catch (error) {
        console.warn(
          'EmailJS dispatch failed; opening fallback email client:',
          error
        );
      }
    }

    // Tier 3: Graceful fallback to mailto
    localStorage.setItem('last_contact_submission', Date.now().toString());
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      `[Portfolio] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setStatus('success');
    setStatusMessage(
      'Opening your email client to complete message dispatch.'
    );
    setIsSubmitting(false);
  };

  return (
    <SectionContainer
      id="contact"
      title="Have an Interesting Opportunity or Project in Mind?"
      subtitle="Reach out directly for frontend roles, full-stack development, or engineering collaborations."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Preferred communication for opportunities and interviews.
              </p>
            </div>

            <div className="space-y-4">
              {/* Primary Email with One-Click Copy */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border-light dark:border-border hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors">
                <a
                  href={links.email || `mailto:${profile.email}`}
                  className="flex items-center gap-3 group flex-1 mr-2 truncate"
                  aria-label="Send email to Shivangi Singh"
                >
                  <div className="p-2 rounded-md bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      Primary Email
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent-500 transition-colors truncate">
                      {profile.email}
                    </div>
                  </div>
                </a>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
                  aria-label={copiedEmail ? 'Email copied' : 'Copy email address'}
                  title={copiedEmail ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Direct Phone / WhatsApp with One-Click Copy */}
              {profile.phone && (
                <div className="flex items-center justify-between p-3 rounded-lg border border-border-light dark:border-border hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors">
                  <a
                    href={`tel:+${profile.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 group flex-1 mr-2 truncate"
                    aria-label={`Call Shivangi Singh at ${profile.phone}`}
                  >
                    <div className="p-2 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        Direct Phone / Call
                      </div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors truncate">
                        {profile.phone}
                      </div>
                    </div>
                  </a>

                  {/* Copy Phone Button */}
                  <button
                    type="button"
                    onClick={copyPhoneToClipboard}
                    className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
                    aria-label={copiedPhone ? 'Phone number copied' : 'Copy phone number'}
                    title={copiedPhone ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}

              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border-light dark:border-border hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      LinkedIn Connection
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-500 transition-colors">
                      linkedin.com/in/shivangisingh04
                    </div>
                  </div>
                </a>
              )}

              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border-light dark:border-border hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      GitHub Activity
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
                      github.com/shivangi792004
                    </div>
                  </div>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-border-light/70 dark:border-border/60 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              &bull; Based in India &bull; Remote &amp; On-Site Ready &bull; Fast turnaround
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Bot Honeypot (Visually Hidden) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_gotcha">Leave this field blank</label>
                <input
                  type="text"
                  id="_gotcha"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._gotcha}
                  onChange={(e) =>
                    setFormData({ ...formData, _gotcha: e.target.value })
                  }
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-surface-light dark:bg-surface text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-border-light dark:border-border focus:ring-accent-500'
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="alex@company.com"
                    className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-surface-light dark:bg-surface text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-border-light dark:border-border focus:ring-accent-500'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Frontend Engineering Opportunity / Project Discussion"
                  className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-surface-light dark:bg-surface text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-border-light dark:border-border focus:ring-accent-500'
                  }`}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-xs text-red-500">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    {formData.message.length} chars (min 15)
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Hi Shivangi, we'd like to discuss an opportunity..."
                  className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-surface-light dark:bg-surface text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-border-light dark:border-border focus:ring-accent-500'
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Banner */}
              {status === 'success' && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
              {status === 'rate-limited' && (
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-800 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Animated Gorgeous Thank You Celebration Modal */}
      <ThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
        senderName={submittedDetails.name}
        senderEmail={submittedDetails.email}
        subject={submittedDetails.subject}
        onResetForm={handleResetForm}
      />
    </SectionContainer>
  );
};
