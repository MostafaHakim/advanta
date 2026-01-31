// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateBlogPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     image: "",
//     category: "",
//     excerpt: "",
//     content: "",
//     author: "",
//     readTime: "",
//     featured: false,
//     published: true,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value, type } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/blogs", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.success) {
//       alert("Blog created successfully!");
//       router.push("/admin/dashboard/blogs");
//     } else {
//       alert(data.message || "Failed to create blog");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Create New Blog</h1>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Title */}
//         <input
//           name="title"
//           placeholder="Blog Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* Slug */}
//         <input
//           name="slug"
//           placeholder="blog-slug"
//           value={form.slug}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* Image */}
//         <input
//           name="image"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* Category */}
//         <input
//           name="category"
//           placeholder="Category (SEO, AI, Web...)"
//           value={form.category}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* Excerpt */}
//         <textarea
//           name="excerpt"
//           placeholder="Short excerpt"
//           value={form.excerpt}
//           onChange={handleChange}
//           required
//           rows={3}
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* Content */}
//         <textarea
//           name="content"
//           placeholder="Full blog content (HTML / Markdown)"
//           value={form.content}
//           onChange={handleChange}
//           required
//           rows={8}
//           className="w-full border p-3 rounded-lg"
//         />

//         {/* Author & Read Time */}
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             name="author"
//             placeholder="Author name"
//             value={form.author}
//             onChange={handleChange}
//             className="border p-3 rounded-lg"
//           />
//           <input
//             name="readTime"
//             placeholder="Read time (e.g. 5 min read)"
//             value={form.readTime}
//             onChange={handleChange}
//             className="border p-3 rounded-lg"
//           />
//         </div>

//         {/* Toggles */}
//         <div className="flex items-center gap-6">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="featured"
//               checked={form.featured}
//               onChange={handleChange}
//             />
//             Featured
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="published"
//               checked={form.published}
//               onChange={handleChange}
//             />
//             Published
//           </label>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60"
//         >
//           {loading ? "Creating..." : "Create Blog"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Upload,
  Tag,
  Clock,
  User,
  Eye,
  EyeOff,
  Star,
  Sparkles,
  ChevronRight,
  Image as ImageIcon,
  FileText,
  Type,
  Link as LinkIcon,
  Globe,
  ArrowLeft,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

