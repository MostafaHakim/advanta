"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: "🔍",
    title: "SEO Optimization",
    description:
      "Comprehensive SEO strategies to improve search rankings and drive organic traffic.",
    features: [
      "Technical SEO Audit",
      "Keyword Strategy",
      "Content Optimization",
      "Link Building",
      "Local SEO",
      "Performance Tracking",
    ],
    color: "blue",
    metrics: [
      { label: "Avg. Traffic Growth", value: "250%" },
      { label: "ROI", value: "8x" },
    ],
  },
  {
    icon: "📈",
    title: "PPC Advertising",
    description:
      "Data-driven PPC campaigns maximizing ROI across all digital platforms.",
    features: [
      "Google Ads Management",
      "Facebook/Instagram Ads",
      "Conversion Tracking",
      "A/B Testing",
      "ROI Optimization",
      "Audience Targeting",
    ],
    color: "indigo",
    metrics: [
      { label: "Avg. Cost Reduction", value: "40%" },
      { label: "Conversion Lift", value: "200%" },
    ],
  },
  {
    icon: "💬",
    title: "Social Media Marketing",
    description:
      "Building engaged communities and driving brand awareness across social platforms.",
    features: [
      "Content Strategy",
      "Community Management",
      "Influencer Marketing",
      "Social Analytics",
      "Campaign Management",
      "Brand Awareness",
    ],
    color: "purple",
    metrics: [
      { label: "Avg. Engagement", value: "8.5%" },
      { label: "Follower Growth", value: "+150%" },
    ],
  },
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "High-performance websites and applications with cutting-edge technology.",
    features: [
      "React/Next.js Development",
      "E-commerce Solutions",
      "Mobile Optimization",
      "API Integration",
      "Performance Optimization",
      "Maintenance & Support",
    ],
    color: "blue",
    metrics: [
      { label: "Page Load Speed", value: "<2s" },
      { label: "Conversion Increase", value: "35%" },
    ],
  },
  {
    icon: "✍️",
    title: "Content Marketing",
    description:
      "Strategic content creation that drives engagement and establishes authority.",
    features: [
      "Content Strategy",
      "Blog & Article Writing",
      "Video Production",
      "Email Marketing",
      "Content Distribution",
      "Analytics & Reporting",
    ],
    color: "indigo",
    metrics: [
      { label: "Lead Generation", value: "+500%" },
      { label: "Time on Page", value: "+60%" },
    ],
  },
  {
    icon: "📊",
    title: "Analytics & Strategy",
    description:
      "Data-driven insights and strategic planning for sustainable growth.",
    features: [
      "Business Intelligence",
      "Market Analysis",
      "Competitor Research",
      "KPI Dashboard",
      "Growth Strategy",
      "Monthly Reporting",
    ],
    color: "purple",
    metrics: [
      { label: "Decision Accuracy", value: "95%" },
      { label: "Cost Savings", value: "30%" },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section className="relative py-8 lg:py-10 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50/50 to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 border border-blue-200/30 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header with Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-6 lg:mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Our Expertise
              </span>
            </div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold pb-4 lg:mb-6">
            <span className="text-gray-900">Comprehensive</span>
            <br />
            <span className="text-blue-600">Digital Solutions</span>
          </h2>

          <p className="text-md lg:text-xl text-gray-600 max-w-3xl mx-auto leading-none lg:leading-relaxed">
            End-to-end digital marketing services designed to drive measurable
            results and sustainable growth for your business.
          </p>
        </motion.div>

        {/* Services Grid with Enhanced Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4 lg:mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Color Accent */}
                <div
                  className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-blue-600`}
                />

                {/* Icon */}
                <div className="relative mb-2 lg:mb-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-50 rounded-full blur-xl opacity-50" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {service.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="text-center p-3 bg-blue-50 rounded-xl"
                      >
                        <div className="text-2xl font-bold text-blue-600">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                      Included Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/services/${service.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="relative inline-flex items-center gap-2 text-blue-600 font-semibold group/btn"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover/btn:w-full transition-all duration-300" />
                </Link>
              </div>

              {/* Floating Effect */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-100/30 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100"
        >
          <div className="text-center mb-4 lg:mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Proven Process
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A structured approach ensuring success at every stage of your
              digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Understand your goals & challenges",
              },
              {
                step: "02",
                title: "Strategy",
                desc: "Create data-driven marketing plan",
              },
              {
                step: "03",
                title: "Execution",
                desc: "Implement & optimize campaigns",
              },
              { step: "04", title: "Growth", desc: "Scale & maximize ROI" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-4 lg:mt-20"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
