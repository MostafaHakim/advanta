import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Users from "@/models/userModel";

export async function GET() {
  try {
    await dbConnect();
    const users = await Users.find().sort({
      createdAt: -1,
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch team members" },
      { status: 500 },
    );
  }
}
