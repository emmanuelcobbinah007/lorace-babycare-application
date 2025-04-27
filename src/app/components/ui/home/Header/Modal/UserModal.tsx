"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

import SignUpForm from "../HeaderForms/SignUpForm";
import LoginForm from "../HeaderForms/LoginForm";
import ForgotPassword from "../HeaderForms/ForgotPassword";

interface UserModalProps {
  handleClose: () => void;
  animateModal: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ handleClose, animateModal }) => {
  const [loginForm, setLoginForm] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const showLoginForm = () => {
    setForgotPassword(false);
    setLoginForm(!loginForm);
  };

  const showForgotPassword = () => {
    setForgotPassword(true)
  }

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
        className={`fixed right-0 top-0 h-full bg-white w-full md:w-[40%] shadow-lg p-6 overflow-y-auto z-10 transform transition-transform duration-800 ease-initial ${
          animateModal ? "translate-x-0 opacity-100" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center mb-4 w-full border-b-2 border-gray-100 pb-4">
            <h2 className="text-lg font-[500] flex-1 text-left">
              {!loginForm
                ? "Register"
                : forgotPassword
                ? "Forgot Password"
                : "Sign In"}
            </h2>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-gray-200 transition duration-200 transform hover:rotate-180"
              aria-label="Close"
            >
              <IoMdClose color="#000" size={24} />
            </button>
          </div>
            <div className="relative">
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
              loginForm || forgotPassword ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <SignUpForm showLoginForm={showLoginForm} />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
              loginForm && !forgotPassword ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <LoginForm showLoginForm={showLoginForm} showForgotPassword={showForgotPassword} />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
              forgotPassword ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ForgotPassword showLoginForm={showLoginForm} showForgotPassword={showForgotPassword} />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
