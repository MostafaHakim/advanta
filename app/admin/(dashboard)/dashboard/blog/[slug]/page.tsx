import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/url";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Eye,
  Tag,
  Share2,
  Bookmark,
  MessageSquare,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  ChevronRight,
  BookOpen,
  TrendingUp,
} from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  authorBio?: string;
  readTime: string;
  views: number;
  featured: boolean;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  relatedPosts?: BlogPost[];
}

async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/blogs/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    console.log(data);
    return data.data || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getRelatedPosts(
  category: string,
  currentId: string,
): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${getBaseUrl()}/api/blogs?category=${category}&limit=3`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    const data = await res.json();
    // Current blog exclude
    return (data.data || [])
      .filter((post: BlogPost) => post._id !== currentId)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Digital Marketing Blog`,
    description: post.excerpt,
    keywords: post.tags || [post.category],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post._id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>

          {/* Featured Badge */}
          {post.featured && (
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold">
                <Bookmark className="w-4 h-4" />
                Featured Article
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  {post.authorImage ? (
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {post.author}
                  </div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>

              {/* Category */}
              <div className="hidden md:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                  <Tag className="w-4 h-4" />
                  <span className="font-medium">{post.category}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{post.readTime}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">
                    {post.views?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Share:</span>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Bookmark className="w-4 h-4" />
              Save for Later
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <article className="lg:col-span-2">
            {/* Featured Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-2xl font-semibold text-gray-700 mb-8 leading-relaxed">
                {post.excerpt}
              </div>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Bottom */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Enjoyed this article?
                </h3>
                <p className="text-gray-600 mb-6">Share it with your network</p>
                <div className="flex items-center justify-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share Article
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    Leave Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  {post.authorImage ? (
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    About the Author
                  </h3>
                  <p className="text-lg font-semibold text-gray-700 mb-3">
                    {post.author}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {post.authorBio ||
                      `${post.author} is a digital marketing expert with years of experience in helping businesses grow online through effective strategies and innovative approaches.`}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Quick Navigation
              </h3>
              <div className="space-y-3">
                {[
                  "Introduction",
                  "Key Strategies",
                  "Implementation Steps",
                  "Case Studies",
                  "Conclusion",
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`#section-${index + 1}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600">
                      {item}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost._id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {relatedPost.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog"
                  className="mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors w-full"
                >
                  View All Articles
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Stay Updated</h4>
              <p className="text-blue-100 mb-6">
                Get weekly digital marketing tips delivered to your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Comments Section (Optional - can be implemented later) */}
      {/* <div className="container-custom py-12 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Comments (24)</h2>
          {/* Add comments component here *\/}
        </div>
      </div> */}
    </div>
  );
}
