import React from "react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedProducts } from "../../../../hooks/useProducts";
import Products from "../../products/Products"

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
          </div>
        ) : (
          <Products products={products.map(featuredProduct => featuredProduct.product)} />
        )}

        {/* View All Products Button */}
        <div className="flex justify-center mt-8 md:mt-12">
           <Link href="/products" className="flex justify-center w-[80%] md:w-[50%] px-5 py-2.5 md:px-6 md:py-3 bg-[#b970a0] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#9a5a8c] transition duration-300">
            View All Products
         </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
