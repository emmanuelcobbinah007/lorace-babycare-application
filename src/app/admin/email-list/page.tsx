"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { MdOutlineEmail, MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Page = () => {
  interface Email {
    id: string;
    email: string;
  }

  const [emailList, setEmailList] = useState<Email[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_API_URL}/api/email-list`
        );
        setEmailList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredEmails = emailList.filter((email) =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this email?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${NEXT_PUBLIC_API_URL}/api/email-list/${id}`);
      setEmailList((prev) => prev.filter((email) => email.id !== id));
      toast.success("Email deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Failed to delete email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex">
        <ToastContainer />
        <div className="w-[22.5%] bg-amber-950"></div>
        <div className="w-[90%]">
          <div className="my-8 mx-auto px-8 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-xl font-semibold text-gray-800">Email List</h1>

            <div className="relative w-full md:w-[40%]">
              <input
                type="text"
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b970a0] transition"
              />
              <MdOutlineEmail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <button className="bg-[#b970a0] hover:bg-[#874f7a] duration-300 text-white px-3 py-2 rounded-md shadow flex items-center space-x-2">
              <MdOutlineEmail className="sm:mr-1 text-lg font-bold" />
              <span className="hidden sm:inline">Draft Email</span>
            </button>
          </div>

          <div>
            {filteredEmails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 mt-6">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className="bg-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MdOutlineEmail className="text-[#4fb3e5]" size={18} />
                        <p className="text-sm font-medium text-gray-800 break-words">
                          {email.email.length > 20
                            ? `${email.email.slice(0, 20)}...`
                            : email.email}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-2 rounded-lg bg-white text-[#4fb3e5] shadow-sm transition-transform hover:scale-105"
                          title="Delete"
                          onClick={handleDelete(email.id)}
                        >
                          <MdOutlineDeleteOutline size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full px-8 mx-auto mt-8 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  No Emails Found
                </h2>
                <p className="text-gray-500">
                  Try searching for a different email.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
