"use client";

import HeaderBar from "../components/ui/home/Header/HeaderBar";
import Footer from "../components/ui/Footer/Footer";

import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
    
    return (
        <>
            <HeaderBar />
                {children}
            <Footer />
        </>
    )
}