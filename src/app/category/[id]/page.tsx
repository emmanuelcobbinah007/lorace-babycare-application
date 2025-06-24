"use client";

import React, { useState } from "react";
import { Patrick_Hand } from "next/font/google";
import { useParams } from "next/navigation";
import { useCategory } from "../../hooks/useCategories";
import { useProductsByCategory } from "../../hooks/useProducts";
import Products from "../../components/ui/products/Products";
import { SearchNormal } from "iconsax-reactjs";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const params = useParams();
  const categoryId = params.id as string;

  // Fetch the specific category by ID
  const { data: category, isLoading: categoryLoading } =
    useCategory(categoryId);
  // Fetch products for this category
  const { data: products = [], isLoading: productsLoading } =
    useProductsByCategory(categoryId);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.descriptionShort.toLowerCase().includes(searchLower) ||
      product.descriptionLong.toLowerCase().includes(searchLower) ||
      (product.category && product.category.name.toLowerCase().includes(searchLower)) ||
      (product.subCategory && product.subCategory.name.toLowerCase().includes(searchLower))
    );
  });

  if (categoryLoading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
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
        <div className="w-[90%] md:w-[80%] mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-4">
            <button
              onClick={() => window.location.href = '/'}
              className="hover:text-[#b970a0] transition-colors duration-200 flex items-center"
              type="button"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Home
            </button>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-700">
              {category?.name || "Category"}
            </span>
          </nav>
        </div>
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 md:w-[85%] mx-auto">
          {" "}
          {/* Category Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6 md:gap-0">
            <h1
              className={`md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5] drop-shadow-lg tracking-tight`}
            >
              {category?.name || "Category"}
            </h1>
            <div className="relative w-full md:w-[40%] flex items-center">
              <input
              type="text"
              placeholder="Search products, categories, or subcategories..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 text-base border-2 border-[#b970a0] rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] transition bg-white/80 backdrop-blur placeholder:text-[#b970a0] text-[#4fb3e5] font-semibold"
              />
              <SearchNormal
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b970a0]"
              size={24}
              />
            </div>
          </div>
          
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredProducts.length === 0 
                  ? `No products found for "${searchTerm}"`
                  : `Found ${filteredProducts.length} product(s) for "${searchTerm}"`
                }
              </p>
            </div>
          )}

          {/* Products Grid */}
            <Products products={filteredProducts} />
        </div>
      </div>
    </>
  );
};

export default page;