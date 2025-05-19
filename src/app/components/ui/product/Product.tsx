"use client";

import React, { useState, useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

const Product = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
            setProduct(response.data.product);
            if (response.data.product.images && response.data.product.images.length > 0) {
                setSelectedImage(response.data.product.images[0].url);
            }
            console.log(response.data);
        } catch (error) {
            console.log("Error retrieving products:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product?.sizingType && !size) {
      toast.error("Please select a size");
      return;
    }
    
    toast.success(`${product?.name} added to cart!`);
    // Here you would add the actual cart functionality
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success(`${product?.name} added to favorites!`);
    } else {
      toast.info(`${product?.name} removed from favorites!`);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[75vh] justify-center items-center mt-0 md:mt-10">
        <FadeLoader color="#b970a0" />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="w-[85%] mx-auto text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
        <button 
          onClick={() => router.back()}
          className="mt-4 flex items-center justify-center mx-auto bg-[#b970a0] hover:bg-[#a55f91] text-white px-4 py-2 rounded-lg"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  // Calculate the final price with discount
  const finalPrice = product.salePercent > 0 
    ? product.price - (product.price * (product.salePercent / 100)) 
    : product.price;

  return (
    <div className="w-[90%] md:w-[85%] mx-auto py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Breadcrumb navigation */}
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <button onClick={() => router.push('/')} className="hover:text-[#b970a0]">Home</button>
        <span className="mx-2">/</span>
        <button onClick={() => router.push(`/category/${product.categoryId}`)} className="hover:text-[#b970a0]">
          {product.category.name}
        </button>
        <span className="mx-2">/</span>
        <button onClick={() => router.push(`/subcategory/${product.subCategoryId}`)} className="hover:text-[#b970a0]">
          {product.subCategory.name}
        </button>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Product images */}
        <div className="flex flex-col space-y-4">
          {/* Main image */}
          <div className="w-full aspect-square relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No image available
              </div>
            )}
            
            {product.salePercent > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                -{(product.salePercent)*100}%
              </div>
            )}
          </div>
          
          {/* Thumbnail images */}
          {product.images && product.images.length > 0 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image) => (
                <div 
                  key={image.id} 
                  className={`w-20 h-20 cursor-pointer border-2 rounded-md overflow-hidden ${
                    selectedImage === image.url ? 'border-[#b970a0]' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img 
                    src={image.url} 
                    alt={`${product.name} thumbnail`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Product details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-baseline mb-4">
            {product.salePercent > 0 ? (
              <>
                <p className="text-2xl font-semibold text-[#b970a0]">
                  ${finalPrice.toFixed(2)}
                </p>
                <p className="ml-2 text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-[#b970a0]">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">{product.descriptionShort}</p>
          </div>
          
          {/* Stock status */}
          <div className="mb-6">
            <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>
          
          {/* Size selection if applicable */}
          {product.sizingType && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick={() => setSize(sizeOption)}
                    className={`px-3 py-1 border rounded-md ${
                      size === sizeOption 
                        ? 'border-[#b970a0] bg-[#b970a0] text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-[#b970a0]'
                    }`}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-l-md bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-200 bg-white">
                {quantity}
              </span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-r-md bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to cart and wishlist buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center ${
                product.stock > 0 
                  ? 'bg-[#b970a0] hover:bg-[#a55f91] text-white' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              <FaShoppingCart className="mr-2" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button
              onClick={toggleFavorite}
              className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:border-[#b970a0]"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <IoMdHeart className="text-[#b970a0] text-xl" />
              ) : (
                <IoMdHeartEmpty className="text-gray-700 text-xl" />
              )}
            </button>
          </div>
          
          {/* Product categories */}
          <div className="mb-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Category:</span>{' '}
              <button 
                onClick={() => router.push(`/category/${product.categoryId}`)}
                className="text-[#b970a0] hover:underline"
              >
                {product.category.name}
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Subcategory:</span>{' '}
              <button 
                onClick={() => router.push(`/subcategory/${product.subCategoryId}`)}
                className="text-[#b970a0] hover:underline"
              >
                {product.subCategory.name}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product description */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Description</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="prose max-w-none text-gray-700" 
               dangerouslySetInnerHTML={{ __html: product.descriptionLong || product.descriptionShort }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
