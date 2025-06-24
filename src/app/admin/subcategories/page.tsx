"use client";

import React, { useState, useMemo } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { SearchNormal } from "iconsax-reactjs";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";

import AddSubCategoryModal from "@/app/components/ui/admin/subCategory/AddSubCategoryModal";
import { useSubCategories, useUpdateSubCategoryVisibility, useDeleteSubCategory } from "../../hooks/useSubCategories";

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const { data: subCategories = [], isLoading, error } = useSubCategories();
  const updateVisibilityMutation = useUpdateSubCategoryVisibility();
  const deleteSubCategoryMutation = useDeleteSubCategory();

  const filteredSubCategories = useMemo(() => {
    if (!searchTerm) return subCategories;
    
    return subCategories.filter(
      (subCategory) =>
        subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subCategory.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subCategories, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

  const initHide = async (subCategory: SubCategory): Promise<void> => {
    updateVisibilityMutation.mutate({
      id: subCategory.id,
      data: { hiddenContent: true }
    });
  };

  const initUnHide = async (subCategory: SubCategory): Promise<void> => {
    updateVisibilityMutation.mutate({
      id: subCategory.id,
      data: { hiddenContent: false }
    });
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
        deleteSubCategoryMutation.mutate(subCategory.id, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your subcategory has been deleted.",
              icon: "success",
              customClass: {
                htmlContainer: "font-poppins",
              },
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete subcategory. Please try again.",
              icon: "error",
              customClass: {
                htmlContainer: "font-poppins",
              },
            });
          }
        });
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
            <h1 className=" text-xl font-semibold text-gray-800">
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
          <div className="block md:hidden w-[90%] mx-auto mb-6">
            <input
              type="text"
              placeholder="Search by subcategory or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] text-gray-700 placeholder-gray-400"
            />
          </div>          <div>
            {isLoading ? (
              <div className="flex items-center justify-center h-[80vh]">
                <FadeLoader color="#dcaed0" height={10} width={5} />
              </div>
            ) : error ? (
              <div className="w-[90%] mx-auto mt-8">
                <h2 className="text-md font-semibold text-gray-800">
                  Error Loading Subcategories
                </h2>
                <p className="text-gray-500">
                  Failed to load subcategories. Please try again.
                </p>
              </div>
            ) : filteredSubCategories.length > 0 ? (
              <div className="w-[90%] mx-auto mt-10">
                <div className="overflow-x-auto rounded-2xl shadow-md">
                  <table className="w-full min-w-[400px] table-auto text-sm text-left border-collapse">
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
                                  className={`text-[#4fb3e5] cursor-pointer hover:scale-110 transition-transform ${
                                    updateVisibilityMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                  title="Unhide"
                                />
                              ) : (
                                <FaRegEyeSlash
                                  onClick={() => initHide(subCategory)}
                                  className={`text-[#4fb3e5] cursor-pointer hover:scale-110 transition-transform ${
                                    updateVisibilityMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
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
                                className={`p-2 rounded-lg bg-red-500 text-white shadow-sm hover:bg-red-600 transition-transform hover:scale-105 ${
                                  deleteSubCategoryMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                title="Delete"
                                disabled={deleteSubCategoryMutation.isPending}
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
                  {searchTerm ? 'Please try a different search term.' : 'Please add a subcategory.'}
                </p>
              </div>
            )}
          </div>
        </div>        {showModal && (
          <AddSubCategoryModal
            editing={editing}
            editId={editId}
            setEditing={setEditing}
            setShowModal={setShowModal}
            animateModal={animateModal}
            setAnimateModal={setAnimateModal}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default page;
