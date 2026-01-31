"use client";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Calendar,
  Target,
  BarChart,
  ChevronRight,
  Sparkles,
  Zap,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";
import { useState } from "react";

interface ServiceDetailProps {
  service: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    longDescription?: string;
    tagline?: string;
    icon?: string;
    color?: string;
    category: string;
    features: {
      title: string;
      description: string;
      items: string[];
    }[];
    metrics: { label: string; value: string }[];
    process: {
      step: number;
      title: string;
      description: string;
    }[];
    faqs: {
      question: string;
      answer: string;
    }[];
    pricing: {
      starter: { price: string; features: string[] };
      professional: { price: string; features: string[] };
      enterprise: { price: string; features: string[] };
    };
  };
}

interface Result {
  label: string;
  value: string;
  metric: string;
  description: string;
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  const [selectedPricing, setSelectedPricing] = useState("professional");
  const results: Result[] | undefined = service.metrics?.map((metric) => ({
    ...metric,
    metric: metric.label,
    description: `for ${metric.label}`,
  }));

  const getColorClasses = () => {
    const colors = {
      blue: {
        gradient: "from-blue-500 via-blue-600 to-indigo-700",
        light: "from-blue-50 to-indigo-100",
        dark: "bg-blue-600",
        text: "text-blue-600",
        border: "border-blue-600",
        bg: "bg-blue-600",
      },
      purple: {
        gradient: "from-purple-500 via-purple-600 to-indigo-700",
        light: "from-purple-50 to-indigo-100",
        dark: "bg-purple-600",
        text: "text-purple-600",
        border: "border-purple-600",
        bg: "bg-purple-600",
      },
      green: {
        gradient: "from-emerald-500 via-emerald-600 to-teal-700",
        light: "from-emerald-50 to-teal-100",
        dark: "bg-emerald-600",
        text: "text-emerald-600",
        border: "border-emerald-600",
        bg: "bg-emerald-600",
      },
      orange: {
        gradient: "from-orange-500 via-orange-600 to-amber-700",
        light: "from-orange-50 to-amber-100",
        dark: "bg-orange-600",
        text: "text-orange-600",
        border: "border-orange-600",
        bg: "bg-orange-600",
      },
    };

    return colors.blue; // Default to blue, can be extended based on service.color
  };

  const colorClasses = getColorClasses();

  return (
    <div className="min-h-screen pt-10">
      {/* Hero Section */}
      <section className="pt-28 pb-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r ${colorClasses.gradient} opacity-20 blur-3xl`}
          />
          <div
            className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r ${colorClasses.gradient} opacity-20 blur-3xl`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    <Globe />
                  </span>
                </div>
                <span className="font-semibold text-gray-700">
                  Premium Service
                </span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </motion.div>

              {/* Title */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {service.title}
                  </span>
                </h1>

                <p className="text-2xl md:text-3xl font-light text-gray-600 leading-relaxed">
                  {service.tagline || service.description}
                </p>

                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                  {service.longDescription || service.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center gap-2">
                    <span>Get Started Today</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-500/30 translate-x-1 translate-y-1 -z-10" />
                </button>

                <a
                  href="#pricing"
                  className="group px-8 py-4 border-2 border-gray-200 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>View Pricing</span>
                    <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              </motion.div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
                {[
                  { icon: Clock, label: "Fast Results", value: "24-48 Hours" },
                  { icon: Shield, label: "Guarantee", value: "100% Safe" },
                  { icon: Users, label: "Clients", value: "500+" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl rotate-12 opacity-20 blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl -rotate-12 opacity-20 blur-xl" />

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
                  {/* Card Header */}
                  <div
                    className={`bg-gradient-to-r ${colorClasses.gradient} p-8 text-white`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Zap className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Quick Start</h3>
                          <p className="text-blue-100">
                            Get results in 3 steps
                          </p>
                        </div>
                      </div>
                      <Sparkles className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Card Steps */}
                  <div className="p-8 space-y-6">
                    {[
                      {
                        icon: <Calendar className="w-6 h-6" />,
                        title: "Schedule Free Consultation",
                        desc: "30-min strategy session",
                        color: "bg-blue-500",
                      },
                      {
                        icon: <Target className="w-6 h-6" />,
                        title: "Custom Strategy Development",
                        desc: "Personalized plan creation",
                        color: "bg-purple-500",
                      },
                      {
                        icon: <BarChart className="w-6 h-6" />,
                        title: "Launch & Optimize Campaigns",
                        desc: "Continuous improvement",
                        color: "bg-emerald-500",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center p-5 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
                      >
                        <div className="relative">
                          <div
                            className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white mr-5 group-hover:scale-110 transition-transform`}
                          >
                            {item.icon}
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="px-8 pb-8">
                    <button className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                      Start Your Journey
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Measurable Results
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transformative{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Outcomes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real metrics that drive your business forward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results?.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                    {result.value}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {result.metric}
                  </h4>
                  <p className="text-gray-500">{result.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${70 + index * 10}%` }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-medium mb-4">
              <Check className="w-4 h-4" />
              Everything Included
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the tools and strategies you need for success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.features?.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Feature Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Check className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-4">
                    {feature.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mr-4">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
              <Target className="w-4 h-4" />
              Proven Methodology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that guarantees success
            </p>
          </motion.div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 -translate-y-1/2" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process?.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-white shadow-lg z-10">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-r ${colorClasses.gradient} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Step Card */}
                  <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Step Indicator */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Step {step.step}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          2-3 days
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Transparent Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible options tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {service.pricing &&
              Object.entries(service.pricing).map(([plan, details], index) => (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-3xl border-2 p-8 transition-all duration-500 ${
                    plan === "professional"
                      ? "border-blue-500 shadow-2xl scale-105"
                      : "border-gray-200 shadow-lg"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan === "professional" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full text-sm shadow-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8 pt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                      {plan} Plan
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {details.price}
                      </span>
                      {plan === "enterprise" && (
                        <span className="text-sm text-gray-500">/custom</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {details.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 ${
                            plan === "professional"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <a
                    href="/contact"
                    className={`w-full block text-center py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl active:scale-95 ${
                      plan === "professional"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {plan === "enterprise"
                      ? "Contact Sales"
                      : "Get Started Now"}
                  </a>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 font-medium mb-4">
              <Shield className="w-4 h-4" />
              FAQ Support
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Questions?{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Answered
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our service
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {service.faqs?.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 p-8 hover:border-purple-200 hover:shadow-xl transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex flex-col items-center gap-6 p-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Our team is here to help you get the answers you need.
                  </p>
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300">
                    Contact Our Support Team
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
