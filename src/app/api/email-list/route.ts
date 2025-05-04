import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    const emailList = await prisma.emailList.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(emailList, { status: 200 });
  } catch (error) {
    console.error("Error fetching email list:", error);
    return NextResponse.json({ error: "Failed to fetch email list" }, { status: 500 });
  }
}