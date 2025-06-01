// TODO: Make design responsive
// TODO: Add Implementation for send email functionality

"use client";

import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { MdOutlineEmail, MdOutlineDeleteOutline } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { useEmailList, useDeleteEmail } from "../../hooks/useEmailList";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: emailList = [], isLoading, error } = useEmailList();
  const deleteEmailMutation = useDeleteEmail();

  const filteredEmails = emailList.filter((email) =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this email?"
    );
    if (!confirmDelete) return;

    deleteEmailMutation.mutate(id);
  };

  return (
    <AdminLayout>
      <div className="block md:flex w-full h-screen bg-[#f2fbfe]">
        <ToastContainer />
        <div className="w-[22.5%] bg-amber-950 hidden md:block"></div>
        <div className="w-[100%] md:w-[90%]">
          <div className="my-8 mx-auto px-8 w-full flex flex-row md:items-center justify-between gap-4">
            <h1 className="pl-8 text-xl font-semibold text-gray-800">Email List</h1>

            <div className="hidden relative md:block w-full md:w-[40%]">
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
              <MdOutlineEmail className="mx-auto md:mr-1 text-lg font-bold" />
              <span className="hidden sm:inline">Draft Email</span>
            </button>
          </div>

          <div className="block relative md:hidden w-[82%] mx-auto mb-6">
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4fb3e5] text-gray-700 placeholder-gray-400"
            />
          </div>          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-gray-500 px-8 mt-8">
                <h2 className="text-lg font-semibold text-gray-800">
                  Error Loading Emails
                </h2>
                <p className="text-gray-500">
                  Failed to load email list. Please try again.
                </p>
              </div>
            ) : filteredEmails.length > 0 ? (
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
                          className={`p-2 rounded-lg bg-white text-[#4fb3e5] shadow-sm transition-transform hover:scale-105 ${
                            deleteEmailMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          title="Delete"
                          onClick={handleDelete(email.id)}
                          disabled={deleteEmailMutation.isPending}
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
                  {searchTerm ? 'Try searching for a different email.' : 'No emails in the list yet.'}
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
