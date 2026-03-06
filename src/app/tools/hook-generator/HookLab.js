"use client";
import { useState } from "react";
import Link from "next/link";
import { useGenerate } from "../../../hooks/useGenerate";
import AuthModal from "../../../components/AuthModal";

const C = {
  bg:         "#080810",
  card:       "#13131f",
  border:     "rgba(255,255,255,0.07)",
  accent:     "#FF6B35",
  accentSoft: "rgba(255,107,53,0.12)",
  pink:       "#FF6A9E",
  pinkSoft:   "rgba(255,106,158,0.1)",
  teal:       "#6AFFD4",
  purple:     "#7C6AFF",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const HOOK_TYPES = [
  { id:"pov",         label:"POV",         emoji:"👁",  desc:"Point of view story" },
  { id:"secret",      label:"Secret/Hack", emoji:"🤫",  desc:"Hidden knowledge reveal" },
  { id:"mistake",     label:"Mistake",     emoji:"❌",  desc:"Common error to avoid" },
  { id:"countdown",   label:"Countdown",   emoji:"🔢",  desc:"Numbered list format" },
  { id:"question",    label:"Question",    emoji:"❓",  desc:"Open with curiosity" },
  { id:"story",       label:"Story",       emoji:"📖",  desc:"Narrative opener" },
  { id:"controversy", label:"Hot Take",    emoji:"🔥",  desc:"Bold opinion" },
  { id:"challenge",   label:"Challenge",   emoji:"⚡",  desc:"Dare or competition" },
];

const NICHE_SUGGESTIONS = [
  "fitness & health", "travel", "cooking & food", "personal finance",
  "photography", "beauty & skincare", "productivity", "fashion",
];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slghl" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slghl)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function HookLabLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="hlg" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FF6A9E"/>
          <stop offset="100%" stopColor="#FF6B35"/>
        </linearGradient>
      </defs>
      <path d="M 30 6 L 18 28 L 26 28 L 22 46 L 34 24 L 26 24 Z"
        stroke="url(#hlg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="10" cy="14" r="2"   fill="#FF6A9E" opacity="0.6"/>
      <circle cx="42" cy="38" r="1.5" fill="#FF6B35" opacity="0.5"/>
      <circle cx="40" cy="12" r="2.5" fill="#FF6A9E" opacity="0.4"/>
    </svg>
  );
}

function ScoreBadge({ score }) {
  const color = score >= 95 ? C.teal : score >= 90 ? C.accent : score >= 85 ? "#FFB86A" : C.muted;
  const label = score >= 95 ? "Viral" : score >= 90 ? "Strong" : score >= 85 ? "Good" : "Solid";
  const circumference = 107;
  const dash = (score / 100) * circumference;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      {requiresAuth && <AuthModal onClose={() => setRequiresAuth(false)}/>}
      <div style={{ position:"relative", width:40, height:40 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
          <circle cx="20" cy="20" r="17" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round" transform="rotate(-90 20 20)"/>
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontFamily:"'DM Mono',monospace", color, fontWeight:700 }}>
          {score}
        </div>
      </div>
      <div>
        <div style={{ fontSize:11, color, fontFamily:"'DM Sans',sans-serif", fontWeight:700 }}>{label}</div>
        <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>hook score</div>
      </div>
    </div>
  );
}

