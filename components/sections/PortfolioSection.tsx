"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "Full-featured e-commerce platform with advanced analytics",
    image: "https://picsum.photos/id/1/600/400",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: 2,
    title: "SEO Campaign - Tech Startup",
    category: "SEO",
    description: "Increased organic traffic by 300% in 6 months",
    image: "https://picsum.photos/id/2/600/400",
    tags: ["SEO", "Content Strategy", "Link Building"],
    results: [
      { label: "Traffic Growth", value: "300%" },
      { label: "Keyword Rankings", value: "+150" },
    ],
  },
  {
    id: 3,
    title: "Social Media Strategy",
    category: "Social Media",
    description: "Comprehensive social media campaign for lifestyle brand",
    image: "https://picsum.photos/id/3/600/400",
    tags: ["Instagram", "Facebook", "Influencer Marketing"],
    results: [
      { label: "Engagement", value: "150%" },
      { label: "Followers", value: "+50K" },
    ],
  },
  {
    id: 4,
    title: "PPC Advertising",
    category: "PPC",
    description: "Google Ads campaign with 5x ROI",
    image: `https://picsum.photos/id/4/600/400`,
    tags: ["Google Ads", "Conversion Tracking", "A/B Testing"],
    results: [
      { label: "ROI", value: "5x" },
      { label: "Cost per Lead", value: "-60%" },
    ],
  },
  {
    id: 5,
    title: "Content Marketing",
    category: "Content",
    description: "Blog content strategy generating 10K monthly visitors",
    image: "https://picsum.photos/id/5/600/400",
    tags: ["Blog Writing", "SEO", "Content Strategy"],
    results: [
      { label: "Monthly Visitors", value: "10K" },
      { label: "Conversion Rate", value: "8%" },
    ],
  },
  {
    id: 6,
    title: "Brand Redesign",
    category: "Design",
    description: "Complete brand identity and website redesign",
    image: "https://picsum.photos/id/6/600/400",
    tags: ["UI/UX", "Branding", "Web Design"],
    results: [
      { label: "User Engagement", value: "+200%" },
      { label: "Bounce Rate", value: "-40%" },
    ],
  },
  {
    id: 7,
    title: "Mobile App Development",
    category: "Web Development",
    description: "Cross-platform mobile app for fitness tracking",
    image: "https://picsum.photos/id/7/600/400",
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 8,
    title: "Local SEO Optimization",
    category: "SEO",
    description: "Local SEO strategy for restaurant chain",
    image: "https://picsum.photos/id/8/600/400",
    tags: ["Local SEO", "Google My Business", "Reviews"],
    results: [
      { label: "Local Rankings", value: "+85%" },
      { label: "Phone Calls", value: "+200%" },
    ],
  },
  {
    id: 9,
    title: "Video Marketing Campaign",
    category: "Content",
    description: "YouTube video series for tech product launch",
    image: "https://picsum.photos/id/9/600/400",
    tags: ["Video Production", "YouTube SEO", "Social Media"],
    results: [
      { label: "Video Views", value: "2M+" },
      { label: "Conversion Rate", value: "12%" },
    ],
  },
];

const categories = [
  "All",
  "Web Development",
  "SEO",
  "Social Media",
  "PPC",
  "Content",
  "Design",
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section className="section-padding bg-white text-gray-900 relative overflow-hidden">
      {/* Light Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 mb-2 lg:mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm font-medium text-blue-700">
              Our Portfolio
            </span>
          </div>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-2 lg:mb-6 tracking-tight text-gray-900">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-md md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Showcasing our success stories and innovative solutions that drove
            measurable results for clients across various industries.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-6 lg:mb-16"
        >
          <div className="flex items-center gap-2 text-gray-600 mb-4 w-full justify-center">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">Filter by category</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                }`}
                style={{ borderRadius: "8px" }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.05,
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-lg shadow-sm"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 border border-gray-200">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/30 to-transparent z-20 flex items-center justify-center transition-opacity duration-300"
                  >
                    <div className="flex gap-4">
                      {item.liveUrl && (
                        <motion.a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 bg-white rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-md"
                          style={{ borderRadius: "8px" }}
                        >
                          <ExternalLink className="w-5 h-5 text-blue-600" />
                        </motion.a>
                      )}
                      {item.githubUrl && (
                        <motion.a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 bg-white rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-md"
                          style={{ borderRadius: "8px" }}
                        >
                          <FaGithub className="w-5 h-5 text-blue-600" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    {item.featured && (
                      <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results Section */}
                  {item.results && (
                    <div className="lg:pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {item.results.map((result, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
                          >
                            <div className="text-xl md:text-2xl font-bold text-blue-600">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {result.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <div className="mt-6">
                    <button className="w-full  py-3 bg-blue-50 text-blue-600 rounded-lg font-medium border border-blue-200 hover:border-blue-300 hover:bg-blue-100 transition-all duration-300">
                      View Case Study
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center py-4 lg:py-20"
          >
            <div className="text-gray-600 text-lg mb-4">
              No projects found in this category
            </div>
            <motion.button
              onClick={() => setActiveCategory("All")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
              style={{ borderRadius: "8px" }}
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-6 lg:mt-20"
        >
          <div className="inline-flex flex-col items-center gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Ready to start your project?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Let's create something amazing together. Browse our complete
                portfolio to see more of our work and results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ borderRadius: "8px" }}
              >
                View All Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                style={{ borderRadius: "8px" }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
