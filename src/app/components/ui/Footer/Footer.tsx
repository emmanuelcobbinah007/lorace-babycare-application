import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import loraceLogo from '../../../../../public/images/loraceLogo.png';
import React from 'react'
import Link from 'next/link'
import { Patrick_Hand } from 'next/font/google';
import AuroraLogo from '../../../../../public/HouseKeeping/auroraLogo.png'

const patrickHand = Patrick_Hand({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-patrickHand',
  })  

const Footer = () => {
  return (
    <footer className="bg-[#f2fbfe] text-black pt-10 font-poppins border-t border-[#e0e0e0]">
  <div className="w-[85%] mx-auto text-center">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      
      <div>
      <h2 className={`text-2xl font-semibold text-[#b970a0] mb-6 ${patrickHand.className}`}>
      Join Our Newsletter
    </h2>
    <p className="text-sm mb-6 text-gray-600">
      Stay updated with the latest trends, exclusive offers, and more.
    </p>
    <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-auto"
      />
      <button
        type="submit"
        className="bg-[#4fb3e5] text-white px-6 py-2 rounded-md hover:bg-[#3da5d6] transition-all duration-300"
      >
        Subscribe
      </button>
    </form>
      </div>

      {/* Navigation Links */}
      <div>
        <h3 className={`text-2xl font-semibold text-[#b970a0] mb-4 ${patrickHand.className}`}>Quick Links</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <a href="/about" className="hover:text-[#4fb3e5] transition">About Us</a>
          </li>
          <li>
            <Link href="/products">
              <p className="hover:text-[#4fb3e5] transition">Collections</p>
            </Link>
          </li>
          <li>
            <a href="/faq" className="hover:text-[#4fb3e5] transition">FAQs</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-[#4fb3e5] transition">Contact Us</a>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h3 className={`text-2xl font-semibold text-[#b970a0] mb-4 ${patrickHand.className}`}>Stay Connected</h3>
        <div className="flex justify-between md:justify-between space-x-6 mt-6 text-[#4fb3e5] w-[60%] mx-auto">
          <a href="https://www.facebook.com/search/top?q=laropa_kioki" target="_blank" className="hover:text-[#b970a0] text-xl transition">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/laropa_kioki_rtw/" target="_blank" className="hover:text-[#b970a0] text-xl transition">
            <FaInstagram />
          </a>
          <a href="https://www.pinterest.com/albertalarbi83/" target="_blank" className="hover:text-[#b970a0] text-xl transition">
            <FaPinterest /> 
          </a>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t border-gray-200 mt-8 pt-6 text-sm text-gray-600 py-20 md:py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
      <p>© {new Date().getFullYear()} Lorace Babycare. All Rights Reserved.</p>
      <div className="block md:hidden space-x-4">
        <a href="/privacy" className="hover:text-[#b970a0] transition">Privacy Policy</a>
        <a href="/terms" className="hover:text-[#b970a0] transition">Terms of Service</a>
      </div>
      <img src={AuroraLogo.src} className="absolute translate-y-1/2 md:translate-y-0 left-1/2 -translate-x-1/2 w-[150px]" />
      <div className="hidden md:flex space-x-4">
        <a href="/privacy" className="hover:text-[#b970a0] transition">Privacy Policy</a>
        <a href="/terms" className="hover:text-[#b970a0] transition">Terms of Service</a>
      </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
      <div className="flex items-center space-x-2">
        <a
        href="https://wa.me/1234567890" // Replace with your WhatsApp number
        target="_blank"
        className="flex items-center text-[#4fb3e5] hover:text-[#b970a0] transition"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.105 1.516 5.828L0 24l6.172-1.516A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.184 17.184c-.256.719-1.484 1.375-2.047 1.453-.563.078-1.094.256-3.719-.781-3.125-1.281-5.094-4.5-5.25-4.719-.156-.219-1.25-1.656-1.25-3.156s.781-2.219 1.094-2.5c.313-.281.688-.344.938-.344.25 0 .469.002.656.012.188.01.469-.078.719.531.25.609.844 2.094.906 2.25.063.156.094.344.031.531-.063.188-.094.344-.188.469-.094.125-.188.281-.281.406-.094.125-.188.219-.094.406.094.188.406.656.875 1.063.594.531 1.094.719 1.313.812.219.094.344.078.469-.063.125-.125.531-.625.656-.844.125-.219.281-.188.469-.125.188.063 1.188.563 1.406.656.219.094.344.125.406.188.063.063.063.719-.188 1.438z" />
        </svg>
        <span className="ml-2">WhatsApp</span>
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5 text-[#4fb3e5]"
        >
        <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.379 0-2.5-1.121-2.5-2.5S10.621 6.5 12 6.5s2.5 1.121 2.5 2.5-1.121 2.5-2.5 2.5z" />
        </svg>
        <span className="text-gray-600">123 Main Street, City, Country</span>
      </div>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
