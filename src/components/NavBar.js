"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import AuthModal from "./AuthModal";

const C = {
  border: "rgba(255,255,255,0.07)",
  orange: "#FF6B35",
  muted:  "#6B6B8A",
  white:  "#F4F3FF",
  card:   "#13131f",
};

function SymLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="slgnav" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FF9F1C"/>
        </linearGradient>
      </defs>
      <path d="M 28 9 C 28 9, 14 9, 12 16 C 10 23, 26 17, 26 24 C 26 31, 12 31, 12 31"
        stroke="url(#slgnav)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="31" r="2.5" fill="#FF6B35"/>
    </svg>
  );
}

export default function NavBar() {
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setShowMenu(false);
    window.location.reload();
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "?";

  return (
    <>
      <nav style={{ padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}`, background:"rgba(8,8,16,0.9)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:100 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
          <SymLogo size={24}/>
          <span style={{ fontFamily:"'Clash Display',sans-serif", fontSize:15, color:C.muted, letterSpacing:"-0.01em" }}>
            Sym<span style={{ color:C.orange }}>YouLater</span>
          </span>
        </Link>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <Link href="/" style={{ fontSize:12, color:C.muted, fontFamily:"'DM Sans',sans-serif", textDecoration:"none" }}>← All tools</Link>

          {!loading && (user ? (
            <div style={{ position:"relative" }}>
              <button onClick={() => setShowMenu(!showMenu)} style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${C.orange},#FF9F1C)`, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#080810", fontFamily:"'DM Sans',sans-serif", overflow:"hidden", padding:0 }}>
                {user.user_metadata?.avatar_url
                  ? <img src={user.user_metadata.avatar_url} alt="" style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover" }}/>
                  : initials}
              </button>
              {showMenu && (
                <>
                  <div onClick={() => setShowMenu(false)} style={{ position:"fixed", inset:0, zIndex:200 }}/>
                  <div style={{ position:"absolute", top:40, right:0, zIndex:201, background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"8px 0", minWidth:180, boxShadow:"0 16px 40px rgba(0,0,0,0.5)" }}>
                    <div style={{ padding:"8px 16px 12px", borderBottom:`1px solid ${C.border}` }}>
                      <div style={{ fontSize:13, color:C.white, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{user.user_metadata?.full_name || "Account"}</div>
                      <div style={{ fontSize:11, color:C.muted, fontFamily:"'DM Sans',sans-serif", marginTop:2 }}>{user.email}</div>
                    </div>
                    <button onClick={handleSignOut} style={{ width:"100%", padding:"10px 16px", textAlign:"left", background:"none", border:"none", color:C.muted, fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:"pointer" }}
                      onMouseEnter={e => e.target.style.color = C.white}
                      onMouseLeave={e => e.target.style.color = C.muted}>
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} style={{ padding:"6px 16px", borderRadius:8, background:C.orange, border:"none", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 16px rgba(255,107,53,0.3)" }}>
              Sign in
            </button>
          ))}
        </div>
      </nav>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)}/>}
    </>
  );
}
