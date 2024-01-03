import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/database.types";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!password || !email) {
    return new Response(
      JSON.stringify({
        message: "Sign-in failed",
        error: "Please fill in all fields",
      }),
      { status: 500 }
    );
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(
      JSON.stringify({ message: "Sign-in failed", error, data }),
      { status: 500 }
    );
  }

  const requestUrl = new URL(request.url);
  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
