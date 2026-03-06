import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found",
};

const TOOLS = [
  { label:"HashCraft",   href:"/tools/hashcraft",          accent:"#7C6AFF" },
  { label:"BioForge",    href:"/tools/bio-generator",      accent:"#FF6B35" },
  { label:"CaptionCraft",href:"/tools/caption-writer",     accent:"#6AFFD4" },
  { label:"CalendarAI",  href:"/tools/content-calendar",   accent:"#FFB86A" },
  { label:"HookLab",     href:"/tools/hook-generator",     accent:"#FF6A9E" },
  { label:"LinkedForge", href:"/tools/linkedin-optimiser", accent:"#6AFFD4" },
  { label:"MetaCraft",   href:"/tools/meta-writer",        accent:"#7C6AFF" },
  { label:"OutlineAI",   href:"/tools/blog-outliner",      accent:"#FFB86A" },
  { label:"SubjectIQ",   href:"/tools/subject-tester",     accent:"#6AFFD4" },
  { label:"AdForge",     href:"/tools/ad-copy",            accent:"#FF6B35" },
];

function SymLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slg404" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slg404)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

export default function NotFound() {
  return (
    <div style={{
      fontFamily:"'DM Sans',sans-serif",
      background:"#080810",
      minHeight:"100vh",
      color:"#F4F3FF",
      display:"flex",
      flexDirection:"column",
    }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Outfit:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        .tool-pill:hover {
          border-color: var(--pill-accent) !important;
          background: rgba(var(--pill-accent-rgb), 0.12) !important;
          color: var(--pill-accent) !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        padding:"0 32px", height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        background:"rgba(8,8,16,0.9)", backdropFilter:"blur(20px)",
      }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <SymLogo size={28}/>
          <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:17, letterSpacing:"-0.02em", color:"#9898b8" }}>
            Sym<span style={{ color:"#FF6B35" }}>YouLater</span>
          </span>
        </Link>
        <Link href="/" style={{ fontSize:13, color:"#6B6B8A", fontFamily:"'DM Sans',sans-serif", textDecoration:"none" }}>
          ← Back to home
        </Link>
      </nav>

      {/* Main */}
      <div style={{
        flex:1, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"60px 24px", textAlign:"center",
        position:"relative", overflow:"hidden",
      }}>

        {/* Background glow */}
        <div style={{
          position:"absolute", width:600, height:600, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
          top:"50%", left:"50%", transform:"translate(-50%,-60%)",
          pointerEvents:"none",
        }}/>

        {/* Floating 404 */}
        <div style={{
          fontFamily:"'Outfit',sans-serif",
          fontSize:"clamp(120px, 22vw, 200px)",
          fontWeight:900,
          letterSpacing:"-0.06em",
          lineHeight:1,
          animation:"float 4s ease-in-out infinite",
          background:"linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0.05) 100%)",
          WebkitBackgroundClip:"text",
          backgroundClip:"text",
          color:"transparent",
          WebkitTextStroke:"2px rgba(255,107,53,0.25)",
          marginBottom:8,
          userSelect:"none",
        }}>
          404
        </div>

        {/* Message */}
        <div style={{ animation:"fadeUp 0.5s ease 0.1s both" }}>
          <h1 style={{
            fontFamily:"'Clash Display',sans-serif",
            fontSize:"clamp(24px,4vw,36px)",
            fontWeight:600,
            letterSpacing:"-0.02em",
            color:"#F4F3FF",
            marginBottom:12,
          }}>
            This page got lost in the algorithm
          </h1>
          <p style={{
            fontSize:16, color:"#6B6B8A",
            fontFamily:"'DM Sans',sans-serif",
            lineHeight:1.7, maxWidth:420, margin:"0 auto 36px",
          }}>
            The URL you followed doesn&apos;t exist — but all 10 tools are right here waiting for you.
          </p>
        </div>

        {/* CTAs */}
        <div style={{
          display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center",
          marginBottom:56, animation:"fadeUp 0.5s ease 0.2s both",
        }}>
          <Link href="/" style={{ textDecoration:"none" }}>
            <div style={{
              padding:"12px 28px", borderRadius:10,
              background:"linear-gradient(135deg, #FF6B35, #FF9F1C)",
              color:"#080810", fontFamily:"'DM Sans',sans-serif",
              fontSize:14, fontWeight:700, cursor:"pointer",
              boxShadow:"0 4px 20px rgba(255,107,53,0.3)",
              transition:"all 0.2s",
            }}>
              ← Back to homepage
            </div>
          </Link>
          <Link href="/#tools" style={{ textDecoration:"none" }}>
            <div style={{
              padding:"12px 28px", borderRadius:10,
              background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.1)",
              color:"#9898b8", fontFamily:"'DM Sans',sans-serif",
              fontSize:14, fontWeight:500, cursor:"pointer",
              transition:"all 0.2s",
            }}>
              Browse all tools →
            </div>
          </Link>
        </div>

        {/* Tool pills */}
        <div style={{ animation:"fadeUp 0.5s ease 0.3s both" }}>
          <div style={{
            fontSize:10, color:"#6B6B8A", letterSpacing:"0.15em",
            textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif",
            marginBottom:16, fontWeight:500,
          }}>
            Or jump straight to a tool
          </div>
          <div style={{
            display:"flex", gap:8, flexWrap:"wrap",
            justifyContent:"center", maxWidth:640,
          }}>
            {TOOLS.map(t => (
              <Link key={t.href} href={t.href} style={{ textDecoration:"none" }}>
                <div
                  className="tool-pill"
                  style={{
                    padding:"7px 14px", borderRadius:99,
                    border:"1px solid rgba(255,255,255,0.08)",
                    background:"rgba(255,255,255,0.03)",
                    color:"#6B6B8A",
                    fontFamily:"'DM Sans',sans-serif",
                    fontSize:12, fontWeight:500,
                    cursor:"pointer",
                    transition:"all 0.2s",
                    "--pill-accent": t.accent,
                  }}
                >
                  {t.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
