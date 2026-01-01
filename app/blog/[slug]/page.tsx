import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt: string;
}

import { getBaseUrl } from "@/lib/url";
// ... (rest of the file)
async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data;
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | NextMarketing Blog`,
    description: post.content.substring(0, 150) + "...", // Take first 150 chars as description
    keywords: [
      post.title.toLowerCase(),
      post.author.toLowerCase(),
      "blog",
      "digital marketing",
    ],
    openGraph: {
      title: `${post.title} | NextMarketing Blog`,
      description: post.content.substring(0, 150) + "...",
      type: "article",
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | NextMarketing Blog`,
      description: post.content.substring(0, 150) + "...",
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
