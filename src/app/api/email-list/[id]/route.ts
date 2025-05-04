import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/app/libs/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const email = await prisma.emailList.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(email, { status: 200 });
  } catch (error) {
    console.error('Error deleting email:', error);
    return NextResponse.json({ error: 'Failed to delete email' }, { status: 500 });
  }
}