"use client";

import React from "react";
import Image from "next/image";

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
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
        {products.map((product: Product) => (
          // <div
          //     key={product.id}
          //     className="group relative bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl hover:border-[#4fb3e5] border-1 border-transparent"
          // >
          //     <div className="relative">
          //         <img
          //             src={product.images[0].url}
          //             alt={product.name}
          //             className="h-40 md:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          //         />
          //     </div>
          //     <div className="px-4 py-3 flex flex-col space-y-1">
          //         <h3 className="text-sm md:text-lg font-semibold text-gray-900 truncate">
          //             {product.name}
          //         </h3>
          //         <p className="text-xs md:text-sm text-gray-700 line-clamp-2">
          //             {product.descriptionShort}
          //         </p>
          //         <p className="text-[#b970a0] font-bold text-sm md:text-base">
          //             ${product.price.toFixed(2)}
          //         </p>
          //     </div>
          // </div>

          <div
            key={product.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl hover:border-[#4fb3e5] border-1 border-transparent"
          >
            <div className="relative">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="h-40 md:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-[#4fb3e5] text-white text-xs font-semibold rounded-sm px-2 py-1">
                Featured
              </div>
            </div>
            <div className="px-4 py-3 flex flex-col space-y-1">
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-700 line-clamp-2">
                {product.descriptionShort}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[#b970a0] font-bold text-sm md:text-base">
                  GHC{product.price.toFixed(2)}
                </p>
                <button className="bg-transparent border border-[#4fb3e5] text-[#4fb3e5] hover:bg-[#4fb3e5] hover:text-white text-xs font-semibold rounded-md px-3 py-1 transition-colors duration-200">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
