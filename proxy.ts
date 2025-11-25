import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are protected
  const isProtectedPath = path.startsWith("/admin");
  const isLoginPath = path === "/login";

  if (isProtectedPath && !isLoginPath) {
    const cookie = request.cookies.get("admin_session")?.value;
    const session = cookie ? await decrypt(cookie) : null;

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  if (isLoginPath) {
    const cookie = request.cookies.get("admin_session")?.value;
    const session = cookie ? await decrypt(cookie) : null;

    if (session) {
      return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
