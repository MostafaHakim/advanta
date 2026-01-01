"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PortfolioFilter, PortfolioCard } from "./index"; // Assuming index exports both

interface PortfolioItem {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string;
  featured: boolean;
  results: {
    value: string;
    label: string;
  }[];
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface Category {
  id: string;
  name: string;
}

interface PortfolioClientWrapperProps {
  initialPortfolioItems: PortfolioItem[];
  categories: Category[];
}

const PortfolioClientWrapper = ({
  initialPortfolioItems,
  categories,
}: PortfolioClientWrapperProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false); // Retain existing state if used for "Load More"

  const filteredItems =
    activeCategory === "all"
      ? initialPortfolioItems
      : initialPortfolioItems.filter((item) => item.category === activeCategory);

  const displayItems = showAll ? filteredItems : filteredItems.slice(0, 6); // Retain existing logic

  return (
    <>
      <PortfolioFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {displayItems.map((item, index) => (
            <PortfolioCard key={item._id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button - retain if needed */}
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
    </>
  );
};

export default PortfolioClientWrapper;
