import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for security headers and route protection.
 *
 * Admin route protection is handled client-side by each admin page
 * via useAuth() hook (checking user session and is_pro flag).
 * Supabase JS v2 stores auth tokens in localStorage, not cookies,
 * so server-side middleware cannot reliably verify auth state.
 */
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
