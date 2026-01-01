"use client";

import { cn } from "@/lib/utils"; // Assuming you have a utility for classnames

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = ({
  title,
  value,
  change,
  icon,
  color,
}: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
        <div className="flex items-center mt-2">
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full flex items-center",
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-xs text-gray-500 ml-2">vs. last month</span>
        </div>
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white",
          color
        )}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;