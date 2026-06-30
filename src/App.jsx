import { useState, useRef, useEffect } from 'react';

const APPS = [
  { name: "Bookrightly",           tag: "Marketplace",  url: "https://www.bookrightly.co.uk/",             img: "/images/1.jpg", login: true  },
  { name: "Js Grw Up",             tag: "Mobile App",   url: "https://js-grw-up.com/",                     img: "/images/2.jpg", login: true  },
  { name: "Smart Life",            tag: "AI App",       url: "https://smart-life-app.pages.dev/",          img: "/images/3.jpg", login: true  },
  { name: "DB's AI Trainer",       tag: "AI App",       url: "https://pt-ai-helper.pages.dev/#/login",     img: "/images/4.jpg", login: true  },
  { name: "Bella Flor Jewellery",  tag: "E-Commerce",   url: "https://www.bellaflorjewellery.co.uk/",      img: "/images/5.jpg", login: false },
  { name: "Payment Card Services", tag: "Website",      url: "https://www.paymentcardservices.co.uk/",     img: "/images/6.jpg", login: false },
];

const FAQS = [
  { q: "How long does a project take?",        a: "Most apps and websites are done in 4–8 weeks from kickoff. I give you a clear timeline before we start and I stick to it." },
  { q: "Do you handle the App Store?",         a: "Yes — fully. Play Store and App Store submissions, listing, screenshots, and approval. I handle everything so you don't have to." },
  { q: "What if I only have an idea?",         a: "Perfect starting point. I help you scope it down to essentials and ship something real you can put in front of customers." },
  { q: "How much does it cost?",               a: "Every project is scoped individually. We talk first, I understand what you need, then I give you a fixed price with no surprises." },
];

function LoginDropdown() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, padding: '10px 16px', borderRadius: 12, cursor: 'pointer',
          background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b',
          fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
        }}>
        🔒 Test Login {open ? '▲' : '▼'}
      </button>
      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0,
          background: '#0f172a', borderRadius: 14, padding: 16, zIndex: 30,
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {[['Email', 'test@test.com'], ['Password', 'test1234']].map(([label, val]) => (
            <button
              key={label}
              onClick={() => copy(val, label)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'inherit',
              }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', fontFamily: 'monospace' }}>{val}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: copied === label ? '#10b981' : '#3b82f6', marginLeft: 12 }}>
                {copied === label ? '✓ Copied' : 'Copy'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ app }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? '0 24px 64px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={app.img} alt={app.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))' }} />
        <span style={{
          position: 'absolute', bottom: 14, left: 14, padding: '5px 12px', borderRadius: 99,
          fontSize: 11, fontWeight: 700, color: '#fff',
          background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
        }}>{app.tag}</span>
      </div>
      <div style={{ padding: '22px 22px 22px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0, textAlign: 'center' }}>{app.name}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
          <a
            href={app.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 20px', borderRadius: 12, textDecoration: 'none',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              color: '#fff', fontSize: 13, fontWeight: 700,
              boxShadow: hovered ? '0 4px 16px rgba(59,130,246,0.4)' : 'none',
              transition: 'box-shadow 0.3s',
            }}>
            {app.tag === 'E-Commerce' || app.tag === 'Website' ? 'Visit Site' : 'Live Demo'} →
          </a>
          {app.login && <LoginDropdown />}
        </div>
      </div>
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderRadius: 16, border: '1px solid #e8eaed', overflow: 'hidden',
        background: open ? '#fff' : '#fafafa', cursor: 'pointer',
        transition: 'background 0.2s',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', gap: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{q}</span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : '#f1f5f9',
          transition: 'background 0.2s',
        }}>
          <span style={{ fontSize: 16, color: open ? '#fff' : '#94a3b8', lineHeight: 1, transform: open ? 'rotate(45deg)' : 'none', display: 'block', transition: 'transform 0.2s' }}>+</span>
        </div>
      </div>
      {open && <p style={{ padding: '0 24px 20px', fontSize: 14, color: '#64748b', lineHeight: 1.8, margin: 0 }}>{a}</p>}
    </div>
  );
}

/* ─── shared section wrapper ─── */
function Section({ id, bg, children }) {
  return (
    <section id={id} style={{ width: '100%', background: bg || '#fff', padding: 'clamp(56px,10vw,120px) clamp(20px,5vw,60px)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%' }}>
        {children}
      </div>
    </section>
  );
}

