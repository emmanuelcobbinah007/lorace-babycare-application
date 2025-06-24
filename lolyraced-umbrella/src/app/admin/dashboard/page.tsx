"use client";

import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllBusinesses } from "@lolyraced/config";
import { Button } from "@lolyraced/ui";
import Link from "next/link";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const businesses = getAllBusinesses();
  // Redirect if not admin
  if (!isAuthenticated || user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You need admin privileges to access this dashboard.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage all your businesses from one place
              </p>{" "}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.firstname} {user?.lastname}
              </span>
              <Link href="/">
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300"
                >
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Total Businesses
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {businesses.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Active Businesses
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {businesses.filter((b) => b.isActive).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Coming Soon
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {businesses.filter((b) => !b.isActive).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              User Role
            </h3>
            <p className="text-lg font-bold text-purple-600 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        {/* Business Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Business Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="grid gap-6">
              {businesses.map((business) => (
                <div
                  key={business.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: business.theme.primaryColor }}
                      >
                        {business.displayName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {business.displayName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {business.seo.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Domain: {business.domain}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          business.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {business.isActive ? "Active" : "Coming Soon"}
                      </span>
                      {business.isActive && (
                        <Link
                          href={`https://${business.domain}`}
                          target="_blank"
                        >
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Visit Site
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Business Features */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {business.features.ecommerce && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        E-commerce
                      </span>
                    )}
                    {business.features.blog && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        Blog
                      </span>
                    )}
                    {business.features.portfolio && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        Portfolio
                      </span>
                    )}
                    {business.features.booking && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                        Booking
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white p-4 h-auto flex flex-col items-center">
                <svg
                  className="w-6 h-6 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Business
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto flex flex-col items-center">
                <svg
                  className="w-6 h-6 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                View Analytics
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto flex flex-col items-center">
                <svg
                  className="w-6 h-6 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
