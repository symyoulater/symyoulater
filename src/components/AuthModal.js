"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const C = { bg:"#080810",card:"#13131f",border:"rgba(255,255,255,0.07)",accent:"#FF6B35",accentSoft:"rgba(255,107,53,0.12)",accentGlow:"rgba(255,107,53,0.25)",white:"#F4F3FF",muted:"#6B6B8A",mutedLight:"#9898b8",error:"#FF6A9E" };

export default function AuthModal({ onClose }) {
  const [mode,setMode]=useState("signin");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

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
