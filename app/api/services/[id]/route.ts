import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/serviceModel";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const service = await Service.findById(params.id);
  return NextResponse.json(service);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  await Service.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await await dbConnect();
    const body = await request.json();

    const service = await Service.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 },
    );
  }
}
