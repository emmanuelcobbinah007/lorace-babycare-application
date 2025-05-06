import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: {
      category: {
        select: {
        name: true,
        },
      },
      },
    });

    return NextResponse.json(subCategories, { status: 200 });
  } catch (error) {
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

export async function POST(request: NextRequest) {
  try {
    const { name, categoryId } = await request.json();

    if (!name || !categoryId) {
      return NextResponse.json(
        { message: "Name and categoryId are required." },
        { status: 400 }
      );
    }

    const existingSubCategory = await prisma.subCategory.findFirst({
      where: {
        name: name,
        categoryId: categoryId,
      },
    });

    if (existingSubCategory) {
      return NextResponse.json(
        { message: "Subcategory with the same name already exists in this category.", subCategory: existingSubCategory },
        { status: 409 }
      );
    }

    const subCategory = await prisma.subCategory.create({
      data: {
        name,
        categoryId,
        isHidden: false,
      },
    });

    return NextResponse.json(subCategory, { status: 201 });
  } catch (error) {
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
