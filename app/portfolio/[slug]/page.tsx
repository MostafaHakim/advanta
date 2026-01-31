import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PortfolioItem {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string;
  featured: boolean;
  results: {
    value: string;
    label: string;
  }[];
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

import { getBaseUrl } from "@/lib/url";
import dbConnect from "@/lib/db";
import projectModel from "@/models/projectModel";
import Image from "next/image";
// ... (rest of the file)
async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch(`${getBaseUrl()}/api/projects`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data;
}

export async function generateStaticParams() {
  try {
    await dbConnect();

    const portfolios = await projectModel.find({}, "slug").lean();

    return portfolios.map((p) => ({
      slug: p.slug,
    }));
  } catch (err) {
    console.error("Failed to generateStaticParams:", err);
    // কোনো connection fail হলে empty array return
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const portfolioItems = await getPortfolioItems();
  const item = portfolioItems.find((i) => i.slug === params.slug);

  if (!item) {
    return {
      title: "Portfolio Item Not Found",
      description: "The requested portfolio item could not be found.",
    };
  }

  return {
    title: `${item.title} | NextMarketing Portfolio`,
    description: item.description,
    keywords: [
      item.title.toLowerCase(),
      item.category.toLowerCase(),
      "portfolio",
      "digital marketing",
    ],
    openGraph: {
      title: `${item.title} | NextMarketing Portfolio`,
      description: item.description,
      type: "website",
      images: [
        {
          url: item.image,
          width: 800,
          height: 600,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | NextMarketing Portfolio`,
      description: item.description,
      images: [item.image],
    },
  };
}

export default async function PortfolioItemPage({
  params,
}: {
  params: { slug: string };
}) {
  const portfolioItems = await getPortfolioItems();
  const item = portfolioItems.find((i) => i.slug === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto lg:mt-16 py-12">
      <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-600 mb-6">{item.description}</p>
      {item.image && (
        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={item.image}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      )}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Client:</h2>
        <p className="text-gray-700">{item.client}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Category:</h2>
        <p className="text-gray-700">{item.category}</p>
      </div>
      {item.liveUrl && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Live URL:</h2>
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {item.liveUrl}
          </a>
        </div>
      )}
      {item.githubUrl && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">GitHub URL:</h2>
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {item.githubUrl}
          </a>
        </div>
      )}
      {item.tags && item.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
