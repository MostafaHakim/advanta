import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Hero from "@/models/heroModel";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const hero = await Hero.findById(params.id);
    if (!hero) {
      return NextResponse.json(
        { success: false, message: "Hero not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  console.log("--- ADMIN HERO PUT HANDLER ---");
  console.log("Received ID from params:", params.id);

  try {
    const body = await request.json();
    console.log("Received body:", body);

    const hero = await Hero.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    console.log("Result from findByIdAndUpdate:", hero);

    if (!hero) {
      console.log("Hero not found in DB for ID:", params.id);
      return NextResponse.json(
        { success: false, message: "Hero not found" },
        { status: 404 }
      );
    }

    console.log("Successfully updated hero:", hero);
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const deletedHero = await Hero.findByIdAndDelete(params.id);
    if (!deletedHero) {
      return NextResponse.json(
        { success: false, message: "Hero not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
