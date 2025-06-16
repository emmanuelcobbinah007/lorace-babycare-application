"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  SearchNormal,
  User,
  ShoppingCart,
  HamburgerMenu,
} from "iconsax-reactjs";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useCategories } from "../../../../hooks/useCategories";
import { useModal } from "../../../../contexts/ModalContext";

import Logo from "../../../../../../public/images/loraceLogo.png";
import CartModal from "./Modal/CartModal";
import UserModal from "./Modal/UserModal";
import MenuModal from "./Modal/MenuModal";
import SearchModal from "./Modal/SearchModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const categories = [
  { name: "Diapering", subItems: ["Diapers", "Wipes", "Changing Pads"] },
  { name: "Feeding", subItems: ["Bottles", "Breast Pumps", "High Chairs"] },
  { name: "Babycare", subItems: ["Skincare", "Bathing", "Health"] },
  { name: "Back to School", subItems: ["Backpacks", "Lunch Boxes", "Stationery"] },
  { name: "Clothing and Footwear", subItems: ["Onesies", "Shoes", "Accessories"] },
  { name: "Maternity", subItems: ["Maternity Wear", "Nursing Pads", "Pillows"] },
];

interface SubCategory {
  categoryId: string;
  createdAt: string;
  id: string;
  name: string;
  isHidden?: boolean;
}
interface fetchedCategories {
  createdAt: string;
  id: string;
  name: string;
  subCategories: SubCategory[];
}

const HeaderBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [animateLoginModal, setAnimateLoginModal] = useState(false);
  
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useModal();
  const { data: fetchedCategories = [], isLoading: loading } = useCategories();
  // console.log("fetched Categories:", fetchedCategories);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle login modal animation
  useEffect(() => {
    if (isLoginModalOpen) {
      setTimeout(() => setAnimateLoginModal(true), 10);
    } else {
      setAnimateLoginModal(false);
    }
  }, [isLoginModalOpen]);  const openModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setAnimateModal(false);
    setTimeout(() => setter(false), 300);
  };

  const handleCloseLoginModal = () => {
    setAnimateLoginModal(false);
    setTimeout(() => closeLoginModal(), 300);
  };

  return (
    <>
      <div
        className={`${poppins.className} fixed top-0 left-0 w-full z-[999] transition-all duration-30 backdrop-blur-xs bg-white/70 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className={`font-poppins w-[90%] mx-auto flex justify-between items-center py-4`}>
          <div className="flex gap-3 items-center md:hidden">
            <HamburgerMenu size="30" color="#000" onClick={() => openModal(setShowMenuModal)} />
          </div>

          <div className="md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0">
           <Link href="/">
             <Image src={Logo.src} alt="Lorace Babycare Logo" width={100} height={100} />
           </Link>
          </div>

          <div className="hidden md:inline flex-1">
            <ul className="text-center flex justify-evenly text-black font-[500] text-base">
              {loading ? (
                categories.map((category) => (
                  <li
                    key={category.name}
                    className="relative group flex flex-col items-center justify-center"
                  >
                    <div className="hover:text-[#4fb2e5] duration-300">
                      {category.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
                    </div>
                    <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                      {category.subItems.map((subItem) => (
                        <li
                          key={subItem}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                        >
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : 
              fetchedCategories.map((category) => (
                <li
                  key={category.name}
                  className="relative group flex flex-col items-center justify-center"
                >
                  <a href={`/category/${category.id}`} className="hover:text-[#4fb2e5] duration-300">
                    {category.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
                  </a>

                  {category.subCategories && (
                    <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                      {category.subCategories.map((subItem: SubCategory) => (
                      <li
                        key={subItem.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                      >
                        <a href={`/subcategory/${subItem.id}`}>{subItem.name}</a>
                      </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="relative group flex flex-col items-center justify-center">
                <div className="hover:text-[#4fb2e5] duration-300">
                  <a href="/sales">Sales</a>
                </div>
                 <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <SearchNormal
              size="20"
              onClick={() => openModal(setShowSearchModal)}
              className="text-black hover:text-[#4fb3e5] hover:scale-110 transition-all duration-300"
            />            <User
              size="20"
              onClick={openLoginModal}
              className="md:inline hidden text-black hover:text-[#b970a0] hover:scale-110 transition-all duration-300"
            />
            <ShoppingCart
              size="20"
              onClick={() => openModal(setShowCartModal)}
              className="text-black hover:text-[#4fb3e5] hover:scale-110 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCartModal && (
        <CartModal handleClose={() => closeModal(setShowCartModal)} animateModal={animateModal} />
      )}      {showSearchModal && (
        <SearchModal handleClose={() => closeModal(setShowSearchModal)} animateModal={animateModal} />
      )}      {isLoginModalOpen && (
        <UserModal handleClose={handleCloseLoginModal} animateModal={animateLoginModal} />
      )}
      {showMenuModal && (
        <MenuModal
          handleClose={() => closeModal(setShowMenuModal)}
          animateModal={animateModal}
          fetchedCategories={fetchedCategories.map(category => ({
            ...category,
            subCategories: category.subCategories ?? []
          }))}
          loading={loading}
        />
      )}
    </>
  );
};

export default HeaderBar;
