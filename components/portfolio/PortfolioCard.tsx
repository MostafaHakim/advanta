"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  TrendingUp,
  Users,
  Target,
  DollarSign,
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
  results: Array<{
    label: string;
    value: string;
  }>;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const iconMap: { [key: string]: ReactNode } = {
      TrendingUp: <TrendingUp className="w-4 h-4" />,
      Users: <Users className="w-4 h-4" />,
      Target: <Target className="w-4 h-4" />,
      DollarSign: <DollarSign className="w-4 h-4" />,
    };
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
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
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-purple-600/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-4">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full hover:bg-blue-50 transition-colors transform hover:scale-110"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full hover:bg-blue-50 transition-colors transform hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
  
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            {item.featured && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                Featured
              </span>
            )}
          </div>
  
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>
  
          {/* Client Info */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="font-medium">Client:</span>
            <span className="ml-2">{item.client}</span>
          </div>
  
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
  
          {/* Results */}
          {item.results && (
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2">
                {item.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="text-center p-2 bg-blue-50 rounded-lg"
                  >
                    <div className="flex items-center justify-center mb-1 text-blue-600">
                      {iconMap[result.label]}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {result.value}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
  
          {/* View Details */}
          <button className="w-full mt-6 py-2 text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
            View Case Study
          </button>
        </div>
      </motion.div>
    );
  };

export default PortfolioCard;
