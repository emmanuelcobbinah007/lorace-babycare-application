import React from 'react'
import { CloseCircle } from 'iconsax-reactjs';

interface CartModalProps {
    handleClose: () => void,
    animateModal: boolean,
}

const CartModal: React.FC<CartModalProps> = ({handleClose, animateModal}) => {
  return (
    <div className="fixed inset-0 z-[60] flex font-poppins">
          {/* Overlay */}
          <div
            className={`fixed inset-0 transition-opacity ${
              animateModal
                ? "opacity-70 bg-[#000] duration-300"
                : "opacity-0 bg-[#000] duration-300"
            }`}
            onClick={handleClose}
          ></div>

          {/* Sidebar */}
          <div
            className={`fixed right-0 top-0 h-full bg-white w-full md:w-[40%] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-800 ease-initial ${
              animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4 w-full">
              <h2 className="text-xl font-semibold text-[#3474c0] flex-1 text-left">
                Cart
              </h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-200 transition duration-200"
                aria-label="Close"
              >
                <CloseCircle color="#3474c0" size={24} />
              </button>
            </div>
          </div>
        </div>
  )
}

export default CartModal