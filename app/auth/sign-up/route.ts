import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/database.types";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const password2 = String(formData.get("password2"));

  if (!password || !password2 || !email) {
    return new Response(
      JSON.stringify({
        message: "Sign-up failed",
        error: "Please fill in all fields",
      }),
      { status: 500 }
    );
  }

  if (password.length < 8) {
    return new Response(
      JSON.stringify({
        message: "Sign-up failed",
        error: "Password must be at least 8 characters",
      }),
      { status: 500 }
    );
  }

  if (password !== password2) {
    return new Response(
      JSON.stringify({
        message: "Sign-up failed",
        error: "Passwords do not match",
      }),
      { status: 500 }
    );
  }

  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return new Response(
      JSON.stringify({ message: "Sign-up failed", error, data }),
      { status: 500 }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/signin`, {
    status: 301,
  });
}
