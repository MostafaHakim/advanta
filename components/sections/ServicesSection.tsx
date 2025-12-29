"use client";

import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  MessageSquare,
  Code,
  PenTool,
  BarChart,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "SEO Optimization",
    description:
      "Improve your search engine rankings with our comprehensive SEO strategies.",
    features: [
      "Keyword Research",
      "On-page SEO",
      "Technical SEO",
      "Link Building",
    ],
    color: "bg-blue-500",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "PPC Advertising",
    description: "Drive instant traffic with targeted pay-per-click campaigns.",
    features: [
      "Google Ads",
      "Facebook Ads",
      "LinkedIn Ads",
      "Conversion Tracking",
    ],
    color: "bg-purple-500",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Social Media Marketing",
    description: "Engage your audience across all social media platforms.",
    features: [
      "Content Strategy",
      "Community Management",
      "Influencer Marketing",
      "Analytics",
    ],
    color: "bg-pink-500",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    description: "Build fast, responsive, and conversion-optimized websites.",
    features: [
      "React/Next.js",
      "E-commerce",
      "WordPress",
      "Performance Optimization",
    ],
    color: "bg-emerald-500",
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Content Marketing",
    description:
      "Create compelling content that drives engagement and conversions.",
    features: [
      "Blog Writing",
      "Video Production",
      "Infographics",
      "Content Strategy",
    ],
    color: "bg-orange-500",
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "Analytics & Reporting",
    description: "Data-driven insights to optimize your marketing performance.",
    features: [
      "Google Analytics",
      "Custom Dashboards",
      "ROI Tracking",
      "Competitor Analysis",
    ],
    color: "bg-indigo-500",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive{" "}
            <span className="text-blue-600">Digital Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer end-to-end digital marketing services to help your business
            thrive in the online world.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 group-hover:border-blue-200">
                {/* Icon */}
                <div
                  className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-700"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/services/${service.title
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="btn-primary inline-flex items-center group"
          >
            View All Services
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
