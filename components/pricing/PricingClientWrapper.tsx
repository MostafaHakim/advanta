"use client";

import { useState } from "react";
import { Zap, Users, Building, Star } from "lucide-react"; // Import necessary icons
import PricingCard from "./PricingCard"; // Corrected to default import

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanData { // Data received from Server Component (without ReactNode/non-serializable parts)
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  popular: boolean;
}

interface PricingClientWrapperProps {
  initialPlans: PlanData[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  Starter: <Zap className="w-8 h-8" />,
  Professional: <Users className="w-8 h-8" />,
  Enterprise: <Building className="w-8 h-8" />,
};

const colorMap: { [key: string]: string } = {
  Starter: "from-blue-500 to-blue-600",
  Professional: "from-purple-500 to-purple-600",
  Enterprise: "from-emerald-500 to-emerald-600",
};


const PricingClientWrapper = ({ initialPlans }: PricingClientWrapperProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plansWithIconsAndColors = initialPlans.map(plan => ({
    ...plan,
    icon: iconMap[plan.name],
    color: colorMap[plan.name],
  }));

  return (
    <>
      {/* Billing Toggle */}
      <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-12">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            billingCycle === "monthly"
              ? "bg-white shadow-lg text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("yearly")}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            billingCycle === "yearly"
              ? "bg-white shadow-lg text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Yearly <span className="text-emerald-600 ml-1">(Save 20%)</span>
        </button>
      </div>

      <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-3 lg:gap-5 lg:space-y-0">
        {plansWithIconsAndColors.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            billingCycle={billingCycle}
          />
        ))}
      </div>
    </>
  );
};

export default PricingClientWrapper;
