"use client";

import React, { useState } from "react";
import { string } from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface AddImagesModalProps {
  handleClose: () => void;
  animateModal: boolean;
  setAnimateModal: (value: boolean) => void;
  product: {
    id: string;
    name: string;
    descriptionShort: string;
    descriptionLong: string;
    price: number;
    stock: number;
    isHidden: boolean;
    sizingType: string;
    categoryId: string;
    subCategoryId: string;
    salePercent: number;
  };
  setShowModal: (value: boolean) => void;
}
const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const AddImagesModal: React.FC<AddImagesModalProps> = ({
  handleClose,
  animateModal,
  setAnimateModal,
  product,
  setShowModal,
}) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [productImageUrl1, setProductImageUrl1] = useState<string | null>(null);
  const [productImageUrl2, setProductImageUrl2] = useState<string | null>(null);
  const [productImageUrl3, setProductImageUrl3] = useState<string | null>(null);

  interface CloudinaryResponse {
    secure_url: string;
  }

  interface HandleImageChangeProps {
    e: React.ChangeEvent<HTMLInputElement>;
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  }

  const handleImageChange = async ({
    e,
    setImageUrl,
  }: HandleImageChangeProps): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data: CloudinaryResponse = await response.json();
      console.log("Upload success:", data);
      setImageUrl(data.secure_url);
      imageList.push(data.secure_url);
      console.log("Image List: ", imageList);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = product.id;

    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/api/products/images`,
        {
          id,
          imageList,
        }
      );
      
      toast.success(response.data.message);
      handleClose();
      setAnimateModal(false);
      setTimeout(() => setShowModal(false), 300);
    } catch (error) {
      toast.error("Error saving images, please try again")
      console.error("Error saving images:", error);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-white w-[300px] md:w-[400px] shadow-lg p-6 overflow-y-auto z-[99] transform transition-transform duration-300 ease-in-out ${
        animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Add Images for {product.name}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="productImage1"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image 1
          </label>
          {productImageUrl1 && (
            <img
              src={productImageUrl1}
              alt="Product"
              className="w-full h-auto mb-4 rounded-md shadow"
            />
          )}
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={(e) =>
              handleImageChange({ e, setImageUrl: setProductImageUrl1 })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productImage2"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image 2
          </label>
          {productImageUrl2 && (
            <img
              src={productImageUrl2}
              alt="Product"
              className="w-full h-auto mb-4 rounded-md shadow"
            />
          )}
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={(e) =>
              handleImageChange({ e, setImageUrl: setProductImageUrl2 })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productImage3"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image 3
          </label>
          {productImageUrl3 && (
            <img
              src={productImageUrl3}
              alt="Product"
              className="w-full h-auto mb-4 rounded-md shadow"
            />
          )}
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={(e) =>
              handleImageChange({ e, setImageUrl: setProductImageUrl3 })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#4fb3e5] hover:bg-[#3a92c5] text-white px-4 py-2 rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Save Images
        </button>
        {/* <button
                  type="submit"
                  //disabled={isSubmitting}
                  className={`px-4 py-2 my-2 ${
                    submitting
                      ? "bg-[#aee3f9]"
                      : "bg-[#4fb3e5] hover:bg-[#3a92c5]"
                  }  w-full text-white rounded-2xl shadow-md transition duration-300`}
                >
                  Save, Proceed to Images
                </button> */}
      </form>
    </div>
  );
};

export default AddImagesModal;
