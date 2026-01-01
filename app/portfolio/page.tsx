"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Filter,
  TrendingUp,
  Users,
  Target,
  DollarSign,
} from "lucide-react";
import { PortfolioFilter, PortfolioCard } from "@/components/portfolio";

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setPortfolioItems(data.data);
      }
    };
    fetchProjects();
  }, []);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const displayItems = showAll ? filteredItems : filteredItems.slice(0, 6);
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web-development", name: "Web Development" },
    { id: "seo", name: "SEO" },
    { id: "social-media", name: "Social Media" },
    { id: "ppc", name: "PPC" },
    { id: "content-marketing", name: "Content Marketing" },
    { id: "design", name: "Design" },
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-blue-600">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our portfolio of successful digital marketing campaigns
              and web development projects that have transformed businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-y">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "150M+", label: "Revenue Generated" },
              { value: "50+", label: "Industries Served" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {/* Filter */}
          <PortfolioFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {displayItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          {filteredItems.length > 6 && !showAll && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Load More Projects
              </button>
            </div>
          )}

          {/* Featured Projects */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Case Studies
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {portfolioItems
                .filter((item) => item.featured)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden"
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.client}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
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

                      <button className="w-full btn-primary">
                        View Case Study
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Let's discuss how we can help you achieve similar results for your
            business
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Start Your Project
          </button>
        </div>
      </section>
    </>
  );
}
