"use client";

import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";

import SignUpForm from "../HeaderForms/SignUpForm";
import LoginForm from "../HeaderForms/LoginForm";
import ForgotPassword from "../HeaderForms/ForgotPassword";
import UserProfile from "../HeaderForms/UserProfile";

interface UserModalProps {
  handleClose: () => void;
  animateModal: boolean;
}

interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  emailIsVerified: boolean;
  emailVerificationToken: string | null;
  phoneIsVerified: boolean;
  phoneVerificationToken: string | null;
  createdAt: string;
}

const NEXT_PUBLIC_ROOT_URL =
  process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000";

const UserModal: React.FC<UserModalProps> = ({ handleClose, animateModal }) => {
  const [loginForm, setLoginForm] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_ROOT_URL}/api/auth/me`,
          {
            withCredentials: true,
          }
        );

        if (response.data.user.role === "ADMIN") {
          router.push("/admin");
          return;
        } 
        
        setUser({
          id: response.data.user.id,
          email: response.data.user.email,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          role: response.data.user.role,
          emailIsVerified: response.data.user.emailIsVerified,
          emailVerificationToken: response.data.user.emailVerificationToken,
          phoneIsVerified: response.data.user.phoneIsVerified,
          phoneVerificationToken: response.data.user.phoneVerificationToken,
          createdAt: response.data.user.createdAt,
        });
        setLoggedIn(true);
        setLoginForm(false);
      } catch (error) {
        
      }
    }

    fetchUser();
  }, [])

  // when we open the menu, we check whether we're logged in, if not we show the signup form, if yes we show the user profile

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
              {loginForm
                ? "Sign In"
                : forgotPassword
                ? "Forgot Password"
                : loggedIn
                ? "User Profile"
                : "Register"}
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
              loginForm || forgotPassword || loggedIn ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <SignUpForm showLoginForm={showLoginForm} setLoggedIn={setLoggedIn} setUser={setUser} />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
              loginForm && !forgotPassword ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <LoginForm setUser={setUser} setLoggedIn={setLoggedIn} showLoginForm={showLoginForm} showForgotPassword={showForgotPassword} />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
              forgotPassword ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ForgotPassword showLoginForm={showLoginForm} showForgotPassword={showForgotPassword} />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
              loggedIn && !loginForm && !forgotPassword ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <UserProfile setLoggedIn={setLoggedIn} user={user} setUser={(user) => setUser(user)} />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
