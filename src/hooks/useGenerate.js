"use client";
import { useState, useCallback, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

const FREE_KEY = "sym_free_used";

export function useGenerate(toolName = "unknown") {
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [user, setUser] = useState(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const generate = useCallback(async (body) => {
    const isAuthed = !!user;
    const freeCount = typeof window !== "undefined"
      ? parseInt(localStorage.getItem(FREE_KEY) || "0") : 0;
    const alreadyUsedFree = freeCount >= 3;

    // Client-side gate: not logged in and used all 3 free generations
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

    // Both 401 and 429 mean "needs to sign in" — show the modal
    if (res.status === 401 || res.status === 429) {
      setRequiresAuth(true);
      return null;
    }

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.error?.message || "Generation failed.");
    }

    const data = await res.json();
    // Increment free counter after successful generation
    if (!isAuthed) {
      localStorage.setItem(FREE_KEY, String(freeCount + 1));
    }
    return data;
  }, [user, toolName]);

  return { generate, requiresAuth, setRequiresAuth, user };
}