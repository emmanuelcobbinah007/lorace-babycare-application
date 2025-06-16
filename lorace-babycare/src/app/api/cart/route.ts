import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { verifyToken } from "../../utils/jwt";

export type JwtPayload = {
    id: string;
    email: string;
};

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Verify the token
        const decoded = verifyToken(token) as JwtPayload;

        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }        // Find the user's cart with items
        const cart = await prisma.cart.findFirst({
            where: { userId: decoded.id },
            include: {
                cartItems: {
                    include: {
                        product: {
                            include: {
                                images: true,
                            }
                        },
                    },
                },
            },
        });

        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }

        return NextResponse.json(cart);

    } catch (error) {
        console.error("Failed to fetch cart:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

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
