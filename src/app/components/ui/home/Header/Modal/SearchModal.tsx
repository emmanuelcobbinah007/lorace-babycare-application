import React from "react";
import { CloseCircle } from "iconsax-reactjs";
import { IoMdClose } from "react-icons/io";

interface SearchModalProps {
  handleClose: () => void;
  animateModal: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({
  handleClose,
  animateModal,
}) => {
  return (
    <div className="fixed inset-0 z-[999] flex font-poppins">
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
        className={`fixed top-0 bg-white w-full h-[50%] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-500 ease-initial ${
          animateModal ? "translate-y-0 opacity-100" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 w-[90%] mx-auto border-b-2 border-gray-100 pb-4">
          
          {/* Add a search bar */}
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-4 py-2 w-[70%]"
              style={{ }}
            />
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition duration-200 transform hover:rotate-180"
            aria-label="Close"
          >
            <IoMdClose color="#000" size={24} />
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
