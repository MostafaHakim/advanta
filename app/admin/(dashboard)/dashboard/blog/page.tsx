// "use client";

// import { useEffect, useState } from "react";
// import {
//   Trash2,
//   Edit,
//   Eye,
//   MoreVertical,
//   Calendar,
//   User,
//   Clock,
//   TrendingUp,
//   Star,
//   EyeOff,
//   Search,
//   Filter,
//   Plus,
//   ChevronRight,
//   BarChart,
//   Tag,
//   X,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";

// interface Blog {
//   _id: string;
//   title: string;
//   slug: string;
//   image: string;
//   category: string;
//   excerpt: string;
//   author: string;
//   readTime: string;
//   featured: boolean;
//   views: number;
//   published: boolean;
//   publishedAt: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface BlogCardProps {
//   blog: Blog;
//   onDelete: (id: string) => void;
//   onToggleStatus: (id: string, published: boolean) => void;
//   index: number;
// }

// const BlogCard = ({ blog, onDelete, onToggleStatus, index }: BlogCardProps) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const getCategoryColor = (category: string) => {
//     const colors: Record<string, string> = {
//       "SEO & Marketing": "from-blue-500 to-cyan-500",
//       "Web Development": "from-purple-500 to-pink-500",
//       "AI & Machine Learning": "from-emerald-500 to-teal-500",
//       "Design & UX": "from-orange-500 to-amber-500",
//       "Mobile Development": "from-indigo-500 to-blue-500",
//       "E-commerce": "from-rose-500 to-pink-500",
//       "Digital Strategy": "from-green-500 to-emerald-500",
//       "Content Writing": "from-yellow-500 to-orange-500",
//       "Social Media": "from-blue-500 to-indigo-500",
//       Analytics: "from-purple-500 to-violet-500",
//     };
//     return colors[category] || "from-gray-500 to-gray-600";
//   };

//   const getCategoryBgColor = (category: string) => {
//     const colors: Record<string, string> = {
//       "SEO & Marketing": "bg-blue-50 text-blue-700",
//       "Web Development": "bg-purple-50 text-purple-700",
//       "AI & Machine Learning": "bg-emerald-50 text-emerald-700",
//       "Design & UX": "bg-orange-50 text-orange-700",
//       "Mobile Development": "bg-indigo-50 text-indigo-700",
//       "E-commerce": "bg-rose-50 text-rose-700",
//       "Digital Strategy": "bg-green-50 text-green-700",
//       "Content Writing": "bg-yellow-50 text-yellow-700",
//       "Social Media": "bg-blue-50 text-blue-700",
//       Analytics: "bg-purple-50 text-purple-700",
//     };
//     return colors[category] || "bg-gray-50 text-gray-700";
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: index * 0.05 }}
//         whileHover={{ y: -5 }}
//         className="group relative"
//       >
//         {/* Glow Effect for Featured */}
//         {blog.featured && (
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-2xl" />
//         )}

//         {/* Not Published Overlay */}
//         {!blog.published && (
//           <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10 backdrop-blur-[1px] rounded-2xl z-10" />
//         )}

//         <div
//           className={`relative bg-white rounded-2xl border ${!blog.published ? "border-gray-300" : "border-gray-100"} shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden`}
//         >
//           {/* Featured Badge */}
//           {blog.featured && (
//             <div className="absolute top-4 left-4 z-20">
//               <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
//                 <Star className="w-3 h-3" />
//                 Featured
//               </div>
//             </div>
//           )}

//           {/* Draft Badge */}
//           {!blog.published && (
//             <div className="absolute top-4 right-4 z-20">
//               <div className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full shadow-lg">
//                 <EyeOff className="w-3 h-3" />
//                 Draft
//               </div>
//             </div>
//           )}

//           {/* Card Content */}
//           <div className="flex flex-col md:flex-row">
//             {/* Image Section */}
//             <div className="md:w-1/3 relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-transparent z-10" />
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-48 md:h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 z-20">
//                 <span
//                   className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryBgColor(blog.category)}`}
//                 >
//                   {blog.category}
//                 </span>
//               </div>
//             </div>

