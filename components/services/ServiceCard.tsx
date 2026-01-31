"use client";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  ChevronRight,
  Globe,
  Code,
} from "lucide-react";
import { motion } from "framer-motion";

interface Service {
  _id: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  features: {
    title: string;
    description: string;
    items: string[];
  }[];
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const getGradientColor = (color?: string) => {
    const colors = {
      blue: "from-blue-500 via-blue-600 to-indigo-700",
      purple: "from-purple-500 via-purple-600 to-indigo-700",
      green: "from-emerald-500 via-emerald-600 to-teal-700",
      orange: "from-orange-500 via-orange-600 to-amber-700",
      pink: "from-pink-500 via-rose-600 to-fuchsia-700",
    };

    return color && colors[color as keyof typeof colors]
      ? colors[color as keyof typeof colors]
      : "from-blue-500 via-blue-600 to-indigo-700";
  };

  const getTextColor = (color?: string) => {
    const colors = {
      blue: "text-blue-600",
      purple: "text-purple-600",
      green: "text-emerald-600",
      orange: "text-orange-600",
      pink: "text-rose-600",
    };

    return color && colors[color as keyof typeof colors]
      ? colors[color as keyof typeof colors]
      : "text-blue-600";
  };

  const benefits = service.features.map((feature) => feature.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div
        className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-3xl"
        style={{
          backgroundImage: `linear-gradient(to right, ${service.color || "#3b82f6"}, ${service.color || "#6366f1"})`,
        }}
      />

      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
        {/* Card Header with Gradient */}
        <div
          className={`relative overflow-hidden bg-gradient-to-r ${getGradientColor(service.color)} p-8`}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/20 translate-y-12 -translate-x-8" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-3xl text-white">
                    <Globe />
                  </span>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-sm font-medium text-white/90">
                      Premium
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-white/80">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm text-white/80">Fast Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-8">
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            {service.description}
          </p>

          {/* Benefits Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2 h-8 rounded-full ${getTextColor(service.color)} bg-gradient-to-b from-current to-transparent`}
              />
              <h4 className="text-xl font-bold text-gray-900">Key Benefits</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {benefits.slice(0, 4).map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 group-hover:border-${service.color}-100 transition-colors duration-300`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${getTextColor(service.color)}/10 flex items-center justify-center mr-3`}
                  >
                    <Check
                      className={`w-4 h-4 ${getTextColor(service.color)}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                What&apos;s Included:
              </span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white text-gray-700">
                {service.features.length}+ Features
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.features[0]?.items.slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 ${getTextColor(service.color)}/10 ${getTextColor(service.color)} rounded-full text-xs font-medium`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                className="group/link relative flex items-center gap-2"
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-4 ${getTextColor(service.color)}/10 rounded-full blur-md group-hover/link:opacity-100 opacity-0 transition-opacity duration-300`}
                  />
                  <span
                    className={`relative ${getTextColor(service.color)} font-semibold flex items-center gap-2`}
                  >
                    Explore Service
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden`}
                style={{
                  background: `linear-gradient(135deg, ${service.color || "#3b82f6"}, ${service.color || "#6366f1"})`,
                }}
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24h</div>
                <div className="text-xs text-gray-500">Response Time</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-xs text-gray-500">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-32 h-32 ${getTextColor(service.color)}/5 rotate-45 -translate-y-16 translate-x-16`}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
          <div
            className={`absolute bottom-0 left-0 w-32 h-32 ${getTextColor(service.color)}/5 -rotate-45 translate-y-16 -translate-x-16`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
