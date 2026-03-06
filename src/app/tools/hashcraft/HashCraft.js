"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const GROUPS = [
  { key: "broad",    label: "Broad Reach",        color: "#7c6aff" },
  { key: "niche",    label: "Niche / Targeted",    color: "#6affda" },
  { key: "trending", label: "Trending Now",        color: "#ff6a9e" },
  { key: "branded",  label: "Community & Branded", color: "#ffb86a" },
];

const PLATFORMS = [
  {
    id: "Instagram", label: "Instagram",
    gradient: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    id: "Threads", label: "Threads",
    gradient: "linear-gradient(135deg,#1a1a1a,#333)",
    icon: <svg width="22" height="22" viewBox="0 0 192 192" fill="currentColor"><path d="M141.537 88.988a66.667 66.667 0 00-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.232c8.25.053 14.474 2.452 18.502 7.13 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 9.98 15.661 12.737 25.697l16.146-4.35c-3.44-12.687-8.853-23.565-16.219-32.394C147.036 9.465 125.202.195 97.25 0h-.484C69.037.195 47.49 9.485 32.062 27.529 18.176 43.812 10.98 66.667 10.75 96v.5c.23 29.333 7.426 52.188 21.312 68.471C47.491 182.515 69.038 191.805 96.766 192h.484c24.635-.185 42.05-6.692 56.33-21.016 18.167-18.194 17.584-40.892 11.588-54.898-4.323-10.072-12.799-18.606-23.63-23.1zM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.058 28.713-23.802 29.274z"/></svg>,
  },
  {
    id: "TikTok", label: "TikTok",
    gradient: "linear-gradient(135deg,#010101,#1a1a2e)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>,
  },
  {
    id: "X / Twitter", label: "X",
    gradient: "linear-gradient(135deg,#000,#1a1a1a)",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.213 5.567 5.951-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    id: "LinkedIn", label: "LinkedIn",
    gradient: "linear-gradient(135deg,#0077b5,#005885)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
];

const COUNTS = [10, 15, 20, 30];
const LANGS  = ["english","spanish","french","german","portuguese","italian","japanese"];

function HashCraftLogo({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hcg" x1="4" y1="8" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c4b5fd"/>
          <stop offset="100%" stopColor="#7c6aff"/>
        </linearGradient>
      </defs>
      <path d="M 17 7 C 16 16, 16 26, 15 45" stroke="url(#hcg)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M 30 7 C 31 16, 31 26, 30 45" stroke="url(#hcg)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M 8 20 C 16 17, 30 17, 44 20" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" fill="none" opacity="0.92"/>
      <path d="M 8 32 C 16 35, 30 35, 44 32" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" fill="none" opacity="0.92"/>
    </svg>
  );
}

function HashCraftLogoSmall({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="hcgs" x1="4" y1="8" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c4b5fd"/>
          <stop offset="100%" stopColor="#7c6aff"/>
        </linearGradient>
      </defs>
      <path d="M 17 7 C 16 16, 16 26, 15 45" stroke="url(#hcgs)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M 30 7 C 31 16, 31 26, 30 45" stroke="url(#hcgs)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M 8 20 C 16 17, 30 17, 44 20" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" fill="none" opacity="0.85"/>
      <path d="M 8 32 C 16 35, 30 35, 44 32" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" fill="none" opacity="0.85"/>
    </svg>
  );
}

export default function HashCraft() {
  const [platform, setPlatform]       = useState("Instagram");
  const [postText, setPostText]       = useState("");
  const [count, setCount]             = useState(15);
  const [lang, setLang]               = useState("english");
  const [useNiche, setUseNiche]       = useState(true);
  const [useTrending, setUseTrending] = useState(true);
  const [loading, setLoading]         = useState(false);
  const [loadingMsg, setLoadingMsg]   = useState("Generating...");
  const [error, setError]             = useState("");
  const [tagData, setTagData]         = useState(null);
  const [selected, setSelected]       = useState(new Set());
  const [copied, setCopied]           = useState(false);
  const outputRef = useRef(null);

  const currentPlatform = PLATFORMS.find(function(p) { return p.id === platform; });
  const allTags = tagData
    ? GROUPS.flatMap(function(g) { return (tagData[g.key] || []).map(function(t) { return t.replace(/^#/, ""); }); })
    : [];
  const outputValue = selected.size === 0
    ? allTags.map(function(t) { return "#" + t; }).join(" ")
    : [...selected].map(function(t) { return "#" + t; }).join(" ");
  const outputHint = selected.size === 0
    ? "all tags - click tags above to filter"
    : selected.size + " selected";

  function toggleTag(tag) {
    setSelected(function(prev) {
      var next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  async function generate() {
    if (!postText.trim()) { setError("Please enter some post text first."); return; }
    setError("");
    setLoading(true);
    setLoadingMsg(useTrending ? "Searching trends..." : "Generating...");
    setTagData(null);
    setSelected(new Set());

    var systemPrompt = "You are a social media hashtag expert. Generate relevant, effective hashtags for " + platform + " posts.\n" +
      (useTrending ? "You have access to a web_search tool. BEFORE generating hashtags, you MUST use it to search for currently trending hashtags related to the topic on " + platform + ". Use the search results to populate the trending array with hashtags that are genuinely trending right now.\n" : "") +
      "Return ONLY a valid JSON object with this exact structure, no markdown, no explanation:\n" +
      '{"broad":["tag1","tag2"],"niche":["tag1","tag2"],"trending":["tag1","tag2"],"branded":["tag1","tag2"]}\n' +
      "Rules:\n- Tags must NOT include the # symbol\n- Tags must be lowercase, no spaces\n" +
      "- broad: 4-5 widely-used high-volume tags\n- niche: 4-6 specific targeted tags (empty array if niche=false)\n" +
      "- trending: 4-6 real trending tags from web search (empty array if trending=false)\n" +
      "- branded: 2-3 community/brand style hashtags\n- Total approximately " + count + " tags, language: " + lang;

    var userPrompt = 'Post: "' + postText.trim() + '"\nniche=' + useNiche + ", trending=" + useTrending + ", count=" + count + "\n" +
      (useTrending ? "Search for trending hashtags for this topic on " + platform + ", then generate the full set." : "Generate the hashtag set.");

    var tools = useTrending ? [{ type: "web_search_20250305", name: "web_search" }] : undefined;

    try {
      var messages = [{ role: "user", content: userPrompt }];
      var finalText = "";

      for (var i = 0; i < 6; i++) {
        var body = { model: "claude-sonnet-4-20250514", max_tokens: 1500, system: systemPrompt, messages: messages };
        if (tools) body.tools = tools;

        var res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          var e = await res.json();
          throw new Error((e.error && e.error.message) || "API error");
        }

        var data = await res.json();

        if (data.stop_reason === "end_turn") {
          finalText = data.content.filter(function(b) { return b.type === "text"; }).map(function(b) { return b.text; }).join("");
          break;
        }
        if (data.stop_reason === "tool_use") {
          setLoadingMsg("Processing search results...");
          messages.push({ role: "assistant", content: data.content });
          var results = data.content
            .filter(function(b) { return b.type === "tool_use"; })
            .map(function(b) { return { type: "tool_result", tool_use_id: b.id, content: b.content ? JSON.stringify(b.content) : "Done." }; });
          messages.push({ role: "user", content: results });
        } else {
          finalText = data.content.filter(function(b) { return b.type === "text"; }).map(function(b) { return b.text; }).join("");
          break;
        }
      }

      var cleaned = finalText.replace(/```json|```/g, "");
      var match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Could not parse response.");
      setTagData(JSON.parse(match[0]));
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function copyOutput() {
    if (!outputValue) return;
    navigator.clipboard.writeText(outputValue);
    setCopied(true);
    setTimeout(function() { setCopied(false); }, 2000);
  }

  return (
    <div style={{ fontFamily:"'DM Mono',monospace", background:"#0a0a0f", minHeight:"100vh", color:"#f0eeff", padding:"44px 24px 80px" }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>

        {/* Platform nav */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, paddingBottom:20, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <defs><linearGradient id="snav" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#FF6B35"/><stop offset="100%" stopColor="#FF9F1C"/></linearGradient></defs>
              <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31" stroke="url(#snav)" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
            </svg>
            <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:15, color:"#9898b8", letterSpacing:"-0.01em" }}>
              Sym<span style={{ color:"#FF6B35" }}>YouLater</span>
            </span>
          </Link>
          <Link href="/" style={{ fontSize:12, color:"#6B6B8A", fontFamily:"'DM Sans',sans-serif", textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>
            ← All tools
          </Link>
        </div>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:38 }}>
          <div style={{ width:72, height:72, borderRadius:18, background:"linear-gradient(135deg,#12102a,#1a1635)", border:"1px solid rgba(124,106,255,0.28)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <HashCraftLogo size={52}/>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:0, lineHeight:1 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(36px,6vw,52px)", fontWeight:900, letterSpacing:"-0.02em", color:"#f0eeff", lineHeight:1 }}>Hash</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(36px,6vw,52px)", fontWeight:900, letterSpacing:"-0.02em", color:"#7c6aff", lineHeight:1 }}>Craft</span>
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#7a7a9a", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:300 }}>
              AI Hashtag Generator
            </div>
          </div>
        </div>

        {/* Platform buttons */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24 }}>
          {PLATFORMS.map(function(p) {
            var on = platform === p.id;
            return (
              <button key={p.id} onClick={function() { setPlatform(p.id); }} style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, width:90, height:80, borderRadius:14, border:on?"none":"1.5px solid #2a2a3d", cursor:"pointer", transition:"all 0.22s", background:on?p.gradient:"#12121a", boxShadow:on?"0 6px 28px rgba(0,0,0,0.5)":"none", transform:on?"translateY(-3px)":"translateY(0)" }}>
                <div style={{ color:on?"#fff":"#555" }}>{p.icon}</div>
                <span style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:on?"#fff":"#555", letterSpacing:"0.03em" }}>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div style={{ background:"#12121a", border:"1.5px solid #2a2a3d", borderRadius:14, padding:18, marginBottom:14 }}>
          <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#7a7a9a", display:"block", marginBottom:8 }}>Your post or caption</span>
          <textarea style={{ width:"100%", background:"transparent", border:"none", outline:"none", color:"#f0eeff", fontFamily:"'DM Mono',monospace", fontSize:14, lineHeight:1.7, resize:"none", minHeight:120 }} value={postText} onChange={function(e) { setPostText(e.target.value); }} maxLength={2200} placeholder="Paste your post text here..."/>
          <div style={{ fontSize:11, textAlign:"right", marginTop:6, color: postText.length > 1800 ? "#ff6a9e" : "#7a7a9a" }}>{postText.length} / 2200</div>
        </div>

        {/* Options */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#12121a", border:"1.5px solid #2a2a3d", borderRadius:9, padding:"7px 12px", fontSize:12, color:"#7a7a9a" }}>
            <span>Count</span>
            <select style={{ background:"transparent", border:"none", color:"#f0eeff", fontFamily:"'DM Mono',monospace", fontSize:12, outline:"none", cursor:"pointer" }} value={count} onChange={function(e) { setCount(Number(e.target.value)); }}>
              {COUNTS.map(function(c) { return <option key={c} value={c}>{c} tags</option>; })}
            </select>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#12121a", border:"1.5px solid #2a2a3d", borderRadius:9, padding:"7px 12px", fontSize:12, color:"#7a7a9a" }}>
            <span>Language</span>
            <select style={{ background:"transparent", border:"none", color:"#f0eeff", fontFamily:"'DM Mono',monospace", fontSize:12, outline:"none", cursor:"pointer" }} value={lang} onChange={function(e) { setLang(e.target.value); }}>
              {LANGS.map(function(l) { return <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>; })}
            </select>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#12121a", border:"1.5px solid #2a2a3d", borderRadius:9, padding:"7px 12px", fontSize:12, color:"#7a7a9a" }}>
            <span>Niche tags</span>
            <div onClick={function() { setUseNiche(!useNiche); }} style={{ width:32, height:18, background:useNiche?"#7c6aff":"#2a2a3d", borderRadius:99, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
              <div style={{ position:"absolute", width:12, height:12, background:"#fff", borderRadius:"50%", top:3, left:useNiche?17:3, transition:"left 0.2s" }}/>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#12121a", border:"1.5px solid #2a2a3d", borderRadius:9, padding:"7px 12px", fontSize:12, color:"#7a7a9a" }}>
            <span>Trending</span>
            <div onClick={function() { setUseTrending(!useTrending); }} style={{ width:32, height:18, background:useTrending?"#7c6aff":"#2a2a3d", borderRadius:99, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}>
              <div style={{ position:"absolute", width:12, height:12, background:"#fff", borderRadius:"50%", top:3, left:useTrending?17:3, transition:"left 0.2s" }}/>
            </div>
          </div>
        </div>

        {error && <div style={{ background:"rgba(255,106,158,0.1)", border:"1.5px solid rgba(255,106,158,0.3)", borderRadius:9, padding:"11px 14px", fontSize:13, color:"#ff6a9e", marginBottom:14 }}>{error}</div>}

        {/* Generate button */}
        <button onClick={generate} disabled={loading} style={{ width:"100%", padding:16, background:loading?"#3a3a5a":(currentPlatform?currentPlatform.gradient:"linear-gradient(135deg,#7c6aff,#9b8aff)"), border:"none", borderRadius:12, color:"#fff", fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, letterSpacing:"0.04em", cursor:loading?"not-allowed":"pointer", marginBottom:32, opacity:loading?0.6:1, display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 4px 24px rgba(124,106,255,0.18)" }}>
          {!loading && currentPlatform && <span style={{ opacity:0.9, display:"flex" }}>{currentPlatform.icon}</span>}
          {loading ? loadingMsg : "Generate " + platform + " Hashtags"}
        </button>

        {/* Results */}
        {tagData && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, letterSpacing:"-0.01em", color:"#f0eeff" }}>Generated Hashtags</div>
              <div style={{ display:"flex", gap:8 }}>
                <button style={{ padding:"6px 12px", borderRadius:7, border:"1.5px solid #2a2a3d", background:"transparent", color:"#7a7a9a", fontFamily:"'DM Mono',monospace", fontSize:11, cursor:"pointer" }} onClick={function() { setSelected(new Set(allTags)); }}>Select all</button>
                <button style={{ padding:"6px 12px", borderRadius:7, border:"1.5px solid #2a2a3d", background:"transparent", color:"#7a7a9a", fontFamily:"'DM Mono',monospace", fontSize:11, cursor:"pointer" }} onClick={function() { setSelected(new Set()); }}>Clear</button>
              </div>
            </div>

            {GROUPS.map(function(g) {
              var tags = (tagData[g.key] || []).map(function(t) { return t.replace(/^#/, ""); });
              if (!tags.length) return null;
              return (
                <div key={g.key}>
                  <div style={{ fontSize:10, letterSpacing:"0.13em", textTransform:"uppercase", color:"#7a7a9a", display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:g.color, display:"inline-block", flexShrink:0 }}/>
                    {g.label}
                    <span style={{ flex:1, height:1, background:"#2a2a3d" }}/>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>
                    {tags.map(function(tag) {
                      var isSel = selected.has(tag);
                      return (
                        <div key={tag} onClick={function() { toggleTag(tag); }} style={{ padding:"7px 13px", borderRadius:8, fontSize:13, cursor:"pointer", userSelect:"none", transition:"all 0.15s", background:isSel?"rgba(124,106,255,0.15)":"#1e1e2f", border:isSel?"1.5px solid #7c6aff":"1.5px solid #2a2a3d", color:isSel?"#a78bff":"#f0eeff" }}>
                          {isSel ? "✓ " : ""}#{tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{ display:"flex", gap:20, marginBottom:20, paddingTop:12, borderTop:"1px solid #1e1e2f", flexWrap:"wrap" }}>
              {[[allTags.length,"total tags"],[platform,"platform"],[selected.size,"selected"]].map(function(item) {
                return (
                  <div key={item[1]} style={{ fontSize:11, color:"#7a7a9a" }}>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:18, color:"#f0eeff", display:"block", marginBottom:1 }}>{item[0]}</span>{item[1]}
                  </div>
                );
              })}
            </div>

            {/* Output box */}
            <div style={{ background:"#12121a", border:"1.5px solid #2a2a3d", borderRadius:13, overflow:"hidden" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 15px", borderBottom:"1.5px solid #2a2a3d", background:"#1a1a26" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <HashCraftLogoSmall size={18}/>
                  <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#7a7a9a" }}>Output</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:11, color:"#7a7a9a" }}>{outputHint}</span>
                  <button onClick={copyOutput} style={{ padding:"7px 18px", background:copied?"#6affda":"#7c6aff", border:"none", borderRadius:7, color:copied?"#0a0a0f":"#fff", fontFamily:"'DM Mono',monospace", fontSize:12, cursor:"pointer", transition:"background 0.2s" }}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <textarea ref={outputRef} readOnly value={outputValue} style={{ display:"block", width:"100%", minHeight:110, background:"transparent", border:"none", outline:"none", color:"#6affda", fontFamily:"'DM Mono',monospace", fontSize:13, lineHeight:1.8, padding:15, resize:"vertical", letterSpacing:"0.02em" }}/>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
