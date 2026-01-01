// app/api/admin/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Database connect
    await dbConnect();

    // 2️⃣ Parse JSON safely
    let body: { username?: string; email?: string; password?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { username, email, password } = body;

    // 3️⃣ Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // 5️⃣ Create new user (pre-save middleware will hash password)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // 6️⃣ Return success
    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Registration error:", err);

    // Handle duplicate key error (unique username/email)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return NextResponse.json(
        { success: false, message: `${field} already exists` },
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
