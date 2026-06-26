import { useState, useRef, useEffect } from 'react';

const BRAND = "#2563eb";
const BRAND2 = "#0ea5e9";

const apps = [
  {
    name: "Bookrightly",
    description: "UK bookings marketplace — find, compare, and book vetted local professionals in minutes.",
    demo: "https://www.bookrightly.co.uk/",
    img: "/images/1.jpg",
    testLogin: true,
    tag: "Marketplace",
  },
  {
    name: "JS Grow Up",
    description: "Co-parenting coordination app that keeps communications civil, organised, and focused on the kids.",
    demo: "https://js-grw-up.com/",
    img: "/images/2.jpg",
    testLogin: true,
    tag: "Mobile App",
  },
  {
    name: "Smart Life",
    description: "AI-powered personal dashboard combining smart notes, voice recording, task management, and AI suggestions.",
    demo: "https://smart-life-app.pages.dev/",
    img: "/images/3.jpg",
    testLogin: true,
    tag: "AI App",
  },
  {
    name: "DB's AI Trainer",
    description: "AI personal coaching studio that generates daily workout plans, nutrition tracking, and bio-somatotype analysis.",
    demo: "https://pt-ai-helper.pages.dev/#/login",
    img: "/images/4.jpg",
    testLogin: true,
    tag: "AI App",
  },
  {
    name: "Bella Flor Jewellery",
    description: "Boutique e-commerce store for handcrafted cord bracelets — product filtering and a clean buying experience.",
    demo: "https://www.bellaflorjewellery.co.uk/",
    img: "/images/5.jpg",
    type: "website",
    tag: "E-Commerce",
  },
  {
    name: "Payment Card Services",
    description: "High-converting web presence for a payment solutions provider — zero rental fees, next-day transfers, tap-to-pay ready.",
    demo: "https://www.paymentcardservices.co.uk/",
    img: "/images/6.jpg",
    type: "website",
    tag: "Business Site",
  },
];

const services = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Mobile App Development",
    desc: "Native-quality apps built with React Native or progressive web technology. I handle design, development, and full submission to the Google Play Store and Apple App Store.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 20h8M12 18v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Professional Web Presence",
    desc: "Fast, modern websites built to convert visitors into customers. E-commerce, booking systems, service pages — designed to represent your business at its best.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Zero to MVP",
    desc: "Have an idea but no technical co-founder? I scope, design, build, and launch your product. Most MVPs are live within 4–8 weeks, ready for real users and early feedback.",
  },
];

const faqs = [
  {
    q: "How long does a project take?",
    a: "Most mobile apps and websites are completed within 4–8 weeks from kickoff. Complex platforms may take longer — I give you a clear timeline before we start, and I stick to it.",
  },
  {
    q: "Do you handle the App Store submission?",
    a: "Yes — this is one of my key strengths. App Store and Google Play submissions are where most developers hand off and leave businesses stuck. I manage the entire process including account setup, store listing, screenshots, and approval.",
  },
  {
    q: "What if I only have an idea and nothing built yet?",
    a: "That is the ideal starting point. I will help you scope the idea, cut it down to the essentials that matter, and build a version that is ready to show real customers — without overbuilding before you have validated the market.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is scoped individually based on what you actually need. I do not quote blind — we have a quick call first, I understand the requirements, and then I give you a fixed price with no surprises.",
  },
];

