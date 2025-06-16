import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { verifyToken } from "@/app/utils/jwt";

export async function PATCH(req: NextRequest, context: any) {
    try {
        const { itemId } = await context.params;
        
        if (!itemId) {
            return NextResponse.json(
                { message: "Cart item ID is required" },
                { status: 400 }
            );
        }

        // Get the token from cookies
        const token = req.cookies.get("token")?.value;
        
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify the token and get user info
        const decoded = verifyToken(token);
        if (!decoded || decoded instanceof Error || typeof decoded !== 'object' || !('id' in decoded)) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { quantity } = body;

        if (!quantity || quantity <= 0) {
            return NextResponse.json(
                { message: "Valid quantity is required" },
                { status: 400 }
            );
        }

        // Find the cart item and verify ownership
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                id: itemId
            },
            include: {
                cart: true,
                product: {
                    include: {
                        images: true
                    }
                }
            }
        });

        if (!cartItem) {
            return NextResponse.json(
                { message: "Cart item not found" },
                { status: 404 }
            );
        }

        // Verify that the cart belongs to the authenticated user
        if (cartItem.cart.userId !== decoded.id) {
            return NextResponse.json(
                { message: "Unauthorized access to cart item" },
                { status: 403 }
            );
        }

        // Update the cart item quantity
        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: itemId
            },
            data: {
                quantity: parseInt(quantity)
            },
            include: {
                product: {
                    include: {
                        images: true
                    }
                }
            }
        });

        return NextResponse.json(updatedCartItem);

    } catch (error) {
        console.error("Error updating cart item:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, context: any) {
    try {
        const { itemId } = await context.params;
        
        if (!itemId) {
            return NextResponse.json(
                { message: "Cart item ID is required" },
                { status: 400 }
            );
        }

        // Get the token from cookies
        const token = req.cookies.get("token")?.value;
        
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify the token and get user info
        const decoded = verifyToken(token);
        if (!decoded || decoded instanceof Error || typeof decoded !== 'object' || !('id' in decoded)) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        // Find the cart item and verify ownership
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                id: itemId
            },
            include: {
                cart: true
            }
        });

        if (!cartItem) {
            return NextResponse.json(
                { message: "Cart item not found" },
                { status: 404 }
            );
        }

        // Verify that the cart belongs to the authenticated user
        if (cartItem.cart.userId !== decoded.id) {
            return NextResponse.json(
                { message: "Unauthorized access to cart item" },
                { status: 403 }
            );
        }

        // Delete the cart item
        await prisma.cartItem.delete({
            where: {
                id: itemId
            }
        });

        return NextResponse.json(
            { message: "Cart item removed successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error removing cart item:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
