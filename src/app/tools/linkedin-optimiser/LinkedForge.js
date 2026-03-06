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
  blue:       "#0EA5E9",
  blueSoft:   "rgba(14,165,233,0.1)",
  orange:     "#FF6B35",
  purple:     "#7C6AFF",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const POST_FORMATS = [
  { id:"story",    label:"Personal Story",   emoji:"📖", desc:"Vulnerability drives reach" },
  { id:"list",     label:"Value List",       emoji:"📋", desc:"Numbered insights" },
  { id:"hot_take", label:"Hot Take",         emoji:"🔥", desc:"Contrarian opinion" },
  { id:"lessons",  label:"Lessons Learned",  emoji:"💡", desc:"Experience → wisdom" },
  { id:"behind",   label:"Behind the Scenes",emoji:"🎬", desc:"Process reveal" },
  { id:"question", label:"Open Question",    emoji:"❓", desc:"Community discussion" },
];

const TONES = [
  { id:"professional",   label:"Professional" },
  { id:"conversational", label:"Conversational" },
  { id:"inspirational",  label:"Inspirational" },
  { id:"direct",         label:"Direct & Bold" },
];

const GOALS = [
  { id:"authority",  label:"Build authority",  emoji:"👑" },
  { id:"engagement", label:"Drive engagement", emoji:"💬" },
  { id:"leads",      label:"Generate leads",   emoji:"🎯" },
  { id:"network",    label:"Grow network",     emoji:"🤝" },
];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slglf" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slglf)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function LinkedForgeLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="lfg" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6AFFD4"/>
          <stop offset="100%" stopColor="#0EA5E9"/>
        </linearGradient>
      </defs>
      <rect x="8"  y="8"  width="10" height="10" rx="3" stroke="url(#lfg)" strokeWidth="3" fill="none"/>
      <rect x="8"  y="22" width="10" height="22" rx="3" stroke="url(#lfg)" strokeWidth="3" fill="none"/>
      <rect x="22" y="22" width="10" height="22" rx="3" stroke="url(#lfg)" strokeWidth="3" fill="none"/>
      <path d="M 32 28 C 32 24, 44 22, 44 30 L 44 44"
        stroke="url(#lfg)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function PostCard({ post, index }) {
  const [copied, setCopied]     = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [hov, setHov]           = useState(false);
  const formatInfo = POST_FORMATS.find(f => f.id === post.format) || POST_FORMATS[0];
  const scoreColor = (post.score || 85) >= 95 ? C.accent : (post.score || 85) >= 88 ? C.orange : "#FFB86A";
  const lines = (post.post || "").split("\n");

  function copy() {
    navigator.clipboard.writeText(post.post);
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
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.4)" : "none",
        position:"relative", overflow:"hidden",
      }}
    >
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.accent},transparent)` }}/>}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:C.accentSoft, border:`1px solid ${C.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
            {formatInfo.emoji}
          </div>
          <div>
            <div style={{ fontSize:11, color:C.accent, fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>{formatInfo.label}</div>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>{(post.post || "").length} chars</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", border:`2px solid ${scoreColor}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontFamily:"'DM Mono',monospace", color:scoreColor, fontWeight:700 }}>
            {post.score || 85}
          </div>
          <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>score</div>
        </div>
      </div>

      {/* LinkedIn preview mockup */}
      <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${C.border}`, borderRadius:12, padding:16, marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent}44,${C.blue}44)`, border:`1px solid ${C.accent}33`, flexShrink:0 }}/>
          <div>
            <div style={{ fontSize:13, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>You</div>
            <div style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>Your headline • 1st</div>
          </div>
        </div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:C.mutedLight, lineHeight:1.7, whiteSpace:"pre-line" }}>
          {lines.slice(0, 5).join("\n")}
          {lines.length > 5 && <span style={{ color:C.accent, cursor:"pointer" }}> ...see more</span>}
        </div>
      </div>

      {/* Full post */}
      <div style={{ background:"rgba(255,255,255,0.02)", borderRadius:10, padding:"14px 16px", border:`1px solid ${C.border}`, marginBottom:16, maxHeight:220, overflowY:"auto" }}>
        <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>Full post</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:C.white, lineHeight:1.8, whiteSpace:"pre-line" }}>
          {post.post}
        </div>
      </div>

      {/* Why it performs */}
      {post.tips && post.tips.length > 0 && (
        <div style={{ marginBottom:16 }}>
          <button onClick={() => setShowTips(!showTips)} style={{
            background:"transparent", border:"none", cursor:"pointer",
            fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif",
            display:"flex", alignItems:"center", gap:6, padding:0,
          }}>
            <span style={{ transition:"transform 0.2s", display:"inline-block", transform: showTips ? "rotate(90deg)" : "rotate(0)" }}>▶</span>
            Why this will perform well
          </button>
          {showTips && (
            <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:6 }}>
              {post.tips.map((tip, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 12px", background:C.accentSoft, border:`1px solid ${C.accent}22`, borderRadius:8 }}>
                  <span style={{ color:C.accent, fontSize:12, marginTop:1, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Copy */}
      <button onClick={copy} style={{
        width:"100%", padding:"10px", borderRadius:9,
        background: copied ? "rgba(106,255,212,0.15)" : C.accentSoft,
        border:`1px solid ${copied ? C.accent+"66" : C.accent+"33"}`,
        color: C.accent,
        fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
        cursor:"pointer", transition:"all 0.2s",
      }}>
        {copied ? "✓ Copied to clipboard!" : "Copy post"}
      </button>
    </div>
  );
}

export default function LinkedForge() {
  const { generate, requiresAuth, setRequiresAuth } = useGenerate("linkedforge");

  const [topic, setTopic]               = useState("");
  const [context, setContext]           = useState("");
  const [formats, setFormats]           = useState(["story","list"]);
  const [tone, setTone]                 = useState("conversational");
  const [goal, setGoal]                 = useState("authority");
  const [includeEmojis, setIncludeEmojis] = useState(false);
  const [includeCta, setIncludeCta]       = useState(true);
  const [posts, setPosts]               = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  const ready = topic.trim().length > 0;

  function toggleFormat(id) {
    setFormats(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(f => f !== id) : prev
        : [...prev, id]
    );
  }

  async function generate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setPosts(null);

    const systemPrompt = `You are an expert LinkedIn content strategist who writes posts that consistently achieve high reach and engagement. You understand LinkedIn's algorithm deeply.

Return ONLY a valid JSON array with exactly ${formats.length} post objects. No markdown, no explanation. Format:
[
  {
    "format": "format_id",
    "post": "the full post text with line breaks using \\n",
    "score": 88,
    "tips": ["tip 1", "tip 2", "tip 3"]
  }
]

Rules:
- Generate one post per format requested: ${formats.join(", ")}
- format must match the requested format id exactly
- post: the complete LinkedIn post with proper line breaks (\\n). Use short paragraphs for readability
- score: predicted performance score 75-99 based on hook strength, format effectiveness, engagement potential
- tips: 2-3 specific LinkedIn algorithm/psychology insights explaining why this post will perform well
- Tone: ${tone}
- Goal: ${goal}
- ${includeEmojis ? "Use emojis sparingly and professionally" : "Do NOT use emojis"}
- ${includeCta ? "End with a clear, easy-to-answer call to action that invites comments" : "No explicit CTA needed"}
- LinkedIn posts perform best at 800-1200 characters — aim for this range
- Start with a strong, pattern-interrupting first line — this is what determines if LinkedIn expands the post
- Use short lines and white space — walls of text perform poorly
- Make content specific to their industry/topic, never generic`;

    const userPrompt = `Topic: ${topic}
${context ? `Industry & audience: ${context}` : ""}
Post formats: ${formats.join(", ")}
Tone: ${tone}
Goal: ${goal}
Include emojis: ${includeEmojis}
Include CTA: ${includeCta}

Generate ${formats.length} LinkedIn post${formats.length > 1 ? "s" : ""}.`;

    try {
      const data = await generate(body);
        if (data === null) { setLoading(false); return; }
      const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse response.");
      setPosts(JSON.parse(match[0]));
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.white, paddingBottom:80 }}>
      {requiresAuth && <AuthModal onClose={() => setRequiresAuth(false)}/>}
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
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#081814,#0a2420)", border:"1px solid rgba(106,255,212,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <LinkedForgeLogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Linked</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>Forge</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              LinkedIn Post Optimiser
            </div>
          </div>
        </div>

        {/* Stat banner */}
        <div style={{ background:"rgba(106,255,212,0.05)", border:`1px solid rgba(106,255,212,0.12)`, borderRadius:12, padding:"12px 16px", marginBottom:28, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>◉</span>
          <span style={{ fontSize:13, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
            LinkedIn posts with a <strong style={{ color:C.white }}>strong opening line</strong> get up to <strong style={{ color:C.accent }}>10× more impressions</strong>. The algorithm rewards content that holds attention.
          </span>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>What do you want to post about?</div>
            <textarea value={topic} onChange={e => setTopic(e.target.value)}
              placeholder="e.g. A lesson I learned growing my freelance business, a mistake I made hiring my first team member..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.6, resize:"none", minHeight:80, outline:"none" }}/>
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>
              Your industry &amp; audience <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(optional)</span>
            </div>
            <input value={context} onChange={e => setContext(e.target.value)}
              placeholder="e.g. B2B SaaS founder, audience is startup CTOs and VPs of Engineering..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
          </div>

          {/* Post formats */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Post formats</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {POST_FORMATS.map(f => {
                const on = formats.includes(f.id);
                return (
                  <button key={f.id} onClick={() => toggleFormat(f.id)} style={{
                    padding:"11px 10px", borderRadius:11,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:8,
                    fontFamily:"'DM Sans',sans-serif",
                  }}>
                    <span style={{ fontSize:16 }}>{f.emoji}</span>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:12, fontWeight:600 }}>{f.label}</div>
                      <div style={{ fontSize:10, color: on ? C.accent+"88" : "#44445a", marginTop:1 }}>{f.desc}</div>
                    </div>
                    {on && <span style={{ marginLeft:"auto", fontSize:12, color:C.accent }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tone + Goal */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Tone</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {TONES.map(t => (
                  <button key={t.id} onClick={() => setTone(t.id)} style={{
                    padding:"9px 12px", borderRadius:9, textAlign:"left",
                    border:`1px solid ${tone===t.id ? C.accent+"55" : C.border}`,
                    background: tone===t.id ? C.accentSoft : C.card,
                    color: tone===t.id ? C.accent : C.muted,
                    fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer", transition:"all 0.2s",
                  }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Goal</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {GOALS.map(g => (
                  <button key={g.id} onClick={() => setGoal(g.id)} style={{
                    padding:"9px 12px", borderRadius:9, textAlign:"left",
                    border:`1px solid ${goal===g.id ? C.accent+"55" : C.border}`,
                    background: goal===g.id ? C.accentSoft : C.card,
                    color: goal===g.id ? C.accent : C.muted,
                    fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:7,
                  }}>
                    <span>{g.emoji}</span>{g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { label:"Include emojis", sub:"Subtle use recommended",  val:includeEmojis, set:setIncludeEmojis },
              { label:"Include CTA",   sub:"End with engagement hook", val:includeCta,    set:setIncludeCta },
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

        {/* Generate */}
        <button onClick={generate} disabled={loading || !ready} style={{
          width:"100%", padding:16,
          background: (!ready || loading) ? "#2a2a3d" : `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
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
              Writing LinkedIn posts...
            </>
          ) : <>◉ Generate LinkedIn Posts</>}
        </button>

        {/* Results */}
        {posts && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>Your Posts</div>
              <div style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>{posts.length} variation{posts.length !== 1 ? "s" : ""}</div>
            </div>

            <div style={{ background:"rgba(106,255,212,0.05)", border:`1px solid rgba(106,255,212,0.12)`, borderRadius:10, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14 }}>💡</span>
              <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
                Click <strong style={{ color:C.white }}>&ldquo;Why this will perform well&rdquo;</strong> to see the LinkedIn algorithm insights behind each post.
              </span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {posts.map((p, i) => <PostCard key={i} post={p} index={i}/>)}
            </div>

            <button onClick={generate} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>
              ↻ Generate new posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
