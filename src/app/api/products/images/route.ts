import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request: NextRequest) {
const { id, imageList } = await request.json();



  try {
    if (!id) {
      return NextResponse.json(
        {
          message: "Product ID is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!imageList || !Array.isArray(imageList)) {
      return NextResponse.json(
        {
          message: "Invalid image list",
        },
        {
          status: 400,
        }
      );
    }

    for (const image of imageList) {
        await prisma.productImage.create({
            data: {
                url: image,
                productId: id ?? "",
            }
        })
    }

    return NextResponse.json(
        {
            message: "Image List Added Successfully",
            imageList,
        },
        {
            status: 201,
        }
    )

    // return NextResponse.json(
    //   {
    //     message: "Image list received from backend",
    //     imageList,
    //   },
    //   {
    //     status: 200,
    //   }
    // );

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
