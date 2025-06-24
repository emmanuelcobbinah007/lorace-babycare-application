import React from "react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedProducts } from "../../../../hooks/useProducts";
import FeaturedProductsGrid from "./FeaturedProductsGrid"

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const FeaturedProducts = () => {
  const { data: products = [], isLoading, error } = useFeaturedProducts();

  return (
    <div className="mt-10 md:mt-20">
      {/* Hero Section */}
      <div className="bg-[url('/images/babyShoes.jpg')] bg-cover bg-right bg-no-repeat h-[35vh] md:h-[55vh] relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className={`h-full flex items-center justify-center ${patrickHand.className}`}
        >
          <h1 className="text-white text-3xl md:text-6xl font-bold z-10 text-center px-4">
            Featured Products
          </h1>
        </div>
      </div>      {/* Products Grid */}
      <div className="mx-auto w-[90%] md:w-[80%] py-6 md:py-14">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-gray-500">
            <p>Error loading featured products</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No featured products available</p>
          </div>        ) : (
          <FeaturedProductsGrid featuredProducts={products} />
        )}

        {/* View All Products Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center w-[80%] md:w-[50%] px-6 py-3 bg-white border border-pink-400 text-pink-600 rounded-full font-semibold text-base shadow hover:bg-pink-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <span className="mr-2 transition-transform group-hover:translate-x-1">View All Products</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
