import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import prisma from "../../../libs/prisma";
import { serialize } from "cookie";
import { generateAccessToken } from "@/app/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user)
      return NextResponse.json(
        { error: "This user does not exist" },
        { status: 404 }
      );

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 200 }
      );

    // Generate JWT token
    const accessToken = generateAccessToken(user);

    // Set cookie
    const cookie = serialize("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    const response = NextResponse.json({ 
        message: "Login successful",
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          emailIsVerified: user.emailIsVerified,
          phoneIsVerified: user.phoneIsVerified,
        }
      });

      response.headers.set("Set-Cookie", cookie);

    return response;


  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
