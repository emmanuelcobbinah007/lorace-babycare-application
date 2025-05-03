import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { verifyToken } from "../../../utils/jwt";

export type JwtPayload = {
    id: string;
    email: string;
  };

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      
          // Verify the token
          const decoded = verifyToken(token) as JwtPayload;
      
          if (!decoded)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

          // Find the user
    const user = await prisma.user.findFirst({
        where: { id: decoded.id }, // Assuming your token stores user ID
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          role: true,
          emailIsVerified: true,
          emailVerificationToken: true,
          phoneIsVerified: true,
          phoneVerificationToken: true,
          createdAt: true,
          cart: true,
          orders: true,
        },
      });

      if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
  
      return NextResponse.json({ user });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
