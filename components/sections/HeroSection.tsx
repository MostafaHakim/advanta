"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mt-20 md:-mt-10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float delay-1000" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
              <span className="text-sm font-medium">
                #1 Digital Marketing Agency
              </span>
            </div> */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Transform Your</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              We help businesses grow online with cutting-edge digital marketing
              strategies, SEO optimization, and result-driven campaigns that
              deliver measurable ROI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">Client Retention</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { color: "bg-blue-500", title: "SEO" },
                    { color: "bg-purple-500", title: "Social Media" },
                    { color: "bg-emerald-500", title: "PPC" },
                    { color: "bg-orange-500", title: "Content" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`${item.color} rounded-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300`}
                    >
                      <div className="text-2xl font-bold mb-2">
                        {item.title}
                      </div>
                      <div className="text-sm opacity-90">Strategy</div>
                    </div>
                  ))}
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-2xl font-bold text-blue-600">↑ 250%</div>
                  <div className="text-sm text-gray-600">Traffic Growth</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-2xl font-bold text-emerald-600">
                    ↓ 40%
                  </div>
                  <div className="text-sm text-gray-600">Cost Reduction</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
