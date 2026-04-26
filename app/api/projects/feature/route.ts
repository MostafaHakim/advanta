import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/db"; // MongoDB connection
import Project from "@/models/projectModel";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const projects = await Project.find({ featured: true }).sort({
      createdAt: -1,
    });

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
