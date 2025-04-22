"use client";

import React from "react";
import Image from "next/image";
import { SearchNormal, User, ShoppingCart } from "iconsax-reactjs";
import { Poppins } from "next/font/google";

import Logo from "../../../../../public/images/loraceLogo.png";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const Header = () => {
  return (
    <div>
      <div className="font-poppins w-[90%] mx-auto flex justify-between items-center py-4">
        <div>
          <Image
            src={Logo.src}
            alt="Lorace Babycare Logo"
            width={100}
            height={100}
          />
        </div>
        <div>
          <ul className="flex gap-8 text-black font-[500] text-base">
            <li className="relative hover:cursor-pointer duration-300 group hover:text-[#4fb2e5]">
              Store
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative hover:cursor-pointer duration-300 group hover:text-[#4fb2e5]">
              Food
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative hover:cursor-pointer duration-300 group hover:text-[#4fb2e5]">
              Clothing
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative hover:cursor-pointer duration-300 group hover:text-[#4fb2e5]">
              Accessories
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative hover:cursor-pointer duration-300 group hover:text-[#4fb2e5]">
              Footwear
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative hover:cursor-pointer duration-300 group hover:text-[#4fb2e5]">
              Mother
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <SearchNormal
            size="20"
            className="text-black hover:text-[#4fb3e5] hover:cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <User
            size="20"
            className="text-black hover:text-[#4fb3e5] hover:cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <ShoppingCart
            size="20"
            className="text-black hover:text-[#4fb3e5] hover:cursor-pointer hover:scale-110 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
