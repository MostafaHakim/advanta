"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner = ({
  size = "md",
  fullScreen = false,
  text,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>

        {/* Animated spinner */}
        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Gradient effect */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
      </div>

      {text && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 font-medium">{text}</p>
          <p className="text-sm text-gray-500 mt-1">Please wait...</p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