//             {/* Text Content */}
//             <div className="md:w-2/3 p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
//                     {blog.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4 line-clamp-2">
//                     {blog.excerpt}
//                   </p>
//                 </div>

//                 {/* Dropdown Menu */}
//                 <div className="relative ml-4">
//                   <button
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//                   >
//                     <MoreVertical className="w-4 h-4 text-gray-600" />
//                   </button>

//                   <AnimatePresence>
//                     {isMenuOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.95 }}
//                         className="absolute right-0 top-10 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-30 overflow-hidden"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         <div className="py-2">
//                           <Link
//                             href={`/blog/${blog.slug}`}
//                             target="_blank"
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             <Eye className="w-4 h-4" />
//                             View Live
//                           </Link>
//                           <Link
//                             href={`/admin/dashboard/blogs/edit/${blog._id}`}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             <Edit className="w-4 h-4" />
//                             Edit Blog
//                           </Link>
//                           <button
//                             onClick={() =>
//                               onToggleStatus(blog._id, !blog.published)
//                             }
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full"
//                           >
//                             {blog.published ? (
//                               <>
//                                 <EyeOff className="w-4 h-4" />
//                                 Unpublish
//                               </>
//                             ) : (
//                               <>
//                                 <Eye className="w-4 h-4" />
//                                 Publish
//                               </>
//                             )}
//                           </button>
//                           <button
//                             onClick={() => setShowDeleteConfirm(true)}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Delete
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Stats and Info */}
//               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                 <div className="flex items-center gap-6">
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <User className="w-4 h-4" />
//                     <span>{blog.author}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Calendar className="w-4 h-4" />
//                     <span>{formatDate(blog.publishedAt)}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Clock className="w-4 h-4" />
//                     <span>{blog.readTime}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2 text-sm text-gray-700">
//                     <TrendingUp className="w-4 h-4" />
//                     <span className="font-semibold">
//                       {blog.views?.toLocaleString()}
//                     </span>
//                     <span className="text-gray-500">views</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {showDeleteConfirm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={() => setShowDeleteConfirm(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.95, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 20 }}
//               className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
//                 <AlertTriangle className="w-8 h-8 text-red-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
//                 Delete Blog Post?
//               </h3>
//               <p className="text-gray-600 text-center mb-2">
//                 Are you sure you want to delete
//               </p>
//               <p className="text-gray-900 font-semibold text-center mb-6">
//                 "{blog.title}"
//               </p>
//               <p className="text-sm text-gray-500 text-center mb-8">
//                 This action cannot be undone. All blog data will be permanently
//                 deleted.
//               </p>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     onDelete(blog._id);
//                     setShowDeleteConfirm(false);
//                   }}
//                   className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all"
//                 >
//                   Delete Blog
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default function Blogs() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   // Get blogs
//   useEffect(() => {
//     fetch("/api/blogs")
//       .then((res) => res.json())
//       .then((data) => {
//         setBlogs(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Get unique categories
//   const categories = [
//     "all",
//     ...Array.from(new Set(blogs.map((b) => b.category))),
//   ];

//   // Filter blogs
//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesSearch =
//       blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       blog.author.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "all" || blog.category === selectedCategory;

//     const matchesStatus =
//       statusFilter === "all" ||
//       (statusFilter === "published" && blog.published) ||
//       (statusFilter === "drafts" && !blog.published);

//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   // Delete blog
//   const deleteBlog = async (id: string) => {
//     try {
//       await fetch("/api/blogs", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       setBlogs((prev) => prev.filter((blog) => blog._id !== id));
//     } catch (error) {
//       console.error("Failed to delete blog:", error);
//     }
//   };

//   // Toggle publish status
//   const togglePublishStatus = async (id: string, published: boolean) => {
//     try {
//       await fetch(`/api/blogs/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ published }),
//       });

