"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Play,
  Pause,
  Award,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    content:
      "Working with your team was transformative. Our organic traffic grew by 300% in just 6 months, and the ROI has been exceptional. The strategic approach and attention to detail set you apart.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    results: [
      { metric: "Organic Traffic", value: "300%", change: "increase" },
      { metric: "Lead Generation", value: "+150%", change: "increase" },
      { metric: "ROI", value: "5x", change: "positive" },
    ],
    duration: "6 Years",
    industry: "SEO",
  },
  // ... rest of testimonials (same as before)
];

const TestimonialsSectionPremium = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && !isHovering) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, isHovering, nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-8 lg:py-24 bg-linear-to-tr from-blue-200 via-white to-blue-200 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 bg-">
        <div className="absolute inset-0 bg-[radial-gradient(#0B1221_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header with Stats */}
        <div className="text-center mb-6 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 mb-6"
          >
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Client Success Stories
            </span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-2 lg:gap-8 mb-4 lg:mb-12">
            {[
              { value: "98%", label: "Client Retention Rate" },
              { value: "4.9/5", label: "Average Client Rating" },
              { value: "150+", label: "Successful Projects" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-2 lg:mb-6">
            <span className="text-gray-900">Trusted by</span>
            <br />
            <span className="text-blue-600">Industry Leaders</span>
          </h2>

          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses achieve remarkable growth and
            transform their digital presence.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="max-w-6xl mx-auto mb-6 lg:mb-20">
          <div
            className="relative bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Quote className="absolute top-8 left-8 w-6 lg:w-12 h-6 lg:h-12 text-blue-100" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="grid lg:grid-cols-2 gap-4 lg:gap-12"
              >
                {/* Client Info & Testimonial */}
                <div>
                  <div className="flex items-start gap-6 mb-4 lg:mb-8">
                    <div className="relative">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="absolute bottom-0 lg:-bottom-2 -right-2 w-6 h-6 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Quote className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-1">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-blue-600 text-sm lg:text-md font-semibold ">
                        {currentTestimonial.position}
                      </p>
                      <div className="flex items-center gap-1 lg:gap-2">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="lg:w-5 lg:h-5 w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                        <span className="text-gray-500 text-sm ml-2">
                          {currentTestimonial.rating}.0
                        </span>
                      </div>
                      <div className="flex items-center gap-4  text-sm text-gray-500">
                        <span className="flex items-center gap-1 text-sm ">
                          <span className="w-2 h-2 bg-blue-500 rounded-full "></span>
                          {currentTestimonial.industry}
                        </span>
                        <span className="flex items-center  gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full "></span>
                          {currentTestimonial.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <blockquote className="lg:text-xl text-gray-700 italic mb-4 lg:mb-10 leading-relaxed border-l-4 border-blue-500 pl-6">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Results */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentTestimonial.results.map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100"
                      >
                        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                          {result.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {result.metric}
                        </div>
                        <div
                          className={`text-xs font-medium mt-1 ${
                            result.change === "increase"
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          ▲{" "}
                          {result.change === "increase"
                            ? "Increase"
                            : "Improvement"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Company & Timeline */}
                <div className="space-y-4 lg:space-y-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 lg:p-8 border border-blue-200">
                    <div className="text-center mb-2 lg:mb-6">
                      <div className="text-3xl lg:text-5xl font-bold text-blue-600/20 mb-2 lg:mb-4 rounded-full bg-blue-300 w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center mx-auto text-white">
                        {currentTestimonial.company.charAt(0)}
                      </div>
                      <h4 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {currentTestimonial.company}
                      </h4>
                      <p className="text-gray-600 lg:mt-2">Success Story</p>
                    </div>

                    <div className="space-y-2 lg:space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Project Duration</span>
                        <span className="font-semibold text-gray-900">
                          {currentTestimonial.duration}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Industry</span>
                        <span className="font-semibold text-gray-900">
                          {currentTestimonial.industry}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Services Used</span>
                        <span className="font-semibold text-blue-600">
                          SEO + PPC + Content
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Visualization */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Project Timeline
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          month: "Month 1",
                          activity: "Strategy & Planning",
                          status: "completed",
                        },
                        {
                          month: "Month 2-3",
                          activity: "Implementation",
                          status: "completed",
                        },
                        {
                          month: "Month 4-6",
                          activity: "Optimization",
                          status: "completed",
                        },
                        {
                          month: "Ongoing",
                          activity: "Growth & Scaling",
                          status: "current",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              item.status === "completed"
                                ? "bg-green-500"
                                : item.status === "current"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {item.month}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.activity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200 gap-4">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {autoPlay ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span className="text-sm">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Play</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToTestimonial(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentIndex
                          ? "bg-blue-600 w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <motion.div
              animate={{ width: autoPlay && !isHovering ? "100%" : "0%" }}
              transition={{ duration: 5 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-4"
            />
          </div>
        </div>

        {/* Client Logos */}
        <div className="mb-6 lg:mb-20">
          <p className="text-center text-gray-600 mb-4 lg:mb-8">
            Trusted by industry leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-8">
            {[
              "TechStart",
              "GlobalRetail",
              "GreenLife",
              "FashionHub",
              "HealthPlus",
              "InnovateCo",
            ].map((logo, idx) => (
              <div
                key={idx}
                className="h-20 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 font-semibold hover:border-blue-300 hover:text-blue-600 transition-all shadow-xl"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block max-w-2xl">
            <h3 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to be our next success story?
            </h3>
            <p className="text-gray-600 mb-8">
              Join hundreds of satisfied clients who have transformed their
              business with our digital expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Start Free Consultation
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionPremium;
