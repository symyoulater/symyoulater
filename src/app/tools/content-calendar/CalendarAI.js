"use client";
import { useState } from "react";
import Link from "next/link";
import { useGenerate } from "../../../hooks/useGenerate";
import AuthModal from "../../../components/AuthModal";

const C = {
  bg:         "#080810",
  card:       "#13131f",
  border:     "rgba(255,255,255,0.07)",
  accent:     "#FFB86A",
  accentSoft: "rgba(255,184,106,0.1)",
  accentGlow: "rgba(255,184,106,0.2)",
  orange:     "#FF6B35",
  teal:       "#6AFFD4",
  purple:     "#7C6AFF",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const PLATFORMS = [
  { id:"instagram", label:"Instagram", emoji:"📸" },
  { id:"tiktok",    label:"TikTok",    emoji:"🎵" },
  { id:"linkedin",  label:"LinkedIn",  emoji:"💼" },
  { id:"twitter",   label:"X/Twitter", emoji:"𝕏"  },
  { id:"facebook",  label:"Facebook",  emoji:"👥" },
  { id:"threads",   label:"Threads",   emoji:"🧵" },
];

const FREQUENCIES = [
  { id:"daily",    label:"Daily",    sub:"7 posts/week" },
  { id:"frequent", label:"Frequent", sub:"4-5 posts/week" },
  { id:"regular",  label:"Regular",  sub:"3 posts/week" },
  { id:"light",    label:"Light",    sub:"1-2 posts/week" },
];

const CONTENT_TYPES = [
  { id:"educational",  label:"Educational",  emoji:"🎓" },
  { id:"entertaining", label:"Entertaining", emoji:"😄" },
  { id:"promotional",  label:"Promotional",  emoji:"📣" },
  { id:"personal",     label:"Personal",     emoji:"💬" },
  { id:"trending",     label:"Trending",     emoji:"🔥" },
  { id:"ugc",          label:"User Stories", emoji:"👥" },
];

const TYPE_COLORS = {
  educational:  "#7C6AFF",
  entertaining: "#FF6B35",
  promotional:  "#FFB86A",
  personal:     "#6AFFD4",
  trending:     "#FF6A9E",
  ugc:          "#A78BFF",
};

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgcal" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgcal)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function CalendarAILogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="caig" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FFD280"/>
          <stop offset="100%" stopColor="#FFB86A"/>
        </linearGradient>
      </defs>
      <rect x="8" y="12" width="36" height="32" rx="5" stroke="url(#caig)" strokeWidth="3" fill="none"/>
      <rect x="8" y="12" width="36" height="10" rx="5" stroke="url(#caig)" strokeWidth="3" fill="none"/>
      <line x1="18" y1="7" x2="18" y2="17" stroke="url(#caig)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="34" y1="7" x2="34" y2="17" stroke="url(#caig)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="18" cy="30" r="2" fill="url(#caig)"/>
      <circle cx="26" cy="30" r="2" fill="url(#caig)"/>
      <circle cx="34" cy="30" r="2" fill="url(#caig)"/>
      <circle cx="18" cy="38" r="2" fill="url(#caig)"/>
      <circle cx="26" cy="38" r="2" fill="url(#caig)"/>
    </svg>
  );
}

