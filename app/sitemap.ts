import { MetadataRoute } from "next";
import Blog from "@/models/blogModel";
import Project from "@/models/projectModel";
import Service from "@/models/serviceModel";
import dbConnect from "@/lib/db";

export const runtime = "nodejs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://advanta-three.vercel.app";

  await dbConnect();

  const blogs = await Blog.find({}, "slug updatedAt").lean();
  const projects = await Project.find({}, "slug updatedAt").lean();
  const services = await Service.find({}, "slug updatedAt").lean();

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service.updatedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...blogUrls, ...projectUrls, ...serviceUrls];
}
