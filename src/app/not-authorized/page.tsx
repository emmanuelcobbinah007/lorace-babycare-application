import React from "react";
import { LuBaby } from "react-icons/lu";

const AccessDeniedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center space-y-6">
        <div className="flex justify-center">
          <LuBaby size="48" color="#b970a0" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#b970a0]">
          Uh-oh! Access Denied
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          This section is for admins only. If you&apos;re trying to peek
          into admin land, you&apos;ll need the right permissions.
        </p>
        <a
          href="/"
          className="inline-block hover:bg-[#944f7b] bg-[#b970a0] text-white px-6 py-2 rounded-full text-sm font-medium transition"
        >
          Back to homepage
        </a>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
