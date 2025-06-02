"use client";

import React from 'react'
import { Patrick_Hand } from "next/font/google";
import { useParams } from 'next/navigation'
import { useCategory } from '../../hooks/useCategories'
import { useProductsByCategory } from '../../hooks/useProducts'
import Products from '../../components/ui/product/Products'

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const page = () => {
  const params = useParams()
  const categoryId = params.id as string
  
  // Fetch the specific category by ID
  const { data: category, isLoading: categoryLoading } = useCategory(categoryId)
  // Fetch products for this category
  const { data: products = [], isLoading: productsLoading } = useProductsByCategory(categoryId)
  
  if (categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b970a0] mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="py-[30px] md:py-[40px] bg-white"></div>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        {/* Category Header */}
        <div className="mb-10">
          <h1 className={`md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5] drop-shadow-lg tracking-tight`}>
            {category?.name || 'Category'}
          </h1>
        </div>
        
        {/* Products Grid */}
        <Products products={products} isLoading={productsLoading} />
      </div>
    </div>
    </>
  )
}

export default page