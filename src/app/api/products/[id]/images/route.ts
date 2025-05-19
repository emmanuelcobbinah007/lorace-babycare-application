import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

// GET endpoint to fetch images for a specific product
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const productImages = await prisma.productImage.findMany({
      where: {
        productId: id,
      },
    });

    return NextResponse.json(productImages, { status: 200 });
  } catch (error) {
    console.error("Error fetching product images:", error);
    return NextResponse.json(
      { error: "Failed to fetch product images" },
      { status: 500 }
    );
  }
}