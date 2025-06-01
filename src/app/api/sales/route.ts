import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const sales = await prisma.product.findMany({
      where: {
        salePercent: {
          gt: 0, // Fetch products that are on sale
        },
      },
      include: {
        images: true,
        category: true,
        subCategory: true,
      },
    });
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
        error: error,
      },
      { status: 500 }
    );
  }
}