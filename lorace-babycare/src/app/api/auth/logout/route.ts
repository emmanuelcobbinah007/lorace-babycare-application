import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  const response = NextResponse.json({ message: "Logged out" });
  response.headers.set("Set-Cookie", cookie);
  return response;
}
