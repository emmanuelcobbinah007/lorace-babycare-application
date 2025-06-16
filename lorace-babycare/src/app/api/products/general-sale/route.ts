import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(req: NextRequest) {
  const { salePercent } = await req.json();

  try {
    await prisma.product.updateMany({
      data: {
        salePercent: salePercent,
      },
    });

    return NextResponse.json(
      {
        message: "General Sale Applied Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
