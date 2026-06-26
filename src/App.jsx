import { useState, useRef, useEffect } from 'react';

const BLUE = "#3b82f6";
const CYAN = "#06b6d4";

const apps = [
  { name: "Bookrightly", tag: "Marketplace", demo: "https://www.bookrightly.co.uk/", img: "/images/1.jpg", testLogin: true },
  { name: "Js Grw Up", tag: "Mobile App", demo: "https://js-grw-up.com/", img: "/images/2.jpg", testLogin: true },
  { name: "Smart Life", tag: "AI App", demo: "https://smart-life-app.pages.dev/", img: "/images/3.jpg", testLogin: true },
  { name: "DB's AI Trainer", tag: "AI App", demo: "https://pt-ai-helper.pages.dev/#/login", img: "/images/4.jpg", testLogin: true },
  { name: "Bella Flor Jewellery", tag: "E-Commerce", demo: "https://www.bellaflorjewellery.co.uk/", img: "/images/5.jpg", website: true },
  { name: "Payment Card Services", tag: "Website", demo: "https://www.paymentcardservices.co.uk/", img: "/images/6.jpg", website: true },
];

function CredsDropdown() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  const copy = (text, field) => { navigator.clipboard.writeText(text); setCopied(field); setTimeout(() => setCopied(null), 1500); };
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all"
        style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#64748b" }}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Test Login
        <svg className="w-3 h-3 transition-transform" style={{ transform: open ? 'rotate(180deg)' : '' }} viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl p-3 z-20 flex flex-col gap-2"
          style={{ background: "#0f172a", boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)" }}>
          <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#334155" }}>Test credentials</p>
          {[["Email", "test@test.com"], ["Password", "test1234"]].map(([label, value]) => (
            <button key={label} onClick={() => copy(value, label)}
              className="flex items-center justify-between rounded-lg px-3 py-2 transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#334155" }}>{label}</div>
                <div className="text-xs font-mono font-semibold mt-0.5" style={{ color: "#e2e8f0" }}>{value}</div>
              </div>
              <span className="text-[10px] font-bold" style={{ color: copied === label ? "#10b981" : BLUE }}>
                {copied === label ? "✓" : "Copy"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AppCard({ app }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col gap-0 rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "#fff",
        border: "1px solid #f1f5f9",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(59,130,246,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img src={app.img} alt={app.name}
          className="w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            {app.tag}
          </span>
          {app.website && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}>
              Website
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-slate-900" style={{ letterSpacing: "-0.02em" }}>{app.name}</h3>
        <div className="flex flex-col gap-2 mt-auto">
          <a href={app.demo} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold text-white transition-all"
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, boxShadow: hovered ? "0 4px 16px rgba(59,130,246,0.4)" : "none" }}>
            {app.website ? "Visit Site" : "Live Demo"}
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          {app.testLogin && <CredsDropdown />}
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all cursor-pointer"
      style={{ border: "1px solid #f1f5f9", background: open ? "#fff" : "#fafafa" }}
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-center justify-between px-6 py-5 gap-4">
        <span className="text-sm font-semibold text-slate-800">{q}</span>
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: open ? `linear-gradient(135deg, ${BLUE}, ${CYAN})` : "#f1f5f9" }}>
          <svg className="w-3 h-3 transition-transform" style={{ transform: open ? 'rotate(45deg)' : '', color: open ? "#fff" : "#94a3b8" }} viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {open && <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500">{a}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fafafa" }}>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <nav className="flex items-center justify-between w-full max-w-5xl rounded-2xl px-5 py-3"
          style={{ background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}>D</div>
            <span className="text-sm font-bold text-white" style={{ letterSpacing: "-0.02em" }}>Dean Burt</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {[["Work", "#work"], ["Services", "#services"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={l} href={h} className="text-xs font-medium transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>{l}</a>
            ))}
          </div>
          <a href="https://coding-leads.vercel.app/book"
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, boxShadow: "0 4px 14px rgba(59,130,246,0.4)" }}>
            Book a Call
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 overflow-hidden"
        style={{ background: "#09090b", minHeight: "100vh", paddingTop: "clamp(100px, 20vw, 140px)", paddingBottom: "clamp(60px, 10vw, 100px)" }}>

        {/* grid bg */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${BLUE} 0%, transparent 65%)` }} />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for 1 new project this month
          </div>

          <h1 className="text-white" style={{ fontSize: "clamp(38px, 8vw, 88px)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.04em" }}>
            I build apps that<br />
            <span style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${CYAN} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              grow businesses.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            Full-stack developer building mobile apps and websites for local businesses.
            I handle everything — design, development, and store submission.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://coding-leads.vercel.app/book"
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, boxShadow: "0 8px 24px rgba(59,130,246,0.45)" }}>
              Book a free call
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work"
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
              See my work
            </a>
          </div>

          {/* stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {[["6", "Live apps"], ["4–8wk", "To launch"], ["100%", "Store handled"], ["1", "Spot open"]].map(([n, l]) => (
              <div key={l} className="flex flex-col items-center gap-1.5 py-6 px-3"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <span className="text-xl font-black" style={{ color: "#fff", letterSpacing: "-0.04em" }}>{n}</span>
                <span className="text-[9px] font-medium uppercase tracking-wider text-center" style={{ color: "rgba(255,255,255,0.3)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="px-5 py-16 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Live work</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900" style={{ letterSpacing: "-0.04em" }}>
                6 projects. All live.
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">Not mockups. Production-grade software built and deployed end to end.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map(app => <AppCard key={app.name} app={app} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-5 py-16 sm:py-28" style={{ background: "#09090b" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Services</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>
              What I build for you.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Mobile Apps",
                desc: "React Native or PWA apps built for Android and iOS. I handle design, development, and full Play Store and App Store submission.",
                icon: "📱",
              },
              {
                title: "Websites",
                desc: "Fast, modern websites that convert visitors into customers — e-commerce, bookings, and service businesses.",
                icon: "🌐",
              },
              {
                title: "MVP Launch",
                desc: "Have an idea? I scope, design, and ship your first version in 4–8 weeks — ready for real users and investment.",
                icon: "🚀",
              },
            ].map(s => (
              <div key={s.title} className="rounded-2xl p-7 flex flex-col gap-4 transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
                <span className="text-3xl">{s.icon}</span>
                <h3 className="text-base font-black text-white" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-16 sm:py-28" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>Process</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900" style={{ letterSpacing: "-0.04em" }}>
              Simple. Three steps.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "01", title: "We talk", body: "Free 15-minute call. You explain the idea, I ask the right questions, and I tell you honestly if I can help." },
              { n: "02", title: "I build", body: "Fixed price, fixed timeline. Weekly updates, no surprises. You see the progress the whole way through." },
              { n: "03", title: "You launch", body: "I handle store submission, deployment, everything technical. You show up on launch day ready to go." },
            ].map(s => (
              <div key={s.n} className="relative p-8 rounded-2xl flex flex-col gap-4"
                style={{ border: "1px solid #f1f5f9", background: "#fafafa" }}>
                <span className="font-black text-7xl leading-none select-none"
                  style={{ color: BLUE, opacity: 0.07, letterSpacing: "-0.05em", lineHeight: 1 }}>{s.n}</span>
                <div className="flex flex-col gap-2 -mt-2">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: BLUE }}>{s.n}</span>
                  <h3 className="text-xl font-black text-slate-900" style={{ letterSpacing: "-0.03em" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-16 sm:py-28" style={{ background: "#fafafa" }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900" style={{ letterSpacing: "-0.04em" }}>
              Common questions.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { q: "How long does a project take?", a: "Most apps and websites are completed in 4–8 weeks from kickoff. I give you a clear timeline before we start and I stick to it." },
              { q: "Do you handle the App Store submission?", a: "Yes — fully. Play Store and App Store submissions are where most developers leave businesses stuck. I manage the entire process including setup, listing, screenshots, and approval." },
              { q: "What if I only have an idea?", a: "Perfect starting point. I help you scope it down to the essentials, cut what doesn't matter, and ship something real that you can put in front of customers." },
              { q: "How much does it cost?", a: "Every project is scoped individually. I don't quote blind — we talk first, I understand what you need, then I give you a fixed price with no surprises." },
            ].map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="relative overflow-hidden px-5 py-20 sm:py-32 text-center" style={{ background: "#09090b" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-25 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${BLUE} 0%, transparent 65%)` }} />
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            1 spot open this month
          </div>

          <h2 className="text-white" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em" }}>
            Ready to build<br />
            <span style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              something real?
            </span>
          </h2>

          <p className="mt-5 text-base max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
            Book a free 15-minute call. No pitch, no obligation — just an honest conversation about your project.
          </p>

          <a href="https://coding-leads.vercel.app/book"
            className="mt-10 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, boxShadow: "0 8px 32px rgba(59,130,246,0.5)" }}>
            Book a free call
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            or email <a href="mailto:deanburt1308@gmail.com" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "#60a5fa" }}>deanburt1308@gmail.com</a>
          </p>

          <div className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-black"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}>D</div>
              <span className="text-xs font-bold text-white opacity-50">Dean Burt</span>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} Dean Burt · Full-Stack Developer · UK</p>
            <div />
          </div>
        </div>
      </footer>
    </div>
  );
}
