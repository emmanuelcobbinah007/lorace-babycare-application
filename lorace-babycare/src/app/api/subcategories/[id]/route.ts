import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prisma";

// To handle fetching a single subcategory
export async function GET(request: NextRequest, context: any) {
  try {
    const {id} = context.params;
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!subCategory) {
      return NextResponse.json(
        {message: "Subcategory not found."},
        {status: 404}
      );
    }

    return NextResponse.json(subCategory, {status: 200});
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

// to handle updating a category
export async function PUT(req: NextRequest,  context: any) {
    const { id } = context.params;

    try {
        const body = await req.json();
        const { name, categoryId } = body;

        const subCategory = await prisma.subCategory.update({
            where: {
                id: String(id),
            },
            data: {
                name: name,
                categoryId: categoryId,
            },
        });

        return NextResponse.json({
            message: "Subcategory updated successfully!",
            subCategory,
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
    }
}

// to handle visibility
export async function PATCH(req: NextRequest, context: any) {
    const { id } = context.params;

    try {
        const body = await req.json();
        const { hiddenContent } = body;

        const subCategory = await prisma.subCategory.update({
            where: {
                id: String(id),
            },
            data: {
                isHidden: hiddenContent,
            },
        });

        return NextResponse.json({
            message: `Category visibility updated to ${hiddenContent ? "hidden" : "visible"}!`,
            subCategory,
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
    }
}

// to handle deletion
export async function DELETE(req: NextRequest,  context: any) {
    const { id } = context.params;

    try {
        const subCategory = await prisma.subCategory.delete({
            where: {
                id: String(id),
            },
        });

        return NextResponse.json({
            message: "SubCategory deleted successfully!",
            subCategory,
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
    }
}