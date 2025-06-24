"use client";

import React, { useState } from "react";
import { umbrellaCompany, getAllBusinesses, getBusinessUrl } from "../../config";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../components/ui/AuthModal";

export default function UmbrellaPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  // Get all businesses and separate active from inactive
  const allBusinesses = getAllBusinesses();

  // Only Lorace Babycare should be active (based on isActive: true in config)
  const activeBusinesses = allBusinesses.filter(
    (business) => business.isActive
  );

  // Get the inactive businesses that are already in your config
  const inactiveBusinesses = allBusinesses.filter(
    (business) => !business.isActive
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {" "}
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* <Image
                src={umbrellaCompany.logoUrl}
                alt={umbrellaCompany.displayName}
                width={50}
                height={50}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
              /> */}
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {umbrellaCompany.displayName}
              </h1>
            </div>{" "}
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("businesses")}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Our Businesses
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Contact
              </button>{" "}
              {/* Auth Button */}
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>{" "}
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("businesses")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Our Businesses
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors"
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
                          setIsMobileMenuOpen(false);
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
                        setIsMobileMenuOpen(false);
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
      </header>{" "}
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Welcome to {umbrellaCompany.displayName}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            {umbrellaCompany.description}
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("businesses")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-medium transition-all shadow-lg hover:shadow-xl"
          >
            Explore Our Businesses
          </Button>
        </div>
      </section>{" "}
      {/* Active Businesses Section */}
      <section id="businesses" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            Our Active Businesses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <Image
                    src={business.theme.logoUrl}
                    alt={business.displayName}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded"
                  />
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 ml-2 sm:ml-3">
                    {business.displayName}
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {business.seo.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {business.features.ecommerce && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      E-commerce
                    </span>
                  )}
                  {business.features.blog && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      Blog
                    </span>
                  )}
                  {business.features.portfolio && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      Portfolio
                    </span>
                  )}
                  {business.features.booking && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                      Booking
                    </span>
                  )}
                </div>                <Link href={getBusinessUrl(business)} target="_blank">
                  <Button
                    className="w-full text-sm sm:text-base py-2 sm:py-3 font-medium transition-all"
                    style={{ backgroundColor: business.theme.primaryColor }}
                  >
                    Visit {business.displayName}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Coming Soon Businesses - Always show this section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            More Coming Soon
          </h3>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            We're constantly expanding our portfolio of businesses. Here's
            what's in development:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {inactiveBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border opacity-60 hover:opacity-75 transition-all duration-300"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 font-bold text-sm sm:text-base">
                      {business.displayName.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-600 ml-2 sm:ml-3">
                    {business.displayName}
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 leading-relaxed">
                  {business.seo.description}
                </p>
                {business.features && (
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {business.features.ecommerce && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        E-commerce
                      </span>
                    )}
                    {business.features.blog && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        Blog
                      </span>
                    )}
                    {business.features.portfolio && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        Portfolio
                      </span>
                    )}
                    {business.features.booking && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        Booking
                      </span>
                    )}
                  </div>
                )}
                <div className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded text-center text-sm sm:text-base font-medium border border-yellow-200">
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Coming Soon
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            About Us
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {umbrellaCompany.displayName} is a forward-thinking umbrella company
            that nurtures and grows diverse businesses across multiple
            industries. We believe in creating value through innovation,
            quality, and exceptional customer service.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">
                Innovation
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Driving innovation across all our business ventures
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Quality</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Committed to excellence in every product and service
              </p>
            </div>
            <div className="text-center p-4 sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">
                Community
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Building strong relationships with our customers and partners
              </p>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            Get In Touch
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Contact Information
              </h4>
              <div className="space-y-4 sm:space-y-6">
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700 break-all">
                    {umbrellaCompany.contact.email}
                  </span>
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">
                    {umbrellaCompany.contact.phone}
                  </span>
                </p>
                <p className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {umbrellaCompany.contact.address}
                  </span>
                </p>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 sm:mt-8">
                <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  Follow Us
                </h5>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {umbrellaCompany.contact.socialMedia?.facebook && (
                    <a
                      href={umbrellaCompany.contact.socialMedia.facebook}
                      className="text-blue-600 hover:text-blue-800 text-sm sm:text-base transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  )}
                  {umbrellaCompany.contact.socialMedia?.instagram && (
                    <a
                      href={umbrellaCompany.contact.socialMedia.instagram}
                      className="text-pink-600 hover:text-pink-800 text-sm sm:text-base transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                  {umbrellaCompany.contact.socialMedia?.twitter && (
                    <a
                      href={umbrellaCompany.contact.socialMedia.twitter}
                      className="text-blue-400 hover:text-blue-600 text-sm sm:text-base transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  )}
                  {umbrellaCompany.contact.socialMedia?.linkedin && (
                    <a
                      href={umbrellaCompany.contact.socialMedia.linkedin}
                      className="text-blue-700 hover:text-blue-900 text-sm sm:text-base transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Send us a Message
              </h4>
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all resize-vertical"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 text-sm sm:text-base font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">
            &copy; 2025 {umbrellaCompany.displayName}. All rights reserved.
          </p>{" "}
        </div>
      </footer>
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
