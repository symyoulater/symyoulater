"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const C = {
  bg:          "#080810",
  surface:     "#0f0f1a",
  card:        "#13131f",
  border:      "rgba(255,255,255,0.07)",
  accent:      "#FF6B35",
  accentSoft:  "rgba(255,107,53,0.12)",
  accentGlow:  "rgba(255,107,53,0.25)",
  purple:      "#7C6AFF",
  purpleSoft:  "rgba(124,106,255,0.12)",
  white:       "#F4F3FF",
  muted:       "#6B6B8A",
  mutedLight:  "#9898b8",
};

const TOOLS = [
  { id:"hashcraft",  name:"HashCraft",    tag:"Hashtag Generator",           desc:"Generate perfectly targeted hashtags for any platform in seconds.",                        icon:"#",  accent:C.purple,  soft:C.purpleSoft, href:"/tools/hashcraft" },
  { id:"biogen",     name:"BioForge",     tag:"Instagram Bio Generator",     desc:"Craft a magnetic Instagram bio that stops the scroll and wins followers.",                icon:"@",  accent:"#FF6B35", soft:"rgba(255,107,53,0.12)", href:"/tools/bio-generator" },
  { id:"caption",    name:"CaptionCraft", tag:"Caption Writer",               desc:"Write captions that drive engagement across every platform.",                             icon:"✦",  accent:"#6AFFD4", soft:"rgba(106,255,212,0.1)", href:"/tools/caption-writer" },
  { id:"calendar",   name:"CalendarAI",  tag:"Content Calendar Planner",     desc:"Plan a month of content in minutes. Never stare at a blank schedule again.",             icon:"◈",  accent:"#FFB86A", soft:"rgba(255,184,106,0.1)", href:"/tools/content-calendar" },
  { id:"hookviral",  name:"HookLab",     tag:"TikTok Viral Hook Generator",  desc:"Generate scroll-stopping opening hooks engineered for TikTok virality.",                icon:"⚡", accent:"#FF6B35", soft:"rgba(255,107,53,0.12)", href:"/tools/hook-generator" },
  { id:"linkedin",   name:"LinkedForge", tag:"LinkedIn Post Optimiser",      desc:"Transform ideas into high-performing LinkedIn posts that build authority.",              icon:"◉",  accent:"#6AFFD4", soft:"rgba(106,255,212,0.1)", href:"/tools/linkedin-optimiser" },
  { id:"seo",        name:"MetaCraft",   tag:"SEO Meta Description Writer",  desc:"Write click-worthy meta descriptions that rank and convert.",                            icon:"◎",  accent:C.purple,  soft:C.purpleSoft, href:"/tools/meta-writer" },
  { id:"blog",       name:"OutlineAI",   tag:"Blog Post Outliner",           desc:"Go from blank page to structured blog outline in under 30 seconds.",                     icon:"≡",  accent:"#FFB86A", soft:"rgba(255,184,106,0.1)", href:"/tools/blog-outliner" },
  { id:"email",      name:"SubjectIQ",   tag:"Email Subject Line Tester",    desc:"Generate and score subject lines that get emails opened, not ignored.",                  icon:"✉",  accent:"#FF6B35", soft:"rgba(255,107,53,0.12)", href:"/tools/subject-tester" },
  { id:"adcopy",     name:"AdForge",     tag:"Ad Copy Generator",            desc:"Write high-converting ad copy for Google, Meta and beyond.",                             icon:"◆",  accent:C.purple,  soft:C.purpleSoft, href:"/tools/ad-copy" },
];

const PLANS = [
  {
    name:"Free", price:"£0", period:"forever",
    desc:"Perfect for trying the SymCraft suite",
    features:["5 generations per day","Access to all 10 tools","Standard output quality","Community support"],
    cta:"Get started free", primary:false,
  },
  {
    name:"Pro", price:"£9.99", period:"per month",
    desc:"For creators and marketers who mean business",
    features:["Unlimited generations","Access to all 10 tools","Priority AI processing","Trending data included","Early access to new tools","Email support"],
    cta:"Start 7-day free trial", primary:true,
  },
  {
    name:"Agency", price:"£29.99", period:"per month",
    desc:"For teams managing multiple clients",
    features:["Everything in Pro","5 team seats","Client workspace management","Bulk generation mode","API access","Priority support"],
    cta:"Contact us", primary:false,
  },
];

function SymLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slg)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

function ToolCard({ tool, index }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={tool.href} style={{ textDecoration:"none" }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
        background: hov ? `linear-gradient(135deg, ${C.card}, rgba(19,19,31,0.8))` : C.card,
        border:`1px solid ${hov ? tool.accent+"55" : C.border}`,
        borderRadius:16, padding:24, cursor:"pointer",
        transition:"all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${tool.accent}22` : "0 2px 8px rgba(0,0,0,0.2)",
        position:"relative", overflow:"hidden",
        animationDelay:`${index * 0.07}s`,
      }}>
        {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${tool.accent}, transparent)` }}/>}
        <div style={{ width:44, height:44, borderRadius:12, background:tool.soft, border:`1px solid ${tool.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:tool.accent, marginBottom:16, transition:"transform 0.3s", transform: hov ? "scale(1.1)" : "scale(1)" }}>
          {tool.icon}
        </div>
        <div style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:tool.accent, marginBottom:6, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{tool.tag}</div>
        <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:19, fontWeight:600, color:C.white, marginBottom:8, letterSpacing:"-0.02em" }}>{tool.name}</div>
        <div style={{ fontSize:13, color:C.muted, lineHeight:1.6, fontFamily:"'DM Sans',sans-serif" }}>{tool.desc}</div>
        <div style={{ marginTop:16, fontSize:12, color:tool.accent, opacity: hov ? 1 : 0, transition:"opacity 0.2s, transform 0.2s", transform: hov ? "translateX(4px)" : "translateX(0)", fontFamily:"'DM Sans',sans-serif" }}>
          Try it free →
        </div>
      </div>
    </Link>
  );
}

