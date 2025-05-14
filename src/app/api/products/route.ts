import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/app/libs/prisma';

// retrieving all products with their respective product images
export async function GET(request: NextRequest) {
    try {
        const products = await prisma.product.findMany({
            include: {
                images: true,
                category: true,
                subCategory: true,
            },
        });

        return NextResponse.json(products, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            error: error,
            message: "Server Error",
        }, {
            status: 500,
        });
    }
}

// saving product details
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
        
        // Check if the product already exists
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: productName,
            },
        });

        if (existingProduct) {
            return NextResponse.json({
                message: "Product already exists",
            }, {
                status: 400,
            });
        }

        const product = await prisma.product.create({
            data: {
                name: productName,
                descriptionShort: productDescriptionShort,
                descriptionLong: productDescriptionLong,
                price: productPrice,
                stock: productStock,
                isHidden,
                sizingType, // maybe here, string but an enum in the db
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