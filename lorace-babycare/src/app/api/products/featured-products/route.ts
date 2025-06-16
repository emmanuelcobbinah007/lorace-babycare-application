import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const featuredProducts = await prisma.featuredProduct.findMany({
      include: {
        product: {
          include: {
            images: true,
            category: true,
            subCategory: true,
          },
        },
      },
    });

    return NextResponse.json(featuredProducts, {status: 200});

  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { productId } = body;

        if (!productId) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        // Check current count of featured products
        const count = await prisma.featuredProduct.count();
        if (count >= 4) {
            return NextResponse.json(
                { message: "Maximum of 4 featured products allowed" },
                { status: 400 }
            );
        }

        const featuredProduct = await prisma.featuredProduct.create({
            data: {
                productId,
            },
            include: {
                product: {
                    include: {
                        images: true,
                    },
                },
            },
        });

        return NextResponse.json(featuredProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Server Error", error },
            { status: 500 }
        );
    }
}
