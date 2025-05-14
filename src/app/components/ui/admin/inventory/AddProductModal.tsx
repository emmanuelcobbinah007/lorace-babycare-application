"use client";

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import AddImagesModal from "./AddImagesModal";

interface ProductFormValues {
  productName: string;
  productDescriptionShort: string;
  productDescriptionLong: string;
  productPrice: number | string;
  productStock: number | string;
  subCategoryID: string;
  sizingType: string;
}

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const AddProductModal = ({
  setShowModal,
  animateModal,
  setAnimateModal,
  editing,
  setEditing,
}: {
  setShowModal: (show: boolean) => void;
  animateModal: boolean;
  setAnimateModal: (animate: boolean) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}) => {
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [product, setProduct] = useState<{
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
  }>({
    id: "",
    name: "",
    descriptionShort: "",
    descriptionLong: "",
    price: 0,
    stock: 0,
    isHidden: false,
    sizingType: "",
    categoryId: "",
    subCategoryId: "",
    salePercent: 0,
  });
  const [animateModal2, setAnimateModal2] = useState(false);

  const [productName, setProductName] = useState("");
  const [productDescriptionShort, setProductDescriptionShort] = useState("");
  const [productDescriptionLong, setProductDescriptionLong] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [productStock, setProductStock] = useState(0);
  const [subCategoryID, setSubCategoryID] = useState("");
  const [sizingType, setSizingType] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subCategories, setSubCategories] = useState<
    { id: string; name: string; categoryId: string }[]
  >([]);

  useEffect(() => {
    // Fetch subcategories based on selected categoryID
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_BASE_URL}/api/subcategories`
        );
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSubmit = async (values: ProductFormValues) => {
    // Handle form submission logic here
    try {
      const selectedSubCategory = subCategories.find(
        (subCategory) => subCategory.id === values.subCategoryID
      );

      const product = {
        ...values,
        isHidden,
        categoryID: selectedSubCategory ? selectedSubCategory.categoryId : "",
        salePercent: 0.0,
      };

      const response = await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/api/products`,
        product,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Product saved successfully");
      } else {
        toast.error("Error creating product");
      }

      setProduct(response.data.product);
      setAnimateModal2(true);
      setShowImagesModal(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.error("Product already exists");
        } else if (error.response.status === 401) {
          toast.error("Unauthorized");
        } else if (error.response.status === 500) {
          toast.error("Server error");
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleClose = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 300);
    setEditing(false);
    setProductName("");
    setProductDescriptionShort("");
    setProductDescriptionLong("");
    setProductPrice(0.0);
    setProductStock(0);
    setSubCategoryID("");
    setSizingType("");
    setIsHidden(false);
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
          </div>
          <Formik
            // TODO:
            initialValues={{
              productName,
              productDescriptionShort,
              productDescriptionLong,
              productPrice,
              productStock,
              subCategoryID,
              sizingType,
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
                    <option value="Footwear">Footwear</option>
                    <option value="Diapers">Diapers</option>
                    <option value="NA">N/A</option>
                  </Field>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 my-2 ${
                    submitting
                      ? "bg-[#aee3f9]"
                      : "bg-[#4fb3e5] hover:bg-[#3a92c5]"
                  }  w-full text-white rounded-2xl shadow-md transition duration-300`}
                >
                  Save, Proceed to Images
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {showImagesModal && (
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
