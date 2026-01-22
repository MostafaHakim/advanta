import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Brand from "@/models/brandModel";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    // Form data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("image") as File;

    if (!name || !file) {
      return NextResponse.json(
        { success: false, message: "Name and Image are required" },
        { status: 400 },
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const upload: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "brand" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(buffer);
    });
    // Save to MongoDB
    const newBrand = await Brand.create({
      name,
      image: upload.secure_url,
      public_id: upload.public_id,
    });

    console.log("New brand created:", newBrand);

    return NextResponse.json(
      { success: true, data: newBrand },
      { status: 201 },
    );
  } catch (error) {
    console.error("Brand upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed", error: String(error) },
      { status: 500 },
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: brands });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch brands" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const brand = await Brand.findById({ _id: params.id });

    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 },
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(brand.public_id);

    // Delete from MongoDB
    await Brand.findByIdAndDelete({ _id: params.id });

    return NextResponse.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.error("Delete brand error:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 },
    );
  }
}
