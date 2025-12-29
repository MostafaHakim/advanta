"use client";

import { motion } from "framer-motion";
import { Check, X, Star } from "lucide-react";
import Link from "next/link";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  popular: boolean;
  icon: React.ReactNode;
  color: string;
}

interface PricingCardProps {
  plan: Plan;
  billingCycle: "monthly" | "yearly";
}

const PricingCard = ({ plan, billingCycle }: PricingCardProps) => {
  const price =
    billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const period = billingCycle === "monthly" ? "/month" : "/year";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative rounded-2xl border-2 transition-all duration-300 ${
        plan.popular
          ? "border-blue-600 shadow-2xl scale-105"
          : "border-gray-200 hover:border-blue-300 hover:shadow-xl"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 rounded-full flex items-center">
            <Star className="w-4 h-4 mr-2 fill-current" />
            <span className="font-medium">Most Popular</span>
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} text-white mb-4 mx-auto`}
          >
            {plan.icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-gray-600 ml-2">{period}</span>
          </div>
          {billingCycle === "yearly" && (
            <p className="text-emerald-600 font-medium mt-2">
              Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)}{" "}
              annually
            </p>
          )}
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              {feature.included ? (
                <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
              )}
              <span
                className={feature.included ? "text-gray-700" : "text-gray-400"}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className={`block text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Get Started
        </Link>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {plan.popular
              ? "Includes priority support"
              : "Standard support included"}
          </p>
          {billingCycle === "monthly" && (
            <p className="text-sm text-gray-500 mt-1">No long-term contract</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PricingCard;
