"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  ArrowRight,
  Calendar,
  Users,
  Target,
  BarChart,
} from "lucide-react";

interface ServiceDetailProps {
  service: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    heroImage: string;
    icon: string;
    color: string;
    features: Array<{
      title: string;
      description: string;
      items: string[];
    }>;
    process: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    results: Array<{
      metric: string;
      value: string;
      description: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    pricing: {
      starter: {
        price: string;
        features: string[];
      };
      professional: {
        price: string;
        features: string[];
      };
      enterprise: {
        price: string;
        features: string[];
      };
    };
  };
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`}
        />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <span className="text-2xl mr-2">{service.icon}</span>
                <span className="text-sm font-medium">Service</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {service.title}
              </h1>

              <p className="text-2xl font-light mb-8 opacity-90">
                {service.tagline}
              </p>

              <p className="text-lg text-gray-600 mb-8">
                {service.longDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Get Started</button>
                <a
                  href="#pricing"
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  View Pricing
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div
                className={`bg-gradient-to-br ${service.color} rounded-3xl p-1`}
              >
                <div className="bg-white rounded-3xl p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold">Quick Start</h3>
                    <p className="text-gray-600">Get started in 3 easy steps</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        icon: <Calendar className="w-6 h-6" />,
                        text: "Schedule Free Consultation",
                      },
                      {
                        icon: <Target className="w-6 h-6" />,
                        text: "Custom Strategy Development",
                      },
                      {
                        icon: <BarChart className="w-6 h-6" />,
                        text: "Launch & Optimize Campaigns",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-4">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-medium">Step {index + 1}</div>
                          <div className="text-gray-600">{item.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Expected <span className="text-blue-600">Results</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Here's what you can expect from our {service.title} services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.results.map((result, index) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {result.value}
                </div>
                <h4 className="text-xl font-bold mb-2">{result.metric}</h4>
                <p className="text-gray-600">{result.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What's <span className="text-blue-600">Included</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Comprehensive features to ensure your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>

                <ul className="space-y-3">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-blue-600">Process</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A structured approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>

                  {index < service.process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pricing <span className="text-blue-600">Plans</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(service.pricing).map(([plan, details], index) => (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border-2 p-8 ${
                  plan === "professional"
                    ? "border-blue-600 shadow-xl"
                    : "border-gray-200"
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 capitalize">
                    {plan} Plan
                  </h3>
                  <div className="text-4xl font-bold text-blue-600">
                    {details.price}
                  </div>
                  {plan === "professional" && (
                    <div className="mt-2 text-sm text-emerald-600 font-medium">
                      Most Popular
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-medium ${
                    plan === "professional"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Need a custom plan? We can tailor a solution for your specific
              needs.
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Request Custom Quote →
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Common questions about our {service.title} services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-6"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
