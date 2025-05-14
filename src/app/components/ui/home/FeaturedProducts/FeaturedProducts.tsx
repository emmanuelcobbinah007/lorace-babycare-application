import React from "react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";

import Socks from "../../../../../../public/images/featuredProducts/socks.jpg";
import Towels from "../../../../../../public/images/featuredProducts/towels.jpg";
import Yum from "../../../../../../public/images/featuredProducts/yum.jpg";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const FeaturedProducts = () => {
  const products = [
    {
      src: Socks,
      alt: "Socks",
      description: "Cozy cotton socks for little feet",
      price: "$9.99",
    },
    {
      src: Socks,
      alt: "Socks",
      description: "Playful colorful socks",
      price: "$8.50",
    },
    {
      src: Towels,
      alt: "Towels",
      description: "Soft and absorbent bath towels",
      price: "$15.00",
    },
    {
      src: Yum,
      alt: "Yum",
      description: "Delicious organic baby food",
      price: "$4.99",
    },
  ];

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
      </div>

      {/* Products Grid */}
      <div className="mx-auto w-[85%] md:w-[80%] py-6 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl hover:border-[#4fb3e5] border-1 border-transparent"
            >
              <div className="relative">
                <Image
                  src={product.src}
                  alt={product.alt}
                  className="h-40 md:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-[#4fb3e5] text-white text-xs font-semibold rounded-sm px-2 py-1">
                  Featured
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col space-y-1">
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 truncate">
                  {product.alt}
                </h3>
                <p className="text-xs md:text-sm text-gray-700 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[#b970a0] font-bold text-sm md:text-base">
                    {product.price}
                  </p>
                  <button className="bg-transparent border border-[#4fb3e5] text-[#4fb3e5] hover:bg-[#4fb3e5] hover:text-white text-xs font-semibold rounded-md px-3 py-1 transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button className="w-[80%] md:w-[50%] px-5 py-2.5 md:px-6 md:py-3 bg-[#b970a0] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#9a5a8c] transition duration-300">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
