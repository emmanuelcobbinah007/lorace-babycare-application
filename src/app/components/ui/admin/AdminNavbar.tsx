"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navlink from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "iconsax-reactjs";
import axios from "axios";
import { useRouter } from "next/navigation";

import loraceLogo from "../../../../../public/images/loraceLogo.png";

const NEXT_PUBLIC_ROOT_URL =
  process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000";

const AdminNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  interface UserType {
    firstname: string;
    lastname: string;
    email: string;
  }

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

  return (
    <div className="w-[20%] h-screen fixed flex flex-col justify-between bg-[#f2fbfe] border border-r-[#4fb3e5] ">
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
          {links.map(({ href, label }) => {
            return (
              <Navlink key={label} href={href}>
                <li
                  className={`${pathname === href ? "text-[#b970a0]" : ""} hover:scale-105 hover:text-[#b970a0] duration-300 hover:cursor-none`}
                >
                  {label}
                </li>
              </Navlink>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="flex mx-auto items-center gap-4 w-[90%]">
          <User
            size="35"
            className="ml-3 p-1 h-8 scale-115 text-black bg-white rounded-full"
          />
          <div>
            <p className="text-black text-sm">
              {loading
                ? "Fullname Loading..."
                : `${user?.firstname} ${user?.lastname}`}
              {/* Grace Domfeh */}
            </p>
            <p className="text-gray-500 text-xs">
              {loading
                ? "Email Loading..."
                : (user?.email ?? "").length > 20
                  ? `${(user?.email ?? "").slice(0, 20)}...`
                  : user?.email}
              {/* loracebabycare@gmail.com */}
            </p>
          </div>
        </div>
        <button
          onClick={initLogout}
          className="w-[80%] mx-[10%] bg-[#4fb3e5] text-white rounded-full py-2 my-6 hover:cursor-none hover:bg-[#3da5d6] transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
