"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { FadeLoader } from "react-spinners";
import { Package, ShoppingCart, Users, DollarSign, Clock } from 'lucide-react';
import Link from "next/link";
import { 
  ShoppingBag, 
  AlertTriangle,
  Mail,
  LucideIcon
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalCategories: number;
  totalSubCategories: number;
  totalEmailSubscribers: number;
  recentOrders: Array<{
    id: string;
    createdAt: string;
    isCompleted: boolean;
    user: {
      firstname: string;
      lastname: string;
    };
    orderItems: Array<{
      quantity: number;
      product: {
        price: number;
      };
    }>;
  }>;
}

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const stats = {
  totalRevenue: 125000.75,
  totalOrders: 1567,
  totalCustomers: 890,
  productsInStock: 2500,
  pendingOrders: 45,
  newCustomersToday: 12,
  recentOrders: [
    {
      id: 'ord_abcdef123456',
      user: { firstname: 'Alice', lastname: 'Smith' },
      orderItems: [
        { quantity: 1, product: { price: 25.00 } },
        { quantity: 2, product: { price: 10.50 } },
      ],
      isCompleted: false,
      createdAt: '2025-05-26T10:00:00Z',
    },
    {
      id: 'ord_ghijkl678901',
      user: { firstname: 'Bob', lastname: 'Johnson' },
      orderItems: [
        { quantity: 1, product: { price: 50.00 } },
      ],
      isCompleted: true,
      createdAt: '2025-05-25T14:30:00Z',
    },
    {
      id: 'ord_mnopqrs23456',
      user: { firstname: 'Charlie', lastname: 'Brown' },
      orderItems: [
        { quantity: 3, product: { price: 5.00 } },
        { quantity: 1, product: { price: 15.00 } },
      ],
      isCompleted: false,
      createdAt: '2025-05-26T08:15:00Z',
    },
    {
      id: 'ord_tuvwxyz78901',
      user: { firstname: 'Diana', lastname: 'Prince' },
      orderItems: [
        { quantity: 1, product: { price: 120.00 } },
      ],
      isCompleted: true,
      createdAt: '2025-05-24T18:00:00Z',
    },
    {
      id: 'ord_abcedfg12345',
      user: { firstname: 'Eve', lastname: 'Adams' },
      orderItems: [
        { quantity: 2, product: { price: 30.00 } },
        { quantity: 1, product: { price: 8.00 } },
      ],
      isCompleted: false,
      createdAt: '2025-05-25T09:45:00Z',
    },
  ],
  topSellingProducts: [
    { id: 'prod_1', name: 'Organic Cotton Bodysuit', salesCount: 500, stock: 150 },
    { id: 'prod_2', name: 'Bamboo Swaddle Blanket', salesCount: 350, stock: 200 },
    { id: 'prod_3', name: 'Hypoallergenic Baby Wipes (Pack of 6)', salesCount: 280, stock: 100 },
  ],
  lowStockProducts: [
    { id: 'prod_4', name: 'Ergonomic Baby Carrier', stock: 10 },
    { id: 'prod_5', name: 'Smart Baby Monitor', stock: 5 },
  ],
  emailListSubscribers: 1234,
};



const Page = () => {
  // const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${NEXT_PUBLIC_BASE_URL}/api/admin/dashboard/stats`
  //       );
  //       setStats(response.data);
  //     } catch (error) {
  //       console.error("Error fetching dashboard stats:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStats();
  // }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[calc(100vh-80px)] items-center justify-center">
          <FadeLoader color="#4fb3e5" />
        </div>
      </AdminLayout>
    );
  }

  interface DashboardCard {
    title: string;
    value: number;
    format: (value: number) => string;
    icon: LucideIcon;
    link: string;
    colorClass: 'blue' | 'pink';
  }

  const dashboardCards: DashboardCard[] = [
    {
      title: 'Total Orders',
      value: 156,
      format: (val: number) => val.toString(),
      icon: ShoppingBag,
      link: '/admin/orders',
      colorClass: 'blue'
    },
    {
      title: 'Total Revenue',
      value: 24650,
      format: (val: number) => `$${val.toLocaleString()}`,
      icon: DollarSign,
      link: '/admin/revenue',
      colorClass: 'pink'
    },
    {
      title: 'Total Customers',
      value: 89,
      format: (val: number) => val.toString(),
      icon: Users,
      link: '/admin/customers',
      colorClass: 'blue'
    },
    {
      title: 'Products',
      value: 45,
      format: (val: number) => val.toString(),
      icon: Package,
      link: '/admin/products',
      colorClass: 'pink'
    },
    {
      title: 'Low Stock',
      value: 3,
      format: (val: number) => val.toString(),
      icon: AlertTriangle,
      link: '/admin/products/low-stock',
      colorClass: 'blue'
    },
    {
      title: 'Subscribers',
      value: 234,
      format: (val: number) => val.toString(),
      icon: Mail,
      link: '/admin/subscribers',
      colorClass: 'pink'
    }
  ];


  return (
    <AdminLayout>
      <div className='flex'>
        <div className='hidden md:block w-[22.5%] bg-amber-950'></div>
        <div className="mb-4 mx-auto w-[90%]">
          <div className="min-h-screen bg-gradient-to-br from-[#f8fcfe] to-white px-4 md:px-6 py-6 md:py-8">
      {/* Header Section */}
      <div className="md:flex items-center gap-4 mb-8">
        <h1 className="md:text-4xl md:font-extrabold tracking-tight  text-gray-800 pl-10 md:pl-0 text-xl font-bold">
          Lorace Babycare Dashboard
        </h1>
        <div className="hidden md:block h-8 w-[2px] bg-[#e0e0e0]" />
        <p className="text-sm md:text-base text-gray-500 pl-4 md:pl-0 mt-2 md:mt-0">
          Welcome back! Here's your store overview.
        </p>
      </div>

      
    </div>
        </div>
      </div>
      
    </AdminLayout>
  );
};

export default Page;
