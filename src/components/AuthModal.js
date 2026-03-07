"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const C = { bg:"#080810",card:"#13131f",border:"rgba(255,255,255,0.07)",accent:"#FF6B35",accentSoft:"rgba(255,107,53,0.12)",accentGlow:"rgba(255,107,53,0.25)",white:"#F4F3FF",muted:"#6B6B8A",mutedLight:"#9898b8",error:"#FF6A9E" };

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

export default function AuthModal({ onClose }) {
  const [mode,setMode]=useState("signin");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  const [googleLoading,setGoogleLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleGoogle() {
    setGoogleLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (err) { setError(err.message); setGoogleLoading(false); }
  }

  async function handleSubmit(e){
    e.preventDefault();setError("");setSuccess("");setLoading(true);
    if(mode==="signup"){
      const{error:err}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}});
      if(err){setError(err.message);setLoading(false);return;}
      setSuccess("Account created! Check your email to confirm, then sign in.");
      setLoading(false);return;
    }
    const{error:err}=await supabase.auth.signInWithPassword({email,password});
    setLoading(false);
    if(err){setError("Invalid email or password.");return;}
    onClose?.();window.location.reload();
  }

  const inputStyle={padding:"11px 14px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,color:C.white,fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none",width:"100%"};

  return(
    <>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:999,background:"rgba(8,8,16,0.85)",backdropFilter:"blur(8px)",animation:"fadeIn 0.2s ease"}}/>
      <div style={{position:"fixed",zIndex:1000,top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"100%",maxWidth:420,padding:"0 16px",animation:"slideUp 0.3s ease"}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:"32px 28px",position:"relative",boxShadow:"0 32px 80px rgba(0,0,0,0.6)"}}>
          <div style={{position:"absolute",top:0,left:"10%",right:"10%",height:1,background:`linear-gradient(90deg,transparent,${C.accent}66,transparent)`}}/>
          <button onClick={onClose} style={{position:"absolute",top:16,right:16,width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,color:C.muted,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          
          <div style={{marginBottom:24,textAlign:"center"}}>
            <div style={{fontSize:11,color:C.accent,letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:8}}>{mode==="signin"?"Welcome back":"Get started free"}</div>
            <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:900,letterSpacing:"-0.02em",color:C.white,margin:0}}>{mode==="signin"?<>Sign in to <span style={{color:C.accent}}>SymYouLater</span></>:"Create your account"}</h2>
            {mode==="signup"&&<p style={{fontSize:13,color:C.muted,marginTop:8,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>Free account · No card needed · All 10 tools</p>}
          </div>

          {/* Google button */}
          <button onClick={handleGoogle} disabled={googleLoading} style={{width:"100%",padding:"11px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,color:C.white,fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:googleLoading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16}}>
            {googleLoading ? <div style={{width:16,height:16,border:"2px solid rgba(255,255,255,0.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/> : <GoogleIcon/>}
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{flex:1,height:1,background:C.border}}/>
            <span style={{fontSize:12,color:C.muted,fontFamily:"'DM Sans',sans-serif"}}>or</span>
            <div style={{flex:1,height:1,background:C.border}}/>
          </div>

          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:10}}>
            {mode==="signup"&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required style={inputStyle} onFocus={e=>e.target.style.borderColor=C.accent+"66"} onBlur={e=>e.target.style.borderColor=C.border}/>}
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" required style={inputStyle} onFocus={e=>e.target.style.borderColor=C.accent+"66"} onBlur={e=>e.target.style.borderColor=C.border}/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required minLength={8} style={inputStyle} onFocus={e=>e.target.style.borderColor=C.accent+"66"} onBlur={e=>e.target.style.borderColor=C.border}/>
            {error&&<div style={{fontSize:12,color:C.error,background:"rgba(255,106,158,0.08)",border:"1px solid rgba(255,106,158,0.2)",borderRadius:8,padding:"8px 12px",fontFamily:"'DM Sans',sans-serif"}}>{error}</div>}
            {success&&<div style={{fontSize:12,color:"#6AFFD4",background:"rgba(106,255,212,0.08)",border:"1px solid rgba(106,255,212,0.2)",borderRadius:8,padding:"8px 12px",fontFamily:"'DM Sans',sans-serif"}}>{success}</div>}
            <button type="submit" disabled={loading} style={{padding:"12px",borderRadius:10,marginTop:4,background:loading?"#2a2a3d":`linear-gradient(135deg,${C.accent},#FF9F1C)`,border:"none",color:loading?C.muted:"#080810",fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:800,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:loading?"none":`0 4px 20px ${C.accentGlow}`}}>
              {loading?<><div style={{width:14,height:14,border:"2px solid rgba(0,0,0,0.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>{mode==="signin"?"Signing in...":"Creating account..."}</>:mode==="signin"?"Sign in →":"Create free account →"}
            </button>
          </form>

          <div style={{textAlign:"center",marginTop:20,fontSize:13,color:C.muted,fontFamily:"'DM Sans',sans-serif"}}>
            {mode==="signin"?<>Don&apos;t have an account?{" "}<button onClick={()=>{setMode("signup");setError("");setSuccess("");}} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Sign up free</button></>:<>Already have an account?{" "}<button onClick={()=>{setMode("signin");setError("");setSuccess("");}} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Sign in</button></>}
          </div>
        </div>
      </div>
    </>
  );
}