import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import prisma from "../../../libs/prisma";
import generateToken from "@/app/utils/generateToken";

import { sendVerificationEmail } from "@/app/utils/sendEmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, phone, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    //TODO: we will be abstracting this process to an entire seperate process
    //const verificationToken = generateToken(32);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
        password: hashedPassword,
        role: "USER",
        emailIsVerified: false,
        emailVerificationToken: "",
        phoneIsVerified: false,
        phoneVerificationToken: "",
      },
    });

    // await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
