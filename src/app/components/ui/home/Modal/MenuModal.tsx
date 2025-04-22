import React from 'react'
import { IoMdClose } from "react-icons/io";


interface MenuModalProps {
    handleClose: () => void,
    animateModal: boolean,
}

const MenuModal: React.FC<MenuModalProps> = ({handleClose, animateModal}) => {
  return (
    <div className="fixed inset-0 z-[60] flex font-poppins">
          {/* Overlay */}
          <div
            className={`fixed inset-0 transition-opacity duration-300 ${
              animateModal
                ? "opacity-70 bg-[#000] duration-300"
                : "opacity-0 bg-[#000] duration-300"
            }`}
            onClick={handleClose}
          ></div>

          {/* Sidebar */}
          <div
            className={`fixed left-0 top-0 h-full bg-white w-full md:w-[400px] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-800 ease-initial ${
              animateModal ? "translate-x-0 opacity-100" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4 w-full border-b-2 border-gray-100 pb-4">
              <h2 className="text-xl font-[400] flex-1 text-left">
                Menu
              </h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-200 transition duration-200"
                aria-label="Close"
              >
                <IoMdClose color="#000" size={24} />
              </button>
            </div>
            <ul className='text-md flex flex-col gap-4 text-black font-[500] text-base'>
                <li className="font-[600] flex-1 text-left  border-b-2 border-gray-100 pb-4" onClick={handleClose}>Store</li>
                <li className="font-[600] flex-1 text-left  border-b-2 border-gray-100 pb-4" onClick={handleClose}>Food</li>
                <li className="font-[600] flex-1 text-left  border-b-2 border-gray-100 pb-4" onClick={handleClose}>Clothing</li>
                <li className="font-[600] flex-1 text-left  border-b-2 border-gray-100 pb-4" onClick={handleClose}>Accessories</li>
                <li className="font-[600] flex-1 text-left  border-b-2 border-gray-100 pb-4" onClick={handleClose}>Footwear</li>
                <li className="font-[600] flex-1 text-left  border-b-2 border-gray-100 pb-4" onClick={handleClose}>For Mum</li>
            </ul>
          </div>
        </div>
  )
}

export default MenuModal