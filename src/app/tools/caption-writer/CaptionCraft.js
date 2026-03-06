"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  bg:         "#080810",
  card:       "#13131f",
  border:     "rgba(255,255,255,0.07)",
  accent:     "#6AFFD4",
  accentSoft: "rgba(106,255,212,0.1)",
  accentGlow: "rgba(106,255,212,0.2)",
  orange:     "#FF6B35",
  purple:     "#7C6AFF",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const PLATFORMS = [
  { id:"instagram", label:"Instagram", emoji:"📸", limit:2200, tip:"Up to 30 hashtags" },
  { id:"tiktok",    label:"TikTok",    emoji:"🎵", limit:2200, tip:"Hook in first line" },
  { id:"linkedin",  label:"LinkedIn",  emoji:"💼", limit:3000, tip:"Professional tone" },
  { id:"twitter",   label:"X/Twitter", emoji:"𝕏",  limit:280,  tip:"Punchy & direct" },
  { id:"facebook",  label:"Facebook",  emoji:"👥", limit:63206, tip:"Conversational" },
  { id:"threads",   label:"Threads",   emoji:"🧵", limit:500,  tip:"Short & sharp" },
];

const VIBES = [
  { id:"engaging",      label:"Engaging",      emoji:"🔥" },
  { id:"educational",   label:"Educational",   emoji:"🎓" },
  { id:"funny",         label:"Funny",         emoji:"😂" },
  { id:"inspirational", label:"Inspirational", emoji:"💫" },
  { id:"promotional",   label:"Promotional",   emoji:"📣" },
  { id:"storytelling",  label:"Storytelling",  emoji:"📖" },
];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgc" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgc)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function CaptionCraftLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="ccg" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6AFFD4"/>
          <stop offset="100%" stopColor="#00C4A0"/>
        </linearGradient>
      </defs>
      <path d="M 8 14 C 8 10, 11 8, 15 8 L 37 8 C 41 8, 44 10, 44 14 L 44 30 C 44 34, 41 36, 37 36 L 22 36 L 14 44 L 16 36 L 15 36 C 11 36, 8 34, 8 30 Z"
        stroke="url(#ccg)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="19" cy="22" r="2.2" fill="url(#ccg)"/>
      <circle cx="26" cy="22" r="2.2" fill="url(#ccg)"/>
      <circle cx="33" cy="22" r="2.2" fill="url(#ccg)"/>
    </svg>
  );
}

function CaptionCard({ caption, index, platformId }) {
  const [copied, setCopied] = useState(false);
  const [hov, setHov]       = useState(false);
  const plat = PLATFORMS.find(p => p.id === platformId) || PLATFORMS[0];
  const charCount = caption.text ? caption.text.length : 0;
  const pct = Math.min((charCount / plat.limit) * 100, 100);

  function copy() {
    navigator.clipboard.writeText(caption.text);
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
        borderRadius:16, padding:24,
        transition:"all 0.25s",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? `0 16px 40px rgba(0,0,0,0.4)` : "none",
        position:"relative", overflow:"hidden",
      }}
    >
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.accent},transparent)` }}/>}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:C.accent, fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Caption {index + 1}
          </span>
          {caption.vibe && (
            <span style={{ fontSize:10, color:C.muted, background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`, padding:"2px 8px", borderRadius:99, fontFamily:"'DM Sans',sans-serif" }}>
              {caption.vibe}
            </span>
          )}
        </div>
        <span style={{ fontSize:11, color: charCount > plat.limit * 0.9 ? "#FFB86A" : C.muted, fontFamily:"'DM Mono',monospace" }}>
          {charCount}/{plat.limit > 9999 ? "∞" : plat.limit}
        </span>
      </div>

      <div style={{
        fontFamily:"'DM Sans',sans-serif", fontSize:14, color:C.white,
        lineHeight:1.85, whiteSpace:"pre-line",
        background:"rgba(255,255,255,0.02)", borderRadius:10,
        padding:16, border:`1px solid ${C.border}`,
        marginBottom:16, minHeight:120,
      }}>
        {caption.text}
      </div>

      <div style={{ height:2, background:"rgba(255,255,255,0.05)", borderRadius:99, overflow:"hidden", marginBottom:16 }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${C.accent},#00C4A0)`, borderRadius:99, transition:"width 0.5s" }}/>
      </div>

      <button onClick={copy} style={{
        width:"100%", padding:"11px", borderRadius:9,
        background: copied ? "rgba(106,255,212,0.15)" : C.accentSoft,
        border: `1px solid ${copied ? C.accent+"66" : C.accent+"33"}`,
        color: C.accent,
        fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
        cursor:"pointer", transition:"all 0.2s",
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
      }}>
        {copied ? "✓ Copied!" : "Copy caption"}
      </button>
    </div>
  );
}

