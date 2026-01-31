"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  Plus,
  Edit,
  Eye,
  BarChart,
  TrendingUp,
  Users,
  Tag,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Service {
  _id: string;
  title: string;
  category: string;
  slug: string;
  icon?: string;
  color?: string;
  description: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCardProps {
  service: Service;
  onDelete: (id: string) => void;
  index: number;
}

const ServiceCard = ({ service, onDelete, index }: ServiceCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Digital Marketing": "from-blue-500 to-cyan-500",
      Tech: "from-purple-500 to-pink-500",
      Analytics: "from-emerald-500 to-teal-500",
      Design: "from-orange-500 to-amber-500",
      Development: "from-indigo-500 to-blue-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const getCategoryBgColor = (category: string) => {
    const colors: Record<string, string> = {
      "Digital Marketing": "bg-blue-50 text-blue-700",
      Tech: "bg-purple-50 text-purple-700",
      Analytics: "bg-emerald-50 text-emerald-700",
      Design: "bg-orange-50 text-orange-700",
      Development: "bg-indigo-50 text-indigo-700",
    };
    return colors[category] || "bg-gray-50 text-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Featured Badge */}
      {service.featured && (
        <div className="absolute -top-2 -right-2 z-20">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
            <StarIcon className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryColor(service.category)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-2xl`}
      />

      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Card Header */}
        <div
          className={`relative overflow-hidden bg-gradient-to-r ${getCategoryColor(service.category)} p-6`}
        >
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white -translate-y-12 translate-x-12" />
            <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white translate-y-8 -translate-x-8" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  {service.icon ? (
                    <span className="text-xl">{service.icon}</span>
                  ) : (
                    <BarChart className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryBgColor(service.category)}`}
                  >
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-10 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-30 overflow-hidden"
                    >
                      <div className="py-2">
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Live
                        </Link>
                        <Link
                          href={`/admin/dashboard/services/edit/${service._id}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Service
                        </Link>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            onDelete(service._id);
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
              {service.title}
            </h3>
            <p className="text-sm text-white/80 line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Metrics */}
          {service.metrics && service.metrics.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <h4 className="text-sm font-semibold text-gray-700">
                  Key Metrics
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {service.metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-lg font-bold text-gray-900">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(service.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Link
                href={`/admin/dashboard/services/edit/${service._id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Custom Star Icon
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  // Fetch services
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(services.map((s) => s.category))),
  ];

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Delete service
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setServices((prev) => prev.filter((s) => s._id !== id));
      setShowDeleteConfirm(null);
    } else {
      alert("Failed to delete service");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Services Management
              </h1>
              <p className="text-gray-600">
                Manage all your services in one place
              </p>
            </div>

            <Link
              href="/admin/dashboard/services/add"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add New Service
              <div className="absolute inset-0 rounded-xl border-2 border-blue-500/30 translate-x-1 translate-y-1 -z-10" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Services</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {services.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Featured</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {services.filter((s) => s.featured).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <StarIcon className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Categories</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {categories.length - 1}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-200 rounded-xl appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <BarChart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first service"}
            </p>
            <Link
              href="/admin/dashboard/services/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  Delete Service?
                </h3>
                <p className="text-gray-600 text-center mb-8">
                  Are you sure you want to delete this service? This action
                  cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      showDeleteConfirm && handleDelete(showDeleteConfirm)
                    }
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all"
                  >
                    Delete Service
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
