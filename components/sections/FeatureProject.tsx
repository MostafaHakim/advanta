"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  client: string;
  featured: boolean;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  results: Result[];
  createdAt: string;
}

// const portfolioItems = [
//   {
//     id: 4,
//     title: "PPC Advertising",
//     category: "PPC",
//     description: "Google Ads campaign with 5x ROI",
//     image: `https://picsum.photos/id/4/600/400`,
//     tags: ["Google Ads", "Conversion Tracking", "A/B Testing"],
//     results: [
//       { label: "ROI", value: "5x" },
//       { label: "Cost per Lead", value: "-60%" },
//     ],
//     liveUrl: "#",
//     githubUrl: "#",
//     featured: true,
//   },
//   {
//     id: 5,
//     title: "Content Marketing",
//     category: "Content",
//     description: "Blog content strategy generating 10K monthly visitors",
//     image: "https://picsum.photos/id/5/600/400",
//     tags: ["Blog Writing", "SEO", "Content Strategy"],
//     results: [
//       { label: "Monthly Visitors", value: "10K" },
//       { label: "Conversion Rate", value: "8%" },
//     ],
//     liveUrl: "#",
//     githubUrl: "#",
//     featured: false,
//   },
//   {
//     id: 6,
//     title: "Brand Redesign",
//     category: "Design",
//     description: "Complete brand identity and website redesign",
//     image: "https://picsum.photos/id/6/600/400",
//     tags: ["UI/UX", "Branding", "Web Design"],
//     results: [
//       { label: "User Engagement", value: "+200%" },
//       { label: "Bounce Rate", value: "-40%" },
//     ],
//     liveUrl: "#",
//     githubUrl: "#",
//     featured: true,
//   },
// ];

const FeatureProject = () => {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  // Fetch projects
  const fetchProjects = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && data.data) {
        setProjects(data.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? projects
      : projects.filter((item) => item.category === activeCategory);

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
          className="text-center mb-4 lg:mb-10"
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
                key={item._id}
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
                onMouseEnter={() => setHoveredItem(item._id)}
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
          className="text-center mt-6 lg:mt-10"
        >
          <div className="inline-flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ borderRadius: "8px" }}
              >
                View All Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureProject;
