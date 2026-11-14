import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Mail,
  Clock,
  ArrowRight,
  Linkedin,
  Phone,
  Sparkles,
  X,
  RotateCcw,
} from 'lucide-react';
import { Button } from './Button';
import { profile } from '../../data/profile';
import { links } from '../../data/links';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  senderEmail: string;
  subject: string;
  onResetForm?: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  senderName,
  senderEmail,
  subject,
  onResetForm,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const firstName = senderName.trim().split(' ')[0] || 'Friend';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thankyou-modal-title"
        >
          {/* Backdrop with Frosted Blur & Gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-lg bg-surface-light dark:bg-zinc-950 border border-emerald-500/30 dark:border-emerald-500/25 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(16,185,129,0.18)] z-10 my-8 overflow-hidden text-center"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated Celebration Icon */}
            <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
              {/* Pulsing Aura Rings */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
                </motion.div>
              </motion.div>

              {/* Sparkle Badges */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-400 text-zinc-950 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
              </motion.div>
            </div>

            {/* Heading & Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Message Delivered
              </span>

              <h2
                id="thankyou-modal-title"
                className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight"
              >
                Thank You, {firstName}!
              </h2>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-sm mx-auto">
                Your message has been delivered directly to Shivangi&apos;s Gmail inbox. She will get back to you shortly!
              </p>
            </motion.div>

            {/* Dispatch Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-border-light dark:border-zinc-800 text-left space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  Delivered To:
                </span>
                <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold truncate max-w-[200px]">
                  {profile.email}
                </span>
              </div>

              {subject && (
                <div className="flex items-center justify-between border-t border-border-light/70 dark:border-zinc-800/80 pt-2">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Subject:
                  </span>
                  <span className="text-zinc-900 dark:text-zinc-200 truncate max-w-[200px]">
                    {subject}
                  </span>
                </div>
              )}

              {senderEmail && (
                <div className="flex items-center justify-between border-t border-border-light/70 dark:border-zinc-800/80 pt-2">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Your Reply-To:
                  </span>
                  <span className="text-zinc-900 dark:text-zinc-200 truncate max-w-[200px]">
                    {senderEmail}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-200/60 dark:border-emerald-900/40 mt-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Typical response time: Within 12–24 hours</span>
              </div>
            </motion.div>

            {/* Quick Urgent Connect Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-5 pt-4 border-t border-border-light dark:border-zinc-800/80"
            >
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-3">
                Need an urgent conversation or interview discussion?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Connect on LinkedIn</span>
                  </a>
                )}
                {profile.phone && (
                  <a
                    href={`tel:+${profile.phone.replace(/\D/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Direct: {profile.phone}</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5"
            >
              <Button
                variant="primary"
                size="md"
                onClick={onClose}
                className="w-full sm:w-auto bg-gradient-to-r from-accent-600 to-indigo-600 hover:from-accent-500 hover:to-indigo-500 text-white shadow-md shadow-accent-500/25"
              >
                <span>Back to Portfolio</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              {onResetForm && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    onResetForm();
                    onClose();
                  }}
                  className="w-full sm:w-auto text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  <span>Send Another Message</span>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
