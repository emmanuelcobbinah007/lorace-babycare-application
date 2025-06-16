"use client";

import { usePathname } from "next/navigation";

import { ReactNode } from "react";
import AdminNavbar from "../components/ui/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");

    if (!isAdminPage) return children;

    return (
        <>
            <div className="flex min-h-screen w-[100%] bg-[#f2fbfe]">
            <AdminNavbar />
            <div className="flex flex-col w-[100%] bg-[#f2fbfe]">
            {children}
            </div>
            </div>
        </>
    )
}