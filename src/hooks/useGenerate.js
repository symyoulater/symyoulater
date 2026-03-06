"use client";
import { useState, useCallback, useEffect } from "react";
import { createClient } from "../lib/supabase/client";

const FREE_KEY = "sym_free_used";

export function useGenerate(toolName = "unknown") {
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const generate = useCallback(async (body) => {
    const isAuthed = !!user;
    const alreadyUsedFree = typeof window !== "undefined"
      ? localStorage.getItem(FREE_KEY) === "true" : false;

    if (!isAuthed && alreadyUsedFree) {
      setRequiresAuth(true);
      return null;
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tool": toolName,
        "x-free-used": alreadyUsedFree ? "true" : "false",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 401) { setRequiresAuth(true); return null; }
    if (res.status === 429) throw new Error("LIMIT_REACHED");
    if (!res.ok) { const err = await res.json(); throw new Error(err?.error?.message || "Generation failed."); }

    const data = await res.json();
    if (!isAuthed) localStorage.setItem(FREE_KEY, "true");
    return data;
  }, [user, toolName]);

  return { generate, requiresAuth, setRequiresAuth, user };
}