function PricingCard({ plan }) {
  return (
    <div style={{
      background: plan.primary ? `linear-gradient(135deg, rgba(255,107,53,0.12), rgba(124,106,255,0.08))` : C.card,
      border:`1px solid ${plan.primary ? C.accent+"66" : C.border}`,
      borderRadius:20, padding:"32px 28px", position:"relative", overflow:"hidden",
      transform: plan.primary ? "scale(1.03)" : "scale(1)",
      boxShadow: plan.primary ? `0 0 60px rgba(255,107,53,0.15)` : "none",
    }}>
      {plan.primary && <div style={{ position:"absolute", top:16, right:16, background:C.accent, color:"#fff", fontSize:10, fontWeight:700, letterSpacing:"0.1em", padding:"4px 10px", borderRadius:99, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase" }}>Most Popular</div>}
      {plan.primary && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${C.accent}, transparent)` }}/>}
      <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:13, letterSpacing:"0.1em", textTransform:"uppercase", color: plan.primary ? C.accent : C.muted, marginBottom:12 }}>{plan.name}</div>
      <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:6 }}>
        <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:42, fontWeight:600, color:C.white, letterSpacing:"-0.03em" }}>{plan.price}</span>
        <span style={{ fontSize:13, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>/{plan.period}</span>
      </div>
      <div style={{ fontSize:13, color:C.muted, fontFamily:"'DM Sans',sans-serif", marginBottom:24, lineHeight:1.5 }}>{plan.desc}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
        {plan.features.map(f => (
          <div key={f} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:C.mutedLight, fontFamily:"'DM Sans',sans-serif" }}>
            <span style={{ color: plan.primary ? C.accent : C.purple, fontSize:14 }}>✓</span>{f}
          </div>
        ))}
      </div>
      <button style={{ width:"100%", padding:13, borderRadius:10, border: plan.primary ? "none" : `1px solid ${C.border}`, background: plan.primary ? `linear-gradient(135deg, ${C.accent}, #FF9F1C)` : "transparent", color: plan.primary ? "#fff" : C.mutedLight, fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", boxShadow: plan.primary ? "0 4px 20px rgba(255,107,53,0.3)" : "none" }}>
        {plan.cta}
      </button>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const categories = [
    { id:"all", label:"All Tools" },
    { id:"social", label:"Social Media" },
    { id:"content", label:"Content" },
    { id:"marketing", label:"Marketing" },
  ];

  const filtered = activeTab === "all" ? TOOLS : TOOLS.filter(t =>
    activeTab === "social"    ? ["hashcraft","biogen","caption","hookviral","linkedin"].includes(t.id) :
    activeTab === "content"   ? ["calendar","blog","seo"].includes(t.id) :
    ["adcopy","email"].includes(t.id)
  );

  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:C.white, overflowX:"hidden" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}
        .hu{animation:fadeUp 0.8s ease both;}
        .hs{animation:fadeUp 0.8s ease 0.15s both;}
        .hc{animation:fadeUp 0.8s ease 0.3s both;}
        .hb{animation:fadeUp 0.8s ease 0.1s both;}
        .sp{animation:fadeIn 1s ease 0.6s both;opacity:0;}
      `}</style>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled ? "rgba(8,8,16,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition:"all 0.4s ease" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <SymLogo size={30}/>
          <div style={{ display:"flex", alignItems:"baseline" }}>
            <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:20, fontWeight:600, color:C.white, letterSpacing:"-0.02em" }}>Sym</span>
            <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:20, fontWeight:600, color:C.accent, letterSpacing:"-0.02em" }}>YouLater</span>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:28 }}>
          {[["Tools","#tools"],["Pricing","#pricing"]].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize:13, color:C.muted, textDecoration:"none", fontFamily:"'DM Sans',sans-serif" }}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button style={{ padding:"8px 18px", background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}>Log in</button>
          <button style={{ padding:"8px 18px", background:C.accent, border:"none", borderRadius:8, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 16px rgba(255,107,53,0.3)" }}>Try free</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"120px 24px 80px", overflow:"hidden" }}>
        {/* Grid bg */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }}/>
        {/* Orbs */}
        <div style={{ position:"absolute", top:"-20%", left:"60%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"10%", left:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,106,255,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>

        <div className="hb" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,107,53,0.08)", border:`1px solid rgba(255,107,53,0.2)`, borderRadius:99, padding:"6px 14px 6px 8px", marginBottom:32, fontSize:12, color:C.accent, fontFamily:"'DM Sans',sans-serif" }}>
          <span style={{ background:C.accent, color:"#fff", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99, letterSpacing:"0.08em" }}>NEW</span>
          10 AI-powered marketing tools. One platform.
        </div>

        <h1 className="hu" style={{ fontFamily:"'Clash Display',sans-serif", fontSize:"clamp(42px,7vw,88px)", fontWeight:600, letterSpacing:"-0.04em", lineHeight:1.05, maxWidth:900, marginBottom:24, position:"relative", zIndex:1 }}>
          Create content that<br/>
          <span style={{ color:C.accent }}>actually</span> performs.
        </h1>

        <p className="hs" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(15px,2vw,19px)", color:C.muted, maxWidth:540, lineHeight:1.7, marginBottom:40, position:"relative", zIndex:1 }}>
          SymYouLater gives marketers, creators and businesses 10 precision AI tools to write, plan and grow — faster than ever before.
        </p>

        <div className="hc" style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", position:"relative", zIndex:1 }}>
          <a href="#tools">
            <button style={{ padding:"14px 32px", background:`linear-gradient(135deg, ${C.accent}, #FF9F1C)`, border:"none", borderRadius:10, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, cursor:"pointer", boxShadow:"0 8px 32px rgba(255,107,53,0.35)" }}>
              Start for free →
            </button>
          </a>
          <a href="#pricing">
            <button style={{ padding:"14px 32px", background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`, borderRadius:10, color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:15, cursor:"pointer" }}>
              View pricing
            </button>
          </a>
        </div>

        <div className="sp" style={{ marginTop:56, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap", justifyContent:"center", position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            {[...Array(5)].map((_,i) => <span key={i} style={{ color:C.accent, fontSize:14 }}>★</span>)}
            <span style={{ fontSize:13, color:C.muted, fontFamily:"'DM Sans',sans-serif", marginLeft:4 }}>Loved by 200+ creators</span>
          </div>
          <div style={{ width:1, height:16, background:C.border }}/>
          <span style={{ fontSize:13, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>No credit card required</span>
          <div style={{ width:1, height:16, background:C.border }}/>
          <span style={{ fontSize:13, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>Cancel anytime</span>
        </div>

        <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", animation:"pulse 2s infinite" }}>
          <div style={{ width:1, height:40, background:`linear-gradient(${C.accent}, transparent)` }}/>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" style={{ padding:"80px 24px", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:C.accent, fontFamily:"'DM Sans',sans-serif", fontWeight:500, marginBottom:12 }}>The SymCraft Suite</div>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:600, letterSpacing:"-0.03em", marginBottom:16, color:C.white }}>
            Every tool you need.<br/>Nothing you don&apos;t.
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:C.muted, maxWidth:480, margin:"0 auto" }}>
            10 precision-built AI tools for modern marketers. All powered by the latest Claude AI.
          </p>
        </div>

        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:40, flexWrap:"wrap" }}>
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveTab(c.id)} style={{ padding:"8px 18px", borderRadius:99, border:`1px solid ${activeTab===c.id ? C.accent+"66" : C.border}`, background: activeTab===c.id ? C.accentSoft : "transparent", color: activeTab===c.id ? C.accent : C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer", transition:"all 0.2s" }}>
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:16 }}>
          {filtered.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i}/>)}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding:"40px 24px 80px", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ background:`linear-gradient(135deg, rgba(255,107,53,0.06), rgba(124,106,255,0.04))`, border:`1px solid ${C.border}`, borderRadius:24, padding:"60px 48px", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:40 }}>
          {[["10","AI-powered tools","All in one place"],["30s","Average time to output","From idea to copy"],["£9.99","Unlimited Pro access","Per month, cancel anytime"],["99%","Uptime guaranteed","Always on, always fast"]].map(([n,l,s]) => (
            <div key={n} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:48, fontWeight:600, color:C.accent, letterSpacing:"-0.04em", lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:C.white, fontWeight:500, marginTop:8 }}>{l}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:C.muted, marginTop:4 }}>{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding:"80px 24px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:C.accent, fontFamily:"'DM Sans',sans-serif", fontWeight:500, marginBottom:12 }}>Pricing</div>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:600, letterSpacing:"-0.03em", color:C.white, marginBottom:16 }}>Simple, honest pricing.</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:C.muted, maxWidth:400, margin:"0 auto" }}>Start free. Upgrade when you&apos;re ready. No hidden fees, ever.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:20, alignItems:"center" }}>
          {PLANS.map(plan => <PricingCard key={plan.name} plan={plan}/>)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"80px 24px", maxWidth:900, margin:"0 auto", textAlign:"center" }}>
        <div style={{ background:`linear-gradient(135deg, rgba(255,107,53,0.1), rgba(124,106,255,0.08))`, border:`1px solid rgba(255,107,53,0.2)`, borderRadius:24, padding:"64px 40px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${C.accent}, transparent)` }}/>
          <h2 style={{ fontFamily:"'Clash Display',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:600, letterSpacing:"-0.03em", color:C.white, marginBottom:16 }}>Ready to craft smarter?</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:C.muted, maxWidth:440, margin:"0 auto 32px", lineHeight:1.7 }}>
            Join hundreds of creators and marketers using SymYouLater to save hours every week.
          </p>
          <button style={{ padding:"14px 40px", background:`linear-gradient(135deg, ${C.accent}, #FF9F1C)`, border:"none", borderRadius:10, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, cursor:"pointer", boxShadow:"0 8px 32px rgba(255,107,53,0.3)" }}>
            Get started free — no card needed
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"40px 24px", maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <SymLogo size={24}/>
          <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:16, color:C.muted }}>SymYouLater</span>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {["Privacy","Terms","Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize:13, color:C.muted, fontFamily:"'DM Sans',sans-serif", textDecoration:"none" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif" }}>© 2025 SymYouLater. All rights reserved.</div>
      </footer>
    </div>
  );
}
