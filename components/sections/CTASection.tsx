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
    >
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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b45] to-[#1a0b2e] min-h-screen flex flex-col justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-purple-300/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              y: [null, `-${Math.random() * 100}px`],
              x: [null, `-${Math.random() * 50}px`],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #fff 2px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="container-custom relative z-10 py-12 md:py-20 lg:py-28">
        {/* Decorative Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm mb-4 md:mb-6">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-300" />
            <span className="text-xs md:text-sm font-medium text-purple-300 tracking-wider">
              LET'S CREATE MAGIC
            </span>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-300" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 px-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
              Transform
            </span>
            <br />
            <span className="text-white">Your Digital Presence</span>
          </h2>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Let's craft a digital strategy that not only looks stunning but
            <span className="text-purple-300 font-medium">
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
            <div className="relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl shadow-purple-900/20">
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Target className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
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
                      className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 border border-white/5 hover:border-purple-500/30"
                    >
                      <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all flex-shrink-0">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
                      </div>
                      <span className="text-sm md:text-base text-gray-200 group-hover:text-white transition-colors">
                        {benefit.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                    98%
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Client Satisfaction
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                    150+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Projects Delivered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                    24h
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Response Time
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm animate-float" />
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 backdrop-blur-sm rotate-12 animate-float delay-1000" />
          </motion.div>

          {/* Right Content - Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 md:mt-0"
          >
            {/* Form Container with Glow Effect */}
            <div className="relative bg-gradient-to-br from-gray-900/60 via-gray-900/80 to-gray-900/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl md:rounded-3xl blur-xl opacity-20 animate-pulse" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 md:p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Start Your Journey
                    </h3>
                    <p className="text-purple-300 text-xs md:text-sm">
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
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping opacity-20" />
                      <div className="absolute inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Success!
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base">
                      Our digital wizards will contact you within
                      <span className="text-purple-300 font-medium">
                        {" "}
                        24 hours
                      </span>
                    </p>
                    <div className="mt-4 md:mt-6 inline-flex items-center gap-2 text-xs md:text-sm text-gray-400">
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
                          <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
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
                            className={`w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border transition-all duration-300 text-sm md:text-base ${
                              hoveredField === field.name
                                ? "border-purple-500 shadow-lg shadow-purple-500/20"
                                : "border-gray-700 hover:border-purple-400"
                            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                            placeholder={field.placeholder}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-purple-400 transition-all duration-300 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="+8801722440899"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          Service Interested In *
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-purple-400 transition-all duration-300 text-sm md:text-base text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 pr-10"
                          >
                            <option value="" className="bg-gray-900">
                              Select a service
                            </option>
                            {services.map((service) => (
                              <option
                                key={service}
                                value={service}
                                className="bg-gray-900"
                              >
                                {service}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400 rotate-90" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                        Your Project Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-purple-400 transition-all duration-300 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                        placeholder="Tell us about your vision, goals, and challenges..."
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl font-bold text-base md:text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                      <span className="text-gray-400">
                        By submitting, you agree to our{" "}
                      </span>
                      <a
                        href="#"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Privacy Policy
                      </a>
                      <span className="text-gray-400">
                        . Your data is encrypted and secure.
                      </span>
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 rounded-full border border-purple-500/30"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity },
              }}
              className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 rounded-full border border-pink-500/30"
            />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/10 px-4"
        >
          <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">
            Not ready for a full consultation? Start with a quick chat
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 text-gray-300 hover:text-white hover:border-purple-500 transition-all duration-300 text-sm md:text-base whitespace-nowrap"
            >
              Schedule 15-min Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 text-gray-300 hover:text-white hover:border-pink-500 transition-all duration-300 text-sm md:text-base whitespace-nowrap"
            >
              View Case Studies
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 transition-all duration-300 text-sm md:text-base whitespace-nowrap"
            >
              Download Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .container-custom {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          section {
            min-height: auto;
          }
        }

        @media (max-width: 640px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }

          .text-3xl {
            font-size: 2rem;
          }

          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