export default function CaptionCraft() {
  const [platform, setPlatform]           = useState("instagram");
  const [topic, setTopic]                 = useState("");
  const [context, setContext]             = useState("");
  const [vibe, setVibe]                   = useState("engaging");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCta, setIncludeCta]           = useState(true);
  const [captions, setCaptions]           = useState(null);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");

  const selectedPlatform = PLATFORMS.find(p => p.id === platform);
  const ready = topic.trim().length > 0;

  async function generate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setCaptions(null);

    const systemPrompt = `You are an expert social media copywriter specialising in ${selectedPlatform.label} content. Generate 3 distinct caption variations.

Return ONLY a valid JSON array with exactly 3 objects. No markdown, no explanation. Format:
[
  {"text": "caption text here", "vibe": "vibe_name"},
  {"text": "caption text here", "vibe": "vibe_name"},
  {"text": "caption text here", "vibe": "vibe_name"}
]

Platform rules for ${selectedPlatform.label}:
- Character limit: ${selectedPlatform.limit} characters
- Platform tip: ${selectedPlatform.tip}
${platform === "twitter" ? "- Must be under 280 characters including any hashtags" : ""}
${platform === "linkedin" ? "- Professional tone, use line breaks for readability, no excessive hashtags" : ""}
${platform === "tiktok" ? "- Start with a strong hook in the first line to stop the scroll" : ""}
${platform === "threads" ? "- Keep it under 500 characters, conversational and sharp" : ""}

Content rules:
- Primary vibe requested: "${vibe}" — make variation 1 match this most closely
- Variations 2 and 3 should explore different angles or tones
- ${includeHashtags && platform !== "linkedin" && platform !== "twitter" ? `Include relevant hashtags optimised for ${selectedPlatform.label}` : "Do NOT include hashtags"}
- ${includeCta ? "Include a clear call to action (question, direction to link, ask to share etc)" : "Do NOT include a call to action"}
- Use line breaks for readability where appropriate
- vibe field should be one of: engaging, educational, funny, inspirational, promotional, storytelling`;

    const userPrompt = `Platform: ${selectedPlatform.label}
Topic/Post about: ${topic}
${context ? `Extra context: ${context}` : ""}
Primary vibe: ${vibe}
Include hashtags: ${includeHashtags}
Include CTA: ${includeCta}

Generate 3 ${selectedPlatform.label} caption variations.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
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
      setCaptions(JSON.parse(match[0]));
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
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:36 }}>
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#081a14,#0a2a1e)", border:"1px solid rgba(106,255,212,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <CaptionCraftLogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Caption</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>Craft</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              Social Media Caption Writer
            </div>
          </div>
        </div>

        {/* Platform selector */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Platform</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
            {PLATFORMS.map(p => {
              const on = platform === p.id;
              return (
                <button key={p.id} onClick={() => setPlatform(p.id)} style={{
                  padding:"11px 10px", borderRadius:11,
                  border:`1px solid ${on ? C.accent+"55" : C.border}`,
                  background: on ? C.accentSoft : C.card,
                  color: on ? C.accent : C.muted,
                  cursor:"pointer", transition:"all 0.2s",
                  display:"flex", alignItems:"center", gap:8,
                  fontFamily:"'DM Sans',sans-serif", fontSize:13,
                }}>
                  <span style={{ fontSize:16 }}>{p.emoji}</span>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontWeight:500, fontSize:13 }}>{p.label}</div>
                    <div style={{ fontSize:10, color: on ? C.accent+"88" : "#44445a", marginTop:1 }}>{p.tip}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>What&apos;s your post about?</div>
            <textarea value={topic} onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Sunrise hike in the Swiss Alps, just got back and the views were insane..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.6, resize:"none", minHeight:80, outline:"none" }}/>
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>
              Extra context <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(optional)</span>
            </div>
            <input value={context} onChange={e => setContext(e.target.value)}
              placeholder="Your niche, audience, brand voice, specific details to include..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
          </div>

          {/* Vibe */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Caption vibe</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {VIBES.map(v => {
                const on = vibe === v.id;
                return (
                  <button key={v.id} onClick={() => setVibe(v.id)} style={{
                    padding:"10px", borderRadius:10,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:8,
                    fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight: on ? 600 : 400,
                  }}>
                    <span>{v.emoji}</span>{v.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggles */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { label:"Include hashtags", sub:`Optimised for ${selectedPlatform?.label}`, val:includeHashtags, set:setIncludeHashtags },
              { label:"Include CTA",      sub:"Call to action at the end",               val:includeCta,      set:setIncludeCta },
            ].map(t => (
              <div key={t.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"13px 14px" }}>
                <div>
                  <div style={{ fontSize:13, color:C.white, fontWeight:500 }}>{t.label}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{t.sub}</div>
                </div>
                <div onClick={() => t.set(!t.val)} style={{ width:36, height:20, background:t.val ? C.accent : "#2a2a3d", borderRadius:99, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", width:14, height:14, background: t.val ? "#080810" : "#fff", borderRadius:"50%", top:3, left:t.val?19:3, transition:"left 0.2s" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ background:"rgba(255,106,158,0.1)", border:"1.5px solid rgba(255,106,158,0.3)", borderRadius:9, padding:"11px 14px", fontSize:13, color:"#ff6a9e", marginBottom:14 }}>
            {error}
          </div>
        )}

        {/* Generate button */}
        <button onClick={generate} disabled={loading || !ready} style={{
          width:"100%", padding:16,
          background: (!ready || loading) ? "#2a2a3d" : `linear-gradient(135deg, ${C.accent}, #00C4A0)`,
          border:"none", borderRadius:12,
          color: (!ready || loading) ? C.muted : "#080810",
          fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, letterSpacing:"0.04em",
          cursor: (!ready || loading) ? "not-allowed" : "pointer",
          marginBottom:32,
          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          boxShadow: ready && !loading ? `0 4px 24px ${C.accentGlow}` : "none",
          transition:"all 0.2s",
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? (
            <>
              <div style={{ width:16, height:16, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#080810", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
              Writing your captions...
            </>
          ) : (
            <>✦ Write {selectedPlatform?.label} Captions</>
          )}
        </button>

        {/* Results */}
        {captions && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>
                Your Captions
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18 }}>{selectedPlatform?.emoji}</span>
                <span style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>
                  {selectedPlatform?.label} · 3 variations
                </span>
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {captions.map((c, i) => <CaptionCard key={i} caption={c} index={i} platformId={platform}/>)}
            </div>

            <button onClick={generate} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, cursor:"pointer" }}>
              ↻ Generate new variations
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