export default function CreateBlogPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    category: "",
    excerpt: "",
    content: "",
    author: "",
    readTime: "",
    featured: false,
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "content" | "meta">(
    "basic",
  );

  const categories = [
    "SEO & Marketing",
    "Web Development",
    "AI & Machine Learning",
    "Design & UX",
    "Mobile Development",
    "E-commerce",
    "Digital Strategy",
    "Content Writing",
    "Social Media",
    "Analytics",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = async () => {
    if (!form.title.trim()) return;

    setIsGeneratingSlug(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const slug = form.title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

    setForm((prev) => ({ ...prev, slug }));
    setIsGeneratingSlug(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload to Cloudinary or similar
    // For demo, we'll create a blob URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((prev) => ({ ...prev, image: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "✨ Blog created successfully! Redirecting...",
        });

        setTimeout(() => {
          router.push("/admin/dashboard/blogs");
        }, 1500);
      } else {
        throw new Error(data.message || "Failed to create blog");
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Type },
    { id: "content", label: "Content", icon: FileText },
    { id: "meta", label: "Meta Data", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/dashboard/blogs")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Create New Blog Post
              </h1>
              <p className="text-gray-600">
                Share your knowledge with the world through engaging content
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Preview Button */}
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              {/* Save Draft Button */}
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
            </div>
          </div>

          {/* Progress Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg`
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Blog Creation</h2>
                  <p className="text-white/80">Craft your next masterpiece</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    AI Assistant Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? `bg-blue-50 text-blue-700 border border-blue-200`
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-8">
              {/* Basic Info Tab */}
              <AnimatePresence mode="wait">
                {activeTab === "basic" && (
                  <motion.div
                    key="basic"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Blog Title
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="title"
                        placeholder="Write an engaging blog title..."
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white text-lg font-medium"
                      />
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        URL Slug
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            /
                          </div>
                          <input
                            name="slug"
                            placeholder="blog-url-slug"
                            value={form.slug}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-100"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={generateSlug}
                          disabled={isGeneratingSlug || !form.title.trim()}
                          className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingSlug ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Globe className="w-4 h-4" />
                          )}
                          Generate
                        </button>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Featured Image
                      </label>
                      <div className="relative">
                        {form.image ? (
                          <div className="relative group h-64">
                            <NextImage
                              src={form.image}
                              alt="Preview"
                              layout="fill"
                              objectFit="cover"
                              className="rounded-2xl border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setForm((prev) => ({ ...prev, image: "" }))
                              }
                              className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <div className="h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <Upload className="w-8 h-8 text-blue-600" />
                              </div>
                              <p className="text-gray-700 font-medium mb-2">
                                Upload Featured Image
                              </p>
                              <p className="text-sm text-gray-500">
                                PNG, JPG or WebP • Max 5MB
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Category
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({ ...prev, category: cat }))
                            }
                            className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                              form.category === cat
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <input
                        name="category"
                        placeholder="Or type custom category..."
                        value={form.category}
                        onChange={handleChange}
                        className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Content Tab */}
                {activeTab === "content" && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Excerpt */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Excerpt
                        <span className="text-xs font-normal text-gray-500">
                          (Appears in blog listings)
                        </span>
                      </label>
                      <textarea
                        name="excerpt"
                        placeholder="Write a compelling excerpt that makes readers want to click..."
                        value={form.excerpt}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                      />
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>Brief summary of your blog post</span>
                        <span>{form.excerpt.length}/200 characters</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Content
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Toolbar */}
                        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <span className="font-bold">B</span>
                          </button>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <i>I</i>
                          </button>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <u>U</u>
                          </button>
                          <div className="w-px h-4 bg-gray-300" />
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            H1
                          </button>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            H2
                          </button>
                          <div className="flex-1" />
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg font-medium"
                          >
                            AI Assistant
                          </button>
                        </div>

                        <textarea
                          name="content"
                          placeholder="Write your blog content here... (Supports Markdown and HTML)"
                          value={form.content}
                          onChange={handleChange}
                          required
                          rows={12}
                          className="w-full px-4 py-3 outline-none resize-none bg-white"
                        />
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>Supports Markdown, HTML, and rich text</span>
                        <span>{form.content.length}/10000 characters</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Meta Data Tab */}
                {activeTab === "meta" && (
                  <motion.div
                    key="meta"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Author */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Author
                        </label>
                        <input
                          name="author"
                          placeholder="Your name or team name"
                          value={form.author}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                        />
                      </div>

                      {/* Read Time */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Read Time
                        </label>
                        <div className="relative">
                          <input
                            name="readTime"
                            placeholder="e.g., 5 min read"
                            value={form.readTime}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                          />
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Toggle Options */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Publishing Options
                      </h3>

                      <div className="space-y-4">
                        {/* Featured */}
                        <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                              <Star className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                Featured Post
                              </p>
                              <p className="text-sm text-gray-500">
                                Show this post in featured section
                              </p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="featured"
                              checked={form.featured}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-12 h-6 rounded-full transition-colors ${
                                form.featured ? "bg-amber-500" : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                                  form.featured
                                    ? "translate-x-7"
                                    : "translate-x-1"
                                } mt-0.5`}
                              />
                            </div>
                          </div>
                        </label>

                        {/* Published */}
                        <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                              {form.published ? (
                                <Eye className="w-5 h-5 text-green-600" />
                              ) : (
                                <EyeOff className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                Published
                              </p>
                              <p className="text-sm text-gray-500">
                                {form.published
                                  ? "Post is visible to everyone"
                                  : "Save as draft (not visible publicly)"}
                              </p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="published"
                              checked={form.published}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-12 h-6 rounded-full transition-colors ${
                                form.published ? "bg-green-500" : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                                  form.published
                                    ? "translate-x-7"
                                    : "translate-x-1"
                                } mt-0.5`}
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Display */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      message.type === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {message.type === "success" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <X className="w-5 h-5" />
                    )}
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Section */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  <p>
                    All required fields are marked with{" "}
                    <span className="text-red-500">*</span>
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        activeTab === "basic"
                          ? "meta"
                          : tabs[tabs.findIndex((t) => t.id === activeTab) - 1]
                              .id,
                      )
                    }
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-colors"
                  >
                    Back
                  </button>

                  {activeTab === "meta" ? (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Publish Blog
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTab(
                          tabs[tabs.findIndex((t) => t.id === activeTab) + 1]
                            .id,
                        )
                      }
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.form>

        {/* Preview Card */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Live Preview
            </h4>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              {form.title ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {form.title}
                  </h3>
                  {form.image && (
                    <NextImage
                      src={form.image}
                      alt="Preview"
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  {form.excerpt && (
                    <p className="text-gray-600">{form.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {form.author && <span>By {form.author}</span>}
                    {form.readTime && <span>• {form.readTime}</span>}
                    {form.category && <span>• {form.category}</span>}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Start typing to see a preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
