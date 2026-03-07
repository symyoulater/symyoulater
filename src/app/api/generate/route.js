import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const FREE_LIMIT = 3; // Free users can generate 3 times per day

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: { message: "ANTHROPIC_API_KEY not set" } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const tool = req.headers.get("x-tool") || "unknown";

  // Server supabase client (reads session from cookies)
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const freeUsed = req.headers.get("x-free-used") === "true";
    if (freeUsed) {
      return new Response(
        JSON.stringify({ error: { message: "AUTH_REQUIRED", code: 401 } }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } else {
    // Admin client (bypasses RLS)
    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: profile } = await admin
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const plan = profile?.plan || "free";

    if (plan === "free") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count } = await admin
        .from("usage")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        

      if ((count || 0) >= FREE_LIMIT) {
        return new Response(
          JSON.stringify({ error: { message: "LIMIT_REACHED", code: 429 } }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    await admin.from("usage").insert({ user_id: user.id, tool });
  }

  const body = await req.json();
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
