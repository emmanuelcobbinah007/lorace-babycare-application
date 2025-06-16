import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: NextRequest, context: any) {
    const { id } = context.params;

    try {
        if (!id) {
            return NextResponse.json({error: "Please attach an id"}, {status: 401})
        }

        const product = await prisma.product.findFirst({
            where: { id },
            include: {
                images: true,
                category: true,
                subCategory: true,
            }
        })

        return NextResponse.json({message: "Product retrieved successfully.", product}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Failed to get product"}, {status: 500})
    }
}

export async function PATCH(req: NextRequest, context: any) {
  const { id } = context.params;
  try {
    const requestData = await req.json();
    const { 
      isHidden, 
      name, 
      descriptionShort, 
      descriptionLong, 
      price, 
      stock,
      sizingType,
      categoryId,
      subCategoryId,
      salePercent
    } = requestData;

    // const {
    //     name,
    //     descriptionShort,
    //     descriptionLong,
    //     price,
    //     stock,
    //     subCategoryId,
    //     sizingType,
    //     isHidden,
    //     categoryId,
    //     salePercent,
    // } = requestData;

    const updateData: any = {};
    
    // Only include fields that are provided in the request
    if (isHidden !== undefined) updateData.isHidden = isHidden;
    if (name !== undefined) updateData.name = name;
    if (descriptionShort !== undefined) updateData.descriptionShort = descriptionShort;
    if (descriptionLong !== undefined) updateData.descriptionLong = descriptionLong;
    if (price !== undefined) updateData.price = Number(price);
    if (stock !== undefined) updateData.stock = Number(stock);
    if (sizingType !== undefined) updateData.sizingType = sizingType;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (subCategoryId !== undefined) updateData.subCategoryId = subCategoryId;
    if (salePercent !== undefined) updateData.salePercent = Number(salePercent);
    
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    // const updatedProduct = {
    //    isHidden, 
    //   productName, 
    //   productDescriptionShort, 
    //   productDescriptionLong, 
    //   productPrice, 
    //   productStock,
    //   sizingType,
    //   categoryID,
    //   subCategoryID,
    //   salePercent
    // }
    
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

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