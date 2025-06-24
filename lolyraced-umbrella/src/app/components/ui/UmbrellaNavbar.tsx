"use client";

import React, { useState } from "react";
import { umbrellaCompany } from "@lolyraced/config";
import { Button } from "@lolyraced/ui";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../../contexts/AuthContext";
import AuthModal from "./AuthModal";

const UmbrellaNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {umbrellaCompany.displayName}
              </span>
            </Link>
          </div>{" "}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("businesses")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Our Businesses
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </button>{" "}
            {/* Auth Button */}{" "}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstname} {user?.lastname}
                </span>
                {user?.role === "ADMIN" && (
                  <Link href="/admin/dashboard">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-sm hover:shadow-md">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={handleAuthClick}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-sm hover:shadow-md"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAuthClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-sm hover:shadow-md"
              >
                Sign In
              </Button>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>{" "}
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <button
                onClick={() => scrollToSection("businesses")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
              >
                Our Businesses
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
              >
                Contact
              </button>{" "}
              {/* Mobile Auth Button */}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-md">
                      Welcome, {user?.firstname} {user?.lastname}
                    </div>
                    {user?.role === "ADMIN" && (
                      <Link href="/admin/dashboard">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-sm hover:shadow-md mb-2">
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleAuthClick();
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-sm hover:shadow-md"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleAuthClick();
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-sm hover:shadow-md"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default UmbrellaNavbar;
