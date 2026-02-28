"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  Edit,
  Eye,
  Calendar,
  User,
  Clock,
  TrendingUp,
  Star,
  Search,
  Filter,
  Plus,
  BarChart,
  Tag,
  Sparkles,
  X,
  ChevronDown,
  AlertCircle,
  Menu,
  Grid,
  List,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Copy,
  LinkIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Types
interface Blog {
  _id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  featured: boolean;
  views: number;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onTogglePublish: (id: string, published: boolean) => void;
  index: number;
  viewMode: "grid" | "list";
}

// Category Colors
const categoryColors: Record<
  string,
  { bg: string; text: string; gradient: string }
> = {
  "SEO & Marketing": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    gradient: "from-blue-500 to-cyan-500",
  },
  "Web Development": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    gradient: "from-purple-500 to-pink-500",
  },
  "AI & Machine Learning": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    gradient: "from-emerald-500 to-teal-500",
  },
  "Design & UX": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    gradient: "from-orange-500 to-amber-500",
  },
  "Mobile Development": {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    gradient: "from-indigo-500 to-blue-500",
  },
  "E-commerce": {
    bg: "bg-rose-50",
    text: "text-rose-700",
    gradient: "from-rose-500 to-pink-500",
  },
  "Digital Strategy": {
    bg: "bg-green-50",
    text: "text-green-700",
    gradient: "from-green-500 to-emerald-500",
  },
  "Content Writing": {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    gradient: "from-yellow-500 to-orange-500",
  },
  "Social Media": {
    bg: "bg-sky-50",
    text: "text-sky-700",
    gradient: "from-sky-500 to-blue-500",
  },
  Analytics: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    gradient: "from-violet-500 to-purple-500",
  },
};

const defaultCategory = {
  bg: "bg-gray-50",
  text: "text-gray-700",
  gradient: "from-gray-500 to-gray-600",
};

