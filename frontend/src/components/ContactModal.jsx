import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendContact } from '../api.js';

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', msg: '' });
    try {
      await sendContact(form);
      setStatus({ state: 'sent', msg: "Thanks — I'll be in touch soon." });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', msg: err.message });
    }
  };

  const field =
    'rounded-lg border border-ink/20 bg-transparent px-4 py-3 text-ink placeholder-ink/40 outline-none focus:border-terracotta';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-cream p-8 shadow-2xl"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/90 text-lg text-cream transition-colors hover:bg-ink"
            >
              &times;
            </button>

            <h3 className="text-3xl font-bold tracking-tight text-ink">Let&apos;s talk</h3>
            <p className="mt-2 text-sm text-ink/60">
              Have a project, a question, or an opportunity? Drop a note.
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
              <input required type="text" placeholder="Name" value={form.name} onChange={update('name')} className={field} />
              <input required type="email" placeholder="Email" value={form.email} onChange={update('email')} className={field} />
              <textarea required rows={4} placeholder="Message" value={form.message} onChange={update('message')} className={`${field} resize-none`} />
              <button
                type="submit"
                disabled={status.state === 'sending'}
                className="self-start rounded-full bg-ink px-8 py-3 font-semibold text-cream transition-transform hover:scale-105 disabled:opacity-60"
              >
                {status.state === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {status.msg && (
                <p className={status.state === 'error' ? 'text-red-500' : 'text-terracotta'}>
                  {status.msg}
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
