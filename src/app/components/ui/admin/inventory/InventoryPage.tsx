"use client";

import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { SearchNormal } from "iconsax-reactjs"; // Adjust the import path if necessary
import axios from "axios";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash, FaRegStar, FaStar } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

import AddProductModal from "./AddProductModal";

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const InventoryPage = () => {
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
    createdAt: string;
    updatedAt: string;
  }

  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  //   const [productName, setProductName] = useState("");
  //   const [productDescription, setProductDescription] = useState("");
  //   const [productPrice, setProductPrice] = useState(0.0);
  //   const [productStock, setProductStock] = useState(0);
  //   const [productCategoryID, setProductCategoryID] = useState("");
  //   const [isSizeable, setIsSizeable] = useState(true);
  //   const [isHidden, setIsHidden] = useState(true);
  //   const [productImageUrl, setProductImageUrl] = useState<string | null>(null);

  // fetching featured products from database
  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_BASE_URL}/api/products/featured-products`
      );
      setFeaturedProducts(response.data);
    } catch (error) {
      console.log("Error fetching featured products:", error);
    }
  };

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      fetchFeaturedProducts();

      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_BASE_URL}/api/products`
        );
        setFetchedProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = fetchedProducts.filter((fetchedProduct) =>
      fetchedProduct.name.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered);
  };

  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const toggleFeatured = async (productId: string) => {
    try {
      const isFeatured = featuredProducts.some((fp) => fp.productId === productId);
      if (isFeatured) {
        const result = await Swal.fire({
          title: "Remove from featured?",
          text: "Are you sure you want to remove this product from featured products?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, remove it!",
        });
        if (result.isConfirmed) {
          await axios.delete(
            `${NEXT_PUBLIC_BASE_URL}/api/products/featured-products/${productId}`
          );
          await fetchFeaturedProducts(); // Always re-fetch after change
          toast.success("Product removed from featured");
        }
      } else {
        const result = await Swal.fire({
          title: "Add to featured?",
          text: "Are you sure you want to add this product to featured products?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add it!",
        });
        if (result.isConfirmed) {
          await axios.post(
            `${NEXT_PUBLIC_BASE_URL}/api/products/featured-products`,
            { productId }
          );
          await fetchFeaturedProducts(); // Always re-fetch after change
          toast.success("Product added to featured!");
        }
      }
    } catch (error) {
      console.error("Error toggling featured product:", error);
    }
  };

  const initDelete = (product: Product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${NEXT_PUBLIC_BASE_URL}/api/products/${product.id}`
          );
          setFetchedProducts((prev) =>
            prev.filter((p) => p.id !== product.id)
          );
          setFilteredProducts((prev) =>
            prev.filter((p) => p.id !== product.id)
          );
          toast.success("Product deleted successfully");
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product");
        }
      }
    })
  }

  const handleHide = async (productId: string) => {
    try {
      await axios.patch(`${NEXT_PUBLIC_BASE_URL}/api/products/${productId}`, {
        isHidden: true,
      });
      setFetchedProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, isHidden: true } : product
        )
      );
      setFilteredProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, isHidden: true } : product
        )
      );
      toast.success("Product hidden");
    } catch (error) {
      toast.error("Failed to hide product");
    }
  };

  const handleUnHide = async (productId: string) => {
    try {
      await axios.patch(`${NEXT_PUBLIC_BASE_URL}/api/products/${productId}`, {
        isHidden: false,
      });
      setFetchedProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, isHidden: false } : product
        )
      );
      setFilteredProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, isHidden: false } : product
        )
      );
      toast.success("Product unhidden");
    } catch (error) {
      toast.error("Failed to unhide product");
    }
  };
  const initEdit = (product: Product) => {
    setEditingProduct(product);
    setEditing(true);
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  }

  return (
    <div>
      <div className="flex">
        <div className="hidden md:block w-[22.5%] bg-amber-950"></div>
        <div className="my-4 mx-auto w-full">
          <ToastContainer />
          <div className="mt-4 mb-8 mx-auto w-[90%] flex justify-between items-center">
            <h1 className="pl-10 md:pl-0 text-xl font-semibold text-gray-800">
              Inventory
            </h1>
          </div>
          <div className="my-4 mx-auto w-[90%]">
            <h1 className="text-lg font-semibold text-gray-800">
              Featured Products
            </h1>

          {/* TODO: Make the featured products grid responsive */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center my-6">
              {featuredProducts.length === 0 ? (
                <div className="text-gray-400 italic text-sm col-span-4">
                  No featured products yet.
                </div>
              ) : (
                featuredProducts.map((fp) => {
                  const product = fetchedProducts.find((p) => p.id === fp.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={fp.id}
                      className="relative w-full max-w-xs bg-gradient-to-br from-[#fbeffb] to-[#e0e7ff] rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 border-2 border-[#b970a0]/20 hover:border-[#b970a0] flex flex-col mx-auto"
                    >
                      <div className="h-36 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <div className="text-gray-300 text-4xl">🍼</div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col gap-1 flex-1">
                        <h3 className="font-bold text-lg text-[#b970a0] truncate">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-xs line-clamp-2 mb-1">
                          {product.descriptionShort}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[#4fb3e5] font-semibold text-lg md:text-base">
                            GH₵{product.price}
                          </span>
                          <span className="hidden md:block bg-[#b970a0] text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                      <button
                        className="absolute top-2 right-2 bg-white/80 hover:bg-[#b970a0] hover:text-white text-[#b970a0] rounded-full p-2 shadow transition-colors duration-200"
                        title="Remove from featured"
                        onClick={() => toggleFeatured(product.id)}
                      >
                        <FaStar />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="my-8 mx-auto w-[90%] flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Products</h1>
            {/* Search Bar */}
            <div className="hidden relative md:block w-full md:w-[40%]">
              <input
                type="text"
                placeholder="Search by subcategory or category..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] transition"
              />
              <SearchNormal
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <button
              onClick={handleOpen}
              className="bg-[#b970a0] hover:cursor-none hover:bg-[#874f7a] duration-300 text-white px-3 py-2 rounded-md shadow md:w-auto flex items-center space-x-2"
            >
              <IoMdAdd className="mx-auto md:mr-2 text-lg font-bold" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
          {/* Search Bar */}
          <div className="block md:hidden w-[90%] mx-auto">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] text-gray-700 placeholder-gray-400"
            />
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <FadeLoader color="#dcaed0" height={10} width={5} />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="w-[90%] mx-auto mt-10">
              <div className="overflow-x-auto rounded-2xl shadow-md">
                <table className="w-full min-w-[700px] table-auto text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 flex items-center justify-center"></th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3 text-center w-[20%]">Price</th>
                      <th className="px-4 py-3 text-center">Stock</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className={`transition-colors ${
                          product.isHidden
                            ? "bg-gray-50 text-gray-400"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="h-full align-middle">
                          <div className="flex justify-center items-center h-full text-lg">
                            {featuredProducts.some((fp) => fp.productId === product.id) ? (
                              <FaStar
                                className="text-yellow-400 cursor-pointer"
                                title="Featured"
                                onClick={() => toggleFeatured(product.id)}
                              />
                            ) : (
                              <FaRegStar
                                onClick={() => toggleFeatured(product.id)}
                                className="text-gray-400 cursor-pointer"
                                title="Not Featured"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">{product.name}</td>
                        <td className="px-4 py-3">
                          {product.descriptionShort.length > 75
                            ? `${product.descriptionShort.substring(0, 75)}...`
                            : product.descriptionShort}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-green-600">
                          GH₵{product.price}
                        </td>
                        <td className="px-4 py-3 text-center">{product.stock}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            {product.isHidden ? (
                              <FaRegEye
                                onClick={() => handleUnHide(product.id)}
                                className="text-[#4fb3e5] cursor-pointer hover:scale-110 transition-transform"
                                title="Unhide"
                              />
                            ) : (
                              <FaRegEyeSlash
                                onClick={() => handleHide(product.id)}
                                className="text-[#4fb3e5] cursor-pointer hover:scale-110 transition-transform"
                                title="Hide"
                              />
                            )}
                            <button
                              onClick={() => initEdit(product)}
                              className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-transform hover:scale-105"
                              title="Edit"
                            >
                              <MdOutlineEdit
                                size={18}
                                className="text-[#4fb3e5]"
                              />
                            </button>
                            <button
                              onClick={() => initDelete(product)}
                              className="p-2 rounded-lg bg-red-500 text-white shadow-sm hover:bg-red-600 transition-transform hover:scale-105"
                              title="Delete"
                            >
                              <MdOutlineDeleteOutline size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-[90%] mx-auto mt-8">
              <h2 className="text-md font-semibold text-gray-800">
                No Product Found
              </h2>
              <p className="text-gray-500">Please add a product.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddProductModal
          setShowModal={setShowModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          editing={editing}
          setEditing={setEditing}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
};

export default InventoryPage;
