"use client";

import { useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  UserPlus,
  FileText,
  MessageSquare,
  DollarSign,
  Calendar,
} from "lucide-react";

const RecentActivity = () => {
  const [activities] = useState([
    {
      id: 1,
      type: "client",
      title: "New client registration",
      description: "John Doe signed up for SEO services",
      time: "10 min ago",
      status: "completed",
      icon: <UserPlus className="w-4 h-4" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "project",
      title: "Project milestone completed",
      description: "E-commerce website development phase 2",
      time: "1 hour ago",
      status: "completed",
      icon: <CheckCircle className="w-4 h-4" />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment received",
      description: "$2,500 from TechCorp Inc.",
      time: "2 hours ago",
      status: "completed",
      icon: <DollarSign className="w-4 h-4" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      type: "support",
      title: "New support ticket",
      description: "Client needs help with analytics setup",
      time: "3 hours ago",
      status: "pending",
      icon: <AlertCircle className="w-4 h-4" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 5,
      type: "blog",
      title: "Blog post published",
      description: '"SEO Trends 2024" is now live',
      time: "5 hours ago",
      status: "completed",
      icon: <FileText className="w-4 h-4" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 6,
      type: "meeting",
      title: "Upcoming meeting",
      description: "Strategy call with Marketing Team",
      time: "Tomorrow, 10:00 AM",
      status: "scheduled",
      icon: <Calendar className="w-4 h-4" />,
      color: "bg-indigo-100 text-indigo-600",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-900">Recent Activities</h4>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="group p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
          >
            <div className="flex items-start">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}
              >
                {activity.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-900">
                    {activity.title}
                  </h5>
                  <div className="flex items-center">
                    {getStatusIcon(activity.status)}
                    <span className="text-xs text-gray-500 ml-2">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>

                {/* Status Badge */}
                <div className="mt-2 flex items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${
                      activity.status === "completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : activity.status === "pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