function CalendarEntry({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const color = TYPE_COLORS[entry.type] || C.accent;
  const plat = PLATFORMS.find(p => p.id === entry.platform);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: expanded ? "rgba(19,19,40,0.98)" : C.card,
        border: `1px solid ${expanded ? color + "44" : C.border}`,
        borderRadius: 12, padding: "14px 16px",
        cursor: "pointer", transition: "all 0.22s",
        transform: expanded ? "translateY(-1px)" : "translateY(0)",
        boxShadow: expanded ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {expanded && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${color},transparent)` }}/>}

      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:48, flexShrink:0, textAlign:"center" }}>
          <div style={{ fontSize:10, color:C.muted, fontFamily:"'DM Mono',monospace", letterSpacing:"0.05em" }}>
            {entry.day ? entry.day.split(" ")[0] : ""}
          </div>
          <div style={{ fontSize:20, fontFamily:"'Outfit',sans-serif", fontWeight:800, color:C.white, lineHeight:1 }}>
            {entry.day ? entry.day.split(" ")[1] : ""}
          </div>
        </div>
        <div style={{ width:2, height:36, background:`linear-gradient(${color}, ${color}44)`, borderRadius:99, flexShrink:0 }}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
            <span style={{ fontSize:10, color, fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>{entry.type}</span>
            <span style={{ fontSize:12 }}>{plat?.emoji}</span>
            <span style={{ fontSize:10, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>{plat?.label}</span>
          </div>
          <div style={{ fontSize:13, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {entry.title}
          </div>
        </div>
        <div style={{ fontSize:12, color:C.muted, transition:"transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>▾</div>
      </div>

      {expanded && entry.hook && (
        <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
          <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Opening hook</div>
          <div style={{ fontSize:13, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, fontStyle:"italic" }}>
            &quot;{entry.hook}&quot;
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalendarAI() {
  const { generate, requiresAuth, setRequiresAuth } = useGenerate("calendarai");

  const [niche, setNiche]                         = useState("");
  const [audience, setAudience]                   = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["instagram"]);
  const [frequency, setFrequency]                 = useState("regular");
  const [selectedTypes, setSelectedTypes]         = useState(["educational","entertaining","promotional","personal"]);
  const [calendar, setCalendar]                   = useState(null);
  const [loading, setLoading]                     = useState(false);
  const [error, setError]                         = useState("");
  const [view, setView]                           = useState("list");

  const ready = niche.trim().length > 0 && selectedPlatforms.length > 0;

  function togglePlatform(id) {
    setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  }
  function toggleType(id) {
    setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  }

  const freqMap = { daily:14, frequent:10, regular:6, light:3 };
  const postCount = freqMap[frequency] || 6;

  async function doGenerate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setCalendar(null);

    const systemPrompt = `You are an expert social media content strategist. Generate a 2-week content calendar.

Return ONLY a valid JSON array. No markdown, no explanation. Each item must have:
{"day": "Mon 1", "type": "content_type", "platform": "platform_id", "title": "post title", "hook": "opening hook idea"}

Rules:
- Generate exactly ${postCount} posts spread across 14 days (Mon 1 through Sun 14)
- Day format: "Mon 1", "Tue 2", "Wed 3" etc up to "Sun 14"
- platform must be one of: ${selectedPlatforms.join(", ")}
- type must be one of: ${selectedTypes.join(", ")}
- Distribute types proportionally: mix them throughout the calendar
- Distribute platforms evenly if multiple selected
- title: concise, specific post title (not generic)
- hook: compelling opening line or hook idea for the post (1-2 sentences)
- Make content specific to the niche, not generic`;

    const userPrompt = `Niche: ${niche}
Target audience: ${audience || "general audience"}
Platforms: ${selectedPlatforms.join(", ")}
Posting frequency: ${frequency} (${postCount} posts over 2 weeks)
Content types to include: ${selectedTypes.join(", ")}

Generate a 2-week content calendar with ${postCount} posts.`;

    try {
      const body = { model: "claude-sonnet-4-20250514", max_tokens: 3000, system: systemPrompt, messages: [{ role: "user", content: userPrompt }] };
      const data = await generate(body);
        if (data === null) { setLoading(false); return; }
      const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse response.");
      setCalendar(JSON.parse(match[0]));
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Build week view — 14 day slots, fill with posts or empty
  const allDays = Array.from({ length: 14 }, (_, i) => {
    const dayName = DAYS[i % 7];
    const dayNum = i + 1;
    const key = `${dayName} ${dayNum}`;
    const entry = calendar ? calendar.find(e => e.day === key) : null;
    return { key, dayName, dayNum, entry };
  });
  const week1 = allDays.slice(0, 7);
  const week2 = allDays.slice(7, 14);

  const typeCounts = calendar ? selectedTypes.reduce((acc, t) => {
    acc[t] = calendar.filter(e => e.type === t).length;
    return acc;
  }, {}) : {};

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

      <div style={{ maxWidth:720, margin:"0 auto", padding:"40px 24px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:36 }}>
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#1a1408,#2a2010)", border:"1px solid rgba(255,184,106,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <CalendarAILogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Calendar</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>AI</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              Content Calendar Planner
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { label:"Your niche or industry", val:niche, set:setNiche, placeholder:"e.g. Travel photography, fitness coaching..." },
              { label:"Target audience", val:audience, set:setAudience, placeholder:"e.g. Aspiring photographers, busy parents..." },
            ].map(f => (
              <div key={f.label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>{f.label}</div>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                  style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
              </div>
            ))}
          </div>

          {/* Platforms */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Platforms (select all that apply)</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {PLATFORMS.map(p => {
                const on = selectedPlatforms.includes(p.id);
                return (
                  <button key={p.id} onClick={() => togglePlatform(p.id)} style={{
                    padding:"8px 14px", borderRadius:99,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    fontFamily:"'DM Sans',sans-serif", fontSize:13,
                    display:"flex", alignItems:"center", gap:6,
                  }}>
                    <span>{p.emoji}</span>{p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Posting frequency</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {FREQUENCIES.map(f => {
                const on = frequency === f.id;
                return (
                  <button key={f.id} onClick={() => setFrequency(f.id)} style={{
                    padding:"11px 8px", borderRadius:11,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                  }}>
                    <span style={{ fontSize:13, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{f.label}</span>
                    <span style={{ fontSize:10, color: on ? C.accent+"88" : "#44445a", fontFamily:"'DM Sans',sans-serif" }}>{f.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content mix */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Content mix</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {CONTENT_TYPES.map(t => {
                const on = selectedTypes.includes(t.id);
                const color = TYPE_COLORS[t.id];
                return (
                  <button key={t.id} onClick={() => toggleType(t.id)} style={{
                    padding:"10px", borderRadius:10,
                    border:`1px solid ${on ? color+"55" : C.border}`,
                    background: on ? color+"12" : C.card,
                    color: on ? color : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:8,
                    fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight: on ? 600 : 400,
                  }}>
                    <span>{t.emoji}</span>{t.label}
                    {on && <span style={{ marginLeft:"auto", fontSize:11 }}>✓</span>}
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
              Planning your calendar...
            </>
          ) : <>◈ Generate 2-Week Calendar</>}
        </button>

        {/* Results */}
        {calendar && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:C.white }}>Your Calendar</div>
              <div style={{ display:"flex", gap:8 }}>
                {["list","week"].map(v => (
                  <button key={v} onClick={() => setView(v)} style={{
                    padding:"6px 14px", borderRadius:7,
                    border:`1px solid ${view===v ? C.accent+"55" : C.border}`,
                    background: view===v ? C.accentSoft : "transparent",
                    color: view===v ? C.accent : C.muted,
                    fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer",
                  }}>
                    {v === "list" ? "List" : "By week"}
                  </button>
                ))}
              </div>
            </div>

            {/* Content mix pills */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
              {Object.entries(typeCounts).filter(([,n])=>n>0).map(([type, count]) => (
                <div key={type} style={{ display:"flex", alignItems:"center", gap:5, background:TYPE_COLORS[type]+"12", border:`1px solid ${TYPE_COLORS[type]}33`, borderRadius:99, padding:"4px 10px" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:TYPE_COLORS[type] }}/>
                  <span style={{ fontSize:11, color:TYPE_COLORS[type], fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{type} × {count}</span>
                </div>
              ))}
            </div>

            {/* List view */}
            {view === "list" && (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {calendar.map((entry, i) => <CalendarEntry key={i} entry={entry} index={i}/>)}
              </div>
            )}

            {/* Week view */}
            {view === "week" && [{ label:"Week 1", days:week1 },{ label:"Week 2", days:week2 }].map(week => (
              <div key={week.label} style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:C.accent, fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                  {week.label}
                  <span style={{ flex:1, height:1, background:C.border, display:"inline-block" }}/>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6 }}>
                  {week.days.map(({ key, dayName, dayNum, entry }) => {
                    const color = entry ? TYPE_COLORS[entry.type] : C.border;
                    const plat = entry ? PLATFORMS.find(p => p.id === entry.platform) : null;
                    return (
                      <div key={key} style={{ background: entry ? C.card : "rgba(255,255,255,0.02)", border:`1px solid ${entry ? color+"33" : C.border}`, borderRadius:10, padding:"10px 8px", textAlign:"center", opacity: entry ? 1 : 0.3 }}>
                        <div style={{ fontSize:9, color:C.muted, fontFamily:"'DM Mono',monospace", marginBottom:4 }}>{dayName}</div>
                        <div style={{ fontSize:16, marginBottom:4 }}>{entry ? plat?.emoji : "·"}</div>
                        {entry && <div style={{ width:8, height:8, borderRadius:"50%", background:color, margin:"0 auto 6px" }}/>}
                        <div style={{ fontSize:9, color: entry ? color : C.muted, fontFamily:"'DM Sans',sans-serif", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>
                          {entry ? entry.type.slice(0,4) : "free"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <button onClick={doGenerate} style={{ width:"100%", marginTop:16, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>
              ↻ Regenerate calendar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