function HookCard({ hook, index }) {
  const [copied, setCopied]   = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [hov, setHov]         = useState(false);
  const typeInfo = HOOK_TYPES.find(t => t.id === hook.type) || HOOK_TYPES[0];

  function copy() {
    navigator.clipboard.writeText(hook.hook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(19,19,31,0.98)" : C.card,
        border: `1px solid ${hov ? C.pink+"44" : C.border}`,
        borderRadius:16, padding:24,
        transition:"all 0.25s",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${C.pink}11` : "none",
        position:"relative", overflow:"hidden",
      }}
    >
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.pink},transparent)` }}/>}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:C.pinkSoft, border:`1px solid ${C.pink}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
            {typeInfo.emoji}
          </div>
          <div>
            <div style={{ fontSize:11, color:C.pink, fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>{typeInfo.label}</div>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>{typeInfo.desc}</div>
          </div>
        </div>
        <ScoreBadge score={hook.score || 85}/>
      </div>

      {/* Hook text */}
      <div style={{
        fontFamily:"'DM Sans',sans-serif", fontSize:15, color:C.white,
        lineHeight:1.7, background:"rgba(255,255,255,0.02)",
        borderRadius:10, padding:16, border:`1px solid ${C.border}`,
        marginBottom:16, fontWeight:500,
      }}>
        &ldquo;{hook.hook}&rdquo;
      </div>

      {/* Why it works */}
      <div style={{ marginBottom:16 }}>
        <button onClick={() => setShowWhy(!showWhy)} style={{
          background:"transparent", border:"none", cursor:"pointer",
          fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif",
          display:"flex", alignItems:"center", gap:6, padding:0,
        }}>
          <span style={{ transition:"transform 0.2s", display:"inline-block", transform: showWhy ? "rotate(90deg)" : "rotate(0)" }}>▶</span>
          Why this works
        </button>
        {showWhy && hook.why && (
          <div style={{ marginTop:10, padding:"12px 14px", background:C.pinkSoft, border:`1px solid ${C.pink}22`, borderRadius:9, fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.7 }}>
            {hook.why}
          </div>
        )}
      </div>

      {/* Copy */}
      <button onClick={copy} style={{
        width:"100%", padding:"10px", borderRadius:9,
        background: copied ? "rgba(106,255,212,0.12)" : C.pinkSoft,
        border: `1px solid ${copied ? C.teal+"55" : C.pink+"33"}`,
        color: copied ? C.teal : C.pink,
        fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
        cursor:"pointer", transition:"all 0.2s",
      }}>
        {copied ? "✓ Copied!" : "Copy hook"}
      </button>
    </div>
  );
}

export default function HookLab() {
  const { generate, requiresAuth, setRequiresAuth } = useGenerate("hooklab");

  const [topic, setTopic]               = useState("");
  const [niche, setNiche]               = useState("");
  const [selectedTypes, setSelectedTypes] = useState(["pov","secret","mistake","controversy"]);
  const [count, setCount]               = useState(5);
  const [hooks, setHooks]               = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  const ready = topic.trim().length > 0;

  function toggleType(id) {
    setSelectedTypes(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(t => t !== id) : prev
        : [...prev, id]
    );
  }

  async function doGenerate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setHooks(null);

    const systemPrompt = `You are a viral TikTok content strategist who specialises in writing scroll-stopping opening hooks. You understand TikTok's algorithm, viewer psychology, and what makes people stop scrolling.

Return ONLY a valid JSON array with exactly ${count} hook objects. No markdown, no explanation. Format:
[
  {
    "type": "hook_type_id",
    "hook": "the full hook text",
    "score": 85,
    "why": "explanation of why this hook works psychologically"
  }
]

Rules:
- type must be one of: ${selectedTypes.join(", ")}
- hook: the complete opening hook text (1-3 sentences max, punchy and direct)
- score: virality score 75-99 based on pattern interrupt, curiosity gap, emotional trigger, specificity
- why: 1-3 sentences explaining the psychological triggers used (curiosity gap, FOMO, pattern interrupt, social proof, etc.)
- Make hooks specific to the niche and topic — no generic hooks
- Vary the approach across all ${count} hooks
- The hook should be something you'd actually say/show in the first 3 seconds of a TikTok
- Hooks should feel natural and conversational, not like marketing copy`;

    const userPrompt = `Video topic: ${topic}
Niche: ${niche || "general"}
Hook types requested: ${selectedTypes.join(", ")}
Number of hooks: ${count}

