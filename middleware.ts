// import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Temporarily disabled auth middleware to allow viewing marketing site without database
// Will be re-enabled once Prisma is configured with a database

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // For now, allow all routes
  // Protected routes will redirect to a "coming soon" message for /portal
  if (pathname.startsWith("/portal")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
