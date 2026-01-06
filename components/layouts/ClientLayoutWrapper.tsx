"use client";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import React from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <main className="min-h-screen w-full left-0 right-0 overflow-x-hidden">
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
