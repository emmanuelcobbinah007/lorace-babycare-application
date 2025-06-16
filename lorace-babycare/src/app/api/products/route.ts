import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/app/libs/prisma';

// retrieving all products with their respective product images
export async function GET(request: NextRequest) {
    try {
        // Get query parameters from the URL
        const { searchParams } = new URL(request.url);
        const subCategoryId = searchParams.get('subCategoryId');
        const categoryId = searchParams.get('categoryId');

        // Build the where clause based on available parameters
        const whereClause: any = {};
        
        if (subCategoryId) {
            whereClause.subCategoryId = subCategoryId;
        } else if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        const products = await prisma.product.findMany({
            where: whereClause,
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
    const requestData = await request.json();
    
    // Log the incoming data to debug
    // console.log("Received request data:", requestData);
      const {
        name,
        descriptionShort,
        descriptionLong,
        price,
        stock,
        subCategoryId,
        sizingType,
        isHidden,
        categoryId,
        salePercent,
    } = requestData;

    // Log the destructured values to debug
    // console.log("Destructured values:", {
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
    // });
    // 
        try {        // Check if the product already exists
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: name,
            },
        });

        if (existingProduct) {
            return NextResponse.json({
                message: "Product already exists",
                existingProduct
            }, {
                status: 400,
            });        }

        const product = await prisma.product.create({
            data: {
                name,
                descriptionShort,
                descriptionLong,
                price,
                stock,
                isHidden,
                sizingType,
                categoryId,
                subCategoryId,
                salePercent,
            }
        });

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