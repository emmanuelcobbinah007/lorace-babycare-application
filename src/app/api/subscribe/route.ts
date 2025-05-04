import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request: NextRequest) {
    const { email, id } = await request.json();
    try {
        // Check if the email is already subscribed
        const existingSubscription = await prisma.emailList.findUnique({
            where: { email },
        });

        if (existingSubscription) {
            return NextResponse.json(
                { message: "Already subscribed" },
                { status: 400 }
            );
        }

        // Create a new subscription
        const newSubscription = await prisma.emailList.create({
            data: { 
                email,
                userId: id || null, // Use the provided user ID or null if not available
               },
        });

        // TODO: Send an email to the new subscriber

        return NextResponse.json(
            { message: "Subscribed successfully", subscription: newSubscription },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}