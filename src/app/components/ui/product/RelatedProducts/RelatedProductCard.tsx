"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "iconsax-reactjs";
import { Product } from "@/app/api/products/productApi";
import { toast } from "react-toastify";

interface RelatedProductCardProps {
  product: Product;
}

const RelatedProductCard: React.FC<RelatedProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Placeholder for add to cart functionality
    toast.info("Add to cart functionality coming soon!");
  };

  const cardVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className="h-full"
    >
      <Link
        href={`/products/${product.id}`}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-200 flex flex-col h-full min-h-[340px] sm:min-h-[370px] md:min-h-[420px]"
      >
        <div className="relative">
          <motion.img
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.name}
            className="h-40 sm:h-48 md:h-60 w-full object-cover rounded-t-2xl border-b border-gray-100"
            sizes="(max-width: 768px) 50vw, 25vw"
            variants={imageVariants}
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
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate mb-1 tracking-tight group-hover:text-[#b970a0] transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
            {product.descriptionShort.length > 30 ? product.descriptionShort.slice(0, 30) + "..." : product.descriptionShort}
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
                  GH₵{(product.price).toFixed(2)}
                </span>
              )}
            </div>            <button
              onClick={handleAddToCart}
              className={`bg-[#4fb3e5] hover:bg-[#b970a0] text-white rounded-full p-2 sm:p-2.5 transition-colors duration-200 flex items-center justify-center shadow-md border border-white ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Add to Cart"
              disabled={product.stock === 0}
            >
              <ShoppingCart size="18" color="#fff" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RelatedProductCard;
