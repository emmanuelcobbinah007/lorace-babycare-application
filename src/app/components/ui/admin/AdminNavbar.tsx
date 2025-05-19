"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navlink from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "iconsax-reactjs";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";

import loraceLogo from "../../../../../public/images/loraceLogo.png";

const NEXT_PUBLIC_ROOT_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const AdminNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  interface UserType {
    firstname: string;
    lastname: string;
    email: string;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveUser = async () => {
      const res = await axios.get(`${NEXT_PUBLIC_ROOT_URL}/api/auth/me`, {
        withCredentials: true,
      });

      setUser(res.data.user);
      setLoading(false);
    };
    retrieveUser();
  }, []);

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/inventory", label: "Inventory" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/subcategories", label: "SubCategories" },
    { href: "/admin/manage-sales", label: "Manage Sales" },
    { href: "/admin/email-list", label: "Email List" },
  ];

  const initLogout = async () => {
    await axios.get(`${NEXT_PUBLIC_ROOT_URL}/api/auth/logout`, {
      withCredentials: true,
    });

    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Button to toggle menu on small screens */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-7 text-xl left-4 z-50 text-[#000] px-2 py-2 rounded-md flex items-center space-x-2"
      >
        {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
      </button>

      <aside
        className={`fixed top-0 left-0 w-64 md:w-[20%] bg-white shadow-md min-h-screen transform transition-transform duration-300 z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col justify-between`}
      >
        <div className="w-full h-screen flex flex-col justify-between bg-[#f2fbfe] border-r border-[#4fb3e5] p-4">
          <div className="py-4">
            <Link href="/">
              <Image
                src={loraceLogo}
                alt="Lorace Logo"
                className="w-[100px] h-auto mx-auto mt-4"
              />
            </Link>
          </div>
          <div>
            <ul className="flex flex-col gap-6 items-center justify-center font-medium text-md">
              {links.map(({ href, label }) => (
                <Navlink key={label} href={href}>
                  <li
                    className={`${
                      pathname === href ? "text-[#b970a0]" : ""
                    } hover:scale-105 hover:text-[#b970a0] duration-300`}
                  >
                    {label}
                  </li>
                </Navlink>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex mx-auto justify-center md:justify-start items-center gap-4 w-[90%]">
              <User
                size="35"
                className="ml-3 p-1 h-8 scale-115 text-black bg-white rounded-full"
              />
              <div>
                <p className="text-black text-sm">
                  {loading
                    ? "Fullname Loading..."
                    : `${user?.firstname} ${user?.lastname}`}
                </p>
                <p className="text-gray-500 text-xs">
                  {loading
                    ? "Email Loading..."
                    : (user?.email ?? "").length > 20
                    ? `${(user?.email ?? "").slice(0, 20)}...`
                    : user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={initLogout}
              className="w-[80%] mx-[10%] bg-[#4fb3e5] text-white rounded-full py-2 my-6 hover:bg-[#3da5d6] transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for small screens when menu is open */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default AdminNavbar;
