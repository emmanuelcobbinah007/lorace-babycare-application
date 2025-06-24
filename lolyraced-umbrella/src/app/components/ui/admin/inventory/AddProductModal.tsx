"use client";

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

import AddImagesModal from "./AddImagesModal";
import { useSubCategories } from "../../../../hooks/useCategories";
import {
  useCreateProduct,
  useUpdateProduct,
} from "../../../../hooks/useProducts";
import {
  Product,
  CreateProductData,
  UpdateProductData,
} from "../../../../api/products/productApi";

interface ProductFormValues {
  productName: string;
  productDescriptionShort: string;
  productDescriptionLong: string;
  productPrice: number | string;
  productStock: number | string;
  subCategoryID: string;
  sizingType: string;
  isHidden: boolean;
}

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const AddProductModal = ({
  setShowModal,
  animateModal,
  setAnimateModal,
  editing,
  setEditing,
  editingProduct,
}: {
  setShowModal: (show: boolean) => void;
  animateModal: boolean;
  setAnimateModal: (animate: boolean) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  editingProduct: Product | null;
}) => {
  // TanStack Query hooks
  const { data: subCategories = [] } = useSubCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [animateModal2, setAnimateModal2] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      setSubmitting(true);
      const selectedSubCategory = subCategories.find(
        (subCategory) => subCategory.id === values.subCategoryID
      );

      if (editing && editingProduct) {
        // Update existing product
        const updateData: UpdateProductData = {
          name: values.productName,
          descriptionShort: values.productDescriptionShort,
          descriptionLong: values.productDescriptionLong,
          price: Number(values.productPrice),
          stock: Number(values.productStock),
          subCategoryId: values.subCategoryID,
          categoryId: selectedSubCategory ? selectedSubCategory.categoryId : "",
          sizingType: values.sizingType,
          isHidden: values.isHidden,
        };

        const response = await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          data: updateData,
        });

        // console.log(response);

        toast.success("Product updated successfully");
        setTimeout(() => {
          handleClose();
          // Don't reload the page as TanStack Query handles cache updates
        }, 2000);
      } else {
        // Create new product
        const createData: CreateProductData = {
          name: values.productName,
          descriptionShort: values.productDescriptionShort,
          descriptionLong: values.productDescriptionLong,
          price: Number(values.productPrice),
          stock: Number(values.productStock),
          subCategoryId: values.subCategoryID,
          categoryId: selectedSubCategory ? selectedSubCategory.categoryId : "",
          sizingType: values.sizingType,
          isHidden: values.isHidden,
        };

        const newProduct = await createProductMutation.mutateAsync(createData);
        toast.success("Product saved successfully");
        // console.log("New product created:", newProduct);
        setProduct(newProduct);
        // console.log("Product state saved:", product);
        setAnimateModal2(true);
        setShowImagesModal(true);
        // console.log("Product created:", createData);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      if (editing) {
        toast.error("Failed to update product");
      } else {
        toast.error("Failed to create product");
      }
    } finally {
      setSubmitting(false);
    }
  };
  const handleClose = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 300);
    setEditing(false);
    setProduct(null);
  };

  return (
    <div>
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
        theme="light"
      />
      <div className="fixed inset-0 z-50 flex font-poppins">
        {/* Overlay */}
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${
            animateModal
              ? "bg-white/30 backdrop-blur-md"
              : "bg-transparent backdrop-blur-0"
          }`}
          onClick={handleClose}
        ></div>
        {/* Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full bg-white w-[300px] md:w-[400px] shado</div>w-lg p-6 overflow-y-auto z-10 transform transition-transform duration-300 ease-in-out ${
            animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {editing ? "Edit Product" : "Add Product"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <IoClose size={24} />
            </button>
          </div>{" "}
          <Formik
            enableReinitialize
            initialValues={{
              productName: editing && editingProduct ? editingProduct.name : "",
              productDescriptionShort:
                editing && editingProduct
                  ? editingProduct.descriptionShort
                  : "",
              productDescriptionLong:
                editing && editingProduct ? editingProduct.descriptionLong : "",
              productPrice:
                editing && editingProduct ? editingProduct.price : 0,
              productStock:
                editing && editingProduct ? editingProduct.stock : 0,
              subCategoryID:
                editing && editingProduct ? editingProduct.subCategoryId : "",
              sizingType:
                editing && editingProduct
                  ? editingProduct.sizingType
                  : "Clothing",
              isHidden:
                editing && editingProduct ? editingProduct.isHidden : false,
            }}
            validationSchema={Yup.object({
              productName: Yup.string().required("Product name is required"),
              productDescriptionShort: Yup.string().required(
                "Provide a brief product description"
              ),
              productDescriptionLong: Yup.string().required(
                "Provide a product description"
              ),
              productPrice: Yup.number()
                .required("Price is required")
                .positive("Price must be positive"),
              productStock: Yup.number()
                .required("Stock is required")
                .min(0, "Stock cannot be negative"),
              subCategoryID: Yup.string().required("SubCategory is required"),
              sizingType: Yup.string().required("Sizing type is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <Field
                    type="text"
                    id="productName"
                    name="productName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                    placeholder="Enter product name"
                  />
                  {errors.productName && touched.productName && (
                    <div className="text-red-500 text-sm">
                      {errors.productName}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productDescriptionShort"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brief Description
                  </label>
                  <Field
                    as="textarea"
                    id="productDescriptionShort"
                    name="productDescriptionShort"
                    rows="2"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                    placeholder="Enter brief product description"
                  />
                  {errors.productDescriptionShort &&
                    touched.productDescriptionShort && (
                      <div className="text-red-500 text-sm">
                        {errors.productDescriptionShort}
                      </div>
                    )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productDescriptionLong"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Detailed Description
                  </label>
                  <Field
                    as="textarea"
                    id="productDescriptionLong"
                    name="productDescriptionLong"
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                    placeholder="Enter brief product description"
                  />
                  {errors.productDescriptionLong &&
                    touched.productDescriptionLong && (
                      <div className="text-red-500 text-sm">
                        {errors.productDescriptionLong}
                      </div>
                    )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <Field
                    type="number"
                    step="0.05"
                    id="productPrice"
                    name="productPrice"
                    min="0"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                    placeholder="Enter product price"
                  />
                  {errors.productPrice && touched.productPrice && (
                    <div className="text-red-500 text-sm">
                      {errors.productPrice}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productStock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stock
                  </label>
                  <Field
                    type="number"
                    id="productStock"
                    name="productStock"
                    min="0"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                    placeholder="Enter product stock"
                  />
                  {errors.productStock && touched.productStock && (
                    <div className="text-red-500 text-sm">
                      {errors.productStock}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subCategoryID"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub-Category
                  </label>
                  <Field
                    as="select"
                    id="subCategoryID"
                    name="subCategoryID"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                  >
                    <option value="" disabled>
                      Select a sub-category
                    </option>
                    {subCategories.map((subCategory) => (
                      <option
                        key={subCategory.id}
                        value={subCategory.id}
                        data-category-id={subCategory.categoryId}
                      >
                        {subCategory.name}
                      </option>
                    ))}
                  </Field>
                  {errors.subCategoryID && touched.subCategoryID && (
                    <div className="text-red-500 text-sm">
                      {errors.subCategoryID}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="sizingType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Sizing Type
                  </label>
                  <Field
                    as="select"
                    id="sizingType"
                    name="sizingType"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="FootwearInfants">Footwear-Infants</option>
                    <option value="FootwearToddlers">Footwear-Toddlers</option>
                    <option value="FootwearChildren">Footwear-Children</option>
                    <option value="Diapers">Diapers</option>
                    <option value="NA">N/A</option>{" "}
                  </Field>
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <Field
                      type="checkbox"
                      name="isHidden"
                      className="mr-2 h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Hide product from store
                    </span>
                  </label>
                </div>{" "}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 my-2 ${
                    submitting
                      ? "bg-[#aee3f9]"
                      : "bg-[#4fb3e5] hover:bg-[#3a92c5]"
                  }  w-full text-white rounded-2xl shadow-md transition duration-300`}
                >
                  {editing ? "Save Changes" : "Save, Proceed to Images"}
                </button>
                {editing && editingProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      setProduct({
                        id: editingProduct.id,
                        name: editingProduct.name,
                        descriptionShort: editingProduct.descriptionShort,
                        descriptionLong: editingProduct.descriptionLong,
                        price: editingProduct.price,
                        stock: editingProduct.stock,
                        isHidden: editingProduct.isHidden,
                        sizingType: editingProduct.sizingType,
                        categoryId: editingProduct.categoryId,
                        subCategoryId: editingProduct.subCategoryId,
                        salePercent: editingProduct.salePercent,
                        category: editingProduct.category,
                        subCategory: editingProduct.subCategory,
                        images: editingProduct.images,
                        createdAt: editingProduct.createdAt,
                        updatedAt: editingProduct.updatedAt,
                      });
                      setAnimateModal2(true);
                      setShowImagesModal(true);
                    }}
                    className="px-4 py-2 my-2 bg-[#b970a0] hover:bg-[#a05d8c] w-full text-white rounded-2xl shadow-md transition duration-300"
                  >
                    Manage Product Images
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>{" "}
        {showImagesModal && product && (
          <AddImagesModal
            handleClose={handleClose}
            animateModal={animateModal2}
            setAnimateModal={setAnimateModal2}
            product={product}
            setShowModal={setShowImagesModal}
          />
        )}
      </div>
    </div>
  );
};

export default AddProductModal;
