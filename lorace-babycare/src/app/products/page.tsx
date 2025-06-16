"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Patrick_Hand } from "next/font/google";
import { SearchNormal } from "iconsax-reactjs";

import { FadeLoader } from "react-spinners";

import Products from "@/app/components/ui/products/Products";
import { useProducts } from "@/app/hooks/useProducts";
import { Product } from "@/app/api/products/productApi";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use React Query to fetch products
  const { data: products = [], isLoading: loading, error } = useProducts();

  // Filter products to show only visible ones and apply search
  const filteredProducts = useMemo(() => {
    const visibleProducts = products.filter(
      (product: Product) => !product.isHidden
    );

    if (!searchTerm) return visibleProducts;

    return visibleProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.subCategory.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex h-[75vh] justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading products</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#b970a0] text-white px-4 py-2 rounded-lg hover:bg-[#a55f91]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  //TODO: add a search button in staging areas
  return (
    <div>
      <div className="py-[30px] md:py-[40px] bg-white"></div>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 md:w-[85%] mx-auto py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6 md:gap-0">
          <h1
            className={`md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5] drop-shadow-lg tracking-tight`}
          >
            All Products
          </h1>
          {/* Search Bar */}{" "}
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

        {loading ? (
          <div className="h-[65vh] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b970a0] mx-auto"></div>
              </div>
            </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <Products
            products={filteredProducts}
            setFilteredProducts={() => {}} // Not needed anymore since we handle filtering with useMemo
          />
        )}
      </div>
    </div>
  );
};

export default page;
