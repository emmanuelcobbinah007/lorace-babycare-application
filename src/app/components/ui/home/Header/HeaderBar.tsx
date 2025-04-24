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

const HeaderBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  // Logic to handle cartModal
  const handleCartModalOpen = () => {
    setShowCartModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const handleCartModalClose = () => {
    setAnimateModal(false);
    setTimeout(() => setShowCartModal(false), 300);
  };

  // Logic to handle menuModal
  const handleUserModalOpen = () => {
    setShowUserModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const handleUserModalClose = () => {
    setAnimateModal(false);
    setTimeout(() => setShowUserModal(false), 300);
  };

  // Logic to handle menuModal
  const handleMenuModalOpen = () => {
    setShowMenuModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const handleMenuModalClose = () => {
    setAnimateModal(false);
    setTimeout(() => setShowMenuModal(false), 300);
  };

    // Logic to handle seachModal
    const handleSearchModalOpen = () => {
      setShowSearchModal(true);
      setTimeout(() => setAnimateModal(true), 10);
    };
  
    const handleSearchModalClose = () => {
      setAnimateModal(false);
      setTimeout(() => setShowSearchModal(false), 300);
    };

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);  

  return (
    <>
    <div className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-30 backdrop-blur-sm bg-white
      ${scrolled ? "shadow-sm" : ""}
    `}>
      <div className={`font-poppins w-[90%] mx-auto flex justify-between items-center py-4`}>
        <div className="inline md:hidden">
          <HamburgerMenu size="30" color="#000" onClick={handleMenuModalOpen} />
        </div>
        <div className="md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0">
          <Image
            src={Logo.src}
            alt="Lorace Babycare Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="hidden md:inline flex-1">
          <ul className="text-center flex justify-evenly text-black font-[500] text-base">
            <li className="relative duration-300 group hover:text-[#4fb2e5] flex flex-col items-center justify-center">
              Diapering
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative duration-300 group hover:text-[#4fb2e5] flex flex-col items-center justify-center">
              Feeding
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative duration-300 group hover:text-[#4fb2e5] flex flex-col items-center justify-center">
              Babycare
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative duration-300 group hover:text-[#4fb2e5] flex flex-col items-center justify-center">
              Clothing and Footwear
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative duration-300 group hover:text-[#4fb2e5] flex flex-col items-center justify-center">
              Back to School
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative duration-300 group hover:text-[#4fb2e5] flex flex-col items-center justify-center">
              Maternity and Nursing
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative duration-300 group hover:text-[#4fb2e5] flex flex-col items-center justify-center">
              Sales
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4fb2e5] transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <SearchNormal
            size="20"
            onClick={handleSearchModalOpen}
            className="text-black hover:text-[#4fb3e5] hover:scale-110 transition-all duration-300"
          />
          <User
            size="20"
            onClick={handleUserModalOpen}
            className="md:inline hidden text-black hover:text-[#b970a0] hover:scale-110 transition-all duration-300"
          />
          <ShoppingCart
            size="20"
            onClick={handleCartModalOpen}
            className="text-black hover:text-[#4fb3e5] hover:scale-110 transition-all duration-300"
          />
        </div>
      </div>
    </div>

    {/* Cart Modal */}
    {showCartModal && (
        <CartModal
          handleClose={handleCartModalClose}
          animateModal={animateModal}
        />
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <SearchModal
          handleClose={handleSearchModalClose}
          animateModal={animateModal}
        />
      )}

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          handleClose={handleUserModalClose}
          animateModal={animateModal}
        />
      )}

      {/* Menu Modal */}
      {showMenuModal && (
        <MenuModal
          handleClose={handleMenuModalClose}
          animateModal={animateModal}
        />
      )}

    </>
  );
};

export default HeaderBar;
