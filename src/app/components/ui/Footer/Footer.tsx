"use client";

import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";
import { Patrick_Hand } from "next/font/google";
import AuroraLogo from "../../../../../public/HouseKeeping/auroraLogo.png";
import { toast, ToastContainer } from "react-toastify";
import { useCurrentUser, useCheckSubscription, useSubscribe } from "../../../hooks/useAuth";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrickHand",
});

const Footer = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  
  // Get current user data
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  
  // Get subscription status for current user's email
  const userEmail = currentUser?.user?.email;
  const { data: isSubscribed, isLoading: subscriptionLoading } = useCheckSubscription(userEmail || "");
  
  // Subscribe mutation
  const subscribeMutation = useSubscribe();
  
  const loading = userLoading || subscriptionLoading;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmailInput(e.target.value);
  };

  const handleEmailSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Use current user's email if logged in, otherwise use input email
    const emailToSubscribe = userEmail || emailInput;
    if (!emailToSubscribe) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      await subscribeMutation.mutateAsync({
        email: emailToSubscribe,
        ...(currentUser?.user?.id && { id: currentUser.user.id }),
      });
      
      toast.success("Subscribed successfully!");
      setEmailInput(""); // Clear the input field
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <footer className="bg-[#f2fbfe] text-black pt-10 font-poppins border-t border-[#e0e0e0]">
      <div className="w-[85%] md:w-[80%] mx-auto text-center">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">        <div>
            { isSubscribed ? (
              <h2
                className={`text-2xl font-semibold text-[#b970a0] mb-6 ${patrickHand.className}`}
              >
                Thank You for Subscribing!
              </h2>
            )
            : (
              <div>
                <h2
              className={`text-2xl font-semibold text-[#b970a0] mb-6 ${patrickHand.className}`}
            >
              Join Our Newsletter
            </h2>
            <p className="text-sm mb-6 text-gray-600">
              Stay updated with the latest trends, exclusive offers, and more.
            </p>
            <form
              onSubmit={handleEmailSubscribe}
              className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
            >
              <input
                type="email"
                value={loading ? "" : userEmail || emailInput}
                onChange={handleChange}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-auto"
                disabled={loading || subscribeMutation.isPending}
              />
              <button
                type="submit"
                disabled={loading || subscribeMutation.isPending}
                className="bg-[#4fb3e5] text-white px-6 py-2 rounded-md hover:bg-[#3da5d6] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
              </div>
            )
            }
          </div>

          {/* Navigation Links */}
          <div>
            <h3
              className={`text-2xl font-semibold text-[#b970a0] mb-4 ${patrickHand.className}`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="/about" className="hover:text-[#4fb3e5] transition">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/products">
                  <p className="hover:text-[#4fb3e5] transition">Collections</p>
                </Link>
              </li>
              <li>
                <a href="/faq" className="hover:text-[#4fb3e5] transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#4fb3e5] transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3
              className={`text-2xl font-semibold text-[#b970a0] mb-4 ${patrickHand.className}`}
            >
              Stay Connected
            </h3>
            <div className="flex justify-between md:justify-between space-x-6 mt-6 text-[#4fb3e5] w-[60%] mx-auto">
              <a
                href="https://www.facebook.com/search/top?q=laropa_kioki"
                target="_blank"
                className="hover:text-[#b970a0] text-xl transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/laropa_kioki_rtw/"
                target="_blank"
                className="hover:text-[#b970a0] text-xl transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.pinterest.com/albertalarbi83/"
                target="_blank"
                className="hover:text-[#b970a0] text-xl transition"
              >
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-sm text-gray-600 py-20 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <p>
              © {new Date().getFullYear()} Lorace Babycare. All Rights
              Reserved.
            </p>
            <div className="block md:hidden space-x-4">
              <a href="/privacy" className="hover:text-[#b970a0] transition">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-[#b970a0] transition">
                Terms of Service
              </a>
            </div>
            <img
              src={AuroraLogo.src}
              className="absolute translate-y-1/2 md:translate-y-0 left-1/2 -translate-x-1/2 w-[150px]"
            />
            <div className="hidden md:flex space-x-4">
              <a href="/privacy" className="hover:text-[#b970a0] transition">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-[#b970a0] transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
