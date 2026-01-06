"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <section className="section-padding bg-gradient-to-b from-[#0F0F0F] to-[#3D6D17] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      <div className="container-custom">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-purple-300">
              Our Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing our success stories and innovative solutions that drove
            measurable results for clients across various industries.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <div className="flex items-center gap-2 text-gray-400 mb-4 w-full justify-center">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">Filter by category</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5"
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent z-20 flex items-center justify-center transition-opacity duration-300"
                  >
                    <div className="flex gap-4">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-white rounded-full hover:bg-purple-50 transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                          <ExternalLink className="w-5 h-5 text-purple-600" />
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-white rounded-full hover:bg-purple-50 transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                          <Github className="w-5 h-5 text-purple-600" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                      {item.title}
                    </h3>
                    {item.featured && (
                      <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-blue-500 rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 text-purple-300 rounded-lg text-sm font-medium border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results Section */}
                  {item.results && (
                    <div className="pt-6 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        {item.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="text-center p-3 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5"
                          >
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col items-center gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">
                Ready to start your project?
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Let's create something amazing together. Browse our complete
                portfolio to see more of our work and results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
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
