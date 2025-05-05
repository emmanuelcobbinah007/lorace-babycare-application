"use client";

import React, {useState, useEffect} from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";

import AddSubCategoryModal from "@/app/components/ui/admin/subCategory/AddSubCategoryModal";

const page = () => {
    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);

    const handleOpen = () => {
      setShowModal(true);
      setTimeout(() => setAnimateModal(true), 10);
    };

  return (
    <AdminLayout>
      <div className='flex'>
      <div className='w-[22.5%] bg-amber-950'></div>
        <div className="my-8 px-8 mx-auto w-[90%] flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Subcategories</h1>
          <button
            // onClick={handleOpen}
            className="bg-[#b970a0] hover:cursor-none hover:bg-[#874f7a] duration-300 text-white px-3 py-2 rounded-md shadow md:w-auto flex items-center space-x-2"
            onClick={handleOpen}
          >
            <IoMdAdd className="sm:mr-2 text-lg font-bold" />
            <span className="hidden sm:inline">Create Subcategory</span>
          </button>
        </div>

        {showModal && (
          <AddSubCategoryModal 
          setShowModal={setShowModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}/>
        )}
      </div>
    </AdminLayout>
  );
};

export default page;
