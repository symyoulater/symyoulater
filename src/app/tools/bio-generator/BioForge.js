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
  purple:     "#7C6AFF",
  teal:       "#6AFFD4",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const TONES = [
  { id:"professional", label:"Professional", emoji:"💼", desc:"Polished and credible" },
  { id:"witty",        label:"Witty",        emoji:"😄", desc:"Clever and memorable" },
  { id:"creative",     label:"Creative",     emoji:"✨", desc:"Bold and expressive" },
  { id:"minimal",      label:"Minimal",      emoji:"◽", desc:"Clean and simple" },
];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgb" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgb)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function BioForgeLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="bfg" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FF9F1C"/>
          <stop offset="100%" stopColor="#FF6B35"/>
        </linearGradient>
      </defs>
      <path d="M 40 26 C 40 34, 34 40, 26 40 C 18 40, 12 34, 12 26 C 12 18, 18 12, 26 12 C 34 12, 40 18, 40 26"
        stroke="url(#bfg)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <circle cx="26" cy="26" r="7" stroke="url(#bfg)" strokeWidth="3.5" fill="none"/>
      <path d="M 40 26 L 40 30 C 40 35, 36 38, 32 38"
        stroke="url(#bfg)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function BioCard({ bio, index }) {
  const [copied, setCopied] = useState(false);
  const [hov, setHov] = useState(false);
  const charCount = bio.length;
  const toneLabel = bio.tone || "creative";
  const toneColor = toneLabel === "professional" ? C.purple : toneLabel === "minimal" ? C.mutedLight : toneLabel === "witty" ? C.teal : C.accent;

  function copy() {
    navigator.clipboard.writeText(bio.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(19,19,31,0.95)" : C.card,
        border: `1px solid ${hov ? C.accent+"44" : C.border}`,
        borderRadius: 16, padding: 24,
        transition: "all 0.25s ease",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.4)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${C.accent}, transparent)` }}/>}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:toneColor }}>
            Variation {index + 1}
          </span>
          <span style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.04)", padding:"2px 8px", borderRadius:99, border:`1px solid ${C.border}` }}>
            {toneLabel}
          </span>
        </div>
        <span style={{ fontSize:11, color: charCount > 140 ? "#FFB86A" : C.muted, fontFamily:"'DM Mono',monospace" }}>
          {charCount}/150
        </span>
      </div>

      <div style={{
        fontFamily:"'DM Sans',sans-serif", fontSize:14, color:C.white,
        lineHeight:1.8, whiteSpace:"pre-line",
        background:"rgba(255,255,255,0.02)", borderRadius:10,
        padding:"14px 16px", border:`1px solid ${C.border}`,
        marginBottom:16, minHeight:100,
      }}>
        {bio.text}
      </div>

      <div style={{ marginBottom:16 }}>
        <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${Math.min((charCount/150)*100, 100)}%`, background: charCount > 140 ? "linear-gradient(90deg,#FFB86A,#FF6B35)" : `linear-gradient(90deg, ${C.accent}, #FF9F1C)`, borderRadius:99, transition:"width 0.5s ease" }}/>
        </div>
      </div>

      <button onClick={copy} style={{
        width:"100%", padding:"11px", borderRadius:9,
        background: copied ? "rgba(106,255,212,0.12)" : C.accentSoft,
        border: `1px solid ${copied ? C.teal+"55" : C.accent+"44"}`,
        color: copied ? C.teal : C.accent,
        fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
        cursor:"pointer", transition:"all 0.2s",
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
      }}>
        {copied ? "✓ Copied to clipboard!" : "Copy bio"}
      </button>
    </div>
  );
}