Generate ${count} viral TikTok hooks for this video.`;

    try {
      const body = { model: "claude-sonnet-4-20250514", max_tokens: 2000, system: systemPrompt, messages: [{ role: "user", content: userPrompt }] };
      const data = await generate(body);
        if (data === null) { setLoading(false); return; }
      const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse response.");
      setHooks(JSON.parse(match[0]));
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const avgScore = hooks && hooks.length > 0
    ? Math.round(hooks.reduce((a, h) => a + (h.score || 85), 0) / hooks.length)
    : 0;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.white, paddingBottom:80 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Nav */}
      <nav style={{ padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}`, background:"rgba(8,8,16,0.9)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:100 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
          <SymLogo size={24}/>
          <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:15, color:C.muted, letterSpacing:"-0.01em" }}>
            Sym<span style={{ color:C.accent }}>YouLater</span>
          </span>
        </Link>
        <Link href="/" style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif", textDecoration:"none" }}>
          ← All tools
        </Link>
      </nav>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 24px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:12 }}>
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#1a0810,#2a1020)", border:"1px solid rgba(255,106,158,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <HookLabLogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Hook</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.pink }}>Lab</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              TikTok Viral Hook Generator
            </div>
          </div>
        </div>

        {/* Stat banner */}
        <div style={{ background:"rgba(255,106,158,0.06)", border:`1px solid rgba(255,106,158,0.15)`, borderRadius:12, padding:"12px 16px", marginBottom:28, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>⚡</span>
          <span style={{ fontSize:13, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
            <strong style={{ color:C.white }}>The first 3 seconds</strong> determine if TikTok promotes your video. A strong hook can increase watch time by up to <strong style={{ color:C.pink }}>3×</strong>.
          </span>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          {/* Topic */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>What is your video about?</div>
            <textarea value={topic} onChange={e => setTopic(e.target.value)}
              placeholder="e.g. How I edited my travel photos to get 500k views, my morning routine as a full-time creator..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.6, resize:"none", minHeight:70, outline:"none" }}/>
          </div>

          {/* Niche */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Your niche</div>
            <input value={niche} onChange={e => setNiche(e.target.value)}
              placeholder="e.g. Travel photography, personal finance, fitness..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10 }}>
              {NICHE_SUGGESTIONS.map(s => (
                <button key={s} onClick={() => setNiche(s)} style={{
                  padding:"4px 10px", borderRadius:99,
                  border:`1px solid ${C.border}`, background:"transparent",
                  color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:11, cursor:"pointer",
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Hook types */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Hook types to generate</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {HOOK_TYPES.map(t => {
                const on = selectedTypes.includes(t.id);
                return (
                  <button key={t.id} onClick={() => toggleType(t.id)} style={{
                    padding:"11px 8px", borderRadius:11,
                    border:`1px solid ${on ? C.pink+"55" : C.border}`,
                    background: on ? C.pinkSoft : C.card,
                    color: on ? C.pink : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                  }}>
                    <span style={{ fontSize:18 }}>{t.emoji}</span>
                    <span style={{ fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{t.label}</span>
                    <span style={{ fontSize:9, color: on ? C.pink+"88" : "#44445a", fontFamily:"'DM Sans',sans-serif", textAlign:"center" }}>{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Count */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"13px 16px" }}>
            <div>
              <div style={{ fontSize:13, color:C.white, fontWeight:500 }}>Number of hooks</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>How many variations to generate</div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              {[3, 5, 8].map(n => (
                <button key={n} onClick={() => setCount(n)} style={{
                  width:36, height:36, borderRadius:9,
                  border:`1px solid ${count===n ? C.pink+"55" : C.border}`,
                  background: count===n ? C.pinkSoft : "transparent",
                  color: count===n ? C.pink : C.muted,
                  fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:700,
                  cursor:"pointer", transition:"all 0.2s",
                }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div style={{ background:"rgba(255,106,158,0.1)", border:"1.5px solid rgba(255,106,158,0.3)", borderRadius:9, padding:"11px 14px", fontSize:13, color:"#ff6a9e", marginBottom:14 }}>
            {error}
          </div>
        )}

        {/* Generate button */}
        <button onClick={doGenerate} disabled={loading || !ready} style={{
          width:"100%", padding:16,
          background: (!ready || loading) ? "#2a2a3d" : `linear-gradient(135deg, ${C.pink}, ${C.accent})`,
          border:"none", borderRadius:12,
          color: (!ready || loading) ? C.muted : "#fff",
          fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, letterSpacing:"0.04em",
          cursor: (!ready || loading) ? "not-allowed" : "pointer",
          marginBottom:32,
          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          boxShadow: ready && !loading ? "0 4px 24px rgba(255,106,158,0.3)" : "none",
          transition:"all 0.2s", opacity: loading ? 0.7 : 1,
        }}>
          {loading ? (
            <>
              <div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
              Crafting viral hooks...
            </>
          ) : <>⚡ Generate Viral Hooks</>}
        </button>

        {/* Results */}
        {hooks && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>
                Your Hooks
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>avg. score</div>
                  <div style={{ fontSize:18, fontFamily:"'Outfit',sans-serif", fontWeight:800, color:C.pink }}>{avgScore}</div>
                </div>
                <div style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>
                  {hooks.length} hooks generated
                </div>
              </div>
            </div>

            <div style={{ background:"rgba(255,106,158,0.06)", border:`1px solid rgba(255,106,158,0.15)`, borderRadius:10, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14 }}>💡</span>
              <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
                Click <strong style={{ color:C.white }}>&ldquo;Why this works&rdquo;</strong> under each hook to see the psychology behind it. Use the score to pick the strongest one to test first.
              </span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {hooks.map((h, i) => <HookCard key={i} hook={h} index={i}/>)}
            </div>

            <button onClick={doGenerate} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>
              ↻ Generate new hooks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
