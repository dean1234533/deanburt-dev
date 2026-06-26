import { useState, useRef, useEffect } from 'react';

const BLUE = "#3b82f6";
const CYAN = "#06b6d4";
const PAD = "clamp(20px, 6vw, 48px)";

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
        className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all"
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
        <div className="absolute bottom-full left-0 right-0 mb-3 rounded-xl p-4 z-20 flex flex-col gap-3"
          style={{ background: "#0f172a", boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)" }}>
          <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#334155" }}>Test credentials</p>
          {[["Email", "test@test.com"], ["Password", "test1234"]].map(([label, value]) => (
            <button key={label} onClick={() => copy(value, label)}
              className="flex items-center justify-between rounded-xl px-4 py-3 transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "#334155" }}>{label}</div>
                <div className="text-xs font-mono font-semibold" style={{ color: "#e2e8f0" }}>{value}</div>
              </div>
              <span className="text-[10px] font-bold ml-4" style={{ color: copied === label ? "#10b981" : BLUE }}>
                {copied === label ? "✓ Copied" : "Copy"}
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
    <div className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "#fff",
        border: "1px solid #f1f5f9",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(59,130,246,0.1)" : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img src={app.img} alt={app.name}
          className="w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45) 100%)" }} />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            {app.tag}
          </span>
          {app.website && (
            <span className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}>
              Website
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-5 flex-1">
        <h3 className="text-base font-black text-slate-900" style={{ letterSpacing: "-0.02em" }}>{app.name}</h3>
        <div className="flex flex-col gap-3 mt-auto">
          <a href={app.demo} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all"
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
      <div className="flex items-center justify-between px-7 py-6 gap-6">
        <span className="text-sm font-semibold text-slate-800 leading-relaxed">{q}</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: open ? `linear-gradient(135deg, ${BLUE}, ${CYAN})` : "#f1f5f9" }}>
          <svg className="w-3 h-3 transition-transform" style={{ transform: open ? 'rotate(45deg)' : '', color: open ? "#fff" : "#94a3b8" }} viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {open && <p className="px-7 pb-7 text-sm leading-loose text-slate-500">{a}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fafafa" }}>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center" style={{ padding: "16px clamp(16px, 4vw, 32px) 0" }}>
        <nav className="flex items-center justify-between w-full max-w-5xl rounded-2xl px-5 py-3.5"
          style={{ background: "rgba(9,9,11,0.88)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}>D</div>
            <span className="text-sm font-bold text-white" style={{ letterSpacing: "-0.02em" }}>Dean Burt</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[["Work", "#work"], ["Services", "#services"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={l} href={h} className="text-xs font-medium transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>{l}</a>
            ))}
          </div>
          <a href="https://coding-leads.vercel.app/book"
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, boxShadow: "0 4px 14px rgba(59,130,246,0.4)" }}>
            Book a Call
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ background: "#09090b", minHeight: "100vh", padding: "clamp(100px, 20vw, 160px) clamp(24px, 6vw, 64px) clamp(80px, 12vw, 120px)" }}>

        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${BLUE} 0%, transparent 65%)` }} />

        <div className="relative max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold mb-8"
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for 1 new project this month
          </div>

          <h1 className="text-white" style={{ fontSize: "clamp(40px, 8vw, 88px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em" }}>
            I build apps that<br />
            <span style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${CYAN} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              grow businesses.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
            Full-stack developer building mobile apps and websites for local businesses.
            I handle everything — design, development, and store submission.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href="https://coding-leads.vercel.app/book"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, boxShadow: "0 8px 24px rgba(59,130,246,0.45)" }}>
              Book a free call
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
              See my work
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)", gap: "1px", background: "rgba(255,255,255,0.07)" }}>
            {[["6", "Live apps"], ["4–8wk", "To launch"], ["100%", "Store handled"], ["1", "Spot open"]].map(([n, l]) => (
              <div key={l} className="flex flex-col items-center gap-2 py-7 px-4"
                style={{ background: "#09090b" }}>
                <span className="text-2xl font-black" style={{ color: "#fff", letterSpacing: "-0.04em" }}>{n}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-center" style={{ color: "rgba(255,255,255,0.3)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: "clamp(64px, 10vw, 112px) clamp(20px, 6vw, 48px)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Live work</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900" style={{ letterSpacing: "-0.04em" }}>
                6 projects. All live.
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">Not mockups. Production-grade software built and deployed end to end.</p>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map(app => <AppCard key={app.name} app={app} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: "#09090b", padding: "clamp(64px, 10vw, 112px) clamp(20px, 6vw, 48px)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Services</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>
              What I build for you.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Mobile Apps", desc: "React Native or PWA apps built for Android and iOS. I handle design, development, and full Play Store and App Store submission.", icon: "📱" },
              { title: "Websites", desc: "Fast, modern websites that convert visitors into customers — e-commerce, bookings, and service businesses.", icon: "🌐" },
              { title: "MVP Launch", desc: "Have an idea? I scope, design, and ship your first version in 4–8 weeks — ready for real users and investment.", icon: "🚀" },
            ].map(s => (
              <div key={s.title} className="rounded-2xl flex flex-col gap-6 transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(24px, 4vw, 36px)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
                <span className="text-4xl">{s.icon}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-black text-white" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
                  <p className="text-sm leading-loose" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: "#fff", padding: "clamp(64px, 10vw, 112px) clamp(20px, 6vw, 48px)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Process</p>
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
              <div key={s.n} className="relative rounded-2xl flex flex-col gap-5"
                style={{ border: "1px solid #f1f5f9", background: "#fafafa", padding: "clamp(24px, 4vw, 36px)" }}>
                <span className="font-black select-none" style={{ color: BLUE, opacity: 0.07, letterSpacing: "-0.05em", lineHeight: 1, fontSize: "clamp(64px, 10vw, 96px)" }}>{s.n}</span>
                <div className="flex flex-col gap-3 -mt-3">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: BLUE }}>{s.n}</span>
                  <h3 className="text-xl font-black text-slate-900" style={{ letterSpacing: "-0.03em" }}>{s.title}</h3>
                  <p className="text-sm leading-loose text-slate-500">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "#fafafa", padding: "clamp(64px, 10vw, 112px) clamp(20px, 6vw, 48px)" }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900" style={{ letterSpacing: "-0.04em" }}>
              Common questions.
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { q: "How long does a project take?", a: "Most apps and websites are completed in 4–8 weeks from kickoff. I give you a clear timeline before we start and I stick to it." },
              { q: "Do you handle the App Store submission?", a: "Yes — fully. Play Store and App Store submissions are where most developers leave businesses stuck. I manage the entire process including setup, listing, screenshots, and approval." },
              { q: "What if I only have an idea?", a: "Perfect starting point. I help you scope it down to the essentials, cut what doesn't matter, and ship something real that you can put in front of customers." },
              { q: "How much does it cost?", a: "Every project is scoped individually. I don't quote blind — we talk first, I understand what you need, then I give you a fixed price with no surprises." },
            ].map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden text-center"
        style={{ background: "#09090b", padding: "clamp(64px, 12vw, 128px) clamp(24px, 6vw, 64px)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-25 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${BLUE} 0%, transparent 65%)` }} />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold mb-10"
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            1 spot open this month
          </div>

          <h2 className="text-white" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em" }}>
            Ready to build<br />
            <span style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              something real?
            </span>
          </h2>

          <p className="mt-7 text-base max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
            Book a free 15-minute call. No pitch, no obligation — just an honest conversation about your project.
          </p>

          <a href="https://coding-leads.vercel.app/book"
            className="mt-12 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-10 py-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`, boxShadow: "0 8px 32px rgba(59,130,246,0.5)" }}>
            Book a free call
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
            or email{" "}
            <a href="mailto:deanburt1308@gmail.com" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "#60a5fa" }}>
              deanburt1308@gmail.com
            </a>
          </p>

          <div className="mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-black"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}>D</div>
              <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>Dean Burt</span>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
              © {new Date().getFullYear()} Dean Burt · Full-Stack Developer · UK
            </p>
            <div />
          </div>
        </div>
      </footer>
    </div>
  );
}
