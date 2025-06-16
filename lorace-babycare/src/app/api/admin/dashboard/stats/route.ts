import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    // Fetch all stats in parallel for better performance
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      totalCategories,
      totalSubCategories,
      totalEmailSubscribers,
      recentOrders,
    ] = await Promise.all([
      // Count total products
      prisma.product.count(),
      
      // Count total orders
      prisma.order.count(),
      
      // Count total users
      prisma.user.count(),
      
      // Count total categories
      prisma.category.count(),
      
      // Count total subcategories
      prisma.subCategory.count(),
      
      // Count total email subscribers
      prisma.emailList.count(),
      
      // Get recent orders with related data
      prisma.order.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true
            }
          },
          orderItems: {
            include: {
              product: {
                select: {
                  price: true
                }
              }
            }
          }
        }
      })
    ]);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalCategories,
      totalSubCategories,
      totalEmailSubscribers,
      recentOrders,
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}