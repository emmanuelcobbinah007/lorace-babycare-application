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

// POST endpoint to create images for a specific product
export async function POST(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const body = await req.json();
    // Expecting body to be an array of image URLs or objects
    const images = Array.isArray(body) ? body : [body];

    const createdImages = await prisma.productImage.createMany({
      data: images.map((img: any) => ({
        productId: id,
        url: img.url || img,
      })),
    });    return NextResponse.json({ 
      message: "Images created successfully",
      count: createdImages.count 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating product images:", error);
    return NextResponse.json(
      { error: "Failed to create product images" },
      { status: 500 }
    );
  }
}