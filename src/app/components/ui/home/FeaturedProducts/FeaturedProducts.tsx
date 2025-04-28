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
    <div>
      {/* Hero Section */}
      <div className="bg-[url('/images/babyShoes.jpg')] bg-cover bg-center bg-no-repeat bg-fixed h-[50vh] md:h-[65vh] relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className={`h-full flex items-center justify-center ${patrickHand.className}`}
        >
          <h1 className="text-white text-3xl md:text-5xl font-bold z-10 text-center px-4">
            Featured Products
          </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto w-[90%] py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white md:pb-4 p-2 rounded-xl border border-[#4fb3e5] hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={product.src}
                alt={product.alt}
                className="rounded-lg h-[220px] w-[220px] object-cover mb-4"
              />
              <h2 className="text-center text-base md:text-lg font-bold">{product.alt}</h2>
              <p className="text-center text-gray-600 text-xs md:text-sm mt-1">{product.description}</p>
              <p className="text-center text-[#b970a0] font-bold text-sm md:text-base mt-2">{product.price}</p>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center mt-10">
            <button className="w-[70%] md:w-[50%] px-6 py-3 bg-[#b970a0] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#9a5a8c] transition duration-300">
            View All Products
            </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
