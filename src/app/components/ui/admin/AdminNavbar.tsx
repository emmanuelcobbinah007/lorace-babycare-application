import React from "react";
import Image from "next/image";
import Navlink from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "iconsax-reactjs"

import loraceLogo from "../../../../../public/images/loraceLogo.png";

const AdminNavbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/inventory", label: "Inventory" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/subcategories", label: "SubCategories" },
    { href: "/admin/manage-sales", label: "Manage Sales" },
    { href: "/admin/email-list", label: "Email List" },
  ];

  return (
    <div className="w-[20%] flex flex-col justify-between bg-[#f2fbfe] border border-r-[#4fb3e5] ">
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
                <li className={`${pathname === href ? 'text-[#b970a0]' : ''} hover:scale-105 hover:text-[#b970a0] duration-300 hover:cursor-none`}>
                  {label}
                </li>
              </Navlink>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="flex mx-auto items-center gap-4 w-[80%]">
            <User
                          size="40"
                          className="p-1 h-8 scale-115 text-black bg-white rounded-full"
                        />
            <div>
            <p className="text-black text-sm">
                Grace Domfeh
            </p>
            <p className="text-gray-500 text-xs">
                gracedomfeh@gmail.com
            </p>
            </div>
        </div>
        <button className="w-[80%] mx-[10%] bg-[#4fb3e5] text-white rounded-full py-2 my-6 hover:cursor-none hover:bg-[#3da5d6] transition duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
