
import { Metadata } from "next";
import { BlogCard, NewsletterSection } from "@/components/blog";

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
}

import { getBaseUrl } from "@/lib/url";
// ... (rest of the file)
async function getBlogs() {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data;
}

export const metadata: Metadata = {
  title: "Our Blog | Latest Trends in Digital Marketing",
  description:
    "Explore our blog for the latest trends, tips, and insights in digital marketing. Our experts share their knowledge on SEO, content marketing, social media, and more to help you stay ahead of the curve.",
};

export default async function BlogPage() {
  const blogPosts: BlogPost[] = await getBlogs();

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = blogPosts.slice(2);
  const categories = [
    { name: "All", count: 32 },
    { name: "SEO", count: 12 },
    { name: "Social Media", count: 8 },
    { name: "Content Marketing", count: 10 },
    { name: "PPC", count: 6 },
    { name: "Web Development", count: 9 },
    { name: "AI", count: 7 },
    { name: "Email Marketing", count: 5 },
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Digital Marketing <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with the latest trends, strategies, and insights from
              our team of experts.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search articles..."
                  className="w-full md:w-96 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <Link
              href="/blog/category/featured"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Featured
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post._id}
                className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-96">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {post.title}
                    </h3>
                    <p className="text-gray-200 mb-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Sort by:</span>
                  <select className="border rounded-lg px-3 py-1">
                    <option>Latest</option>
                    <option>Most Popular</option>
                    <option>Trending</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {recentPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={`px-4 py-2 border rounded-lg ${
                        num === 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                    Next
                  </button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog/category/${category.name.toLowerCase()}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Popular Now
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-blue-600 line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <NewsletterSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
