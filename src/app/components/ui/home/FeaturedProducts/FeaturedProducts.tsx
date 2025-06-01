import React from "react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedProducts } from "../../../../hooks/useProducts";

import Socks from "../../../../../../public/images/featuredProducts/socks.jpg";
import Towels from "../../../../../../public/images/featuredProducts/towels.jpg";
import Yum from "../../../../../../public/images/featuredProducts/yum.jpg";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const FeaturedProducts = () => {
  const { data: products = [], isLoading, error } = useFeaturedProducts();
  console.log("Featured Products Data:", products);

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
      <div className="mx-auto w-[85%] md:w-[80%] py-6 md:py-14">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {products.map((featuredProduct) => {
            const displayPrice = featuredProduct.product.salePercent > 0 
              ? (featuredProduct.product.price * (1 - featuredProduct.product.salePercent / 100)).toFixed(2)
              : featuredProduct.product.price.toFixed(2);
            const originalPrice = featuredProduct.product.salePercent > 0 ? featuredProduct.product.price.toFixed(2) : null;
            
            return (
            <Link
              key={featuredProduct.id}
              href={`/products/${featuredProduct.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl hover:border-[#4fb3e5] border-1 border-transparent"
            >
              <div className="relative">
                <Image
                  src={featuredProduct.product.images[0]?.url || Socks}
                  alt={featuredProduct.product.name}
                  width={200}
                  height={200}
                  className="h-40 md:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-[#4fb3e5] text-white text-xs font-semibold rounded-sm px-2 py-1">
                  Featured
                </div>
                {featuredProduct.product.salePercent > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold rounded-sm px-2 py-1">
                    -{featuredProduct.product.salePercent}%
                  </div>
                )}
              </div>
              <div className="px-4 py-3 flex flex-col space-y-1">
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 truncate">
                  {featuredProduct.product.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-700 line-clamp-2">
                  {featuredProduct.product.descriptionShort}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[#b970a0] font-bold text-sm md:text-base">
                      ${displayPrice}
                    </p>
                    {originalPrice && (
                      <p className="text-gray-500 text-xs line-through">
                        ${originalPrice}
                      </p>
                    )}
                  </div>
                  <button className="bg-transparent border border-[#4fb3e5] text-[#4fb3e5] hover:bg-[#4fb3e5] hover:text-white text-xs font-semibold rounded-md px-3 py-1 transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </Link>
          )})}
        </div>
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
