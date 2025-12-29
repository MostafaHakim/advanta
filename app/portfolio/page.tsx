"use client";

import { useState } from "react";
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

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    category: "web-development",
    client: "FashionHub",
    description:
      "Complete redesign and optimization of fashion e-commerce platform resulting in 35% increase in conversions.",
    image: "/api/placeholder/600/400",
    tags: ["React", "Next.js", "E-commerce", "UI/UX"],
    results: [
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Conversion Rate",
        value: "+35%",
      },
      {
        icon: <DollarSign className="w-4 h-4" />,
        label: "Revenue Growth",
        value: "+200%",
      },
      {
        icon: <Users className="w-4 h-4" />,
        label: "User Engagement",
        value: "+150%",
      },
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Global SEO Campaign",
    category: "seo",
    client: "TechCorp International",
    description:
      "International SEO strategy targeting 50+ countries with 300% organic traffic growth.",
    image: "/api/placeholder/600/400",
    tags: ["SEO", "International", "Content Strategy"],
    results: [
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Organic Traffic",
        value: "+300%",
      },
      {
        icon: <Target className="w-4 h-4" />,
        label: "Keyword Rankings",
        value: "+250",
      },
      { icon: <DollarSign className="w-4 h-4" />, label: "ROI", value: "5x" },
    ],
    featured: true,
  },
  {
    id: 3,
    title: "Social Media Transformation",
    category: "social-media",
    client: "Wellness Brand",
    description:
      "Complete social media overhaul resulting in 50K+ engaged followers.",
    image: "/api/placeholder/600/400",
    tags: ["Instagram", "Facebook", "Content Creation"],
    results: [
      {
        icon: <Users className="w-4 h-4" />,
        label: "Followers Growth",
        value: "+50K",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Engagement Rate",
        value: "8.5%",
      },
      {
        icon: <DollarSign className="w-4 h-4" />,
        label: "Sales from Social",
        value: "+300%",
      },
    ],
  },
  {
    id: 4,
    title: "PPC Optimization",
    category: "ppc",
    client: "SaaS Company",
    description:
      "Google Ads campaign optimization reducing CPA by 40% while increasing conversions.",
    image: "/api/placeholder/600/400",
    tags: ["Google Ads", "Conversion Tracking", "A/B Testing"],
    results: [
      {
        icon: <DollarSign className="w-4 h-4" />,
        label: "Cost Reduction",
        value: "-40%",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Conversions",
        value: "+200%",
      },
      { icon: <Target className="w-4 h-4" />, label: "ROAS", value: "8x" },
    ],
  },
  {
    id: 5,
    title: "Content Marketing Strategy",
    category: "content-marketing",
    client: "B2B Software",
    description:
      "Comprehensive content strategy generating 10K monthly qualified leads.",
    image: "/api/placeholder/600/400",
    tags: ["Blogging", "Whitepapers", "Case Studies"],
    results: [
      {
        icon: <Users className="w-4 h-4" />,
        label: "Monthly Leads",
        value: "10K",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Website Traffic",
        value: "+400%",
      },
      {
        icon: <Target className="w-4 h-4" />,
        label: "Conversion Rate",
        value: "15%",
      },
    ],
  },
  {
    id: 6,
    title: "Mobile App Development",
    category: "web-development",
    client: "Fitness Startup",
    description:
      "Native mobile app with advanced features and seamless user experience.",
    image: "/api/placeholder/600/400",
    tags: ["React Native", "Mobile", "UI/UX"],
    results: [
      {
        icon: <Users className="w-4 h-4" />,
        label: "App Downloads",
        value: "100K+",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "User Retention",
        value: "85%",
      },
      {
        icon: <Target className="w-4 h-4" />,
        label: "App Store Rating",
        value: "4.8/5",
      },
    ],
  },
  {
    id: 7,
    title: "Brand Identity Redesign",
    category: "design",
    client: "Healthcare Provider",
    description:
      "Complete brand overhaul with new visual identity and messaging.",
    image: "/api/placeholder/600/400",
    tags: ["Branding", "Logo Design", "Visual Identity"],
    results: [
      {
        icon: <Users className="w-4 h-4" />,
        label: "Brand Recognition",
        value: "+150%",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Customer Trust",
        value: "+200%",
      },
      {
        icon: <DollarSign className="w-4 h-4" />,
        label: "Market Share",
        value: "+25%",
      },
    ],
  },
  {
    id: 8,
    title: "Email Marketing Automation",
    category: "content-marketing",
    client: "E-commerce Store",
    description:
      "Automated email marketing funnel with personalized customer journeys.",
    image: "/api/placeholder/600/400",
    tags: ["Email Marketing", "Automation", "Personalization"],
    results: [
      {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Open Rate",
        value: "45%",
      },
      {
        icon: <Target className="w-4 h-4" />,
        label: "Click-Through Rate",
        value: "18%",
      },
      {
        icon: <DollarSign className="w-4 h-4" />,
        label: "Revenue Generated",
        value: "$500K+",
      },
    ],
  },
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web-development", name: "Web Development" },
  { id: "seo", name: "SEO" },
  { id: "social-media", name: "Social Media" },
  { id: "ppc", name: "PPC" },
  { id: "content-marketing", name: "Content Marketing" },
  { id: "design", name: "Design" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const displayItems = showAll ? filteredItems : filteredItems.slice(0, 6);

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
