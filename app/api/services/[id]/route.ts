import { NextResponse } from "next/server";
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const body = await req.json();

  const updated = await Service.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  await Service.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
