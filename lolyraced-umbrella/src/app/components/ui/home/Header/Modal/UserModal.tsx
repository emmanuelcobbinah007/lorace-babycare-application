"use client";

import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";

// import { SignUpForm } from "../HeaderForms/SignUpForm";
import SignUpForm from "../HeaderForms/SignUpForm";
import LoginForm from "../HeaderForms/LoginForm";
import ForgotPassword from "../HeaderForms/ForgotPassword";
import UserProfile from "../HeaderForms/UserProfile";
import {useCurrentUser} from "../../../../../hooks/useAuth";
import {User} from "../../../../../api/auth/authApi";

interface UserModalProps {
  handleClose: () => void;
  animateModal: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ handleClose, animateModal }) => {
  // TanStack Query hooks
  const { data: authResponse, isLoading: loading, error } = useCurrentUser();
  const user = authResponse?.user;
  
  const [loginForm, setLoginForm] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (user && !error) {
      if (user.role === "ADMIN") {
        router.push("/admin");
        return;
      }
      setLoggedIn(true);
      setLoginForm(false);
      setLocalUser(user);
    } else {
      setLoggedIn(false);
      setLocalUser(null);
    }
  }, [user, error, router]);

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
            { loading ? (
                <div className="flex items-center justify-center h-[80vh]">
                  <FadeLoader color="#dcaed0" height={10} width={5} />
                </div>
            ) : (
              <div className="relative">
                {loginForm && !forgotPassword ? (
                  <LoginForm
                    setUser={setLocalUser}
                    setLoggedIn={setLoggedIn}
                    showLoginForm={showLoginForm}
                    showForgotPassword={showForgotPassword}
                  />
                ) : forgotPassword ? (
                  <ForgotPassword
                    showLoginForm={showLoginForm}
                    showForgotPassword={showForgotPassword}
                  />
                ) : loggedIn && !loginForm && !forgotPassword ? (
                  <UserProfile
                    setLoggedIn={setLoggedIn}
                    user={localUser}
                    setUser={setLocalUser}
                  />
                ) : (
                  <SignUpForm
                    showLoginForm={showLoginForm}
                    setLoggedIn={setLoggedIn}
                    setUser={setLocalUser}
                  />
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
