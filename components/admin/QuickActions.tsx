"use client";

import {
  Plus,
  FileText,
  UserPlus,
  BarChart,
  Settings,
  Mail,
  Download,
  Share2,
} from "lucide-react";
import { useState } from "react";

const QuickActions = () => {
  const [actions] = useState([
    {
      id: 1,
      title: "Add New Client",
      description: "Register a new client account",
      icon: <UserPlus className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      href: "/admin/clients/new",
    },
    {
      id: 2,
      title: "Create Invoice",
      description: "Generate new billing invoice",
      icon: <FileText className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      href: "/admin/invoices/new",
    },
    {
      id: 3,
      title: "Send Newsletter",
      description: "Email campaign to clients",
      icon: <Mail className="w-5 h-5" />,
      color: "from-emerald-500 to-green-500",
      href: "/admin/marketing/newsletter",
    },
    {
      id: 4,
      title: "Generate Report",
      description: "Create performance report",
      icon: <BarChart className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      href: "/admin/reports",
    },
    {
      id: 5,
      title: "Export Data",
      description: "Download client data",
      icon: <Download className="w-5 h-5" />,
      color: "from-indigo-500 to-blue-500",
      href: "/admin/export",
    },
    {
      id: 6,
      title: "Settings",
      description: "Manage admin settings",
      icon: <Settings className="w-5 h-5" />,
      color: "from-gray-600 to-gray-800",
      href: "/admin/settings",
    },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-900">Quick Actions</h4>
        <span className="text-sm text-gray-600">Click to perform actions</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="group p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="flex items-start">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform`}
              >
                {action.icon}
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {action.title}
                </h5>
                <p className="text-xs text-gray-600 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Add New Button */}
      <div className="pt-4 border-t border-gray-100">
        <button className="w-full p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 group">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 mb-3">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">Add Custom Action</span>
            <span className="text-sm text-gray-600 mt-1">
              Create your own quick action
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
