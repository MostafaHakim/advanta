import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/contactModel";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, email, phone, company, budget, service, message } =
      await request.json();

    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      budget,
      service,
      message,
    });
    await newContact.save();

    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get contact error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts" },
      { status: 500 },
    );
  }
}
