import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Users from "@/models/userModel";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await dbConnect();

  try {
    const user = await Users.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    user.status = user.status === "active" ? "block" : "active";

    await user.save();

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
