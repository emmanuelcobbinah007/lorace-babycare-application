"use client";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { Patrick_Hand } from "next/font/google";
import { SearchNormal } from "iconsax-reactjs";

import { FadeLoader } from "react-spinners";

import Products from "@/app/components/ui/products/Products";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface Product {
  id: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  stock: number;
  isHidden: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    isHidden: boolean;
  };
  subCategoryId: string;
  subCategory: {
    id: string;
    name: string;
    categoryId: string;
    createdAt: string;
    isHidden: boolean;
  };
  images: {
    id: string;
    url: string;
    productId: string;
  }[];
  salePercent: number;
  sizingType: string;
  createdAt: string;
  updatedAt: string;
}

const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_BASE_URL}/api/products`
        );
        setProducts(response.data);
        const visibleProducts = response.data.filter((product: Product) => !product.isHidden);
        setFilteredProducts(visibleProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered);
  };

  //TODO: add a search button in staging areas
  return (
    <div>
      <div className="py-[30px] md:py-[40px] bg-white"></div>
      <div className="w-[85%] md:w-[80%] mx-auto py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6 md:gap-0">
          <h1
            className={`md:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5] drop-shadow-lg tracking-tight ${patrickHand.className}`}
          >
            All Products
          </h1>
          {/* Search Bar */}
          <div className="relative w-full md:w-[40%] flex items-center">
            <input
              type="text"
              placeholder="Search by subcategory or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 text-base border-2 border-[#b970a0] rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] transition bg-white/80 backdrop-blur placeholder:text-[#b970a0] text-[#4fb3e5] font-semibold"
            />
            <SearchNormal
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b970a0]"
              size={24}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <FadeLoader color="#dcaed0" height={10} width={5} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <Products
            products={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
        )}
      </div>
    </div>
  );
};

export default page;