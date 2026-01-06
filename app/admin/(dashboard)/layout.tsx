"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex flex-row">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
