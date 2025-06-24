import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(request: NextRequest, context: any) {
  try {
    const { id } = context.params;
    
    if (!id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    // Fetch all products that belong to the specified category
    const products = await prisma.product.findMany({
      where: {
        categoryId: id,
        isHidden: false, // Only fetch visible products
      },
      include: {        category: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            categoryId: true,
            createdAt: true,
            isHidden: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            productId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return NextResponse.json(
      {
        message: "Server Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
