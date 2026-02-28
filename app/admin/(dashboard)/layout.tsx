"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // মোবাইল ডিটেক্ট করার জন্য
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // ডেস্কটপে সাইডবার ওপেন রাখবো
      } else {
        setSidebarOpen(false); // মোবাইলে ক্লোজ রাখবো
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <div className="flex flex-col h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex flex-1 overflow-hidden relative">
          {/* সাইডবার - মোবাইলে ওভারলে হিসেবে */}
          <div
            className={`
              fixed md:relative z-30 h-full transition-all duration-300 ease-in-out
              ${sidebarOpen ? "left-0" : "-left-64 md:left-0"} 
              ${!sidebarOpen && isMobile ? "hidden" : ""}
            `}
          >
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* মোবাইলে ওভারলে ব্যাকড্রপ */}
          {sidebarOpen && isMobile && (
            <div
              className="fixed inset-0 bg-black/50 z-20 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* মেইন কন্টেন্ট - ফুল রেস্পন্সিভ */}
          <main
            className={`
            flex-1 overflow-y-auto transition-all duration-300
            ${sidebarOpen && !isMobile ? "md:ml-64" : ""}
            p-4 md:p-6 lg:p-8
            w-full
          `}
          >
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
