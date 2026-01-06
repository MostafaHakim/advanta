import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

// Public routes that don't require authentication
const publicRoutes = [
  "/admin/login",
  "/admin/register",
  "/api/admin/login",
  "/api/admin/register",
  "/api/admin/verify",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let public routes pass
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
      }
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
