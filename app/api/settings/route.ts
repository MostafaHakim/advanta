import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ContactSettings from "@/models/contactSettingsModel";

// GET settings
export async function GET() {
  await dbConnect();
  const settings = await ContactSettings.findOne();
  return NextResponse.json({ success: true, data: settings });
}
