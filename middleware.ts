import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/signup")) {
    if (session) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/signin")) {
    if (session) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  }

  if (!session) {
    return NextResponse.rewrite(new URL("/signin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/signup", "/signin"],
};
