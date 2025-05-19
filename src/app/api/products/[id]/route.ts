import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function DELETE (req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    await prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product images" }, { status: 500 });
  }

  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}