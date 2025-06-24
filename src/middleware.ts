import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only apply middleware to /admin and all its subroutes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      // Verify token by calling your API using axios
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
        headers: { 
          Cookie: `token=${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.user?.role !== "ADMIN") {
        console.log("User is not an admin, redirecting...");
        return NextResponse.redirect(new URL("/not-authorized", req.url));
      }
      
      console.log("User is an admin, allowing access...");
      return NextResponse.next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

// Apply middleware only to admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
