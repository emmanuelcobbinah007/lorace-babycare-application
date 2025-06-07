"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { SearchNormal } from "iconsax-reactjs";
import { FiFolder, FiShoppingBag, FiShoppingCart as ShoppingCart } from "react-icons/fi";

import { useProducts } from "@/app/hooks/useProducts";
import { useCategories } from "@/app/hooks/useCategories";
import { Product } from "@/app/api/products/productApi";
import { Category } from "@/app/api/categories/categoryApi";

interface SearchModalProps {
  handleClose: () => void;
  animateModal: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({
  handleClose,
  animateModal,
}) => {  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Fetch data using React Query
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim() || categoriesLoading) return [];
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return categories
      .filter((category: Category) => 
        category.name.toLowerCase().includes(lowerSearchTerm)
      )
      .slice(0, 6); // Limit to 6 categories
  }, [categories, searchTerm, categoriesLoading]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim() || productsLoading) return [];
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return products
      .filter((product: Product) => 
        !product.isHidden && 
        (product.name.toLowerCase().includes(lowerSearchTerm) ||
         product.descriptionShort.toLowerCase().includes(lowerSearchTerm) ||
         product.category.name.toLowerCase().includes(lowerSearchTerm) ||
         product.subCategory.name.toLowerCase().includes(lowerSearchTerm))
      )
      .slice(0, 8); // Limit to 8 products
  }, [products, searchTerm, productsLoading]);

  // Handle navigation to category
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
    handleClose();
  };

  // Handle navigation to product
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    handleClose();
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (animateModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [animateModal, handleClose]);

  // Add to Cart handler
  function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product
  ): void {
    e.stopPropagation(); // Prevent triggering parent click (navigation)
    // TODO: Replace with your cart logic (e.g., context, redux, API call)
    // For now, just show a toast or alert
    // Example: addToCart(product)
    alert(`Added "${product.name}" to cart!`);
  }

  return (
    <div className="fixed inset-0 z-[999] flex font-poppins">
      {/* Overlay */}
      <div
        className={`fixed inset-0 transition-opacity ${
          animateModal
            ? "opacity-70 bg-[#000] duration-300"
            : "opacity-0 bg-[#000] duration-300"
        }`}
        onClick={handleClose}
      ></div>

      {/* Search Modal */}
      <div
        className={`fixed top-0 bg-white w-full h-auto max-h-[80vh] shadow-lg overflow-hidden z-10 transform transition-transform duration-500 ease-in-out ${
          animateModal ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Header with Search Bar */}
          <div className="flex justify-between items-center p-6 w-full border-b border-gray-200 bg-gradient-to-r from-[#fef7ff] to-[#f0f9ff]">
        <div className="md:w-[85%] mx-auto flex justify-between items-center">
            <div className="relative flex-1 max-w-2xl mx-4">
              <input
          type="text"
          placeholder="Search products, categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-12 pr-4 py-3 text-base border-2 border-[#b970a0] rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] transition bg-white placeholder:text-[#b970a0] text-[#4fb3e5] font-medium"
          autoFocus
              />
              <SearchNormal
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b970a0]"
          size={24}
              />
            </div>
            
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-200 transition duration-200 transform hover:rotate-180 ml-4"
              aria-label="Close search"
            >
              <IoMdClose color="#b970a0" size={24} />
            </button>
          </div>
        </div>{/* Search Results */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
          {searchTerm.trim() ? (
            <div className="w-[90%] md:w-[85%] mx-auto p-6">
              {/* Results Summary */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm">
                  {filteredCategories.length + filteredProducts.length === 0 
                    ? `No results found for "${searchTerm}"`
                    : `Found ${filteredCategories.length + filteredProducts.length} result(s) for "${searchTerm}"`
                  }
                </p>
              </div>

              {/* Desktop Layout: Categories 20% left, Products 80% right */}
              <div className="hidden md:block">
                <div className="flex gap-6">                  {/* Categories Section - 20% width */}
                  <div className="w-1/5 space-y-4">
                    {filteredCategories.length > 0 && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <FiFolder className="text-[#b970a0]" size={20} />
                          Categories ({filteredCategories.length})
                        </h3>
                        <div className="space-y-2">
                          {filteredCategories.map((category: Category) => (
                            <div
                              key={category.id}
                              onClick={() => handleCategoryClick(category.id)}
                              className="p-3 bg-gradient-to-r from-[#fef7ff] to-[#fdf2f8] rounded-xl border border-[#e4c2e1] hover:border-[#b970a0] cursor-pointer transition-all duration-200 hover:shadow-md group"
                            >
                              <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-8 h-8 bg-[#b970a0] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                  <FiFolder className="text-white" size={14} />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800 group-hover:text-[#b970a0] transition-colors text-sm">
                                    {category.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Browse
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Products Section - 80% width */}
                  <div className="w-4/5 space-y-4">
                    {filteredProducts.length > 0 && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <FiShoppingBag className="text-[#4fb3e5]" size={20} />
                          Products ({filteredProducts.length})
                        </h3>                        {/* Products Grid - 4 cards per row on desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {filteredProducts.map((product: Product) => (
                            <div
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                              className="bg-white rounded-xl border border-gray-200 hover:border-[#4fb3e5] cursor-pointer transition-all duration-200 hover:shadow-lg group overflow-hidden relative"
                            >
                              {/* Product Image */}
                              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                                {product.images.length > 0 ? (
                                  <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-[#4fb3e5] flex items-center justify-center">
                                    <FiShoppingBag className="text-white" size={24} />
                                  </div>
                                )}
                                {/* Sale Badge */}
                                {product.salePercent > 0 && (
                                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                    {product.salePercent}% OFF
                                  </div>
                                )}
                                {/* Add to Cart Button */}
                                {product.stock > 0 && (
                                  <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="absolute top-2 right-2 bg-[#4fb3e5] hover:bg-[#b970a0] text-white rounded-full p-2 transition-colors duration-200 flex items-center justify-center shadow-md border border-white opacity-0 group-hover:opacity-100"
                                    aria-label="Add to Cart"
                                  >
                                    <ShoppingCart size="16" color="#fff" />
                                  </button>
                                )}
                              </div>
                              
                              {/* Product Info */}
                              <div className="p-4">
                                <h4 className="font-medium text-gray-800 group-hover:text-[#4fb3e5] transition-colors text-sm line-clamp-2 mb-2">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-500 mb-2 truncate">
                                  {product.category.name} • {product.subCategory.name}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-semibold text-[#4fb3e5]">
                                      {product.salePercent > 0
                                        ? `GH₵${((1 - product.salePercent / 100) * product.price).toFixed(2)}`
                                        : `GH₵${product.price.toFixed(2)}`}
                                    </p>
                                    {product.salePercent > 0 && (
                                      <p className="text-xs text-gray-400 line-through">
                                        GH₵{product.price.toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                  {product.stock > 0 ? (
                                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                      In Stock
                                    </span>
                                  ) : (
                                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                      Out of Stock
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>              {/* Mobile Layout: Stacked */}
              <div className="md:hidden space-y-6">
                {/* Categories Section */}
                {filteredCategories.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FiFolder className="text-[#b970a0]" size={20} />
                      Categories ({filteredCategories.length})
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredCategories.map((category: Category) => (
                        <div
                          key={category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          className="p-3 bg-gradient-to-r from-[#fef7ff] to-[#fdf2f8] rounded-xl border border-[#e4c2e1] hover:border-[#b970a0] cursor-pointer transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-8 h-8 bg-[#b970a0] rounded-full flex items-center justify-center">
                              <FiFolder className="text-white" size={14} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">
                                {category.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Browse
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Section */}
                {filteredProducts.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FiShoppingBag className="text-[#4fb3e5]" size={20} />
                      Products ({filteredProducts.length})
                    </h3>                    {/* Products Stack - Single column on mobile */}
                    <div className="space-y-3">
                      {filteredProducts.map((product: Product) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="bg-white rounded-xl border border-gray-200 hover:border-[#4fb3e5] cursor-pointer transition-all duration-200 hover:shadow-lg overflow-hidden group"
                        >
                          <div className="flex gap-3 p-3">
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                              {product.images.length > 0 ? (
                                <img
                                  src={product.images[0].url}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#4fb3e5] flex items-center justify-center">
                                  <FiShoppingBag className="text-white" size={16} />
                                </div>
                              )}
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-800 text-sm line-clamp-1 mb-1">
                                {product.name}
                              </h4>
                              <p className="text-xs text-gray-500 mb-2 truncate">
                                {product.category.name} • {product.subCategory.name}
                              </p>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-[#4fb3e5]">
                                    {product.salePercent > 0
                                      ? `GH₵${((1 - product.salePercent / 100) * product.price).toFixed(2)}`
                                      : `GH₵${product.price.toFixed(2)}`}
                                  </p>
                                  {product.salePercent > 0 && (
                                    <span className="text-xs text-gray-400 line-through">
                                      GH₵{product.price.toFixed(2)}
                                    </span>
                                  )}
                                  {product.salePercent > 0 && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                      {product.salePercent}% OFF
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {product.stock > 0 ? (
                                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                      In Stock
                                    </span>
                                  ) : (
                                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                      Out of Stock
                                    </span>
                                  )}
                                  {/* Add to Cart Button for Mobile */}
                                  {product.stock > 0 && (
                                    <button
                                      onClick={(e) => handleAddToCart(e, product)}
                                      className="bg-[#4fb3e5] hover:bg-[#b970a0] text-white rounded-full p-1.5 transition-colors duration-200 flex items-center justify-center shadow-md"
                                      aria-label="Add to Cart"
                                    >
                                      <ShoppingCart size="14" color="#fff" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* No Results */}
              {filteredCategories.length === 0 && filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <SearchNormal className="mx-auto text-gray-300" size={48} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try searching with different keywords or check your spelling.
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Empty state
            <div className="p-6 text-center py-12">
              <div className="mb-4">
                <SearchNormal className="mx-auto text-gray-300" size={48} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Start searching
              </h3>
              <p className="text-gray-600">
                Type something to search through our products and categories.
              </p>
            </div>
          )}
        </div>

        {/* Loading states */}
        {(productsLoading || categoriesLoading) && searchTerm.trim() && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#b970a0]"></div>
              <span className="text-gray-600">Searching...</span>
            </div>
          </div>        )}
      </div>
    </div>
  );
};

export default SearchModal;
