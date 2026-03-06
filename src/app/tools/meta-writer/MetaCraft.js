"use client";
import { useState } from "react";
import Link from "next/link";
import { useGenerate } from "../../../hooks/useGenerate";
import AuthModal from "../../../components/AuthModal";

const C = {
  bg:         "#080810",
  card:       "#13131f",
  border:     "rgba(255,255,255,0.07)",
  accent:     "#7C6AFF",
  accentSoft: "rgba(124,106,255,0.12)",
  accentGlow: "rgba(124,106,255,0.25)",
  orange:     "#FF6B35",
  teal:       "#6AFFD4",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const PAGE_TYPES = [
  { id:"homepage", label:"Homepage",       emoji:"🏠" },
  { id:"product",  label:"Product Page",   emoji:"🛍️" },
  { id:"blog",     label:"Blog Post",      emoji:"📝" },
  { id:"service",  label:"Service Page",   emoji:"⚙️" },
  { id:"category", label:"Category Page",  emoji:"📂" },
  { id:"landing",  label:"Landing Page",   emoji:"🎯" },
];

const GOALS = [
  { id:"clicks",  label:"Maximise clicks",   emoji:"👆" },
  { id:"ranking", label:"Rank for keywords", emoji:"📈" },
  { id:"brand",   label:"Build brand trust", emoji:"🏆" },
  { id:"convert", label:"Drive conversions", emoji:"💰" },
];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgmc" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgmc)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function MetaCraftLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="mcg" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#A78BFF"/>
          <stop offset="100%" stopColor="#7C6AFF"/>
        </linearGradient>
      </defs>
      <circle cx="22" cy="22" r="13" stroke="url(#mcg)" strokeWidth="3.2" fill="none"/>
      <line x1="31" y1="31" x2="44" y2="44" stroke="url(#mcg)" strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="15" y1="19" x2="29" y2="19" stroke="url(#mcg)" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="15" y1="24" x2="26" y2="24" stroke="url(#mcg)" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

function CharBar({ current, max, warningAt, label }) {
  const pct = Math.min((current / max) * 100, 100);
  const isOver = current > max;
  const isWarning = current > warningAt && !isOver;
  const color = isOver ? "#FF6A9E" : isWarning ? "#FFB86A" : C.accent;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      {requiresAuth && <AuthModal onClose={() => setRequiresAuth(false)}/>}
      <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Mono',monospace", width:80, flexShrink:0 }}>{label}</div>
      <div style={{ flex:1, height:4, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:99, transition:"width 0.4s" }}/>
      </div>
      <div style={{ fontSize:11, color, fontFamily:"'DM Mono',monospace", width:52, textAlign:"right", flexShrink:0 }}>
        {current}/{max}
      </div>
    </div>
  );
}

function GooglePreview({ result, domain }) {
  const displayDomain = domain || "yoursite.com";
  return (
    <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 18px", marginBottom:16 }}>
      <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10, fontFamily:"'DM Sans',sans-serif" }}>Google preview</div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
        <div style={{ width:16, height:16, borderRadius:3, background:`linear-gradient(135deg,${C.accent},#9b8aff)`, flexShrink:0 }}/>
        <div style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif" }}>{displayDomain}</div>
      </div>
      <div style={{ fontSize:18, color:"#8AB4F8", fontFamily:"'DM Sans',sans-serif", fontWeight:400, marginBottom:4, lineHeight:1.3 }}>
        {result.title}
      </div>
      <div style={{ fontSize:13, color:"#BDC1C6", fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>
        {result.description}
      </div>
    </div>
  );
}

