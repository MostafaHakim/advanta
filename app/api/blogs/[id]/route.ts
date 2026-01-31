import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/blogModel";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const deletedProject = await Blog.findByIdAndDelete(params.id);
    if (!deletedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
