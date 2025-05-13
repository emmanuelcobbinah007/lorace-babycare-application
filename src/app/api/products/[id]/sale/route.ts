import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request: NextRequest) {
  const { product, salePercent } = await request.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        salePercent,
        name: product.name,
        descriptionShort: product.descriptionShort,
        descriptionLong: product.descriptionLong,
        price: product.price,
        stock: product.stock,
        sizingType: product.sizingType,
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
      },
    });

    return NextResponse.json(product, {
      status: 200,
    });
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