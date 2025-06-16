import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./layouts/ClientLayout";
import CustomCursor from "./components/CustomCursor/CustomCursor";

export const metadata: Metadata = {
  title: "Lorace Babycare",
  description: "Pamper your baby for less",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased cursor-none`} >
        <CustomCursor/>
        <ClientLayout>
        {children}
        </ClientLayout>
      </body>
    </html>
  );
}
