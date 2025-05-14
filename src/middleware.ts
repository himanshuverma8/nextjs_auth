import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";
  
  const token =
    request.cookies.get("token")?.value || // Your custom JWT token
    request.cookies.get("next-auth.session-token")?.value || // For HTTP
    request.cookies.get("__Secure-next-auth.session-token")?.value || ""; // For HTTPS

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
