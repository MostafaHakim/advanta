"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Filter } from "lucide-react";
import Link from "next/link";

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "Full-featured e-commerce platform with advanced analytics",
    image: "/api/placeholder/600/400",
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
    image: "/api/placeholder/600/400",
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
    image: "/api/placeholder/600/400",
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
    image: "/api/placeholder/600/400",
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
    image: "/api/placeholder/600/400",
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
    image: "/api/placeholder/600/400",
    tags: ["UI/UX", "Branding", "Web Design"],
    results: [
      { label: "User Engagement", value: "+200%" },
      { label: "Bounce Rate", value: "-40%" },
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
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
            <span className="text-sm font-medium">Our Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses achieve remarkable results
            through innovative digital solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-purple-600/80 z-20 flex items-center justify-center transition-opacity duration-300"
                  >
                    <div className="flex gap-4">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  {item.results && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        {item.results.map((result, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 group"
          >
            View All Projects
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

export default PortfolioSection;
