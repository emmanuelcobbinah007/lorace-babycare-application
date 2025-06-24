import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function DELETE(req: NextRequest, context: any) {
  const { productId } = context.params;

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedFeatured = await prisma.featuredProduct.delete({
      where: { productId },
    });
    return NextResponse.json(
      { message: "Product deleted", product: deletedFeatured },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Product not found or could not be deleted" },
      { status: 404 }
    );
  }
}
