"use client";

import { motion } from "framer-motion";
import { Filter } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface PortfolioFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const PortfolioFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: PortfolioFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      <Filter className="w-5 h-5 text-gray-500 mr-2 mt-2" />
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            activeCategory === category.id
              ? "bg-blue-600 text-white shadow-lg transform scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow"
          }`}
        >
          {category.name}
        </button>
      ))}
    </motion.div>
  );
};

export default PortfolioFilter;
