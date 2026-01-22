"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  MessageSquare,
  CreditCard,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Clients",
      href: "/admin/dashboard/clients",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Projects",
      href: "/admin/dashboard/projects",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      name: "Services",
      href: "/admin/dashboard/services",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      name: "Blog",
      href: "/admin/dashboard/blog",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Messages",
      href: "/admin/dashboard/messages",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      name: "Payments",
      href: "/admin/dashboard/payments",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/admin/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden "
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          h-auto fixed
        bottom-0 top-0 left-0  bg-white text-gray-800
        transform transition-all duration-300 ease-in-out z-50 shadow-lg min-h-screen pb-10
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        ${collapsed ? "w-20" : "w-64"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center rounded-lg px-4 py-2.5 transition-all duration-200
                  ${
                    pathname === item.href
                      ? "bg-gray-900 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <div className={collapsed ? "" : "mr-3"}>{item.icon}</div>
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div
              className={`flex items-center ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <button
                onClick={handleLogout}
                className={`flex items-center w-full rounded-lg px-4 py-2.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <LogOut className="w-5 h-5" />
                {!collapsed && <span className="ml-3 font-medium">Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
