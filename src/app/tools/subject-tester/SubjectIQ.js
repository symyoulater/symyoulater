"use client";
import { useState } from "react";
import Link from "next/link";
import { useGenerate } from "../../../hooks/useGenerate";
import AuthModal from "../../../components/AuthModal";

const C = {
  bg:         "#080810",
  card:       "#13131f",
  border:     "rgba(255,255,255,0.07)",
  accent:     "#6AFFD4",
  accentSoft: "rgba(106,255,212,0.1)",
  accentGlow: "rgba(106,255,212,0.2)",
  orange:     "#FF6B35",
  pink:       "#FF6A9E",
  purple:     "#7C6AFF",
  yellow:     "#FFD700",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const EMAIL_TYPES = [
  { id:"newsletter",   label:"Newsletter",     emoji:"📰" },
  { id:"promotional",  label:"Promotional",    emoji:"🎯" },
  { id:"welcome",      label:"Welcome",        emoji:"👋" },
  { id:"abandoned",    label:"Abandoned Cart", emoji:"🛒" },
  { id:"reengagement", label:"Re-engagement",  emoji:"🔄" },
  { id:"announcement", label:"Announcement",   emoji:"📣" },
];

const INDUSTRIES = [
  "E-commerce", "SaaS", "Creator / Media", "Agency", "Retail", "Education", "Health & Wellness",
];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgsiq" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgsiq)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function SubjectIQLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="siqg" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6AFFD4"/>
          <stop offset="100%" stopColor="#00C4A0"/>
        </linearGradient>
      </defs>
      <path d="M 6 14 L 26 30 L 46 14" stroke="url(#siqg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="6" y="12" width="40" height="28" rx="4" stroke="url(#siqg)" strokeWidth="3" fill="none"/>
      <circle cx="40" cy="10" r="8" fill="#080810" stroke="url(#siqg)" strokeWidth="2"/>
      <text x="40" y="14" textAnchor="middle" fontSize="9" fontWeight="800" fill="url(#siqg)" fontFamily="sans-serif">IQ</text>
    </svg>
  );
}

