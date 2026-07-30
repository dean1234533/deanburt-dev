import { useState } from 'react';
import { ContactModalContext } from './contactModalContext';
import { ContactForm } from './ContactForm';

function ContactModal({ onClose }) {
  return (
    <div className="contact-modal-overlay" role="dialog" aria-modal="true" aria-label="Request a quote" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="contact-modal">
        <button type="button" className="contact-modal-close" aria-label="Close" onClick={onClose}>×</button>
        <ContactForm onSent={() => {}} />
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
