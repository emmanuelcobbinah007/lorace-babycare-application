"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { SearchNormal } from "iconsax-reactjs";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";

import AddSubCategoryModal from "@/app/components/ui/admin/subCategory/AddSubCategoryModal";

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [subCategories, setSubCategories] = useState<
    {
      id: string;
      name: string;
      description: string;
      isHidden: boolean;
      category: { name: string };
    }[]
  >([]);
  const [filteredSubCategories, setFilteredSubCategories] =
    useState(subCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_BASE_URL}/api/subcategories`
        );
        const data = response.data;

        setSubCategories(data);
        setFilteredSubCategories(data); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = subCategories.filter(
      (subCategory) =>
        subCategory.name.toLowerCase().includes(value) ||
        subCategory.category.name.toLowerCase().includes(value)
    );

    setFilteredSubCategories(filtered);
  };

  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  interface SubCategory {
    id: string;
    name: string;
    description: string;
    isHidden: boolean;
    category: {
      name: string;
    };
  }

  const updateSubCategoryVisibility = (id: string, isHidden: boolean) => {
    const updated = subCategories.map((subCat) =>
      subCat.id === id ? { ...subCat, isHidden } : subCat
    );
    setSubCategories(updated);
    setFilteredSubCategories(
      updated.filter(
        (subCategory) =>
          subCategory.name.toLowerCase().includes(searchTerm) ||
          subCategory.category.name.toLowerCase().includes(searchTerm)
      )
    );
  };

  const initHide = async (subCategory: SubCategory): Promise<void> => {
    try {
      const response = await axios.patch(
        `${NEXT_PUBLIC_BASE_URL}/api/subcategories/${subCategory.id}`,
        { hiddenContent: true },
        { withCredentials: true }
      );

      updateSubCategoryVisibility(subCategory.id, true);
      toast.success(response.data.message || "Category hidden!");
    } catch (error) {
      toast.error("Failed to hide category. Please try again.");
    }
  };

  const initUnHide = async (subCategory: SubCategory): Promise<void> => {
    try {
      const response = await axios.patch(
        `${NEXT_PUBLIC_BASE_URL}/api/subcategories/${subCategory.id}`,
        { hiddenContent: false },
        { withCredentials: true }
      );

      updateSubCategoryVisibility(subCategory.id, false);
      toast.success(response.data.message || "Category unhidden!");
    } catch (error) {
      toast.error("Failed to unhide category. Please try again.");
    }
  };

  const initEdit = async (id: string) => {
    handleOpen();
    setEditId(id);
    setEditing(true);
  };

  const initDelete = async (subCategory: SubCategory) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        htmlContainer: "font-poppins",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${NEXT_PUBLIC_BASE_URL}/api/subcategories/${subCategory.id}`,
            { withCredentials: true }
          );

          Swal.fire({
            title: "Deleted!",
            text: "Your subcategory has been deleted.",
            icon: "success",
            customClass: {
              htmlContainer: "font-poppins",
            },
          });

          // Update both states
          const updated = subCategories.filter(
            (subCat) => subCat.id !== subCategory.id
          );
          setSubCategories(updated);
          setFilteredSubCategories(
            updated.filter(
              (subCat) =>
                subCat.name.toLowerCase().includes(searchTerm) ||
                subCat.category.name.toLowerCase().includes(searchTerm)
            )
          );
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete subcategory. Please try again.",
            icon: "error",
            customClass: {
              htmlContainer: "font-poppins",
            },
          });
        }
      }
    });
  };

  return (
    <AdminLayout>
      <div className="block md:flex w-full h-screen bg-[#f2fbfe]">
        <div className="w-[22.5%] bg-amber-950 hidden md:block"></div>
        <ToastContainer />
        <div className="mx-auto w-[90%]">
          <div className="my-8 mx-auto px-8 w-full flex flex-row md:items-center justify-between gap-4">
            <h1 className="pl-8 text-xl font-semibold text-gray-800">
              Subcategories
            </h1>

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
              className="bg-[#b970a0] hover:bg-[#874f7a] duration-300 text-white px-3 py-2 rounded-md shadow flex items-center space-x-2"
              onClick={handleOpen}
            >
              <IoMdAdd className="mx-auto md:mr-1 text-lg font-bold" />
              <span className="hidden sm:inline">Create Subcategory</span>
            </button>
          </div>

          {/* Search Bar */}
          {/*TODO: Uncomment this out for mobile view */}
          {/* <div className="w-[90%] mx-auto mb-6">
            <input
              type="text"
              placeholder="Search by subcategory or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] text-gray-700 placeholder-gray-400"
            />
          </div> */}

          <div>
            {" "}
            {loading ? (
              <div className="flex items-center justify-center h-[80vh]">
                <FadeLoader color="#dcaed0" height={10} width={5} />
              </div>
            ) : filteredSubCategories.length > 0 ? (
              <div className="w-[90%] mx-auto mt-10">
                <div className="overflow-x-auto rounded-2xl shadow-md">
                  <table className="w-full min-w-[600px] table-auto text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-center w-[25%]">Subcategory</th>
                        <th className="px-4 py-3 text-center w-[50%]">Category</th>
                        <th className="px-4 py-3 text-center w-[25%]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubCategories.map((subCategory) => (
                        <tr
                          key={subCategory.id}
                          className={`transition-colors ${
                            subCategory.isHidden
                              ? "bg-gray-50 text-gray-400"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3 text-center">{subCategory.name}</td>
                          <td className="px-4 py-3 text-center">{subCategory.category.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              {subCategory.isHidden ? (
                                <FaRegEye
                                  onClick={() => initUnHide(subCategory)}
                                  className="text-[#4fb3e5] cursor-pointer hover:scale-110 transition-transform"
                                  title="Unhide"
                                />
                              ) : (
                                <FaRegEyeSlash
                                  onClick={() => initHide(subCategory)}
                                  className="text-[#4fb3e5] cursor-pointer hover:scale-110 transition-transform"
                                  title="Hide"
                                />
                              )}
                              <button
                                onClick={() => initEdit(subCategory.id)}
                                className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-transform hover:scale-105"
                                title="Edit"
                              >
                                <MdOutlineEdit
                                  size={18}
                                  className="text-[#4fb3e5]"
                                />
                              </button>
                              <button
                                onClick={() => initDelete(subCategory)}
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
                  No Subcategories Found
                </h2>
                <p className="text-gray-500">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <AddSubCategoryModal
            subCategories={subCategories}
            editing={editing}
            editId={editId}
            setEditing={setEditing}
            setShowModal={setShowModal}
            animateModal={animateModal}
            setAnimateModal={setAnimateModal}
            setSubCategories={setSubCategories}
            setFilteredSubCategories={setFilteredSubCategories}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default page;
