"use client";

import React from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  stock: number;
  isHidden: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    isHidden: boolean;
  };
  subCategoryId: string;
  subCategory: {
    id: string;
    name: string;
    categoryId: string;
    createdAt: string;
    isHidden: boolean;
  };
  images: {
    id: string;
    url: string;
    productId: string;
  }[];
  salePercent: number;
  sizingType: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Products: React.FC<ProductsProps> = ({
  products,
  setFilteredProducts,
}) => {

  const handleAddToCart = async (product: Product, quantity: number) => {

    console.log(product.id, quantity)
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
        {products.map((product: Product) => (
          <Link href={`products/${product.id}`}
            key={product.id}
            onClick={() =>  console.log("Card Clicked!")}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-200 flex flex-col min-h-[340px] sm:min-h-[370px] md:min-h-[420px]"
          >
            <div className="relative">
              <img
                src={product.images[0]?.url || "/placeholder.png"}
                alt={product.name}
                className="h-40 sm:h-48 md:h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl border-b border-gray-100"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {product.salePercent > 0 && (
                <div className="absolute top-2 left-2 bg-[#fdd8e4] text-[#e44d7b] text-xs font-bold rounded-full px-2 py-0.5 shadow-sm border border-white animate-bounce">
                  -{(product.salePercent)*100}%
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute top-2 right-2 bg-[#ffe0e5] text-[#e57373] text-xs font-bold rounded-full px-2 py-0.5 shadow-sm border border-white">
                  Out of Stock
                </div>
              )}
            </div>
            <div className="px-3 sm:px-4 py-3 sm:py-4 flex flex-col flex-1 bg-white rounded-b-2xl">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate mb-1 tracking-tight">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                {product.descriptionShort}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                <span className="text-[10px] sm:text-[11px] md:text-xs bg-[#e0f3fa] text-[#4fb3e5] font-semibold rounded-full px-2 py-0.5 border border-[#b970a0]">
                  {product.category?.name}
                </span>
                <span className="text-[10px] sm:text-[11px] md:text-xs bg-[#f0e6f6] text-[#b970a0] font-semibold rounded-full px-2 py-0.5 border border-[#4fb3e5]">
                  {product.subCategory?.name}
                </span>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <span className="text-[#e44d7b] font-bold text-base sm:text-lg md:text-xl">
                    {product.salePercent > 0
                      ? `GH₵${((1 - (product.salePercent ?? 0)) * product.price).toFixed(2)}`
                      : `GH₵${(product.price).toFixed(2)}`}
                    
                  </span>
                  {product.salePercent > 0 && (
                    <span className="hidden md:inline ml-2 text-gray-400 line-through text-xs sm:text-sm">
                      GHC{(product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(product, 1); }}
                  className={`bg-[#4fb3e5] hover:bg-[#b970a0] text-white rounded-full p-2 sm:p-2.5 transition-colors duration-200 flex items-center justify-center shadow-md border border-white ${
                    product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Add to Cart"
                  disabled={product.stock === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-1.45L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;