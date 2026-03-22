import dbConnect from "@/lib/db";
import ContactSettings from "@/models/contactSettingsModel";
import { NextResponse } from "next/server";

// GET settings
export async function GET() {
  await dbConnect();
  const settings = await ContactSettings.findOne();
  return NextResponse.json({ success: true, data: settings });
}

// CREATE / UPDATE
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  console.log(body);
  let settings = await ContactSettings.findOne();

  if (settings) {
    settings.contactInfo = body.contactInfo;
    settings.departments = body.departments;
    settings.address = body.address;
    settings.socialUrl = body.socialUrl;

    await settings.save();
  } else {
    settings = await ContactSettings.create(body);
  }

  return NextResponse.json({ success: true, data: settings });
}
