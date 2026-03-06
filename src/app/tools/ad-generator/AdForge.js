"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  bg:         "#080810",
  card:       "#13131f",
  border:     "rgba(255,255,255,0.07)",
  accent:     "#FF6B35",
  accentSoft: "rgba(255,107,53,0.12)",
  accentGlow: "rgba(255,107,53,0.28)",
  pink:       "#FF6A9E",
  teal:       "#6AFFD4",
  purple:     "#7C6AFF",
  yellow:     "#FFD700",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const AD_PLATFORMS = [
  { id:"meta",      label:"Meta Ads",      emoji:"📘", sub:"Facebook & Instagram", charLimit:{ headline:40, body:125, cta:20 } },
  { id:"google",    label:"Google Search", emoji:"🔍", sub:"Search & Display",     charLimit:{ headline:30, body:90,  cta:15 } },
  { id:"tiktok",    label:"TikTok Ads",    emoji:"🎵", sub:"In-feed & Spark",      charLimit:{ headline:50, body:150, cta:25 } },
  { id:"linkedin",  label:"LinkedIn Ads",  emoji:"💼", sub:"Sponsored content",    charLimit:{ headline:70, body:150, cta:20 } },
  { id:"twitter",   label:"X Ads",         emoji:"𝕏",  sub:"Promoted tweets",      charLimit:{ headline:50, body:280, cta:20 } },
  { id:"youtube",   label:"YouTube Ads",   emoji:"▶️", sub:"Pre-roll & bumper",    charLimit:{ headline:50, body:150, cta:20 } },
];

const AD_OBJECTIVES = [
  { id:"awareness",   label:"Awareness",   emoji:"👁",  desc:"Reach & brand recall" },
  { id:"traffic",     label:"Traffic",     emoji:"🌐",  desc:"Clicks to website" },
  { id:"leads",       label:"Leads",       emoji:"🎯",  desc:"Forms & sign-ups" },
  { id:"sales",       label:"Sales",       emoji:"💰",  desc:"Conversions & ROAS" },
  { id:"engagement",  label:"Engagement",  emoji:"💬",  desc:"Likes, shares, comments" },
  { id:"retargeting", label:"Retargeting", emoji:"🔄",  desc:"Warm audience" },
];

const TONES = [
  { id:"urgent",        label:"Urgent",        emoji:"⚡" },
  { id:"aspirational",  label:"Aspirational",  emoji:"✨" },
  { id:"direct",        label:"Direct",        emoji:"🎯" },
  { id:"playful",       label:"Playful",       emoji:"😄" },
  { id:"authoritative", label:"Authoritative", emoji:"🏆" },
  { id:"empathetic",    label:"Empathetic",    emoji:"💚" },
];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgaf" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgaf)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function AdForgeLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="afg" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FF9F1C"/>
          <stop offset="100%" stopColor="#FF6B35"/>
        </linearGradient>
      </defs>
      <path d="M 8 20 L 8 32 L 18 32 L 36 42 L 36 10 L 18 20 Z"
        stroke="url(#afg)" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      <path d="M 40 18 C 43 21, 43 31, 40 34" stroke="url(#afg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M 44 14 C 49 19, 49 33, 44 38" stroke="url(#afg)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>
  );
}