function CredsDropdown() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function copy(text, field) {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 w-full justify-center"
        style={{ background: open ? "#f1f5f9" : "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" }}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        Test Login
        <svg className="w-3 h-3 transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl p-3 z-20 flex flex-col gap-2"
          style={{ background: "#0f172a", boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#475569" }}>Test credentials</p>
          {[{ label: "Email", value: "test@test.com" }, { label: "Password", value: "test1234" }].map(({ label, value }) => (
            <button key={label} onClick={() => copy(value, label)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors duration-150"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#475569" }}>{label}</div>
                <div className="text-xs font-mono font-semibold mt-0.5" style={{ color: "#e2e8f0" }}>{value}</div>
              </div>
              <span className="text-[10px] font-semibold" style={{ color: copied === label ? "#10b981" : BRAND }}>
                {copied === label ? "Copied!" : "Copy"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AppCard({ app }) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-1.5"
      style={{ border: "1px solid #dbeafe", boxShadow: "0 2px 12px 0 rgba(37,99,235,0.06), 0 1px 3px 0 rgba(0,0,0,0.04)" }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(37,99,235,0.18), 0 2px 8px 0 rgba(0,0,0,0.06)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 12px 0 rgba(37,99,235,0.06), 0 1px 3px 0 rgba(0,0,0,0.04)"}>
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${BRAND2}, ${BRAND})` }} />
      <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
        <img src={app.img} alt={app.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>
          {app.tag}
        </div>
        {app.type === "website" && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`, boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 1.5C8 1.5 6 4 6 8s2 6.5 2 6.5M8 1.5C8 1.5 10 4 10 8s-2 6.5-2 6.5M1.5 8h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Website
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-base text-slate-900" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>{app.name}</h3>
        <p className="text-sm leading-relaxed text-slate-500 flex-1">{app.description}</p>
      </div>
      <a href={app.demo} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
        style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", color: BRAND, border: "1px solid #bfdbfe" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`; e.currentTarget.style.color = "#fff"; e.currentTarget.style.border = `1px solid ${BRAND}`; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"; e.currentTarget.style.color = BRAND; e.currentTarget.style.border = "1px solid #bfdbfe"; }}>
        {app.type === "website" ? "Visit Website" : "Live Demo"}
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {app.testLogin && <CredsDropdown />}
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ border: "1px solid #dbeafe", background: open ? "#fff" : "#f8faff" }}>
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
        <span className="text-sm font-bold text-slate-900" style={{ letterSpacing: "-0.01em" }}>{q}</span>
        <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', color: BRAND }}
          viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-slate-500">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8faff" }}>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50"
        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid #dbeafe", boxShadow: "0 1px 24px 0 rgba(37,99,235,0.07)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)` }}>D</div>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em", color: "#0c1a3a" }}>Dean Burt</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[["Work", "#work"], ["Services", "#services"], ["Process", "#process"], ["FAQ", "#faq"]].map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{label}</a>
            ))}
          </nav>
          <a href="https://coding-leads.vercel.app/book"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`, boxShadow: "0 4px 14px 0 rgba(37,99,235,0.4)" }}>
            Book a Call
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${BRAND} 0%, transparent 70%)` }} />
        <div className="pointer-events-none absolute top-20 -left-20 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${BRAND2} 0%, transparent 70%)` }} />
        <div className="pointer-events-none absolute top-10 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse at center, #38bdf8 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", color: BRAND }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "#10b981" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for 1 new project this month
          </div>

          <h1 className="text-5xl text-slate-900 sm:text-6xl lg:text-[76px]"
            style={{ fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.045em" }}>
            Your business deserves
            <br />
            <span style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              better software.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 sm:text-xl" style={{ lineHeight: 1.65 }}>
            I build and launch <span className="font-semibold text-slate-800">mobile apps and professional websites</span> for local businesses — handling everything from design to store submission so you can focus on running your business.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="https://coding-leads.vercel.app/book"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`, boxShadow: "0 6px 24px 0 rgba(37,99,235,0.45)" }}>
              Book a free call
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:-translate-y-0.5"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)" }}>
              See my work
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop: "1px solid #dbeafe", borderBottom: "1px solid #dbeafe", background: "#fff" }} className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { num: "6", label: "Apps in production" },
              { num: "4–8", label: "Weeks to launch" },
              { num: "100%", label: "Store submissions handled" },
              { num: "1", label: "Spot open this month" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black" style={{ color: BRAND, letterSpacing: "-0.04em" }}>{stat.num}</span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BRAND }}>What I offer</p>
            <h2 className="text-3xl text-slate-900 sm:text-4xl" style={{ fontWeight: 900, letterSpacing: "-0.04em" }}>
              End-to-end. No hand-offs. No excuses.
            </h2>
            <p className="mt-3 text-base text-slate-500 max-w-xl mx-auto">
              Most developers build and disappear. I take full ownership — from the first conversation to launch day and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white p-7 flex flex-col gap-4"
                style={{ border: "1px solid #dbeafe", boxShadow: "0 2px 12px 0 rgba(37,99,235,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", color: BRAND }}>
                  {s.icon}
                </div>
                <h3 className="text-base font-black text-slate-900" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 flex-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="px-6 py-24" style={{ background: "#fff", borderTop: "1px solid #dbeafe", borderBottom: "1px solid #dbeafe" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BRAND }}>Live work</p>
            <h2 className="text-3xl text-slate-900 sm:text-4xl" style={{ fontWeight: 900, letterSpacing: "-0.04em" }}>
              6 projects. All live. All real.
            </h2>
            <p className="mt-3 text-base text-slate-500">Not mockups. Not concepts. Production software being used right now.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => <AppCard key={app.name} app={app} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="px-6 py-24"
        style={{ background: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)", borderBottom: "1px solid #bfdbfe" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BRAND }}>How it works</p>
            <h2 className="text-3xl text-slate-900 sm:text-4xl" style={{ fontWeight: 900, letterSpacing: "-0.04em" }}>
              Simple. Transparent. Fast.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { num: "01", title: "We talk", body: "A free 15-minute call. You explain the business problem, I ask the right questions. No pitch, no pressure — just an honest conversation about whether I can help." },
              { num: "02", title: "I build", body: "Fixed price, fixed timeline. You get weekly updates and a staging environment to review progress. No surprises, no scope creep, no disappearing." },
              { num: "03", title: "You launch", body: "I handle the store submission, the DNS, the deployment — everything technical. You show up on launch day and start using your new product." },
            ].map((step) => (
              <div key={step.num} className="relative bg-white rounded-2xl p-7 flex flex-col gap-3"
                style={{ border: "1px solid #bfdbfe", boxShadow: "0 2px 12px 0 rgba(37,99,235,0.06)" }}>
                <span className="text-4xl font-black" style={{ color: BRAND, opacity: 0.12, letterSpacing: "-0.05em", lineHeight: 1 }}>{step.num}</span>
                <h3 className="text-lg font-black text-slate-900" style={{ letterSpacing: "-0.025em" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-6 py-24 bg-white" style={{ borderBottom: "1px solid #dbeafe" }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-3xl flex items-center justify-center text-5xl font-black text-white"
                style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`, boxShadow: "0 8px 32px 0 rgba(37,99,235,0.35)" }}>
                DB
              </div>
            </div>
            <div className="flex flex-col gap-4 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: BRAND }}>About me</p>
              <h2 className="text-3xl font-black text-slate-900" style={{ letterSpacing: "-0.035em" }}>
                A developer you can actually talk to.
              </h2>
              <p className="text-base leading-relaxed text-slate-500">
                I'm Dean Burt, a full-stack developer based in the UK. I've built and shipped 6 production applications across mobile, e-commerce, AI, and marketplace categories — and I'm a verified publisher on the Google Play Store.
              </p>
              <p className="text-base leading-relaxed text-slate-500">
                I work with one client at a time. That means when you hire me, you get my full attention — not a junior handoff, not an agency account manager. You deal with the person who is actually writing the code.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["React", "Node.js", "TypeScript", "React Native", "AI Integration", "Google Play", "App Store", "E-Commerce"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#eff6ff", color: BRAND, border: "1px solid #bfdbfe" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-6 py-24" style={{ background: "#f8faff" }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BRAND }}>FAQ</p>
            <h2 className="text-3xl text-slate-900 sm:text-4xl" style={{ fontWeight: 900, letterSpacing: "-0.04em" }}>
              Questions I get asked a lot.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <footer className="relative mt-auto overflow-hidden px-6 py-28 text-center"
        style={{ background: "linear-gradient(160deg, #020617 0%, #0c1a3a 50%, #020617 100%)" }}>
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 blur-3xl"
          style={{ background: `radial-gradient(ellipse at top, ${BRAND} 0%, transparent 65%)` }} />

        <div className="relative mx-auto max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#93c5fd" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            1 spot open this month
          </div>

          <h2 className="text-4xl text-white sm:text-5xl lg:text-6xl"
            style={{ fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em" }}>
            Ready to build
            <br />
            <span style={{ background: "linear-gradient(135deg, #93c5fd 0%, #67e8f9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              something real?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed" style={{ color: "#94a3b8" }}>
            Book a free 15-minute call. No pitch, no obligation — just an honest conversation about your project and whether I'm the right person to build it.
          </p>

          <a href="https://coding-leads.vercel.app/book"
            className="mt-10 inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`, boxShadow: "0 8px 32px 0 rgba(37,99,235,0.55)" }}>
            Book a free call
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="mt-4 text-xs" style={{ color: "#475569" }}>
            Or email:{" "}
            <a href="mailto:deanburt1308@gmail.com" style={{ color: "#60a5fa" }}
              className="underline underline-offset-2 hover:opacity-80 transition-opacity">
              deanburt1308@gmail.com
            </a>
          </div>

          <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-black"
                style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)` }}>D</div>
              <span className="text-xs font-bold" style={{ color: "#374151" }}>Dean Burt</span>
            </div>
            <p className="text-xs" style={{ color: "#374151" }}>
              © {new Date().getFullYear()} Dean Burt · Full-Stack Developer · UK
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/dean1234533" target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: "#475569" }}>GitHub</a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: "#475569" }}>Google Play</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
