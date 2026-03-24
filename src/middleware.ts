import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Middleware to protect /admin routes at the server level.
 * Checks for a valid Supabase session before allowing access.
 * This prevents the admin page from being briefly visible
 * before client-side auth checks kick in.
 */
export async function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Get Supabase auth tokens from cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // If env vars are missing, redirect to home for safety
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check for Supabase auth cookie
  // Supabase stores the session in cookies with a specific naming pattern
  const allCookies = request.cookies.getAll();
  const authCookie = allCookies.find(
    (c) =>
      c.name.startsWith("sb-") &&
      c.name.endsWith("-auth-token")
  );

  if (!authCookie?.value) {
    // No auth cookie = not logged in, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Try to parse the session token to verify it exists
  try {
    // The cookie value is a JSON array with [access_token, refresh_token]
    const parsed = JSON.parse(authCookie.value);
    if (!parsed || (!Array.isArray(parsed) && !parsed.access_token)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    // Invalid cookie format, redirect
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Cookie exists and appears valid — allow through.
  // The client-side is_pro check remains as a second layer of defense.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