function AdPreview({ ad, platform }) {
  const plat = AD_PLATFORMS.find(p => p.id === platform) || AD_PLATFORMS[0];

  if (platform === "google") {
    return (
      <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px" }}>
        <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10, fontFamily:"'DM Sans',sans-serif" }}>Google Search Preview</div>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
          <div style={{ width:14, height:14, borderRadius:2, background:`linear-gradient(135deg,${C.accent},#FF9F1C)`, flexShrink:0 }}/>
          <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif" }}>Ad · yoursite.com</span>
        </div>
        <div style={{ fontSize:17, color:"#8AB4F8", fontFamily:"'DM Sans',sans-serif", marginBottom:4, lineHeight:1.3 }}>{ad.headline}</div>
        <div style={{ fontSize:13, color:"#BDC1C6", fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>{ad.body}</div>
      </div>
    );
  }

  if (platform === "meta") {
    return (
      <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px" }}>
        <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10, fontFamily:"'DM Sans',sans-serif" }}>Meta Ad Preview</div>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent}44,#FF9F1C44)`, border:`1px solid ${C.accent}33` }}/>
          <div>
            <div style={{ fontSize:13, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>Your Brand</div>
            <div style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>Sponsored · 🌐</div>
          </div>
        </div>
        <div style={{ fontSize:13, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.7, marginBottom:10 }}>{ad.body}</div>
        <div style={{ height:80, background:`linear-gradient(135deg,${C.accent}18,${C.purple}18)`, borderRadius:8, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
          <span style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>Ad creative</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", background:"rgba(255,255,255,0.03)", borderRadius:8, border:`1px solid ${C.border}` }}>
          <div>
            <div style={{ fontSize:13, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{ad.headline}</div>
            <div style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>yoursite.com</div>
          </div>
          <div style={{ padding:"7px 14px", background:C.accent, borderRadius:6, fontSize:12, fontFamily:"'DM Sans',sans-serif", fontWeight:700, color:"#080810", flexShrink:0 }}>
            {ad.cta}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px" }}>
      <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10, fontFamily:"'DM Sans',sans-serif" }}>{plat.label} Preview</div>
      <div style={{ fontSize:14, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:700, marginBottom:6 }}>{ad.headline}</div>
      <div style={{ fontSize:13, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.7, marginBottom:10 }}>{ad.body}</div>
      <div style={{ display:"inline-block", padding:"7px 16px", background:C.accent, borderRadius:6, fontSize:12, fontFamily:"'DM Sans',sans-serif", fontWeight:700, color:"#080810" }}>{ad.cta}</div>
    </div>
  );
}

function AdCard({ ad, index, platform }) {
  const [copied, setCopied]     = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [hov, setHov]           = useState(false);
  const scoreColor = (ad.score || ad.hook_score || 85) >= 92 ? C.teal : (ad.score || ad.hook_score || 85) >= 85 ? C.accent : C.yellow;

  function copy(text, which) {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  const score = ad.score || ad.hook_score || 85;

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
        <div>
          <div style={{ fontSize:11, color:C.accent, fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Variation {ad.variation || index + 1}
          </div>
          <div style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif", marginTop:2 }}>{ad.angle}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", border:`2px solid ${scoreColor}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontFamily:"'DM Mono',monospace", color:scoreColor, fontWeight:700 }}>
            {score}
          </div>
          <span style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>score</span>
        </div>
      </div>

      {/* Platform preview */}
      <div style={{ marginBottom:16 }}>
        <AdPreview ad={ad} platform={platform}/>
      </div>

      {/* Copy fields */}
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {[
          { label:"Headline", text:ad.headline, key:"headline" },
          { label:"Body",     text:ad.body,     key:"body"     },
          { label:"CTA",      text:ad.cta,      key:"cta"      },
        ].map(f => (
          <div key={f.key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, background:"rgba(255,255,255,0.02)", border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px" }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:9, color:C.muted, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:2 }}>{f.label}</div>
              <div style={{ fontSize:12, color:C.white, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.text}</div>
            </div>
            <button onClick={() => copy(f.text, f.key)} style={{
              flexShrink:0, padding:"5px 10px", borderRadius:6,
              background: copied===f.key ? "rgba(106,255,212,0.12)" : C.accentSoft,
              border: `1px solid ${copied===f.key ? C.teal+"44" : C.accent+"33"}`,
              color: copied===f.key ? C.teal : C.accent,
              fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
              cursor:"pointer", transition:"all 0.2s",
            }}>
              {copied===f.key ? "✓" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      {/* Why it converts */}
      {ad.tips && ad.tips.length > 0 && (
        <div>
          <button onClick={() => setShowTips(!showTips)} style={{
            background:"transparent", border:"none", cursor:"pointer",
            fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif",
            display:"flex", alignItems:"center", gap:6, padding:0,
          }}>
            <span style={{ transition:"transform 0.2s", display:"inline-block", transform: showTips ? "rotate(90deg)" : "rotate(0)" }}>▶</span>
            Why this converts
          </button>
          {showTips && (
            <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:6 }}>
              {ad.tips.map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:8, padding:"8px 12px", background:C.accentSoft, border:`1px solid ${C.accent}22`, borderRadius:8 }}>
                  <span style={{ color:C.accent, fontSize:12, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdForge() {
  const [product, setProduct]           = useState("");
  const [audience, setAudience]         = useState("");
  const [usp, setUsp]                   = useState("");
  const [platform, setPlatform]         = useState("meta");
  const [objective, setObjective]       = useState("sales");
  const [tone, setTone]                 = useState("direct");
  const [includeEmoji, setIncludeEmoji] = useState(false);
  const [ads, setAds]                   = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  const ready = product.trim().length > 0;
  const selectedPlatform = AD_PLATFORMS.find(p => p.id === platform);

  async function generate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setAds(null);

    const limits = selectedPlatform?.charLimit || { headline:40, body:125, cta:20 };

    const systemPrompt = `You are an expert performance marketing copywriter who writes high-converting ad copy. You understand persuasion psychology, platform-specific best practices, and what makes people click and convert.

Return ONLY a valid JSON array with exactly 3 ad objects. No markdown, no explanation. Format:
[
  {
    "variation": 1,
    "angle": "short name for the psychological angle used",
    "headline": "ad headline",
    "body": "ad body copy",
    "cta": "call to action button text",
    "score": 92,
    "tips": ["tip 1", "tip 2", "tip 3"]
  }
]

Rules:
- Generate exactly 3 variations, each using a DIFFERENT psychological angle
- Common angles: Pain Point + Solution, Curiosity Gap, Social Proof + FOMO, Benefit-Led, Story-Driven, Fear of Missing Out, Aspirational Identity, Authority/Credibility
- Platform: ${platform} (${selectedPlatform?.sub})
- headline: max ${limits.headline} characters — STRICTLY enforce this
- body: max ${limits.body} characters — STRICTLY enforce this  
- cta: max ${limits.cta} characters, must be action-oriented (e.g. "Try Free Today", "Get Started", "Learn More")
- score: 75-99 predicted click-through potential score
- tips: 2-3 specific reasons WHY this copy will perform (psychology, tactics, platform insights)
- Objective: ${objective} — write copy optimised for this goal
- Tone: ${tone}
- ${includeEmoji ? "Use 1-2 emojis where they add energy (not for Google)" : "Do NOT use any emojis"}
- ${usp ? `Key USP to include: ${usp}` : ""}
- Make copy specific to the product/service — no generic filler
- ${platform === "google" ? "Google copy must be keyword-rich and benefit-focused" : ""}
- ${platform === "tiktok" ? "TikTok copy should feel native and entertaining, not corporate" : ""}
- ${platform === "linkedin" ? "LinkedIn copy should be professional and outcome-focused" : ""}
- Sort by score descending`;

    const userPrompt = `Product/Service: ${product}
${audience ? `Target audience: ${audience}` : ""}
${usp ? `USP: ${usp}` : ""}
Platform: ${platform}
Objective: ${objective}
Tone: ${tone}

Generate 3 ad copy variations with distinct psychological angles.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2500,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error((e.error && e.error.message) || "API error");
      }

      const data = await res.json();
      const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse response.");
      setAds(JSON.parse(match[0]));
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
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#1f1208,#2a1a0a)", border:"1px solid rgba(255,107,53,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <AdForgeLogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Ad</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>Forge</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              Ad Copy Generator
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={{ background:"rgba(255,107,53,0.06)", border:`1px solid rgba(255,107,53,0.15)`, borderRadius:12, padding:"12px 16px", marginBottom:28, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>📣</span>
          <span style={{ fontSize:13, color:C.mutedLight, lineHeight:1.5 }}>
            <strong style={{ color:C.white }}>Great ad copy</strong> can reduce cost-per-click by up to <strong style={{ color:C.accent }}>40%</strong>. Each variation uses a distinct psychological angle — perfect for A/B testing.
          </span>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Product or service</div>
            <textarea value={product} onChange={e => setProduct(e.target.value)}
              placeholder="e.g. An AI marketing tool suite for content creators, a premium leather wallet brand, an online fitness coaching programme..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.6, resize:"none", minHeight:70, outline:"none" }}/>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>Target audience</div>
              <input value={audience} onChange={e => setAudience(e.target.value)}
                placeholder="e.g. Freelance designers 25–35, first-time home buyers..."
                style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
            </div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>
                Unique selling point <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(optional)</span>
              </div>
              <input value={usp} onChange={e => setUsp(e.target.value)}
                placeholder="e.g. Free trial, 24h delivery, money-back guarantee..."
                style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
            </div>
          </div>

          {/* Platform */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Ad platform</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {AD_PLATFORMS.map(p => {
                const on = platform === p.id;
                return (
                  <button key={p.id} onClick={() => setPlatform(p.id)} style={{
                    padding:"10px", borderRadius:10,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:8,
                    fontFamily:"'DM Sans',sans-serif",
                  }}>
                    <span style={{ fontSize:16 }}>{p.emoji}</span>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:12, fontWeight:600 }}>{p.label}</div>
                      <div style={{ fontSize:10, color: on ? C.accent+"88" : "#44445a", marginTop:1 }}>{p.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Objective + Tone */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Objective</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {AD_OBJECTIVES.map(o => {
                  const on = objective === o.id;
                  return (
                    <button key={o.id} onClick={() => setObjective(o.id)} style={{
                      padding:"9px 12px", borderRadius:9, textAlign:"left",
                      border:`1px solid ${on ? C.accent+"55" : C.border}`,
                      background: on ? C.accentSoft : C.card,
                      color: on ? C.accent : C.muted,
                      fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer", transition:"all 0.2s",
                      display:"flex", alignItems:"center", gap:8,
                    }}>
                      <span>{o.emoji}</span>
                      <div>
                        <div style={{ fontWeight:600 }}>{o.label}</div>
                        <div style={{ fontSize:10, color: on ? C.accent+"77" : "#44445a", marginTop:1 }}>{o.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Tone</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {TONES.map(t => {
                  const on = tone === t.id;
                  return (
                    <button key={t.id} onClick={() => setTone(t.id)} style={{
                      padding:"9px 8px", borderRadius:9,
                      border:`1px solid ${on ? C.accent+"55" : C.border}`,
                      background: on ? C.accentSoft : C.card,
                      color: on ? C.accent : C.muted,
                      cursor:"pointer", transition:"all 0.2s",
                      display:"flex", alignItems:"center", gap:6,
                      fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight: on ? 600 : 400,
                    }}>
                      <span>{t.emoji}</span>{t.label}
                    </button>
                  );
                })}
              </div>

              {/* Emoji toggle */}
              <div style={{ marginTop:10, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"11px 14px" }}>
                <div>
                  <div style={{ fontSize:12, color:C.white, fontWeight:500 }}>Include emojis</div>
                  <div style={{ fontSize:10, color:C.muted, marginTop:1 }}>In ad copy</div>
                </div>
                <div onClick={() => setIncludeEmoji(!includeEmoji)} style={{ width:32, height:18, background:includeEmoji ? C.accent : "#2a2a3d", borderRadius:99, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", width:12, height:12, background: includeEmoji ? "#080810" : "#fff", borderRadius:"50%", top:3, left:includeEmoji?17:3, transition:"left 0.2s" }}/>
                </div>
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
        <button onClick={generate} disabled={loading || !ready} style={{
          width:"100%", padding:16,
          background: (!ready || loading) ? "#2a2a3d" : `linear-gradient(135deg, ${C.accent}, #FF9F1C)`,
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
              Crafting your ads...
            </>
          ) : <>📣 Generate Ad Copy</>}
        </button>

        {/* Results */}
        {ads && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>
                Your Ads
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18 }}>{selectedPlatform?.emoji}</span>
                <span style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>
                  {selectedPlatform?.label} · {ads.length} variations
                </span>
              </div>
            </div>

            <div style={{ background:"rgba(255,107,53,0.06)", border:`1px solid rgba(255,107,53,0.15)`, borderRadius:10, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14 }}>💡</span>
              <span style={{ fontSize:12, color:C.mutedLight, lineHeight:1.5 }}>
                Each variation uses a <strong style={{ color:C.white }}>different psychological angle</strong> — perfect for A/B testing. Click <strong style={{ color:C.white }}>Why this converts</strong> to see the strategy.
              </span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {ads.map((ad, i) => <AdCard key={i} ad={ad} index={i} platform={platform}/>)}
            </div>

            <button onClick={generate} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>
              ↻ Generate new variations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
