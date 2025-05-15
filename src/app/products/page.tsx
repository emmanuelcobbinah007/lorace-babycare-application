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

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
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
      <div className="w-[85%] mx-auto h-[85vh] py-6">
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-4xl font-semibold text-[#333] ${patrickHand.className}`}
          >
            All Products
          </h1>
          {/* Search Bar */}
          <div className="hidden relative md:block w-full md:w-[40%]">
            <input
              type="text"
              placeholder="Search by subcategory or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] transition"
            />
            <SearchNormal
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
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
