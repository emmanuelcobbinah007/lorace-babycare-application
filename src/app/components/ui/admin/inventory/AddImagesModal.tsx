"use client";

import React, { useState, useEffect } from "react";
import { string } from "yup";
import { toast, ToastContainer } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import {
  useProductImages,
  useUploadProductImage,
  useDeleteProductImage,
} from "../../../../hooks/useProducts";
import { ProductImage } from "../../../../api/products/productApi";

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

interface CloudinaryResponse {
  secure_url: string;
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
  // TanStack Query hooks
  const { data: existingImages = [], isLoading } = useProductImages(product.id);
  const uploadImageMutation = useUploadProductImage();
  const deleteImageMutation = useDeleteProductImage();

  const [imageList, setImageList] = useState<string[]>([]);
  const [productImageUrl1, setProductImageUrl1] = useState<string | null>(null);
  const [productImageUrl2, setProductImageUrl2] = useState<string | null>(null);
  const [productImageUrl3, setProductImageUrl3] = useState<string | null>(null);

  interface HandleImageChangeProps {
    e: React.ChangeEvent<HTMLInputElement>;
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  }

  useEffect(() => {
    console.log("Product in Add Image Modal: ", product);
  }, [])

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
      setImageUrl(data.secure_url);
      setImageList([...imageList, data.secure_url]);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };
  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteImageMutation.mutateAsync(imageId);
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageList.length === 0) {
      toast.info("No new images to upload");
      return;
    }

    console.log("Product Id before push to backend: ", product.id);

    try {
      // Upload each image individually using the TanStack Query mutation
      for (const imageUrl of imageList) {
        await uploadImageMutation.mutateAsync({
          productId: product.id,
          imageUrl,
        });
      }

      toast.success("Images uploaded successfully!");
      setImageList([]);
      setProductImageUrl1(null);
      setProductImageUrl2(null);
      setProductImageUrl3(null);

      // handleClose();
    } catch (error) {
      toast.error("Error saving images, please try again");
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
        pauseOnHover
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Manage Images for {product.name}
        </h2>
        <button
          onClick={() => {
            setAnimateModal(false);
            setTimeout(() => setShowModal(false), 300);
          }}
          className="text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* Existing Images Section */}
      <div className="mb-8">
        <h3 className="font-medium text-lg mb-4 text-gray-700 border-b pb-2">
          Current Images
        </h3>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading images...</p>
        ) : existingImages.length === 0 ? (
          <p className="text-gray-500 text-sm">No images uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {existingImages.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.url}
                  alt="Product"
                  className="w-full h-auto rounded-lg shadow-md mb-2"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md"
                  title="Delete Image"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Add New Images Section */}
      <h3 className="font-medium text-lg mb-4 text-gray-700">Add New Images</h3>
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
            id="productImage1"
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
            id="productImage2"
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
            id="productImage3"
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
          Upload New Images
        </button>
      </form>
    </div>
  );
};

export default AddImagesModal;