function GradeRing({ grade, score }) {
  const gradeColors = {
    "A+": C.accent, "A": C.accent, "A-": "#90EE90",
    "B+": C.yellow,  "B": C.yellow,  "B-": "#FFA500",
    "C+": C.orange,  "C": C.orange,
    "D":  C.pink,
  };
  const color = gradeColors[grade] || C.muted;
  return (
    <div style={{ position:"relative", width:56, height:56, flexShrink:0 }}>
      {requiresAuth && <AuthModal onClose={() => setRequiresAuth(false)}/>}
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="23" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"/>
        <circle cx="28" cy="28" r="23" fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${((score||85)/100)*144} 144`}
          strokeLinecap="round" transform="rotate(-90 28 28)"/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontSize:16, fontFamily:"'Outfit',sans-serif", fontWeight:900, color, lineHeight:1 }}>{grade}</div>
        <div style={{ fontSize:9, color:C.muted, fontFamily:"'DM Mono',monospace", marginTop:1 }}>{score}</div>
      </div>
    </div>
  );
}

function OpenRateBar({ rate }) {
  const avg = 21.5;
  const max = 45;
  const pct = Math.min(((rate || 0) / max) * 100, 100);
  const avgPct = (avg / max) * 100;
  const color = rate >= 30 ? C.accent : rate >= 25 ? "#90EE90" : rate >= 20 ? C.yellow : C.orange;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontSize:11, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif" }}>Predicted open rate</span>
        <span style={{ fontSize:13, color, fontFamily:"'DM Mono',monospace", fontWeight:700 }}>{rate}%</span>
      </div>
      <div style={{ position:"relative", height:6, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"visible" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:99, transition:"width 0.5s" }}/>
        <div style={{ position:"absolute", top:-3, width:2, height:12, background:"rgba(255,255,255,0.2)", borderRadius:99, left:`${avgPct}%`, transform:"translateX(-50%)" }}/>
      </div>
      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:3 }}>
        <span style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>industry avg: {avg}%</span>
      </div>
    </div>
  );
}

function SubjectCard({ result, index }) {
  const [copied, setCopied]     = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hov, setHov]           = useState(false);
  const spamColor = result.spam_risk === "low" ? C.accent : result.spam_risk === "medium" ? C.yellow : C.pink;
  const charCount = (result.subject || "").length;
  const wordCount = result.subject ? result.subject.trim().split(/\s+/).length : 0;
  const mobilePreview = result.mobile_preview || (result.subject ? result.subject.slice(0, 35) + (result.subject.length > 35 ? "..." : "") : "");

  function copy() {
    navigator.clipboard.writeText(result.subject);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(19,19,31,0.98)" : C.card,
        border: `1px solid ${hov ? C.accent+"44" : C.border}`,
        borderRadius:16, padding:22,
        transition:"all 0.25s",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.4)" : "none",
        position:"relative", overflow:"hidden",
      }}
    >
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.accent},transparent)` }}/>}

      {/* Top row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:16 }}>
        <div style={{ flex:1, minWidth:0 }}>
          {/* Mobile preview */}
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px", marginBottom:10 }}>
            <span style={{ fontSize:11, color:C.muted, flexShrink:0 }}>📱</span>
            <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{mobilePreview}</span>
          </div>
          {/* Full subject */}
          <div style={{ fontSize:15, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:600, lineHeight:1.4, marginBottom:8 }}>
            {result.subject}
          </div>
          {/* Pills */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <span style={{ fontSize:10, color:C.muted, background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`, padding:"2px 8px", borderRadius:99, fontFamily:"'DM Mono',monospace" }}>
              {charCount} chars
            </span>
            <span style={{ fontSize:10, color:C.muted, background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`, padding:"2px 8px", borderRadius:99, fontFamily:"'DM Mono',monospace" }}>
              {wordCount} words
            </span>
            {result.spam_risk && (
              <span style={{ fontSize:10, color:spamColor, background:`${spamColor}12`, border:`1px solid ${spamColor}33`, padding:"2px 8px", borderRadius:99, fontFamily:"'DM Sans',sans-serif" }}>
                {result.spam_risk} spam risk
              </span>
            )}
          </div>
        </div>
        <GradeRing grade={result.grade || "B"} score={result.score || 80}/>
      </div>

      {/* Open rate bar */}
      {result.open_rate && (
        <div style={{ marginBottom:16 }}>
          <OpenRateBar rate={result.open_rate}/>
        </div>
      )}

      {/* Analysis toggle */}
      <button onClick={() => setExpanded(!expanded)} style={{
        background:"transparent", border:"none", cursor:"pointer",
        fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif",
        display:"flex", alignItems:"center", gap:6, padding:0,
        marginBottom: expanded ? 12 : 4,
      }}>
        <span style={{ transition:"transform 0.2s", display:"inline-block", transform: expanded ? "rotate(90deg)" : "rotate(0)" }}>▶</span>
        Analysis
      </button>

      {expanded && (
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
          {(result.strengths || []).map((s, i) => (
            <div key={i} style={{ display:"flex", gap:8, padding:"8px 12px", background:"rgba(106,255,212,0.06)", border:`1px solid ${C.accent}22`, borderRadius:8 }}>
              <span style={{ color:C.accent, fontSize:12, flexShrink:0 }}>✓</span>
              <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>{s}</span>
            </div>
          ))}
          {(result.warnings || []).map((w, i) => (
            <div key={i} style={{ display:"flex", gap:8, padding:"8px 12px", background:"rgba(255,184,106,0.07)", border:`1px solid rgba(255,184,106,0.2)`, borderRadius:8 }}>
              <span style={{ color:"#FFB86A", fontSize:12, flexShrink:0 }}>⚠</span>
              <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Copy */}
      <button onClick={copy} style={{
        width:"100%", padding:"10px", borderRadius:9, marginTop:4,
        background: copied ? "rgba(106,255,212,0.15)" : C.accentSoft,
        border:`1px solid ${copied ? C.accent+"66" : C.accent+"33"}`,
        color: C.accent,
        fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
        cursor:"pointer", transition:"all 0.2s",
      }}>
        {copied ? "✓ Copied!" : "Copy subject line"}
      </button>
    </div>
  );
}

export default function SubjectIQ() {
  const { generate, requiresAuth, setRequiresAuth } = useGenerate("subjectiq");

  const [emailContent, setEmailContent] = useState("");
  const [audience, setAudience]         = useState("");
  const [emailType, setEmailType]       = useState("newsletter");
  const [industry, setIndustry]         = useState("Creator / Media");
  const [count, setCount]               = useState(5);
  const [results, setResults]           = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  const ready = emailContent.trim().length > 0;

  async function doGenerate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setResults(null);

    const systemPrompt = `You are an expert email marketing copywriter who specialises in subject lines that maximise open rates. You understand email psychology, deliverability, and what works across different industries and audiences.

Return ONLY a valid JSON array with exactly ${count} subject line objects. No markdown, no explanation. Format:
[
  {
    "subject": "the subject line text",
    "grade": "A+",
    "score": 94,
    "open_rate": 32.1,
    "spam_risk": "low",
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "warnings": ["warning if any"]
  }
]

Rules:
- subject: the complete email subject line
- grade: A+ / A / A- / B+ / B / B- / C+ / C / D based on predicted performance
- score: 60-99 numerical score
- open_rate: realistic predicted open rate percentage (industry avg is ~21.5%) — range 15-42%
- spam_risk: "low", "medium", or "high" based on spam trigger words, excessive punctuation, ALL CAPS
- strengths: 2-3 specific psychological/tactical reasons why this subject line will perform
- warnings: array of 0-2 specific warnings (empty array if none)
- Email type: ${emailType}
- Industry: ${industry}
- Sort results from highest to lowest score
- Make each variation meaningfully different in approach (curiosity, urgency, personalisation, benefit, story, etc.)
- No two subjects should use the same psychological tactic
- Be realistic with open_rate predictions — most will be 20-35%, exceptional ones up to 42%`;

    const userPrompt = `Email content/topic: ${emailContent}
${audience ? `Target audience: ${audience}` : ""}
Email type: ${emailType}
Industry: ${industry}

Generate ${count} subject lines with full scoring analysis.`;

    try {
      const data = await generate(body);
        if (data === null) { setLoading(false); return; }
      const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse response.");
      setResults(JSON.parse(match[0]));
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const topScore = results ? Math.max(...results.map(r => r.score || 0)) : 0;
  const avgRate  = results && results.length > 0
    ? (results.reduce((a, r) => a + (r.open_rate || 0), 0) / results.length).toFixed(1)
    : 0;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.white, paddingBottom:80 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Nav */}
      <nav style={{ padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}`, background:"rgba(8,8,16,0.9)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:100 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
          <SymLogo size={24}/>
          <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:15, color:C.muted, letterSpacing:"-0.01em" }}>
            Sym<span style={{ color:C.orange }}>YouLater</span>
          </span>
        </Link>
        <Link href="/" style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif", textDecoration:"none" }}>
          ← All tools
        </Link>
      </nav>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 24px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:12 }}>
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#081a14,#0a2a1e)", border:"1px solid rgba(106,255,212,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <SubjectIQLogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Subject</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>IQ</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              Email Subject Line Tester
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={{ background:"rgba(106,255,212,0.05)", border:`1px solid rgba(106,255,212,0.12)`, borderRadius:12, padding:"12px 16px", marginBottom:28, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>✉️</span>
          <span style={{ fontSize:13, color:C.mutedLight, lineHeight:1.5 }}>
            <strong style={{ color:C.white }}>47% of recipients</strong> decide to open an email based on the subject line alone. A 5% lift in open rate on a list of 10,000 = <strong style={{ color:C.accent }}>500 more readers</strong>.
          </span>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>What is this email about?</div>
            <textarea value={emailContent} onChange={e => setEmailContent(e.target.value)}
              placeholder="e.g. Announcing our new AI pricing tool, a limited 48-hour sale on our course, tips for growing an email list..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.6, resize:"none", minHeight:80, outline:"none" }}/>
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>
              Target audience <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(optional)</span>
            </div>
            <input value={audience} onChange={e => setAudience(e.target.value)}
              placeholder="e.g. Small business owners, freelance designers, fitness enthusiasts..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
          </div>

          {/* Email type */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Email type</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {EMAIL_TYPES.map(t => {
                const on = emailType === t.id;
                return (
                  <button key={t.id} onClick={() => setEmailType(t.id)} style={{
                    padding:"10px", borderRadius:10,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:8,
                    fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight: on ? 600 : 400,
                  }}>
                    <span>{t.emoji}</span>{t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Industry + Count */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"start" }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Industry</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {INDUSTRIES.map(ind => (
                  <button key={ind} onClick={() => setIndustry(ind)} style={{
                    padding:"5px 12px", borderRadius:99,
                    border:`1px solid ${industry===ind ? C.accent+"55" : C.border}`,
                    background: industry===ind ? C.accentSoft : "transparent",
                    color: industry===ind ? C.accent : C.muted,
                    fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer", transition:"all 0.2s",
                  }}>
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Count</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {[3, 5, 8].map(n => (
                  <button key={n} onClick={() => setCount(n)} style={{
                    width:44, height:32, borderRadius:8,
                    border:`1px solid ${count===n ? C.accent+"55" : C.border}`,
                    background: count===n ? C.accentSoft : "transparent",
                    color: count===n ? C.accent : C.muted,
                    fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:700,
                    cursor:"pointer", transition:"all 0.2s",
                  }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ background:"rgba(255,106,158,0.1)", border:"1.5px solid rgba(255,106,158,0.3)", borderRadius:9, padding:"11px 14px", fontSize:13, color:"#ff6a9e", marginBottom:14 }}>
            {error}
          </div>
        )}

        {/* Generate */}
        <button onClick={doGenerate} disabled={loading || !ready} style={{
          width:"100%", padding:16,
          background: (!ready || loading) ? "#2a2a3d" : `linear-gradient(135deg, ${C.accent}, #00C4A0)`,
          border:"none", borderRadius:12,
          color: (!ready || loading) ? C.muted : "#080810",
          fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, letterSpacing:"0.04em",
          cursor: (!ready || loading) ? "not-allowed" : "pointer",
          marginBottom:32,
          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          boxShadow: ready && !loading ? `0 4px 24px ${C.accentGlow}` : "none",
          transition:"all 0.2s", opacity: loading ? 0.7 : 1,
        }}>
          {loading ? (
            <>
              <div style={{ width:16, height:16, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#080810", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
              Testing subject lines...
            </>
          ) : <>✉️ Generate &amp; Score Subject Lines</>}
        </button>

        {/* Results */}
        {results && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>
                Your Subject Lines
              </div>
              <div style={{ display:"flex", gap:20 }}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>best score</div>
                  <div style={{ fontSize:18, fontFamily:"'Outfit',sans-serif", fontWeight:800, color:C.accent }}>{topScore}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>avg. open rate</div>
                  <div style={{ fontSize:18, fontFamily:"'Outfit',sans-serif", fontWeight:800, color:C.accent }}>{avgRate}%</div>
                </div>
              </div>
            </div>

            <div style={{ background:"rgba(106,255,212,0.05)", border:`1px solid rgba(106,255,212,0.12)`, borderRadius:10, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14 }}>💡</span>
              <span style={{ fontSize:12, color:C.mutedLight, lineHeight:1.5 }}>
                Each line is graded A–D with a <strong style={{ color:C.white }}>predicted open rate</strong>. Click <strong style={{ color:C.white }}>Analysis</strong> for the psychology behind each one.
              </span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {results.map((r, i) => <SubjectCard key={i} result={r} index={i}/>)}
            </div>

            <button onClick={doGenerate} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>
              ↻ Generate new subject lines
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
