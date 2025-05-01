"use client";

import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddProductModal from "./AddProductModal";

const InventoryPage = () => {
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

  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  return (
    <div>
      <div>
        <div className="my-8 mx-auto w-[90%] flex justify-between items-center">
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
        {/* <div className="w-[90%] mx-auto mt-10">
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
        {products.map((product) => (
          <tr
            key={product.id}
            className={`transition-colors ${
              product.isHidden ? "bg-gray-50 text-gray-400" : "hover:bg-gray-50"
            }`}
          >
            <td className="px-4 py-3">{product.name}</td>
            <td className="px-4 py-3">
              {product.description.length > 75
                ? `${product.description.substring(0, 75)}...`
                : product.description}
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
                    className="text-[#8B4513] cursor-pointer hover:scale-110 transition-transform"
                    title="Unhide"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => handleHide(product.id)}
                    className="text-[#8B4513] cursor-pointer hover:scale-110 transition-transform"
                    title="Hide"
                  />
                )}
                <button
                  onClick={() => initEdit(product)}
                  className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-transform hover:scale-105"
                  title="Edit"
                >
                  <MdOutlineEdit size={18} className="text-[#8B4513]" />
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
</div> */}
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