export default function BioForge() {
  const { generate, requiresAuth, setRequiresAuth } = useGenerate("bioforge");

  const [name, setName]         = useState("");
  const [niche, setNiche]       = useState("");
  const [keywords, setKeywords] = useState("");
  const [cta, setCta]           = useState("");
  const [tone, setTone]         = useState("creative");
  const [emoji, setEmoji]       = useState(true);
  const [bios, setBios]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const ready = name.trim() || niche.trim();

  async function doGenerate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setBios(null);

    const systemPrompt = `You are an expert Instagram bio copywriter. Generate 3 distinct Instagram bio variations based on the user's details.

Return ONLY a valid JSON array with exactly 3 objects. No markdown, no explanation. Format:
[
  {"text": "bio text here", "tone": "tone_name"},
  {"text": "bio text here", "tone": "tone_name"},
  {"text": "bio text here", "tone": "tone_name"}
]

Rules:
- Each bio must be under 150 characters
- Use line breaks (\\n) for structure where appropriate
- tone should be one of: professional, witty, creative, minimal
- ${emoji ? "Include relevant emojis where appropriate" : "Do NOT use any emojis"}
- Make each variation meaningfully different in structure and approach
- The requested tone is "${tone}" — make variation 1 match this tone most closely
- Variations 2 and 3 should explore adjacent tones`;

    const userPrompt = `Name/Brand: ${name || "not specified"}
Niche/Job: ${niche || "not specified"}
Keywords/Personality: ${keywords || "not specified"}
Call to action: ${cta || "not specified"}
Primary tone: ${tone}
Include emojis: ${emoji}

Generate 3 Instagram bio variations.`;

    try {
      const body = { model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages: [{ role: "user", content: userPrompt }] };
      const data = await generate(body);
        if (data === null) { setLoading(false); return; }
      const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse response.");

      const parsed = JSON.parse(match[0]);
      const biosWithLength = parsed.map(b => ({ ...b, length: b.text.length }));
      setBios(biosWithLength);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.white, padding:"0 0 80px" }}>
      {requiresAuth && <AuthModal onClose={() => setRequiresAuth(false)}/>}
      {/* Platform nav */}
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

      <div style={{ maxWidth:680, margin:"0 auto", padding:"40px 24px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:36 }}>
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#1f1208,#2a1a0a)", border:"1px solid rgba(255,107,53,0.28)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <BioForgeLogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Bio</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>Forge</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              Instagram Bio Generator
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { label:"Your name or brand", val:name, set:setName, placeholder:"e.g. Jane Doe" },
              { label:"Your niche or job title", val:niche, set:setNiche, placeholder:"e.g. Travel photographer" },
            ].map(f => (
              <div key={f.label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>{f.label}</div>
                <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.placeholder}
                  style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
              </div>
            ))}
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>Keywords &amp; personality traits</div>
            <input value={keywords} onChange={e=>setKeywords(e.target.value)}
              placeholder="e.g. adventure, minimalist, authentic, coffee obsessed..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>
              Call to action <span style={{ color:"#333", fontWeight:300, textTransform:"none", letterSpacing:0 }}>(optional)</span>
            </div>
            <input value={cta} onChange={e=>setCta(e.target.value)}
              placeholder="e.g. Free preset pack below, DM for collabs, Shop link below..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
          </div>

          {/* Tone */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10, paddingLeft:2 }}>Tone</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {TONES.map(t => {
                const on = tone === t.id;
                return (
                  <button key={t.id} onClick={() => setTone(t.id)} style={{
                    padding:"12px 8px", borderRadius:11,
                    border:`1px solid ${on ? C.accent+"66" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                  }}>
                    <span style={{ fontSize:18 }}>{t.emoji}</span>
                    <span style={{ fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{t.label}</span>
                    <span style={{ fontSize:10, color: on ? C.accent+"99" : "#44445a", fontFamily:"'DM Sans',sans-serif" }}>{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Emoji toggle */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"13px 16px" }}>
            <div>
              <div style={{ fontSize:13, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>Include emojis</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Add relevant emojis to your bio</div>
            </div>
            <div onClick={() => setEmoji(!emoji)} style={{ width:36, height:20, background:emoji ? C.accent : "#2a2a3d", borderRadius:99, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
              <div style={{ position:"absolute", width:14, height:14, background:"#fff", borderRadius:"50%", top:3, left:emoji?19:3, transition:"left 0.2s" }}/>
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
          background: (!ready || loading) ? "#2a2a3d" : `linear-gradient(135deg, ${C.accent}, #FF9F1C)`,
          border:"none", borderRadius:12,
          color: (!ready || loading) ? C.muted : "#fff",
          fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, letterSpacing:"0.04em",
          cursor: (!ready || loading) ? "not-allowed" : "pointer",
          marginBottom:32,
          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          boxShadow: ready && !loading ? "0 4px 24px rgba(255,107,53,0.25)" : "none",
          transition:"all 0.2s",
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? (
            <>
              <div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
              Crafting your bios...
            </>
          ) : (
            <>@ Generate Instagram Bios</>
          )}
        </button>

        {/* Results */}
        {bios && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>
                Your Bios
              </div>
              <div style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>
                3 variations generated
              </div>
            </div>

            <div style={{ background:"rgba(255,107,53,0.06)", border:`1px solid rgba(255,107,53,0.15)`, borderRadius:10, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14 }}>💡</span>
              <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
                Instagram bios are limited to <strong style={{ color:C.white }}>150 characters</strong>. The bar below each bio shows how close you are to the limit.
              </span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {bios.map((bio, i) => <BioCard key={i} bio={bio} index={i}/>)}
            </div>

            <button onClick={doGenerate} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, cursor:"pointer" }}>
              ↻ Generate new variations
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
