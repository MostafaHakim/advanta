import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Hero from "@/models/heroModel";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  try {
    const hero = await Hero.findById(id);
    if (!hero)
      return NextResponse.json(
        { success: false, message: "Hero not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: hero });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  try {
    const body = await request.json();
    const hero = await Hero.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!hero)
      return NextResponse.json(
        { success: false, message: "Hero not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: hero });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  try {
    const deletedHero = await Hero.findByIdAndDelete(id);
    if (!deletedHero)
      return NextResponse.json(
        { success: false, message: "Hero not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
