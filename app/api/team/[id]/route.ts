import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/teamModel";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const member = await TeamMember.findById(params.id);
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const body = await req.json();

    const updated = await TeamMember.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();

    const deleted = await TeamMember.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Team member deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete team member" },
      { status: 500 },
    );
  }
}
