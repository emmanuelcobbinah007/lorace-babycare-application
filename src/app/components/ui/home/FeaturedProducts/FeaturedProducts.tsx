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
    { src: Socks, alt: "Backpack" },
    { src: Socks, alt: "Socks" },
    { src: Towels, alt: "Towels" },
    { src: Yum, alt: "Yum" },
  ];

  return (
    <div>
      <div className="bg-[url('/images/babyShoes.jpg')] bg-cover bg-center bg-no-repeat bg-fixed h-[65vh] md:h-[75vh] relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className={`h-full flex items-center justify-center ${patrickHand.className} `}
        >
          <h1 className="text-white text-4xl md:text-5xl font-bold z-10">
            Featured Products
          </h1>
        </div>
      </div>

      <div className="mx-auto w-[90%] py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col items-center">
        <Image
          src={product.src}
          alt={product.alt}
          width={300}
          height={100}
          className="mx-auto rounded-lg shadow-lg"
        />
        <h2 className="text-center text-lg font-semibold mt-2">{product.alt}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
