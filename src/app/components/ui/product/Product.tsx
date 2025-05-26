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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        toastClassName="backdrop-blur-md bg-white/80"
      />
      
      {/* Breadcrumb navigation */}
      <div className="w-[90%] md:w-[85%] mx-auto pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-4">
          <button onClick={() => router.push('/')} 
            className="hover:text-[#b970a0] transition-colors duration-200 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Home
          </button>
          <span className="text-gray-400">/</span>
          <button onClick={() => router.push(`/category/${product.categoryId}`)} 
            className="hover:text-[#b970a0] transition-colors duration-200">
            {product.category.name}
          </button>
          <span className="text-gray-400">/</span>
          <button onClick={() => router.push(`/subcategory/${product.subCategoryId}`)} 
            className="hover:text-[#b970a0] transition-colors duration-200">
            {product.subCategory.name}
          </button>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-700">{product.name}</span>
        </nav>
      </div>
      <div className="w-[90%] md:w-[85%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
          {/* Left side - Product images */}
          <div className="flex flex-col space-y-6">
            {/* Main image */}
            <div className="aspect-square mx-auto md:w-[80%] md:h-[80%] relative rounded-2xl overflow-hidden bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02]">
              {selectedImage ? (
                <div className="w-full h-full relative group">
                  <img 
                    src={selectedImage} 
                    alt={product.name}
                    className="w-full h-full object-contain transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"/>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {product.salePercent > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  -{(product.salePercent)*100}% OFF
                </div>
              )}
            </div>
          
          {/* Thumbnail images */}
          {product.images && product.images.length > 0 && (
            <div className="flex md:w-[80%] mx-auto space-x-2 overflow-x-auto">
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
                <div className="flex items-center bg-gray-100 rounded-lg shadow-inner overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={`w-10 h-10 flex items-center justify-center text-xl font-bold transition-colors duration-150 ${
                  quantity <= 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-[#f3e6f2] text-[#b970a0]"
                  }`}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-lg font-semibold bg-white border-x border-gray-200 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className={`w-10 h-10 flex items-center justify-center text-xl font-bold transition-colors duration-150 ${
                  quantity >= product.stock
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-[#f3e6f2] text-[#b970a0]"
                  }`}
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                </div>
            </div>
          </div>
          
          {/* Add to cart and wishlist buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center ${
                product.stock > 0 
                  ? 'bg-[#b970a0] hover:bg-[#a55f91] text-white transition-colors duration-200' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              <FaShoppingCart className="mr-2" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {product.stock > 0 && (
              <button
                onClick={() => {
                  handleAddToCart();
                  // Additional buy now logic here
                  router.push('/checkout');
                }}
                className="flex-1 px-6 py-3 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#4fb3e5] to-[#3a92c5] hover:from-[#3a92c5] hover:to-[#2d7ba8] text-white shadow-md transition-all duration-200 hover:shadow-lg"
              >
                Buy Now
              </button>
            )}
            
          </div>
          
          {/* Product categories */}
            <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center bg-pink-50 rounded-full px-4 py-2 shadow-sm">
              <span className="font-semibold text-gray-700 mr-1">Category:</span>
              <button
                onClick={() => router.push(`/category/${product.categoryId}`)}
                className="text-[#b970a0] hover:underline font-medium transition-colors duration-150"
              >
                {product.category.name}
              </button>
              </div>
              <div className="flex items-center bg-blue-50 rounded-full px-4 py-2 shadow-sm">
              <span className="font-semibold text-gray-700 mr-1">Subcategory:</span>
              <button
                onClick={() => router.push(`/subcategory/${product.subCategoryId}`)}
                className="text-[#4fb3e5] hover:underline font-medium transition-colors duration-150"
              >
                {product.subCategory.name}
              </button>
              </div>
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
    </div>
  );
};

export default Product;
