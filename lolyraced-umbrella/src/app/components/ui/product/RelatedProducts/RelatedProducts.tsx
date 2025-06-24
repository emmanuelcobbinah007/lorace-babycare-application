"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useProductsBySubCategory } from "@/app/hooks/useProducts";
import RelatedProductCard from "./RelatedProductCard";
import { Product } from "@/app/api/products/productApi";

interface RelatedProductsProps {
  subCategoryId: string;
  subCategoryName: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  subCategoryId,
  subCategoryName,
  currentProductId,
}) => {
  const router = useRouter();
  const { data: products, isLoading, error } = useProductsBySubCategory(subCategoryId);

  // Filter out current product and limit to 8 related products
  const relatedProducts = products
    ?.filter((product: Product) => product.id !== currentProductId)
    ?.slice(0, 8) || [];

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          More from <span className="text-[#b970a0]">{subCategoryName}</span>
        </h2>
        <div className="flex justify-center items-center py-12">
          <FadeLoader color="#b970a0" loading={true} />
        </div>
      </div>
    );
  }

  if (error || !products || relatedProducts.length === 0) {
    return null; // Don't show section if no related products
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          More from <span className="text-[#b970a0]">{subCategoryName}</span>
        </h2>
        <button
          onClick={() => router.push(`/subcategory/${subCategoryId}`)}
          className="text-[#4fb3e5] hover:text-[#3a92c5] font-medium text-sm transition-colors duration-200 hover:underline"
        >
          View All →
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[100%] md:w-[90%] mx-auto"
      >
        {relatedProducts.map((product: Product) => (
          <motion.div key={product.id} variants={cardVariants}>
            <RelatedProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RelatedProducts;
