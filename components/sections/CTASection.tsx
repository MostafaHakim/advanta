"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Calendar,
  Sparkles,
  Target,
  Zap,
  Globe,
} from "lucide-react";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    { text: "Free consultation & strategy session", icon: Sparkles },
    { text: "Customized marketing plan", icon: Target },
    { text: "30-day results guarantee", icon: Zap },
    { text: "No long-term contracts required", icon: CheckCircle },
    { text: "Dedicated account manager", icon: MessageCircle },
    { text: "Monthly performance reports", icon: Globe },
  ];

  const services = [
    "SEO Optimization",
    "PPC Advertising",
    "Social Media Marketing",
    "Web Development",
    "Content Marketing",
    "Brand Strategy",
    "Email Marketing",
    "Other",
  ];

  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex flex-col justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />

      {/* Light Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-10" />

      {/* Main Container */}
      <div className="container-custom relative z-10 md:py-8 lg:py-10">
        {/* Decorative Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-6 md:mb-6 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg bg-blue-50 border border-blue-100 mb-4 md:mb-6">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
            <span className="text-xs md:text-sm font-medium text-blue-700 tracking-wider">
              LET'S CREATE MAGIC
            </span>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
          </div>

          <h2 className="text-xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-blue-600">Transform</span>
            <br />
            <span className="text-gray-900">Your Digital Presence</span>
          </h2>

          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let's craft a digital strategy that not only looks stunning but
            <span className="text-blue-600 font-medium">
              {" "}
              delivers measurable results
            </span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start px-4">
          {/* Left Content - Enhanced Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Floating Card Effect */}
            <div className="relative bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <Target className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
                Why Partner With Us?
              </h3>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-200"
                    >
                      <div className="p-1.5 md:p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-all flex-shrink-0">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      </div>
                      <span className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                        {benefit.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">
                    98%
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Client Satisfaction
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">
                    150+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Projects Delivered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">
                    24h
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Response Time
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative  "
          >
            {/* Form Container */}
            <div className="relative bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 md:p-2 rounded-full bg-blue-600 flex-shrink-0">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                      Start Your Journey
                    </h3>
                    <p className="text-blue-600 text-xs md:text-sm">
                      Fill the form below and let's create something
                      extraordinary
                    </p>
                  </div>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 md:py-12"
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                      <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                      <div className="absolute inset-2 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      Success!
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      Our digital wizards will contact you within
                      <span className="text-blue-600 font-medium">
                        {" "}
                        24 hours
                      </span>
                    </p>
                    <div className="mt-4 md:mt-6 inline-flex items-center gap-2 text-xs md:text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                      Preparing your personalized strategy
                    </div>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      {[
                        {
                          name: "name",
                          label: "Your Name *",
                          placeholder: "Mostafa",
                          type: "text",
                        },
                        {
                          name: "email",
                          label: "Email Address *",
                          placeholder: "mostafa@example.com",
                          type: "email",
                        },
                      ].map((field) => (
                        <motion.div
                          key={field.name}
                          whileHover={{ scale: 1.02 }}
                          onHoverStart={() => setHoveredField(field.name)}
                          onHoverEnd={() => setHoveredField(null)}
                        >
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={
                              formData[field.name as keyof typeof formData]
                            }
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-gray-50 border transition-all duration-300 text-sm md:text-base ${
                              hoveredField === field.name
                                ? "border-blue-500 shadow-sm"
                                : "border-gray-300 hover:border-blue-400"
                            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                            placeholder={field.placeholder}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-gray-50 border border-gray-300 hover:border-blue-400 transition-all duration-300 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                          placeholder="+8801722440899"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                          Service Interested In *
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-gray-50 border border-gray-300 hover:border-blue-400 transition-all duration-300 text-sm md:text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 pr-10"
                          >
                            <option value="" className="bg-white">
                              Select a service
                            </option>
                            {services.map((service) => (
                              <option
                                key={service}
                                value={service}
                                className="bg-white"
                              >
                                {service}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-500 rotate-90" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                        Your Project Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-gray-50 border border-gray-300 hover:border-blue-400 transition-all duration-300 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
                        placeholder="Tell us about your vision, goals, and challenges..."
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full group relative overflow-hidden bg-blue-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg font-bold text-base md:text-lg transition-all duration-300 hover:bg-blue-700 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ borderRadius: "8px" }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center relative z-10">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 md:h-5 md:w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating Your Strategy...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center relative z-10">
                          Begin Your Transformation
                          <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                      )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center mt-4 md:mt-6">
                      <span className="text-gray-600">
                        By submitting, you agree to our{" "}
                      </span>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Privacy Policy
                      </a>
                      <span className="text-gray-600">
                        . Your data is encrypted and secure.
                      </span>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-6 lg:mt-12 md:mt-20 pt-6 md:pt-12 border-t border-gray-200 px-4"
        >
          <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
            Not ready for a full consultation? Start with a quick chat
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-sm md:text-base whitespace-nowrap"
              style={{ borderRadius: "8px" }}
            >
              Schedule 15-min Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-sm md:text-base whitespace-nowrap"
              style={{ borderRadius: "8px" }}
            >
              View Case Studies
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-sm md:text-base whitespace-nowrap"
              style={{ borderRadius: "8px" }}
            >
              Download Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
