import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await admin.from("waitlist").insert({ email });

  if (error && error.code === "23505") {
    return new Response(JSON.stringify({ error: "Already subscribed" }), { status: 409 });
  }

  if (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
