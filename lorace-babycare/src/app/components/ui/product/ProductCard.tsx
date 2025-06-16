"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../../../api/products/productApi';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  const discountedPrice = product.salePercent > 0 
    ? product.price * (1 - product.salePercent / 100)
    : null;

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Sale Badge */}
        {product.salePercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{product.salePercent}%
          </div>
        )}
        
        {/* Out of Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#b970a0] transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.descriptionShort}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-[#b970a0]">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#b970a0]">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Stock Info */}
          <span className="text-xs text-gray-500">
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </span>
        </div>

        {/* Category Badge */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {product.category.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
