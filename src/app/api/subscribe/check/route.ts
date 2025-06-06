import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')
      
        if (!email) {
          return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        const existingSubscription = await prisma.emailList.findUnique({
            where: { email },
        });
          if (existingSubscription) {
            return NextResponse.json(
                { isSubscribed: true },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { isSubscribed: false },
            { status: 200 }
        )


    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}