import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only apply middleware to /admin and all its subroutes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Verify token by calling your API using axios
    return axios
      .get(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/me`, {
        headers: { Cookie: `token=${token}` },
      })
      .then((response) => {
        const data = response.data;

        if (data.user?.role !== "ADMIN") {
          console.log("User is not an admin, redirecting...");
          return NextResponse.redirect(new URL("/not-authorized", req.url));
        }
        console.log("User is an admin, allowing access...");
        return NextResponse.next();
      })
      .catch(() => NextResponse.redirect(new URL("/", req.url))); // Redirect on error
  }
}

// Apply middleware only to admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
