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
    { src: Socks, alt: "Socks", description: "Cozy cotton socks for little feet", price: "$9.99" },
    { src: Socks, alt: "Socks", description: "Playful colorful socks", price: "$8.50" },
    { src: Towels, alt: "Towels", description: "Soft and absorbent bath towels", price: "$15.00" },
    { src: Yum, alt: "Yum", description: "Delicious organic baby food", price: "$4.99" },
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
      <div className="mx-auto w-[90%] py-6 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#4fb3e5] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="overflow-hidden">
                <Image
                  src={product.src}
                  alt={product.alt}
                  className="h-36 md:h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 md:p-4 flex flex-col items-center text-center">
                <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                  {product.alt}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{product.description}</p>
                <p className="text-[#b970a0] font-bold text-sm md:text-base mt-2">
                  {product.price}
                </p>
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
