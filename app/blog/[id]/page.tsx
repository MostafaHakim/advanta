import { notFound } from "next/navigation";
import { Metadata } from "next";
import dbConnect from "@/lib/db";
import blogModel from "@/models/blogModel";
import { getBaseUrl } from "@/lib/url";
import Image from "next/image";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt: string;
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  await dbConnect();
  const { id } = await params;

  const post = await blogModel.findById(id).lean();

  if (!post) {
    return {
      title: "Post Not Found | NextMarketing Blog",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | NextMarketing Blog`,
    description: post.content.substring(0, 150) + "...",
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
      publishedTime: post.createdAt,
      authors: [post.author],
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
    alternates: {
      canonical: `${getBaseUrl()}/blog/${id}`,
    },
  };
}

// Main page component
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await dbConnect();
  const { id } = await params;

  const post = await blogModel.findById(id).lean();

  if (!post) {
    notFound();
  }

  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

        <div className="flex items-center text-gray-600 mb-8">
          <div>
            <p className="font-medium">By {post.author}</p>
            <p className="text-sm">{formattedDate}</p>
          </div>
        </div>

        {post.image && (
          <div className="relative mb-10 h-[400px] rounded-xl shadow-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 
                   prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 
                   prose-strong:text-gray-900 prose-blockquote:text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
