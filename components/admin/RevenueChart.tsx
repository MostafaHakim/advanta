"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

const RevenueChart = () => {
  const [data, setData] = useState<number[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  useEffect(() => {
    // Mock data for the chart
    const generateData = () => {
      const periods = {
        week: [4500, 5200, 4800, 6100, 5900, 7200, 6800],
        month: [
          32000, 35000, 42000, 38000, 45000, 52000, 58000, 62000, 55000, 60000,
          65000, 70000,
        ],
        quarter: [95000, 105000, 120000, 135000],
      };

      return periods[selectedPeriod as keyof typeof periods] || periods.week;
    };

    setData(generateData());
  }, [selectedPeriod]);

  const maxValue = Math.max(...data);
  const periods = [
    { label: "W", value: "week" },
    { label: "M", value: "month" },
    { label: "Q", value: "quarter" },
    { label: "Y", value: "year" },
  ];

  const getLabels = () => {
    switch (selectedPeriod) {
      case "week":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "month":
        return Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
      case "quarter":
        return ["Q1", "Q2", "Q3", "Q4"];
      default:
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    }
  };

  return (
    <div>
      {/* Chart Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Revenue Growth</span>
        </div>
        <div className="flex items-baseline">
          <div className="text-3xl font-bold text-gray-900">
            ${data.reduce((a, b) => a + b, 0).toLocaleString()}
          </div>
          <div className="ml-3 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.5%
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-48">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-gray-100"></div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end space-x-1 md:space-x-2">
          {data.map((value, index) => {
            const height = (value / maxValue) * 100;
            const gradient =
              index % 2 === 0
                ? "from-blue-500 to-blue-600"
                : "from-purple-500 to-purple-600";

            return (
              <div key={index} className="flex-1 group relative">
                <div
                  className={`h-[${height}%] min-h-[20px] rounded-t-lg bg-gradient-to-t ${gradient} group-hover:opacity-90 transition-all duration-300`}
                  style={{ height: `${height}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    <div className="font-bold">${value.toLocaleString()}</div>
                    <div className="text-gray-300">
                      +{Math.round((value / data[0] - 1) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-4">
        {getLabels().map((label, index) => (
          <div key={index} className="text-xs text-gray-500">
            {label}
          </div>
        ))}
      </div>

      {/* Period Selector */}
      <div className="flex justify-center mt-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === period.value
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
