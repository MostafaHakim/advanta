import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/contactModel";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, email, message } = await request.json();

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
