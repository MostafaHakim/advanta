"use client";

import { cn } from "@/lib/utils"; // Assuming you have a utility for classnames

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col border border-gray-100 rounded-xl p-4 bg-white space-y-4 hover:bg-gray-100">
      <div className="flex flex-row items-center justify-between text-[17px]">
        <p>{title}</p>
        <span className="p-2 rounded-full bg-[#48dbfb]/20 text-[#48dbfb]">
          {icon}
        </span>
      </div>
      <h2 className="text-2xl">{value}</h2>
    </div>
  );
};

export default StatCard;