//       setBlogs((prev) =>
//         prev.map((blog) => (blog._id === id ? { ...blog, published } : blog)),
//       );
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   // Calculate statistics
//   const stats = {
//     total: blogs.length,
//     published: blogs.filter((b) => b.published).length,
//     drafts: blogs.filter((b) => !b.published).length,
//     featured: blogs.filter((b) => b.featured).length,
//     totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0),
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
//           <p className="text-gray-600">Loading blogs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//                 Blog Management
//               </h1>
//               <p className="text-gray-600">
//                 Manage and monitor all your blog posts
//               </p>
//             </div>

//             <Link
//               href="/admin/dashboard/blog/create"
//               className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
//             >
//               <Plus className="w-5 h-5" />
//               Create New Blog
//               <div className="absolute inset-0 rounded-xl border-2 border-blue-500/30 translate-x-1 translate-y-1 -z-10" />
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Total Blogs</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">
//                     {stats.total}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
//                   <BarChart className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Published</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">
//                     {stats.published}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
//                   <CheckCircle className="w-6 h-6 text-emerald-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Drafts</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">
//                     {stats.drafts}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
//                   <EyeOff className="w-6 h-6 text-amber-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Total Views</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">
//                     {stats.totalViews.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
//                   <TrendingUp className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8">
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Search */}
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search blogs by title, excerpt, or author..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Category Filter */}
//               <div className="relative">
//                 <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-200 rounded-xl appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories
//                     .filter((cat) => cat !== "all")
//                     .map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                 </select>
//                 <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
//               </div>

//               {/* Status Filter */}
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-200 rounded-xl appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="published">Published</option>
//                   <option value="drafts">Drafts</option>
//                 </select>
//                 <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Blogs List */}
//         {filteredBlogs.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-lg">
//             <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
//               <BarChart className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No blogs found
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               {searchTerm ||
//               selectedCategory !== "all" ||
//               statusFilter !== "all"
//                 ? "Try adjusting your search or filter criteria"
//                 : "Get started by creating your first blog post"}
//             </p>
//             <Link
//               href="/admin/dashboard/blogs/create"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               Create Your First Blog
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <AnimatePresence>
//               {filteredBlogs.map((blog, index) => (
//                 <BlogCard
//                   key={blog._id}
//                   blog={blog}
//                   onDelete={deleteBlog}
//                   onToggleStatus={togglePublishStatus}
//                   index={index}
//                 />
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         {/* Summary Footer */}
//         {filteredBlogs.length > 0 && (
//           <div className="mt-8 pt-8 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div className="text-sm text-gray-600">
//                 Showing{" "}
//                 <span className="font-semibold text-gray-900">
//                   {filteredBlogs.length}
//                 </span>{" "}
//                 of{" "}
//                 <span className="font-semibold text-gray-900">
//                   {blogs.length}
//                 </span>{" "}
//                 blog posts
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="text-sm text-gray-600">
//                   <span className="inline-flex items-center gap-1">
//                     <CheckCircle className="w-4 h-4 text-emerald-600" />
//                     {stats.published} Published
//                   </span>
//                   <span className="mx-2">•</span>
//                   <span className="inline-flex items-center gap-1">
//                     <EyeOff className="w-4 h-4 text-amber-600" />
//                     {stats.drafts} Drafts
//                   </span>
//                   <span className="mx-2">•</span>
//                   <span className="inline-flex items-center gap-1">
//                     <Star className="w-4 h-4 text-amber-600" />
//                     {stats.featured} Featured
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
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
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";

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
  index: number;
}