// Blog Card Component
const BlogCard = ({
  blog,
  onDelete,
  onToggleFeatured,
  onTogglePublish,
  index,
  viewMode,
}: BlogCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const categoryStyle = categoryColors[blog.category] || defaultCategory;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  // Grid View
  if (viewMode === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative"
      >
        {/* Featured Glow Effect */}
        {blog.featured && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-2xl" />
        )}

        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            {/* Featured Badge */}
            {blog.featured && (
              <div className="absolute top-3 left-3 z-20">
                <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Featured</span>
                </div>
              </div>
            )}

            {/* Publish Status Badge */}
            <div className="absolute top-3 right-3 z-20">
              {blog.published ? (
                <div className="flex items-center gap-1 px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                  <CheckCircle className="w-3 h-3" />
                  <span>Published</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2.5 py-1 bg-gray-500 text-white text-xs font-bold rounded-full shadow-lg">
                  <XCircle className="w-3 h-3" />
                  <span>Draft</span>
                </div>
              )}
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3 z-20">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}
              >
                {blog.category}
              </span>
            </div>

            {/* Image */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300">
              {blog.image && !imageError ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => setImageError(true)}
                  priority={index < 4}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">
                    {blog.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Overlay with Actions */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center gap-2"
                >
                  {/* Action Buttons */}
                  <button
                    onClick={() => onToggleFeatured(blog._id, !blog.featured)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                      blog.featured
                        ? "bg-amber-500 text-white"
                        : "bg-white text-gray-700 hover:bg-amber-500 hover:text-white"
                    }`}
                    title={
                      blog.featured ? "Remove featured" : "Mark as featured"
                    }
                  >
                    <Star className="w-5 h-5" />
                  </button>

                  <Link
                    href={`/admin/dashboard/blogs/edit/${blog._id}`}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all hover:scale-110"
                    title="Edit blog"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-green-500 hover:text-white transition-all hover:scale-110"
                    title="View live"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={() => onDelete(blog._id)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-110"
                    title="Delete blog"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              <Link href={`/admin/dashboard/blogs/edit/${blog._id}`}>
                {blog.title}
              </Link>
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {blog.excerpt}
            </p>

            {/* Meta Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <User className="w-3.5 h-3.5" />
                <span className="truncate">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-sm">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="font-semibold text-gray-900">
                  {formatViews(blog.views)}
                </span>
                <span className="text-xs text-gray-500">views</span>
              </div>

              {/* Quick Actions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                <AnimatePresence>
                  {showActions && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-40"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onTogglePublish(blog._id, !blog.published);
                              setShowActions(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            {blog.published ? (
                              <>
                                <XCircle className="w-4 h-4 text-gray-500" />
                                <span>Unpublish</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Publish</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              router.push(
                                `/admin/dashboard/blogs/duplicate/${blog._id}`,
                              );
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                            <span>Duplicate</span>
                          </button>
                          <hr className="my-1 border-gray-200" />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${window.location.origin}/blog/${blog.slug}`,
                              );
                              setShowActions(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            <LinkIcon className="w-4 h-4 text-gray-500" />
                            <span>Copy Link</span>
                          </button>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowActions(false)}
                        className="fixed inset-0 z-30"
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image - List View */}
        <div className="sm:w-48 h-32 sm:h-auto relative bg-gradient-to-br from-gray-200 to-gray-300">
          {blog.image && !imageError ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-400">
                {blog.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Status Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {blog.featured && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            {!blog.published && (
              <span className="px-2 py-0.5 bg-gray-500 text-white text-xs font-bold rounded-full">
                Draft
              </span>
            )}
          </div>
        </div>

        {/* Content - List View */}
        <div className="flex-1 p-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}
                >
                  {blog.category}
                </span>
                <span className="text-xs text-gray-500">{blog.readTime}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                <Link href={`/admin/dashboard/blogs/edit/${blog._id}`}>
                  {blog.title}
                </Link>
              </h3>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{formatViews(blog.views)} views</span>
                </div>
              </div>
            </div>

            {/* Actions - List View */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFeatured(blog._id, !blog.featured)}
                className={`p-2 rounded-lg transition-colors ${
                  blog.featured
                    ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={blog.featured ? "Remove featured" : "Mark as featured"}
              >
                <Star className="w-4 h-4" />
              </button>

              <button
                onClick={() => onTogglePublish(blog._id, !blog.published)}
                className={`p-2 rounded-lg transition-colors ${
                  blog.published
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={blog.published ? "Unpublish" : "Publish"}
              >
                {blog.published ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
              </button>

              <Link
                href={`/admin/dashboard/blogs/edit/${blog._id}`}
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                title="Edit blog"
              >
                <Edit className="w-4 h-4" />
              </Link>

              <Link
                href={`/blog/${blog.slug}`}
                target="_blank"
                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                title="View live"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onDelete(blog._id)}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                title="Delete blog"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");
  const [publishFilter, setPublishFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch Blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // Delete Blog
  const deleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        setDeleteConfirm(null);
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (err) {
      setError("Failed to delete blog");
    }
  };

  // Toggle Featured Status
  const toggleFeaturedStatus = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured }),
      });

      if (res.ok) {
        setBlogs((prev) =>
          prev.map((blog) => (blog._id === id ? { ...blog, featured } : blog)),
        );
      }
    } catch (error) {
      console.error("Failed to update featured status:", error);
    }
  };

  // Toggle Publish Status
  const togglePublishStatus = async (id: string, published: boolean) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });

      if (res.ok) {
        setBlogs((prev) =>
          prev.map((blog) => (blog._id === id ? { ...blog, published } : blog)),
        );
      }
    } catch (error) {
      console.error("Failed to update publish status:", error);
    }
  };

  // Bulk Delete
  const bulkDelete = async () => {
    if (selectedBlogs.length === 0) return;

    if (window.confirm(`Delete ${selectedBlogs.length} selected blogs?`)) {
      try {
        await Promise.all(
          selectedBlogs.map((id) =>
            fetch(`/api/blogs/${id}`, { method: "DELETE" }),
          ),
        );
        setBlogs((prev) =>
          prev.filter((blog) => !selectedBlogs.includes(blog._id)),
        );
        setSelectedBlogs([]);
      } catch (error) {
        setError("Failed to delete selected blogs");
      }
    }
  };

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(blogs.map((b) => b.category))),
  ];

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;

    const matchesFeatured =
      featuredFilter === "all" ||
      (featuredFilter === "featured" && blog.featured) ||
      (featuredFilter === "regular" && !blog.featured);

    const matchesPublish =
      publishFilter === "all" ||
      (publishFilter === "published" && blog.published) ||
      (publishFilter === "draft" && !blog.published);

    return (
      matchesSearch && matchesCategory && matchesFeatured && matchesPublish
    );
  });

  // Calculate statistics
  const stats = {
    total: blogs.length,
    featured: blogs.filter((b) => b.featured).length,
    published: blogs.filter((b) => b.published).length,
    drafts: blogs.filter((b) => !b.published).length,
    totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0),
    popular: blogs.sort((a, b) => (b.views || 0) - (a.views || 0))[0],
  };

  // Loading State
  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200" />
            <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage and monitor all your published blog posts
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Bulk Actions */}
              {selectedBlogs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-gray-600">
                    {selectedBlogs.length} selected
                  </span>
                  <button
                    onClick={bulkDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedBlogs([])}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </motion.div>
              )}

              {/* Export Button */}
              <button
                onClick={() => {
                  const csv = filteredBlogs
                    .map(
                      (blog) =>
                        `${blog.title},${blog.category},${blog.author},${blog.views}`,
                    )
                    .join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "blogs.csv";
                  a.click();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export to CSV"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>

              {/* Refresh Button */}
              <button
                onClick={fetchBlogs}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>

              {/* Create Button */}
              <Link
                href="/admin/dashboard/blog/create"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Create New Blog</span>
                <span className="sm:hidden">Create</span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Total</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Published</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    {stats.published}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Drafts</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-600">
                    {stats.drafts}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Featured</p>
                  <p className="text-xl sm:text-2xl font-bold text-amber-600">
                    {stats.featured}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-lg col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Total Views
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg mb-6">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden p-4 border-b border-gray-200">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full text-gray-700"
            >
              <span className="font-medium">Search & Filters</span>
              {showFilters ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Filter Content */}
          <div
            className={`${showFilters || !isMobile ? "block" : "hidden"} p-4 sm:p-5`}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      isMobile
                        ? "Search..."
                        : "Search by title, excerpt, author..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Filter Options */}
              <div className="flex flex-wrap gap-3">
                {/* Category Filter */}
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-9 pr-8 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white min-w-[140px]"
                  >
                    <option value="all">All Categories</option>
                    {categories
                      .filter((cat) => cat !== "all")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Featured Filter */}
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <select
                    value={featuredFilter}
                    onChange={(e) => setFeaturedFilter(e.target.value)}
                    className="pl-9 pr-8 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white min-w-[130px]"
                  >
                    <option value="all">All Posts</option>
                    <option value="featured">Featured</option>
                    <option value="regular">Regular</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Publish Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <select
                    value={publishFilter}
                    onChange={(e) => setPublishFilter(e.target.value)}
                    className="pl-9 pr-8 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white min-w-[130px]"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Drafts</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 sm:p-3 ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    } transition-colors`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 sm:p-3 ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    } transition-colors`}
                    title="List View"
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium text-sm sm:text-base">
                Error loading blogs
              </p>
              <p className="text-red-600 text-xs sm:text-sm mt-1">{error}</p>
              <button
                onClick={fetchBlogs}
                className="mt-2 text-xs sm:text-sm text-red-700 hover:text-red-900 font-medium"
              >
                Try again
              </button>
            </div>
          </motion.div>
        )}

        {/* Blogs Display */}
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 bg-white rounded-xl border border-gray-200 shadow-lg px-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <BarChart className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
              {searchTerm ||
              selectedCategory !== "all" ||
              featuredFilter !== "all" ||
              publishFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first blog post"}
            </p>
            <Link
              href="/admin/dashboard/blog/create"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Create Your First Blog
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">{filteredBlogs.length}</span> of{" "}
                <span className="font-semibold">{blogs.length}</span> blogs
              </p>

              {/* Select All Checkbox */}
              {viewMode === "list" && (
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.length === filteredBlogs.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBlogs(filteredBlogs.map((b) => b._id));
                      } else {
                        setSelectedBlogs([]);
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Select All
                </label>
              )}
            </div>

            {/* Blog Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
                  : "space-y-4"
              }
            >
              <AnimatePresence>
                {filteredBlogs.map((blog, index) => (
                  <div key={blog._id} className="relative">
                    {/* Selection Checkbox for List View */}
                    {viewMode === "list" && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 z-10">
                        <input
                          type="checkbox"
                          checked={selectedBlogs.includes(blog._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBlogs([...selectedBlogs, blog._id]);
                            } else {
                              setSelectedBlogs(
                                selectedBlogs.filter((id) => id !== blog._id),
                              );
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    <BlogCard
                      blog={blog}
                      onDelete={(id) => setDeleteConfirm(id)}
                      onToggleFeatured={toggleFeaturedStatus}
                      onTogglePublish={togglePublishStatus}
                      index={index}
                      viewMode={viewMode}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Summary Footer */}
        {filteredBlogs.length > 0 && (
          <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-gray-600">
                <span className="font-semibold">{filteredBlogs.length}</span>{" "}
                blogs displayed
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <BarChart className="w-4 h-4 text-blue-600" />
                  {stats.total} Total
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {stats.published} Published
                </span>
                <span className="inline-flex items-center gap-1">
                  <XCircle className="w-4 h-4 text-gray-600" />
                  {stats.drafts} Drafts
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-600" />
                  {stats.featured} Featured
                </span>
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  {stats.totalViews.toLocaleString()} Views
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  Delete Blog Post
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Are you sure you want to delete this blog post? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (deleteConfirm) {
                        deleteBlog(deleteConfirm);
                      }
                    }}
                    className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
