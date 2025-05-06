import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { ArrowDown2, ArrowRight2 } from "iconsax-reactjs";
import { User } from "iconsax-reactjs";

import UserModal from './UserModal';

interface MenuModalProps {
  handleClose: () => void;
  animateModal: boolean;
}

const MenuModal: React.FC<MenuModalProps> = ({ handleClose, animateModal }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [animatedModal, setAnimatedModal] = useState(false);
     const [showUserModal, setShowUserModal] = useState(false);

  const categories = [
    { name: "Diapering", subCategories: ["Diapers", "Wipes", "Changing Pads"] },
    { name: "Feeding", subCategories: ["Bottles", "Breast Pumps", "High Chairs"] },
    { name: "Babycare", subCategories: ["Skincare", "Bathing", "Health"] },
    { name: "Clothing and Footwear", subCategories: ["Onesies", "Shoes", "Accessories"] },
    { name: "Back to School", subCategories: ["Backpacks", "Lunch Boxes", "Stationery"] },
    { name: "Maternity and Nursing", subCategories: ["Maternity Wear", "Nursing Pads", "Pillows"] },
    { name: "Sales", subCategories: ["Discounted Items", "Clearance", "Special Offers"] },
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(prev => (prev === category ? null : category));
  };

   const openModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      setter(true);
      setTimeout(() => setAnimatedModal(true), 10);
    };

     const closeModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setAnimatedModal(false);
        setTimeout(() => setter(false), 300);
      };

  return (
    <div className="fixed inset-0 z-[999] flex font-poppins">
      {/* Overlay */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          animateModal ? "opacity-70 bg-[#000]" : "opacity-0 bg-[#000]"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white w-full md:w-[400px] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-800 ease-in-out ${
          animateModal ? "translate-x-0 opacity-100" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 w-full border-b-2 border-gray-100 pb-4">
          <h2 className="text-xl font-[400] flex-1 text-left">Menu</h2>
          <button>
          <User
                          size="20"
                          color='#000'
                          onClick={() => openModal(setShowUserModal)}
                          className="inline text-black hover:text-[#b970a0] hover:scale-110 transition-all duration-300"
                        />
          </button>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition duration-200"
            aria-label="Close"
          >
            <IoMdClose color="#000" size={24} />
          </button>
        </div>

        <ul className="text-md flex flex-col gap-4 text-black font-[500] text-base">
          {categories.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <li key={category.name} className="flex flex-col">
                <div
                  className="font-[600] text-left border-b-2 border-gray-100 pb-4 cursor-pointer"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                  <span>
                  <span className="absolute right-5">
                        {isActive ? <ArrowDown2 size="18" color="#b970a0" /> : <ArrowRight2 size="18" color="#b970a0" />}
                      </span>
                  </span>
                </div>

                {/* Always render the dropdown */}
                <ul
                  className="pl-4 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isActive ? `${category.subCategories.length * 3}rem` : "0",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {category.subCategories.map((subCategory) => (
                    <li
                      key={subCategory}
                      className="py-2 cursor-pointer hover:text-gray-900 transition-all duration-300"
                      onClick={handleClose}
                    >
                      {subCategory}
                      <span className="absolute right-5">
                        <ArrowRight2 size="14" color="#4fb3e5" /> 
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* User Modal */}
      {showUserModal && (
        <UserModal handleClose={() => closeModal(setShowUserModal)} animateModal={animatedModal} />
      )}

    </div>
  );
};

export default MenuModal;
