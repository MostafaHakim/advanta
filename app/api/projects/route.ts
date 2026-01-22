import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db"; // MongoDB connection
import Project from "@/models/projectModel";

export async function POST(request: NextRequest) {
  await dbConnect(); // Connect to MongoDB

  try {
    const body = await request.json();

    let imageUrl = body.image;
    let publicId = null;

    // যদি base64 image আসে → Cloudinary এ আপলোড
    if (body.image && body.image.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(body.image, {
        folder: "projects",
      });
      imageUrl = uploadRes.secure_url;
      publicId = uploadRes.public_id;
    }

    // MongoDB model create
    const project = await Project.create({
      ...body,
      image: imageUrl,
      imagePublicId: publicId,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: projects },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
