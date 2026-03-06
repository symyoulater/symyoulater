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
  accentGlow: "rgba(255,184,106,0.22)",
  orange:     "#FF6B35",
  teal:       "#6AFFD4",
  purple:     "#7C6AFF",
  white:      "#F4F3FF",
  muted:      "#6B6B8A",
  mutedLight: "#9898b8",
};

const CONTENT_TYPES = [
  { id:"how_to",     label:"How-To Guide",    emoji:"🛠️", desc:"Step-by-step instructional" },
  { id:"listicle",   label:"Listicle",        emoji:"📋", desc:"Numbered or bulleted list" },
  { id:"deep_dive",  label:"Deep Dive",       emoji:"🔍", desc:"In-depth analysis" },
  { id:"opinion",    label:"Opinion / Essay", emoji:"💬", desc:"Thought leadership piece" },
  { id:"comparison", label:"Comparison",      emoji:"⚖️", desc:"X vs Y style article" },
  { id:"case_study", label:"Case Study",      emoji:"📊", desc:"Real-world example" },
];

const LENGTHS = [
  { id:"short",  label:"Short",  sub:"800–1,200 words",  sections:4  },
  { id:"medium", label:"Medium", sub:"1,500–2,500 words", sections:6  },
  { id:"long",   label:"Long",   sub:"3,000–5,000 words", sections:9  },
  { id:"pillar", label:"Pillar", sub:"5,000–8,000 words", sections:12 },
];

const TYPE_COLORS = { intro: "#7C6AFF", section: "#FFB86A", conclusion: "#6AFFD4" };
const TYPE_LABELS = { intro: "Intro", section: "Section", conclusion: "Conclusion" };

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgoa" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgoa)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function OutlineAILogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="oag" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FFD280"/>
          <stop offset="100%" stopColor="#FFB86A"/>
        </linearGradient>
      </defs>
      <path d="M 12 8 L 12 44 L 40 44 L 40 18 L 30 8 Z"
        stroke="url(#oag)" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      <path d="M 30 8 L 30 18 L 40 18"
        stroke="url(#oag)" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      <line x1="18" y1="26" x2="34" y2="26" stroke="url(#oag)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="21" y1="32" x2="34" y2="32" stroke="url(#oag)" strokeWidth="2"   strokeLinecap="round" opacity="0.7"/>
      <line x1="21" y1="37" x2="30" y2="37" stroke="url(#oag)" strokeWidth="2"   strokeLinecap="round" opacity="0.5"/>
      <circle cx="17" cy="32" r="1.5" fill="url(#oag)" opacity="0.7"/>
      <circle cx="17" cy="37" r="1.5" fill="url(#oag)" opacity="0.5"/>
    </svg>
  );
}