function MetaCard({ result, index, domain }) {
  const [copied, setCopied]     = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [hov, setHov]           = useState(false);
  const scoreColor = (result.score || 85) >= 95 ? C.teal : (result.score || 85) >= 88 ? C.accent : "#FFB86A";

  function copy(text, which) {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  const titleLen = (result.title || "").length;
  const descLen  = (result.description || "").length;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(19,19,31,0.98)" : C.card,
        border: `1px solid ${hov ? C.accent+"44" : C.border}`,
        borderRadius:16, padding:24,
        transition:"all 0.25s",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.4)" : "none",
        position:"relative", overflow:"hidden",
      }}
    >
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.accent},transparent)` }}/>}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ fontSize:11, color:C.accent, fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>
          Variation {index + 1}
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", border:`2px solid ${scoreColor}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontFamily:"'DM Mono',monospace", color:scoreColor, fontWeight:700 }}>
            {result.score || 85}
          </div>
          <span style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>SEO score</span>
        </div>
      </div>

      {/* Google preview */}
      <GooglePreview result={result} domain={domain}/>

      {/* Char bars */}
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        <CharBar current={titleLen} max={60}  warningAt={50}  label="Title"/>
        <CharBar current={descLen}  max={160} warningAt={140} label="Description"/>
      </div>

      {/* Keyword hits */}
      {result.keywords_hit && result.keywords_hit.length > 0 && (
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
          {result.keywords_hit.map(kw => (
            <div key={kw} style={{ fontSize:11, color:C.accent, background:C.accentSoft, border:`1px solid ${C.accent}33`, padding:"3px 9px", borderRadius:99, fontFamily:"'DM Sans',sans-serif" }}>
              ✓ {kw}
            </div>
          ))}
        </div>
      )}

      {/* Why it ranks */}
      {result.tips && result.tips.length > 0 && (
        <div style={{ marginBottom:16 }}>
          <button onClick={() => setShowTips(!showTips)} style={{
            background:"transparent", border:"none", cursor:"pointer",
            fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif",
            display:"flex", alignItems:"center", gap:6, padding:0,
          }}>
            <span style={{ transition:"transform 0.2s", display:"inline-block", transform: showTips ? "rotate(90deg)" : "rotate(0)" }}>▶</span>
            Why this ranks
          </button>
          {showTips && (
            <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:6 }}>
              {result.tips.map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:8, padding:"8px 12px", background:C.accentSoft, border:`1px solid ${C.accent}22`, borderRadius:8 }}>
                  <span style={{ color:C.accent, fontSize:12, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Copy buttons */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        {[
          { label:"Copy title",       which:"title", text:result.title },
          { label:"Copy description", which:"desc",  text:result.description },
        ].map(btn => (
          <button key={btn.which} onClick={() => copy(btn.text, btn.which)} style={{
            padding:"10px", borderRadius:9,
            background: copied===btn.which ? "rgba(106,255,212,0.12)" : C.accentSoft,
            border: `1px solid ${copied===btn.which ? C.teal+"55" : C.accent+"33"}`,
            color: copied===btn.which ? C.teal : C.accent,
            fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:600,
            cursor:"pointer", transition:"all 0.2s",
          }}>
            {copied===btn.which ? "✓ Copied!" : btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MetaCraft() {
  const { generate, requiresAuth, setRequiresAuth } = useGenerate("metacraft");

  const [pageTitle, setPageTitle] = useState("");
  const [keywords, setKeywords]   = useState("");
  const [pageUrl, setPageUrl]     = useState("");
  const [pageType, setPageType]   = useState("homepage");
  const [goal, setGoal]           = useState("clicks");
  const [results, setResults]     = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const ready = pageTitle.trim().length > 0 || keywords.trim().length > 0;

  // Extract domain from URL for preview
  const domain = pageUrl
    ? pageUrl.replace(/^https?:\/\//, "").split("/")[0]
    : "yoursite.com";

  async function doGenerate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setResults(null);

    const systemPrompt = `You are an expert SEO copywriter specialising in meta titles and descriptions that maximise click-through rate and search rankings.

Return ONLY a valid JSON array with exactly 3 variation objects. No markdown, no explanation. Format:
[
  {
    "title": "meta title here",
    "description": "meta description here",
    "score": 92,
    "keywords_hit": ["keyword1", "keyword2"],
    "tips": ["tip 1", "tip 2", "tip 3"]
  }
]

Rules:
- title: SEO meta title, ideally 50-60 characters, never exceed 60
- description: meta description, ideally 140-160 characters, never exceed 160
- score: SEO + CTR score 75-99 based on keyword placement, length, power words, emotional triggers
- keywords_hit: array of the target keywords that appear in this variation (from what the user provided)
- tips: 2-3 specific insights on why this will rank/convert (be specific, not generic)
- Each variation should take a meaningfully different angle or approach
- Page type context: ${pageType}
- Primary goal: ${goal}
- Naturally include target keywords, especially near the start of the title
- Use power words, numbers, and emotional triggers where appropriate for the goal
- For 'clicks' goal: focus on curiosity, FOMO, direct benefit
- For 'ranking' goal: prioritise keyword density and natural keyword placement
- For 'brand' goal: lead with brand name, focus on trust signals
- For 'convert' goal: emphasise outcomes, urgency, and value proposition`;

    const userPrompt = `Page title/topic: ${pageTitle || "not specified"}
Target keywords: ${keywords || "not specified"}
Page URL: ${pageUrl || "not specified"}
Page type: ${pageType}
Primary goal: ${goal}

Generate 3 meta title and description variations.`;

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
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#0e0820,#160d30)", border:"1px solid rgba(124,106,255,0.28)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <MetaCraftLogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Meta</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>Craft</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              SEO Meta Description Writer
            </div>
          </div>
        </div>

        {/* Stat banner */}
        <div style={{ background:"rgba(124,106,255,0.06)", border:`1px solid rgba(124,106,255,0.15)`, borderRadius:12, padding:"12px 16px", marginBottom:28, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>◎</span>
          <span style={{ fontSize:13, color:C.mutedLight, lineHeight:1.5 }}>
            A well-optimised meta description can <strong style={{ color:C.white }}>increase click-through rate by 5–8%</strong>. That&apos;s free traffic from your existing rankings.
          </span>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>Page title or topic</div>
              <input value={pageTitle} onChange={e => setPageTitle(e.target.value)}
                placeholder="e.g. AI Hashtag Generator for Instagram"
                style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
            </div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>Target keywords</div>
              <input value={keywords} onChange={e => setKeywords(e.target.value)}
                placeholder="e.g. instagram hashtag generator, AI hashtags"
                style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
            </div>
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>
              Page URL <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(optional — used in preview)</span>
            </div>
            <input value={pageUrl} onChange={e => setPageUrl(e.target.value)}
              placeholder="e.g. symyoulater.co.uk/tools/hashcraft"
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
          </div>

          {/* Page type */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Page type</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {PAGE_TYPES.map(p => {
                const on = pageType === p.id;
                return (
                  <button key={p.id} onClick={() => setPageType(p.id)} style={{
                    padding:"10px", borderRadius:10,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:8,
                    fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight: on ? 600 : 400,
                  }}>
                    <span>{p.emoji}</span>{p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Primary goal</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {GOALS.map(g => {
                const on = goal === g.id;
                return (
                  <button key={g.id} onClick={() => setGoal(g.id)} style={{
                    padding:"10px 8px", borderRadius:10,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                  }}>
                    <span style={{ fontSize:16 }}>{g.emoji}</span>
                    <span style={{ fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight: on ? 600 : 400, textAlign:"center" }}>{g.label}</span>
                  </button>
                );
              })}
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
          background: (!ready || loading) ? "#2a2a3d" : `linear-gradient(135deg, ${C.accent}, #9b8aff)`,
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
              Writing meta tags...
            </>
          ) : <>◎ Generate Meta Tags</>}
        </button>

        {/* Results */}
        {results && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>
                Your Meta Tags
              </div>
              <div style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>
                3 variations · Google preview included
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {results.map((r, i) => <MetaCard key={i} result={r} index={i} domain={domain}/>)}
            </div>

            <button onClick={doGenerate} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>
              ↻ Generate new variations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
