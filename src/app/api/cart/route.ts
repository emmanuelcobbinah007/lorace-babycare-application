import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const cart = body.cartDetails;

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: String(cart.id)
            }, 
            include: {product: true,},
        })

        return NextResponse.json({
            message: "Cart Items retrieved successfully!",
            cartItems: cartItems,
        })

    } catch (error) {
        return NextResponse.json({
            message: "Errorrrrr",
        })
    }
}
