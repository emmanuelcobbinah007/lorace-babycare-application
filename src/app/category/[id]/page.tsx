"use client";

import React from 'react'
import { useParams } from 'next/navigation'
import { useCategory } from '../../hooks/useCategories'

const page = () => {
  const params = useParams()
  const categoryId = params.id as string
  
  // Fetch the specific category by ID
  const { data: category, isLoading } = useCategory(categoryId)
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b970a0] mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          {category?.name || 'Category'}
        </h1>
      </div>
    </div>
  )
}

export default page