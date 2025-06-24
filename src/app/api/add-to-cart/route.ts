import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { productId, quantity, cartId, size } = body;

        const savedCartItem = await prisma.cartItem.create({
            data: {
                cartId: cartId,
                productId: productId,
                quantity: quantity,
                size: size,
            }
        })

        return NextResponse.json({
            message: "Product added to cart successfully",
            cartItem: savedCartItem,
            status: 200,
        })

    } catch (error) {
        return NextResponse.json({
            message: error,
            status: 500,
        }, { status: 500 })
        
    }
}