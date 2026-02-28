import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await cloudinary.uploader.upload(body.image, {
      folder: "team_members",
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
