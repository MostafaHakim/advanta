"use client";

import { DollarSign, Briefcase, Users, Target } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! You have successfully logged in.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$0"
          change={0}
          icon={<DollarSign className="w-6 h-6" />}
          color="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Active Projects"
          value="0"
          change={0}
          icon={<Briefcase className="w-6 h-6" />}
          color="from-blue-500 to-cyan-600"
        />
        <StatCard
          title="New Clients"
          value="0"
          change={0}
          icon={<Users className="w-6 h-6" />}
          color="from-purple-500 to-pink-600"
        />
        <StatCard
          title="Conversion Rate"
          value="0%"
          change={0}
          icon={<Target className="w-6 h-6" />}
          color="from-orange-500 to-red-600"
        />
      </div>
    </div>
  );
}
