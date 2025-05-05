"use client";

import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AddProductModal = ({
    setShowModal, animateModal, setAnimateModal, editing, setEditing
}: {
    setShowModal: (show: boolean) => void;
    animateModal: boolean;
    setAnimateModal: (animate: boolean) => void;
    editing: boolean;
    setEditing: (editing: boolean) => void;
}) => {

    const [productName, setProductName] = useState("");
      const [productDescriptionShort, setProductDescriptionShort] = useState("");
      const [productDescriptionLong, setProductDescriptionLong] = useState("");
      const [productPrice, setProductPrice] = useState(0.0);
      const [productStock, setProductStock] = useState(0);
      const [categoryID, setcategoryID] = useState("");
      const [subCategoryID, setSubCategoryID] = useState("");
      const [sizingType, setSizingType] = useState('');
      const [isHidden, setIsHidden] = useState(true);
      const [productImageUrl, setProductImageUrl] = useState<File | null>(null);

  const categories = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
  ];
  
  // TODO: types
    interface ProductFormValues {
        productName: string;
        productDescriptionShort: string;
        productDescriptionLong: string;
        productPrice: number | string;
        productStock: number | string;
        categoryID: string;
        subCategoryID: string;
        sizingType: string;
        productImageUrl: File | null;
    }

    const handleSubmit = (values: ProductFormValues): void => {
        // Handle form submission logic here
        const product = {
            ...values,
            isHidden,

        }
        console.log(values);
        // Close the modal after submission
        handleClose();
    }

    const handleClose = () => {
        setAnimateModal(false);
        setTimeout(() => setShowModal(false), 300);
        setEditing(false);
        setProductName("");
        setProductDescriptionShort("");
        setProductDescriptionLong("");
        setProductPrice(0.0);
        setProductStock(0);
        setcategoryID("");
        setSubCategoryID("");
        setProductImageUrl(null);
        setSizingType('');
        setIsHidden(false);
      };

  return (
    <div>
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
            className={`fixed right-0 top-0 h-full bg-white w-[300px] md:w-[400px] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-300 ease-in-out ${
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
            </div>
            <Formik
            // TODO:
              initialValues={{
                productName,
                productDescriptionShort,
                productDescriptionLong,
                productPrice,
                productStock,
                categoryID,
                subCategoryID,
                sizingType,
                productImageUrl,
              }}
              validationSchema={Yup.object({
                productName: Yup.string().required('Product name is required'),
                productDescriptionShort: Yup.string().required('Provide a brief product description'),
                productPrice: Yup.number().required('Price is required').positive('Price must be positive'),
                productStock: Yup.number().required('Stock is required').min(0, 'Stock cannot be negative'),
                categoryID: Yup.string().required('Category is required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
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
                      <div className="text-red-500 text-sm">{errors.productName}</div>
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
                      rows="3"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                      placeholder="Enter brief product description"
                    />
                    {errors.productDescriptionShort && touched.productDescriptionShort && (
                      <div className="text-red-500 text-sm">{errors.productDescriptionShort}</div>
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
                    {errors.productDescriptionLong && touched.productDescriptionLong && (
                      <div className="text-red-500 text-sm">{errors.productDescriptionLong}</div>
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
                      <div className="text-red-500 text-sm">{errors.productPrice}</div>
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
                      <div className="text-red-500 text-sm">{errors.productStock}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="categoryID"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <Field
                      as="select"
                      id="categoryID"
                      name="categoryID"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    {errors.categoryID && touched.categoryID && (
                      <div className="text-red-500 text-sm">{errors.categoryID}</div>
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
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    {errors.subCategoryID && touched.subCategoryID && (
                      <div className="text-red-500 text-sm">{errors.subCategoryID}</div>
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
                      <option value="clothing">Clothing</option>
                      <option value="footwear">Footwear</option>
                      <option value="diapers">Diapers</option>
                      <option value="n/a">N/A</option>
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="productImage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Image
                    </label>
                    {values.productImageUrl && (
                      <img
                        src={values.productImageUrl instanceof File ? URL.createObjectURL(values.productImageUrl) : ""}
                        alt="Product"
                        className="w-full h-auto mb-4 rounded-md shadow"
                      />
                    )}
                    <input
                      type="file"
                      id="productImage"
                      accept="image/*"
                      onChange={(event) => {
                        if (event.currentTarget.files && event.currentTarget.files[0]) {
                          setFieldValue('productImage', event.currentTarget.files[0]);
                        }
                      }}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mx-auto text-white px-4 py-2 rounded-md shadow  focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#4fb3e5] hover:cursor-none hover:bg-[#874f7a] duration-300  md:w-auto flex items-center space-x-2"
                  >
                    Save Product
                  </button>
                </Form>
              )}
            </Formik>


          </div>
        </div>
    </div>
  )
}

export default AddProductModal