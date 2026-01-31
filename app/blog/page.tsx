// import { Metadata } from "next";
// import { BlogCard, NewsletterSection } from "@/components/blog";

// interface BlogPost {
//   _id: string;
//   title: string;
//   slug: string;
//   image: string;
//   category: string;
//   date: string;
//   author: string;
//   readTime: string;
//   featured: boolean;
//   excerpt: string;
// }

// import { getBaseUrl } from "@/lib/url";
// import Link from "next/link";
// import Image from "next/image";
// import { BookOpen, Calendar, Clock, TrendingUp, User } from "lucide-react";
// // ... (rest of the file)
// async function getBlogs() {
//   const res = await fetch(`${getBaseUrl()}/api/blogs`, {
//     cache: "no-store",
//   });
//   const data = await res.json();
//   return data.data;
// }

// export const metadata: Metadata = {
//   title: "Our Blog | Latest Trends in Digital Marketing",
//   description:
//     "Explore our blog for the latest trends, tips, and insights in digital marketing. Our experts share their knowledge on SEO, content marketing, social media, and more to help you stay ahead of the curve.",
// };

// export default async function BlogPage() {
//   const blogPosts: BlogPost[] = await getBlogs();

//   const featuredPosts = blogPosts.filter((post) => post.featured);
//   const recentPosts = blogPosts.slice(2);
//   const categories = [
//     { name: "All", count: 32 },
//     { name: "SEO", count: 12 },
//     { name: "Social Media", count: 8 },
//     { name: "Content Marketing", count: 10 },
//     { name: "PPC", count: 6 },
//     { name: "Web Development", count: 9 },
//     { name: "AI", count: 7 },
//     { name: "Email Marketing", count: 5 },
//   ];
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
//         <div className="container-custom">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//               Digital Marketing <span className="text-blue-600">Insights</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Stay updated with the latest trends, strategies, and insights from
//               our team of experts.
//             </p>
//             <div className="flex items-center justify-center gap-4">
//               <div className="relative">
//                 <input
//                   type="search"
//                   placeholder="Search articles..."
//                   className="w-full md:w-96 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                   <svg
//                     className="w-5 h-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <button className="btn-primary">Subscribe</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Posts */}
//       <section className="py-20 bg-white">
//         <div className="container-custom">
//           <div className="flex items-center justify-between mb-12">
//             <h2 className="text-3xl font-bold">Featured Articles</h2>
//             <Link
//               href="/blog/category/featured"
//               className="text-blue-600 hover:text-blue-700 font-medium"
//             >
//               View All Featured
//             </Link>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {featuredPosts.map((post) => (
//               <div
//                 key={post._id}
//                 className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
//               >
//                 <div className="relative h-96">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                   <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                     <div className="flex items-center gap-4 mb-4">
//                       <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
//                         {post.category}
//                       </span>
//                       <span className="flex items-center text-sm">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         {post.date}
//                       </span>
//                     </div>
//                     <h3 className="text-2xl md:text-3xl font-bold mb-4">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-200 mb-6">{post.excerpt}</p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <User className="w-5 h-5 mr-2" />
//                         <span>{post.author}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="w-5 h-5 mr-2" />
//                         <span>{post.readTime}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Blog Grid */}
//       <section className="py-20 bg-gray-50">
//         <div className="container-custom">
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-2xl font-bold">Latest Articles</h2>
//                 <div className="flex items-center gap-2">
//                   <span className="text-gray-600">Sort by:</span>
//                   <select className="border rounded-lg px-3 py-1">
//                     <option>Latest</option>
//                     <option>Most Popular</option>
//                     <option>Trending</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 {recentPosts.map((post) => (
//                   <BlogCard key={post._id} post={post} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center mt-12">
//                 <nav className="flex items-center gap-2">
//                   <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
//                     Previous
//                   </button>
//                   {[1, 2, 3, 4, 5].map((num) => (
//                     <button
//                       key={num}
//                       className={`px-4 py-2 border rounded-lg ${
//                         num === 1
//                           ? "bg-blue-600 text-white border-blue-600"
//                           : "hover:bg-gray-100"
//                       }`}
//                     >
//                       {num}
//                     </button>
//                   ))}
//                   <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
//                     Next
//                   </button>
//                 </nav>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-8">
//               {/* Categories */}
//               <div className="bg-white rounded-2xl p-6 shadow-lg">
//                 <h3 className="text-xl font-bold mb-6 flex items-center">
//                   <BookOpen className="w-5 h-5 mr-2" />
//                   Categories
//                 </h3>
//                 <div className="space-y-3">
//                   {categories.map((category) => (
//                     <Link
//                       key={category.name}
//                       href={`/blog/category/${category.name.toLowerCase()}`}
//                       className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
//                     >
//                       <span className="font-medium">{category.name}</span>
//                       <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
//                         {category.count}
//                       </span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Popular Posts */}
//               <div className="bg-white rounded-2xl p-6 shadow-lg">
//                 <h3 className="text-xl font-bold mb-6 flex items-center">
//                   <TrendingUp className="w-5 h-5 mr-2" />
//                   Popular Now
//                 </h3>
//                 <div className="space-y-4">
//                   {blogPosts.slice(0, 3).map((post) => (
//                     <Link
//                       key={post._id}
//                       href={`/blog/${post.slug}`}
//                       className="group flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
//                     >
//                       <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                         <Image
//                           src={post.image}
//                           alt={post.title}
//                           fill
//                           className="object-cover group-hover:scale-105 transition-transform"
//                         />
//                       </div>
//                       <div>
//                         <h4 className="font-medium group-hover:text-blue-600 line-clamp-2">
//                           {post.title}
//                         </h4>
//                         <div className="flex items-center text-sm text-gray-500 mt-1">
//                           <Clock className="w-3 h-3 mr-1" />
//                           {post.readTime}
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Newsletter */}
//               <NewsletterSection />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


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
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data || [];
}

// export const metadata: Metadata = {
//   title: "Digital Marketing Blog | Latest Trends & Insights",
//   description:
//     "Explore expert insights on SEO, content marketing, social media, and digital strategy. Stay ahead with actionable tips from industry professionals.",
//   keywords: [
//     "digital marketing",
//     "SEO",
//     "content marketing",
//     "social media",
//     "blog",
//   ],
//   openGraph: {
//     title: "Digital Marketing Blog | Latest Trends & Insights",
//     description: "Expert insights on digital marketing strategies",
//     images: ["/og-blog.jpg"],
//   },
// };

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
                          href={`/blog/${post._id}`}
                          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                        >
                          Read More
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
                    key={post._id}
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
                          href={`/blog/${post._id}`}
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
                      key={post._id}
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
