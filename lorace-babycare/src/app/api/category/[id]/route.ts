import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    if (!id) {
      return NextResponse.json({ error: "Please attach an id" }, { status: 401 });
    }

    const category = await prisma.category.findFirst({
      where: { id },
      include: {
        subCategories: true,
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Category retrieved successfully.", category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to get category" }, { status: 500 });
  }
}