function SectionCard({ section, index, totalSections }) {
  const [expanded, setExpanded] = useState(index < 2);
  const color = TYPE_COLORS[section.type] || C.accent;

  return (
    <div style={{ display:"flex", gap:0 }}>
      {requiresAuth && <AuthModal onClose={() => setRequiresAuth(false)}/>}
      {/* Timeline */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:32, flexShrink:0 }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:`${color}18`, border:`2px solid ${color}66`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontFamily:"'DM Mono',monospace", color, fontWeight:700, flexShrink:0 }}>
          {index + 1}
        </div>
        {index < totalSections - 1 && (
          <div style={{ width:2, flex:1, background:`linear-gradient(${color}44, rgba(255,255,255,0.04))`, minHeight:20, marginTop:4 }}/>
        )}
      </div>

      {/* Card */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          flex:1, marginLeft:12, marginBottom:12,
          background: expanded ? "rgba(19,19,31,0.95)" : C.card,
          border: `1px solid ${expanded ? color+"33" : C.border}`,
          borderRadius:12, padding:"14px 16px",
          cursor:"pointer", transition:"all 0.22s",
        }}
      >
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: expanded ? 12 : 0 }}>
          <div style={{ flex:1, minWidth:0, marginRight:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
              <span style={{ fontSize:9, color, fontFamily:"'DM Sans',sans-serif", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", background:`${color}18`, padding:"2px 7px", borderRadius:99 }}>
                {TYPE_LABELS[section.type] || "Section"}
              </span>
              <span style={{ fontSize:10, color:C.muted, fontFamily:"'DM Mono',monospace" }}>~{section.word_count} words</span>
            </div>
            <div style={{ fontSize:14, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:600, lineHeight:1.4 }}>
              {section.heading}
            </div>
          </div>
          <div style={{ fontSize:12, color:C.muted, transition:"transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0)", flexShrink:0, marginTop:2 }}>▾</div>
        </div>

        {expanded && (
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
            {section.purpose && (
              <div style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, marginBottom:10 }}>
                <span style={{ color:C.muted, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>Purpose: </span>
                {section.purpose}
              </div>
            )}
            {section.notes && (
              <div style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, marginBottom: section.sub_points?.length ? 10 : 0, background:"rgba(255,255,255,0.02)", borderRadius:8, padding:"8px 12px", borderLeft:`2px solid ${color}44` }}>
                {section.notes}
              </div>
            )}
            {section.sub_points && section.sub_points.length > 0 && (
              <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop: section.notes ? 10 : 0 }}>
                {section.sub_points.map((pt, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                    <span style={{ color, fontSize:11, marginTop:2, flexShrink:0 }}>→</span>
                    <span style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>{pt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OutlineAI() {
  const { generate, requiresAuth, setRequiresAuth } = useGenerate("outlineai");

  const [topic, setTopic]               = useState("");
  const [audience, setAudience]         = useState("");
  const [keywords, setKeywords]         = useState("");
  const [contentType, setContentType]   = useState("how_to");
  const [length, setLength]             = useState("medium");
  const [includeSeo, setIncludeSeo]     = useState(true);
  const [outline, setOutline]           = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [copied, setCopied]             = useState(false);

  const ready = topic.trim().length > 0;
  const targetSections = LENGTHS.find(l => l.id === length)?.sections || 6;

  function buildMarkdown(o) {
    return [
      `# ${o.title}`,
      `\n**Meta description:** ${o.meta_description}`,
      `**Estimated:** ${o.estimated_words} words · ${o.read_time}`,
      "",
      ...o.sections.map((s, i) => [
        `## ${i + 1}. ${s.heading}`,
        s.purpose ? `*Purpose: ${s.purpose}*` : "",
        s.notes || "",
        s.sub_points?.length ? s.sub_points.map(p => `  - ${p}`).join("\n") : "",
      ].filter(Boolean).join("\n")),
    ].join("\n\n");
  }

  function copyOutline() {
    if (!outline) return;
    navigator.clipboard.writeText(buildMarkdown(outline));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function doGenerate() {
    if (!ready) return;
    setError("");
    setLoading(true);
    setOutline(null);

    const systemPrompt = `You are an expert content strategist and SEO writer who creates detailed blog post outlines that rank on Google and engage readers.

Return ONLY a valid JSON object. No markdown, no explanation. Format:
{
  "title": "suggested SEO blog post title",
  "meta_description": "compelling meta description 140-160 chars",
  "estimated_words": 2000,
  "read_time": "X min read",
  "sections": [
    {
      "type": "intro|section|conclusion",
      "heading": "section heading (H2 style)",
      "purpose": "what this section achieves for the reader",
      "word_count": 200,
      "notes": "specific writing guidance for this section",
      "sub_points": ["sub-point 1", "sub-point 2"]
    }
  ]
}

Rules:
- Generate exactly ${targetSections} sections total
- First section type must be "intro", last must be "conclusion", all others "section"
- Content type: ${contentType} — structure the outline accordingly
- ${contentType === "how_to" ? "Structure as numbered steps with clear action items" : ""}
- ${contentType === "listicle" ? "Each section should be a list item with depth" : ""}
- ${contentType === "comparison" ? "Include dedicated sections for each option and a verdict section" : ""}
- ${contentType === "case_study" ? "Follow: background → challenge → approach → results → lessons" : ""}
- word_count: realistic word count for that section
- estimated_words: total word count matching the ${length} length target
- read_time: calculate at 200 words per minute
- notes: specific, actionable writing guidance (not generic)
- sub_points: 2-4 specific sub-points or H3 headings for the section (empty array if intro/conclusion)
- ${includeSeo ? `Weave in keyword placement tips naturally in the notes field. Keywords to target: ${keywords || "general SEO best practices"}` : "Focus on content quality, not keyword optimisation"}
- Make the title compelling and specific — include a number or specific result if possible`;

    const userPrompt = `Blog post topic: ${topic}
Target audience: ${audience || "general readers"}
${keywords ? `SEO keywords: ${keywords}` : ""}
Content type: ${contentType}
Article length: ${length} (~${LENGTHS.find(l => l.id === length)?.sub})
SEO optimisation: ${includeSeo}

Generate a complete blog post outline with ${targetSections} sections.`;

    try {
      const data = await generate(body);
        if (data === null) { setLoading(false); return; }
      const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Could not parse response.");
      setOutline(JSON.parse(match[0]));
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const totalWords = outline?.sections?.reduce((a, s) => a + (s.word_count || 0), 0) || 0;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.white, paddingBottom:80 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>

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
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:12 }}>
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#1a1408,#2a2010)", border:"1px solid rgba(255,184,106,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <OutlineAILogo size={44}/>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", lineHeight:1, marginBottom:5 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.white }}>Outline</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(32px,5vw,44px)", fontWeight:900, letterSpacing:"-0.02em", color:C.accent }}>AI</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              Blog Post Outliner
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={{ background:"rgba(255,184,106,0.06)", border:`1px solid rgba(255,184,106,0.15)`, borderRadius:12, padding:"12px 16px", marginBottom:28, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>✦</span>
          <span style={{ fontSize:13, color:C.mutedLight, lineHeight:1.5 }}>
            Writers who outline first produce content <strong style={{ color:C.white }}>3× faster</strong> and rank <strong style={{ color:C.accent }}>higher on Google</strong> — because structure signals expertise to the algorithm.
          </span>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Blog post topic</div>
            <textarea value={topic} onChange={e => setTopic(e.target.value)}
              placeholder="e.g. How to grow an Instagram account organically, The best productivity apps for remote teams..."
              style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.6, resize:"none", minHeight:70, outline:"none" }}/>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>Target audience</div>
              <input value={audience} onChange={e => setAudience(e.target.value)}
                placeholder="e.g. Beginner photographers, SaaS founders..."
                style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
            </div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>
                SEO keywords <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(optional)</span>
              </div>
              <input value={keywords} onChange={e => setKeywords(e.target.value)}
                placeholder="e.g. grow instagram, instagram followers organically"
                style={{ width:"100%", background:"transparent", border:"none", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}/>
            </div>
          </div>

          {/* Content type */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Content type</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {CONTENT_TYPES.map(t => {
                const on = contentType === t.id;
                return (
                  <button key={t.id} onClick={() => setContentType(t.id)} style={{
                    padding:"11px 10px", borderRadius:11,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", alignItems:"center", gap:8,
                    fontFamily:"'DM Sans',sans-serif",
                  }}>
                    <span style={{ fontSize:16 }}>{t.emoji}</span>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:12, fontWeight:600 }}>{t.label}</div>
                      <div style={{ fontSize:10, color: on ? C.accent+"88" : "#44445a", marginTop:1 }}>{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Length */}
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:10 }}>Article length</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {LENGTHS.map(l => {
                const on = length === l.id;
                return (
                  <button key={l.id} onClick={() => setLength(l.id)} style={{
                    padding:"11px 8px", borderRadius:11,
                    border:`1px solid ${on ? C.accent+"55" : C.border}`,
                    background: on ? C.accentSoft : C.card,
                    color: on ? C.accent : C.muted,
                    cursor:"pointer", transition:"all 0.2s",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                  }}>
                    <span style={{ fontSize:13, fontFamily:"'DM Sans',sans-serif", fontWeight:700 }}>{l.label}</span>
                    <span style={{ fontSize:10, color: on ? C.accent+"88" : "#44445a", fontFamily:"'DM Sans',sans-serif", textAlign:"center" }}>{l.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEO toggle */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"13px 16px" }}>
            <div>
              <div style={{ fontSize:13, color:C.white, fontWeight:500 }}>SEO optimisation notes</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Include keyword placement tips in each section</div>
            </div>
            <div onClick={() => setIncludeSeo(!includeSeo)} style={{ width:36, height:20, background:includeSeo ? C.accent : "#2a2a3d", borderRadius:99, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
              <div style={{ position:"absolute", width:14, height:14, background: includeSeo ? "#080810" : "#fff", borderRadius:"50%", top:3, left:includeSeo?19:3, transition:"left 0.2s" }}/>
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
              Building your outline...
            </>
          ) : <>✦ Generate Blog Outline</>}
        </button>

        {/* Results */}
        {outline && (
          <div style={{ animation:"fadeUp 0.4s ease both" }}>
            {/* Header card */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:20, marginBottom:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <div style={{ fontSize:10, color:C.accent, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                  Suggested Title
                </div>
                <div style={{ display:"flex", gap:12 }}>
                  <span style={{ fontSize:11, color:C.muted, fontFamily:"'DM Mono',monospace" }}>~{totalWords} words</span>
                  <span style={{ fontSize:11, color:C.muted, fontFamily:"'DM Mono',monospace" }}>{outline.read_time}</span>
                  <span style={{ fontSize:11, color:C.muted, fontFamily:"'DM Mono',monospace" }}>{outline.sections?.length} sections</span>
                </div>
              </div>
              <div style={{ fontSize:18, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:700, lineHeight:1.4, marginBottom:12 }}>
                {outline.title}
              </div>
              <div style={{ fontSize:12, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, background:"rgba(255,255,255,0.02)", borderRadius:8, padding:"10px 12px" }}>
                <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>Meta: </span>
                {outline.meta_description}
              </div>
              <button onClick={copyOutline} style={{ marginTop:14, width:"100%", padding:"10px", borderRadius:9, background: copied ? "rgba(106,255,212,0.12)" : C.accentSoft, border:`1px solid ${copied ? C.teal+"55" : C.accent+"33"}`, color: copied ? C.teal : C.accent, fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}>
                {copied ? "✓ Outline copied as Markdown!" : "Copy full outline as Markdown"}
              </button>
            </div>

            {/* Legend */}
            <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
              {Object.entries(TYPE_LABELS).map(([type, label]) => (
                <div key={type} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:TYPE_COLORS[type] }}/>
                  <span style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>{label}</span>
                </div>
              ))}
              <span style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif", marginLeft:"auto" }}>Click any section to expand</span>
            </div>

            {/* Timeline sections */}
            <div>
              {outline.sections?.map((section, i) => (
                <SectionCard key={i} section={section} index={i} totalSections={outline.sections.length}/>
              ))}
            </div>

            <button onClick={doGenerate} style={{ width:"100%", marginTop:8, padding:"12px", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>
              ↻ Generate new outline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
