"use client";

import { usePathname } from "next/navigation";
import HeaderBar from "../components/ui/home/Header/HeaderBar";
import Footer from "../components/ui/Footer/Footer";
import QueryProvider from "../providers/QueryProvider";
import { ModalProvider } from "../contexts/ModalContext";

import { ReactNode } from "react";

export default function ClientLayout({ children }: { 
children: ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");    if (isAdminPage) return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );    return (
        <QueryProvider>
            <ModalProvider>
                <HeaderBar />
                    {children}
                <Footer />
            </ModalProvider>
        </QueryProvider>
    )
}