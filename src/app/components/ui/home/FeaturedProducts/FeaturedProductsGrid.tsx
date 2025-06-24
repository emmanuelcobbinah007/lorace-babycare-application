"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "iconsax-reactjs";

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

interface FeaturedProduct {
  id: string;
  productId: string;
  product: Product;
  createdAt: string;
}

interface FeaturedProductsGridProps {
  featuredProducts: FeaturedProduct[];
}

const FeaturedProductsGrid: React.FC<FeaturedProductsGridProps> = ({
  featuredProducts,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const hoverVariants = {
    scale: 1.05,
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      rotate: -5,    },
  };

  const handleAddToCart = async (product: Product, quantity: number) => {
    // Add cart functionality here
  };
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
        {featuredProducts.map((featuredProduct: FeaturedProduct) => {
          const product = featuredProduct.product;
          return (            
          <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={hoverVariants}
              whileTap={{ scale: 0.95 }}
              className="h-full rounded-2xl"
            >
              <Link
                href={`/products/${product.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-200 flex flex-col h-full min-h-[40px] sm:min-h-[70px] md:min-h-[400px]"
              >                <div className="relative">
                  <motion.img
                    src={product.images[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    className="h-40 sm:h-48 md:h-60 w-full object-cover rounded-t-2xl border-b border-gray-100"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  {/* Featured Badge - Special for featured products */}
                  <motion.div
                    className="absolute top-2 left-2 bg-gradient-to-r from-[#b970a0] to-[#d4a5c9] text-white text-xs font-bold rounded-full px-1 md:px-3 py-1 shadow-lg border border-white flex items-center gap-1"
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Star size="12" color="#fff" variant="Bold" />
                    <span className="hidden md:block">Featured</span>
                  </motion.div>

                  {/* {product.salePercent > 0 && (
                  <div className="absolute top-2 right-2 bg-[#fdd8e4] text-[#e44d7b] text-xs font-bold rounded-full px-2 py-0.5 shadow-sm border border-white animate-pulse">
                    -{(product.salePercent)*100}%
                  </div>
                )} */}

                  {product.stock === 0 && (
                    <div className="absolute bottom-2 right-2 bg-[#ffe0e5] text-[#e57373] text-xs font-bold rounded-full px-2 py-0.5 shadow-sm border border-white">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="px-3 sm:px-4 py-3 sm:py-4 flex flex-col flex-1 bg-white rounded-b-2xl">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate mb-1 tracking-tight group-hover:text-[#b970a0] transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="hidden md:block text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                    {product.descriptionShort.length > 30
                      ? product.descriptionShort.slice(0, 30) + "..."
                      : product.descriptionShort}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                    <span className="text-[10px] sm:text-[11px] md:text-xs bg-gradient-to-r from-[#e0f3fa] to-[#f0f9ff] text-[#4fb3e5] font-semibold rounded-full px-2 py-0.5 border border-[#b970a0]/30">
                      {product.category?.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] md:text-xs bg-gradient-to-r from-[#f0e6f6] to-[#fdf2f8] text-[#b970a0] font-semibold rounded-full px-2 py-0.5 border border-[#4fb3e5]/30">
                      {product.subCategory?.name}
                    </span>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-[#e44d7b] font-bold text-base sm:text-lg md:text-xl">
                        {product.salePercent > 0
                          ? `GH₵${((1 - (product.salePercent ?? 0)) * product.price).toFixed(2)}`
                          : `GH₵${product.price.toFixed(2)}`}
                      </span>
                      {product.salePercent > 0 && (
                        <span className="hidden md:inline ml-2 text-gray-400 line-through text-xs sm:text-sm">
                          GH₵{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product, 1);
                      }}
                      className={`bg-gradient-to-r from-[#4fb3e5] to-[#3a92c5] hover:from-[#b970a0] hover:to-[#a55f91] text-white rounded-full p-2 sm:p-2.5 transition-all duration-200 flex items-center justify-center shadow-lg border border-white ${
                        product.stock === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      aria-label="Add to Cart"
                      disabled={product.stock === 0}
                      variants={buttonVariants}
                      whileHover={product.stock > 0 ? "hover" : undefined}
                      whileTap={product.stock > 0 ? "tap" : undefined}                    >
                      <ShoppingCart size="18" color="#fff" />
                    </motion.button>
                  </div>
                </div>
              </Link>            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FeaturedProductsGrid;
