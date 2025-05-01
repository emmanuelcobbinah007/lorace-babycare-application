import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { IoPricetagsOutline } from "react-icons/io5";

const page = () => {
  return (
    <AdminLayout>
    <div>
            <div className="my-8 mx-auto w-[90%] flex justify-between items-center">
                  <h1 className="text-xl font-semibold text-gray-800">
                    Manage Sales
                  </h1>
                  <button
                    // onClick={handleOpen}
                    className="bg-[#b970a0] hover:cursor-none hover:bg-[#874f7a] duration-300 text-white px-3 py-2 rounded-md shadow md:w-auto flex items-center space-x-2"
                    >
                    <IoPricetagsOutline  className="sm:mr-2 text-lg font-bold" />
                    <span className="hidden sm:inline">Create New Sale</span>
                  </button>
                </div>
            </div>
    </AdminLayout>
  )
}

export default page