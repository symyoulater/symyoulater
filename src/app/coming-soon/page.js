"use client";
import { useState, useEffect } from "react";

"use client";
import { useState, useEffect } from "react";

const C = {
  bg:         "#080810",
  accent:     "#FF6B35",
  accentWarm: "#FF9F1C",
  purple:     "#7C6AFF",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  border:     "rgba(255,255,255,0.07)",
};

function SymLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slg-cs" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slg-cs)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

export default function ComingSoon() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit() {
    if (!email.trim() || !email.includes("@")) return;
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .fade-up-1 { animation: fadeUp 0.9s ease both; }
        .fade-up-2 { animation: fadeUp 0.9s ease 0.15s both; }
        .fade-up-3 { animation: fadeUp 0.9s ease 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.9s ease 0.45s both; }
        .fade-up-5 { animation: fadeUp 0.9s ease 0.6s both; }
        .float { animation: float 6s ease-in-out infinite; }
        input::placeholder { color: #6B6B8A; }
        input:focus { outline: none; border-color: rgba(255,107,53,0.5) !important; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: "absolute", top: "-15%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 65%)", pointerEvents: "none", animation: "pulse 8s ease-in-out infinite" }}/>
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,106,255,0.06) 0%, transparent 65%)", pointerEvents: "none", animation: "pulse 10s ease-in-out infinite 2s" }}/>

      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,107,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.025) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }}/>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 640, width: "100%", textAlign: "center" }}>

        {/* Logo */}
        <div className="fade-up-1 float" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <SymLogo size={44}/>
          <span style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
            <span style={{ color: C.white }}>Sym</span><span style={{ color: C.accent }}>YouLater</span>
          </span>
        </div>

        {/* Badge */}
        <div className="fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.08)", border: `1px solid rgba(255,107,53,0.2)`, borderRadius: 99, padding: "6px 16px 6px 10px", marginBottom: 32, fontSize: 12, color: C.accent }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, display: "inline-block", animation: "pulse 2s ease-in-out infinite" }}/>
          Something exciting is on its way
        </div>

        {/* Headline */}
        <h1 className="fade-up-2" style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.05, color: C.white, marginBottom: 24 }}>
          AI marketing tools,<br/>
          <span style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentWarm})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>built for creators.</span>
        </h1>

        {/* Subheading */}
        <p className="fade-up-3" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: C.muted, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 48px" }}>
          We're putting the finishing touches on 10 precision AI tools to help you write better content, grow faster, and reclaim your time. Join the waitlist and be first through the door.
        </p>

        {/* Email capture */}
        <div className="fade-up-4" style={{ marginBottom: 48 }}>
          {submitted ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(106,255,212,0.08)", border: "1px solid rgba(106,255,212,0.2)", borderRadius: 12, padding: "16px 28px", color: "#6AFFD4", fontSize: 15, fontWeight: 500 }}>
              <span style={{ fontSize: 20 }}>✓</span>
              You're on the list — we'll be in touch soon!
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{ flex: 1, minWidth: 240, padding: "13px 18px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.white, fontSize: 14, fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s, box-shadow 0.2s" }}
              />
              <button
                onClick={handleSubmit}
                style={{ padding: "13px 24px", background: `linear-gradient(135deg, ${C.accent}, ${C.accentWarm})`, border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px rgba(255,107,53,0.35)", whiteSpace: "nowrap" }}
              >
                Notify me →
              </button>
            </div>
          )}
          <p style={{ marginTop: 12, fontSize: 12, color: C.muted }}>No spam. No fluff. Just a heads up when we launch.</p>
        </div>

        {/* Tool teaser pills */}
        <div className="fade-up-5" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 56 }}>
          {["HashCraft","BioForge","CaptionCraft","CalendarAI","HookLab","LinkedForge","MetaCraft","OutlineAI","SubjectIQ","AdForge"].map((tool) => (
            <span key={tool} style={{ padding: "5px 12px", borderRadius: 99, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, fontSize: 12, color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>
              {tool}
            </span>
          ))}
        </div>

        {/* Social proof */}
        <div className="fade-up-5" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: C.accent, fontSize: 13 }}>★</span>)}
            <span style={{ fontSize: 12, color: C.muted, marginLeft: 4 }}>Built for modern creators</span>
          </div>
          <div style={{ width: 1, height: 14, background: C.border }}/>
          <span style={{ fontSize: 12, color: C.muted }}>10 AI-powered tools</span>
          <div style={{ width: 1, height: 14, background: C.border }}/>
          <span style={{ fontSize: 12, color: C.muted }}>No credit card required</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: 24, fontSize: 12, color: C.muted }}>
        © 2026 SymYouLater. All rights reserved.
      </div>

    </div>
  );
}