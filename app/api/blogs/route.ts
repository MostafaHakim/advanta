import { NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      title,
      slug,
      image,
      category,
      excerpt,
      content,
      author,
      readTime,
      featured,
      published,
    } = body;

    // ❌ Basic validation
    if (!title || !slug || !image || !category || !excerpt || !content) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 },
      );
    }

    // ❌ Slug already exists check
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 },
      );
    }

    const blog = await Blog.create({
      title,
      slug,
      image,
      category,
      excerpt,
      content,
      author: author || "Admin",
      readTime: readTime || "5 min read",
      featured: featured || false,
      published: published ?? true,
      publishedAt: new Date(),
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error("BLOG_POST_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Failed to create blog" },
      { status: 500 },
    );
  }
}

export async function GET() {
  await dbConnect();
  const blog = await Blog.find().sort({ order: 1 });
  return NextResponse.json(blog);
}
