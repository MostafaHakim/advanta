import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/teamModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body);
    const member = await TeamMember.create(body);
    console.log(member);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create team member" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const members = await TeamMember.find().sort({
      featured: -1,
      createdAt: -1,
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch team members" },
      { status: 500 },
    );
  }
}