function SectionHeader({ label, title, sub, light }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 12 }}>{label}</p>
      <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, letterSpacing: '-0.03em', color: light ? '#fff' : '#0f172a', margin: '0 0 14px' }}>{title}</h2>
      {sub && <p style={{ fontSize: 15, color: light ? 'rgba(255,255,255,0.45)' : '#94a3b8', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── NAV ── */}
      <style>{`
        .nav-links { display: none; gap: 32px; align-items: center; }
        @media (min-width: 768px) { .nav-links { display: flex; } }
      `}</style>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', padding: '14px 16px 0' }}>
        <nav style={{
          width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 18px', borderRadius: 18,
          background: 'rgba(9,9,11,0.88)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 900, flexShrink: 0 }}>D</div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Dean Burt</span>
          </div>
          <div className="nav-links">
            {[['Work','#work'],['Services','#services'],['FAQ','#faq']].map(([l,h]) => (
              <a key={l} href={h} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color='#fff'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>{l}</a>
            ))}
          </div>
          <a href="https://coding-leads.vercel.app/book" style={{
            padding: '9px 18px', borderRadius: 12, textDecoration: 'none',
            background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff',
            fontSize: 13, fontWeight: 700, boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>Book a Call</a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', width: '100%', background: '#09090b',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(120px,18vw,160px) clamp(24px,6vw,60px) clamp(80px,10vw,120px)',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        {/* grid bg */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.3) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        {/* glow */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse at top,rgba(59,130,246,0.3),transparent 65%)', opacity: 0.6, filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 760, width: '100%', position: 'relative' }}>
          {/* headshot */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ padding: 3, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}>
              <img src="/images/dean.jpg" alt="Dean Burt" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', display: 'block', border: '3px solid #09090b' }} />
            </div>
          </div>
          {/* badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 99, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', flexShrink: 0, display: 'inline-block', boxShadow: '0 0 0 3px rgba(16,185,129,0.25)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#60a5fa', letterSpacing: '0.02em' }}>1 project spot open this month</span>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(36px,7.5vw,88px)', fontWeight: 900, lineHeight: 1.07, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 24px' }}>
            I build apps that<br />
            <span style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>grow businesses.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 40px' }}>
            Full-stack developer building mobile apps and websites for local businesses.
            I handle everything — design, development, and store submission.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%', maxWidth: 400, margin: '0 auto 64px' }}>
            <a href="https://coding-leads.vercel.app/book" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '16px 28px', borderRadius: 14, textDecoration: 'none',
              background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff',
              fontSize: 15, fontWeight: 700, boxShadow: '0 8px 28px rgba(59,130,246,0.5)',
            }}>Book a free call →</a>
            <a href="#work" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '16px 28px', borderRadius: 14, textDecoration: 'none',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 600,
            }}>See my work</a>
          </div>

          {/* stats — 2 cols on mobile, 4 on wider screens */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[['6','Live apps'],['4–8wk','To launch'],['100%','Store handled'],['1','Spot open']].map(([n,l]) => (
              <div key={l} style={{ background: '#09090b', padding: '22px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>{n}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <Section id="work" bg="#f8fafc">
        <SectionHeader label="Live Work" title="6 projects. All live." sub="Not mockups. Production-grade software built and deployed end to end." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28 }}>
          {APPS.map(app => <Card key={app.name} app={app} />)}
        </div>
      </Section>

      {/* ── SERVICES ── */}
      <Section id="services" bg="#09090b">
        <SectionHeader label="Services" title="What I build for you." light />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          {[
            { icon: '📱', title: 'Mobile Apps',  desc: 'React Native or PWA apps for Android and iOS. Design, development, and full store submission handled.' },
            { icon: '🌐', title: 'Websites',     desc: 'Fast, modern websites that convert visitors — e-commerce, bookings, and service businesses.' },
            { icon: '🚀', title: 'MVP Launch',   desc: 'Have an idea? I scope, design, and ship your first version in 4–8 weeks, ready for real users.' },
          ].map(s => (
            <div key={s.title} style={{ borderRadius: 18, padding: 'clamp(28px,4vw,40px)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              <span style={{ fontSize: 40 }}>{s.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PROCESS ── */}
      <Section bg="#fff">
        <SectionHeader label="Process" title="Simple. Three steps." sub="From first call to live app — here's exactly how it works." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          {[
            { n: '01', title: 'We talk',    body: 'Free 15-minute call. You explain the idea, I ask questions and tell you honestly if I can help.' },
            { n: '02', title: 'I build',    body: 'Fixed price, fixed timeline. Weekly updates, no surprises. You see progress the whole way.' },
            { n: '03', title: 'You launch', body: 'I handle store submission, deployment, everything technical. You show up on launch day ready.' },
          ].map(s => (
            <div key={s.n} style={{ borderRadius: 18, padding: 'clamp(28px,4vw,40px)', background: '#fafafa', border: '1px solid #eef0f3', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 900 }}>{s.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.03em' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq" bg="#f8fafc">
        <SectionHeader label="FAQ" title="Common questions." sub="Everything you need to know before we start." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720, margin: '0 auto' }}>
          {FAQS.map(f => <Faq key={f.q} {...f} />)}
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <section style={{ width: '100%', background: '#09090b', padding: 'clamp(80px,12vw,140px) clamp(24px,6vw,60px)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse at top,rgba(59,130,246,0.35),transparent 65%)', opacity: 0.7, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 99, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', marginBottom: 32 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 0 3px rgba(16,185,129,0.25)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#60a5fa' }}>1 spot open this month</span>
          </div>

          <h2 style={{ fontSize: 'clamp(36px,5.5vw,64px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.1, margin: '0 0 20px' }}>
            Ready to build<br />
            <span style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>something real?</span>
          </h2>

          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 40 }}>
            Book a free 15-minute call. No pitch, no pressure — just an honest conversation about your project.
          </p>

          <a href="https://coding-leads.vercel.app/book" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', maxWidth: 360, margin: '0 auto',
            padding: '18px 28px', borderRadius: 14, textDecoration: 'none',
            background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff',
            fontSize: 16, fontWeight: 700, boxShadow: '0 8px 32px rgba(59,130,246,0.5)',
          }}>Book a free call →</a>

          <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.25)' }}>
            or email{' '}
            <a href="mailto:deanburt1308@gmail.com" style={{ color: '#60a5fa', textDecoration: 'underline' }}>deanburt1308@gmail.com</a>
          </p>

          <a href="https://www.instagram.com/deandadev123" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20,
            padding: '10px 20px', borderRadius: 12, textDecoration: 'none',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(255,255,255,0.6)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            @deandadev123
          </a>

          <div style={{ marginTop: 80, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.18)', margin: 0 }}>© {new Date().getFullYear()} Dean Burt · Full-Stack Developer · UK</p>
          </div>
        </div>
      </section>

    </div>
  );
}
