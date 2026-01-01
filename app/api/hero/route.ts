import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Hero from "@/models/heroModel";

export async function GET() {
  await dbConnect();

  try {
    const hero = await Hero.find({});
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const hero = await Hero.create(body);
    return NextResponse.json({ success: true, data: hero }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