const BlogCard = ({
  blog,
  onDelete,
  onToggleFeatured,
  index,
}: BlogCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "SEO & Marketing": "from-blue-500 to-cyan-500",
      "Web Development": "from-purple-500 to-pink-500",
      "AI & Machine Learning": "from-emerald-500 to-teal-500",
      "Design & UX": "from-orange-500 to-amber-500",
      "Mobile Development": "from-indigo-500 to-blue-500",
      "E-commerce": "from-rose-500 to-pink-500",
      "Digital Strategy": "from-green-500 to-emerald-500",
      "Content Writing": "from-yellow-500 to-orange-500",
      "Social Media": "from-blue-500 to-indigo-500",
      Analytics: "from-purple-500 to-violet-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const getCategoryBgColor = (category: string) => {
    const colors: Record<string, string> = {
      "SEO & Marketing": "bg-blue-50 text-blue-700",
      "Web Development": "bg-purple-50 text-purple-700",
      "AI & Machine Learning": "bg-emerald-50 text-emerald-700",
      "Design & UX": "bg-orange-50 text-orange-700",
      "Mobile Development": "bg-indigo-50 text-indigo-700",
      "E-commerce": "bg-rose-50 text-rose-700",
      "Digital Strategy": "bg-green-50 text-green-700",
      "Content Writing": "bg-yellow-50 text-yellow-700",
      "Social Media": "bg-blue-50 text-blue-700",
      Analytics: "bg-purple-50 text-purple-700",
    };
    return colors[category] || "bg-gray-50 text-gray-700";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Glow Effect for Featured */}
      {blog.featured && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-2xl" />
      )}

      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
              <Star className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/3 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-transparent z-10" />
            <NextImage
              src={blog.image}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryBgColor(blog.category)}`}
              >
                {blog.category}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-4">
                {/* Featured Toggle */}
                <button
                  onClick={() => onToggleFeatured(blog._id, !blog.featured)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    blog.featured
                      ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title={blog.featured ? "Remove featured" : "Mark as featured"}
                >
                  <Star className="w-4 h-4" />
                </button>

                {/* Edit Button */}
                <Link
                  href={`/admin/dashboard/blogs/edit/${blog._id}`}
                  className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                  title="Edit blog"
                >
                  <Edit className="w-4 h-4" />
                </Link>

                {/* View Button */}
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                  title="View live"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(blog._id)}
                  className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                  title="Delete blog"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats and Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">{blog.views}</span>
                  <span className="text-gray-500">views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");

  // Get blogs
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;

    const matchesFeatured =
      featuredFilter === "all" ||
      (featuredFilter === "featured" && blog.featured) ||
      (featuredFilter === "regular" && !blog.featured);

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  // Delete blog
  const deleteBlog = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        });

        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    }
  };

  // Toggle featured status
  const toggleFeaturedStatus = async (id: string, featured: boolean) => {
    try {
      await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured }),
      });

      setBlogs((prev) =>
        prev.map((blog) => (blog._id === id ? { ...blog, featured } : blog)),
      );
    } catch (error) {
      console.error("Failed to update featured status:", error);
    }
  };

  // Calculate statistics
  const stats = {
    total: blogs.length,
    featured: blogs.filter((b) => b.featured).length,
    totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0),
    popular: blogs.sort((a, b) => b.views - a.views)[0],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-gray-600">Loading blogs...</p>
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
                Blog Management
              </h1>
              <p className="text-gray-600">
                Manage and monitor all your published blog posts
              </p>
            </div>

            <Link
              href="/admin/dashboard/blogs/create"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Create New Blog
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Blogs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.total}
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
                  <p className="text-sm text-gray-500">Featured Posts</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.featured}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.totalViews}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Most Popular</p>
                  <p className="text-lg font-bold text-gray-900 mt-1 truncate">
                    {stats.popular?.title || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stats.popular?.views} views
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
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
                    placeholder="Search blogs by title, excerpt, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-200 rounded-xl appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
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
              </div>

              {/* Featured Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <select
                  value={featuredFilter}
                  onChange={(e) => setFeaturedFilter(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-200 rounded-xl appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                >
                  <option value="all">All Posts</option>
                  <option value="featured">Featured Only</option>
                  <option value="regular">Regular Posts</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs List */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <BarChart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm ||
              selectedCategory !== "all" ||
              featuredFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first blog post"}
            </p>
            <Link
              href="/admin/dashboard/blogs/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onDelete={deleteBlog}
                onToggleFeatured={toggleFeaturedStatus}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {filteredBlogs.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredBlogs.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {blogs.length}
                </span>{" "}
                published blogs
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <BarChart className="w-4 h-4 text-blue-600" />
                    {blogs.length} Total
                  </span>
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-600" />
                    {stats.featured} Featured
                  </span>
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    {stats.totalViews} Total Views
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
