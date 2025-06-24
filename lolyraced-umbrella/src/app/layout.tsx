import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./layouts/ClientLayout";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { generateBusinessMetadata } from "@/utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return await generateBusinessMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased cursor-none`}>
        <CustomCursor />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
