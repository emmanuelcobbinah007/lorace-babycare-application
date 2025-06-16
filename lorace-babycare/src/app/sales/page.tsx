"use client";

import React from "react";

import Products from "../components/ui/products/Products";
import { FadeLoader } from "react-spinners";
import { useSales } from "../hooks/useSales";

const page = () => {
  const { data: sales, isLoading: loading, error } = useSales();

  return (
    <>
      <div className="py-[30px] md:py-[40px] bg-white"></div>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 md:w-[85%] mx-auto py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6 md:gap-0">
          <h1
            className={`md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e44d7b] via-[#b970a0] to-[#4fb3e5] drop-shadow-lg tracking-tight`}
          >
            Sales
          </h1>
        </div>{" "}
        {loading ? (
          <div className="h-[65vh] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b970a0] mx-auto"></div>
              </div>
            </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              Error loading sales. Please try again later.
            </p>
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
