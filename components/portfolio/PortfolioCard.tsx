"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  TrendingUp,
  Users,
  Target,
  DollarSign,
} from "lucide-react";

interface PortfolioItem {
  _id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
  results: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const iconMap: Record<string, ReactNode> = {
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
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Card Link */}
      <Link href={`/portfolio/${item.slug}`} className="block h-full">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold uppercase">
              {item.category}
            </span>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-gradient-to-br from-blue-600/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white rounded-full hover:scale-110 transition"
              >
                <ExternalLink className="w-5 h-5 text-blue-600" />
              </a>
            )}
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white rounded-full hover:scale-110 transition"
              >
                <Github className="w-5 h-5 text-gray-800" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title + Featured */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            {item.featured && (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                Featured
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {item.description}
          </p>

          {/* Client */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Client:</span> {item.client}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Results */}
          {item.results?.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3">
                {item.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="text-center p-2 bg-blue-50 rounded-lg"
                  >
                    <div className="flex justify-center mb-1 text-blue-600">
                      {iconMap[result.label]}
                    </div>
                    <div className="text-sm font-bold">{result.value}</div>
                    <div className="text-xs text-gray-600 truncate">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-6 text-center text-blue-600 font-medium hover:text-blue-700 transition">
            View Case Study →
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PortfolioCard;
