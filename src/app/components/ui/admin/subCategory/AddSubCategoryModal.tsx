"use client";

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000"

const AddSubCategoryModal = ({
  setShowModal,
  animateModal,
  setAnimateModal,
}: {
  setShowModal: (show: boolean) => void;
  animateModal: boolean;
  setAnimateModal: (animate: boolean) => void;
}) => {
  interface SubCategoryFormValues {
    subCategoryName: string;
    categoryId: string;
  }

  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/category`);
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    fetchCategories();
  }, [])

  const handleClose = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 300);
  };

  const handleSubmit = async (values: SubCategoryFormValues) => {
    const subCategoryItem = {
        name: values.subCategoryName.trim(),
        categoryId: values.categoryId,
    };

    try {
        const res = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/subcategories`, subCategoryItem);

        if (res.status === 201) {
            toast.success("Subcategory created successfully");
            handleClose();
        } else {
            toast.error(res.status === 409 
                ? "Subcategory already exists under the selected category" 
                : "Unexpected error occurred. Please try again."
            );
        }
    } catch (error: any) {
        toast.error(error.response?.status === 409 
            ? "Subcategory already exists under the selected category" 
            : "Server error. Please try again later."
        );
    } finally {
        values.subCategoryName = "";
        values.categoryId = "";
    }

  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex font-poppins">
        {/* Overlay */}
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${
            animateModal
              ? "bg-black/30 backdrop-blur-sm"
              : "bg-transparent backdrop-blur-0"
          }`}
          onClick={handleClose}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full bg-white w-[90%] md:w-[400px] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-300 ease-in-out ${
            animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Add Subcategory
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 transition duration-200"
            >
              <IoClose size={24} />
            </button>
          </div>
          <Formik
            initialValues={{
              subCategoryName,
              categoryId,
            }}
            validationSchema={Yup.object({
              subCategoryName: Yup.string().required(
                "Subcategory name is required"
              ),
              categoryId: Yup.string().required("Please pick a category"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Subcategory Name */}
                <div className="mb-4">
                  <label
                    htmlFor="subCategoryName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subcategory Name
                  </label>
                  <Field
                    name="subCategoryName"
                    type="text"
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.subCategoryName && touched.subCategoryName
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg shadow-sm focus:ring-[#4fb3e5] focus:border-[#4fb3e5] sm:text-sm`}
                    placeholder="Enter subcategory name"
                  />
                  {errors.subCategoryName && touched.subCategoryName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.subCategoryName}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <Field
                    as="select"
                    name="categoryId"
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.categoryId && touched.categoryId
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg shadow-sm focus:ring-[#4fb3e5] focus:border-[#4fb3e5] sm:text-sm`}
                  >
                    <option value="" label="Select a category" />
                    {categories.map((category: { id: string; name: string }) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  {errors.categoryId && touched.categoryId && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.categoryId}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 my-2 bg-[#4fb3e5] w-full text-white rounded-2xl shadow-md hover:bg-[#3a92c5] transition duration-300"
                  >
                    Add Subcategory
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;