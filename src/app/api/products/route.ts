import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/app/libs/prisma';

export async function POST(request: NextRequest) {
    const {
        productName,
        productDescriptionShort,
        productDescriptionLong,
        productPrice,
        productStock,
        subCategoryID,
        sizingType,
        isHidden,
        categoryID,
        salePercent,
    } = await request.json();

    try {
        const product = await prisma.product.create({
            data: {
                name: productName,
                descriptionShort: productDescriptionShort,
                descriptionLong: productDescriptionLong,
                price: productPrice,
                stock: productStock,
                isHidden,
                sizingType,
                categoryId: categoryID,
                subCategoryId: subCategoryID,
                salePercent,
            }
        })

        return NextResponse.json({
            message: "Product created successfully",
            product,
        }, {
            status: 201,
        })

        
    } catch (error) {
        return NextResponse.json({
            error: error,
            message: "Server Error",
        },
    {
        status: 500,
    })
    }
}