"use client";

import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import AddProductModal from "./AddProductModal";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
  
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [editing, setEditing] = useState(false);
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productPrice, setProductPrice] = useState(0.0);
//   const [productStock, setProductStock] = useState(0);
//   const [productCategoryID, setProductCategoryID] = useState("");
//   const [isSizeable, setIsSizeable] = useState(true);
//   const [isHidden, setIsHidden] = useState(true);
//   const [productImageUrl, setProductImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/products`);
        setFetchedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [])

  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  return (
    <div>
      <div className="flex">
      <div className='w-[22.5%] bg-amber-950'></div>
      <div className="my-4 mx-auto w-full">
        <div className="mt-4 mb-8 mx-auto w-[90%] flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Inventory</h1>
        </div>
        <div className="my-4 mx-auto w-[90%] flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">
            Featured Products
          </h1>
        </div>
        <div className="my-8 mx-auto w-[90%] flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Products</h1>
          <button
            onClick={handleOpen}
            className="bg-[#b970a0] hover:cursor-none hover:bg-[#874f7a] duration-300 text-white px-3 py-2 rounded-md shadow md:w-auto flex items-center space-x-2"
          >
            <IoMdAdd className="sm:mr-2 text-lg font-bold" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
        <div className="w-[90%] mx-auto mt-10">
  <div className="overflow-x-auto rounded-2xl shadow-md">
    <table className="w-full min-w-[700px] table-auto text-sm text-left border-collapse">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-3">Product</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3 text-center w-[20%]">Price</th>
          <th className="px-4 py-3 text-center">Stock</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {fetchedProducts.map((product) => (
          <tr
            key={product.id}
            className={`transition-colors ${
              product.isHidden ? "bg-gray-50 text-gray-400" : "hover:bg-gray-50"
            }`}
          >
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
                    // onClick={() => handleUnHide(product.id)}
                    className="text-[#8B4513] cursor-pointer hover:scale-110 transition-transform"
                    title="Unhide"
                  />
                ) : (
                  <FaRegEyeSlash
                    // onClick={() => handleHide(product.id)}
                    className="text-[#8B4513] cursor-pointer hover:scale-110 transition-transform"
                    title="Hide"
                  />
                )}
                <button
                  // onClick={() => initEdit(product)}
                  className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-transform hover:scale-105"
                  title="Edit"
                >
                  <MdOutlineEdit size={18} className="text-[#8B4513]" />
                </button>
                <button
                  // onClick={() => initDelete(product)}
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
      </div>
      </div>

      {showModal && (
        <AddProductModal
          setShowModal={setShowModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          editing={editing}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default InventoryPage;
