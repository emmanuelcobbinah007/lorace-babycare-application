"use client";

import React from "react";
import { Patrick_Hand } from "next/font/google";

import Products from "../components/ui/products/Products";
import { FadeLoader } from "react-spinners";
import { useSales } from "../hooks/useSales";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const page = () => {
  const { data: sales, isLoading: loading, error } = useSales();

  return (
    <>
      <div className="py-[30px] md:py-[40px] bg-white"></div>
      <div className="w-[85%] md:w-[80%] mx-auto py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6 md:gap-0">
          <h1
            className={`md:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5] drop-shadow-lg tracking-tight ${patrickHand.className}`}
          >
            Sales
          </h1>
        </div>        {loading ? (
          <div className="flex h-[75vh] justify-center items-center mt-0 md:mt-10">
            <FadeLoader color="#b970a0" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Error loading sales. Please try again later.</p>
          </div>
        ) : !sales || sales.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No products on sale found.</p>
          </div>
        ) : (
          <Products products={sales} />
        )}
      </div>
    </>
  );
};

export default page;
