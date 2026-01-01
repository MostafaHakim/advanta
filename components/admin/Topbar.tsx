"use client";

import { useState } from "react";
import { Search, Bell, HelpCircle, Menu, X } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center hover:from-blue-100 hover:to-purple-100 transition-all"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, projects, settings..."
                className="w-64 lg:w-80 pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center hover:from-blue-100 hover:to-purple-100 transition-all group">
              <Bell className="w-5 h-5 text-gray-700" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            {/* Help */}
            <button className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center hover:from-blue-100 hover:to-purple-100 transition-all">
              <HelpCircle className="w-5 h-5 text-gray-700" />
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
              <button className="relative group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                {/* Online Status */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
