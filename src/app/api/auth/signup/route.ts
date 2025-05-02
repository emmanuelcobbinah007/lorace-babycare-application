import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import prisma from "../../../libs/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstname, lastname, email, password } = body;


        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        // const existingUser = await prisma.user.findFirst({
        //     where: {
        //         email: email,
        //         },
        //         });


        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
            firstname,
            lastname,
            email,
            password: hashedPassword, 
            role: "USER", // Default role
        }});

        return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });       
    } catch (error) {
        console.error("Error in signup route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}