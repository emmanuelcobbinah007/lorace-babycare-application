"use client";

import React from "react";
import {
  User as UserIcon,
  Sms,
  Calendar,
  Verify,
  LogoutCurve,
} from "iconsax-reactjs";
import { ShoppingBag } from "iconsax-reactjs";
import { useLogout } from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { User } from "../../../../../api/auth/authApi";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

// interface User {
//   id: string;
//   email: string;
//   firstname: string;
//   lastname: string;
//   role: string;
//   emailIsVerified: boolean;
//   emailVerificationToken: string | null;
//   phoneIsVerified: boolean;
//   phoneVerificationToken: string | null;
//   createdAt: string;
// }

interface UserProfileProps {
  user: User | null;
  setLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  setLoggedIn,
  setUser,
}) => {
  const orders: Order[] = []; // Replace with actual orders fetched from an API
  const logoutMutation = useLogout();

  const initLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLoggedIn(false);
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  
    const handleEmailVerification = async () => {
      alert("Email verification link sent!");
    };
  
    const handlePhoneVerification = async () => {
      alert("Phone verification code sent!");
    };
  
    if (!user) {
      return <p className="text-center mt-10 text-gray-500">No user data available.</p>;
    }
  
    return (
      <div className="flex flex-col justify-between max-w-lg w-full mx-auto p-6 sm:p-8 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-2xl shadow-lg h-auto min-h-[75vh] space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <UserIcon size="48" color="#4A5568" variant="Bold" />
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-snug">
              Welcome back, {user.firstname}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
  
        {/* Info Section */}
        <div className="space-y-6 text-sm text-gray-700">
          {/* Join Date */}
          <div className="flex items-center gap-3">
            <Calendar size="24" color="#4A5568" />
            <span>
              Joined:{" "}
              <span className="font-medium text-gray-800">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </span>
          </div>
  
          {/* Email Verification */}
          <div className="p-5 bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Sms size="24" color="#4A5568" />
              <span>
                Email Verified:{" "}
                <span
                  className={
                    user.emailIsVerified
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {user.emailIsVerified ? "Yes" : "No"}
                </span>
              </span>
            </div>
            {!user.emailIsVerified && (
              <button
                onClick={handleEmailVerification}
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-2xl transition"
              >
                Verify Email
              </button>
            )}
          </div>
  
          {/* Phone Verification */}
          <div className="p-5 bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Verify size="24" color="#4A5568" />
              <span>
                Phone Verified:{" "}
                <span
                  className={
                    user.phoneIsVerified
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {user.phoneIsVerified ? "Yes" : "No"}
                </span>
              </span>
            </div>
            {!user.phoneIsVerified && (
              <button
                onClick={handlePhoneVerification}
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-2xl transition"
              >
                Verify Phone
              </button>
            )}
          </div>
        </div>
  
        {/* Orders Section */}
<div className="space-y-4">
  <div className="flex items-center gap-2">
    <ShoppingBag size="24" color="#4A5568" />
    <h2 className="text-lg font-semibold text-gray-800">Your Orders</h2>
  </div>

  {/* Notice about verification requirement */}
  {(!user.emailIsVerified || !user.phoneIsVerified) && (
    <p className="text-sm text-red-600 font-medium">
      You must verify both your email and phone number before you can place an order.
    </p>
  )}

  {orders.length === 0 ? (
    <p className="text-sm text-gray-500 italic">You have no orders at the moment.</p>
  ) : (
    <ul className="space-y-3">
      {orders.map((order) => (
        <li
          key={order.id}
          className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <div className="text-sm text-gray-800 font-medium">
            Order #{order.id}
          </div>
          <div className="text-sm text-gray-600">
            Date: {new Date(order.date).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-600">Status: {order.status}</div>
          <div className="text-sm text-gray-800 font-semibold">
            Total: ${order.total.toFixed(2)}
          </div>
        </li>
      ))}
    </ul>
  )}
</div>        {/* Logout Button */}
        <div className="pt-4">
          <button
            onClick={initLogout}
            disabled={logoutMutation.isPending}
            className={`flex items-center justify-center gap-3 ${
              logoutMutation.isPending ? "bg-red-400" : "bg-red-600 hover:bg-red-500"
            } text-white text-sm px-5 py-3 rounded-2xl w-full sm:w-auto transition`}
          >
            <LogoutCurve size="24" />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  