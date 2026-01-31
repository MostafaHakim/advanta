import { Metadata } from "next";
import { BlogCard, NewsletterSection } from "@/components/blog";
import { getBaseUrl } from "@/lib/url";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  User,
  Search,
  ChevronRight,
  Star,
  Sparkles,
  Eye,
  Share2,
  MessageSquare,
  Bookmark,
} from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  featured: boolean;
  excerpt: string;
  views: number;
}

async function getBlogs() {
  console.log("Fetching blogs...");
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return data || [];
}

export const metadata: Metadata = {
  title: "Digital Marketing Blog | Latest Trends & Insights",
  description:
    "Explore expert insights on SEO, content marketing, social media, and digital strategy. Stay ahead with actionable tips from industry professionals.",
  keywords: [
    "digital marketing",
    "SEO",
    "content marketing",
    "social media",
    "blog",
  ],
  openGraph: {
    title: "Digital Marketing Blog | Latest Trends & Insights",
    description: "Expert insights on digital marketing strategies",
    images: ["/og-blog.jpg"],
  },
};

export default async function BlogPage() {
  const blogPosts: BlogPost[] = await getBlogs();

  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 2);
  const recentPosts = blogPosts.slice(0, 6);
  const popularPosts = [...blogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const categories = [
    { name: "All", count: blogPosts.length, slug: "all" },
    {
      name: "SEO",
      count: blogPosts.filter((p) => p.category?.includes("SEO")).length,
      slug: "seo",
    },
    {
      name: "Social Media",
      count: blogPosts.filter((p) => p.category?.includes("Social")).length,
      slug: "social-media",
    },
    {
      name: "Content Marketing",
      count: blogPosts.filter((p) => p.category?.includes("Content")).length,
      slug: "content-marketing",
    },
    {
      name: "AI",
      count: blogPosts.filter((p) => p.category?.includes("AI")).length,
      slug: "ai",
    },
    {
      name: "Web Development",
      count: blogPosts.filter((p) => p.category?.includes("Development"))
        .length,
      slug: "web-development",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container-custom relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500 blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Latest Insights
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Marketing
                </span>{" "}
                <span className="text-gray-900">Blog</span>
              </h1>

              <p className="text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                Expert insights, actionable strategies, and industry trends to
                transform your digital marketing approach.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <input
                    type="search"
                    placeholder="Search articles, topics, or keywords..."
                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all text-lg shadow-lg hover:shadow-xl"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {blogPosts.length}
                </div>
                <div className="text-gray-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {blogPosts
                    .reduce((sum, post) => sum + (post.views || 0), 0)
                    .toLocaleString()}
                </div>
                <div className="text-gray-600">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {categories.length - 1}
                </div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {featuredPosts.length}
                </div>
                <div className="text-gray-600">Featured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 font-medium mb-3">
                <Star className="w-4 h-4" />
                Editor&apos;s Pick
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Featured <span className="text-amber-600">Articles</span>
              </h2>
            </div>
            <Link
              href="/blog/category/featured"
              className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              View All Featured
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <div
                key={post._id}
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 z-10" />

                <div className="relative h-[500px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-20" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-30">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views?.toLocaleString() || "0"} views
                        </span>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-gray-200 mb-6 text-lg leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{post.author}</div>
                          <div className="text-sm text-gray-300 flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                        >
                          Read More...
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Latest <span className="text-blue-600">Articles</span>
                  </h2>
                  <p className="text-gray-600">
                    Fresh content updated regularly
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="relative">
                    <select className="appearance-none px-6 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium">
                      <option>Latest First</option>
                      <option>Most Popular</option>
                      <option>Trending</option>
                      <option>Oldest First</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Blog Cards Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {recentPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                      {post.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views?.toLocaleString() || "0"}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-700">
                            {post.author}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/link"
                        >
                          Read Full
                          <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-16">
                <nav className="flex items-center gap-2">
                  <button className="px-5 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Previous
                  </button>

                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all ${
                        num === 1
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                          : "border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                      }`}
                    >
                      {num}
                    </button>
                  ))}

                  <button className="px-5 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Browse Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog/category/${category.slug}`}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                          <span className="font-semibold text-blue-600">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-600">
                          {category.name}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Popular Now
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="64px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Eye className="w-3 h-3" />
                            {post.views?.toLocaleString() || "0"}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <NewsletterSection />

              {/* CTA Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3">Want More Insights?</h4>
                <p className="text-blue-100 mb-6">
                  Get weekly digital marketing tips delivered to your inbox
                </p>
                <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
