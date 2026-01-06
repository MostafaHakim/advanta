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
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    content:
      "NextMarketing transformed our online presence completely. Our organic traffic increased by 300% within 6 months. Their team is professional, responsive, and truly understands digital marketing.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    results: [
      { metric: "Traffic Growth", value: "300%" },
      { metric: "Lead Generation", value: "+150%" },
      { metric: "ROI", value: "5x" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Marketing Director, GlobalRetail",
    company: "GlobalRetail",
    content:
      "The PPC campaigns managed by NextMarketing have been exceptional. They reduced our cost per acquisition by 40% while increasing conversions. Highly recommended!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    results: [
      { metric: "Cost Reduction", value: "-40%" },
      { metric: "Conversions", value: "+200%" },
      { metric: "ROAS", value: "8x" },
    ],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Founder, GreenLife Organics",
    company: "GreenLife Organics",
    content:
      "Their social media strategy helped us build an engaged community of 50K+ followers. The content quality and engagement rates are outstanding.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    results: [
      { metric: "Followers Growth", value: "+50K" },
      { metric: "Engagement Rate", value: "8.5%" },
      { metric: "Website Clicks", value: "+300%" },
    ],
  },
  {
    id: 4,
    name: "David Wilson",
    position: "E-commerce Manager, FashionHub",
    company: "FashionHub",
    content:
      "The web development team built us a stunning e-commerce platform that loads in under 2 seconds. Our conversion rate improved by 35% immediately after launch.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    results: [
      { metric: "Conversion Rate", value: "+35%" },
      { metric: "Page Speed", value: "1.8s" },
      { metric: "Mobile Traffic", value: "+60%" },
    ],
  },
  {
    id: 5,
    name: "Lisa Anderson",
    position: "CMO, HealthPlus",
    company: "HealthPlus",
    content:
      "Content marketing strategy by NextMarketing has positioned us as industry thought leaders. We now generate 500+ qualified leads monthly through content alone.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    results: [
      { metric: "Monthly Leads", value: "500+" },
      { metric: "Domain Authority", value: "65" },
      { metric: "Backlinks", value: "+2000" },
    ],
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll function
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

  // Auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay && !isHovering) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, isHovering, nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Deep Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]" />

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-32 left-24 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-32 right-24 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"
      />

      {/* Particle Background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 mb-4"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-2 h-2 bg-blue-500 rounded-full mr-2"
            />
            <span className="text-sm font-medium">Client Testimonials</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about working with us.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="max-w-6xl mx-auto mb-16">
          <div
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Quote className="w-12 h-12 text-blue-500/20 absolute top-8 left-8" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 120 : -120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5,
                }}
                className="grid lg:grid-cols-2 gap-10"
              >
                {/* Content */}
                <div>
                  <div className="flex items-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 mr-4 ring-2 ring-blue-500/30"
                    >
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-400">
                        {currentTestimonial.position}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-base md:text-lg text-gray-300 italic mb-8 leading-relaxed">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Results */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {currentTestimonial.results.map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        }}
                        className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                      >
                        <div className="text-xl md:text-2xl font-bold text-blue-400">
                          {result.value}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {result.metric}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Company Card */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full h-64 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 bg-[length:200%_200%]"
                    />

                    <div className="relative z-10 text-center">
                      <div className="text-5xl md:text-6xl font-extrabold text-white/20 mb-4">
                        {currentTestimonial.company.charAt(0)}
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-white">
                        {currentTestimonial.company}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
              {/* Play/Pause and Dots */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  {autoPlay ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-blue-500 w-8"
                          : "bg-white/30 w-2 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Arrow Navigation */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Auto-play indicator */}
            <motion.div
              animate={{
                width: autoPlay && !isHovering ? "100%" : "0%",
              }}
              transition={{ duration: 1 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"
            />
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -5,
                backgroundColor: "rgba(255, 255, 255, 0.07)",
              }}
              className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 mr-3 ring-2 ring-blue-500/30">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                "{testimonial.content}"
              </p>

              <div className="text-xs text-blue-400 font-medium">
                View full testimonial →
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex flex-col items-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="inline-block "
          >
            <p className="text-gray-400 mb-4 text-lg">
              Ready to join our satisfied clients?
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25"
          >
            Start Your Success Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
