import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';

export async function POST(req: NextRequest) {
    try {
        const { userID }: { userID: string } = await req.json();

        const cart = await prisma.cart.create({
            data: {
                userId: userID,
            },
        })
    
        return NextResponse.json({
            message: 'Cart created successfully',
            cart: cart,
            status: 200,
        })
    } catch (error) {
        console.error("Failed to create cart:", error);

        return NextResponse.json({
            error: 'Internal Server Error',
            status: 500,
        })
    }
}