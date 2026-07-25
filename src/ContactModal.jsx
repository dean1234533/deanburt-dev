import { useState } from 'react';
import { ContactModalContext } from './contactModalContext';

// Public endpoint on the CRM's Firebase project (functions/portfolioContact.js)
// — a plain fetch POST rather than the Firebase SDK, since this site has no
// Firebase config of its own and doesn't need one just for this.
const CONTACT_FORM_ENDPOINT = 'https://us-central1-coding-leads-38d68.cloudfunctions.net/submitPortfolioContact';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '', honeypot: '' };

function ContactModal({ onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState(null);

  function set(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Something went wrong — please try again.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <div className="contact-modal-overlay" role="dialog" aria-modal="true" aria-label="Request a quote" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="contact-modal">
        <button type="button" className="contact-modal-close" aria-label="Close" onClick={onClose}>×</button>

        {status === 'sent' ? (
          <div className="contact-modal-success">
            <h2>Message sent</h2>
            <p>Thanks — I'll get back to you shortly. If it's urgent, you can also book a call directly.</p>
            <button type="button" className="button button-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Request a quote</h2>
            <p>Tell me a bit about what you need — I'll reply personally, usually within a day.</p>
            <div className="form-grid">
              <label className="field">
                Name
                <input required value={form.name} onChange={set('name')} autoComplete="name" />
              </label>
              <label className="field">
                Email
                <input required type="email" value={form.email} onChange={set('email')} autoComplete="email" />
              </label>
              <label className="field">
                Phone (optional)
                <input value={form.phone} onChange={set('phone')} autoComplete="tel" />
              </label>
            </div>
            <label className="field" style={{ marginTop: 14 }}>
              What do you need?
              <textarea required value={form.message} onChange={set('message')} placeholder="e.g. I need a new website for my salon, ideally with online booking." />
            </label>
            {/* Honeypot — hidden from real visitors via CSS, bots that fill every input still fill this one */}
            <input
              type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
              className="contact-modal-honeypot"
              value={form.honeypot} onChange={set('honeypot')}
            />
            {error && <p className="contact-modal-error">{error}</p>}
            <div className="button-row" style={{ marginTop: 16 }}>
              <button type="submit" className="button button-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={() => setOpen(true)}>
      {children}
      {open && <ContactModal onClose={() => setOpen(false)} />}
    </ContactModalContext.Provider>
  );
}
