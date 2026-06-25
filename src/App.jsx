import { useState, useRef, useEffect } from 'react';

const BRAND = "#2563eb";
const BRAND2 = "#0ea5e9";

const apps = [
  {
    name: "Bookrightly",
    description: "The UK's premier bookings marketplace — find, compare, and book vetted local professionals in minutes.",
    demo: "https://www.bookrightly.co.uk/",
    img: "/images/1.jpg",
    testLogin: true,
  },
  {
    name: "JS Grow Up",
    description: "A co-parenting coordination app that keeps communications civil, organised, and focused on the kids.",
    demo: "https://js-grw-up.com/",
    img: "/images/2.jpg",
    badge: "Google Play",
    testLogin: true,
  },
  {
    name: "Smart Life",
    description: "A personal AI-powered dashboard combining smart notes, voice recording, task management, and AI suggestions.",
    demo: "https://smart-life-app.pages.dev/",
    img: "/images/3.jpg",
    testLogin: true,
  },
  {
    name: "DB's AI Trainer",
    description: "An AI personal coaching studio that generates daily workout plans, nutrition tracking, and bio-somatotype analysis.",
    demo: "https://pt-ai-helper.pages.dev/#/login",
    img: "/images/4.jpg",
    testLogin: true,
  },
  {
    name: "Bella Flor Jewellery",
    description: "A boutique e-commerce store for handcrafted cord bracelets — with product filtering and a clean buying experience.",
    demo: "https://www.bellaflorjewellery.co.uk/",
    img: "/images/5.jpg",
    type: "website",
  },
  {
    name: "Payment Card Services",
    description: "A high-converting web presence for a payment solutions provider — zero rental fees, next-day transfers, tap-to-pay ready.",
    demo: "https://www.paymentcardservices.co.uk/",
    img: "/images/6.jpg",
    type: "website",
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
        style={{
          background: open ? "#f1f5f9" : "#f8fafc",
          color: "#64748b",
          border: "1px solid #e2e8f0",
        }}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        Test Login
        <svg
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute bottom-full left-0 right-0 mb-2 rounded-xl p-3 z-20 flex flex-col gap-2"
          style={{
            background: "#0f172a",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#475569" }}>
            Test credentials
          </p>

          {[
            { label: "Email", value: "test@test.com" },
            { label: "Password", value: "test1234" },
          ].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => copy(value, label)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors duration-150"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            >
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
    <div
      className="group relative flex flex-col gap-4 rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-1.5"
      style={{
        border: "1px solid #dbeafe",
        boxShadow: "0 2px 12px 0 rgba(37,99,235,0.06), 0 1px 3px 0 rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px 0 rgba(37,99,235,0.18), 0 2px 8px 0 rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 2px 12px 0 rgba(37,99,235,0.06), 0 1px 3px 0 rgba(0,0,0,0.04)";
      }}
    >
      {/* blue top bar on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${BRAND2}, ${BRAND})` }}
      />

      {/* screenshot */}
      <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
        <img
          src={app.img}
          alt={app.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {app.badge && (
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.24.98.2l12.93-12.93L13 7l-9.82 15.99c-.04.24-.02.52.06.77zM20.65 10.68l-2.83-1.62-3.29 3.29 3.29 3.29 2.84-1.63a1.97 1.97 0 000-3.33zM1.05 1.54a2 2 0 000 .28v19.36c0 .1.01.19.03.28L13 10.5 1.05 1.54zM17.09 2.08L4.16.46a1 1 0 00-.98.2L13 10l4.09-7.92z"/>
            </svg>
            Google Play
          </div>
        )}
        {app.type === "website" && (
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
          >
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 1.5C8 1.5 6 4 6 8s2 6.5 2 6.5M8 1.5C8 1.5 10 4 10 8s-2 6.5-2 6.5M1.5 8h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Website
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-base text-slate-900" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
          {app.name}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500 flex-1">{app.description}</p>
      </div>

      <a
        href={app.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
          color: BRAND,
          border: "1px solid #bfdbfe",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`;
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.border = `1px solid ${BRAND}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)";
          e.currentTarget.style.color = BRAND;
          e.currentTarget.style.border = "1px solid #bfdbfe";
        }}
      >
        {app.type === "website" ? "Visit Website" : "Live Demo"}
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {app.testLogin && <CredsDropdown />}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8faff" }}>

      {/* ── NAV ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #dbeafe",
          boxShadow: "0 1px 24px 0 rgba(37,99,235,0.07)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em", color: "#0c1a3a" }}>
            Dean Burt
          </span>
          <a
            href="https://calendly.com/deanburt"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`,
              boxShadow: "0 4px 14px 0 rgba(37,99,235,0.4)",
            }}
          >
            Let's Talk
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
        {/* background glow blobs */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${BRAND} 0%, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute top-20 -left-20 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${BRAND2} 0%, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute top-10 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse at center, #38bdf8 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-4xl">
          {/* availability badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              background: "rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: BRAND,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: "#10b981" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for 1 new project this month
          </div>

          {/* headline */}
          <h1
            className="text-5xl text-slate-900 sm:text-6xl lg:text-[76px]"
            style={{ fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.045em" }}
          >
            I build SaaS products
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              that scale.
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 sm:text-xl"
            style={{ lineHeight: 1.65 }}
          >
            I've launched and currently maintain{" "}
            <span className="font-semibold text-slate-800">6 production-grade applications</span>.{" "}
            I help founders go from zero to MVP.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://calendly.com/deanburt"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`,
                boxShadow: "0 6px 24px 0 rgba(37,99,235,0.45)",
              }}
            >
              Start a conversation
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:-translate-y-0.5"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)" }}
            >
              See my work
            </a>
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      <div
        style={{
          borderTop: "1px solid #dbeafe",
          borderBottom: "1px solid #dbeafe",
          background: "linear-gradient(90deg, #fff 0%, #f0f9ff 50%, #fff 100%)",
        }}
        className="py-5"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            {["6 Live Apps", "React · Node · TypeScript", "Zero to MVP", "Production-grade", "4–8 Week Builds"].map((t, i) => (
              <span key={t} className="flex items-center gap-10">
                <span>{t}</span>
                {i < 4 && <span className="hidden sm:block" style={{ color: "#bfdbfe" }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── APP GRID ── */}
      <section id="work" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2
              className="text-3xl text-slate-900 sm:text-4xl"
              style={{ fontWeight: 900, letterSpacing: "-0.04em" }}
            >
              6 apps.{" "}
              <span style={{ color: BRAND }}>All in production.</span>
            </h2>
            <p className="mt-3 text-base text-slate-500">
              Not side projects. Real tools, real users, real value.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.name} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        className="px-6 py-20"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)",
          borderTop: "1px solid #bfdbfe",
          borderBottom: "1px solid #bfdbfe",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 text-center">
            {[
              { num: "01", title: "Define", body: "Scope the problem, the market, and the minimal surface area to win. No guessing." },
              { num: "02", title: "Build", body: "Lean, fast, and production-ready from day one. No over-engineering. No bloat." },
              { num: "03", title: "Ship", body: "From first commit to live users — typically 4–8 weeks, not 4–8 months." },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center gap-3">
                <span
                  className="text-xs font-black tracking-widest uppercase"
                  style={{ color: BRAND, opacity: 0.5 }}
                >
                  {step.num}
                </span>
                <h3 className="text-lg font-black text-slate-900" style={{ letterSpacing: "-0.025em" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 max-w-xs">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <footer
        className="relative mt-auto overflow-hidden px-6 py-28 text-center"
        style={{ background: "linear-gradient(160deg, #020617 0%, #0c1a3a 50%, #020617 100%)" }}
      >
        {/* blue glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 blur-3xl"
          style={{ background: `radial-gradient(ellipse at top, ${BRAND} 0%, transparent 65%)` }}
        />

        <div className="relative mx-auto max-w-2xl">
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(37,99,235,0.3)",
              color: "#93c5fd",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            1 spot open this month
          </div>

          <h2
            className="text-4xl text-white sm:text-5xl lg:text-6xl"
            style={{ fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em" }}
          >
            Looking for a<br />
            <span
              style={{
                background: `linear-gradient(135deg, #93c5fd 0%, #67e8f9 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              technical partner?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed" style={{ color: "#94a3b8" }}>
            I am currently accepting{" "}
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>1 new project</span> for this month.
            Let's talk about your idea.
          </p>

          <a
            href="https://calendly.com/deanburt"
            className="mt-10 inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND2} 100%)`,
              boxShadow: "0 8px 32px 0 rgba(37,99,235,0.55)",
            }}
          >
            Book a call
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="mt-4 text-xs" style={{ color: "#475569" }}>
            Or email:{" "}
            <a
              href="mailto:deanburt1308@gmail.com"
              style={{ color: "#60a5fa" }}
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              deanburt1308@gmail.com
            </a>
          </div>

          <p className="mt-16 text-xs" style={{ color: "#374151" }}>
            © {new Date().getFullYear()} Dean Burt &nbsp;·&nbsp; Built with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
